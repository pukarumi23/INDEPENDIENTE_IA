import fetch from 'node-fetch';
import yts from 'yt-search';
import { exec } from 'child_process';
import { promisify } from 'util';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import stream from 'stream';

const execAsync = promisify(exec);
const pipeline = promisify(stream.pipeline);
const downloadFolder = './descargas'; 
const MAX_SIZE_MB = 100; 

const FORCE_DOCUMENT = false;

if (!fs.existsSync(downloadFolder)) {
  fs.mkdirSync(downloadFolder, { recursive: true });
}

const sanitizeFilename = (filename) => {
  return filename
    .replace(/[/\\?%*:|"<>]/g, '-') 
    .replace(/\s+/g, '_') 
    .substring(0, 100); 
};

const getFileSize = async (url) => {
  try {
    const response = await axios.head(url, {
      timeout: 10000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    const sizeInBytes = response.headers['content-length'] || 0;
    return parseFloat((sizeInBytes / (1024 * 1024)).toFixed(2));
  } catch (error) {
    console.error("Error obteniendo el tamaño del archivo:", error.message);
    return 0;
  }
};

const downloadFileToLocal = async (url, filePath) => {
  try {
    const response = await axios({
      url,
      method: 'GET',
      responseType: 'stream',
      timeout: 60000,
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });
    
    await pipeline(response.data, fs.createWriteStream(filePath));
    return filePath;
  } catch (error) {
    console.error("Error descargando archivo:", error.message);
    throw error;
  }
};

const fetchAPI = async (url, type) => {
  const audioEndpoints = [
    // API 1: Cobalt.tools (más confiable)
    {
      url: async () => {
        const response = await fetch('https://co.wuk.sh/api/json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          body: JSON.stringify({
            url: url,
            vQuality: '720',
            vCodec: 'h264',
            vBitrate: '128',
            aFormat: 'mp3'
          })
        });
        const data = await response.json();
        return data;
      },
      extract: (data) => data.status === 'success' ? data.url : null
    },
    // API 2: YT-DLP alternativo
    {
      url: async () => {
        const response = await fetch(`https://api.cobalt.tools/api/json`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            url: url,
            vQuality: 'max',
            aFormat: 'mp3',
            isAudioOnly: true
          })
        });
        const data = await response.json();
        return data;
      },
      extract: (data) => data.status === 'success' ? data.url : null
    },
    // API 3: Backup confiable
    {
      url: async () => {
        const response = await fetch(`https://api.github.io/yt-dlp?url=${encodeURIComponent(url)}&format=mp3`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.success ? data.download_url : null
    },
    // API 4: Vreden (mejorada)
    {
      url: async () => {
        const response = await fetch(`https://api.vreden.my.id/api/ytmp3?url=${encodeURIComponent(url)}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.result?.download?.url || data.download
    },
    // API 5: Siputzx (mejorada)
    {
      url: async () => {
        const response = await fetch(`https://api.siputzx.my.id/api/d/ytmp3?url=${encodeURIComponent(url)}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.dl || data.download || data.result?.dl
    }
  ];

  const videoEndpoints = [
    // API 1: Cobalt.tools para video
    {
      url: async () => {
        const response = await fetch('https://co.wuk.sh/api/json', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          },
          body: JSON.stringify({
            url: url,
            vQuality: '720',
            vCodec: 'h264',
            aFormat: 'mp3'
          })
        });
        const data = await response.json();
        return data;
      },
      extract: (data) => data.status === 'success' ? data.url : null
    },
    // API 2: Backup para video
    {
      url: async () => {
        const response = await fetch(`https://api.github.io/yt-dlp?url=${encodeURIComponent(url)}&format=mp4`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.success ? data.download_url : null
    },
    // API 3: Vreden para video
    {
      url: async () => {
        const response = await fetch(`https://api.vreden.my.id/api/ytmp4?url=${encodeURIComponent(url)}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.result?.download?.url || data.download
    },
    // API 4: Siputzx para video
    {
      url: async () => {
        const response = await fetch(`https://api.siputzx.my.id/api/d/ytmp4?url=${encodeURIComponent(url)}`, {
          headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
          }
        });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.dl || data.download || data.result?.dl
    },
    // API 5: Neoxr mejorada
    {
      url: async () => {
        const response = await fetch(`https://api.neoxr.eu/api/youtube?url=${encodeURIComponent(url)}&type=video&quality=360p&apikey=GataDios`);
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const data = await response.json();
        return data;
      },
      extract: (data) => data.data?.url || data.result?.url
    }
  ];

  const endpoints = type === 'audio' ? audioEndpoints : videoEndpoints;
  
  console.log(`🔍 Intentando descargar ${type} desde ${endpoints.length} APIs...`);
  
  for (let i = 0; i < endpoints.length; i++) {
    const endpoint = endpoints[i];
    try {
      console.log(`⏳ Probando API ${i + 1}/${endpoints.length}...`);
      
      // Timeout para cada API individual
      const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => reject(new Error('Timeout de API')), 30000); // 30 segundos
      });
      
      const data = await Promise.race([endpoint.url(), timeoutPromise]);
      const downloadUrl = endpoint.extract(data);
      
      if (downloadUrl && downloadUrl.startsWith('http')) {
        console.log(`✅ API ${i + 1} exitosa, URL obtenida`);
        
        // Verificar que la URL funcione
        try {
          const testResponse = await axios.head(downloadUrl, {
            timeout: 10000,
            headers: {
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            }
          });
          
          if (testResponse.status === 200) {
            return { download: downloadUrl };
          }
        } catch (testError) {
          console.log(`❌ URL de API ${i + 1} no funciona, continuando...`);
          continue;
        }
      } else {
        console.log(`❌ API ${i + 1} no devolvió URL válida`);
      }
    } catch (error) {
      console.error(`❌ Error con API ${i + 1}:`, error.message);
    }
  }
  
  console.log('❌ Todas las APIs fallaron');
  return { download: null };
};

