import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, usedPrefix, command }) => {
  await m.react('🕓')
  
  // 🔥 Lista de tus memes de TikTok (reemplaza con tus enlaces)
  const tiktokMemes = [
    "https://vm.tiktok.com/ZMBKuENd9/",
    "https://vm.tiktok.com/ZMBK9kcu5/",
    "https://vm.tiktok.com/ZMBK9Sdjm/",
    "https://www.tiktok.com/@gekogx/video/7425447559558171909?is_from_webapp=1&sender_device=pc&web_id=7453501864148600326",
    "https://www.tiktok.com/@revanvr_/video/7474333463487794438?is_from_webapp=1&sender_device=pc&web_id=7453501864148600326",
    "https://www.tiktok.com/@wikferviz/video/7447432950813134086?is_from_webapp=1&sender_device=pc&web_id=7453501864148600326",
    "https://www.tiktok.com/@raytx000/video/7103401096684637446?is_from_webapp=1&sender_device=pc&web_id=7453501864148600326",
    "https://www.tiktok.com/@brandonrodas691/video/7446592544714050821?is_from_webapp=1&sender_device=pc&web_id=7453501864148600326",
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
