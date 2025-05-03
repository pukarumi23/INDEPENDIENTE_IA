const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: { headless: true }
});

// Generar QR para iniciar sesión
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Confirmar cuando el bot esté listo
client.on('ready', () => {
    console.log('Bot activado ✅ | Usa ".invocar" en un grupo.');
});

// Escuchar mensajes
client.on('message', async (msg) => {
    const chat = await msg.getChat();

    // Verificar si es un grupo y si el mensaje es ".invocar"
    if (chat.isGroup && msg.body.toLowerCase() === '.invocar') {
        const participants = chat.participants;
        let mentions = [];

        // Crear menciones para cada participante (excepto el bot)
        participants.forEach((participant) => {
            if (participant.id._serialized !== client.info.wid._serialized) {
                mentions.push({
                    tag: '@' + participant.id.user,  // Ejemplo: @51987654321
                    mention: participant.id._serialized  // ID completo
                });
            }
        });

        // Enviar mensaje con menciones si hay participantes
        if (mentions.length > 0) {
            await chat.sendMessage(
                `¡Hola, equipo! ${mentions.map(m => m.tag).join(' ')} ¿Cómo están hoy? 👋`,
                { mentions: mentions.map(m => m.mention) }  // Etiqueta a todos
            );
        } else {
            await msg.reply('⚠️ No hay usuarios para mencionar en este grupo.');
        }
    }
});

// Iniciar el bot
client.initialize();
