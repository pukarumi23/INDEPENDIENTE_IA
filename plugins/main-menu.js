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

"Hola *${taguser}* soy *Hatsune Miku*, ${saludo}"
`

    let botInfo = `
.╭─ׅ─ׅ┈ ❊ 🔆⃘̸࣭ٜ🔥۬۫◌⃘⃪𝅥ꗃꗃ⃪⃘𝅥◌۬۫🔥̸⃘ٜ࣭🔶 ❊ ─ׅ─ׅ┈ ╮
╭╼🔆 ⭑࣪ꥈ𑁍۪𖥔𖥔 🄸🄽🄳🄴🄿🄴🄽🄳🄸🄴🄽🅃🄴 𖥔𖥔𑁍ꥈ࣪⭑ 🔶╾╮
┃   ╰─ׅ─ׅ┈ ❊ 🔶⃘̸࣭ٜ🔥⃪⃘𝅥𐇽ꗃꗃ⃪⃘𝅥🔆 ❊ ─ׅ─ׅ┈ ╯
├ׁ̟̇❍✎ *🅅ᴏᴄᴀʟᴏɪᴅ:* INDEPENDIENTE
├ׁ̟̇❍✎ *Creador:* DEPOOL
├ׁ̟̇❍✎ *🄼ᴏᴅᴏ:* Digital
├ׁ̟̇❍✎ *🄻ɪʙʀᴇʀɪᴀ:* Crypton
├ׁ̟̇❍✎ *🄱ᴏᴛ:* ${conn.user.jid == global.conn.user.jid ? 'Principal' : 'MikuBot'}
├ׁ̟̇❍✎ *🅃ɪᴇᴍᴘᴏ ᴀᴄᴛɪᴠᴏ:* ${uptime}
├ׁ̟̇❍✎ *🅄sᴜᴀʀɪᴏs:* ${totalreg}
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝
*─ׄ─ׄ─⭒─ׄ─ׅ─ׄ⭒─ׄ─ׄ─⭒─ׄ─ׄ─⭒─ׄ─ׅ─*

        *L I S T A  -  D E  -  C O M A N D O S* 

