import fs from 'fs'
import fetch from 'node-fetch'
import { xpRange } from '../lib/levelling.js'

let handler = async (m, { conn, usedPrefix, __dirname }) => {
  try {
   
    let user = global.db.data.users[m.sender]
    let { exp, chocolates, level, role } = user
    let { min, xp, max } = xpRange(level, global.multiplier)
    
    
    let name = await conn.getName(m.sender)
    let taguser = '@' + m.sender.split("@s.whatsapp.net")[0]
    let uptime = clockString(process.uptime() * 1000)
    let totalreg = Object.keys(global.db.data.users).length
    
   
    let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1N2ysfAnHDOn09rUQY9Ma_WAZbeGJKbTpQg&s')
    const vid = [
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1N2ysfAnHDOn09rUQY9Ma_WAZbeGJKbTpQg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1N2ysfAnHDOn09rUQY9Ma_WAZbeGJKbTpQg&s',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ1N2ysfAnHDOn09rUQY9Ma_WAZbeGJKbTpQg&s'
    ]
    
   
    const saludo = getGreeting()
    const dev = 'CHASKI - Creador de independiente'
    const emojis = ['🔆', '🔶', '🔥']
    const error = '❌'
    const redes = 'https://github.com/pukarumi23'

  
    let menuHeader = `
ⅡⅡ∑☁︎｡⋆｡˚☽✧｡⋆｡˚☁︎｡⋆｡˚ⅡⅡⅡⅡ
Ⅱ🔥 𝕴ℕ𝖉𝖊𝖕𝖊𝖓𝖉𝖎𝖊𝖓𝖙𝖊_𝕭𝖔𝖙 🔥Ⅱ 
ⅡⅡ∑☁︎｡⋆｡˚☽✧｡⋆｡˚☁︎｡⋆｡˚ⅡⅡⅡⅡ  

"Hola *${taguser}* soy *INDEPENDIENTE*, ${saludo}"
`

    let botInfo = `
 ▰▰▰▰▰▰▰▰▰▰▰▰▰▰
■╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
■  🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴       
■╰┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╯  
▰▰▰▰▰▰▰▰▰▰▰▰▰▰
├ׁ̟̇❍⫸ *🅅ᴏᴄᴀʟᴏɪᴅ:*INDEPENDIENTE
├ׁ̟̇❍⫸ *Creador:* CHASKI
├ׁ̟̇❍⫸ *🄼ᴏᴅᴏ:* Digital
├ׁ̟̇❍⫸ *🄻ɪʙʀᴇʀɪᴀ:* Crypton
├ׁ̟̇❍⫸ *🄱ᴏᴛ:* ${conn.user.jid == global.conn.user.jid ? 'Principal' : 'INDEPENDIENTE_BOT'}
├ׁ̟̇❍⫸ *🅃ɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ:* ${uptime}
├ׁ̟̇❍⫸ *🅄sᴜᴀʀɪᴏs:* ${totalreg}
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝
*─ׄ─ׄ─⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ─⭒─ׄ─ׄ─⭒─ׄ─ׅ─*

*L I S T A - D E - C O M A N D O S* 

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋
█✹➤ .owner
█✹➤ .grupos
█✹➤ .info
█✹➤ .totalfunciones
█✹➤ .menu
█✹➤ .ping
█✹➤ .runtime
█✹➤ .script
█✹➤ .speedtest
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋
█✹➤ .tiktoksearch <txt>
█✹➤ .aptoidesearch <busqueda>
█✹➤ .spotifysearch <busqueda>
█✹➤ .ytsearch <busqueda>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋
█✹➤ .iqtest
█✹➤ .acertijo
█✹➤ .coinflip
█✹➤ .mates
█✹➤ .ppt
█✹➤ .ruleta <cantidad><color>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋  
█✹➤ .bank
█✹➤ .crimen
█✹➤ .darintis @user <cantidad>
█✹➤ .darxp @user <cantidad>
█✹➤ .depositar
█✹➤ .intis
█✹➤ .lb
█✹➤ .levelup
█✹➤ .minar
█✹➤ .retirar
█✹➤ .buycoins
█✹➤ .buyall
█✹➤ .work
█✹➤ .daily
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋
█✹➤ .sn
█✹➤ .perfil
█✹➤ .perfil @user
█✹➤ .reg <nombre.edad>
█✹➤ .unreg
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋ 
█✹➤ .quotly <texto>
█✹➤ .scat
█✹➤ .stiker
█✹➤ .wm <nombre>|<autor>
█✹➤ .wm2
█✹➤ .toimg <stiker>
█✹➤ .tovid <stiker>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋ 
█✹➤ .invocar
█✹➤ .antibot <on/off>
█✹➤ .banearbot 
█✹➤ .chekexpired
█✹➤ .delete
█✹➤ .demote @tag
█✹➤ .infogp
█✹➤ .invite <521>
█✹➤ .kick @user
█✹➤ .link
█✹➤ .encuesta <pregunta|opciones>
█✹➤ .promote .@user
█✹➤ .resetlink
█✹➤ .setppgo
█✹➤ .group abrir/cerrar
█✹➤ .tagall <mensaje>
█✹➤ .invocar <mensaje>
█✹➤ .tag
█✹➤ .desbanearbot
█✹➤ .otag
█✹➤ .getbio
█✹➤ .getbio @tag
█✹➤ .getname
█✹➤ .getname @tag
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋ 
█✹➤ .enable
█✹➤ .disable
█✹➤ .antiprivado <on/of>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋ 
█✹➤ .mediafire <url>
█✹➤ .ytdl <link yt>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋
█✹➤ .audio
█✹➤ .video
█✹➤ .aptoide <busqueda>
█✹➤ .danbooru <url>
█✹➤ .fb <link fb>
█✹➤ .gitclone <url git>
█✹➤ .instagram <link ig>
█✹➤ .likeedl <url>
█✹➤ .mediafire <url>
█✹➤ .pinterestdl <url pin>
█✹➤ .soundcloud <busqueda>
█✹➤ .spotify
█✹➤ .spotifydl
█✹➤ .tiktok <url tt>
█✹➤ .tiktokimg <url tt>
█✹➤ .tiktokuser <usuario>
█✹➤ .tiktokvid <busqueda>
█✹➤ .play <cancion>
█✹➤ .ytdl <link yt>
█✹➤ .ytmp3 <link yt>
█✹➤ .ytmp3doc <link yt>
█✹➤ .ytmp4 <link yt>
█✹➤ .ytmp4doc <link yt>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋   
█✹➤ .ai <texto>
█✹➤ .acordar <url>
█✹➤ .alfeñique <petición>
█✹➤ .blackbox <petición>
█✹➤ .cal <ecuación>
█✹➤ .chazam <audio/video>
█✹➤ .describe
█✹➤ .detectface
█✹➤ .fake <texto/@tag/texto>
█✹➤ .gemini <petición>
█✹➤ .remini <petion>
█✹➤ .getpp
█✹➤ .hd
█✹➤ .ibb
█✹➤ .igstalk <usuario>
█✹➤ .morse <encode|decode>
█✹➤ .qrcode <texto>
█✹➤ .rect <emoji>
█✹➤ .readmore <teks>|<teks>
█✹➤ .ver
█✹➤ .similarface
█✹➤ .ss <url>
█✹➤ .ssweb <url>
█✹➤ .style <texto>
█✹➤ .tamaño <cantidad>
█✹➤ .tiktokstalk <usuario>
█✹➤ .document <audio|video>
█✹➤ .togifaud
█✹➤ .toimg <stiker>
█✹➤ .tomp3
█✹➤ .tourl
█✹➤ .tovid <stiker>
█✹➤ .trad <leg> <texto>
█✹➤ .transcripyt <url>
█✹➤ .tts <texto>
█✹➤ .tweestalk <usuario>
█✹➤ .vcard @tag
█✹➤ .zodiac 2002 02 25
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋   
█✹➤ .afk <razón>
█✹➤ .dance <@user>
█✹➤ .meme
█✹➤ .memetk
█✹➤ .personalidad <nombre>
█✹➤ .pregunta <texto>
█✹➤ .reto
█✹➤ .simi
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋   
█✹➤ .delcmd <texto>
█✹➤ .listcmd
█✹➤ .setcmd <texto>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋   
█✹➤ .expiered <dias>
█✹➤ .addprem <@user>
█✹➤ .autoadmin
█✹➤ .banlist
█✹➤ .ban <@user>
█✹➤ .clearsession
█✹➤ .deletefile
█✹➤ .delexpired
█✹➤ .delprem <@user>
█✹➤ .getdb
█✹➤ .getsesion
█✹➤ .join <link><dias>
█✹➤ .resetuser <@user>
█✹➤ .restart
█✹➤ .salir
█✹➤ .savefile
█✹➤ .munban <@user>
█✹➤ .update
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋
█✹➤ .bass <mp3/vn>
█✹➤ .blown <mp3/vn>
█✹➤ .deep <mp3/vn>
█✹➤ .earrape <mp3/vn>
█✹➤ .fast <mp3/vn>
█✹➤ .fat <mp3/vn>
█✹➤ .nightcore <mp3/vn>
█✹➤ .reverse <mp3/vn>
█✹➤ .robot <mp3/vn>
█✹➤ .slow <mp3/vn>
█✹➤ .smooth <mp3/vn>
█✹➤ .tupai <mp3/vn>
█✹➤ .reberb <mp3/vn>
█✹➤ .chorus <mp3/vn>
█✹➤ .flanger <mp3/vn>
█✹➤ .distortion <mp3/vn>
█✹➤ .pitch <mp3/vn>
█✹➤ .highpass <mp3/vn>
█✹➤ .lowpass <mp3/vn>
█✹➤ .underwater <mp3/vn>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝
`

    let menuFooter = `> ${dev}`

 
    let menu = menuHeader + botInfo + menuFooter

   
    await conn.sendMessage(m.chat, { 
      image: { url: vid[Math.floor(Math.random() * vid.length)] }, 
      caption: menu.trim(),
      contextInfo: { 
        mentionedJid: [m.sender],
        externalAdReply: { 
          title: '🔶𝕴ℕ𝖉𝖊𝖕𝖊𝖓𝖉𝖎𝖊𝖓𝖙𝖊_𝕭𝖔𝖙 ',
          body: dev,
          thumbnailUrl: perfil,
          sourceUrl: redes
        }
      }
    })

    await m.react(emojis[Math.floor(Math.random() * emojis.length)])

  } catch (e) {
    console.error(e)
    await m.reply(`✘ Ocurrió un error al enviar el menú\n\n${e.message}`)
    await m.react('❌')
  }
}


function getGreeting() {
  const hour = new Date().getHours()
  return hour < 12 ? 'Buenos días' : hour < 18 ? 'Buenas tardes' : 'Buenas noches'
}


function clockString(ms) {
  let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000)
  let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60
  let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60
  return [h, m, s].map(v => v.toString().padStart(2, 0)).join(':')
}

handler.help = ['menu']
handler.tags = ['main']
handler.command = ['menu', 'help', 'menú', 'allmenú', 'allmenu', 'menucompleto']
handler.register = true

export default handler
