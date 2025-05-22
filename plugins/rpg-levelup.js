import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let img = await (await fetch(`https://t3.ftcdn.net/jpg/11/96/30/34/360_F_1196303485_Yql12Y4Ul5AikmnhyYTvHpYWtO8sfB1k.jpg`)).buffer()
	let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = ` –  *⫷ 𝕃 𝔼 𝕍 𝔼 𝕃 𝕌 ℙ⫸-⫷𝕌 𝕊 𝔼 ℝ ⫸*\n\n`
	    txt += `⋉🔆▰▰▰🔥▰▰▰🔆⫸\n`
	    txt += `▮                    \n`
            txt += `▮🔶 *Nombre* : ${name}\n`
            txt += `▮🔶 *Nivel* : ${user.level}\n`
            txt += `▮🔶 *XP* : ${user.exp - min}/${xp}\n`
	    txt += `▮                    \n`
	    txt += `▮▰▰▰▰▰▰▰▰▰⫸\n`
            txt += `▮◈Te falta *${max - user.exp}* de *💫 XP* para \n` 
	    txt += `▮         subir de nivel \n`
	    txt += `⋉🔆▰▰▰🔥▰▰▰🔆⫸`
await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
    }
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    if (before !== user.level) {
       let txt = ` –  *⫷ 𝕃 𝔼 𝕍 𝔼 𝕃 𝕌 ℙ⫸-⫷𝕌 𝕊 𝔼 ℝ ⫸*\n\n`
	   txt += `▮▰▰▰▰▰▰▰▰\n`
           txt += `▮🔶 *Nombre* : ${conn.getName(m.sender)}\n`
           txt += `▮🔶 *Nivel Anterior* : ${before}\n`
           txt += `▮🔶 *Nivel Actual* : ${user.level}\n\n`
           txt += `🔥 Cuanto más interactúes con *el alfeñique*, mayor será tu Nivel`

await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
        }
    }
handler.help = ['levelup']
handler.tags = ['rpg']

handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.register = true 
export default handler
