const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Crear cliente
const client = new Client();

// Mostrar el QR en la consola
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true });
});

// Confirmar que está listo
client.on('ready', () => {
  console.log('✅ Bot de WhatsApp listo!');
});

// Responder al mensaje "p"
client.on('message', (message) => {
  if (message.body.toLowerCase() === 'p') {
    message.reply('hola');
  }
});

// Iniciar cliente
client.initialize();