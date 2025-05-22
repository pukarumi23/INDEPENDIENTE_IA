let handler = async (m, { conn, args, usedPrefix, command }) => {
    conn.math = conn.math ? conn.math : {}
    
    if (args.length < 1) throw `
  🧮 Dificultades disponibles : 
  
${Object.keys(modes).join(' | ')} 

_📌Ejemplo : ${usedPrefix+command} normal_
`.trim()
  
  let mode = args[0].toLowerCase()
  if (!(mode in modes)) throw `
  🧮 Dificultades disponibles : 
  
 ${Object.keys(modes).join(' | ')}

_📌Ejemplo : ${usedPrefix+command} normal_
`.trim()
    
  let id = m.chat
    if (id in conn.math) return conn.reply(m.chat, '💙 Todavía hay preguntas sin respuesta en este chat', conn.math[id][0])
    let math = genMath(mode)
    conn.math[id] = [
        await conn.reply(m.chat, `▢ CUANTO ES *${math.str}*=\n\n_Tiempo:_ ${(math.time / 1000).toFixed(2)} segundos\n\n🎁 Recompensa : ${math.bonus} XP`, m),
        math, 4,
        setTimeout(() => {
            if (conn.math[id]) conn.reply(m.chat, `⏳ Se acabó el tiempo!\nLa respuesta es : *${math.result}*`, conn.math[id][0])
      delete conn.math[id]
        }, math.time)
    ]
}

// Ayuda y comandos
handler.help = ['mates']
handler.tags = ['game']
handler.command = ['mates', 'mate', 'matemáticas', 'math'] 

// Modos de dificultad
let modes = {
    noob: [-3, 3, -3, 3, '+-', 15000, 100],
    fácil: [-10, 10, -10, 10, '*/+-', 20000, 400],
    normal: [-40, 40, -20, 20, '*/+-', 40000, 700],
    difícil: [-100, 100, -70, 70, '*/+-', 30000, 800],
    extremo: [-999999, 999999, -999999, 999999, '*/', 99999, 4500]
}

// Operadores para mostrar
let operators = {
    '+': '+',
    '-': '-',
    '*': '×',
    '/': '÷'
}

// Generador de problemas matemáticos
function genMath(mode) {
    let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
    let a = randomInt(a1, a2)
    let b = randomInt(b1, b2)
    let op = pickRandom([...ops])
    let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
    if (op == '/') [a, result] = [result, a]
    return {
        str: `${a} ${operators[op]} ${b}`,
        mode,
        time,
        bonus,
        result
    }
}

// Función para número aleatorio
function randomInt(from, to) {
    if (from > to) [from, to] = [to, from]
    from = Math.floor(from)
    to = Math.floor(to)
    return Math.floor((to - from) * Math.random() + from)
}

// Función para selección aleatoria
function pickRandom(list) {
    return list[Math.floor(Math.random() * list.length)]
}

// Exportar handler
export default handler
