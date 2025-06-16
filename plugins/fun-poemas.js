import fetch from 'node-fetch'

let handler = async (m, { conn, usedPrefix }) => {
    try {
        // API de chistes de humor negro (puedes alternar entre estas APIs)
        let apiUrls = [
            'https://v2.jokeapi.dev/joke/Dark?blacklistFlags=nsfw,religious,political,racist,sexist&type=single',
            'https://official-joke-api.appspot.com/jokes/dark/random',
            'https://sv443.net/jokeapi/v2/joke/Dark?type=single'
        ]
        
        let apiUrl = apiUrls[Math.floor(Math.random() * apiUrls.length)]
        
        let response = await fetch(apiUrl)
        let data = await response.json()
        
        let joke = ''
        if (apiUrl.includes('jokeapi.dev') || apiUrl.includes('sv443.net')) {
            joke = data.joke || data.setup + '\n' + data.delivery
        } else if (apiUrl.includes('official-joke-api')) {
            joke = data[0]?.setup + '\n' + data[0]?.punchline || 'No se pudo obtener el chiste'
        }
        
        if (!joke) throw new Error('No se pudo obtener un chiste')
        
        await conn.reply(m.chat, `*Chiste de Humor Negro 🖤*\n\n${joke}\n\n*¿Quieres otro?* Usa *${usedPrefix}chisteoscuro*`, m)
        
    } catch (e) {
        console.error(e)
        await conn.reply(m.chat, `❌ Ocurrió un error al obtener el chiste. Intenta de nuevo más tarde.`, m)
    }
}

handler.help = ['chisteoscuro', 'humornegro']
handler.tags = ['fun']
handler.command = ['chisteoscuro', 'humornegro', 'darkjoke']
handler.limit = true
handler.register = true

export default handler