import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

// Variables globales que deben estar definidas o importadas
const textbot = process.env.TEXTBOT || 'Bot Name'
const botname = process.env.BOTNAME || 'Bot'
const canal = process.env.CANAL || ''
const rcanal = process.env.RCANAL || null
const estilo = process.env.ESTILO || null

let tags = {
  'main': 'Information',
  'search': 'Search',
  'game': 'Games',
  'serbot': 'Sub-Bots',
  'rpg': 'Rpg',
  'rg': 'Registro',
  'sticker': 'Sticker',
  'img': 'Image',
  'group': 'Groups',
  'nable': 'On / Off', 
  'premium': 'Premium',
  'downloader': 'Download',
  'tools': 'Tools',
  'fun': 'Fun',
  'nsfw': 'Nsfw', 
  'cmd': 'Database',
  'owner': 'Creador', 
  'audio': 'Audios', 
  'advanced': 'Avanzado',
}

const defaultMenu = {
  before: `
  *💮💙🥢⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯⎯🥢💙💮*

" Hola *%name* soy *💙HATSUNE MIKU💙*, %greeting "

╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*
┊ ‹‹ *Hello* :: *%name*
┊01 *💙HATSUNE MIKU CHANNEL💙*
╰─── 💙 Hatsune Miku 💙
┊B [ *Modo* :: *Público*
┊V [ *Baileys* :: *Multi Device*
┊H [ *Tiempo Activo* :: *%muptime*
┊3 [ *Usuarios* :: *%totalreg*
╰─────────
%readmore
*─ׄ─ׅ─ׄ─⭒ L I S T A  -  M E N Ú S ⭒─ׄ─ׅ─ׄ─*
`.trimStart(),
  header: '╔═══◇◆🥬【 𝑴𝑬𝑵Ú メ %category 】🥬◆◇═══╗\n║╔───────────────────────',
  body: '║🌱┊%cmd %islimit %isPremium\n',
  footer: '║───────────────────────────\n╚═════════◆◇◆═════════╝\n',
  after: `> 💙 ${textbot}`,
}

// Función para obtener saludo según la hora
function getGreeting() {
  const ase = new Date();
  const hour = ase.getHours();
  let timeOfDay;
  
  switch(hour){
    case 0: timeOfDay = 'una linda noche 🌙'; break;
    case 1: timeOfDay = 'una linda noche 💤'; break;
    case 2: timeOfDay = 'una linda noche 🦉'; break;
    case 3: timeOfDay = 'una linda mañana ✨'; break;
    case 4: timeOfDay = 'una linda mañana 💫'; break;
    case 5: timeOfDay = 'una linda mañana 🌅'; break;
    case 6: timeOfDay = 'una linda mañana 🌄'; break;
    case 7: timeOfDay = 'una linda mañana 🌅'; break;
    case 8: timeOfDay = 'una linda mañana 💫'; break;
    case 9: timeOfDay = 'una linda mañana ✨'; break;
    case 10: timeOfDay = 'un lindo dia 🌞'; break;
    case 11: timeOfDay = 'un lindo dia 🌨'; break;
    case 12: timeOfDay = 'un lindo dia ❄'; break;
    case 13: timeOfDay = 'un lindo dia 🌤'; break;
    case 14: timeOfDay = 'una linda tarde 🌇'; break;
    case 15: timeOfDay = 'una linda tarde 🥀'; break;
    case 16: timeOfDay = 'una linda tarde 🌹'; break;
    case 17: timeOfDay = 'una linda tarde 🌆'; break;
    case 18: timeOfDay = 'una linda noche 🌙'; break;
    case 19: timeOfDay = 'una linda noche 🌃'; break;
    case 20: timeOfDay = 'una linda noche 🌌'; break;
    case 21: timeOfDay = 'una linda noche 🌃'; break;
    case 22: timeOfDay = 'una linda noche 🌙'; break;
    case 23: timeOfDay = 'una linda noche 🌃'; break;
    default: timeOfDay = 'un lindo día'; break;
  }
  
  return "espero que tengas " + timeOfDay;
}

