const Discord = require("discord.js");
const ayarlar = require('../ayarlar.json')
const db = require('quick.db')

exports.run = async (client, message, args) => {
  
        if (message.author.id !== "389494777797672960") return  message.channel.send('Bu Komutu Kullanmak İçin **`Sahibim`** Olman Lazım!')
  try {
    let codein = args.join(" ");
    let code = eval(codein)
    if (codein.length < 1) return message.channel.send('Bir kod girmelisin !')
    if (codein == 'client.token') return message.channel.send('Hadi işine paşam yok sana token moken')
    if (typeof code !== 'string')    
      code = require('util').inspect(code, { depth: 0 });
    let embed = new Discord.RichEmbed()
    .setColor(message.guild.me.displayColor)
    .addField('Kod', `\`\`\`js\n${codein}\`\`\``)
    .addField('Sonuç', `\`\`\`js\n${code}\n\`\`\``)
    message.channel.send(embed)
  } catch(e) {
    let embed2 = new Discord.RichEmbed()
    .setColor(message.guild.me.displayColor)
    .addField('Hata', "\`\`\`js\n"+e+"\n\`\`\`")
    message.channel.send(embed2);
  }
}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: [],
    permLevel: 0
  };
  
  exports.help = {
    name: 'eval',
    description: 'Kod denemeyi sağlar.',
    usage: 'eval <kod>'
  }
 