let handler = async (m, { conn }) => {
  // Configuración segura de imágenes por categoría
  const portadas = {
    "🌹 Amor y sentimientos": 'https://ejemplo.com/amor.jpg',
    "🌌 Naturaleza": 'https://ejemplo.com/naturaleza.jpg',
    "💭 Filosóficos": 'https://ejemplo.com/filosofia.jpg'
  };

  // Base de datos segura de poemas con valores por defecto
  const poemas = {
    "Amor imposible": {
      texto: "Poema de amor imposible...",
      decoracion: "✨"
    },
    "Amor propio": {
      texto: "Poema de amor propio...",
      decoracion: "❤️"
    },
    "El mar": {
      texto: "Poema del mar...",
      decoracion: "🌊"
    },
    // Valor por defecto para prevenir errores
    "_default": {
      texto: "Poema especial para ti...",
      decoracion: "📜"
    }
  };

  // Categorías con temas existentes
  const categoriasSeguras = {
    "🌹 Amor y sentimientos": ["Amor imposible", "Amor propio"],
    "🌌 Naturaleza": ["El mar"],
    "💭 Filosóficos": ["El tiempo"] // Nota: "El tiempo" no existe en poemas
  };

  try {
    // Selección segura de categoría
    const categoriasDisponibles = Object.keys(categoriasSeguras).filter(cat => 
      categoriasSeguras[cat].some(tema => poemas[tema])
    );
    
    if (categoriasDisponibles.length === 0) {
      throw new Error("No hay categorías disponibles");
    }

    const categoria = categoriasDisponibles[Math.floor(Math.random() * categoriasDisponibles.length)];
    const temasDisponibles = categoriasSeguras[categoria].filter(tema => poemas[tema]);
    
    if (temasDisponibles.length === 0) {
      throw new Error(`No hay temas disponibles en ${categoria}`);
    }

    const tema = temasDisponibles[Math.floor(Math.random() * temasDisponibles.length)];
    const { texto, decoracion } = poemas[tema] || poemas._default;

    // Construcción del mensaje seguro
    const user = m.sender.split('@')[0] ? '@' + m.sender.split('@')[0] : '@usuario';
    const mensajeSeguro = `
╭─────────────────╮
│  📜 POEMA DEL DÍA 📜  │
├─────────────────┤
│ Categoría: ${categoria || 'Especial'}
│ Tema: ${tema || 'Único'}
│ De: Independiente
│ Para: ${user}
╰─────────────────╯

${decoracion} 
${texto}
${decoracion}

${decoracion} Que la inspiración te acompañe ${decoracion}
`.trim();

    // Envío seguro solo de imagen con texto
    if (portadas[categoria]) {
      await conn.sendFile(
        m.chat, 
        portadas[categoria], 
        'poema.jpg', 
        mensajeSeguro, 
        m, 
        false, 
        { mentions: [m.sender] }
      );
    } else {
      await conn.sendMessage(
        m.chat,
        { text: mensajeSeguro, mentions: [m.sender] },
        { quoted: m }
      );
    }

  } catch (error) {
    console.error('Error generando poema:', error);
    const mensajeError = `❌ Ocurrió un error al generar tu poema. Por favor intenta nuevamente.`;
    await conn.sendMessage(m.chat, { text: mensajeError }, { quoted: m });
  }
}

handler.help = ['poema'];
handler.tags = ['literatura'];
handler.command = /^(poema|verso)$/i;

export default handler;
