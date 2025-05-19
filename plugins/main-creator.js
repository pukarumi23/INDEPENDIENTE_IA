let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;rafael;;\nFN:rafael\nORG:rafael\nTITLE:\nitem1.TEL;waid=51939508653:51939508653\nitem1.X-ABLabel:Irokz Dal ダーク⁩\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:Irokz Dal ダーク\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: 'rafael', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
