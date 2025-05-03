import {WAMessageStubType} from '@whiskeysockets/baileys'
import fetch from 'node-fetch'

export async function before(m, {conn, participants, groupMetadata}) {
  if (!m.messageStubType || !m.isGroup) return !0;
  let pp = await conn.profilePictureUrl(m.messageStubParameters[0], 'image').catch(_ => 'https://i.imgur.com/8Km9tLL.png') // Imagen de escuela por defecto
  let img = await (await fetch(`${pp}`)).buffer()
  let chat = global.db.data.chats[m.chat]

  if (chat.bienvenida && m.messageStubType == 27) {
    let bienvenida = `🎓 *¡Nuevo Estudiante!* �\n\n👋 @${m.messageStubParameters[0].split`@`[0]}\n📚 Bienvenido a: *${groupMetadata.subject}*\n\n"El saber es poder"\n\n📝 Participa y respeta las normas`
    await conn.sendAi(m.chat, botname, textbot, bienvenida, img, img, canal, estilo)
  }
  
  if (chat.bienvenida && m.messageStubType == 28) {
    let bye = `🚪 *Salida del Grupo* 📚\n\n👋 @${m.messageStubParameters[0].split`@`[0]}\n\n"Lo aprendido siempre será tuyo"\n\n🏫 Gracias por participar`
    await conn.sendAi(m.chat, botname, textbot, bye, img, img, canal, estilo)
  }
  
  if (chat.bienvenida && m.messageStubType == 32) {
    let kick = `⚠️ *Removido del Grupo* 🎓\n\n👤 @${m.messageStubParameters[0].split`@`[0]}\n\n📌 Incumplió las normas académicas\n\n"El respeto es parte del aprendizaje"`
    await conn.sendAi(m.chat, botname, textbot, kick, img, img, canal, estilo)
  }
}
