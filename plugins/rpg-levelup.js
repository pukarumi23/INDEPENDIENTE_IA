import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let img = await (await fetch(`https://th.bing.com/th/id/OIG1.Rd6AfLoMfpvBvI1nxgfn?cb=iwp2&pid=ImgGn`)).buffer()
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = `
╔═══════════════════════
║  ✨ *PROGRESO DE NIVEL* ✨
╠═══════════════════════
║  🏷️ *Nombre:* ${name}
║  🎚️ *Nivel actual:* ${user.level}
║  ⚡ *Experiencia:* ${user.exp - min}/${xp}
╠═══════════════════════
║  📈 *Faltan ${max - user.exp} XP*
║  para subir al siguiente nivel!
╚═══════════════════════
`.trim()
        await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
    }
    
    let before = user.level * 1
    while (canLevelUp(user.level, user.exp, global.multiplier)) user.level++
    
    if (before !== user.level) {
        let txt = `
╔═══════════════════════
║  🎉 *¡NIVEL SUBIDO!* 🎉
╠═══════════════════════
║  🏷️ *Nombre:* ${name}
║  ⬅️ *Nivel anterior:* ${before}
║  ➡️ *Nuevo nivel:* ${user.level}
╠═══════════════════════
║  💡 Sigue interactuando
║  con *INDEPENDIENTE_BOT* para
║  subir más de nivel!
╚═══════════════════════
`.trim()
        await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
    }
}

handler.help = ['levelup']
handler.tags = ['rpg']
handler.command = ['nivel', 'lvl', 'levelup', 'level'] 
handler.register = true 
export default handler
