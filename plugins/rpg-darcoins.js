import MessageType from '@whiskeysockets/baileys'

let impuesto = 0.02

let handler = async (m, { conn, text }) => {
    // Verificar si es un mensaje citado o mencionado
    let who = m.mentionedJid[0] || m.quoted?.sender
    if (!who && m.isGroup) throw '🔶 Menciona al usuario con *@user* o responde a su mensaje.'
    if (!who && !m.isGroup) who = m.sender // Para chats privados
    
    // Validar que el usuario objetivo existe en la base de datos
    if (!global.db.data.users[who]) throw '🔶 El usuario no está registrado en la base de datos.'
    
    // Obtener y validar la cantidad
    let txt = text.replace('@' + (who.split`@`[0] || ''), '').trim()
    if (!txt) throw '🔶 Ingrese la cantidad de *⭐ intis* que quiere transferir.'
    
    let poin = parseInt(txt)
    if (isNaN(poin) || poin < 1) throw '🔶 Cantidad inválida. Mínimo es *1 ⭐ intis*.'
    
    // Calcular impuesto y total
    let imt = Math.ceil(poin * impuesto)
    let total = poin + imt
    
    // Verificar saldo
    let sender = global.db.data.users[m.sender]
    if (sender.limit < total) throw `🔶 No tienes suficientes *⭐ intis* (Necesitas ${total}, tienes ${sender.limit}).`
    
    // Realizar la transferencia
    sender.limit -= total
    global.db.data.users[who].limit += poin
    
    // Enviar confirmación
    await conn.sendMessage(m.chat, {
        text: `💠 *Transferencia realizada* 💠\n\n` +
              `➖ Enviado: *${poin}* ⭐ intis\n` +
              `➖ Impuesto (2%): *${imt}* ⭐ intis\n` +
              `➖ Total debitado: *${total}* ⭐ intis`,
        mentions: [who]
    }, { quoted: m })
    
    // Notificar al receptor si es diferente del remitente
    if (who !== m.sender) {
        await conn.sendMessage(who, {
            text: `💠 *Has recibido una transferencia* 💠\n\n` +
                  `➕ Cantidad: *${poin}* ⭐ intis\n` +
                  `👤 Remitente: @${m.sender.split('@')[0]}`,
            mentions: [m.sender]
        })
    }
}

handler.help = ['darintis @usuario cantidad', 'transferir @usuario cantidad']
handler.tags = ['economy']
handler.command = ['darcoins', 'darintis', 'transferir', 'transfer']
handler.register = true

export default handler
