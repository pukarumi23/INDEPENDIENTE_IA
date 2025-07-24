let handler = async (m, { conn }) => {
  if (/^\.hentai$/i.test(m.text)) {
    const hentaiMessage = `
╔══════⊹⊱✦⊰⊹══════╗  
🔶 *Estimad@ usuari@:*  
Quiero informarte de manera clara que, por el momento,  
no cuento con contenido relacionado con reproducción humana animada.  

✨ Gracias por tu comprensión y respeto.  
╚══════⊹⊱✦⊰⊹══════╝
`.trim();
    
    await conn.sendMessage(
      m.chat, 
      { text: hentaiMessage },
      { ephemeralExpiration: 24 * 60 * 1000, quoted: m }
    );
    return;
  }

  if (/^\.porno$/i.test(m.text)) {
    const pornoMessage = `
╔══════⊹⊱✦⊰⊹══════╗  
🔶 *Estimad@ usuari@:*  
Quiero informarte de manera clara que, por el momento,  
no cuento con contenido relacionado con reproducción humana.  

✨ Gracias por tu comprensión y respeto.  
╚══════⊹⊱✦⊰⊹══════╝
`.trim();
    
    await conn.sendMessage(
      m.chat, 
      { text: pornoMessage },
      { ephemeralExpiration: 24 * 60 * 1000, quoted: m }
    );
    return;
  }
}

handler.help = ['hentai', 'porno'];
handler.tags = ['info'];
handler.command = /^(hentai|porno)$/i;

export default handler;
