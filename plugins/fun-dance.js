let handler = async (m, { conn, usedPrefix, command }) => {
  let pp = 'https://tinyurl.com/26djysdo'
  let pp2 = 'https://tinyurl.com/294oahv9'
  
  // Verificación mejorada
  if (!m.isGroup) return conn.reply(m.chat, '🔇 *¡Este comando es solo para grupos!*', m)
  if (!m.mentionedJid?.[0]) {
    return conn.reply(m.chat, `💃 *¡Debes mencionar a alguien!*\nEjemplo: *${usedPrefix}dance @usuario*`, m)
  }
  
  // Obtención segura de nombres (evitando undefined)
  let name = await conn.getName(m.sender) || 'Usuario misterioso'
  let name2 = await conn.getName(m.mentionedJid[0]) || 'Alguien especial'

  let caption = `
✨ *¡FIESTA DE BAILE!* ✨

╭・🍃・―――・🎶・―――・🍃・╮

🔆 *${name}* está bailando con *${name2}* 
${'(ﾉ^ヮ^)ﾉ*:・ﾟ✧'.repeat(2)}

╰・🌸・―――・🎵・―――・🌸・╯
`.trim()

  await conn.sendMessage(m.chat, { 
    video: { url: [pp, pp2].getRandom() }, 
    gifPlayback: true,
    caption: caption,
    mentions: [m.sender, m.mentionedJid[0]],
    contextInfo: {
      externalAdReply: {
        title: `${name} 💖 ${name2}`,
        body: "¡Combinación perfecta!",
        thumbnailUrl: pp,
        mediaType: 1
      }
    }
  }, { quoted: m })
}

// Configuración del handler
handler.help = ['dance @usuario']
handler.tags = ['fun']
handler.command = ['dance', 'bailar']
handler.group = true
export default handler
