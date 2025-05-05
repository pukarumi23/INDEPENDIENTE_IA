import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, usedPrefix, command }) => {
  await m.react('🕓')
  try {
    // Obtener un meme aleatorio
    let { title, author, url, likes, shares } = await Starlights.randomMeme()
    
    let txt = '`乂  M E M E  -  A L E A T O R I O`\n\n'
    txt += `	✩  *Título* : ${title || 'Sin título'}\n`
    txt += `	✩  *Autor* : ${author || 'Desconocido'}\n`
    txt += `	✩  *Likes* : ${likes || 0}\n`
    txt += `	✩  *Compartido* : ${shares || 0} veces\n\n`
    txt += `> 🔶 *${textbot}*`
    
    // Enviar el meme (puede ser imagen o video)
    await conn.sendFile(m.chat, url, 'meme.jpg', txt, m)
    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('✖️')
    await conn.reply(m.chat, '❌ Ocurrió un error al obtener el meme. Intenta nuevamente.', m)
  }
}

handler.help = ['meme']
handler.tags = ['fun']
handler.command = /^(meme|randomeme|memerandom)$/i
handler.register = true

export default handler
