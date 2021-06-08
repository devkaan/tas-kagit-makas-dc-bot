const Discord = require('discord.js');
const client = new Discord.Client();
const fs = require('fs');
var format = require('date-format');
require('dotenv').config()




var version = "1.0.0";
var commandsText = "-tas  -kagit  -makas  -skor  -sifirla  -yardim  -hata";
var commandsForDiscord = "`-tas`  `-kagit`  `-makas`  `-sifirla`  `-skor`  `-yardim`  `-hata`"
var pool = {}, users = [], pcScore = 0, humanScore = 0;
// const command = "-bot";

var arr = ['taş', 'kağıt', 'makas'], serverid, servername, userid, isAdministrator = false, isDeveloper = false
const prefix = "-",
    commands = [`${prefix}tas`, `${prefix}kagit`, `${prefix}makas`, `${prefix}skor`, `${prefix}sifirla`, `${prefix}yardim`, `${prefix}hata`,],
    botid = 840532235924013086,
    developerNick = "devkaan#6560",
    developerID = 317264858674626560,
    saveFileDir = "save.json"

var maintenance = false, // !!! DANGERUOS !!!. just use for MAINTENANCE
    setTimeoutBool = false,
    issent = false
const getJSON = (fullpathname) => {
    return new Promise((resolve, reject) => {
        fs.readFile(fullpathname, (err, data) => {
            if (err) {
                reject(err)  // calling `reject` will cause the promise to fail with or without the error passed as an argument
                return        // and we don't want to go any further
            }
            resolve(JSON.parse(data))
        })
    })
}

console.log('\n--------------------------------------------------------');
console.log("Taş kağıt makas discord botu " + developerNick + " tarafından yapıldı. Güncel versiyon " + version);
console.log("Başlamak için " + commandsText + " komutlarını kullanabilirsin.");
console.log('--------------------------------------------------------\n');


client.on('ready', async () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("-yardim", {
        type: "LISTENING",
    });
    console.log(`Bot activity is set!`);
    if (!fs.existsSync(saveFileDir)) {
        let content = {}
        content = JSON.stringify(content)
        await fs.writeFile(saveFileDir, content, function (err) {
            if (err) throw err;
            console.log('Save File is created at START successfully.');
            console.log('\n');
        });
    } else {
        pool = await getJSON(saveFileDir)
        console.log(pool);
    }
});

