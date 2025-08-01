import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) return conn.reply(m.chat, 
        '🔶 Ingresa el enlace del vídeo de Facebook junto al comando.\n\n`Ejemplo:`\n' + 
        `*${usedPrefix + command}* https://www.facebook.com/official.trash.gang/videos/873759786348039/`, 
        m)
    
    await m.react('🕓')
    
    try {
        let { dl_url } = await Starlights.fbdl(args[0])
        if (!dl_url) throw new Error('No se pudo obtener el enlace de descarga')
        
        await conn.sendFile(m.chat, dl_url, 'fbdl.mp4', 
            '✅ Descarga completada', 
            m)
        await m.react('✅')
    } catch (e) {
        console.error(e)
        conn.reply(m.chat, '❌ Error al descargar el video de Facebook', m)
        await m.react('✖️')
    }
}

handler.help = ['fb <link>']
handler.tags = ['downloader']
handler.command = /^(facebook|fb|facebookdl|fbdl)$/i
// handler.limit = 1
handler.register = true
export default handler
