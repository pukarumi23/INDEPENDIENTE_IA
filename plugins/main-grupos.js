import fetch from 'node-fetch'

let handler  = async (m, { conn, usedPrefix, command }) => {
let img = await (await fetch(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRCQbbpOzOwYZM2HX5WYFBwYIV5j7F5YyW9oA&s`)).buffer()
const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)
let txt = `*Hola!, te invito a unirte a los grupos oficiales de del Bot para convivir con la comunidad :D*

1- 【 ✯ INDEPENDIENTE_BOT ✰ 】
*✰* ${global.https://chat.whatsapp.com/FwtE0kKhDf076Ar1LYDlyI}

2- 【 ✯ INDEPENDIENTE_BOT ✰ 】- ll
*✰* ${global.https://chat.whatsapp.com/FwtE0kKhDf076Ar1LYDlyI}

3- 【 ✯ INDEPENDIENTE_BOT✰ 】- lll
*✰* ${global.https://chat.whatsapp.com/FwtE0kKhDf076Ar1LYDlyI}

*─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ⭒─ׄ─ׅ─ׄ*

➠ Enlaces anulados? entre aquí! 

Canal :
*✰* ${global.canal}

> [ ✰ ] ${global.textbot}`
await conn.sendFile(m.chat, img, "Thumbnail.jpg", txt, m, null, rcanal)
}
handler.help = ['grupos']
handler.tags = ['main']
handler.command = /^(grupos)$/i
export default handler 
