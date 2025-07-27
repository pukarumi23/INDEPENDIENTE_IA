import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let img = await (await fetch(`https://telegra.ph/file/b97148e2154508f63d909.jpg`)).buffer()
	let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = ` ╔═════ ⟦ 📈 𝙇𝙀𝙑𝙀𝙇 𝙐𝙋 ⟧ ═════╗  \n\n`
            txt += `🧿 𝙐𝙎𝙀𝙍: ${name}\n`
            txt += `📊 𝙀𝙓𝙋: ${user.level}\n`
            txt += `🔓 𝙓𝙋: ${user.exp - min}/${xp}\n\n`
            txt += `🔶 𝙏𝙀 𝙁𝘼𝙇𝙏𝘼𝙉 *${max - user.exp}* de *💫 𝙓𝙋* 𝙥𝙖𝙧𝙖 𝙨𝙪𝙗𝙞𝙧 𝙙𝙚 𝙣𝙞𝙫𝙚𝙡`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
       let txt = `╔═════ ⟦ 📈 𝙇𝙀𝙑𝙀𝙇 𝙐𝙋 ⟧ ═════╗  \n\n`
           txt += `🧿 𝙐𝙎𝙀𝙍: ${conn.getName(m.sender)}\n`
           txt += `📜 𝙉𝙄𝙑𝙀𝙇 𝘼𝙉𝙏𝙀𝙍𝙄𝙊𝙍: ${before}\n`
           txt += `📈 𝙉𝙄𝙑𝙀𝙇 𝘼𝘾𝙏𝙐𝘼𝙇: ${user.level}\n\n`
           txt += `🔶 𝘾𝙪𝙖𝙣𝙩𝙤 𝙢𝙖́𝙨 𝙞𝙣𝙩𝙚𝙧𝙖𝙘𝙩𝙪́𝙚𝙨 𝙘𝙤𝙣 *𝙄𝙣𝙙𝙚𝙥𝙚𝙣𝙙𝙞𝙚𝙣𝙩𝙚*, 𝙢𝙖𝙮𝙤𝙧 𝙨𝙚𝙧𝙖́ 𝙩𝙪 𝙉𝙄𝙑𝙀𝙇.`

await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
        }
    }
handler.help = ['levelup']
handler.tags = ['rpg']

handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.register = true 
export default handler
