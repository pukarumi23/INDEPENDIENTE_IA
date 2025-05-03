import fetch from 'node-fetch'

let handler = async (m, { conn, text, usedPrefix, command }) => {
    if (!text) return conn.reply(m.chat, `*🔶 Ingrese su petición*\n*🪼 Ejemplo de uso:* ${usedPrefix + command} como hacer estrella de papel`, m, rcanal)
    await m.react('💬')

    try {
        let api = await fetch(`https://apis-starlights-team.koyeb.app/starlight/gemini?text=${text}`)
        let json = await api.json()

        if (json.status === 'true') {
            await conn.reply(m.chat, json.result, m, rcanal)
        } else {
            await m.react('✖️')
        }
    } catch {
        await m.react('✖️')
    }
}
handler.help = ['gemini *<petición>*']
handler.tags = ['tools']
handler.command = ['gemini']
handler.register = true

export default handler
