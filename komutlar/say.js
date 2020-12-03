const Discord = require('discord.js');
const db = require('quick.db')
exports.run = async (client, message, args) => {

	if (!message.guild) return message.author.sendMessage('Bu Komutu Sadece Sunucularda Kulanabilirsiniz!');

 
    const say = new Discord.RichEmbed()
        .setColor(message.guild.me.displayColor)
    .setTitle(message.guild.name)
        .addField("👥 Sunucudaki üye sayısı", message.guild.memberCount)
        .addField("🤖 Sunucudaki Bot Sayısı", message.guild.members.filter(m => m.user.bot).size)
        .addField("🌐 Çevrimiçi üye sayısı", message.guild.members.filter(m => m.user.presence.status !== "offline").size)
        .addField("⛔ Rahatsız Etmeyin üye sayısı", message.guild.members.filter(m => m.user.presence.status == "dnd").size)
        .addField("🌙 Boşta üye sayısı", message.guild.members.filter(m => m.user.presence.status == "idle").size)
        .addField("💤 Çevrimdışı üye sayısı", message.guild.members.filter(m => m.user.presence.status == "offline").size)

    message.channel.send(say);

}

exports.conf = {
    enabled: true,
    guildOnly: false,
    aliases: ['say'],
    permLevel: 0
};

exports.help = {
    name: 'gelişmiş-say',
    description: 'Say',
    usage : 'Say'
 } 