client.on('message', async message => {
    userid = message.author.id;
    try {
        isAdministrator = message.member.hasPermission("ADMINISTRATOR")
    } catch (roleError) {
        isAdministrator = false
    }
    isDeveloper = (userid == developerID);

    if (message.content === `${prefix}tkm_maintenance1` && isDeveloper) {
        if (maintenance) {
            textMessage = `<@${developerID}>\nBakım modu zaten aktif.`
        } else {
            maintenance = true
            textMessage = `<@${developerID}>\nBakım modu aktif edildi.`
        }
        await client.users.fetch(userid, false).then((user) => {
            textMessage += `\nTarih: ${format.asString('dd/mm/yyyy hh:mm:ss', new Date())}`
            user.send(textMessage);
        });
    }
    else if (message.content === `${prefix}tkm_maintenance0` && isDeveloper) {
        if (maintenance) {
            maintenance = false
            textMessage = `<@${developerID}>\nBakım modu devre dışı bırakıldı.`
        } else {
            textMessage = `<@${developerID}>\nBakım modu zaten devre dışı.`
        }
        await client.users.fetch(userid, false).then((user) => {
            textMessage += `\nTarih: ${format.asString('dd/mm/yyyy hh:mm:ss', new Date())}`
            user.send(textMessage);
        });
    }
    else if (message.content === `${prefix}tkm_version` && isDeveloper) {
        textMessage = `Güncel versiyon: ${version}\nTarih: ${format.asString('dd/mm/yyyy hh:mm:ss', new Date())}`
        await client.users.fetch(userid, false).then((user) => {
            user.send(textMessage);
        });
    }

    if (!message.author.bot && message.channel.type !== "dm") {
        if (maintenance) {
            if (message.content.startsWith(prefix)) {
                if (!issent) {
                    issent = true;
                    message.reply("Bot şuan bakımda. Lütfen daha sonra deneyin.");
                    console.log("Bot şuan bakımda. Lütfen daha sonra deneyin.");
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
        else {
            serverid = message.guild.id
            if (message.content === `${prefix}sifirla` && isAdministrator) {
                varservername = message.guild.name
                delete pool[serverid]
                pcScore = 0
                humanScore = 0
                console.log('\n--------------------------------------------------------');
                console.log("ID'si  " + serverid + "  olan sunucu (" + servername + ")'nun skoru sıfırlandı. Başlamak için " + commandsText + " komutlarını kullanabilirsin.");
                console.log('--------------------------------------------------------\n');
                message.channel.send("Skorunuz sıfırlandı. Başlamak için " + commandsForDiscord + " komutlarını kullanabilirsin. :)");
            }
            else if (message.content === `${prefix}yardim`) {
                message.channel.send("Merhaba <@" + message.author.id + ">, Ben Taş Kağıt Makas Botu (Taş Kağıt Makas#9379).\n\nBaşlamak için " + commandsForDiscord + " komutlarını kullanabilirsin. :)");
            }
            else if (message.content === `${prefix}hata`) {
                textMessage = `Bir hata bulduysan/olduğunu düşünüyorsan <@${developerID}> adlı kullanıcıya mesaj gönderebilirsin.`;
                await client.users.fetch(userid, false).then((user) => {
                    user.send(textMessage);
                });
            }
            else if (message.content === `${prefix}skor`) {
                var servername = message.guild.name
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
                message.channel.send("Skorunuz: " + a + "\nBilgisayarın skoru: " + b);
            }
            else if (message.content === `${prefix}kaydet`) {
                if (!fs.existsSync(saveFileDir)) {
                    let content = {}
                    content = JSON.stringify(content)
                    fs.writeFile(saveFileDir, content, function (err) {
                        if (err) throw err;
                        console.log('Save File is created at SAVE successfully.');
                        console.log('\n');
                    });
                } else {
                    var content = pool
                    content.lastChanged = new Date().getTime();
                    fs.writeFile(saveFileDir, JSON.stringify(content), function (err) {
                        if (err) throw err;
                        console.log('Skorunuz başarıyla kaydedildi.');
                        console.log('\n');
                    });
                    message.channel.send(`Skorunuz başarıyla kaydedildi.`);
                }
            }
            // !tas !kagit !makas
            else {
                if (!pool[serverid]) {
                    isfirst = false;
                    pool[serverid] = {
                        pcScore: 0,
                        humanScore: 0
                    }
                }
                if (message.content === ("-tas")) {
                    randomInt = Math.floor(Math.random() * 3);
                    pcDecision = arr[randomInt];
                    if (arr[0] == pcDecision) {
                        message.reply("Berabere!");
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
                        message.reply("Bilgisayar (" + pcDecision + ") kazandı. \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
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
                        message.reply("Sen kazandın. Bilgisayar (" + pcDecision + ") \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                    }

                }
                else if (message.content === ("-kagit")) {
                    randomInt = Math.floor(Math.random() * 3);
                    pcDecision = arr[randomInt];
                    if (arr[1] == pcDecision) {
                        message.reply("Berabere!");
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
                        message.reply("Bilgisayar (" + pcDecision + ") kazandı. \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
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
                        message.reply("Sen kazandın. Bilgisayar (" + pcDecision + ") \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                    }

                }
                else if (message.content === ("-makas")) {
                    randomInt = Math.floor(Math.random() * 3);
                    pcDecision = arr[randomInt];
                    if (arr[2] == pcDecision) {
                        message.reply("Berabere!");
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
                        message.reply("Bilgisayar (" + pcDecision + ") kazandı. \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
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
                        message.reply("Sen kazandın. Bilgisayar (" + pcDecision + ") \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                    }
                }
            }

        }
    }
});

client.login(process.env.BOT_TOKEN);