let handler = async (m, { conn }) => {
    const poemasFunables = [
        `💀 *POEMA DEL HUÉRFANO* 💀\n` +
        `Papá se fue por cigarros,\n` +
        `mamá con el vecino,\n` +
        `yo me quedo jugando\n` +
        `con este cuchillo tan bonito.\n\n` +
        `☠ MORALEJA ☠\n` +
        `La familia es lo primero...\n` +
        `¡pero lo segundo es más divertido!`,

        `🪦 *RONDA DE LOS CAIDOS* 🪦\n` +
        `En el parque infantil\n` +
        `los columpios crujen fuerte,\n` +
        `son los niños del orfanato\n` +
        `jugando a la silla eléctrica.`,

        `👻 *AMOR ESQUIZOFRÉNICO* 👻\n` +
        `Ella me dijo "te amo",\n` +
        `yo le dije "yo más",\n` +
        `ahora compartimos pastilla\n` +
        `en el psiquiátrico de allá.`,

        `🕷 *LA CUCARACHA ACTUALIZADA* 🕷\n` +
        `La cucaracha ya no puede caminar\n` +
        `porque le falta una pata,\n` +
        `la aplasté con mi zapato\n` +
        `¡problema solucionado!\n\n` +
        `🐜 *Bonus* 🐜\n` +
        `Y si revives, insecto,\n` +
        `mi pie volverá a caer,\n` +
        `porque en esta casa\n` +
        `no hay lugar para usted.`,

        `🧟 *ZOMBIE ROMÁNTICO* 🧟\n` +
        `Eres como el covid,\n` +
        `te quiero contagiar,\n` +
        `pero a diferencia del virus,\n` +
        `contigo sí me quiero vacunar.`,

        `🔪 *CUENTO DE HADAS* 🔪\n` +
        `Blancanieves envenenada,\n` +
        `Cenicienta maltratada,\n` +
        `la Bella Durmiente violada,\n` +
        `¿y a mí por qué me toca la vida tan dura?`,

        `☢ *ECOLOGÍA EXTREMA* ☢\n` +
        `Reciclo latas, papel y cristal,\n` +
        `pero lo que más reciclo\n` +
        `son mis exnovias\n` +
        `...en forma de jabón artesanal.`,

        `🧠 *DEPRESIÓN POSITIVA* 🧠\n` +
        `La vida es bella,\n` +
        `el mundo es genial,\n` +
        `por eso me ahorco\n` +
        `con cable de luz positiva.`,

        `🦴 *ABUELITA EJEMPLAR* 🦴\n` +
        `Mi abuela decía siempre:\n` +
        `"Nunca dejes para mañana\n` +
        `lo que puedas hacer hoy",\n` +
        `por eso se murió ayer.`,

        `💉 *MEDICINA AVANZADA* 💉\n` +
        `El doctor me recetó\n` +
        `un cóctel de pastillas,\n` +
        `pero yo soy más de vodka,\n` +
        `así que las tragué sin agua.`,

        `⚰ *EL MATRIMONIO PERFECTO* ⚰\n` +
        `Prometiste amarme\n` +
        `hasta que la muerte nos separara,\n` +
        `así que te enterré viva\n` +
        `...junto a mi suegra.`,

        `🧪 *CIENCIA CASERA* 🧪\n` +
        `Hice un experimento:\n` +
        `mezclé cloro y amoniaco,\n` +
        `ahora tengo la casa limpia\n` +
        `...y el funeral pagado.`
    ]

    // Selección aleatoria con estilo sarcástico
    let poema = poemasFunables[Math.floor(Math.random() * poemasFunables.length)]
    
    // Formato de presentación con toque "funable"
    let estilo = `*╔═══💀 POEMA FUNABLE 💀═══╗*\n` +
                 `\n` +
                 `${poema}\n` +
                 `\n` +
                 `*╚═══😈 DISFRUTA EL TRAUMA 😈═══╝*\n` +
                 `(⚠️ Este poema es 100% biodegradable\n` +
                 `como tus expectativas de vida)`

    // Envío con detalles estéticos
    await conn.sendMessage(m.chat, {
        text: estilo,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true,
            externalAdReply: {
                title: `📜 ${['Poema del Día', 'Versos Crueles', 'Rima Traumática'][Math.floor(Math.random() * 3)]}`,
                body: "By Hatsune Miku (División Oscura)",
                thumbnailUrl: 'https://telegra.ph/file/5e7042bf17cde23989e71.jpg',
                mediaType: 1,
                renderLargerThumbnail: true
            }
        }
    }, { quoted: m })
}

handler.help = ['poemafunable']
handler.tags = ['fun', 'premium']
handler.command = ['poemafunable', 'versosnegros','versos de Jaime', 'rimamacabra']
handler.limit = true
handler.diamond = true

export default handler