let handler = async (m, { conn }) => {
  // Configuración de imágenes por categoría
  const portadas = {
    "🌹 Amor y sentimientos": 'https://st2.depositphotos.com/4083027/11890/v/450/depositphotos_118905110-stock-illustration-books-silhouette-of-lights-on.jpg',
    "🌌 Naturaleza": 'https://thumbs.dreamstime.com/b/fondo-de-pantalla-verde-brillante-del-libro-abierto-con-p%C3%A1ginas-verdes-brillantes-en-una-perfecto-para-la-composici%C3%B3n-y-efectos-338036499.jpg',
    "💭 Filosóficos": 'https://img.freepik.com/vector-premium/iconos-libros-ilustracion-luces-color-violeta-silueta-fondo-oscuro-lineas-puntos-brillantes_153454-7197.jpg'
  };

  // Base de datos de poemas
  const poemas = {
    "Amor imposible": {
      texto: "Te amo como se aman las estrellas:\ncon la distancia que las hace brillar,\ncon la certeza de que nuestro amor\nserá siempre un \"casi\" celestial.",
      decoracion: "☄️*✲⋆☄️"
    },
    "Amor propio": {
      texto: "Hoy me miro al espejo\ny beso cada cicatriz,\nporque soy la obra de arte\nque nadie pudo repetir.",
      decoracion: "✧˚·˚♡˚·˚✧"
    },
    "El mar": {
      texto: "El mar guarda en sus olas\nlos secretos de mil naufragios,\ny en su profundidad oscura\nrisas de sirenas y dolores.",
      decoracion: "◓◒◑◐◓"
    }
  };

  // Obtener usuario
  const user = '@' + m.sender.split('@')[0];
  
  // Selección aleatoria
  const categorias = Object.keys(portadas);
  const categoria = categorias[Math.floor(Math.random() * categorias.length)];
  const temas = {
    "🌹 Amor y sentimientos": ["Amor imposible", "Amor propio"],
    "🌌 Naturaleza": ["El mar"],
    "💭 Filosóficos": ["El tiempo"]
  }[categoria];
  
  const tema = temas[Math.floor(Math.random() * temas.length)];
  const { texto, decoracion } = poemas[tema];

  // Construir mensaje
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

  // Enviar SOLO imagen con texto (sin multimedia adicional)
  await conn.sendFile(m.chat, portadas[categoria], 'poema.jpg', mensaje, m, false, {
    mentions: [m.sender],
    ephemeralExpiration: 24 * 60 * 1000 // Opcional: mensaje efímero
  });
}

handler.help = ['poema'];
handler.tags = ['literatura'];
handler.command = /^(poema|verso)$/i;

export default handler;
