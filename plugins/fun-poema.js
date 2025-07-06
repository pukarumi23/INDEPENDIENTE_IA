let handler = async (m, { conn }) => {
  
  const poemas = {
    romance: [
      "Tus ojos son dos luceros que iluminan mi existir,\ncomo el sol que en la mañana hace el mundo resurgir.",
      "Eres el verso perfecto en mi poema sin final,\nla rima que mi corazón no deja de buscar.",
      "Si el amor fuera rosa, tú serías su perfume,\nsi fuera un dulce beso, tú serías su espuma.",
      "Prometo amarte hasta que las estrellas dejen de brillar,\ny cuando eso pase, aprenderé a amarte en la oscuridad."
    ],
    humorNegro: [
      "Érase un hombre tan pobre,\ntan pobre, tan pobre,\nque solo tenía dinero.",
      "Mi abuelo decía siempre:\n'La vida es como un panqueque'\n...nunca supe qué quiso decir,\npero lo extraño desde que se suicidó.",
      "¿Sabes por qué los esqueletos no pelean?\nPorque no tienen agallas.",
      "Mi vida es como una bicicleta sin ruedas...\nno sirve para nada, pero igual la guardo en el garaje."
    ],
    naturaleza: [
      "Los árboles susurran secretos al viento,\nhojas que bailan en eterno movimiento.",
      "El río canta su canción sin fin,\nllevando historias que jamás volverán aquí.",
      "Montañas que besan las nubes al amanecer,\nguardando silencio para poder crecer.",
      "La lluvia escribe poemas en el cristal,\nversos efímeros de un final fugaz."
    ]
  };
  
  const temas = Object.keys(poemas);
  const emojis = {
    romance: "💖", 
    humorNegro: "☠️", 
    naturaleza: "🌿"
  };
  
  // Seleccionar tema aleatorio
  const tema = temas[Math.floor(Math.random() * temas.length)];
  const poema = poemas[tema][Math.floor(Math.random() * poemas[tema].length)];
  
  // Obtener nombre de usuario
  const username = m.pushName || 'amig@';
  
  // Enviar el poema con formato
  conn.reply(m.chat, `
╭━━━━━━━━━━━━━━━━━━━━━━━╮
│ ✨ *POEMA DEL DÍA* ✨
╰━━━━━━━━━━━━━━━━━━━━━━━╯

Hola ${username}! Aquí tienes un poema de *${tema.toUpperCase()}*:

${emojis[tema]} ${poema}

${emojis[tema]} *Que la musa te acompañe hoy...*
  `, m);
  
  // Efectos de audio (opcional)
  conn.sendPresenceUpdate('recording', m.chat);
  setTimeout(() => {
    conn.sendPresenceUpdate('available', m.chat);
    // Puedes cambiar el audio por uno temático
    conn.sendFile(m.chat, './media/poema.mp3', 'audio.mp3', null, m, true);
  }, 2000);
}

handler.help = ['poema', 'verso', 'poesia']
handler.tags = ['fun', 'literature']
handler.command = /^(poema|verso|poesía|poesia)$/i

export default handler
