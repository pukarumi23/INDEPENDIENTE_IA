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
    if (/image|video/g.test(mime) {
      if (/video/.test(mime) && (q.msg || q).seconds > 10) {
        return conn.reply(m.chat, '💙 El video no puede durar más de *10 segundos*', m)
      }
      buffer = await q.download()
    } else if (args[0] && isUrl(args[0])) {
      try {
        const res = await fetch(args[0])
        if (!res.ok) throw new Error(`HTTP ${res.status}`)
        buffer = await res.buffer()
      } catch (e) {
        throw new Error('No se pudo descargar el archivo de la URL')
      }
    } else {
      return conn.reply(m.chat, '💙 Responde a una *imagen o video* o proporciona una URL válida', m)
    }
    
    await m.react('🕓')
    const sticker = await createSticker(buffer, {
      packname: 'Sticker',
      author: 'Bot',
      categories: ['😄', '🎉'],
      quality: 50
    })
    
    await conn.sendFile(m.chat, sticker, 'sticker.webp', '', m, null, {
      asSticker: true
    })
    await m.react('✅')
  } catch (e) {
    console.error('Error:', e)
    conn.reply(m.chat, `❌ Error al crear el sticker: ${e.message}`, m)
    await m.react('✖️')
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']
handler.register = true 

export default handler

async function createSticker(buffer, metadata = {}) {
  const { ext } = await fromBuffer(buffer) || {}
  
  if (!ext || !/(png|jpe?g|gif|webp|mp4|mkv|m4p)/i.test(ext)) {
    throw new Error('Formato de archivo no compatible')
  }
  
  const tempDir = global.tempDir || './tmp'
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir)
  
  const input = path.join(tempDir, `${Date.now()}.${ext}`)
  const output = path.join(tempDir, `${Date.now()}.webp`)
  
  fs.writeFileSync(input, buffer)
  
  const isVideo = /(mp4|mkv|m4p|gif)/i.test(ext)
  const scaleFilter = metadata.crop ? 
    `scale='if(gt(iw,ih),-1,299):if(gt(iw,ih),299,-1)',crop=299:299` :
    `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease`
  
  const options = [
    '-vcodec', 'libwebp',
    '-vf', `${scaleFilter},fps=15,pad=320:320:-1:-1:color=white@0.0`,
    '-quality', metadata.quality || '50',
    '-preset', 'default',
    ...(isVideo ? ['-loop', '0', '-t', '00:00:10', '-an'] : [])
  ]
  
  return new Promise((resolve, reject) => {
    fluent(input)
      .addOutputOptions(options)
      .toFormat('webp')
      .on('error', reject)
      .on('end', () => {
        try {
          const result = fs.readFileSync(output)
          cleanupFiles(input, output)
          resolve(result)
        } catch (e) {
          cleanupFiles(input, output)
          reject(e)
        }
      })
      .save(output)
  })
}

function cleanupFiles(...files) {
  files.forEach(file => {
    try {
      if (fs.existsSync(file)) fs.unlinkSync(file)
    } catch (e) {
      console.error('Error limpiando archivo:', file, e)
    }
  })
}

function isUrl(text) {
  try {
    new URL(text)
    return true
  } catch {
    return false
  }
}
