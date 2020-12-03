const Discord = require("discord.js")
const db = require('quick.db')

exports.run = (client, message, args) => {
     
 const main = new Discord.RichEmbed()
.setAuthor(`${client.user.username} `, client.user.avatarURL)
.setThumbnail(client.user.avatarURL)
.setColor("RANDOM")
.setTitle('Moderasyon Menüsü ')
.setDescription(`
<a:truncuyldz:780064158183587852> ban:  **Etiketlediğiniz kişiyi sunucudan banlar**\n
<a:truncuyldz:780064158183587852> kick: **Etiketlediğiniz kişiyi sunucudan atar**\n
<a:truncuyldz:780064158183587852> uyarı: **Etiketlediğiniz kişiyi uyarır**\n
<a:truncuyldz:780064158183587852> oylama: **Oylama başlatır**\n
<a:truncuyldz:780064158183587852> çekiliş: **Seçtiğiniz ayarlar ile çekiliş yapar**\n
<a:truncuyldz:780064158183587852> reklamtaraması: **Oynuyor kısmındaki reklamları tarar**\n
<a:truncuyldz:780064158183587852> rolinfo: **İsmini tam yazdığınız rolün bilgisini verir**\n
<a:truncuyldz:780064158183587852> roller: **Sunucudaki rolleri yazar**\n
<a:truncuyldz:780064158183587852> slowmode: **Yavaş mod açar**\n
<a:truncuyldz:780064158183587852> temizle: **Belirtilen miktarda sohbeti temizler**\n
<a:truncuyldz:780064158183587852> mute: **Belirtilen kişiyi susturur**\n
<a:truncuyldz:780064158183587852> girişçıkış: **Sunucuya giren ve sunucudan çıkan üyeleri gösterir**\n
<a:truncuyldz:780064158183587852> otorol: **Sunucuya gelenlere otomatik olarak rol verir**\n
<a:truncuyldz:780064158183587852> ototag: **Sunucuya gelenlere otomatik olarak tag verir**\n
<a:truncuyldz:780064158183587852> sayaç: **Sayaç ayarlarsınız**\n
<a:truncuyldz:780064158183587852> sa-as: **Ayarlamalı sa as sistemini açar**\n
<a:truncuyldz:780064158183587852> esa-as: **Ayarlamalı emojili sa as sistemini açar**\n
<a:truncuyldz:780064158183587852> sunucubilgi: **Sunucunun bilgilerini gösterir**
`)
//.setFooter('')
 .setImage("")
      if (!args[0]) return message.channel.send(main)
   if(args[0] === "logo"){
    let kullanıcı = [`
» .banzai: Banzai fontunda logo yaparsınız.
» .bird: Bird Logo yaparsınız.
» .bubble: Bubble rengarenk logo yaparsınız.
» .bubble2: Mavi bubble logo yaparsınız.
» .fluffy: Şeker logo yaparsınız.
» .gold: Gold logo yaparsınız.
» .habbo: Habbo logo yaparsınız.
» .hallowen: Hallowen logo yaparsınız.
» .ice: Buz logo yaparsınız.
» .retro: Pixelli logo yaparsınız.
» .retro-blue: Mavi pixelli logo yaparsınız.
» .modern: Modern logo yaparsınız.
» .starwars: Starwars logo yaparsınız.`]
    
    const logok = new Discord.RichEmbed()
    .setTitle('🎨 Logo Komutları')
    .setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setColor(message.guild.me.displayColor)
    .setThumbnail(client.user.avatarURL)
    .setDescription(kullanıcı)
    .setFooter('Logo komutlarında türkçe harf kullanmayın ve ingilizce diline göre yazınız.')
    message.channel.send(logok)
  } else {
    var arg = args[0]
  }
  
  if(!args[0]) {var arg= args[0]}
  
  if(!args[0]) {var arg= args[0]}
   if(args[0] === "ana-komutlar"){
    let genel = [`» .afk: Afk olursunuz.
» .bug-bildir: Botla ilgili hataları bildirirsiniz.
» .davet: Botun davet bağlantısını gönderir.
» .destek: Destek sunucumuza gelirsin.
» .emoji-bilgi: Emojinin detaylarını gösterir.
» .istatistik: Botun istatistiklerini gösterir.
» .istek: İstekte bulunursunuz(Ayarlanabilir istek sistemi).
» .rol-say: Sunucudaki rolleri sayar.
» .öneri: Bot hakkındaki önerilerinizi bot sahibine ulaştırır.
» .say: Sunucudaki üyeleri sayar.
» .ses-kanalındakiler: Ses kanalında kaç üye olduğunu söyler.
» .sil: Belirtilen miktarda mesaj siler.
» .sponsor: Sponsorumuzu gösterir.
» .yapımcılarım: Botun yapımcılarını gösterir.
» .vote: Botumuzu oylarsınız.`]
    
    const genelE = new Discord.RichEmbed()
    .setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setTitle('🌐 Ana Komutlar')
    .setColor(message.guild.me.displayColor)
    .setThumbnail(client.user.avatarURL)
    .setDescription(genel)
  
    message.channel.send(genelE)
  } else {
    var arg = args[0]
  }
  
  if(!args[0]) {var arg= args[0]}
  
  if(!args[0]) {var arg= args[0]}
  

  if(args[0] === "yetkili"){
    let moderasyon = [`» .ban: Birini banlarsınız.
» .banlananlar: Banlananları gösterir.
» .caps-engel: Büyük harfi engeller.
» .giriş-çıkış-ayarla: Resimli giriş çıkış kanalı ayarlarsınız.
» .giriş-çıkış-sıfırla: Resimli giriş çıkış kanalını sıfırlarsınız.
» .isim-değiştir: Kullanıcının ismini değişirsin.
» .istek-kanal : İstek kanalı belirlersiniz.
» .istek-kanal sıfırla: İstek kanalını sıfırlarsınız.
» .kanal-koruma: Kanal koruma sistemi.
» .otorol kanal-ayarla: Otorol kanalı ayarlarsınız.
» .otorol kanal-sıfırla: Otorol kanalını sıfırlarsınız.
» .otorol rol-ayarla: Otorol rolünü ayarlarsınız.
» .otorol rol-sıfırla: Otorol rolünü sıfırlarsınız.
» .reklam-taraması: Oynuyor kısmında reklam taraması yapar.
» .reklam-engel: Atılan linkleri engeller.
» .unban: Birinin banını açarsınız.
» .oylama: Oylama yaparsınız.
» .sa-as-sistemi: Ayarlamalı sa-as sistemi.
» .temizle: Belirlediğiniz kadar mesaj siler.`]
    
    const moderasyonE = new Discord.RichEmbed()
    .setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setTitle('🔨 Yetkili Komutları')
    .setColor(message.guild.me.displayColor)
    .setThumbnail(client.user.avatarURL)
    .setDescription(moderasyon)
  
    message.channel.send(moderasyonE)
  } else {
    var arg = args[0]
  }
  
  if(!args[0]) {var arg= args[0]}
  
  if(!args[0]) {var arg= args[0]}
 
  if(args[0] === "eğlence"){
    let eğlence = [`» .8ball: Sihirli 8ball sorularınızı cevaplar.
» .ascii: Yazınızı ascii şeklinde yazar.
» .banner: Yazınızı banner yapar.
» .changemymind: Change my mind resmi oluşturur.
» .düello: İstediğiniz bir kişi ile düello atarsınız!
» .espri: Espri yapar.
» .kaccm: Malafatını Söyler.
» .pp: Avatarınızı gösterir.
» .punch: Punch atar.
» .slot: Slot oynarsınız.
» .sunucupp: Sunucu Resminin Linkini Atar.
» .öp: istediğiniz kişiyi öper.`]
    
    const eglencek = new Discord.RichEmbed()
    .setTitle('🌈 Eğlence Komutları')
    .setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setColor(message.guild.me.displayColor)
    .setThumbnail(client.user.avatarURL)
    .setDescription(eğlence)

    message.channel.send(eglencek)
  } else {
    var arg = args[0]
  }
  
  if(!args[0]) {var arg= args[0]}
  
  if(!args[0]) {var arg= args[0]}
  
   if(args[0] === "kayıt-sistemi"){
    let kayıt = [`» .kayıt alınacak-rol: Kayıt olunca alıncak rolü seçersiniz.
» .kayıt verilecek-rol: Kayıt olunca verilcek rolü seçersiniz.
» .kayıt kanal: Kayıt kanalını seçersiniz.
» .kayıt log-kanal: Kayıt log kanalını seçersiniz.
» .kayıt-ol: Kayıt olursunuz.
`]
    
    const ks = new Discord.RichEmbed()
.setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setTitle('📋 Kayıt Sistemi')
    .setColor(message.guild.me.displayColor)
    .setThumbnail(client.user.avatarURL)
    .setDescription(kayıt)
    message.channel.send(ks)
  } else {
    var arg = args[0]
  }
  
  if(!args[0]) {var arg= args[0]}
  
  if(!args[0]) {var arg= args[0]}
  if(args[0] === "uyarı-sistemi"){
    let uyarı = [`
» .uyarı ekle: Etiketlediğiniz kişiye uyarı eklersiniz.
» .uyarı sil: Etiketlediğiniz kişinin uyarısını silersiniz.
» .uyarı bilgi: Etiketlediğiniz kişinin uyarılarına bakarsınız.
`]
    
    const uyarım = new Discord.RichEmbed()
    .setTitle('⭕ Uyarı Sistemi')
    .setAuthor(`${client.user.username} `, client.user.avatarURL)
    .setColor(message.guild.me.displayColor)
    .setThumbnail(client.user.avatarURL)
    .setDescription(uyarı)
    message.channel.send(uyarım)
  } else {
    var arg = args[0]
  }
  
  if(!args[0]) {var arg= args[0]}
  
  if(!args[0]) {var arg= args[0]}
  
  
}

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['mod'],
  permLevel: 0
}

exports.help = {
  name: "moderasyon",
  description: "yardım menüsü",
  usage: "moderasyon"
}