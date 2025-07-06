let handler = async (m, { conn }) => {
  // Imágenes por categoría (usando tus enlaces)
  const portadas = {
    "🌹 Amor y sentimientos": 'https://st2.depositphotos.com/4083027/11890/v/450/depositphotos_118905110-stock-illustration-books-silhouette-of-lights-on.jpg',
    "🌌 Naturaleza y paisajes": 'https://thumbs.dreamstime.com/b/fondo-de-pantalla-verde-brillante-del-libro-abierto-con-p%C3%A1ginas-verdes-brillantes-en-una-perfecto-para-la-composici%C3%B3n-y-efectos-338036499.jpg',
    "💭 Existenciales": 'https://img.freepik.com/vector-premium/iconos-libros-ilustracion-luces-color-violeta-silueta-fondo-oscuro-lineas-puntos-brillantes_153454-7197.jpg',
    "🕊️ Sociales": 'https://img.freepik.com/foto-premium/fantasia-magica-sfondo-scuro-con-una-rosa-magica-e-un-vecchio-libro_21085-1782.jpg',
    "🔮 Abstractos": 'https://us.123rf.com/450wm/vectorwin/vectorwin2303/vectorwin230307277/199745408-open-book-neon-glow-icon-illustration.jpg'
  };

  // Poemas organizados por tema
  const poemas = {
    /* 🌹 AMOR Y SENTIMIENTOS */
    "Amor imposible": {
      texto: "Te amo como se aman las estrellas:\ncon la distancia que las hace brillar,\ncon la certeza de que nuestro amor\nserá siempre un \"casi\" celestial.",
      decoracion: "☄️*✲⋆☄️"
    },
    "Amor propio": {
      texto: "Hoy me miro al espejo\ny beso cada cicatriz,\nporque soy la obra de arte\nque nadie pudo repetir.",
      decoracion: "✧˚·˚♡˚·˚✧"
    },
    "Desamor": {
      texto: "Las lágrimas que no lloré\nse convirtieron en ríos\nque navegan hacia el olvido,\npero mi corazón sigue\nanclado en tu recuerdo.",
      decoracion: "🌀✧🌀"
    },

    /* 🌌 NATURALEZA */
    "El mar": {
      texto: "El mar guarda en sus olas\nlos secretos de mil naufragios,\ny en su profundidad oscura\nrisas de sirenas y dolores.",
      decoracion: "◓◒◑◐◓"
    },
    "Montañas": {
      texto: "Las montañas no necesitan\nhablar para ser sabias,\nni compañía para sentirse completas.\nSu grandeza está en su silencio.",
      decoracion: "⛰️••⛰️"
    },
    "Lluvia": {
      texto: "Cada gota es un latido\ndel corazón del cielo,\nque escribe su poema efímero\nen el cristal de mi ventana.",
      decoracion: "🌧️···🌧️"
    },

    /* 💭 EXISTENCIALES */
    "El tiempo": {
      texto: "El tiempo es un ladrón sigiloso\nque se lleva todo sin hacer ruido,\npero deja polvo de estrellas\nen las arrugas de los sabios.",
      decoracion: "⏳⌛⏳"
    },
    "La muerte": {
      texto: "No es el final del camino,\nsino la sombra que nos recuerda\nque cada paso debe dejar\nhuella en el alma del mundo.",
      decoracion: "⚰️✧⚰️"
    },

    /* 🕊️ SOCIALES */
    "Injusticia": {
      texto: "Hay dolores que no se ven,\nheridas que no sangran,\nprisiones sin rejas\ny cadenas hechas de silencio.",
      decoracion: "⚖️✊⚖️"
    },
    "Libertad": {
      texto: "No es volar sin ataduras,\nsino elegir el peso\nque llevamos en el alma\nsin que nos impida caminar.",
      decoracion: "🕊️✧🕊️"
    },

    /* 🔮 ABSTRACTOS */
    "Diálogo cósmico": {
      texto: "Dijo el Sol a la Luna:\n\"¿Por qué solo brillas cuando yo me voy?\"\nY ella respondió:\n\"Para que conozcas la oscuridad\nque dejas tras de ti\"",
      decoracion: "☀️⇄🌙"
    },
    "Los colores": {
      texto: "El rojo susurra pasión,\nel azul canta melancolía,\nel verde cuenta historias\nque solo entiende el viento.",
      decoracion: "🌈✧🌈"
    }
  };

  // Categorías organizadas
  const categorias = {
    "🌹 Amor y sentimientos": ["Amor imposible", "Amor propio", "Desamor"],
    "🌌 Naturaleza y paisajes": ["El mar", "Montañas", "Lluvia"],
    "💭 Existenciales": ["El tiempo", "La muerte"],
    "🕊️ Sociales": ["Injusticia", "Libertad"],
    "🔮 Abstractos": ["Diálogo cósmico", "Los colores"]
  };

  try {
    // Selección segura
    const categoriaKeys = Object.keys(categorias);
    const categoria = categoriaKeys[Math.floor(Math.random() * categoriaKeys.length)];
    const tema = categorias[categoria][Math.floor(Math.random() * categorias[categoria].length)];
    const { texto, decoracion } = poemas[tema];
    const user = '@' + m.sender.split('@')[0];

    // Mensaje formateado
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
`.trim();

    // Enviar imagen con texto
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
      text: '🌸 ¡Oops! Algo salió mal. Intenta con otro poema usando *.poema*', 
      mentions: [m.sender] 
    }, { quoted: m });
  }
}

handler.help = ['poema'];
handler.tags = ['literatura'];
handler.command = /^(poema|verso|poesia)$/i;

export default handler;
