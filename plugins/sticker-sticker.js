import fs from 'fs'
import path from 'path'
import fetch from 'node-fetch'
import fluent from 'fluent-ffmpeg'
import { fileTypeFromBuffer as fromBuffer } from 'file-type'

let handler = async (m, { conn, args }) => {
  let q = m.quoted ? m.quoted : m
  let mime = (q.msg || q).mimetype || q.mediaType || ''
  let buffer

  try {
    // Verificar si el archivo existe y se puede descargar
    if (/image|video/g.test(mime)) {
      if (/video/.test(mime) && (q.msg || q).seconds > 10) {
        return m.reply('⚠️ El video no puede durar más de *10 segundos*.')
      }
      buffer = await q.download()
      if (!buffer || buffer.length === 0) throw new Error('El archivo está vacío.')
    } else if (args[0] && isUrl(args[0])) {
      const res = await fetch(args[0])
      if (!res.ok) throw new Error(`Error ${res.status}: No se pudo descargar.`)
      buffer = await res.buffer()
    } else {
      return m.reply('🔹 *Responde a una imagen/video o envía una URL.*')
    }

    await m.react('⏳')
    const sticker = await createSticker(buffer)
    
    // Enviar el sticker como archivo webp
    await conn.sendFile(
      m.chat,
      sticker,
      'sticker.webp',
      '',
      m,
      { asSticker: true }
    )
    await m.react('✅')
  } catch (error) {
    console.error('❌ Error al crear sticker:', error)
    m.reply(`🚫 *Error al generar el sticker:* ${error.message}`)
    await m.react('❌')
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']
export default handler

// Función mejorada para crear stickers
async function createSticker(buffer) {
  const { ext } = await fromBuffer(buffer) || {}
  if (!ext || !/(png|jpe?g|gif|webp|mp4)/i.test(ext)) {
    throw new Error('⚠️ Formato no compatible. Usa imágenes o videos cortos.')
  }

  // Crear carpeta temporal si no existe
  const tmpDir = path.join(process.cwd(), 'tmp')
  if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir, { recursive: true })

  const inputPath = path.join(tmpDir, `input_${Date.now()}.${ext}`)
  const outputPath = path.join(tmpDir, `sticker_${Date.now()}.webp`)

  // Guardar el buffer en un archivo temporal
  fs.writeFileSync(inputPath, buffer)

  return new Promise((resolve, reject) => {
    fluent(inputPath)
      .inputOptions('-t 10') // Limitar a 10 segundos si es video
      .outputOptions([
        '-vcodec libwebp',
        '-vf scale=512:512:force_original_aspect_ratio=decrease',
        '-preset default',
        '-loop 0', // Para GIFs/animaciones
        '-qscale 40', // Calidad
        '-an' // Quitar audio
      ])
      .toFormat('webp')
      .on('error', (err) => {
        console.error('❌ FFmpeg error:', err)
        reject(new Error('Error al convertir el archivo.'))
      })
      .on('end', () => {
        try {
          const result = fs.readFileSync(outputPath)
          // Eliminar archivos temporales
          fs.unlinkSync(inputPath)
          fs.unlinkSync(outputPath)
          resolve(result)
        } catch (err) {
          reject(err)
        }
      })
      .save(outputPath)
  })
}

// Función para validar URLs
function isUrl(url) {
  try {
    new URL(url)
    return true
  } catch {
    return false
  }
}
