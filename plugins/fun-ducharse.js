import fs from 'fs';
import path from 'path';

let handler = async (m, { conn, usedPrefix }) => {
    let who = m.sender; // Siempre el que ejecuta el comando
    let user = global.db.data.users[who];
    let name = conn.getName(who);
    
    // Reacción al mensaje
    await m.react('🫧');
    
    // Mensaje mejorado con mejor diseño
    let str = `╭━━━━━━━━━━━━━━━━━━━━━━╮
┃ 🫧 *HORA DEL BAÑO* 🫧 ┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

🚿 **${name}** está tomando una ducha

🫧 *Estado:* Bañándose
🧼 *Limpieza:* En progreso
💧 *Agua:* Corriendo
🎵 *Cantando:* Probablemente sí

━━━━━━━━━━━━━━━━━━━━━━
_¡Que disfrutes tu baño relajante!_ 🛁`.trim();
    
    if (m.isGroup) {
        // URLs de videos de baño/ducha
        let videos = [
            'https://qu.ax/JZvz.mp4', 
            'https://qu.ax/yRRc.mp4', 
            'https://qu.ax/Onas.mp4',
            'https://qu.ax/kwcA.mp4',
            'https://qu.ax/XNDF.mp4',
            'https://qu.ax/GZDB.mp4'
        ];
        
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        try {
            // Enviar video con el mensaje
            await conn.sendMessage(m.chat, { 
                video: { url: video }, 
                gifPlayback: true, 
                caption: str, 
                mentions: [m.sender] 
            }, { quoted: m });
        } catch (error) {
            // Si falla el video, enviar solo texto
            console.log('Error enviando video:', error);
            await conn.sendMessage(m.chat, { 
                text: str, 
                mentions: [m.sender] 
            }, { quoted: m });
        }
    } else {
        // En chat privado, solo texto
        await m.reply(str);
    }
}

handler.help = ['bañarse', 'ducharse', 'bathe'];
handler.tags = ['fun'];
handler.command = ['bathe', 'bañarse', 'ducharse'];
handler.group = true;

export default handler;