const sendAsAudio = async (conn, chatId, url, title, replyMsg) => {
  try {
    const sanitizedTitle = sanitizeFilename(title);
    const fileName = `${sanitizedTitle}.mp3`;
    
    await conn.sendMessage(chatId, {
      audio: { url },
      mimetype: 'audio/mpeg',
      fileName,
      caption: `💙 ¡Disfruta tu audio!\n🎵 ${title}`
    }, { quoted: replyMsg });
    
    return true;
  } catch (error) {
    console.error("Error enviando audio:", error.message);
    await conn.reply(chatId, `💙 Hubo un problema enviando el audio. Intenta más tarde.\nError: ${error.message}`, replyMsg);
    return false;
  }
};

const sendAsVideo = async (conn, chatId, url, title, replyMsg) => {
  try {
    const sanitizedTitle = sanitizeFilename(title);
    const fileName = `${sanitizedTitle}.mp4`;
    
    await conn.sendMessage(chatId, {
      video: { url },
      mimetype: 'video/mp4',
      fileName,
      caption: `💙 ¡Disfruta tu video!\n🎬 ${title}`
    }, { quoted: replyMsg });
    
    return true;
  } catch (error) {
    console.error("Error enviando video:", error.message);
    await conn.reply(chatId, `💙 Hubo un problema enviando el video. Intenta más tarde.\nError: ${error.message}`, replyMsg);
    return false;
  }
};

