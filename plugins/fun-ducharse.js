import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    // Obtener información del remitente
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.isGroup ? m.sender : m.chat;
    let name = conn.getName(who);
    
    // Reaccionar al mensaje
    await m.react('🫧');
    
    // Mensaje personalizado
    let str = `${name} está tomando una ducha 🫧`.trim();

    if (m.isGroup) {
        // Lista de videos disponibles
        const showerVideos = [
            'https://qu.ax/JZvz.mp4',
            'https://qu.ax/yRRc.mp4',
            'https://qu.ax/Onas.mp4',
            'https://qu.ax/kwcA.mp4',
            'https://qu.ax/XNDF.mp4',
            'https://qu.ax/GZDB.mp4'
        ];
        
        // Seleccionar video aleatorio
        const randomVideo = showerVideos[Math.floor(Math.random() * showerVideos.length)];
        
        // Enviar mensaje con el video
        await conn.sendMessage(
            m.chat, 
            {
                video: { url: randomVideo }, 
                gifPlayback: true, 
                caption: str, 
                mentions: [who]
            }, 
            { quoted: m }
        );
    } else {
        // Respuesta para chats privados
        await conn.sendMessage(
            m.chat,
            { text: `${name}, este comando solo funciona en grupos.` },
            { quoted: m }
        );
    }
}

// Información de ayuda
handler.help = ['bathe', 'bañarse', 'ducharse'];
handler.tags = ['fun', 'group'];
handler.command = /^(bathe|bañarse|ducharse)$/i;
handler.group = true;

export default handler;
