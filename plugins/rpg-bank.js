let handler = async (m, {conn, usedPrefix}) => {
   let who = m.mentionedJid[0] ? m.mentionedJid[0] : m.quoted ? m.quoted.sender : m.sender
   if (who == conn.user.jid) return m.react('✖️')
   if (!(who in global.db.data.users)) return m.reply(`*El usuario no se encuentra en mi base de datos*`)
   let user = global.db.data.users[who]
   await m.reply(`${who == m.sender ? `╔═════.·:·.🏦.·:·.════╗\n.               𝘽𝘼𝙉𝘾𝙊  \n╟═══════⟡══════╢ \n⫸ *${user.bank} 🪙 𝙄𝙉𝙏𝙄𝙎* \n╚═════.·:·.🌀.·:·.════╝` : `╔═════.·:·.🏦.·:·.════╗\n.               𝘽𝘼𝙉𝘾𝙊  \n╟═══════⟡══════╢ \n⫸*Usuario:*@${who.split('@')[0]} \n⫸*Saldo:* *${user.bank} 🪙 𝙄𝙉𝙏𝙄𝙎* \n╚═════.·:·.🌀.·:·.════╝`}`, null, { mentions: [who] })
}

handler.help = ['bank']
handler.tags = ['rpg']
handler.command = ['bank', 'banco'] 
handler.register = true 
export default handler 
