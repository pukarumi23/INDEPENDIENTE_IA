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
    if (/image|video/g.test(mime) && q.download) {
      if (/video/.test(mime) && (q.msg || q).seconds > 11)
        return conn.reply(m.chat, '💙 El video no puede durar más de *10 segundos*', m)
      buffer = await q.download()
    } else if (args[0] && isUrl(args[0])) {
      const res = await fetch(args[0])
      buffer = await res.buffer()
    } else {
      return conn.reply(m.chat, '💙 Responde a una *imagen o video*.', m)
    }
    await m.react('🕓')

    const stickers = await toWebp(buffer) 
    
    await conn.sendFile(m.chat, stickers, 'sticker.webp', '', m)
    await m.react('✅')
  } catch (e) {
    console.error(e) // Agregado para depuración
    await m.react('✖️')
    conn.reply(m.chat, '❌ Ocurrió un error al crear el sticker', m)
  }
}

handler.help = ['sticker']
handler.tags = ['sticker']
handler.command = ['s', 'sticker', 'stiker']
handler.register = true 

export default handler

async function toWebp(buffer, opts = {}) {
  const { name = '', author = '', emojis = [] } = opts
  const type = await fromBuffer(buffer)
  if (!type) throw 'No se pudo determinar el tipo de archivo'
  
  const { ext } = type
  if (!/(png|jpg|jpeg|mp4|mkv|m4p|gif|webp)/i.test(ext)) throw 'Media no compatible.'

  const tempDir = global.tempDir || './tmp'
  if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir, { recursive: true })
  
  const input = path.join(tempDir, `${Date.now()}.${ext}`)
  const output = path.join(tempDir, `${Date.now()}.webp`)
  fs.writeFileSync(input, buffer)

  let aspectRatio = opts.isFull
    ? `scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease`
    : `scale='if(gt(iw,ih),-1,299):if(gt(iw,ih),299,-1)', crop=299:299:exact=1`

  let options = [
    '-vcodec', 'libwebp',
    '-vf', `${aspectRatio}, fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`,
    ...(ext.match(/(mp4|mkv|m4p|gif)/) ? ['-loop', '0', '-ss', '00:00:00', '-t', '00:00:10', '-preset', 'default', '-an', '-vsync', '0'] : [])
  ]

  return new Promise((resolve, reject) => {
    fluent(input)
      .addOutputOptions(options)
      .toFormat('webp')
      .on('error', (err) => {
        fs.unlinkSync(input)
        reject(err)
      })
      .on('end', () => {
        try {
          const result = fs.readFileSync(output)
          fs.unlinkSync(input)
          fs.unlinkSync(output)
          resolve(result)
        } catch (e) {
          reject(e)
        }
      })
      .save(output)
  })
}

function isUrl(text) {
  return text.match(
    /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)(jpe?g|gif|png|mp4|webp)/i
  )
}
