import Starlights from '@StarlightsTeam/Scraper';

let handler = async (m, { conn, text, usedPrefix, command }) => {
if (!text) return conn.reply(m.chat,`🔶 Ingrese el nombre de usuario de TikTok.\n\nEjemplo:\n> *${usedPrefix + command}* Fernanfloo`, m);

await m.react('🕓');
try {
let { username, nickname, bio, profile, followers, following, likes, videos, accountPrivate, verified, region, accountCreated } = await Starlights.tiktokStalk(text);

let txt = '`乂  T I K T O K  -  S T A L K`\n\n'
    txt += `  ✩   *Usuario* : ${username}\n`;
    txt += `  ✩   *Apodo* : ${nickname}\n`;
    txt += `  ✩   *Bio* : ${bio || 'No disponible'}\n`;
    txt += `  ✩   *Seguidores* : ${followers}\n`;
    txt += `  ✩   *Siguiendo* : ${following}\n`;
    txt += `  ✩   *Likes* : ${likes}\n`;
    txt += `  ✩   *Videos* : ${videos}\n`;
    txt += `  ✩   *Cuenta Privada* : ${accountPrivate}\n`;
    txt += `  ✩   *Verificado* : ${verified}\n`;
    txt += `  ✩   *Región* : ${region}\n`;
    txt += `  ✩   *Cuenta Creada* : ${accountCreated}\n\n`;


await conn.sendFile(m.chat, profile, 'thumbnail.jpg', txt, m, null, rcanal);
 await m.react('✅');
} catch {
await m.react('✖️');
}
};

handler.help = ['tiktokstalk <usuario>'];
handler.tags = ['tools'];
handler.command = ['tiktokstalk', 'stalktiktok', 'ttstalk'];
handler.register = true;

export default handler;
