let handler = async (m, { conn }) => {
  // 🌹 Portadas románticas aleatorias
  const portadas = [
    'https://img.freepik.com/foto-premium/fantasia-magica-sfondo-scuro-con-una-rosa-magica-e-un-vecchio-libro_21085-1782.jpg',
    'https://img.freepik.com/fotos-premium/livro-magico-aberto-com-paisagem-de-fantasia-sobre-paginas-criado-com-generative-ai_77190-10614.jpg',
    'https://img.freepik.com/fotos-premium/fantastico-livro-magico-com-rosa-magica-generative-ai_372999-11651.jpg'
  ];

  // 💖 Poemas románticos mejorados
  const poemas = {
    "Alma Gemela": {
      texto: "Eres las páginas que faltaban\n　　　　en mi libro incompleto,\nla rima que buscaba\n　　　　en cada verso imperfecto.",
      decoracion: "✧･ﾟ: *✧･ﾟ:* ✧･ﾟ: *✧･ﾟ:*"
    },
    "Destino": {
      texto: "El universo escribió nuestro amor\n　　　　con tinta de estrellas brillantes,\nun poema eterno\n　　　　en el libro de los instantes.",
      decoracion: "✨ ⋆｡˚✩˚｡⋆ ✨"
    },
    "Encantamiento": {
      texto: "Hechizado por tu esencia,\n　　　　como grimoire de magia antigua,\nque solo revela sus secretos\n　　　　al alma que lo cultiva.",
      decoracion: "✧˚・｡･ﾟ✧*̥˚✧*̥･ﾟ✧"
    },
    "Eternidad": {
      texto: "Prometo amarte\n　　　　más allá del tiempo,\ncomo las palabras perduran\n　　　　en los versos que escribo.",
      decoracion: "⋆ ˚｡⋆୨୧˚ ˚୨୧⋆｡˚ ⋆"
    }
  };

  // 🎲 Selección aleatoria
  const portada = portadas[Math.floor(Math.random() * portadas.length)];
  const tema = Object.keys(poemas)[Math.floor(Math.random() * 4)];
  const { texto, decoracion } = poemas[tema];
  const user = '@' + m.sender.split('@')[0] || '@user';

  // ✨ Mensaje con diseño romántico mejorado
  const mensaje = `
╔═══*.·:·.☽✧    ✦    ✧☾.·:·.*═══╗
   ♡ۣۜۜۜ͜͡ꦿ⃟⸙ۣۜۜۜ【ＰＯＥＭＡ　ＲＯＭÁＮＴＩＣＯ】ۣۣۜۜ⸙ꦿ⃟ۣۜۜ♡͜͡

  *•.¸♡　Ｄｅ:　Ｉｎｄｅｐｅｎｄｉｅｎｔｅ　♡¸.•*
  *•.¸♡　Ｐａｒａ: ${user}　♡¸.•*
  *•.¸♡　Ｔｅｍａ: ${tema}　♡¸.•*

${decoracion}
${texto}
${decoracion}

╚═══*.·:·.☽✧    ✦    ✧☾.·:·.*═══╝
　　　　　　　  　   🌹 *Con amor, Independiente* 🌹
　　　　　　   ✧･ﾟ:* *:･ﾟ✧
`.trim();

  // 📤 Enviar mensaje con diseño mejorado
  await conn.sendFile(
    m.chat, 
    portada, 
    'romance.jpg', 
    mensaje, 
    m, 
    false, 
    { 
      mentions: [m.sender],
      ephemeralExpiration: 24 * 60 * 1000,
      quoted: m
    }
  );
}

handler.help = ['romance'];
handler.tags = ['literatura'];
handler.command = /^(romance|poema|amor|independiente)$/i;

export default handler;
