let handler = async (m, { conn }) => {
  // Imágenes temáticas por categoría
  const portadas = {
    "🌹 Amor y sentimientos": [
      'https://st2.depositphotos.com/4083027/11890/v/450/depositphotos_118905110-stock-illustration-books-silhouette-of-lights-on.jpg'
    ],
    "🌌 Naturaleza y paisajes": [
      'https://thumbs.dreamstime.com/b/fondo-de-pantalla-verde-brillante-del-libro-abierto-con-p%C3%A1ginas-verdes-brillantes-en-una-perfecto-para-la-composici%C3%B3n-y-efectos-338036499.jpg'
    ],
    "💭 Existenciales y filosóficas": [
      'https://img.freepik.com/vector-premium/iconos-libros-ilustracion-luces-color-violeta-silueta-fondo-oscuro-lineas-puntos-brillantes_153454-7197.jpg'
    ],
    "🕊️ Sociales y humanistas": [
      'https://img.freepik.com/foto-premium/fantasia-magica-sfondo-scuro-con-una-rosa-magica-e-un-vecchio-libro_21085-1782.jpg'
    ],
    "🔮 Creativas y abstractas": [
      'https://us.123rf.com/450wm/vectorwin/vectorwin2303/vectorwin230307277/199745408-open-book-neon-glow-icon-illustration.jpg'
    ]
  };

  const poemas = {
    // 🌹 Amor y sentimientos
    "Amor imposible": {
      poemas: [
        "✧･ﾟ: *✧･ﾟ:* 𝓐𝓶𝓸𝓻 𝓲𝓶𝓹𝓸𝓼𝓲𝓫𝓵𝓮 *:･ﾟ✧*:･ﾟ✧\n\nTe amo como se aman las estrellas:\ncon la distancia que las hace brillar,\ncon la certeza de que nuestro amor\nserá siempre un \"casi\" celestial.",
        "⋆｡ﾟ☁︎｡⋆｡ ﾟ☾ ﾟ｡⋆\nAmar lo que no se puede tener\nes como escribir en el mar:\ncada ola borra mis palabras\npero el sentimiento permanece."
      ],
      decoracion: "☄️*✲⋆☄️",
      sticker: "https://i.imgur.com/XWQ4Rzl.png"
    },
    "Amor propio": {
      poemas: [
        "༄ؘ۪۫۫♡۪۪۫۫◌۪۪۫۫༄\nHoy me miro al espejo\ny beso cada cicatriz,\nporque soy la obra de arte\nque nadie pudo repetir.",
        "✦✧✧✧✦\nAprendí a abrazarme\ncuando nadie lo hacía,\na ser mi propio sol\nen días de tormenta."
      ],
      decoracion: "✧˚·˚♡˚·˚✧",
      sticker: "https://i.imgur.com/8jYVvxQ.png"
    },
    // 🌌 Naturaleza
    "El mar y sus misterios": {
      poemas: [
        "◞♡◟∞◞♡◟∞◞♡◟\nEl mar guarda en sus olas\nlos secretos de mil naufragios,\ny en su profundidad oscura\nrisas de sirenas y dolores de cangrejos.",
        "▁ ▂ ▄ ▅ ▆ ▇ █\nEres como el mar:\nte miro de lejos\nporque sé que de cerca\npodría ahogarme en ti."
      ],
      decoracion: "◓◒◑◐◓",
      sticker: "https://i.imgur.com/9N3YbWk.png"
    },
    // 💭 Existenciales
    "El paso del tiempo": {
      poemas: [
        "⌛⏳⌛⏳⌛\nEl tiempo es un ladrón sigiloso\nque se lleva todo sin hacer ruido,\npero deja polvo de estrellas\nen las arrugas de los sabios.",
        "∞•°¤*✧\n¿Qué es el tiempo sino\nuna ilusión persistente?\nUn segundo puede ser eterno\ny los años, un parpadeo."
      ],
      decoracion: "⏳⌛⏳⌛⏳",
      sticker: "https://i.imgur.com/4RjX3fP.png"
    },
    // 🕊️ Sociales
    "Injusticia y lucha": {
      poemas: [
        "⚖️✊⚖️✊⚖️\nHay dolores que no se ven,\nheridas que no sangran,\nprisiones sin rejas\ny cadenas hechas de silencio.",
        "✊☭✊☭✊\nLa injusticia es ese fuego\nque quema sin hacer humo,\npero nuestra voz\nserá el viento que lo avive."
      ],
      decoracion: "⚖️✊⚖️✊⚖️",
      sticker: "https://i.imgur.com/Jh7M5fP.png"
    },
    // 🔮 Creativas
    "Un diálogo entre el sol y la luna": {
      poemas: [
        "☀️✨🌙\nDijo el Sol a la Luna:\n\"¿Por qué solo brillas cuando yo me voy?\"\nY ella respondió:\n\"Para que conozcas la oscuridad\nque dejas tras de ti\"",
        "◌◯◎⦿\n\"Eres demasiado fría\" -dijo el Sol-\n\"Y tú demasiado intenso\" -respondió la Luna-\nPor eso se turnan el cielo\ncomo amantes que saben\nque juntos lo incendiarían todo"
      ],
      decoracion: "☀️⇄🌙☀️⇄🌙",
      sticker: "https://i.imgur.com/2WJQlwB.png"
    }
  };

  const categorias = {
    "🌹 Amor y sentimientos": ["Amor imposible", "Amor propio"],
    "🌌 Naturaleza y paisajes": ["El mar y sus misterios"],
    "💭 Existenciales y filosóficas": ["El paso del tiempo"],
    "🕊️ Sociales y humanistas": ["Injusticia y lucha"],
    "🔮 Creativas y abstractas": ["Un diálogo entre el sol y la luna"]
  };

  // Selección aleatoria
  const categoria = Object.keys(categorias)[Math.floor(Math.random() * Object.keys(categorias).length)];
  const tema = categorias[categoria][Math.floor(Math.random() * categorias[categoria].length)];
  const { poemas: listaPoemas, decoracion, sticker } = poemas[tema];
  const poema = listaPoemas[Math.floor(Math.random() * listaPoemas.length)];
  const username = m.pushName || 'alma poética';
  
  // Seleccionar imagen aleatoria de la categoría
  const portada = portadas[categoria][Math.floor(Math.random() * portadas[categoria].length)];

  // Primero enviar la imagen con el título
  await conn.sendFile(m.chat, portada, 'portada.jpg', `
╭───────────────╮
  📚 *POESÍA TEMÁTICA* 📚
  ✨ ${categoria.toUpperCase()} ✨
╰───────────────╯

*Tema:* 『 ${tema} 』
*Para:* ${username}

${decoracion} *Preparando tu poema...* ${decoracion}
`, m);

  // Efecto de escritura (3 segundos)
  await conn.sendPresenceUpdate('composing', m.chat);
  await new Promise(resolve => setTimeout(resolve, 3000));

  // Enviar el poema con formato
  await conn.reply(m.chat, `
✧･ﾟ: *✧･ﾟ:* *${tema.toUpperCase()}* *:･ﾟ✧*:･ﾟ✧

${poema}

${decoracion} *Que las musas te inspiren* ${decoracion}
`, m);

  // Enviar sticker y audio después (1.5 segundos)
  setTimeout(async () => {
    try {
      await conn.sendFile(m.chat, sticker, 'sticker.webp', '', m);
      
      const audios = {
        "🌹": './media/romance.mp3',
        "🌌": './media/naturaleza.mp3',
        "💭": './media/filosofia.mp3',
        "🕊️": './media/social.mp3',
        "🔮": './media/abstracto.mp3'
      };
      
      await conn.sendFile(m.chat, audios[categoria.split(' ')[0]], 'audio.mp3', '', m, true);
    } catch (e) {
      console.error('Error al enviar multimedia:', e);
    }
  }, 1500);
}

handler.help = ['poema', 'verso']
handler.tags = ['literatura', 'arte']
handler.command = /^(poema|verso|poesia|poesía)$/i

export default handler
