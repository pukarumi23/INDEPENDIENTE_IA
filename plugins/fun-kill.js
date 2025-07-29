let handler = async (m, { conn, usedPrefix, text }) => {
    let who;
    
    // Determinar quién es el objetivo
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : null;
    } else {
        who = m.chat;
    }
    
    // Si no encuentra objetivo, mostrar error
    if (!who) {
        return m.reply(`🔶 *Uso incorrecto*\n\nEjemplos:\n• ${usedPrefix}matar @usuario\n• Responde a un mensaje y usa ${usedPrefix}matar`);
    }
    
    // No permitir auto-eliminación
    if (who === m.sender) {
        return m.reply('🤔 No puedes eliminarte a ti mismo...');
    }
    
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    
    // Reacción al mensaje
    await conn.sendMessage(m.chat, { react: { text: '💀', key: m.key } });
    
    // Mensaje mejorado
    let mensaje = `╭━━━━━━━━━━━━━━━━━━━━━━╮
┃ 💀 *ELIMINACIÓN VIRTUAL* 💀 ┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

🗡️ **${name2}** eliminó a **${name}**

💀 *Estado:* ~~Vivo~~ ➤ **Muerto**
⚰️ *Efecto:* Solo virtual
🎭 *Diversión pura*

━━━━━━━━━━━━━━━━━━━━━━
_¡Nadie sale realmente lastimado!_`;
    
    if (m.isGroup) {
        // Videos de eliminación
        let videos = [
            'https://qu.ax/GQLO.mp4',
            'https://qu.ax/bzFY.mp4', 
            'https://qu.ax/OQFE.mp4',
            'https://qu.ax/GssX.mp4'
        ];
        
        const videoElegido = videos[Math.floor(Math.random() * videos.length)];
        
        try {
            // Intentar enviar video
            await conn.sendMessage(m.chat, { 
                video: { url: videoElegido }, 
                gifPlayback: true, 
                caption: mensaje, 
                mentions: [who, m.sender] 
            }, { quoted: m });
        } catch (e) {
            // Si falla, enviar solo texto
            await conn.sendMessage(m.chat, { 
                text: mensaje, 
                mentions: [who, m.sender] 
            }, { quoted: m });
        }
    } else {
        // Chat privado - solo texto
        await m.reply(mensaje);
    }
}

// Configuración del handler
handler.help = ['matar @usuario'];
handler.tags = ['fun'];
handler.command = ['matar', 'kill', 'asesinar'];
handler.register = true;
handler.group = true;

export default handler;
