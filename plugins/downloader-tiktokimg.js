import { tikdown } from '@bochilteam/scraper';
import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    // Verificar si se proporcionó un enlace
    if (!args[0]) {
        return conn.reply(m.chat, `🔶 Por favor ingresa un enlace de TikTok que contenga imágenes\n\nEjemplo: ${usedPrefix + command} https://vm.tiktok.com/xxxxx`, m);
    }

    // Validar que sea un enlace de TikTok
    const tiktokRegex = /(tiktok\.com|vm\.tiktok\.com|vt\.tiktok\.com)/i;
    if (!tiktokRegex.test(args[0])) {
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
        let caption = `*🔶 TikTok Images Downloader 🔶*\n\n`;
        caption += `👤 *Usuario:* ${result.author?.username || 'Desconocido'}\n`;
        caption += `📌 *Descripción:* ${result.description || 'Sin descripción'}\n`;
        caption += `👀 *Vistas:* ${result.play_count || 'N/A'}\n`;
        caption += `💬 *Comentarios:* ${result.comment_count || 'N/A'}\n`;
        caption += `🔄 *Compartidos:* ${result.share_count || 'N/A'}\n`;
        caption += `❤️ *Likes:* ${result.digg_count || 'N/A'}\n\n`;
        caption += `📸 *Imágenes encontradas:* ${result.images.length}`;

        // Primero enviar el texto con la primera imagen
        if (result.images[0]) {
            await conn.sendFile(
                m.chat, 
                result.images[0], 
                'tiktok-img.jpg', 
                caption, 
                m,
                null,
                { 
                    mentions: [m.sender],
                    quoted: m,
                    // Configuración para asegurar que se envíe como imagen
                    mimetype: 'image/jpeg',
                    contextInfo: {
                        forwardingScore: 999,
                        isForwarded: true
                    }
                }
            );
            await m.react('✅');
        }

        // Enviar el resto de imágenes (si hay más)
        for (let i = 1; i < result.images.length; i++) {
            try {
                await conn.sendFile(
                    m.chat,
                    result.images[i],
                    `tiktok-img-${i+1}.jpg`,
                    '', // Sin texto adicional
                    m,
                    null,
                    {
                        mimetype: 'image/jpeg',
                        contextInfo: {
                            forwardingScore: 999,
                            isForwarded: true
                        }
                    }
                );
                await m.react('✅');
            } catch (error) {
                console.error(`Error al enviar imagen ${i+1}:`, error);
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
