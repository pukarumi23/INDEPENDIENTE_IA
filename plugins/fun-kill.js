import fs from 'fs';
import path from 'path';
import uploadImage from '../lib/uploadImage.js';
import { sticker } from '../lib/sticker.js';

let handler = async (m, { conn, usedPrefix }) => {
    let who;
    if (m.isGroup) {
        who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender;
    } else {
        who = m.chat;
    }
    
    if (!who) throw '🔶 Etiqueta o menciona a alguien';

    let user = global.db.data.users[who];
    let name = conn.getName(who);
    let name2 = conn.getName(m.sender);
    
    // Reacción al mensaje
    await conn.sendMessage(m.chat, { react: { text: '💀', key: m.key } });
    
    let str = `${name2} está matando a ${name}`.trim();
    
    if (m.isGroup) {
        // URLs de videos
        let pp = 'https://qu.ax/GQLO.mp4';
        let pp2 = 'https://qu.ax/bzFY.mp4';
        let pp3 = 'https://qu.ax/OQFE.mp4';
        let pp4 = 'https://qu.ax/GQLO.mp4';
        let pp5 = 'https://qu.ax/GssX.mp4';
        
        const videos = [pp, pp2, pp3, pp4, pp5];
        const video = videos[Math.floor(Math.random() * videos.length)];
        
        // Enviar el video con menciones
        await conn.sendMessage(m.chat, { 
            video: { url: video }, 
            gifPlayback: true, 
            caption: str, 
            mentions: [who, m.sender] 
        }, { quoted: m });
    }
}

handler.help = ['matar @tag'];
handler.tags = ['fun'];
handler.command = ['matar', 'kill', 'asesinar'];
handler.register = true;
handler.group = true;

export default handler;