const sendAsDocument = async (conn, chatId, url, isAudio, title, replyMsg) => {
  const sanitizedTitle = sanitizeFilename(title);
  const fileName = `${sanitizedTitle}.${isAudio ? 'mp3' : 'mp4'}`;
  const filePath = path.join(downloadFolder, fileName);

  try {
    await conn.reply(chatId, `💙 Preparando ${isAudio ? 'audio' : 'video'} como documento...`, replyMsg);
    
    await downloadFileToLocal(url, filePath);
    
    if (!fs.existsSync(filePath) || fs.statSync(filePath).size === 0) {
      throw new Error("Archivo descargado vacío o corrupto");
    }
    
    await conn.sendMessage(chatId, {
      document: fs.readFileSync(filePath),
      mimetype: isAudio ? 'audio/mpeg' : 'video/mp4',
      fileName,
      caption: `💙 ${isAudio ? 'Audio' : 'Video'} descargado como documento\n${isAudio ? '🎵' : '🎬'} ${title}`
    }, { quoted: replyMsg });
    
    fs.unlink(filePath, (err) => {
      if (err) console.error("Error eliminando archivo temporal:", err);
    });
    
    return true;
  } catch (error) {
    console.error("Error enviando documento:", error.message);
    
    try {
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
      
      await conn.sendMessage(chatId, {
        document: { url },
        mimetype: isAudio ? 'audio/mpeg' : 'video/mp4',
        fileName,
        caption: `💙 ${isAudio ? 'Audio' : 'Video'} descargado como documento\n${isAudio ? '🎵' : '🎬'} ${title}`
      }, { quoted: replyMsg });
      
      return true;
    } catch (directError) {
      console.error("Error en envío directo:", directError.message);
      await conn.reply(chatId, `💙 No se pudo enviar el archivo. Intenta más tarde.\nError: ${directError.message}`, replyMsg);
      return false;
    }
  }
};

const downloadAndSend = async (conn, chatId, replyMsg, videoId, option, title) => {
  try {
    const isAudio = option === 1 || option === 3;
    const asDocument = option === 3 || option === 4;
    
    const messageType = isAudio ? 'audio' : 'video';
    const format = isAudio ? 'MP3' : 'MP4';
    const documentText = asDocument ? ' como documento' : '';
    
    await conn.reply(chatId, `💙 Descargando ${messageType} (${format})${documentText}, por favor espera...\n⏳ Esto puede tomar unos minutos`, replyMsg);

    const videoUrl = `https://youtu.be/${videoId}`;
    console.log(`🎯 Iniciando descarga: ${videoUrl} (${messageType})`);
    
    const apiResponse = await fetchAPI(videoUrl, isAudio ? 'audio' : 'video');
    const downloadUrl = apiResponse.download;

    if (!downloadUrl) {
      await conn.reply(chatId, `💙 No se pudo obtener el enlace de descarga del ${messageType}.\n🔄 Todas las APIs están temporalmente no disponibles.\n⏰ Intenta de nuevo en unos minutos.`, replyMsg);
      return false;
    }

    console.log(`✅ URL de descarga obtenida: ${downloadUrl.substring(0, 50)}...`);

    const fileSizeMB = await getFileSize(downloadUrl);
    console.log(`📊 Tamaño del archivo: ${fileSizeMB}MB`);

    if (fileSizeMB > MAX_SIZE_MB) {
      await conn.reply(chatId, `💙 El archivo es demasiado grande (${fileSizeMB.toFixed(2)}MB).\n📏 Máximo permitido: ${MAX_SIZE_MB}MB\n💡 Intenta con un video más corto.`, replyMsg);
      return false;
    }

    let success = false;
    
    if (option === 1) {
      success = await sendAsAudio(conn, chatId, downloadUrl, title, replyMsg);
    } else if (option === 2) {
      success = await sendAsVideo(conn, chatId, downloadUrl, title, replyMsg);
    } else if (option === 3 || option === 4) {
      success = await sendAsDocument(conn, chatId, downloadUrl, isAudio, title, replyMsg);
    }
    
    return success;
  } catch (error) {
    console.error('Error descargando con API:', error);
    await conn.reply(chatId, `💙 Ocurrió un error al procesar tu solicitud.\n❌ Error: ${error.message}\n🔄 Intenta de nuevo en unos minutos.`, replyMsg);
    return false;
  }
};

// Objeto para almacenar los listeners activos
const activeListeners = new Map();

