let linkRegex = /(https?:\/\/[^\s]+)/i;

export async function before(m, { isAdmin, isBotAdmin }) {
  if (m.isBaileys && m.fromMe) return true; // Ignorar mensajes del bot.
  if (!m.isGroup) return false; // Solo aplicar en grupos.

  const chat = global.db.data.chats[m.chat];
  const user = `@${m.sender.split`@`[0]}`;
  const isGroupLink = linkRegex.exec(m.text);

  if (chat.antiLink2 && isGroupLink) {
    const linkThisGroup = `https://chat.whatsapp.com/${await this.groupInviteCode(m.chat)}`;
    if (m.text.includes(linkThisGroup)) return true; // Ignorar enlaces del grupo actual.

    if (isAdmin) {
      return m.reply(
        `*「 ANTI LINKS 」*\n${user}, has enviado un enlace, pero como eres administrador, no puedo eliminarlo.`
      );
    }

    if (isBotAdmin) {
      // Eliminar mensaje antes de cualquier otra acción
      await this.sendMessage(m.chat, {
        delete: { remoteJid: m.chat, fromMe: false, id: m.key.id, participant: m.key.participant },
      });

      // Enviar mensaje de expulsión sin reenviar el enlace
      await this.sendMessage(
        m.chat,
        {
          text: `*「 ANTI LINKS 」*\n${user}, está prohibido enviar enlaces. Has sido expulsado del grupo.`,
          mentions: [m.sender],
        }
      );

      // Expulsar al usuario inmediatamente
      await this.groupParticipantsUpdate(m.chat, [m.sender], 'remove'); // Expulsar al usuario.
    } else {
      return m.reply('💙 El bot no tiene permisos de administrador para ejecutar esta acción.');
    }
  }

  return true;
}
