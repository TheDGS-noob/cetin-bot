const Discord = require("discord.js");
const client = new Discord.Client();
const ayarlar = require("./ayarlar.json");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
require("./util/eventLoader")(client);

var prefix = ayarlar.prefix;

const log = message => {
  console.log(`[${moment().format("YYYY-MM-DD HH:mm:ss")}] ${message}`);
};

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "Uyarı")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "HATA")));
});

client.login(ayarlar.token);

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} komut yüklenecek.`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Yüklenen komut: ${props.help.name}.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
//////////////////////// 
client.on("message", async message => {
    let uyarisayisi = await db.fetch(`reklamuyari_${message.author.id}`);
    let reklamkick = await db.fetch(`reklamkick_${message.guild.id}`)
    let kullanici = message.member;
    if (reklamkick == 'kapali') return;
    if (reklamkick == 'acik') {
        const reklam = ["discord.app", "discord.gg", "invite", "discordapp", "discordgg", ".com", ".net", ".xyz", ".tk", ".pw", ".io", ".me", ".gg", "www.", "https", "http", ".gl", ".org", ".com.tr", ".biz", ".party", ".rf.gd", ".az",];
        if (reklam.some(word => message.content.toLowerCase().includes(word))) {
            if (!message.member.hasPermission("ADMINISTRATOR")) {
                message.delete();
                db.add(`reklamuyari_${message.author.id}`, 1) //uyarı puanı ekleme
                if (uyarisayisi === null) {
                    let uyari = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (1/3)`)
                        .setTimestamp()
                    message.channel.send(uyari)                
}
                if (uyarisayisi === 1) {
                    let uyari = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> reklam kick sistemine yakalandın! Reklam yapmaya devam edersen kickleniceksin (2/3)`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }
                if (uyarisayisi === 2) {
                    message.delete();
                    await kullanici.kick({
                        reason: `Reklam kick sistemi`,
                    })
                    let uyari = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> 3 adet reklam uyarısı aldığı için kicklendi. Bir kez daha yaparsa banlanacakç`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }
                if (uyarisayisi === 3) {
                    message.delete();
                    await kullanici.ban({
                        reason: `Reklam ban sistemi`,
                    })
                    db.delete(`reklamuyari_${message.author.id}`)
                    let uyari = new Discord.RichEmbed()
                        .setColor("RANDOM")
                        .setFooter('Reklam kick sistemi', client.user.avatarURL)
                        .setDescription(`<@${message.author.id}> kick yedikten sonra tekrar devam ettiği için banlandı.`)
                        .setTimestamp()
                    message.channel.send(uyari)
                }

            }
        }
    }
});
//////////////////////// otorol
client.on("guildMemberAdd", async member => {
  let log = await db.fetch(`otolog_${member.guild.id}`);
  let log2 = member.guild.channels.find('id', log)
  let rol = await db.fetch(`otorol_${member.guild.id}`);
  let otorol = member.guild.roles.find('id', rol);
  if (!log) return;
  if (!log2) return;
  if (!rol) return;
  if (!otorol) return;
  log2.send(`:mega: <a:tik3:762608730440728576>  \`${member.user.tag}\` adlı kullanıcı aramıza katıldı! \`${otorol.name}\` adlı rol başarıyla verildi.`)
  member.addRole(otorol)
});
////////////////////////ototag 
client.on("guildMemberAdd", async(member) => {
  let ototag = await db.fetch(`tag_${member.guild.id}`);
  if(ototag) {
    let tagyazi;
    if (ototag == null) tagyazi = member.setNickname(`${member.user.username}`)
    else tagyazi = member.setNickname(`${ototag} ${member.user.username}`)
  }
})

