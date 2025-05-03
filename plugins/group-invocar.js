const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Configurar el cliente
const client = new Client({
    authStrategy: new LocalAuth(), // Guarda la sesión para evitar escanear QR cada vez
    puppeteer: { headless: true } // Ejecutar sin interfaz gráfica (opcional)
});

// Generar QR para iniciar sesión
client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

// Cuando la sesión esté lista
client.on('ready', () => {
    console.log('¡Bot listo! ✅');
});

// Escuchar mensajes en grupos
client.on('message', async (msg) => {
    const chat = await msg.getChat();

    // Verificar si es un grupo y si el mensaje es "/saludar"
    if (chat.isGroup && msg.body === '.invocar') {
        const participants = chat.participants;
        let mentions = [];

        // Crear menciones para cada participante (excepto el bot)
        participants.forEach((participant) => {
            if (participant.id._serialized !== client.info.wid._serialized) {
                mentions.push({
                    tag: '@' + participant.id.user, // Formato de mención
                    mention: participant.id._serialized // ID del usuario
                });
            }
        });

        // Enviar mensaje con menciones
        if (mentions.length > 0) {
            await chat.sendMessage(
                `¡Hola a todos! ${mentions.map(m => m.tag).join(' ')} ¿Cómo están? 🌟`,
                { mentions: mentions.map(m => m.mention) }
            );
        }
    }
});

// Iniciar el bot
client.initialize();
