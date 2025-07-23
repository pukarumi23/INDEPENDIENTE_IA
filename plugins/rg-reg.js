import { createHash } from 'crypto'
import fs from 'fs'
import fetch from 'node-fetch'

let Reg = /\|?(.*)([.|] *?)([0-9]*)$/i
let handler = async function (m, { conn, text, usedPrefix, command }) {
  let user = global.db.data.users[m.sender]
  let name2 = conn.getName(m.sender)
  if (user.registered === true) return m.reply(`🔶 𝕐𝕒 𝕖𝕤𝕥á𝕤 𝕣𝕖𝕘𝕚𝕤𝕥𝕣𝕒𝕕𝕠  `)
  if (!Reg.test(text)) return m.reply(`*🔶 Por favor, ingresa tu nombre de usuario para proceder con el registro.*\n\n*🔶 Ejem. de Uso* :\n*${usedPrefix + command}*CHASKI.18`)
  let [_, name, splitter, age] = text.match(Reg)
  if (!name) return conn.reply(m.chat, '🔶𝕰𝖑 𝖓𝖔𝖒𝖇𝖗𝖊 𝖓𝖔 𝖕𝖚𝖊𝖉𝖊 𝖊𝖘𝖙𝖆𝖗 𝖛𝖆𝖈í𝖔 ', m, rcanal)
  if (!age) return conn.reply(m.chat, '🔶 𝕷𝖆 𝖊𝖉𝖆𝖉 𝖓𝖔 𝖕𝖚𝖊𝖉𝖊 𝖊𝖘𝖙𝖆𝖗 𝖛𝖆𝖈í𝖆 .', m, rcanal)
  age = parseInt(age)
  user.name = name.trim()
  user.age = age
  user.regTime = +new Date()
  user.registered = true
  let sn = createHash('md5').update(m.sender).digest('hex')
  let img = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://tinyurl.com/2ckm7gda')
  
  let now = new Date()
  let date = now.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
  let time = now.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit', second: '2-digit' })
  
  let txt = '*`🔶𝓡𝓔𝓖𝓘𝓢𝓣𝓡𝓞 𝓤𝓢𝓔𝓡🔶`*\n\n'
      txt += `\t*⫸ Tag* :: @${m.sender.split('@')[0]}\n`
      txt += `\t*⫸ Nombre* :: ${name}\n`
      txt += `\t*⫸ Edad* :: ${age} años\n\n`
      txt += `\t*⫸ Fecha* :: ${date}\n`
      txt += `\t*⫸ Hora* :: ${time}\n\n`
      txt += `> Escribe *${usedPrefix}profile* para ver tu perfil.`
      
  await conn.sendFile(m.chat, img, 'perfil.jpg', txt, m, false, { mentions: [m.sender] })
  await m.react('✅')
}

handler.help = ['reg'].map(v => v + ' *<nombre.edad>*')
handler.tags = ['rg']

handler.command = ['verify', 'reg', 'register', 'registrar']

export default handler