////FİBER BOTLİST & CODE MAİN KISMINIZA ATINIZ
client.on("guildCreate", guild => {
  let log = client.channels.get("769199708651782154"); /////////////LOG KANAL İD

  const octopus = new Discord.RichEmbed()

    .setTitle("Yeni bir sunucuya eklendim!")

    .setThumbnail(
      guild.iconURL ||
        "https://cdn.discordapp.com/icons/735903380139933838/a_c01c741bc05ddca551506a26024cf827.jpg"
    )

    .setColor("GREEN")

    .addField("» Sunucu İsmi:", `**${guild.name}**`)

    .addField("» Sunucu ID:", `\`\`\`${guild.id}\`\`\``)
  
  .addField("Kurucu", `\`${guild.owner.user.tag}\``)

    .addField(
      "Sunucu Bilgisi:",

      `**Üye Sayısı: \`${guild.members.size}\`\nKanal Sayısı: \`${guild.channels.size}\`**`
    );

  log.send(octopus);
});

client.on("guildDelete", guild => {
  let dcs_kanal = client.channels.get("769199708651782154");

  const dcs = new Discord.RichEmbed()
    .setTitle("Sunucudan Atıldım")
    .setColor("RED")
    .addField(":black_small_square: Sunucu İsmi", `\`${guild.name}\``)
    .addField(":black_small_square: Üye Sayısı", `\`${guild.members.size}\``)
    .addField(":black_small_square: Kurucu", `\`${guild.owner.user.tag}\``);
  dcs_kanal.send(dcs);
});

//////////////////////// caps engel
client.on("message", async message => {
  var anahtar = db.fetch(`caps_${message.guild.id}`);
  if (anahtar === "acik") {
    if (message.author.bot) return;
    if (message.content.length < 5) return;
    let capsengel = message.content.toUpperCase();
    let beyazliste =
      message.mentions.users.first() ||
      message.mentions.channels.first() ||
      message.mentions.roles.first();

    if (message.content == capsengel) {
      if (
        !beyazliste &&
        !message.content.includes("@everyone") &&
        !message.content.includes("@here") &&
        !message.member.hasPermission("BAN_MEMBERS")
      ) {
        message.delete();
        return message.channel
          .send("Büyük harf kullanmamalısın.!!!")
          .then(i => i.delete(10000));
      }
    }
  }
  if (!anahtar) return;
});

//////////////////////// bot dmleri
client.on("message", async message => {
  var kanal = client.channels.find("name", "shelly-dm"); ///LOG KANALL ADI GİRİN
  if (message.channel.type === "dm") {
    if (message.author.bot) return;
    kanal.send(
      new Discord.RichEmbed()
        .setColor("RANDOM")
        .setTitle(`Gönderen: ${message.author.tag}`)
        .setDescription(`Mesaj: ${message.content}`)
    );
  } /////FİBER BOTLİST &
});

//////////////////////// Reklam engel
client.on("message", async msg => {
  var anahtar = await db.fetch(`reklamengel_${msg.guild.id}`);
  if (anahtar === "acik") {
    const linkler = [
      "http",
      "https",
      ".com",
      ".net",
      ".xyz",
      ".tk",
      ".io",
      ".org",
      ".cf",
      ".ml",
      ".qa",
      ".club",
      ".gg",
      "discord.gg/"
    ];
    if (linkler.some(link => msg.content.includes(link))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.guild.owner.send("Sunucunuzda bir kişi reklam yaptı. \nKullanıcı: "+ msg.author.tag +" \nMesaj: **"+ msg +"** ");
        msg.delete().then(msg.reply("Reklam yapmak yasak sen hayırdır kardeş"))
       
      } ///////////fiber botlist & CODe
    }
  }
  if (!anahtar) return;
});
//////////////////////// Küfür engel
client.on("message", async msg => {
  var anahtar = await db.fetch(`kufur_${msg.guild.id}`);
  if (anahtar === "acik") {
    const küfürler = [
      "oç",
      "aq",
      "piç",
      "amk",
      "amq",
      "sik",
      "siktir",
      "orospu",
      "yarrak" //////FİBER BOTLİST & CODE
    ]; //aklıma bu kdr geldi başka küfür ekleyebilirsiniz siz "küfür", bu şekilde alt alta ekleyebilirsinz

    if (küfürler.some(küfür => msg.content.toLowerCase().includes(küfür))) {
      if (!msg.member.hasPermission("ADMINISTRATOR")) {
        msg.delete().then(msg.reply("Küfür etmek yasak lna :D"));
      }
    }
  }
  if (!anahtar) return;
});
//////////////////////// Rol Koruma
const db = require("quick.db");
client.on("roleCreate", async (rolee, member, guild) => {
  let rolkoruma = await db.fetch(`rolk_${rolee.guild.id}`);
  if (rolkoruma == "acik") {
    rolee.delete();
    const embed = new Discord.RichEmbed()
      .setDescription(
        "Sunucunuzda yeni bir rol oluşturuludu! fakat geri silindi!"
      )
      .setColor("BLACK");
    rolee.guild.owner.send(embed);
    return;
  } else {
    return;
  }
});
//////////////////////////////////

