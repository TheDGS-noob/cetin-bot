const Discord = require('discord.js');
const db = require('quick.db')

exports.run = (client, message, params) => {
  if (!params[0]) {
    const commandNames = Array.from(client.commands.keys());
	message.channel.send({embed: {
            color: 0xD97634,
            author: {
              name: "Giriş Çıkış"
			},
            title: "**Nasıl Yapılır?**",
            description: "[**Merhabalar Giriş Çıkış ayarlamak için giriş-çıkış isimli bir log kanalı açman lazım ama bu kanalın ismi bu şekilde kalmalı önüne emoji vb. koyarsan bot kanalı görmez ve gelen gideni söylemez**](.) ",                    
            fields: [
            ],
            timestamp: new Date(),
            footer: {
              icon_url: "",
              text: "Shelly BOT"
            }
          }
        });
}};
exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['kimgeldi'],
  permLevel: 0
};

exports.help = {
  name: 'girişçıkış',
  description: 'gelen giden', 
  usage: 'gleng  iden'
  };