let handler = async (m, { conn, args }) => {
  // 🌹 Portadas románticas aleatorias
  const portadas = [
    'https://img.freepik.com/foto-premium/fantasia-magica-sfondo-scuro-con-una-rosa-magica-e-un-vecchio-libro_21085-1782.jpg',
    'https://img.freepik.com/fotos-premium/livro-magico-aberto-com-paisagem-de-fantasia-sobre-paginas-criado-com-generative-ai_77190-10614.jpg',
    'https://img.freepik.com/fotos-premium/fantastico-livro-magico-com-rosa-magica-generative-ai_372999-11651.jpg'
  ];

  // 💖 Poemas románticos mejorados
  const poemas = {
    "Alma Gemela": {
      texto: "Eres las páginas que faltaban\n en mi libro incompleto,\n la rima que buscaba\n en cada verso imperfecto.",
      decoracion: "✧･ﾟ: *✧･ﾟ:* ✧･ﾟ: *✧･ﾟ:*"
    },
    "Destino": {
      texto: "El universo escribió nuestro amor\n con tinta de estrellas brillantes,\n un poema eterno\n en el libro de los instantes.",
      decoracion: "✨ ⋆｡˚✩˚｡⋆ ✨"
    },
    "Encantamiento": {
      texto: "Hechizado por tu esencia,\n como grimoire de magia antigua,\n que solo revela sus secretos\n al alma que lo cultiva.",
      decoracion: "✧˚・｡･ﾟ✧*̥˚✧*̥･ﾟ✧"
    },
    "Eternidad": {
      texto: "Prometo amarte\n más allá del tiempo,\n como las palabras perduran\n en los versos que escribo.",
      decoracion: "⋆ ˚｡⋆୨୧˚ ˚୨୧⋆｡˚ ⋆"
    }
  };

  // 🎲 Selección aleatoria
  const portada = portadas[Math.floor(Math.random() * portadas.length)];
  const tema = Object.keys(poemas)[Math.floor(Math.random() * 4)];
  const { texto, decoracion } = poemas[tema];
  
  // 👤 Obtener el usuario mencionado
  let mentionedUser = m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : null;
  
  if (!mentionedUser) {
    return conn.reply(m.chat, '❌ *Por favor, menciona a alguien para dedicarle el poema.*\nEjemplo: `.dedicar @usuario`', m);
  }

  let user = '@' + mentionedUser.split('@')[0] || '@user';
  let sender = '@' + m.sender.split('@')[0] || '@autor';

  // ✨ Mensaje con diseño romántico mejorado
  const mensaje = `
╔══*.·:·.☽✧ ✦ ✧☾.·:·.*══╗
♡ۣۜۜۜ͜͡ꦿ⃟⸙ۣۜۜۜ【𝕻𝕺𝕰𝕸𝕬 𝕽𝕺𝕸Á𝕹𝕿𝕴ℂ𝕺】ۣۣۜۜ⸙ꦿ⃟ۣۜۜ♡͜͡

  *•.¸♡Ｄｅ: ${sender}　♡¸.•*
  *•.¸♡Ｐａｒａ: ${user}　♡¸.•*
  *•.¸♡Ｔｅｍａ: ${tema}　♡¸.•*

${decoracion}
${texto}
${decoracion}

╚══*.·:·.☽✧ ✦ ✧☾.·:·.*══╝
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
      mentions: [mentionedUser, m.sender], // Menciona a ambos
      ephemeralExpiration: 24 * 60 * 1000,
      quoted: m
    }
  );
}

// 🔧 Configuración del comando
handler.help = ['dedicar @usuario'];
handler.tags = ['literatura', 'romance'];
handler.command = /^(dedicar|dedica|regalarpoema)$/i;

export default handler;
