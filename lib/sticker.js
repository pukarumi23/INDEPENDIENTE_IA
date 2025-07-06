import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { promises as fs } from 'fs'
import path from 'path'
import crypto from 'crypto'
import fluent_ffmpeg from 'fluent-ffmpeg'
import { spawn } from 'child_process'
import { fileTypeFromBuffer } from 'file-type'
import { Image } from 'node-webpmux'
import fetch from 'node-fetch'
import { Sticker } from 'wa-sticker-formatter'

const __dirname = dirname(fileURLToPath(import.meta.url))
const tmpDir = path.join(__dirname, '../tmp')

// Crear directorio tmp si no existe
if (!fs.existsSync(tmpDir)) {
  await fs.mkdir(tmpDir, { recursive: true })
}

async function sticker2(img, url) {
  try {
    if (url) {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      img = await res.buffer()
    }

    if (!img || !Buffer.isBuffer(img)) {
      throw new Error('Input inválido: se esperaba un Buffer o URL')
    }

    const inputPath = path.join(tmpDir, `${Date.now()}.jpeg`)
    await fs.writeFile(inputPath, img)

    return new Promise((resolve, reject) => {
      const ff = spawn('ffmpeg', [
        '-y',
        '-i', inputPath,
        '-vf', 'scale=512:512:flags=lanczos:force_original_aspect_ratio=decrease,format=rgba,pad=512:512:(ow-iw)/2:(oh-ih)/2:color=#00000000,setsar=1',
        '-f', 'png',
        '-'
      ])

      let pngBuffer = Buffer.alloc(0)
      ff.stdout.on('data', (chunk) => {
        pngBuffer = Buffer.concat([pngBuffer, chunk])
      })

      ff.on('error', (err) => {
        cleanup(inputPath)
        reject(new Error(`Error en FFmpeg: ${err.message}`))
      })

      ff.on('close', async (code) => {
        cleanup(inputPath)
        if (code !== 0) {
          reject(new Error(`FFmpeg process exited with code ${code}`))
          return
        }

        try {
          const webpBuffer = await convertToWebp(pngBuffer)
          resolve(webpBuffer)
        } catch (err) {
          reject(err)
        }
      })
    })
  } catch (err) {
    throw new Error(`sticker2 failed: ${err.message}`)
  }
}

async function convertToWebp(buffer) {
  return new Promise((resolve, reject) => {
    const im = spawn('convert', ['png:-', 'webp:-'])
    let webpBuffer = Buffer.alloc(0)

    im.stdin.write(buffer)
    im.stdin.end()

    im.stdout.on('data', (chunk) => {
      webpBuffer = Buffer.concat([webpBuffer, chunk])
    })

    im.on('error', (err) => {
      reject(new Error(`Error en ImageMagick: ${err.message}`))
    })

    im.on('close', (code) => {
      if (code !== 0) {
        reject(new Error(`convert process exited with code ${code}`))
        return
      }
      resolve(webpBuffer)
    })
  })
}

async function sticker6(img, url) {
  try {
    if (url) {
      const res = await fetch(url)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      img = await res.buffer()
    }

    if (!img || !Buffer.isBuffer(img)) {
      throw new Error('Input inválido: se esperaba un Buffer o URL')
    }

    const type = await fileTypeFromBuffer(img) || {
      mime: 'application/octet-stream',
      ext: 'bin'
    }

    if (type.ext === 'bin') {
      throw new Error('Formato de archivo no soportado')
    }

    const inputPath = path.join(tmpDir, `${Date.now()}.${type.ext}`)
    const outputPath = path.join(tmpDir, `${Date.now()}.webp`)

    await fs.writeFile(inputPath, img)

    return new Promise((resolve, reject) => {
      const command = /video/i.test(type.mime) 
        ? fluent_ffmpeg(inputPath).inputFormat(type.ext)
        : fluent_ffmpeg(inputPath)

      command
        .on('error', (err) => {
          cleanup(inputPath, outputPath)
          reject(new Error(`Error en FFmpeg: ${err.message}`))
        })
        .on('end', async () => {
          try {
            const result = await fs.readFile(outputPath)
            cleanup(inputPath, outputPath)
            resolve(result)
          } catch (err) {
            cleanup(inputPath, outputPath)
            reject(err)
          }
        })
        .addOutputOptions([
          '-vcodec', 'libwebp',
          '-vf', 'scale=\'min(320,iw)\':min\'(320,ih)\':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse'
        ])
        .toFormat('webp')
        .save(outputPath)
    })
  } catch (err) {
    throw new Error(`sticker6 failed: ${err.message}`)
  }
}

async function addExif(webpSticker, packname, author, categories = [''], extra = {}) {
  try {
    const img = new Image()
    const stickerPackId = crypto.randomBytes(32).toString('hex')
    
    const json = {
      'sticker-pack-id': stickerPackId,
      'sticker-pack-name': packname,
      'sticker-pack-publisher': author,
      'emojis': categories,
      ...extra
    }

    const exifAttr = Buffer.from([
      0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00,
      0x01, 0x00, 0x41, 0x57, 0x07, 0x00, 0x00, 0x00,
      0x00, 0x00, 0x16, 0x00, 0x00, 0x00
    ])

    const jsonBuffer = Buffer.from(JSON.stringify(json), 'utf8')
    const exif = Buffer.concat([exifAttr, jsonBuffer])
    exif.writeUIntLE(jsonBuffer.length, 14, 4)

    await img.load(webpSticker)
    img.exif = exif
    
    return await img.save(null)
  } catch (err) {
    throw new Error(`addExif failed: ${err.message}`)
  }
}

async function sticker(img, url, ...args) {
  let lastError
  const methods = [
    sticker6,
    sticker2,
    // Agrega aquí otras funciones de sticker si es necesario
  ].filter(f => f)

  for (const method of methods) {
    try {
      const result = await method(img, url, ...args)
      if (Buffer.isBuffer(result)) {
        try {
          return await addExif(result, ...args)
        } catch (exifErr) {
          console.error('Error adding exif:', exifErr)
          return result
        }
      }
    } catch (err) {
      lastError = err
      continue
    }
  }

  throw lastError || new Error('Todos los métodos fallaron')
}

async function cleanup(...files) {
  for (const file of files) {
    try {
      await fs.unlink(file).catch(() => {})
    } catch (err) {
      console.error(`Error cleaning up ${file}:`, err)
    }
  }
}

const support = {
  ffmpeg: true,
  ffprobe: true,
  ffmpegWebp: true,
  convert: true,
  magick: false,
  gm: false,
  find: false
}

export {
  sticker,
  sticker2,
  sticker6,
  addExif,
  support
}
