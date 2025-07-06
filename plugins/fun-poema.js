let handler = async (m, { conn }) => {
  // Configuración de imágenes por categoría
  const portadas = {
    "🌹 Amor y sentimientos": 'https://st2.depositphotos.com/4083027/11890/v/450/depositphotos_118905110-stock-illustration-books-silhouette-of-lights-on.jpg',
    "🌌 Naturaleza": 'https://thumbs.dreamstime.com/b/fondo-de-pantalla-verde-brillante-del-libro-abierto-con-p%C3%A1ginas-verdes-brillantes-en-una-perfecto-para-la-composici%C3%B3n-y-efectos-338036499.jpg',
    "💭 Filosóficos": 'https://img.freepik.com/vector-premium/iconos-libros-ilustracion-luces-color-violeta-silueta-fondo-oscuro-lineas-puntos-brillantes_153454-7197.jpg',
    "🕊️ Sociales": 'https://img.freepik.com/foto-premium/fantasia-magica-sfondo-scuro-con-una-rosa-magica-e-un-vecchio-libro_21085-1782.jpg',
    "🔮 Abstractos": 'https://us.123rf.com/450wm/vectorwin/vectorwin2303/vectorwin230307277/199745408-open-book-neon-glow-icon-illustration.jpg'
  };

  // Base de datos completa de poemas
  const poemas = {
    // Amor y sentimientos
    "Amor imposible": {
      texto: "Te amo como se aman las estrellas:\ncon la distancia que las hace brillar,\ncon la certeza de que nuestro amor\nserá siempre un \"casi\" celestial.",
      decoracion: "☄️*✲⋆☄️",
      sticker: "https://i.imgur.com/XWQ4Rzl.png",
      audio: "./media/romance.mp3"
    },
    "Amor propio": {
      texto: "Hoy me miro al espejo\ny beso cada cicatriz,\nporque soy la obra de arte\nque nadie pudo repetir.",
      decoracion: "✧˚·˚♡˚·˚✧",
      sticker: "https://i.imgur.com/8jYVvxQ.png",
      audio: "./media/romance.mp3"
    },
    "Desamor": {
      texto: "Las lágrimas que no lloré\nse convirtieron en ríos\nque navegan hacia el olvido,\npero mi corazón sigue\nanclado en tu recuerdo.",
      decoracion: "🌀✧🌀",
      sticker: "https://i.imgur.com/Jh7M5fP.png",
      audio: "./media/triste.mp3"
    },

    // Naturaleza
    "El mar": {
      texto: "El mar guarda en sus olas\nlos secretos de mil naufragios,\ny en su profundidad oscura\nrisas de sirenas y dolores.",
      decoracion: "◓◒◑◐◓",
      sticker: "https://i.imgur.com/9N3YbWk.png",
      audio: "./media/naturaleza.mp3"
    },
    "Montañas": {
      texto: "Las montañas no necesitan\nhablar para ser sabias,\nni compañía para sentirse completas.\nSu grandeza está en su silencio.",
      decoracion: "⛰️••⛰️",
      sticker: "https://i.imgur.com/2WJQlwB.png",
      audio: "./media/naturaleza.mp3"
    },

    // Filosóficos
    "El tiempo": {
      texto: "El tiempo es un ladrón sigiloso\nque se lleva todo sin hacer ruido,\npero deja polvo de estrellas\nen las arrugas de los sabios.",
      decoracion: "⏳⌛⏳",
      sticker: "https://i.imgur.com/4RjX3fP.png",
      audio: "./media/filosofia.mp3"
    },

    // Sociales
    "Injusticia": {
      texto: "Hay dolores que no se ven,\nheridas que no sangran,\nprisiones sin rejas\ny cadenas hechas de silencio.",
      decoracion: "⚖️✊⚖️",
      sticker: "https://i.imgur.com/Jh7M5fP.png",
      audio: "./media/social.mp3"
    },

    // Abstractos
    "Diálogo cósmico": {
      texto: "Dijo el Sol a la Luna:\n\"¿Por qué solo brillas cuando yo me voy?\"\nY ella respondió:\n\"Para que conozcas la oscuridad\nque dejas tras de ti\"",
      decoracion: "☀️⇄🌙",
      sticker: "https://i.imgur.com/2WJQlwB.png",
      audio: "./media/abstracto.mp3"
    }
  };

  // Categorías organizadas
  const categorias = {
    "🌹 Amor y sentimientos": ["Amor imposible", "Amor propio", "Desamor"],
    "🌌 Naturaleza": ["El mar", "Montañas"],
    "💭 Filosóficos": ["El tiempo"],
    "🕊️ Sociales": ["Injusticia"],
    "🔮 Abstractos": ["Diálogo cósmico"]
  };

  // Obtener usuario solicitante
  const user = '@' + m.sender.split('@')[0];
  
  // Selección aleatoria
  const categoria = Object.keys(categorias)[Math.floor(Math.random() * Object.keys(categorias).length)];
  const tema = categorias[categoria][Math.floor(Math.random() * categorias[categoria].length)];
  const { texto, decoracion, sticker, audio } = poemas[tema];

  // Construcción del mensaje
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

${decoracion} Que la inspiración te acompañe ${decoracion}
`;

  // Enviar mensaje principal con imagen
  await conn.sendMessage(m.chat, {
    image: { url: portadas[categoria] },
    caption: mensaje,
    mentions: [m.sender]
  }, { quoted: m });

  // Efecto de escritura
  await conn.sendPresenceUpdate('composing', m.chat);
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Enviar sticker y audio
  try {
    await conn.sendFile(m.chat, sticker, 'sticker.webp', '', m);
    await conn.sendFile(m.chat, audio, 'audio.mp3', '', m, true);
  } catch (e) {
    console.error('Error al enviar multimedia:', e);
  }
}

handler.help = ['poema'];
handler.tags = ['literatura'];
handler.command = /^(poema|verso|poesia|poesía)$/i;

export default handler;
