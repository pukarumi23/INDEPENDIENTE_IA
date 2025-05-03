import { makeWASocket, useSingleFileAuthState } from '@whiskeysockets/baileys';
import { cpus as _cpus, totalmem, freemem, platform } from 'os';
import speed from 'performance-now';
import { sizeFormatter } from 'human-readable';
import { readFileSync } from 'fs';

// Configuración inicial
const { state, saveState } = useSingleFileAuthState('./auth_info.json');
const socket = makeWASocket({
  auth: state,
  printQRInTerminal: true,
});

// Formateador de tamaño (para RAM)
const format = sizeFormatter({
  std: 'JEDEC',
  decimalPlaces: 2,
  keepTrailingZeroes: false,
  render: (literal, symbol) => `${literal} ${symbol}B`,
});

// Función para formatear números (ej: 1000 → 1,000)
const formatNumber = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Función para convertir milisegundos a días, horas, minutos, segundos
const clockString = (ms) => {
  if (isNaN(ms)) return '-- D -- H -- M -- S';
  const d = Math.floor(ms / 86400000);
  const h = Math.floor(ms / 3600000) % 24;
  const m = Math.floor(ms / 60000) % 60;
  const s = Math.floor(ms / 1000) % 60;
  return `${d} D ${h} H ${m} M ${s} S`;
};

// Manejar conexión y autenticación
socket.ev.on('connection.update', (update) => {
  const { connection, qr } = update;
  if (connection === 'close') {
    console.log('Conexión cerrada. Reconectando...');
    setTimeout(() => startBot(), 5000);
  }
  if (connection === 'open') {
    console.log('¡Bot conectado correctamente!');
  }
});

// Guardar estado de la sesión
socket.ev.on('creds.update', saveState);

// Manejar mensajes entrantes
socket.ev.on('messages.upsert', async ({ messages }) => {
  const msg = messages[0];
  if (!msg.message) return;

  const text = msg.message.conversation || '';
  const sender = msg.key.remoteJid;
  const botPrefix = '.'; // Prefijo del bot (ej: .info)

  // Comando .info (mostrar estadísticas del bot)
  if (text === `${botPrefix}info` || text === `${botPrefix}infobot`) {
    const uniqueUsers = new Map();
    const totalreg = Object.keys(global.db?.data?.users || {}).length;
    const totalchats = Object.keys(global.db?.data?.chats || {}).length;
    const totalStats = Object.values(global.db?.data?.stats || {}).reduce((total, stat) => total + (stat?.total || 0), 0);
    const totalPlugins = Object.values(global.plugins || {}).filter(v => v.help && v.tags).length;

    const used = process.memoryUsage();
    const uptime = process.uptime() * 1000;
    const timestamp = speed();
    const latensi = speed() - timestamp;

    let txt = `╭─── *INFORMACIÓN DEL BOT* ───\n`;
    txt += `│\n`;
    txt += `│ *🛠️ Estado:* Activo\n`;
    txt += `│ *📟 Prefijo:* ${botPrefix}\n`;
    txt += `│ *📡 Plataforma:* ${platform()}\n`;
    txt += `│ *⚡ Ping:* ${latensi.toFixed(4)} ms\n`;
    txt += `│ *💾 RAM usada:* ${format(totalmem() - freemem())}\n`;
    txt += `│ *📊 RAM libre:* ${format(freemem())}\n`;
    txt += `│ *👥 Usuarios:* ${formatNumber(totalreg)}\n`;
    txt += `│ *💬 Grupos:* ${formatNumber(totalchats)}\n`;
    txt += `│ *📊 Comandos usados:* ${formatNumber(totalStats)}\n`;
    txt += `│ *🧩 Plugins:* ${totalPlugins}\n`;
    txt += `│ *⏳ Uptime:* ${clockString(uptime)}\n`;
    txt += `╰──────────────────────`;

    await socket.sendMessage(sender, { text: txt });
  }
});

// Iniciar el bot
function startBot() {
  console.log('Iniciando bot...');
}

startBot();
