import { promises } from 'fs'
import { join } from 'path'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': 'Information',
  'search': 'Search',
  'game': 'Games',
  'rpg': 'Rpg',
  'rg': 'Registro',
  'sticker': 'Sticker',
  'group': 'Groups',
  'nable': 'On / Off', 
  'premium': 'Premium',
  'downloader': 'Download',
  'tools': 'Tools',
  'fun': 'Fun', 
  'cmd': 'Database',
  'owner': 'Creador', 
  'audio': 'Audios', 
  'advanced': 'Avanzado',
}

const defaultMenu = {
  before: `
  *🔶♾️⎯⎯⎯⎯⎯⎯⎯♾️🔶*

" Hola *%name* soy *INDEPENDIENTE_BOT*, %greeting "

╭── ◈◈◈◈◈◈◈◈◈◈◈🔶
┊ ‹‹ *Hello* :: *%name*
┊01 *INDEPENDIENTE_BOT*
╰─── independiente bot🔶
┊🔶 [ *Modo* :: *Público*
┊🔶 [ *Baileys* :: *Multi Device*
┊🔶 [ *Tiempo Activo* :: *%muptime*
┊🔶 [ *Usuarios* :: *%totalreg*
╰─────────
%readmore
*─ׄ─ׅ─ׄ─⭒ L I S T A  -  M E N Ú S ⭒─ׄ─ׅ─ׄ─*
`.trimStart(),
  header: '╔═══▶🔥【 𝑴𝑬𝑵Ú メ %category 】❇🔥◀═══╗\n║╔───────────────────────',
  body: '║❇❇️┊%cmd %islimit %isPremium\n',
  footer: '║───────────────────────────\n╚═════════⁜⁜⁜═════════╝\n',
  after: `> independiente bot`,
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    // Leer package.json
    let _package = {}
    try {
      _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')))
    } catch (e) {
      console.error('Error reading package.json:', e)
    }

    // Obtener datos del usuario
    const userData = global.db.data.users[m.sender] || {}
    const { exp = 0, limit = 0, level = 0 } = userData
    const { min, xp, max } = xpRange(level, global.multiplier)

    let name = await conn.getName(m.sender)
    let d = new Date()
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })

    // Tiempo de actividad
    let _uptime = process.uptime() * 1000
    let muptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered).length
    
    // Generar menú
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => ({
      help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
      tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
      prefix: 'customPrefix' in plugin,
      limit: plugin.limit,
      premium: plugin.premium,
      enabled: !plugin.disabled,
    }))
    
    // Actualizar tags
    for (let plugin of help) {
      if (plugin?.tags) {
        for (let tag of plugin.tags) {
          if (!(tag in tags) && tag) tags[tag] = tag
        }
      }
    }
    
    // Plantilla del menú
    conn.menu = conn.menu || {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || defaultMenu.after
    
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags?.includes(tag) && menu.help).map(menu => {
            return menu.help.map(help => {
              return body.replace(/%cmd/g, menu.prefix ? help : '%p' + help)
                .replace(/%islimit/g, menu.limit ? '◜⭐◞' : '')
                .replace(/%isPremium/g, menu.premium ? '◜🪪◞' : '')
                .trim()
            }).join('\n')
          }),
          footer
        ].join('\n')
      }),
      after
    ].join('\n')
    
    // Reemplazar variables
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, 
      uptime: muptime,
      muptime,
      me: conn.getName(conn.user.jid),
      npmname: _package.name || '',
      version: _package.version || '',
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      level,
      limit,
      name,
      weton,
      week,
      date,
      time,
      totalreg,
      rtotalreg,
      greeting: getGreeting(),
      readmore: readMore
    }
    
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    // URL de la imagen (puedes reemplazarla con tu propia URL)
    const imageUrl = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1N2ysfAnHDOn09rUQY9Ma_WAZbeGJKbTpQg&s'
    
    // Enviar mensaje con imagen
    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: text.trim(),
      mentions: [m.sender],
      contextInfo: {
        externalAdReply: {
          title: 'INDEPENDIENTE_BOT',
          body: 'Menú Principal',
          thumbnailUrl: imageUrl,
          sourceUrl: 'https://example.com',
          mediaType: 1
        }
      }
    }, { quoted: m })

    await m.react('🔶')

  } catch (e) {
    console.error('Error en el menú:', e)
    await conn.reply(m.chat, '❎ Ocurrió un error al mostrar el menú.', m)
  }
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú'] 
handler.register = true 
export default handler

const more = String.fromCharCode(8206)
const readMore = more.repeat(4001)

function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

function getGreeting() {
  const hour = new Date().getHours()
  const greetings = [
    [0, 'una linda noche 🌙'],
    [1, 'una linda noche 💤'],
    [2, 'una linda noche 🦉'],
    [3, 'una linda mañana ✨'],
    [4, 'una linda mañana 💫'],
    [5, 'una linda mañana 🌅'],
    [6, 'una linda mañana 🌄'],
    [7, 'una linda mañana 🌅'],
    [8, 'una linda mañana 💫'],
    [9, 'una linda mañana ✨'],
    [10, 'un lindo dia 🌞'],
    [11, 'un lindo dia 🌨'],
    [12, 'un lindo dia ❄'],
    [13, 'un lindo dia 🌤'],
    [14, 'una linda tarde 🌇'],
    [15, 'una linda tarde 🥀'],
    [16, 'una linda tarde 🌹'],
    [17, 'una linda tarde 🌆'],
    [18, 'una linda noche 🌙'],
    [19, 'una linda noche 🌃'],
    [20, 'una linda noche 🌌'],
    [21, 'una linda noche 🌃'],
    [22, 'una linda noche 🌙'],
    [23, 'una linda noche 🌃']
  ]
  
  return greetings.find(([h]) => hour === h)?.[1] || 'un lindo día'
}
