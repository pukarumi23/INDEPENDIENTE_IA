import { readdirSync, statSync, existsSync } from 'fs'
import { join, resolve } from 'path'

let handler = async (m, { conn }) => {
    // Configuración de rutas
    const baseDir = resolve('./') // Resuelve el directorio base del proyecto
    const videoFolder = join(baseDir, 'src', 'tiktok-videos')
    
    // Verificar si la carpeta existe
    if (!existsSync(videoFolder)) {
        await m.react('❓')
        return conn.reply(m.chat, `❌ La carpeta de videos no existe. Por favor crea la carpeta: src/tiktok-videos`, m)
    }

    try {
        await m.react('🕓')
        
        // Obtener lista de videos con validación
        const videoFiles = readdirSync(videoFolder)
            .filter(file => {
                const filePath = join(videoFolder, file)
                const isVideo = ['.mp4', '.mov', '.mkv'].some(ext => file.toLowerCase().endsWith(ext))
                return isVideo && statSync(filePath).isFile()
            })
        
        if (videoFiles.length === 0) {
            await m.react('📁')
            return conn.reply(m.chat, 'ℹ️ No hay videos disponibles en la carpeta. Por favor agrega algunos.', m)
        }
        
        // Seleccionar video aleatorio con verificación
        let attempts = 0
        let randomFile, videoPath, fileStats
        
        do {
            randomFile = videoFiles[Math.floor(Math.random() * videoFiles.length)]
            videoPath = join(videoFolder, randomFile)
            fileStats = statSync(videoPath)
            attempts++
        } while (attempts < 5 && fileStats.size === 0) // Evitar archivos vacíos
        
        // Verificar tamaño del archivo
        if (fileStats.size === 0) {
            await m.react('⚠️')
            return conn.reply(m.chat, 'El video seleccionado está vacío o corrupto', m)
        }
        
        // Enviar video con configuración optimizada
        await conn.sendFile(
            m.chat,
            videoPath,
            'tiktok-video.mp4',
            '', // Sin caption
            m,
            null,
            {
                mimetype: 'video/mp4',
                contextInfo: {
                    externalAdReply: {
                        title: '🎬 Video aleatorio de TikTok',
                        body: 'Disfruta este contenido',
                        thumbnail: await conn.getFile(join(baseDir, 'src', 'assets', 'tiktok-thumb.jpg')).data
                    }
                }
            }
        )
        
        await m.react('✅')
        
    } catch (e) {
        console.error('Error en comando tiktoklocal:', e)
        await m.react('✖️')
        await conn.reply(m.chat, `❌ Ocurrió un error al enviar el video: ${e.message}`, m)
    }
}

// Configuración del handler
handler.help = ['tiktoklocal']
handler.tags = ['fun', 'media']
handler.command = /^(localtiktok|tiktoklocal|vtiktok|tiktokvid)$/i
handler.limit = true
handler.register = true

export default handler
