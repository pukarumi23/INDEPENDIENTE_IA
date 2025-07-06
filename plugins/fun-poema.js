let handler = async (m, { conn }) => {
  // 🖼️ Portadas por categoría
  const portadas = {
    "💖 Romance": 'https://st2.depositphotos.com/4083027/11890/v/450/depositphotos_118905110-stock-illustration-books-silhouette-of-lights-on.jpg',
    "🌿 Naturaleza": 'https://thumbs.dreamstime.com/b/fondo-de-pantalla-verde-brillante-del-libro-abierto-con-p%C3%A1ginas-verdes-brillantes-en-una-perfecto-para-la-composici%C3%B3n-y-efectos-338036499.jpg',
    "💫 Filosóficos": 'https://img.freepik.com/vector-premium/iconos-libros-ilustracion-luces-color-violeta-silueta-fondo-oscuro-lineas-puntos-brillantes_153454-7197.jpg',
    "🕶️ Humor Negro": 'https://img.freepik.com/foto-premium/fantasia-magica-sfondo-scuro-con-una-rosa-magica-e-un-vecchio-libro_21085-1782.jpg',
    "🔮 Abstractos": 'https://us.123rf.com/450wm/vectorwin/vectorwin2303/vectorwin230307277/199745408-open-book-neon-glow-icon-illustration.jpg'
  };

  // 📜 Poemas por categoría (4 por cada una)
  const poemas = {
    /* 💖 ROMANCE */
    "Amor Prohibido": {
      texto: "Nuestros labios se buscan\nen la clandestinidad de la noche,\ncomo versos que no pueden\naparecer en este papel.",
      decoracion: "🚫❤️🚫"
    },
    "Pasión": {
      texto: "Ardes en mi piel\ncomo tinta en papel antiguo,\ndeletreando nuestro nombre\nen cada latido.",
      decoracion: "🔥📜🔥"
    },
    "Promesa": {
      texto: "Juraré amarte\nhasta que los mares\nse conviertan en versos\ny las olas en puntos finales.",
      decoracion: "💍🌊💍"
    },
    "Encuentro": {
      texto: "Bajo la lluvia,\nnuestros paraguas se ignoran,\nprefiriendo mojarse\nen este diluvio de besos.",
      decoracion: "☔💋☔"
    },

    /* 🌿 NATURALEZA */
    "Atardecer": {
      texto: "El sol se acuesta\nentre las montañas,\ndejando su último suspiro\nen las hojas bailarinas.",
      decoracion: "🌄🍃🌄"
    },
    "Tormenta": {
      texto: "Los truenos escriben\npoesía en el cielo,\ny los relámpagos firman\ncon su nombre efímero.",
      decoracion: "⚡🌩️⚡"
    },
    "Bosque": {
      texto: "Los árboles susurran\nsecretos ancestrales\nen idioma de raíces\ny dialecto de cortezas.",
      decoracion: "🌲🗝️🌲"
    },
    "Mar": {
      texto: "Cada ola es un verso\nque la luna recita,\ncon acento de sal\ny métrica de espuma.",
      decoracion: "🌊🌕🌊"
    },

    /* 💫 FILOSÓFICOS */
    "Existencia": {
      texto: "¿Somos acaso tinta\nde un poema cósmico\nescrito por dioses\nque también dudan?",
      decoracion: "🖋️🌌🖋️"
    },
    "Tiempo": {
      texto: "El reloj no marca horas,\nsino versos que se escriben\nen el libro del universo\ncon tinta de estrellas.",
      decoracion: "⏳✨⏳"
    },
    "Verdad": {
      texto: "La verdad no es blanca ni negra,\nes un poema gris\nque cada quien lee\ncon sus propios prejuicios.",
      decoracion: "⚪⚫⚪"
    },
    "Destino": {
      texto: "Si el destino es un libro,\n¿por qué nos dejaron\nescribir en sus márgenes\ncon tinta indeleble?",
      decoracion: "📖✍️📖"
    },

    /* 🕶️ HUMOR NEGRO */
    "Epitafio": {
      texto: "Aquí yace Juan,\nque amó tanto la siesta\nque se quedó dormido\npara siempre. Descansa en paz.",
      decoracion: "⚰️😴⚰️"
    },
    "Dieta": {
      texto: "Hice dieta por un mes\n...de hecho, fue mi último mes.\nAhora soy más ligero\nque el viento.",
      decoracion: "💀🍔💀"
    },
    "Abuelo": {
      texto: "Mi abuelo decía:\n'La vida es corta'\n...demasiado,\npor eso se colgó.",
      decoracion: "👴🌀👴"
    },
    "Espejo": {
      texto: "El espejo me dijo:\n'Estás horrible'.\nAsí que me suicidé.\nAhora somos dos.",
      decoracion: "👻🪞👻"
    },

    /* 🔮 ABSTRACTOS */
    "Silencio": {
      texto: "El silencio no es vacío,\nes un poema en blanco\nque solo entienden\nlos sordos.",
      decoracion: "🤫📄🤫"
    },
    "Colores": {
      texto: "El rojo grita,\nel azul llora,\nel amarillo ríe...\n¿y el negro? El negro poema.",
      decoracion: "🎨⬛🎨"
    },
    "Sombras": {
      texto: "Mi sombra escribe\npoemas en la pared\ncuando cree\nque no la miro.",
      decoracion: "👤✍️👤"
    },
    "Espejismo": {
      texto: "Escribí el poema perfecto,\npero cuando lo leí,\nera solo un reflejo\nde mi sed.",
      decoracion: "🏜️💧🏜️"
    }
  };

  // 🗂️ Organización por categorías
  const categorias = {
    "💖 Romance": ["Amor Prohibido", "Pasión", "Promesa", "Encuentro"],
    "🌿 Naturaleza": ["Atardecer", "Tormenta", "Bosque", "Mar"],
    "💫 Filosóficos": ["Existencia", "Tiempo", "Verdad", "Destino"],
    "🕶️ Humor Negro": ["Epitafio", "Dieta", "Abuelo", "Espejo"],
    "🔮 Abstractos": ["Silencio", "Colores", "Sombras", "Espejismo"]
  };

  try {
    // 🎲 Selección aleatoria
    const categoria = Object.keys(categorias)[Math.floor(Math.random() * Object.keys(categorias).length)];
    const tema = categorias[categoria][Math.floor(Math.random() * categorias[categoria].length)];
    const { texto, decoracion } = poemas[tema];
    const user = '@' + m.sender.split('@')[0];

    // ✨ Mensaje formateado
    const mensaje = `
╭─────────────────╮
│  📜 POEMA DEL DÍA 📜  │
├─────────────────┤
│ Categoría: ${categoria}
│ Tema: ${tema}
│ De: Independiente
│ Para: ${user}
╰─────────────────╯

${decoracion} 
${texto}
${decoracion}

${decoracion} Que la musa te acompañe ${decoracion}
`.trim();

    // 📤 Enviar mensaje
    await conn.sendFile(
      m.chat, 
      portadas[categoria], 
      'poema.jpg', 
      mensaje, 
      m, 
      false, 
      { mentions: [m.sender] }
    );

  } catch (e) {
    console.error('Error:', e);
    await conn.sendMessage(m.chat, { 
      text: '📛 Error al generar el poema. Usa *.poema* nuevamente.', 
      mentions: [m.sender] 
    }, { quoted: m });
  }
}

// 📝 Configuración del comando
handler.help = ['poema'];
handler.tags = ['literatura'];
handler.command = /^(poema|verso|poesia|romance|humornegro)$/i;

export default handler;
