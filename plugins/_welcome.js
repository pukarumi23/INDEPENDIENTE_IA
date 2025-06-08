import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://tinyurl.com/2cd94clt')
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    let bienvenida = `🔶▰▰ *${botname}* ▰▰🔶 \n▮🔆 *¡Bienvenid@!* 🔆\n▮🎤 *Usuario:@${m.messageStubParameters[0].split`@`[0]} \n▮🎶 *Grupo: ${groupMetadata.subject}\n▮🔶 *¡El universo vibra* \n▮ *en cada pensamiento!* 🎵 \n🔶▰▰▰▰▰▰▰▰■🔶`
    
await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal, estilo)
  }
  
  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `🔶▰▰ *${botname}* ▰▰🔶 \n▮🚫 *Expulsión confirmada.\n▮🎤 *Usuario: @${m.messageStubParameters[0].split`@`[0]} \n▮ 💔 *Fue removido del grupo.\n▮  🌿 Que el flujo nunca se detenga.\n 🔶▰▰▰▰▰▰▰▰■🔶`
await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal, estilo)
  }
  
  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `🔶▰▰ *${botname}* ▰▰🔶 \n▮😢 *Adiós, usuario.*\n▮🎤 *Usuario:「 @${m.messageStubParameters[0].split`@`[0]} \n▮  💔 *Se fue del grupo...\n▮   🪐 *Tu eco perdura en el cosmos.* 🎶\n   🔶▰▰▰▰▰▰▰▰■🔶`
await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal, estilo)
}}