.    ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯
├ׁ̟̇❍✎ .estado
├ׁ̟̇❍✎ .host
├ׁ̟̇❍✎ .hosting
├ׁ̟̇❍✎ .botreglas
├ׁ̟̇❍✎ .hornymenu
├ׁ̟̇❍✎ .menu
├ׁ̟̇❍✎ .menu2
├ׁ̟̇❍✎ .runtime
├ׁ̟̇❍✎ .script
├ׁ̟̇❍✎ .staff
├ׁ̟̇❍✎ .menulista
├ׁ̟̇❍✎ .blocklist
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.    ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .githubsearch
├ׁ̟̇❍✎ .google <búsqueda>
├ׁ̟̇❍✎ .mercadolibre <búsqueda>
├ׁ̟̇❍✎ .imagen <query>
├ׁ̟̇❍✎ .pinterest
├ׁ̟̇❍✎ .tiktoksearch <txt>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.   ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .69 @tag
├ׁ̟̇❍✎ .abrazar <@usuario>
├ׁ̟̇❍✎ .acertijo
├ׁ̟̇❍✎ .agarrar @tag
├ׁ̟̇❍✎ .anal @tag
├ׁ̟̇❍✎ .sonrojarse @tag
├ׁ̟̇❍✎ .gay <@tag> | <nombre>
├ׁ̟̇❍✎ .lesbiana <@tag> | <nombre>
├ׁ̟̇❍✎ .pajero <@tag> | <nombre>
├ׁ̟̇❍✎ .pajera <@tag> | <nombre>
├ׁ̟̇❍✎ .puto <@tag> | <nombre>
├ׁ̟̇❍✎ .puta <@tag> | <nombre>
├ׁ̟̇❍✎ .manco <@tag> | <nombre>
├ׁ̟̇❍✎ .manca <@tag> | <nombre>
├ׁ̟̇❍✎ .rata <@tag> | <nombre>
├ׁ̟̇❍✎ .prostituta <@tag> | <nombre>
├ׁ̟̇❍✎ .prostituto <@tag> | <nombre>
├ׁ̟̇❍✎ .apostar *<cantidad>*
├ׁ̟̇❍✎ .chupartetas @tag
├ׁ̟̇❍✎ .consejo
├ׁ̟̇❍✎ .cum @tag
├ׁ̟̇❍✎ .dance *<@user>*
├ׁ̟̇❍✎ .formarpareja5
├ׁ̟̇❍✎ .abrazar @tag
├ׁ̟̇❍✎ .violar @tag
├ׁ̟̇❍✎ .dormir @tag
├ׁ̟̇❍✎ .lamber @tag
├ׁ̟̇❍✎ .enamorada @tag
├ׁ̟̇❍✎ .mamada @tag
├ׁ̟̇❍✎ .meme
├ׁ̟̇❍✎ .violar @tag
├ׁ̟̇❍✎ .nombreninja *<texto>*
├ׁ̟̇❍✎ .acariciar @tag
├ׁ̟̇❍✎ .penetrar @user
├ׁ̟̇❍✎ .personalidad
├ׁ̟̇❍✎ .piropo
├ׁ̟̇❍✎ .pokedex *<pokemon>*
├ׁ̟̇❍✎ .pucheros @tag
├ׁ̟̇❍✎ .pregunta
├ׁ̟̇❍✎ .golpear @tag
├ׁ̟̇❍✎ .reto
├ׁ̟̇❍✎ .ruleta *<cantidad> <color>*
├ׁ̟̇❍✎ .rusa @tag
├ׁ̟̇❍✎ .triste @tag
├ׁ̟̇❍✎ .scared @tag
├ׁ̟̇❍✎ .sexo @tag
├ׁ̟̇❍✎ .ship
├ׁ̟̇❍✎ .love
├ׁ̟̇❍✎ .timida @tag
├ׁ̟̇❍✎ .simi
├ׁ̟̇❍✎ .bot
├ׁ̟̇❍✎ .dormir @tag
├ׁ̟̇❍✎ .dormir @tag
├ׁ̟̇❍✎ .top *<texto>*
├ׁ̟̇❍✎ .violar @tag
├ׁ̟̇❍✎ .tijeras @tag
├ׁ̟̇❍✎ .zodiac *2002 02 25*
├ׁ̟̇❍✎ .cancion
├ׁ̟̇❍✎ .math <mode>
├ׁ̟̇❍✎ .ppt
├ׁ̟̇❍✎ .slot <apuesta>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.    ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .character
├ׁ̟̇❍✎ .confirmar
├ׁ̟̇❍✎ .darrw @usuario <personaje>
├ׁ̟̇❍✎ .guardar <personaje>
├ׁ̟̇❍✎ .sacar <personaje>
├ׁ̟̇❍✎ .obtenidos
├ׁ̟̇❍✎ .robarpersonaje
├ׁ̟̇❍✎ .roll
├ׁ̟̇❍✎ .toprw
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.   ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .jadibot
├ׁ̟̇❍✎ .serbot
├ׁ̟̇❍✎ .bots
├ׁ̟̇❍✎ .deletebot
├ׁ̟̇❍✎ .pausarai
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.    ╭─ׅ─ׅ┈ ─๋︩︪─☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬🔥⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼☁️⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ ×🅁×🄿×🄶× ໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪☁️
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─☪︎︎︎̸⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬🔥⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪࣪࣪۬☪︎︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯
├ׁ̟̇❍✎ .bank
├ׁ̟̇❍✎ .cookies
├ׁ̟̇❍✎ .crimen
├ׁ̟̇❍✎ .daily
├ׁ̟̇❍✎ .claim
├ׁ̟̇❍✎ .depositar
├ׁ̟̇❍✎ .lb
├ׁ̟̇❍✎ .levelup
├ׁ̟̇❍✎ .minar
├ׁ̟̇❍✎ .retirar
├ׁ̟̇❍✎ .rob2
├ׁ̟̇❍✎ .rob
├ׁ̟̇❍✎ .addprem [@user] <days>
├ׁ̟̇❍✎ .slut
├ׁ̟̇❍✎ .trabajar
├ׁ̟̇❍✎ .transfer [tipo] [cantidad] [@tag]
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.    ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .profile
├ׁ̟̇❍✎ .unreg
├ׁ̟̇❍✎ .reg
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.     ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .bal
├ׁ̟̇❍✎ .daily
├ׁ̟̇❍✎ .Buy
├ׁ̟̇❍✎ .Buyall
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.     ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .toimg (reply)
├ׁ̟̇❍✎ .qc
├ׁ̟̇❍✎ .stiker <img>
├ׁ̟̇❍✎ .sticker <url>
├ׁ̟̇❍✎ .wm <packname>|<author>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.    ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .animelink
├ׁ̟̇❍✎ .akira
├ׁ̟̇❍✎ .akiyama
├ׁ̟̇❍✎ .anna
├ׁ̟̇❍✎ .asuna
├ׁ̟̇❍✎ .ayuzawa
├ׁ̟̇❍✎ .boruto
├ׁ̟̇❍✎ .chiho
├ׁ̟̇❍✎ .chitoge
├ׁ̟̇❍✎ .deidara
├ׁ̟̇❍✎ .erza
├ׁ̟̇❍✎ .elaina
├ׁ̟̇❍✎ .eba
├ׁ̟̇❍✎ .emilia
├ׁ̟̇❍✎ .hestia
├ׁ̟̇❍✎ .hinata
├ׁ̟̇❍✎ .inori
├ׁ̟̇❍✎ .isuzu
├ׁ̟̇❍✎ .itachi
├ׁ̟̇❍✎ .itori
├ׁ̟̇❍✎ .kaga
├ׁ̟̇❍✎ .kagura
├ׁ̟̇❍✎ .kaori
├ׁ̟̇❍✎ .keneki
├ׁ̟̇❍✎ .kotori
├ׁ̟̇❍✎ .kurumi
├ׁ̟̇❍✎ .madara
├ׁ̟̇❍✎ .mikasa
├ׁ̟̇❍✎ .miku
├ׁ̟̇❍✎ .minato
├ׁ̟̇❍✎ .naruto
├ׁ̟̇❍✎ .nezuko
├ׁ̟̇❍✎ .sagiri
├ׁ̟̇❍✎ .sasuke
├ׁ̟̇❍✎ .sakura
├ׁ̟̇❍✎ .cosplay
├ׁ̟̇❍✎ .infoanime
├ׁ̟̇❍✎ .lolice
├ׁ̟̇❍✎ .waifu
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.      ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .delvn <text>
├ׁ̟̇❍✎ .delmsg <text>
├ׁ̟̇❍✎ .delimg <text>
├ׁ̟̇❍✎ .delsticker <text>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.      ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .dsowner
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.    ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .group abrir / cerrar
├ׁ̟̇❍✎ .delete
├ׁ̟̇❍✎ .setppgroup
├ׁ̟̇❍✎ .rentar2
├ׁ̟̇❍✎ .setwelcome
├ׁ̟̇❍✎ .demote
├ׁ̟̇❍✎ .encuesta <text|text2>
├ׁ̟̇❍✎ .hidetag
├ׁ̟̇❍✎ .infogrupo
├ׁ̟̇❍✎ .invite *<numero>*
├ׁ̟̇❍✎ .kick
├ׁ̟̇❍✎ .link
├ׁ̟̇❍✎ .promote
├ׁ̟̇❍✎ .rentar
├ׁ̟̇❍✎ .tagall *<mesaje>*
├ׁ̟̇❍✎ .invocar *<mesaje>*
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.     ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .enable <option>
├ׁ̟̇❍✎ .disable <option>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.     ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .facebook
├ׁ̟̇❍✎ .fb
├ׁ̟̇❍✎ .play
├ׁ̟̇❍✎ .playvid
├ׁ̟̇❍✎ .gitclone *<url git>*
├ׁ̟̇❍✎ .instagram
├ׁ̟̇❍✎ .ig
├ׁ̟̇❍✎ .imagen <query>
├ׁ̟̇❍✎ .mediafire <url>
├ׁ̟̇❍✎ .apkmod
├ׁ̟̇❍✎ .ytmp3doc
├ׁ̟̇❍✎ .ytmp4doc
├ׁ̟̇❍✎ .spotify
├ׁ̟̇❍✎ .tiktok
├ׁ̟̇❍✎ .tw
├ׁ̟̇❍✎ .ytmp4 *<url youtube>*
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.   ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .toanime
├ׁ̟̇❍✎ .tts <lang> <teks>
├ׁ̟̇❍✎ .imagen <query>
├ׁ̟̇❍✎ .remini
├ׁ̟̇❍✎ .hd
├ׁ̟̇❍✎ .enhance
├ׁ̟̇❍✎ .nuevafotochannel
├ׁ̟̇❍✎ .nosilenciarcanal
├ׁ̟̇❍✎ .silenciarcanal
├ׁ̟̇❍✎ .noseguircanal
├ׁ̟̇❍✎ .seguircanal
├ׁ̟̇❍✎ .avisoschannel
├ׁ̟̇❍✎ .resiviravisos
├ׁ̟̇❍✎ .inspect
├ׁ̟̇❍✎ .inspeccionar
├ׁ̟̇❍✎ .eliminarfotochannel
├ׁ̟̇❍✎ .reactioneschannel
├ׁ̟̇❍✎ .reaccioneschannel
├ׁ̟̇❍✎ .nuevonombrecanal
├ׁ̟̇❍✎ .nuevadescchannel
├ׁ̟̇❍✎ .readvo
├ׁ̟̇❍✎ .infobot
├ׁ̟̇❍✎ .speed
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.   ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .creador
├ׁ̟̇❍✎ .owner
├ׁ̟̇❍✎ .dash
├ׁ̟̇❍✎ .dashboard
├ׁ̟̇❍✎ .views
├ׁ̟̇❍✎ .database
├ׁ̟̇❍✎ .usuarios
├ׁ̟̇❍✎ .user
├ׁ̟̇❍✎ .ds
├ׁ̟̇❍✎ .fixmsgespera
├ׁ̟̇❍✎ .infobot
├ׁ̟̇❍✎ .speed
├ׁ̟̇❍✎ .ping
├ׁ̟̇❍✎ .sistema
├ׁ̟̇❍✎ .speed
├ׁ̟̇❍✎ .speedtest
├ׁ̟̇❍✎ .groups
├ׁ̟̇❍✎ .grouplist
├ׁ̟̇❍✎ .reportar
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.     ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .nsfwloli
├ׁ̟̇❍✎ .nsfwfoot
├ׁ̟̇❍✎ .nsfwass
├ׁ̟̇❍✎ .nsfwbdsm
├ׁ̟̇❍✎ .nsfwcum
├ׁ̟̇❍✎ .nsfwero
├ׁ̟̇❍✎ .nsfwfemdom
├ׁ̟̇❍✎ .nsfwfoot
├ׁ̟̇❍✎ .nsfwglass
├ׁ̟̇❍✎ .nsfworgy
├ׁ̟̇❍✎ .yuri
├ׁ̟̇❍✎ .yuri2
├ׁ̟̇❍✎ .yaoi
├ׁ̟̇❍✎ .yaoi2
├ׁ̟̇❍✎ .panties
├ׁ̟̇❍✎ .tetas
├ׁ̟̇❍✎ .booty
├ׁ̟̇❍✎ .ecchi
├ׁ̟̇❍✎ .furro
├ׁ̟̇❍✎ .hentai
├ׁ̟̇❍✎ .trapito
├ׁ̟̇❍✎ .imagenlesbians
├ׁ̟̇❍✎ .pene
├ׁ̟̇❍✎ .porno
├ׁ̟̇❍✎ .randomxxx
├ׁ̟̇❍✎ .pechos
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.     ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .enable <option>
├ׁ̟̇❍✎ .disable <option>
├ׁ̟̇❍✎ .addprem [@user] <days>
├ׁ̟̇❍✎ >
├ׁ̟̇❍✎ =>
├ׁ̟̇❍✎ .copia
├ׁ̟̇❍✎ .broadcastgroup <teks>
├ׁ̟̇❍✎ .bcgc <teks>
├ׁ̟̇❍✎ .bcgc2
├ׁ̟̇❍✎ .broadcast <teks>
├ׁ̟̇❍✎ .bc <teks>
├ׁ̟̇❍✎ .cheat
├ׁ̟̇❍✎ .cleartmp
├ׁ̟̇❍✎ .delprem <@user>
├ׁ̟̇❍✎ .dsowner
├ׁ̟̇❍✎ $
├ׁ̟̇❍✎ .fetch
├ׁ̟̇❍✎ .get
├ׁ̟̇❍✎ .getplugin *<nombre>*
├ׁ̟̇❍✎ .nuevabiobot <teks>
├ׁ̟̇❍✎ .nuevafotobot *<imagen>*
├ׁ̟̇❍✎ .nuevonombrebot <teks>
├ׁ̟̇❍✎ .prefix [prefix]
├ׁ̟̇❍✎ .resetprefix
├ׁ̟̇❍✎ .restart
├ׁ̟̇❍✎ .saveplugin nombre
├ׁ̟̇❍✎ .update
├ׁ̟̇❍✎ .actualizar
├ׁ̟̇❍✎ >
├ׁ̟̇❍✎ =>
├ׁ̟̇❍✎ .resetpersonajes
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.      ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯   
├ׁ̟̇❍✎ .autoadmin
├ׁ̟̇❍✎ .banchat
├ׁ̟̇❍✎ .banuser <@tag> <razón>
├ׁ̟̇❍✎ .grupocrear <nombre>
├ׁ̟̇❍✎ .ip <alamat ip>
├ׁ̟̇❍✎ .join <link>
├ׁ̟̇❍✎ .unbanchat
├ׁ̟̇❍✎ .unbanuser <@tag>
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.    ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯  
├ׁ̟̇❍✎ .bass [vn]
├ׁ̟̇❍✎ .blown [vn]
├ׁ̟̇❍✎ .deep [vn]
├ׁ̟̇❍✎ .earrape [vn]
├ׁ̟̇❍✎ .fast [vn]
├ׁ̟̇❍✎ .fat [vn]
├ׁ̟̇❍✎ .nightcore [vn]
├ׁ̟̇❍✎ .reverse [vn]
├ׁ̟̇❍✎ .robot [vn]
├ׁ̟̇❍✎ .slow [vn]
├ׁ̟̇❍✎ .smooth [vn]
├ׁ̟̇❍✎ .tupai [vn]
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.    ╭  ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯
├ׁ̟̇❍✎ .bard
├ׁ̟̇❍✎ .chatgpt <texto>
├ׁ̟̇❍✎ .ia <texto>
├ׁ̟̇❍✎ .dalle
├ׁ̟̇❍✎ .remini
╚▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬ִ▭࣪▬▭╝

.     ╭─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘⃪۪֟፝֯۫۫۫۬◌⃘࣭ٜ࣪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╮
╭╼🎧⬪࣪ꥈ𑁍⃪࣭۪ٜ݊݊݊݊݊໑ٜ࣪ 🄼🄸🄺🅄-🄱🄾🅃໑⃪࣭۪ٜ݊݊݊݊𑁍ꥈ࣪⬪🎧
┃֪࣪  ╰─ׅ─ׅ┈ ─๋︩︪─🎵⃘̸࣭ٜ࣪࣪࣪۬◌⃘۪֟፝֯۫۫︎⃪𐇽۫۬💙⃘⃪۪🎵︎︎︎̸─ׅ─ׅ┈ ─๋︩︪─╯
├ׁ̟̇❍✎ .togifaud
├ׁ̟̇❍✎ .tourl
├ׁ̟̇❍✎ .tovideo
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
