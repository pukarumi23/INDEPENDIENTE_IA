let handler = async (m, { conn, usedPrefix, isOwner }) => {
let vcard = `BEGIN:VCARD\nVERSION:3.0\nN:;(CHASKI);;\nFN:(CHASKI)\nORG:(CHASKI)\nTITLE:\nitem1.TEL;waid=51939508653:51939508653\nitem1.X-ABLabel:(CHASKI)\nX-WA-BIZ-DESCRIPTION:\nX-WA-BIZ-NAME:(CHASKI)\nEND:VCARD`
await conn.sendMessage(m.chat, { contacts: { displayName: '(CHASKI)', contacts: [{ vcard }] }}, {quoted: m})
}
handler.help = ['owner']
handler.tags = ['main']
handler.command = ['owner', 'creator', 'creador', 'dueño'] 

export default handler
