import Starlights from '@StarlightsTeam/Scraper'

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Verificar que se proporcione un enlace
    if (!args || !args[0]) {
        return conn.reply(m.chat, 
            `🔶 *Ingresa el enlace del vídeo de Facebook*\n\n` +
            `📌 *Ejemplo:*\n` +
            `> ${usedPrefix + command} https://www.facebook.com/official.trash.gang/videos/873759786348039/\n\n` +
            `✅ *Formatos soportados:*\n` +
            `• facebook.com/watch/\n` +
            `• facebook.com/videos/\n` +
            `• fb.watch/`, 
            m
        )
    }

    // Validar que sea un enlace de Facebook
    const fbRegex = /(https?:\/\/)?(www\.)?(facebook\.com|fb\.watch)/i
    if (!fbRegex.test(args[0])) {
        return conn.reply(m.chat, '❌ *Enlace inválido*\n\nPor favor ingresa un enlace válido de Facebook.', m)
    }

    await m.react('🕓')
    
    try {
        // Mensaje de descarga en progreso
        const loadingMsg = await conn.reply(m.chat, '⏳ *Descargando video de Facebook...*\n\n_Esto puede tardar unos momentos_', m)
        
        // Descargar el video
        const result = await Starlights.fbdl(args[0])
        
        // Verificar que se obtuvo el resultado
        if (!result || !result.dl_url) {
            throw new Error('No se pudo obtener el enlace de descarga')
        }

        // Editar mensaje de carga
        await conn.sendMessage(m.chat, { 
            text: '📤 *Enviando video...*', 
            edit: loadingMsg.key 
        })

        // Enviar el video
        await conn.sendMessage(m.chat, {
            video: { url: result.dl_url },
            caption: `✅ *Video descargado exitosamente*\n\n` +
                    `📱 *Fuente:* Facebook\n` +
                    `🔗 *Enlace original:* ${args[0]}\n` +
                    `⏰ *Descargado:* ${new Date().toLocaleString('es-ES')}\n\n` +
                    `_Bot desarrollado por tu equipo_ 🤖`,
            fileName: `facebook_video_${Date.now()}.mp4`,
            mimetype: 'video/mp4'
        }, { quoted: m })

        await m.react('✅')
        
        // Eliminar mensaje de carga
        await conn.sendMessage(m.chat, { delete: loadingMsg.key })

    } catch (error) {
        console.error('Error en fbdl:', error)
        
        await m.react('❌')
        
        // Mensaje de error más detallado
        let errorMsg = '❌ *Error al descargar el video*\n\n'
        
        if (error.message.includes('private')) {
            errorMsg += '🔒 *El video es privado o no está disponible públicamente*'
        } else if (error.message.includes('not found')) {
            errorMsg += '🔍 *Video no encontrado o enlace inválido*'
        } else if (error.message.includes('network')) {
            errorMsg += '🌐 *Error de conexión, intenta más tarde*'
        } else {
            errorMsg += `⚠️ *Motivo:* ${error.message || 'Error desconocido'}\n\n` +
                       `💡 *Sugerencias:*\n` +
                       `• Verifica que el enlace sea correcto\n` +
                       `• Asegúrate que el video sea público\n` +
                       `• Intenta con otro video\n` +
                       `• Reporta el error si persiste`
        }
        
        await conn.reply(m.chat, errorMsg, m)
    }
}

handler.help = ['facebook *<enlace>*', 'fb *<enlace>*']
handler.tags = ['downloader'] 
handler.command = /^(facebook|fb|facebookdl|fbdl)$/i
handler.register = true
// handler.limit = 1
// handler.premium = false

export default handler