//////////////////////// Giriş çıkış

client.on("guildMemberAdd", member => {
  let guild = member.guild;

  const channel = member.guild.channels.find("name", "giriş-çıkış");
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(":inbox_tray: | Sunucuya katıldı!")
    .setTimestamp();
  channel.sendEmbed(embed);
});

client.on("guildMemberRemove", member => {
  const channel = member.guild.channels.find("name", "giriş-çıkış");
  if (!channel) return;
  const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(member.user.username, member.user.avatarURL)
    .setThumbnail(member.user.avatarURL)
    .setTitle(":outbox_tray: | Sunucudan ayrıldı")
    .setTimestamp();
  channel.sendEmbed(embed);
});

///////////////////////////////////

client.elevation = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if (message.member.hasPermission("BAN_MEMBERS")) permlvl = 2;
  if (message.member.hasPermission("ADMINISTRATOR")) permlvl = 3;
  if (message.author.id === ayarlar.sahip) permlvl = 4;
  return permlvl;
};

var regToken = /[\w\d]{24}\.[\w\d]{6}\.[\w\d-_]{27}/g;

client.on("warn", e => {
  console.log(chalk.bgYellow(e.replace(regToken, "that was redacted")));
});

client.on("error", e => {
  console.log(chalk.bgRed(e.replace(regToken, "that was redacted")));
});
////////////////////// gold üyelik
client.on("message", async message => {
  const request = require("node-superfetch");

  const db = require("quick.db");

  const ms = require("parse-ms");

  let cooldown = 1800000; /// Cooldown MS olarak kendinize göre ayarlayabilirsiniz.

  let sure = await db.fetch(`goldsure_${message.author.id}`);

  let kisi = db.fetch(`gold_${message.author.id}`);

  if (kisi == "gold") {
    if (sure !== null && cooldown - (Date.now() - sure) > 0) {
      let time = ms(cooldown - (Date.now() - sure));
    } else {
      if (message.author.bot) return;

      if (message.content.length > 1) {
        db.set(`goldsure_${message.author.id}`, Date.now());

        const goldmesaj = new Discord.RichEmbed()

          .setThumbnail(
            `https://cdn.discordapp.com/emojis/739552008196980836.gif`
          )

          .setDescription(
            `**İşte Bir Gold Üye** <${message.author.id}> _Hizaya Geçin_  `
          )

          .setColor(15844367)

          .setFooter(`Fiber Botlist & Code`);

        message.channel.send(goldmesaj).then(message => message.delete(30000)); //Mesajı silme süresi MS olarak kendinize göre ayarlayabilirsiniz
      }
    }
  } else if (kisi == undefined) {
  }

  if (!kisi) return;
});

///////////////////
client.on("guildMemberAdd", async member => {
  let sayi = await db.fetch(`sayıK_${member.guild.id}`);
  let kanal = await db.fetch(`kanalK_${member.guild.id}`);

  if (!sayi) return;
  if (!kanal) return;

  client.channels
    .get(kanal)
    .send(
      `📥 ${member} Sunucuya katıldı! **${sayi}** kişi olmamıza **${sayi -
        member.guild.members.size}** üye kaldı!`
    );
});

