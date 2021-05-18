const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

console.log('\n--------------------------------------------------------');
console.log("Taş kağıt makas botu github@devkaan tarafından. versiyon 0.0.4");
console.log("Başlamak için !tas !kagit !makas veya !skor. Skoru sıfırlamak için !sifirla");
console.log('--------------------------------------------------------\n');

var pool = [];
var users = [];
var pcScore = 0;
var humanScore = 0;
// const command = "!bot";
arr = ['taş', 'kağıt', 'makas'];
var serverid
var servername
var userid
serverchanged = false
const botid = 840532235924013086;
var isfirst = true;
var pcScore, humanScore
client.on('message', msg => {

    userid = msg.author.id;


    if (userid != botid) {
        serverid = msg.guild.id
        if (msg.content === "!sifirla") {
            var servername = msg.guild.name
            isfirst = true
            delete pool[serverid]

            console.log('\n--------------------------------------------------------');
            console.log("ID'si  " + serverid + "  olan sunucu (" + servername + ")'nun skoru sıfırlandı. Başlamak için !tas !kagit !makas veya !skor");
            console.log('--------------------------------------------------------\n');
            msg.channel.send('Skorlar sıfırlandı. Başlamak için !tas !kagit !makas veya !skor');
        }
        else if (msg.content === "!skor") {
            var servername = msg.guild.name
            var a, b
            try {
                a = pool[serverid].pcScore
            } catch (err) {
                a = 0;
            }
            try {
                b = pool[serverid].humanScore
            } catch (error) {
                b = 0
            }
            console.log('\n--------------------------------------------------------');
            console.log("ID'si  " + serverid + "  olan sunucu (" + servername + ")'nun skoru:\nSen: " + a + " Bilgisayar: " + b);
            console.log('--------------------------------------------------------\n');
            msg.channel.send("SKOR:\nSen: " + a + " Bilgisayar: " + b);
        }
        else {
            if (isfirst) {
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


                // console.log(pcDecision);
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
                // console.log(pcDecision);
                if (arr[1] == pcDecision) {
                    msg.reply("Berabere!");
                }
                else if (arr[2] == pcDecision) {
                    pcScore++;
                    msg.reply("Bilgisayar (" + pcDecision + ") kazandı. \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                }
                else if (arr[0] == pcDecision) {
                    humanScore++;
                    msg.reply("Sen kazandın. Bilgisayar (" + pcDecision + ") \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                }

            }
            else if (msg.content === ("!makas")) {
                randomInt = Math.floor(Math.random() * 3);
                pcDecision = arr[randomInt];
                // console.log(pcDecision);
                if (arr[2] == pcDecision) {
                    msg.reply("Berabere!");
                }
                else if (arr[0] == pcDecision) {
                    pcScore++;
                    msg.reply("Bilgisayar (" + pcDecision + ") kazandı. \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                }
                else if (arr[1] == pcDecision) {
                    humanScore++;
                    msg.reply("Sen kazandın. Bilgisayar (" + pcDecision + ") \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                }
            }

            
        }
        console.log('\npool =>', pool);
    }
});

client.login(process.env.BOT_TOKEN);