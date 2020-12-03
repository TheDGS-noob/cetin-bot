//events/ready.js at kankam :)
const chalk = require('chalk');
const moment = require('moment');
const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');
var prefix = ayarlar.prefix;
module.exports = client => {
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: Aktif, Komutlar yüklendi!`);
console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] BOT: ${client.user.username} ismi ile giriş yapıldı!`);
client.user.setStatus("LISTENING");

var oyun = [
"Bot sistem yetmezliğinden bazen çöküyor",
":D? güncellemeyi bekleyin",
"✨ s!yardım 🔥"
];

setInterval(function() {

var random = Math.floor(Math.random()*(oyun.length-0+1)+0);

client.user.setActivity(oyun[random], "https://www.twitch.tv/different_game_salih");
}, 2 * 2500);

}