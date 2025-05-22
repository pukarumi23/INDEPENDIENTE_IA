global.math = global.math ? global.math : {};
const handler = async (m, {conn}) => {
  const id = m.chat;
  if (!m.quoted) return;
  if (m.quoted.sender != conn.user.jid) return;
  if (!/^💙𝙲𝚄𝙰𝙽𝚃𝙾 𝙴𝚂 𝙴𝙻 𝚁𝙴𝚂𝚄𝙻𝚃𝙰𝙳𝙾 𝙳𝙴/i.test(m.quoted.text)) return;
  if (!(m.chat in global.math)) return conn.sendButton(m.chat, '*[❗𝐈𝐍𝐅𝐎❗] 𝚈𝙰 𝚂𝙴 𝙰𝙷 𝚁𝙴𝚂𝙿𝙾𝙽𝙳𝙸𝙳𝙾 𝙰 𝙴𝚂𝙰 𝙿𝚁𝙴𝙶𝚄𝙽𝚃𝙰*', wm, null, [['𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝙹𝚄𝙶𝙰𝚁', '/mates']], m);
  if (m.quoted.id == global.math[id][0].id) {
    const math = global.math[id][1];
    if (m.text == math.result) {
      conn.reply(m.chat, `*𝚁𝙴𝚂𝙿𝚄𝙴𝚂 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙰!!*\n*𝙷𝙰𝚉 𝙶𝙰𝙽𝙰𝙳𝙾: ${math.bonus} 𝚇𝙿*`, m);
      conn.sendButton(m.chat, `💙 *𝚁𝙴𝚂𝙿𝚄𝙴𝚂 𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙰!!*\n*𝙷𝙰𝚉 𝙶𝙰𝙽𝙰𝙳𝙾: ${math.bonus}*`, wm, null, [['𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝙹𝚄𝙶𝙰𝚁', `/math ${math.mode}`]], m)
      global.db.data.users[m.sender].cookies += math.bonus;
      clearTimeout(global.math[id][3]);
      delete global.math[id];
    } else {
      if (--global.math[id][2] == 0) {
        conn.reply(m.chat, `*𝚂𝙴 𝙰𝙲𝙰𝙱𝙰𝚁𝙾𝙽 𝚃𝚄𝚂 𝙾𝙿𝙾𝚁𝚃𝚄𝙽𝙸𝙳𝙰𝙳𝙴𝚂*\n*𝙻𝙰 𝚁𝙴𝚂𝙿𝚄𝙴𝚂𝚃𝙰 𝙴𝚂: ${math.result}*`, m);
        conn.sendButton(m.chat, `💙 *𝚂𝙴 𝙰𝙲𝙰𝙱𝙰𝚁𝙾𝙽 𝚃𝚄𝚂 𝙾𝙿𝙾𝚁𝚃𝚄𝙽𝙸𝙳𝙰𝙳𝙴𝚂*\n*𝙻𝙰 𝚁𝙴𝚂𝙿𝚄𝙴𝚂𝚃𝙰 𝙴𝚂: ${math.result}*`, wm, null, [['𝚅𝙾𝙻𝚅𝙴𝚁 𝙰 𝙹𝚄𝙶𝙰𝚁', `/math ${math.mode}`]], m)
        clearTimeout(global.math[id][3]);
        delete global.math[id];
      } else conn.reply(m.chat, `💙 *𝚁𝙴𝚂𝙿𝚄𝙴𝚂𝚃𝙰 𝙸𝙽𝙲𝙾𝚁𝚁𝙴𝙲𝚃𝙰!!*\n*𝙰𝚄𝙽 𝙳𝙸𝚂𝙿𝙾𝙽𝙸𝙱𝙻𝙴𝚂 ${global.math[id][2]} 𝚘𝚙𝚘𝚛𝚝𝚞𝚗𝚒𝚍𝚊𝚍𝚎𝚜*`, m);
    }
  }
};
handler.customPrefix = /^-?[0-9]+(\.[0-9]+)?$/;
handler.command = new RegExp;
export default handler;
