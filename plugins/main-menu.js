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
    
   
    let perfil = await conn.profilePictureUrl(m.sender, 'image').catch(_ => 'https://telegra.ph/file/5e7042bf17cde23989e71.jpg')
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
█✹➤ .tweetpost <busqueda>
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
█✹➤ .darcebollines @user <cantidad>
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
█✹➤ .emojimix <emoji+emoji>
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
█✹➤ .qc
█✹➤ .stiker <img>
█✹➤.sticker <url>
█✹➤ .wm <packname>|<author>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋ 
█✹➤ .delvn <text>
█✹➤ .delmsg <text>
█✹➤ .delimg <text>
█✹➤ .delsticker <text>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋
█✹➤ .dsowner
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋   
█✹➤ .group abrir / cerrar
█✹➤ .delete
█✹➤ .setppgroup
█✹➤ .rentar2
█✹➤ .setwelcome
█✹➤ .demote
█✹➤ .encuesta <text|text2>
█✹➤ .hidetag
█✹➤ .infogrupo
█✹➤ .invite *<numero>*
█✹➤ .kick
█✹➤ .link
█✹➤ .promote
█✹➤ .rentar
█✹➤ .tagall *<mesaje>*
█✹➤ .invocar *<mesaje>*
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋   
█✹➤ .enable <option>
█✹➤ .disable <option>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋   
█✹➤ .facebook
█✹➤ .fb
█✹➤ .play
█✹➤ .playvid
█✹➤ .gitclone *<url git>*
█✹➤ .instagram
█✹➤ .ig
█✹➤ .imagen <query>
█✹➤ .mediafire <url>
█✹➤ .apkmod
█✹➤ .ytmp3doc
█✹➤ .ytmp4doc
█✹➤ .spotify
█✹➤ .tiktok
█✹➤ .tw
█✹➤ .ytmp4 *<url youtube>*
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋   
█✹➤ .toanime
█✹➤ .tts <lang> <teks>
█✹➤ .imagen <query>
█✹➤ .remini
█✹➤ .hd
█✹➤ .enhance
█✹➤ .nuevafotochannel
█✹➤ .nosilenciarcanal
█✹➤ .silenciarcanal
█✹➤ .noseguircanal
█✹➤ .seguircanal
█✹➤ .avisoschannel
█✹➤ .resiviravisos
█✹➤ .inspect
█✹➤ .inspeccionar
█✹➤ .eliminarfotochannel
█✹➤ .reactioneschannel
█✹➤ .reaccioneschannel
█✹➤ .nuevonombrecanal
█✹➤ .nuevadescchannel
█✹➤ .readvo
█✹➤ .infobot
█✹➤ .speed
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋
█✹➤ .creador
█✹➤ .owner
█✹➤ .dash
█✹➤ .dashboard
█✹➤ .views
█✹➤ .database
█✹➤ .usuarios
█✹➤ .user
█✹➤ .ds
█✹➤ .fixmsgespera
█✹➤ .infobot
█✹➤ .speed
█✹➤ .ping
█✹➤ .sistema
█✹➤ .speed
█✹➤ .speedtest
█✹➤ .groups
█✹➤ .grouplist
█✹➤ .reportar
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋  
█✹➤ .enable <option>
█✹➤ .disable <option>
█✹➤ .addprem [@user] <days>
█✹➤ >
█✹➤ =>
█✹➤ .copia
█✹➤ .broadcastgroup <teks>
█✹➤ .bcgc <teks>
█✹➤ .bcgc2
█✹➤ .broadcast <teks>
█✹➤ .bc <teks>
█✹➤ .cheat
█✹➤ .cleartmp
█✹➤ .delprem <@user>
█✹➤ .dsowner
█✹➤ $
█✹➤ .fetch
█✹➤ .get
█✹➤ .getplugin *<nombre>*
█✹➤ .nuevabiobot <teks>
█✹➤ .nuevafotobot *<imagen>*
█✹➤ .nuevonombrebot <teks>
█✹➤ .prefix [prefix]
█✹➤ .resetprefix
█✹➤ .restart
█✹➤ .saveplugin nombre
█✹➤ .update
█✹➤ .actualizar
█✹➤ .resetpersonajes
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋  
█✹➤ .autoadmin
█✹➤ .banchat
█✹➤ .banuser <@tag> <razón>
█✹➤ .join <link>
█✹➤ .unbanchat
█✹➤ .unbanuser <@tag>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

╭┈❊🔆⃘🔥۬۫◌⃘⃪◌۬۫🔥̸ٜ࣭🔶❊❊❊ׅ┈╮  
◈🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴◈       
.⌊…………………………………………………⌋
█✹➤ .chatgpt <texto>
█✹➤ .ia <texto>
█✹➤ .remini
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
          title: '💙Hatsune Miku💙',
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
