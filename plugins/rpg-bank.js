let handler = async (m, {conn, usedPrefix}) => {
   let who
   if (m.isGroup) {
      who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   } else {
      who = m.sender
   }
   
   if (who === conn.user.jid) return m.react('✖️')
   if (!(who in global.db.data.users)) return m.reply(`*El usuario no se encuentra en mi base de datos*`)
   
   let user = global.db.data.users[who]
   let username = who.split('@')[0]
   let mention = [who]
   
   await conn.sendMessage(m.chat, {
      text: `${who === m.sender ? `Tienes *${user.bank} ⭐ Estrellas* en el Banco` : `El usuario @${username} tiene *${user.bank} ⭐ Estrellas* en el Banco`}`,
      mentions: mention
   }, { quoted: m })
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = ['bank', 'banco'] 
handler.register = true 
export default handler
