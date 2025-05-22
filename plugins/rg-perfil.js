import { canLevelUp, xpRange } from '../lib/levelling.js'
import { createHash } from 'crypto'
import PhoneNumber from 'awesome-phonenumber'
import fetch from 'node-fetch'
import fs from 'fs'
import axios from 'axios' 

let handler = async (m, { conn, usedPrefix, command }) => {
  try {
    let who = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;
    let user = global.db.data.users[who];

    if (!user) {
      return m.reply(`🚫 El usuario no está registrado.`);
    }

    let { exp, limit, name, registered, age, level } = user;
    let { min, xp } = xpRange(user.level, global.multiplier);
    let username = conn.getName(who);
    let prem = global.prems.includes(who.split`@`[0]);
    let bio = await conn.fetchStatus(who).catch(_ => ({ status: 'Sin Info' }));
    let biot = bio.status;
    let pp = await conn.profilePictureUrl(who, 'image').catch(_ => 'https://i.ibb.co/tqWV67y/file.jpg');

  
    let phoneNum = new PhoneNumber('+' + who.replace('@s.whatsapp.net', ''));
    let phoneFormatted = phoneNum.getNumber('international');

    
    let userNationality = 'Desconocido';
    try {
      let api = await axios.get(`https://deliriussapi-oficial.vercel.app/tools/country?text=${phoneFormatted}`);
      let userNationalityData = api.data.result;
      if (userNationalityData) {
        userNationality = `${userNationalityData.name} ${userNationalityData.emoji}`;
      }
    } catch (err) {
      console.error('Error al obtener la nacionalidad:', err);
    }

    let txt = `💙 *P E R F I L  -  U S E R 💙*\n\n`;
    txt += `┌  💙  *Nombre* : ${name}\n`;
    txt += `│  💙  *Edad* : ${registered ? `${age} años` : '×'}\n`;
    txt += `│  💙  *Número* : ${phoneFormatted}\n`;
    txt += `│  💙  *Nacionalidad* : ${userNationality}\n`;
    txt += `│  💙  *Link* : wa.me/${who.split`@`[0]}\n`;
    txt += `│  💙  *Cebollines* : ${limit}\n`;
    txt += `│  💙  *Nivel* : ${level}\n`;
    txt += `│  💙  *XP* : Total ${exp} (${exp - min}/${xp})\n`;
    txt += `│  💙  *Premium* : ${prem ? '✅ Sí' : '❌ No'}\n`;
    txt += `└  💙  *Registrado* : ${registered ? '✅ Sí' : '❌ No'}`;

    let img = await (await fetch(pp)).buffer();
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, false, { mentions: [who] });

  } catch (error) {
    console.error('Error en el comando de perfil:', error);
    m.reply('❌ Ocurrió un error al generar el perfil.');
  }
};

handler.help = ['perfil', 'perfil *@user*'];
handler.tags = ['rg'];
handler.command = /^(perfil|profile)$/i;
handler.register = true;

export default handler;
