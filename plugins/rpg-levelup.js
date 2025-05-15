import { canLevelUp, xpRange } from '../lib/levelling.js'
import fetch from 'node-fetch'

let handler = async (m, { conn }) => {
    let img = await (await fetch(`https://sdmntprsouthcentralus.oaiusercontent.com/files/00000000-aa20-61f7-81e1-8c0e085e460b/raw?se=2025-05-15T03%3A23%3A57Z&sp=r&sv=2024-08-04&sr=b&scid=00000000-0000-0000-0000-000000000000&skoid=ec8eb293-a61a-47e0-abd0-6051cc94b050&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2025-05-14T22%3A16%3A35Z&ske=2025-05-15T22%3A16%3A35Z&sks=b&skv=2024-08-04&sig=vDzQrbfV8kX%2BjwPd0wvyCfO1i99iyI8X1rtkAzydyZM%3D`)).buffer()
    let name = conn.getName(m.sender)
    let user = global.db.data.users[m.sender]
    
    if (!canLevelUp(user.level, user.exp, global.multiplier)) {
        let { min, xp, max } = xpRange(user.level, global.multiplier)
        let txt = `
╔═══════════════════════
║  🔶 *PROGRESO DE NIVEL* 🔶
╠═══════════════════════
║  🔆 *Nombre:* ${name}
║  🔆 *Nivel actual:* ${user.level}
║  🔆 *Experiencia:* ${user.exp - min}/${xp}
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
║  🔆 *Nombre:* ${name}
║  🔆 *Nivel anterior:* ${before}
║  🔆 *Nuevo nivel:* ${user.level}
╠═══════════════════════
║  🔥 Sigue interactuando
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
