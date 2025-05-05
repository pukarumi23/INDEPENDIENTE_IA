import { readdirSync, statSync } from 'fs'
import { join } from 'path'

let handler = async (m, { conn }) => {
    // Ruta a tu carpeta con videos
    const videoFolder = './src/tiktok-videos/'
    
    try {
        await m.react('🕓')
        
        // Obtener lista de videos
        const videoFiles = readdirSync(videoFolder)
            .filter(file => ['.mp4', '.mov'].some(ext => file.endsWith(ext)))
        
        if (videoFiles.length === 0) throw new Error('No hay videos disponibles')
        
        // Seleccionar aleatorio
        const randomFile = videoFiles[Math.floor(Math.random() * videoFiles.length)]
        const videoPath = join(videoFolder, randomFile)
        
        // Enviar video
        await conn.sendFile(
            m.chat,
            videoPath,
            'tiktok-random.mp4',
            '',
            m
        )
        
        await m.react('✅')
        
    } catch (e) {
        await m.react('✖️')
        console.error('Error:', e)
    }
}

handler.command = /^(localtiktok|tiktoklocal)$/i
export default handler
