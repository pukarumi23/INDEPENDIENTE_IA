let handler = async (m, { conn, args, participants }) => {
  let users = Object.entries(global.db.data.users).map(([key, value]) => {
    return {...value, jid: key}
  })
  
  let sortedExp = users.map(toNumber('exp')).sort(sort('exp'))
  let sortedLim = users.map(toNumber('limit')).sort(sort('limit'))
  let sortedLevel = users.map(toNumber('level')).sort(sort('level'))
  
  let usersExp = sortedExp.map(enumGetKey)
  let usersLim = sortedLim.map(enumGetKey)
  let usersLevel = sortedLevel.map(enumGetKey)
  
  let len = args[0] && args[0].length > 0 ? Math.min(10, Math.max(parseInt(args[0]), 5)) : Math.min(5, sortedExp.length)
  
  // Función para generar barras de progreso con emojis
  const progressBar = (value, max, length = 10) => {
    const filled = Math.round((value / max) * length)
    return '▰'.repeat(filled) + '▱'.repeat(length - filled)
  }
  
  // Función para formatear números con estilo
  const formatNumber = num => {
    return new Intl.NumberFormat('es-ES').format(num)
  }
  
  // Emojis para las posiciones
  const getMedal = (i) => {
    const medals = ['🥇', '🥈', '🥉', '🔹', '🔸']
    return medals[i] || `▫️`
  }
  
  let text = `
╔════════════════╗
  🌟 *LÍDERES DEL BOT* 🌟
╚════════════════╝

🎖️ *TOP ${len} INTIS* 🪙
${sortedLim.slice(0, len).map(({ jid, limit }, i) => {
  let name = participants.some(p => jid === p.jid) ? conn.getName(jid) : jid.split`@`[0]
  let medal = getMedal(i)
  let bar = progressBar(limit, sortedLim[0].limit, 12)
  return `${medal} ${name} ➟ *${formatNumber(limit)}* 🪙\n   ${bar} ${Math.round((limit/sortedLim[0].limit)*100)}%`
}).join('\n')}

📊 *Tu posición:* #${usersLim.indexOf(m.sender) + 1} de ${usersLim.length}

══════════════════

🚀 *TOP ${len} EXPERIENCIA* 💫
${sortedExp.slice(0, len).map(({ jid, exp }, i) => {
  let name = participants.some(p => jid === p.jid) ? conn.getName(jid) : jid.split`@`[0]
  let medal = getMedal(i)
  let bar = progressBar(exp, sortedExp[0].exp, 12)
  return `${medal} ${name} ➟ *${formatNumber(exp)}* XP\n   ${bar} ${Math.round((exp/sortedExp[0].exp)*100)}%`
}).join('\n')}

📊 *Tu posición:* #${usersExp.indexOf(m.sender) + 1} de ${usersExp.length}

══════════════════

📈 *TOP ${len} NIVELES* 🏆
${sortedLevel.slice(0, len).map(({ jid, level }, i) => {
  let name = participants.some(p => jid === p.jid) ? conn.getName(jid) : jid.split`@`[0]
  let medal = getMedal(i)
  let bar = progressBar(level, sortedLevel[0].level, 12)
  return `${medal} ${name} ➟ Nivel *${formatNumber(level)}*\n   ${bar} ${Math.round((level/sortedLevel[0].level)*100)}%`
}).join('\n')}

📊 *Tu posición:* #${usersLevel.indexOf(m.sender) + 1} de ${usersLevel.length}

══════════════════
💡 *Sigue activo para subir en el ranking!*
`.trim()

  // Enviar mensaje con menciones
  conn.sendMessage(m.chat, {
    text: text,
    contextInfo: {
      mentionedJid: [...usersExp.slice(0, len), ...usersLim.slice(0, len), ...usersLevel.slice(0, len)]
        .filter(jid => jid !== m.sender)
    }
  }, { quoted: m })
}

handler.help = ['top', 'leaderboard', 'lb']
handler.tags = ['rpg', 'games']
handler.command = ['leaderboard', 'lb', 'top', 'ranking'] 
handler.register = true
handler.fail = null
handler.exp = 0

export default handler

function sort(property, ascending = true) {
  if (property) return (...args) => args[ascending & 1][property] - args[!ascending & 1][property]
  else return (...args) => args[ascending & 1] - args[!ascending & 1]
}

function toNumber(property, _default = 0) {
  if (property) return (a, i, b) => {
    return {...b[i], [property]: a[property] === undefined ? _default : a[property]}
  }
  else return a => a === undefined ? _default : a
}

function enumGetKey(a) {
  return a.jid
}
