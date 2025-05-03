import { cpus as _cpus, totalmem, freemem, platform } from 'os'
import speed from 'performance-now'
import { performance } from 'perf_hooks'
import { sizeFormatter } from 'human-readable'
import ws from 'ws'

let format = sizeFormatter({
    std: 'JEDEC',
    decimalPlaces: 2,
    keepTrailingZeroes: false,
    render: (literal, symbol) => `${literal} ${symbol}B`,
})

let handler = async (m, { conn, usedPrefix, textbot }) => {
   let uniqueUsers = new Map()

   global.conns?.forEach((conn) => {
     if (conn?.user?.jid && conn?.ws?.socket?.readyState !== ws.CLOSED) {
       uniqueUsers.set(conn.user.jid, conn)
     }
   })
   
   let users = [...uniqueUsers.values()]
   let totalUsers = users.length
   let totalreg = Object.keys(global.db.data?.users || {}).length
   let totalbots = Object.keys(global.db.data?.settings || {}).length
   let totalStats = Object.values(global.db.data?.stats || {}).reduce((total, stat) => total + (stat?.total || 0), 0)
   const chats = Object.entries(conn.chats || {}).filter(([id, data]) => id && data?.isChats)
   let totalchats = Object.keys(global.db.data?.chats || {}).length
   let totalf = Object.values(global.plugins || {}).filter(
    (v) => v.help && v.tags
  ).length
   
   const groupsIn = chats.filter(([id]) => id.endsWith('@g.us'))
   const used = process.memoryUsage()
   const cpus = _cpus().map(cpu => {
      cpu.total = Object.keys(cpu.times).reduce((last, type) => last + cpu.times[type], 0)
      return cpu
   })
   
   const cpu = cpus.reduce((last, cpu, _, { length }) => {
      last.total += cpu.total
      last.speed += cpu.speed / length
      last.times.user += cpu.times.user
      last.times.nice += cpu.times.nice
      last.times.sys += cpu.times.sys
      last.times.idle += cpu.times.idle
      last.times.irq += cpu.times.irq
      return last
   }, {
      speed: 0,
      total: 0,
      times: {
         user: 0,
         nice: 0,
         sys: 0,
         idle: 0,
         irq: 0
      }
   })
   
   let _muptime
   if (process.send) {
     process.send('uptime')
     _muptime = await new Promise(resolve => {
       process.once('message', resolve)
       setTimeout(resolve, 1000)
     }) * 1000
   }
   
   let muptime = clockString(_muptime)
   let timestamp = speed()
   let latensi = speed() - timestamp
   
   let txt = '`*⭒─ׄ─ׅ─ׄ─⭒ Info Bot ⭒─ׄ─ׅ─ׄ─⭒*`\n\n'
   txt += `╭── ︿︿︿︿︿ *⭒   ⭒   ⭒   ⭒   ⭒   ⭒*\n`
   txt += `┊ ‹‹ *Status De* :: *el alfeñique ดาว⁩*\n`
   txt += `┊•*⁀➷ °⭒⭒⭒ *【 ✯ el alfeñique✰ 】*\n`
   txt += `╰─── ︶︶︶︶ ✰⃕  ⌇ *⭒ ⭒ ⭒*   ˚̩̥̩̥*̩̩͙✩\n`
   txt += `┊🪴 [ *Moneda* :: *intis 🟡*\n`
   txt += `┊🍟 [ *Prefijo* :: *【  ${usedPrefix}  】*\n`
   txt += `┊✨ [ *Plugins* :: *${totalf}*\n`
   txt += `┊🍟 [ *Plataforma* :: *${platform()}*\n`
   txt += `┊🍁 [ *RAM* :: *${format(totalmem() - freemem())} / ${format(totalmem())}*\n`
   txt += `┊🌸 [ *FreeRAM* :: *${format(freemem())}*\n`
   txt += `┊🍄 [ *Speed* :: *${latensi.toFixed(4)} ms*\n`
   txt += `┊💐 [ *Comandos Ejecutados* :: *${formatNumber(totalStats)}*\n`
   txt += `┊🌴 [ *Grupos Registrados* :: *${formatNumber(totalchats)}*\n`
   txt += `┊🌺 [ *Registrados* :: *${formatNumber(totalreg)} Usuarios*\n`
   txt += `╰─────────\n\n`
   txt += `> 🚩 ${textbot || ''}`

   let img = `./storage/img/teto4.webp`
   await conn.sendFile(m.chat, img, 'thumbnail.jpg', txt, m, null, rcanal)
}

handler.help = ['info']
handler.tags = ['main']
handler.command = ['info', 'infobot']

export default handler

function formatNumber(number) {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
}

function clockString(ms) {
  if (isNaN(ms)) return '-- D -- H -- M -- S'
  let d = Math.floor(ms / 86400000)
  let h = Math.floor(ms / 3600000) % 24
  let m = Math.floor(ms / 60000) % 60
  let s = Math.floor(ms / 1000) % 60
  return [d, ' D ', h, ' H ', m, ' M ', s, ' S'].map(v => v.toString().padStart(2, 0)).join('')
}
