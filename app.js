const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("!yardim", {
        type: "LISTENING",
      });
});



var pool = [];
commands = "!tas !kagit !makas !skor !sifirla !yardim !hata";
commandsForDiscord = `!tas` `!kagit` `!makas` `!sifirla` `!skor` `!yardim` `!hata`
var users = [];
var pcScore = 0;
var humanScore = 0;
// const command = "!bot";
arr = ['taş', 'kağıt', 'makas'];
var serverid
var servername
var userid
const botid = 840532235924013086;
developerNick = "devkaan#6560"
developerID = 317264858674626560
issent = false
setTimeoutBool = false
prefix = "!";

maintenance = false; // !!! DANGERUOS !!!. just use for MAINTENANCE

console.log('\n--------------------------------------------------------');
console.log("Taş kağıt makas botu github@devkaan tarafından yapıldı. Güncel versiyon 0.1.2");
console.log("Başlamak için "+commands + " komutlarını kullanabilirsin.");
console.log('--------------------------------------------------------\n');


client.on('message', msg => {
    userid = msg.author.id;
    if (!msg.author.bot && msg.channel.type !== "dm") {
        if (!maintenance && msg.content.startsWith(prefix)) {
            serverid = msg.guild.id
            if (msg.content === "!sifirla") {
                servername = msg.guild.name
                delete pool[serverid]
                pcScore = 0
                humanScore = 0
                console.log('\n--------------------------------------------------------');
                console.log("ID'si  " + serverid + "  olan sunucu (" + servername + ")'nun skoru sıfırlandı. Başlamak için "+commands+" komutlarını kullanabilirsin.");
                console.log('--------------------------------------------------------\n');
                msg.channel.send("Skorunuz sıfırlandı. Başlamak için "+commandsForDiscord+" komutlarını kullanabilirsin. :)");
            }
            else if (msg.content === "!yardim") {
                console.log(msg.author);
                msg.channel.send("Merhaba <@" + msg.author.id + ">, Ben Taş Kağıt Makas Botu (Taş Kağıt Makas#9379).\n\nBaşlamak için "+commandsForDiscord+" komutlarını kullanabilirsin. :)");
            }
            else if (msg.content == "!hata") {
                msg = "Bir hata bulduysan <@" + developerID + "> adlı kullanıcıya hatanın fotoğrafını atabilir misin?";
                client.users.fetch(userid, false).then((user) => {
                    user.send(msg);
                });
            }
            else if (msg.content === "!skor") {
                var servername = msg.guild.name
                var a, b
                try {
                    a = pool[serverid].humanScore
                } catch (err) {
                    a = 0;
                }
                try {
                    b = pool[serverid].pcScore
                } catch (error) {
                    b = 0
                }
                console.log('\n--------------------------------------------------------');
                console.log("ID'si  " + serverid + "  olan sunucu (" + servername + ")'nun skoru:\nsen: " + a + " bilgisayar: " + b);
                console.log('--------------------------------------------------------\n');
                msg.channel.send("SKOR:\nsen: " + a + " bilgisayar: " + b);
            }
            // !tas !kagit !makas
            else {
                if (!pool[serverid]) {
                    isfirst = false;
                    console.log('isfirst = false');
                    pool[serverid] = {
                        pcScore: 0,
                        humanScore: 0
                    }
                }
                if (msg.content === ("!tas")) {
                    randomInt = Math.floor(Math.random() * 3);
                    pcDecision = arr[randomInt];
                    if (arr[0] == pcDecision) {
                        msg.reply("Berabere!");
                    }
                    else if (arr[1] == pcDecision) {
                        try {
                            pcScore = pool[serverid].pcScore
                        } catch (error) {
                            pcScore = 0
                        }
                        try {
                            pcScore++
                            pool[serverid].pcScore = (pcScore)
                        } catch (error) {
                            pool[serverid].pcScore = 1
                        }
                        msg.reply("Bilgisayar (" + pcDecision + ") kazandı. \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                    }
                    else if (arr[2] == pcDecision) {
                        try {
                            humanScore = pool[serverid].humanScore
                        } catch (error) {
                            humanScore = 0
                        }
                        try {
                            humanScore++;
                            pool[serverid].humanScore = (humanScore)
                        } catch (error) {
                            pool[serverid].humanScore = 1
                        }
                        msg.reply("Sen kazandın. Bilgisayar (" + pcDecision + ") \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                    }

                }
                else if (msg.content === ("!kagit")) {
                    randomInt = Math.floor(Math.random() * 3);
                    pcDecision = arr[randomInt];
                    if (arr[1] == pcDecision) {
                        msg.reply("Berabere!");
                    }
                    else if (arr[2] == pcDecision) {
                        try {
                            pcScore = pool[serverid].pcScore
                        } catch (error) {
                            pcScore = 0
                        }
                        try {
                            pcScore++
                            pool[serverid].pcScore = (pcScore)
                        } catch (error) {
                            pool[serverid].pcScore = 1
                        }
                        msg.reply("Bilgisayar (" + pcDecision + ") kazandı. \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                    }
                    else if (arr[0] == pcDecision) {
                        try {
                            humanScore = pool[serverid].humanScore
                        } catch (error) {
                            humanScore = 0
                        }
                        try {
                            humanScore++;
                            pool[serverid].humanScore = (humanScore)
                        } catch (error) {
                            pool[serverid].humanScore = 1
                        }
                        msg.reply("Sen kazandın. Bilgisayar (" + pcDecision + ") \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                    }

                }
                else if (msg.content === ("!makas")) {
                    randomInt = Math.floor(Math.random() * 3);
                    pcDecision = arr[randomInt];
                    if (arr[2] == pcDecision) {
                        msg.reply("Berabere!");
                    }
                    else if (arr[0] == pcDecision) {
                        try {
                            pcScore = pool[serverid].pcScore
                        } catch (error) {
                            pcScore = 0
                        }
                        try {
                            pcScore++
                            pool[serverid].pcScore = (pcScore)
                        } catch (error) {
                            pool[serverid].pcScore = 1
                        }
                        msg.reply("Bilgisayar (" + pcDecision + ") kazandı. \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                    }
                    else if (arr[1] == pcDecision) {
                        try {
                            humanScore = pool[serverid].humanScore
                        } catch (error) {
                            humanScore = 0
                        }
                        try {
                            humanScore++;
                            pool[serverid].humanScore = (humanScore)
                        } catch (error) {
                            pool[serverid].humanScore = 1
                        }
                        msg.reply("Sen kazandın. Bilgisayar (" + pcDecision + ") \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                    }
                }
            }
            console.log('\npool =>', pool);
        }
        else {
            if (!issent) {
                issent = true;
                msg.reply("Bot şuan bakımda. Lütfen daha sonra deneyin.");
            }

            if (!setTimeoutBool) {
                setTimeoutBool = true
                setTimeoutCount = 20 // second
                setTimeout(() => {
                    setTimeoutBool = false
                    issent = false
                }, setTimeoutCount * 1000)
            }
        }
    }
});

client.login(process.env.BOT_TOKEN);