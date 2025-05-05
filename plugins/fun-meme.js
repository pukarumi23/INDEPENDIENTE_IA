import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, usedPrefix, command }) => {
  await m.react('🕓')
  
  // 🔥 Lista de tus enlaces de TikTok (memes)
  const tiktokMemes = [
    "https://vm.tiktok.com/ZMBKu7Xp8/",
    "https://vm.tiktok.com/ZMBKuEuwv/",
    "https://vm.tiktok.com/ZMBKup4A5/",
    // Agrega más aquí...
  ];
  
  try {
    // 🔄 Selecciona un enlace al azar
    const randomLink = tiktokMemes[Math.floor(Math.random() * tiktokMemes.length)];
    
    // ⬇️ Descarga el video usando Starlights
    let { title, author, duration, dl_url } = await Starlights.tiktokdl(randomLink);
    
    let txt = '`乂  M E M E  -  T I K T O K`\n\n'
    txt += `	✩  *Título* : ${title || 'Sin título'}\n`
    txt += `	✩  *Autor* : ${author || 'TikTok'}\n`
    txt += `	✩  *Duración* : ${duration || 'N/A'} segundos\n\n`
    txt += `> 🔶 *${textbot}*`
    
    // 📤 Envía el video descargado
    await conn.sendFile(
      m.chat, 
      dl_url, 
      'meme-tiktok.mp4', 
      txt, 
      m,
      false, // Sin vista previa
      { mimetype: 'video/mp4' }
    );
    
    await m.react('✅')
  } catch (e) {
    console.error(e)
    await m.react('✖️')
    await conn.reply(m.chat, '❌ Error al descargar el meme de TikTok. ¿El enlace sigue vivo?', m)
  }
}

handler.help = ['memetk']
handler.tags = ['fun']
handler.command = /^(memetk|memetiktok|tkememe)$/i
handler.register = true

export default handler
