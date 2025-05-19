// Dentro del catch del handler:
} catch (e) {
    let errorMessage = `
    *💙 ¡Lo sentimos, Hatsune Miku! 💙*

    El menú tiene un error inesperado 💔

    *📛 Error:* ${e.message}
    *⏳ Hora:* ${new Date().toLocaleTimeString()}
    
    Por favor, intenta nuevamente más tarde.
    Si el problema persiste, contacta al desarrollador.

    *💌 Gracias por tu comprensión*
    `.trim()
    
    await conn.sendMessage(m.chat, { 
        text: errorMessage,
        contextInfo: {
            mentionedJid: [m.sender],
            forwardingScore: 999,
            isForwarded: true
        }
    }, { quoted: m })
    
    console.error('Error en el menú:', e)
    throw e
}
