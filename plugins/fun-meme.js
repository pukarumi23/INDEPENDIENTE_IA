import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, usedPrefix, command }) => {
  await m.react('🕓')
  
  // 🔥 Lista de tus memes de TikTok (reemplaza con tus enlaces)
  const tiktokMemes = [
    "https://vm.tiktok.com/ZMBKuENd9/",
    "https://vm.tiktok.com/ZMBK9kcu5/",
    "https://vm.tiktok.com/ZMBK9Sdjm/",
  ];
  
  try {
    // Elige un meme al azar
    const randomLink = tiktokMemes[Math.floor(Math.random() * tiktokMemes.length)];
    
    // Descarga el video
    let { title, author, duration, dl_url } = await Starlights.tiktokdl(randomLink);
    
    let txt = `⫹⫺ *Meme de TikTok* ⫸\n\n`
    txt += `	◦  *Título* : ${title || 'Sin título'}\n`
    txt += `	◦  *Creador* : ${author || 'TikTok'}\n`
    txt += `	◦  *Duración* : ${duration || 'N/A'} segundos\n\n`
    txt += `> 😂 *Disfruta el meme*`
    
    // Envía el video
    await conn.sendFile(
      m.chat, 
      dl_url, 
      'meme-tiktok.mp4', 
      txt, 
      m,
      false,
      { mimetype: 'video/mp4' }
    );
    
    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('✖️')
    await conn.reply(m.chat, `❌ Error al descargar el meme. Usa *${usedPrefix}tiktok* <enlace> para descargar manualmente.`, m)
  }
}

// 🔥 Aquí defines los comandos (ahora incluye .meme)
handler.help = ['meme', 'memetk']
handler.tags = ['fun']
handler.command = /^(meme|memetk|memetiktok|tkememe)$/i
handler.register = true

export default handler
