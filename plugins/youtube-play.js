import fetch from 'node-fetch';
import yts from 'yt-search';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import { pipeline } from 'stream/promises';

const downloadFolder = './tmp';
if (!fs.existsSync(downloadFolder)) fs.mkdirSync(downloadFolder);

// 1. Solución con yt-dlp (Recomendado - Requiere instalación)
const downloadWithYTDLP = async (url, type, filename) => {
  const ext = type === 'audio' ? 'mp3' : 'mp4';
  const filePath = path.join(downloadFolder, `${filename}.${ext}`);
  
  try {
    const command = `yt-dlp -x --audio-format mp3 -o "${filePath}" ${url}`;
    const { stdout, stderr } = await execAsync(command);
    
    if (fs.existsSync(filePath)) {
      return filePath;
    }
    throw new Error(stderr || 'Error desconocido con yt-dlp');
  } catch (error) {
    console.error('Error con yt-dlp:', error);
    return null;
  }
};

// 2. Solución con APIs alternativas
const fetchAudioURL = async (videoUrl) => {
  const apis = [
    {
      url: `https://api.download-lagu-mp3.com/@api/json/mp3/${encodeURIComponent(videoUrl)}`,
      extract: (data) => data.vidInfo.media[0].url
    },
    {
      url: `https://convert2mp3s.com/api/single/mp3?url=${encodeURIComponent(videoUrl)}`,
      extract: (data) => data.url
    },
    {
      url: `https://api.vevioz.com/api/button/mp3/${videoUrl.split('v=')[1]}`,
      extract: (data) => data.url
    }
  ];

  for (const api of apis) {
    try {
      const res = await fetch(api.url);
      const data = await res.json();
      const audioUrl = api.extract(data);
      if (audioUrl) return audioUrl;
    } catch (e) {
      console.error(`Error con API ${api.url}:`, e);
    }
  }
  return null;
};

// 3. Solución híbrida
const getAudio = async (videoId, filename) => {
  // Primero intentamos con yt-dlp
  const localFile = await downloadWithYTDLP(`https://youtu.be/${videoId}`, 'audio', filename);
  if (localFile) return { url: null, file: localFile };

  // Si falla, probamos con APIs
  const audioUrl = await fetchAudioURL(`https://youtu.be/${videoId}`);
  return { url: audioUrl, file: null };
};

// Manejador mejorado
handler.command = ['play'];
handler.help = ['play <canción>'];
handler.tags = ['downloader'];
export default async function handler(m, { conn, text }) {
  if (!text) return m.reply('🔎 Proporciona un nombre de canción');
  
  try {
    const search = await yts(text);
    if (!search.videos.length) return m.reply('❌ No se encontraron resultados');
    
    const video = search.videos[0];
    const { title, thumbnail, videoId } = video;
    const filename = sanitizeFilename(title);
    
    // Envía información del video
    await conn.sendMessage(m.chat, {
      image: { url: thumbnail },
      caption: `🎵 *${title}*\n\nElige una opción:\n1. Audio MP3\n2. Video MP4`
    }, { quoted: m });

    // Escucha la respuesta
    const collector = (msg) => {
      if (msg.sender === m.sender && ['1', '2'].includes(msg.text)) {
        conn.ev.off('messages.upsert', collector);
        handleSelection(msg.text, videoId, filename, m, conn);
      }
    };
    
    conn.ev.on('messages.upsert', collector);
    setTimeout(() => conn.ev.off('messages.upsert', collector), 60000);

  } catch (error) {
    console.error(error);
    m.reply('⚠️ Ocurrió un error al procesar tu solicitud');
  }
};

async function handleSelection(option, videoId, filename, m, conn) {
  try {
    await m.reply('⏳ Procesando tu solicitud...');
    
    if (option === '1') {
      const { url, file } = await getAudio(videoId, filename);
      
      if (file) {
        await conn.sendMessage(m.chat, {
          audio: fs.readFileSync(file),
          mimetype: 'audio/mpeg',
          fileName: `${filename}.mp3`
        }, { quoted: m });
        fs.unlinkSync(file);
      } else if (url) {
        await conn.sendMessage(m.chat, {
          audio: { url },
          mimetype: 'audio/mpeg',
          fileName: `${filename}.mp3`
        }, { quoted: m });
      } else {
        throw new Error('No se pudo obtener el audio');
      }
      
    } else if (option === '2') {
      // Lógica similar para video
    }
    
    await m.reply('✅ Descarga completada');
  } catch (error) {
    console.error(error);
    m.reply(`❌ Error: ${error.message}`);
  }
}

function sanitizeFilename(name) {
  return name.replace(/[^\w\s.-]/g, '').substring(0, 50);
}
