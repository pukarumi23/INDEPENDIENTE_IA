import { tikdown } from '@bochilteam/scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Verificar si se proporcionó un enlace
    if (!args[0]) {
        return conn.reply(m.chat, `🔶 Por favor ingresa un enlace de TikTok que contenga imágenes\n\nEjemplo: ${usedPrefix + command} https://vm.tiktok.com/xxxxx`, m);
    }

    // Validar que sea un enlace de TikTok
    if (!args[0].match(/tiktok|vm.tiktok/gi)) {
        return conn.reply(m.chat, `🔶 El enlace proporcionado no es de TikTok. Verifica el enlace e inténtalo nuevamente.`, m);
    }

    await m.react('🕓');

    try {
        // Descargar información del TikTok
        const result = await tikdown(args[0]);
        
        // Verificar si hay imágenes
        if (!result.images || result.images.length === 0) {
            await m.react('❌');
            return conn.reply(m.chat, '🔶 No se encontraron imágenes en este enlace de TikTok.', m);
        }

        // Crear texto descriptivo
        let txt = `🔶 *TikTok Images Downloader* 🔶\n\n`;
        txt += `👤 *Usuario:* ${result.author?.username || 'Desconocido'}\n`;
        txt += `👀 *Vistas:* ${result.play_count || 'N/A'}\n`;
        txt += `💬 *Comentarios:* ${result.comment_count || 'N/A'}\n`;
        txt += `🔄 *Compartidos:* ${result.share_count || 'N/A'}\n`;
        txt += `❤️ *Likes:* ${result.digg_count || 'N/A'}\n\n`;
        txt += `ℹ️ Descargando ${result.images.length} imagen(es)...`;

        // Enviar cada imagen
        for (let i = 0; i < result.images.length; i++) {
            try {
                // Verificar si la URL de la imagen es válida
                const imageUrl = result.images[i];
                if (!imageUrl.match(/^https?:\/\//i)) continue;

                // Descargar la imagen primero para verificar
                const res = await fetch(imageUrl);
                if (!res.ok) continue;

                // Enviar la imagen al chat
                await conn.sendFile(
                    m.chat,
                    imageUrl,
                    `tiktok-img-${i + 1}.jpg`,
                    i === 0 ? txt : '', // Solo enviar el texto con la primera imagen
                    m
                );
                await m.react('✅');
            } catch (error) {
                console.error(`Error al enviar imagen ${i + 1}:`, error);
                await m.react('⚠️');
            }
        }

    } catch (error) {
        console.error('Error en el comando tiktokimg:', error);
        await m.react('❌');
        return conn.reply(m.chat, '🔶 Ocurrió un error al procesar el enlace de TikTok. Por favor inténtalo nuevamente más tarde.', m);
    }
};

handler.help = ['tiktokimg <url>', 'ttimg <url>'];
handler.tags = ['downloader'];
handler.command = /^(tiktokimg|tiktokimgs|ttimg|ttimgs)$/i;
handler.limit = true;
handler.register = true;

export default handler;
