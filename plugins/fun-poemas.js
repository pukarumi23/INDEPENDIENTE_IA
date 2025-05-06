let handler = async (m, { conn, usedPrefix, command }) => {
    // Imágenes opcionales para acompañar los poemas
    let pp = 'https://images.app.goo.gl/tqHFf'
    let pp2 = 'https://images.app.goo.gl/tqHFf'
    
    // Tipos de poemas disponibles
    const tiposPoemas = {
        haiku: [
            "Noche silenciosa\nel aroma del jazmín\n que penetra mi alma"
        ],
        soneto: [
       "En tus ojos me perdí,\ncomo el río va al mar,\nsin saber cómo fui,\nni querer regresar."
       "Una idea va volando,\ncomo hoja en el papel,\ny en el verso va quedando\nlo que dicta el corazón fiel."
       "En tus ojos me perdí,"
        ],
        verso: [
            "El viento canta entre los árboles\nuna canción que solo yo comprendo",
            "Mariposas de colores\ntejen sueños en el aire"
        ]
    }
    
    // Obtener el tipo de poema solicitado (si lo hay)
    let tipo = command.split(' ')[1]?.toLowerCase()
    
    // Si no se especifica tipo o no existe, elegir aleatorio
    if (!tipo || !tiposPoemas[tipo]) {
        const tipos = Object.keys(tiposPoemas)
        tipo = tipos[Math.floor(Math.random() * tipos.length)]
    }
    
    // Seleccionar poema aleatorio del tipo elegido
    const poema = tiposPoemas[tipo][Math.floor(Math.random() * tiposPoemas[tipo].length)]
    
    // Construir mensaje
    let caption = `*✍️ POEMA ${tipo.toUpperCase()} ✍️*\n\n` +
                 `${poema}\n\n` +
                 `_Creado especialmente para ti_ ❤️`
    
    // Enviar mensaje con imagen aleatoria
    await conn.sendMessage(m.chat, { 
        image: { url: [pp, pp2].getRandom() }, 
        caption: caption 
    }, { quoted: m })
}

handler.help = ['poema', 'poema <tipo> (haiku|soneto|verso)']
handler.tags = ['fun']
handler.command = ['poema', 'poesia']
export default handler