let handler = async (m, { conn, text }) => {
  if (!text) return conn.reply(m.chat, '💙 Ingresa el nombre de la canción o video que deseas buscar.\n📝 Ejemplo: .play despacito', m);

  try {
    await conn.reply(m.chat, '🔍 Buscando en YouTube...', m);
    
    let res = await search(text);
    if (!res || res.length === 0) return conn.reply(m.chat, '💙 No se encontraron resultados para tu búsqueda.\n🔄 Intenta con palabras clave diferentes.', m);

    const { title, thumbnail, timestamp, views, ago, videoId } = res[0];

    let txt = `💙 [ YOUTUBE - PLAY ] 💙\n\n`
            + `🎵 *Título:* ${title}\n`
            + `⏱️ *Duración:* ${timestamp}\n`
            + `👀 *Visitas:* ${views}\n`
            + `📅 *Subido:* ${ago}\n`
            + `🆔 *ID:* ${videoId}\n\n`
            + `💙 *Responde a este mensaje con:*\n`
            + `1️⃣ Audio MP3\n`
            + `2️⃣ Video MP4\n`
            + `3️⃣ Audio MP3 como Documento\n`
            + `4️⃣ Video MP4 como Documento\n\n`
            + `⏰ *Tiempo límite:* 5 minutos`;

    let SM = await conn.sendFile(m.chat, thumbnail, 'thumbnail.jpg', txt, m);
    
    await conn.sendMessage(m.chat, { react: { text: '🎤', key: SM.key } });

    const handleOnce = new Set();
    
    // Crear un listener específico para este mensaje
    const messageListener = async (upsertedMessage) => {
      let RM = upsertedMessage.messages[0];
      if (!RM.message) return;

      const UR = RM.message.conversation || RM.message.extendedTextMessage?.text;
      let UC = RM.key.remoteJid;
      const msgId = RM.key.id;

      // Verificar que la respuesta sea al mensaje correcto
      if (RM.message.extendedTextMessage?.contextInfo?.stanzaId === SM.key.id && !handleOnce.has(msgId)) {
        handleOnce.add(msgId);
        
        await conn.sendMessage(UC, { react: { text: '⏳', key: RM.key } });
        let success = false;
        let option = 0;

        if (UR === '1') {
          option = 1; // Audio MP3
        } else if (UR === '2') {
          option = 2; // Video MP4
        } else if (UR === '3') {
          option = 3; // Audio MP3 como documento
        } else if (UR === '4') {
          option = 4; // Video MP4 como documento
        } else {
          await conn.sendMessage(UC, { 
            text: "💙 Opción inválida.\n\n✅ Opciones válidas:\n1️⃣ Audio MP3\n2️⃣ Video MP4\n3️⃣ Audio MP3 como documento\n4️⃣ Video MP4 como documento" 
          }, { quoted: RM });
          await conn.sendMessage(UC, { react: { text: '❌', key: RM.key } });
          return;
        }
        
        success = await downloadAndSend(conn, UC, RM, videoId, option, title);
        
        let reactionEmoji = '❌';
        if (success) {
          if (option === 1) reactionEmoji = '🎵';
          else if (option === 2) reactionEmoji = '🎬';
          else if (option === 3) reactionEmoji = '📎';
          else if (option === 4) reactionEmoji = '📁';
        }
        
        await conn.sendMessage(UC, { react: { text: reactionEmoji, key: RM.key } });
        
        // Remover el listener una vez que se ha procesado la respuesta
        conn.ev.off("messages.upsert", messageListener);
        activeListeners.delete(SM.key.id);
      }
    };

    // Agregar el listener y guardarlo en el mapa
    conn.ev.on("messages.upsert", messageListener);
    activeListeners.set(SM.key.id, messageListener);

    // Timeout para remover el listener después de 5 minutos
    setTimeout(() => {
      if (activeListeners.has(SM.key.id)) {
        conn.ev.off("messages.upsert", activeListeners.get(SM.key.id));
        activeListeners.delete(SM.key.id);
        console.log(`⏰ Timeout alcanzado para mensaje ${SM.key.id}`);
      }
    }, 300000); // 5 minutos

  } catch (error) {
    console.error('Error en handler principal:', error);
    conn.reply(m.chat, `💙 Ocurrió un error al procesar tu solicitud.\n❌ Error: ${error.message}\n🔄 Intenta de nuevo.`, m);
  }
};

handler.command = ["play"];
handler.help = ["play <canción>"];
handler.tags = ["downloader"];
export default handler;

async function search(query, options = {}) {
  try {
    let search = await yts.search({ query, hl: "es", gl: "ES", ...options });
    return search.videos;
  } catch (error) {
    console.error('Error en búsqueda de YouTube:', error);
    throw new Error('No se pudo realizar la búsqueda en YouTube');
  }
}
