let handler = async (m, { conn, usedPrefix, command }) => {
    // Imágenes opcionales para acompañar los poemas
    let pp = 'https://tinyurl.com/26djysdo'
    let pp2 = 'https://tinyurl.com/294oahv9'
    
    // Tipos de poemas disponibles
    const tiposPoemas = {
        haiku: [
            "El viejo estanque\nuna rana se zambulle\nel sonido del agua",
            "Noche silenciosa\nel aroma del jazmín\npenetra mi alma"
        ],
        soneto: [
            "Cuando me paro a contemplar mi estado\ny a ver los pasos por dó me ha traído...",
            "¡Oh soledad, dulce y segura amiga!\nconversación de aquellos que en sí mismos..."
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
