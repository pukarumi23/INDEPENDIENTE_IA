let handler = async (m, { conn }) => {
  // [Mantén todas las definiciones de portadas, poemas y categorías igual...]

  // Selección aleatoria
  const categoria = Object.keys(categorias)[Math.floor(Math.random() * Object.keys(categorias).length)];
  const tema = categorias[categoria][Math.floor(Math.random() * categorias[categoria].length)];
  const { poemas: listaPoemas, decoracion, sticker } = poemas[tema];
  const poema = listaPoemas[Math.floor(Math.random() * listaPoemas.length)];
  const username = m.pushName || 'alma poética';
  
  // Seleccionar imagen aleatoria de la categoría
  const portada = portadas[categoria][Math.floor(Math.random() * portadas[categoria].length)];

  // Crear un único mensaje que combine todo
  const mensajeCompleto = `
╭───────────────╮
  📚 *POESÍA TEMÁTICA* 📚
  ✨ ${categoria.toUpperCase()} ✨
╰───────────────╯

*Tema:* 『 ${tema} 』
*Para:* ${username}

✧･ﾟ: *✧･ﾟ:* *${tema.toUpperCase()}* *:･ﾟ✧*:･ﾟ✧

${poema}

${decoracion} *Que las musas te inspiren* ${decoracion}
`;

  // Enviar la imagen con el texto como caption (un solo mensaje)
  await conn.sendFile(m.chat, portada, 'portada.jpg', mensajeCompleto, m);

  // Efecto de escritura antes de enviar multimedia
  await conn.sendPresenceUpdate('composing', m.chat);
  await new Promise(resolve => setTimeout(resolve, 2000));

  // Enviar sticker y audio después
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
  }, 1000);
}

handler.help = ['poema', 'verso']
handler.tags = ['literatura', 'arte']
handler.command = /^(poema|verso|poesia|poesía)$/i

export default handler
