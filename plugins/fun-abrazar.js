import fetch from 'node-fetch';

const handler = async (m, {conn, usedPrefix, usedPrefix: _p, __dirname, text, isPrems}) => {
    // Verificar si se mencionó a un usuario
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : false;
    } else {
        who = m.chat;
    }
    if (!who) throw `▰▰▰▰▰🔶▰▰▰▰▰▰\nPor favor, menciona al usuario\n▰▰▰▰▰▰▰▰▰▰▰▰▰`;
    
    // Si el comando empieza con 'a' o 'A', no hacer nada
    if (usedPrefix == 'a' || usedPrefix == 'A') return;
    
    // Lista de videos para el abrazo
    const hugVideos = [
        "https://telegra.ph/file/4d80ab3a945a8446f0b15.mp4",
        "https://telegra.ph/file/ef3a13555dfa425fcf8fd.mp4",
        "https://telegra.ph/file/582e5049e4070dd99a995.mp4",
        "https://telegra.ph/file/ab57cf916c5169f63faee.mp4",
        "https://telegra.ph/file/fce96960010f6d7fc1670.mp4",
        "https://telegra.ph/file/33332f613e1ed024be870.mp4"
    ];
    
    try {
        const taguser = '@' + m.sender.split('@s.whatsapp.net')[0];
        const target = '@' + who.split('@')[0];
        
        // Mensaje con formato mejorado
        const str = `
▰▰▰▰▰🔶▰▰▰▰▰▰
${taguser} le está dando un fuerte abrazo a ${target} 🫂
▰▰▰▰▰▰▰▰▰▰▰▰▰
`.trim();
        
        // Configuración del mensaje
        const messageOptions = {
            video: { url: hugVideos[Math.floor(Math.random() * hugVideos.length)] },
            gifPlayback: true,
            caption: str,
            mentions: [m.sender, who]
        };
        
        // Enviar mensaje
        await conn.sendMessage(m.chat, messageOptions, { quoted: m });
        
    } catch (error) {
        console.error(error);
        conn.reply(m.chat, '▰▰▰▰▰🔶▰▰▰▰▰▰\nOcurrió un error inesperado\n▰▰▰▰▰▰▰▰▰▰▰▰▰', m);
    }
};

handler.help = ['hug'].map(v => v + ' @usuario');
handler.tags = ['game'];
handler.command = /^(abrazar|hug)$/i;
handler.register = true;
export default handler;
