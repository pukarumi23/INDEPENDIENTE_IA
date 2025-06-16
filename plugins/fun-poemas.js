let handler = async (m, { conn }) => {
    const poemasNegros = [
        `🖤 *Sombras que Ríen* 🖤\n` +
        `En el cementerio jugaban,\n` +
        `los niños muertos a la ronda,\n` +
        `con huesos de difuntos\n` +
        `y risas que el viento esconde.\n\n` +
        `※ La luna fue testigo ※\n` +
        `de aquel baile sin perdón,\n` +
        `donde hasta las lápidas\n` +
        `contaron su propio chiste en el panteón.`,

        `⚰ *Elegía Jocosa* ⚰\n` +
        `La abuelita ya no tose,\n` +
        `descansa en su ataúd blanco,\n` +
        `los nietos juegan al escondite\n` +
        `¿Quién la encontrará primero?\n\n` +
        `✞ Moraleja ✞\n` +
        `La muerte siempre gana,\n` +
        `pero qué gracioso es ver\n` +
        `cómo los vivos creen\n` +
        `que esto no es un juego.`,

        `☠ *Soneto del Asesino* ☠\n` +
        `Con cuchillo de cocina\n` +
        `y sonrisa de payaso,\n` +
        `corté trozos de mi suegra\n` +
        `para hacer un rico asado.\n\n` +
        `✧ La policía preguntó ✧\n` +
        `¿dónde está la difunta?\n` +
        `Señalé mi estómago:\n` +
        `"Aquí descansa... en mi panza".`,

        `🕸 *Rima Fúnebre* 🕸\n` +
        `El doctor me dijo:\n` +
        `"Tienes cáncer terminal",\n` +
        `le pedí segunda opinión\n` +
        `y me dio un revólver.\n\n` +
        `✫ Final feliz ✫\n` +
        `Ahora en el cielo\n` +
        `juego al ahorcado\n` +
        `con el ángel de la muerte\n` +
        `...perdí de nuevo.`
    ]

    // Selección aleatoria con estilo gótico
    let randomPoema = poemasNegros[Math.floor(Math.random() * poemasNegros.length)]
    
    // Formato de presentación oscuro
    let estilo = `*╭┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╮*\n` +
                 `  *🦇 POEMA NEGRO 🦇*\n` +
                 `*╰┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄┄╯*\n\n` +
                 `${randomPoema}\n\n` +
                 `*✝ No apto para almas sensibles ✝*`

    await conn.sendMessage(m.chat, { 
        text: estilo, 
        contextInfo: {
            externalAdReply: {
                title: 'Arte Oscuro by Hatsune Miku',
                body: 'Poesía que duele... y hace reír',
                thumbnailUrl: 'https://telegra.ph/file/5e7042bf17cde23989e71.jpg',
                sourceUrl: '',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m })
}

handler.help = ['poemanegro']
handler.tags = ['fun', 'premium']
handler.command = ['poemanegro', 'humorpoetico', 'poemaoscuro']
handler.limit = true
handler.diamond = true

export default handler