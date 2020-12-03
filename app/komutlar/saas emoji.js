const db = require('quick.db')

const Discord = require('discord.js')

exports.run = async (bot, message, args) => {

  if (!args[0]) return message.channel.send("Doğru kullanım: `s!esa-as ac/kapa`")

  if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(' Bu komutu kullanmak için yeterli yetkin bulunmuyor. ')

  if (args[0] == 'ac') {

    db.set(`saassistemi_${message.guild.id}`, 'acikk').then(

      message.channel.send(`Emojili sa as sistemi açıldı✅`)

    )

  }

  if (args[0] == 'kapa') {

    db.set(`saassistem_${message.guild.id}`, 'kapalii').then(

      message.channel.send(`Emojili sa as sistemi kapatıldı ✅`)

    )

  }

}

//FİBER BOTLİST & CODE
exports.conf = {

  enabled: true,

  guildOnly: false,

  aliases: [],

  permLevel: 2,


};

exports.help = {

  name: 'esa-as',

  description: ' sa as sistemi',

  usage: 'oto-cevap'

};