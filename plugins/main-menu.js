import { promises } from 'fs'
import { join } from 'path'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let tags = {
  'main': '■ Information ■',
  'search': '■ Search ■',
  'game': '■ Games ■',
  'serbot': '■ Sub-Bots ■',
  'rpg': '■ Rpg ■',
  'rg': '■ Registro ■',
  'sticker': '■ Sticker ■',
  'img': '■ Image ■',
  'group': '■ Groups ■',
  'nable': '■ On/Off ■', 
  'premium': '■ Premium ■',
  'downloader': '■ Download ■',
  'tools': '■ Tools ■',
  'fun': '■ Fun ■',
  'nsfw': '■ Nsfw ■', 
  'cmd': '■ Database ■',
  'owner': '■ Creador ■', 
  'audio': '■ Audios ■', 
  'advanced': '■ Avanzado ■',
}

const defaultMenu = {
  before: `
▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰

⫸⫸ *¡SALUDOS OSCUROS, %name!* ⫷⫷
⫸ *Soy %me, tu guía en las sombras* 🔮

■ *Estado del Bot* ■
⫸ 🔶 *Modo:* Público
⫸ 🔥 *Versión:* Multi-Device
⫸ ■ *Uptime:* %muptime
⫸ 🔆 *Usuarios:* %totalreg

▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰▰
%readmore
■□■□■□■□■ *MENÚ GÓTICO* □■□■□■□■□■
`.trimStart(),
  header: '▣▣▣▣▣▣▣【 %category 】▣▣▣▣▣▣▣\n',
  body: '⫸ 🔶 %cmd %islimit %isPremium\n',
  footer: '▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣▣\n',
  after: `> 🔮 ${textbot}`,
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
    let help = Object.values(global.plugins).filter(plugin => !plugin.disabled).map(plugin => {
      return {
        help: Array.isArray(plugin.tags) ? plugin.help : [plugin.help],
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
                .replace(/%islimit/g, menu.limit ? '■🔶■' : '')
                .replace(/%isPremium/g, menu.premium ? '■🔆■' : '')
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
      p: _p, uptime, muptime,
      taguser: '@' + m.sender.split("@s.whatsapp.net")[0],
      wasp: '@0',
      me: conn.getName(conn.user.jid),
      npmname: _package.name,
      version: _package.version,
      npmdesc: _package.description,
      npmmain: _package.main,
      author: _package.author.name,
      license: _package.license,
      exp: exp - min,
      maxexp: xp,
      totalexp: exp,
      xp4levelup: max - exp,
      github: _package.homepage ? _package.homepage.url || _package.homepage : '[unknown github url]',
      greeting, level, limit, name, weton, week, date, dateIslamic, time, totalreg, rtotalreg,
      readmore: readMore
    }
    text = text.replace(new RegExp(`%(${Object.keys(replace).sort((a, b) => b.length - a.length).join`|`})`, 'g'), (_, name) => '' + replace[name])
    
    let pp = 'https://i.imgur.com/g5QZJ4E.jpg' // Gothic-themed image
    let img = `./storage/img/gothic_menu.jpg`
    await m.react('🔮')
    await conn.sendFile(m.chat, img, 'gothic.jpg', text.trim(), m, null, rcanal)

  } catch (e) {
    conn.reply(m.chat, '■ *Error en las sombras* ■', m)
    throw e
  }
}

handler.help = ['menu', 'menúgótico']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'gothicmenu'] 
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

var ase = new Date();
var hour = ase.getHours();
switch(hour){
  case 0: hour = 'una noche de sombras eternas 🌑'; break;
  case 1: hour = 'la hora del vampiro 🦇'; break;
  case 2: hour = 'la hora del lobo 🐺'; break;
  case 3: hour = 'el alba de los condenados 🌘'; break;
  case 4: hour = 'el amanecer oscuro 🌒'; break;
  case 5: hour = 'la hora del espectro 👻'; break;
  case 6: hour = 'el despertar de las brujas 🔮'; break;
  case 7: hour = 'el alba sangrienta 🌅'; break;
  case 8: hour = 'la mañana oscura ☁'; break;
  case 9: hour = 'la hora del cuervo 🐦⬛'; break;
  case 10: hour = 'el día de los muertos 💀'; break;
  case 11: hour = 'la hora del aquelarre ⚡'; break;
  case 12: hour = 'el mediodía sombrío ☠'; break;
  case 13: hour = 'la hora del eclipse 🌑'; break;
  case 14: hour = 'la tarde de los condenados 🕯'; break;
  case 15: hour = 'la hora del fantasma 👻'; break;
  case 16: hour = 'el ocaso de las brujas 🧙'; break;
  case 17: hour = 'la hora del murciélago 🦇'; break;
  case 18: hour = 'el anochecer eterno 🌘'; break;
  case 19: hour = 'la noche de los muertos vivientes 🧟'; break;
  case 20: hour = 'la hora del cuervo nocturno 🐦⬛'; break;
  case 21: hour = 'la medianoche de las almas 🌑'; break;
  case 22: hour = 'la hora del demonio 😈'; break;
  case 23: hour = 'la hora del pacto oscuro ⚰'; break;
}
var greeting = "Que tengas " + hour;
