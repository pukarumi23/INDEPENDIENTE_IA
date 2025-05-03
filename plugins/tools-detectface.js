import fs from 'fs';
import FormData from 'form-data';
import axios from 'axios';
import fetch from 'node-fetch';

let handler = async (m, { conn }) => {
let q = m.quoted ? m.quoted : m;
let mime = (q.msg || q).mimetype || '';

if (!mime.startsWith('image/')) { 
return m.reply('🔶 Responde a una *Imagen.*');
}
  
await m.react('🕓');

let media = await q.download();
let formData = new FormData();
formData.append('image', media, { filename: 'file' });

  let uploadResponse = await axios.post('https://api.imgbb.com/1/upload?key=10604ee79e478b08aba6de5005e6c798', formData, { headers: { ...formData.getHeaders(),}});

if (uploadResponse.data.data) {
let url = uploadResponse.data.data.url;
let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/detect-faces?url=${url}`);
let json = await api.json();
let { results } = json;
let txt = '`乂  D E T E C T - F A C E`\n\n'
    txt += `	✩  *Forma* : ${results.form}\n` 
    txt += `	✩  *Genero* : ${results.gender}\n\n` 
    txt += `> 🔶 *${textbot}*`

await conn.reply(m.chat, txt, m, null, rcanal)
await m.react('✅')
} else {
await m.react('✖️');
}
};

handler.help = ['detectface']
handler.tags = ['tools']
handler.command = /^(detectface|detectarcara|detect-face)$/i;
handler.register = true 

export default handler;
