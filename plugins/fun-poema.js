let handler = async (m, { conn }) => {
  // 🎨 Portadas románticas aleatorias
  const portadas = [
    'https://img.freepik.com/foto-premium/fantasia-magica-sfondo-scuro-con-una-rosa-magica-e-un-vecchio-libro_21085-1782.jpg',
    'https://img.freepik.com/fotos-premium/livro-magico-aberto-com-paisagem-de-fantasia-sobre-paginas-criado-com-generative-ai_77190-10614.jpg',
    'https://img.freepik.com/fotos-premium/fantastico-livro-magico-com-rosa-magica-generative-ai_372999-11651.jpg'
  ];

  // 📜 Poemas románticos
  const poemas = {
    "Alma Gemela": {
      texto: "Eres las páginas que faltaban\nen mi libro incompleto,\nla rima que buscaba\nen cada verso imperfecto.",
      decoracion: "📖💞"
    },
    "Destino": {
      texto: "El universo escribió nuestro nombre\nen sus estrellas más brillantes,\ncomo un poema eterno\nen tinta de instantes.",
      decoracion: "✨📜"
    },
    "Encantamiento": {
      texto: "Hechizado por tu esencia,\ncomo libro de magia antigua,\nque solo revela sus secretos\nal alma que lo cultiva.",
      decoracion: "🔮🌹"
    },
    "Eternidad": {
      texto: "Prometo amarte\nmás allá del tiempo,\ncomo las palabras perduran\nen los versos que escribo.",
      decoracion: "⏳💘"
    }
  };

  // 🎲 Selección aleatoria
  const portada = portadas[Math.floor(Math.random() * portadas.length)];
  const tema = Object.keys(poemas)[Math.floor(Math.random() * 4)];
  const { texto, decoracion } = poemas[tema];
  const user = '@' + m.sender.split('@')[0] || '@user';

  // ✨ Mensaje formateado
  const mensaje = `
╭─────────────────╮
│  💌 POEMA ROMÁNTICO 💌  │
├─────────────────┤
│ De: Independiente
│ Para: ${user}
│ Tema: ${tema}
╰─────────────────╯

${decoracion} 
${texto}
${decoracion}

${decoracion} Con cariño, Independiente ${decoracion}
`.trim();

  // 📤 Enviar mensaje
  await conn.sendFile(
    m.chat, 
    portada, 
    'romance.jpg', 
    mensaje, 
    m, 
    false, 
    { mentions: [m.sender] }
  );
}

handler.help = ['romance'];
handler.tags = ['literatura'];
handler.command = /^(romance|poema|independiente)$/i;

export default handler;
