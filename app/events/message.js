///////events/message.js
const ayarlar = require('../ayarlar.json');
const db = require('quick.db')
module.exports = async message => {
  let prefix = db.fetch(`prefix_${message.guild.id}`) || ayarlar.prefix
  
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(prefix)) return;
  let perms = client.elevation(message);
  let command = message.content.split(' ')[0].slice(prefix.length);
  let params = message.content.split(' ').slice(1);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
};///fiber botlist & code