const Discord = require("discord.js");
const db = require('quick.db')
const ms = require("ms");

module.exports.run = async (bot, message, args) => {

  //!geçicisustur@üye 1s/m/h/d | 1s = 1 saniye , 1m = 1 dakika , 1h = 1 saat, 1d = 1 gün

  let tomute = message.guild.member(
    message.mentions.users.first() || message.guild.members.get(args[0])
  );
  if (!tomute) {
    const embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setDescription(`Lütfen susturulacak kişiyi etiketleyiniz!`)
      .setFooter(bot.user.username, bot.user.avatarURL);

    message.channel.send(embed);
    return;
  }
  if (tomute.hasPermission("MANAGE_MESSAGES")) {
    const embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setDescription(`Ne yazık ki yetkilileri susturamam!`)
      .setFooter(bot.user.username, bot.user.avatarURL);

    message.channel.send(embed);
    return;
  }
  let muterole = message.guild.roles.find(r => r.name === "Mute");

  if (!muterole) {
    try {
      muterole = await message.guild.createRole({
        name: "Mute",
        color: "#ff0000",
        permissions: []
      });
      message.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(muterole, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
    } catch (e) {
      console.log(e.stack);
    }
  }
  //end of create role
  let mutetime = args.slice(1)
    .join(" ")
    .replace(`sn`, `s`)
    .replace(`dk`, `m`)
    .replace(`sa`, `h`)
    .replace(`g`, `d`)
    .replace(`saniye`, `s`)
    .replace(`dakika`, `m`)
    .replace(`saat`, `h`)
    .replace(`gün`, `d`);
  if (!mutetime) {
    const embed = new Discord.RichEmbed()
      .setColor("BLUE")
      .setDescription(`Lütfen bir süre belirtiniz!`)
      .setFooter(bot.user.username, bot.user.avatarURL);

    message.channel.send(embed);
    return;
  }

  await tomute.addRole(muterole.id);
  const embed = new Discord.RichEmbed()
    .setColor("PURPLE")
    .setDescription(`<a:troll:769125975203119156> <@${tomute.id}> ${ms(ms(mutetime))} boyunca susturuldu! nabtın la yine QW:EQW:EQ:E`)
    .setFooter(bot.user.username, bot.user.avatarURL);

  message.channel.send(embed);

  setTimeout(function() {
    tomute.removeRole(muterole.id);
    const embed = new Discord.RichEmbed()
      .setColor("PURPLE")
      .setDescription(`<a:troll:769125975203119156>  <@${tomute.id}> 'un susturulma süresi doldu!`)
      .setFooter(bot.user.username, bot.user.avatarURL);

    message.channel.send(embed);
  }, ms(mutetime));
};

exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["sustur"],
  permLevel: 2
};

exports.help = {
  name: "mute",
  description: "mute",
  usage: "mute"
};