client.on("guildMemberRemove", async member => {
  let sayi = await db.fetch(`sayıK_${member.guild.id}`);
  let kanal = await db.fetch(`kanalK_${member.guild.id}`);

  if (!sayi) return;
  if (!kanal) return;

  client.channels
    .get(kanal)
    .send(
      `📤 ${member} Sunucudan ayrıldı! **${sayi}** kişi olmamıza **${sayi -
        member.guild.members.size}** üye kaldı!`
    );
});
/////////////// ayarlamalı sa as
client.on("message", async message=> {
const anahtar = await db.fetch(`saassistemi_${message.guild.id}`);

  if (anahtar == "acik") {
    if (////////////FİBER BOTLİST & CODE
      message.content.toLowerCase() == "sa" ||
      message.content.toLowerCase() == "s.a" ||
      message.content.toLowerCase() == "selamun aleyküm"
    ) {
      await message.reply('Aleykümselam Hoşgeldin kardeşim :)');    }
  }
});
/////////////////////////// emoji sa as
client.on("message", async message=> {
const anahtar = await db.fetch(`saassistemi_${message.guild.id}`);

  if (anahtar == "acikk") {
    if (////////////FİBER BOTLİST & CODE
      message.content.toLowerCase() == "sa" ||
      message.content.toLowerCase() == "sea" ||
      message.content.toLowerCase() == "s.a" ||
      message.content.toLowerCase() == "selamun aleyküm"
    ) {
    message.react('🇦');
    message.react('🇸');}
  }
});
//AFK
client.on("message", async message => {
  const ms = require("parse-ms");

  if (message.author.bot) return;
  if (!message.guild) return;
  if (message.content.includes(`${prefix}afk`)) return;

  if (await db.fetch(`afk_${message.author.id}`)) {
    let süre = await db.fetch(`afk_süre_${message.author.id}`);
    let zaman = ms(Date.now() - süre);
    db.delete(`afk_${message.author.id}`);
    db.delete(`afk_süre_${message.author.id}`);
    message.member.setNickname(db.fetch(`afktag_${message.author.id}`))
    if(db.fetch(`dil_${message.guild.id}`) != "EN") {
    const afk_cikis = new Discord.RichEmbed()
      .setColor("ff0000")
      .setDescription(`<@${message.author.id}> aga \`${zaman.hours}\` **saat**  \`${zaman.minutes}\` **dakika** \`${zaman.seconds}\` **saniye**dir AFK sın özledik be :D`)
    message.channel.send(afk_cikis)}
  }

  var kullanıcı = message.mentions.users.first();
  if (!kullanıcı) return;
  var sebep = await db.fetch(`afk_${kullanıcı.id}`);

  if (sebep) {
    let süre = await db.fetch(`afk_süre_${kullanıcı.id}`);
    let zaman = ms(Date.now() - süre);
    if(db.fetch(`dil_${message.guild.id}`) != "EN") {
    const afk_uyarı = new Discord.RichEmbed()
      .setColor("ff0000")
      .setDescription(`<@${kullanıcı.id}> adlı kullanıcı \`${sebep}\` sebebiyle; \`${zaman.hours}\` **saat**  \`${zaman.minutes}\` **dakika** \`${zaman.seconds}\` **saniyedir AFK!**`)
    message.reply(afk_uyarı)}
  }
});

/////////afk
client.on("message" , async msg => {
  if(msg.content.startsWith(ayarlar.prefix+"afk")) return;
 
  let afk = msg.mentions.users.first()
 
  const kisi = db.fetch(`afkid_${msg.author.id}_${msg.guild.id}`)
 
  const isim = db.fetch(`afkAd_${msg.author.id}_${msg.guild.id}`)
 if(afk){
   const sebep = db.fetch(`afkSebep_${afk.id}_${msg.guild.id}`)
   const kisi3 = db.fetch(`afkid_${afk.id}_${msg.guild.id}`)
   if(msg.content.includes(kisi3)){
 
       msg.reply(`Etiketlediğiniz Kişi Afk \n Sebep : ${sebep}`)
   }
 }
  if(msg.author.id === kisi){
 
       msg.reply(`Ya Özledim Nerdesin :oh_10: `)
  db.delete(`afkSebep_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkid_${msg.author.id}_${msg.guild.id}`)
  db.delete(`afkAd_${msg.author.id}_${msg.guild.id}`)
   msg.member.setNickname(isim)
   
 }
 
});
 
///////////////////////////
client.on("ready", () => {
  client.channels.get("767737044738768897").join();  ///istediğiniz kanalın idsini girin 
})