let handler = async (m, { conn, usedPrefix: _p, __dirname }) => {
  try {
    let _package = JSON.parse(await promises.readFile(join(__dirname, '../package.json')).catch(_ => ({}))) || {}
    let { exp, limit, level } = global.db.data.users[m.sender]
    let { min, xp, max } = xpRange(level, global.multiplier)
    let name = await conn.getName(m.sender)
    let d = new Date(new Date + 3600000)
    let locale = 'es'
    let weton = ['Pahing', 'Pon', 'Wage', 'Kliwon', 'Legi'][Math.floor(d / 84600000) % 5]
    let week = d.toLocaleDateString(locale, { weekday: 'long' })
    let date = d.toLocaleDateString(locale, {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    })
    let dateIslamic = Intl.DateTimeFormat(locale + '-TN-u-ca-islamic', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    }).format(d)
    let time = d.toLocaleTimeString(locale, {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
    })
    let _uptime = process.uptime() * 1000
    let _muptime
    if (process.send) {
      process.send('uptime')
      _muptime = await new Promise(resolve => {
        process.once('message', resolve)
        setTimeout(resolve, 1000)
      }) * 1000
    }
    let muptime = clockString(_muptime)
    let uptime = clockString(_uptime)
    let totalreg = Object.keys(global.db.data.users).length
    let rtotalreg = Object.values(global.db.data.users).filter(user => user.registered == true).length
    
    // Obtener el saludo
    let greeting = getGreeting()
    
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.help) ? plugin.help : [plugin.help],
        tags: Array.isArray(plugin.tags) ? plugin.tags : [plugin.tags],
        prefix: 'customPrefix' in plugin,
        limit: plugin.limit,
        premium: plugin.premium,
        enabled: !plugin.disabled,
      }
    })
    
    for (let plugin of help)
      if (plugin && 'tags' in plugin)
        for (let tag of plugin.tags)
          if (!(tag in tags) && tag) tags[tag] = tag
    
    conn.menu = conn.menu ? conn.menu : {}
    let before = conn.menu.before || defaultMenu.before
    let header = conn.menu.header || defaultMenu.header
    let body = conn.menu.body || defaultMenu.body
    let footer = conn.menu.footer || defaultMenu.footer
    let after = conn.menu.after || (conn.user.jid == global.conn.user.jid ? '' : ``) + defaultMenu.after
    
    let _text = [
      before,
      ...Object.keys(tags).map(tag => {
        return header.replace(/%category/g, tags[tag]) + '\n' + [
          ...help.filter(menu => menu.tags && menu.tags.includes(tag) && menu.help).map(menu => {
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
    
    let text = typeof conn.menu == 'string' ? conn.menu : typeof conn.menu == 'object' ? _text : ''
    let replace = {
      '%': '%',
      p: _p, 
      uptime, 
      muptime,
      taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
      wasp: '@0',
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      version: _package.version,
      npmdesc: _package.description,
      npmmain: _package.main,
      author: _package.author?.name || 'Unknown',
      license: _package.license,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      greeting, 
      level, 
      limit, 
      name, 
      weton, 
      week, 
      date, 
      dateIslamic, 
      time, 
      totalreg, 
      rtotalreg,
      readmore: readMore
    }
    
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    // URLs de imágenes
    let imageUrls = [
      'https://telegra.ph/file/5e7042bf17cde23989e71.jpg',
      'https://telegra.ph/file/5e7042bf17cde23989e71.jpg',
      'https://telegra.ph/file/5e7042bf17cde23989e71.jpg',
      'https://telegra.ph/file/5e7042bf17cde23989e71.jpg',
      'https://telegra.ph/file/5e7042bf17cde23989e71.jpg'
    ]
    
    // Función para seleccionar aleatoriamente (si no existe getRandom)
    function getRandomElement(arr) {
      return arr[Math.floor(Math.random() * arr.length)]
    }
    
    let img = `./storage/img/menu.jpg`
    await m.react('💙')
    
    // Usar sendFile ya que está comentado el sendMessage con video
    await conn.sendFile(m.chat, img, 'thumbnail.jpg', text.trim(), m, null, rcanal)

  } catch (e) {
    console.error('Error en el menú:', e)
    conn.reply(m.chat, '❎ Lo sentimos, el menú tiene un error.', m)
    throw e
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
