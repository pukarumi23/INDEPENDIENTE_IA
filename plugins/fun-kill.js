import fs from 'fs';
import path from 'path';
import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, usedPrefix, text, participants }) => {
    let who;
    
    // Mejorar la lógica para obtener el objetivo
    if (m.isGroup) {
        // Si menciona a alguien
        if (m.mentionedJid && m.mentionedJid[0]) {
            who = m.mentionedJid[0];
        }
        // Si responde a un mensaje
        else if (m.quoted && m.quoted.sender) {
            who = m.quoted.sender;
        }
        // Si escribe un texto (buscar usuario por texto)
        else if (text) {
            let user = participants.find(u => 
                conn.getName(u.id).toLowerCase().includes(text.toLowerCase())
            );
            who = user ? user.id : null;
        }
        // Si no especifica, error
        else {
            who = null;
        }
    } else {
        // En chat privado, el objetivo es el chat
        who = m.chat;
    }
    
    // Verificar que se haya especificado un objetivo
    if (!who) {
        return conn.reply(m.chat, `🔶 *Uso incorrecto*\n\n• Menciona: \`${usedPrefix}matar @usuario\`\n• Responde: \`${usedPrefix}matar\` (respondiendo a un mensaje)\n• Por nombre: \`${usedPrefix}matar nombre\``, m);
    }
    
    // Verificar que no se mate a sí mismo
    if (who === m.sender) {
        return conn.reply(m.chat, '🤔 *No puedes matarte a ti mismo...*\n\n_¿Todo bien? Si necesitas ayuda, habla con alguien de confianza._', m);
    }
    
    let user = global.db.data.users[who];
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    
    // Reacción al mensaje
    await conn.sendMessage(m.chat, { react: { text: '💀', key: m.key } });
    
    // Mensaje mejorado con mejor diseño
    let str = `╭━━━━━━━━━━━━━━━━━━━━━━╮
┃ 💀 *ELIMINACIÓN VIRTUAL* 💀 ┃
╰━━━━━━━━━━━━━━━━━━━━━━╯

🗡️ **${name2}** acaba de eliminar a **${name}**

💀 *Estado:* ~~Vivo~~ ➤ **Muerto**
⚰️ *Causa:* Comando de diversión
🎭 *Efecto:* Solo virtual, tranquilos

━━━━━━━━━━━━━━━━━━━━━━
_¡Es solo por diversión! Nadie sale lastimado realmente._`.trim();
    
    if (m.isGroup) {
        // URLs de videos (verificar que funcionen)
        let videos = [
            'https://qu.ax/GQLO.mp4',
            'https://qu.ax/bzFY.mp4', 
            'https://qu.ax/OQFE.mp4',
            'https://qu.ax/GssX.mp4'
        ];
        
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        try {
            // Enviar el video con menciones
            await conn.sendMessage(m.chat, { 
                video: { url: video }, 
                gifPlayback: true, 
                caption: str, 
                mentions: [who, m.sender] 
            }, { quoted: m });
        } catch (error) {
            // Si falla el video, enviar solo el texto
            console.log('Error enviando video:', error);
            await conn.reply(m.chat, str, m, { mentions: [who, m.sender] });
        }
    } else {
        // En chat privado, solo texto
        await conn.reply(m.chat, str, m);
    }
}

handler.help = ['matar @tag/responder/nombre'];
handler.tags = ['fun'];
handler.command = /^(matar|kill|asesinar)$/i;
handler.register = true;
handler.group = true;

export default handler;
