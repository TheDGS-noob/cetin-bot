const Discord = require('discord.js');


exports.run = (client, message, args) => {
  if(message.author.id !== "389494777797672960") return message.reply("Bu komutu sadece sahibim kullanabilir ")
    message.channel.sendMessage(`Bot yeniden başlatılıyor... 🔧`).then(msg => {
    console.log(`BOT: Bot yeniden başlatılıyor... `);
    process.exit(0);
  })
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};
////////FİBER CODE & BOTLİST
exports.help = {
  name: 'reboot',
  description: 'Botu yeniden başlatır.',
  usage: 'reboot'
};