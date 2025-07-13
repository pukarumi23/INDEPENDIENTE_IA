let handler = async (m, { conn, usedPrefix, command }) => {
  let pp = 'https://tinyurl.com/26djysdo'
  let pp2 = 'https://tinyurl.com/294oahv9'
  
  // Verificación de mención en grupo
  if (!m.isGroup) return conn.reply(m.chat, '🔇 *¡Este comando es solo para grupos!*', m)
  if (!m.mentionedJid || m.mentionedJid.length === 0) {
    return conn.reply(m.chat, `💃 *¡Menciona a alguien para bailar!*\n\nEjemplo: *${usedPrefix}dance @usuario*`, m)
  }
  
  let name = conn.getName(m.sender)
  let name2 = conn.getName(m.mentionedJid[0])

  let caption = `
  ✨ *¡MOMENTO DE BAILE!* ✨

  ╭・🍃・―――・🎶・―――・🍃・╮
  
  🔆 *${name}* está bailando con *${name2}* 
  ${'(ﾉ^ヮ^)ﾉ*:・ﾟ✧'.repeat(3)}

  ╰・◆・―――・🎵・―――・◈・╯

  `.trim()

  await conn.sendMessage(m.chat, { 
    video: { url: [pp, pp2].getRandom() }, 
    gifPlayback: true, 
    caption: caption,
    mentions: [m.sender, m.mentionedJid[0]],
    contextInfo: {
      externalAdReply: {
        title: `${name} + ${name2} = 💖`,
        body: "¡Combinación perfecta en la pista!",
        thumbnailUrl: pp,
        mediaType: 1,
        renderLargerThumbnail: true
      }
    }
  }, { quoted: m })
}

handler.help = ['dance @usuario']
handler.tags = ['fun']
handler.command = ['dance', 'bailar']
handler.group = true
export default handler
