const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

console.log('\n--------------------------------------------------------');
console.log("Taş kağıt makas botu github@devkaan tarafından. versiyon 0.0.3");
console.log("Başlamak için !tas !kagit veya !makas. Skoru sıfırlamak için !sifirla");
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
client.on('message', msg => {

    userid = msg.author.id;


    if (userid != botid) {
       serverid = msg.guild.id
        if (msg.content === "!sifirla") {
            var servername = msg.guild.name
            delete pool[serverid]

            console.log('\n--------------------------------------------------------');
            console.log("ID'si  " + serverid + "  olan sunucu (" + servername + ")'nun skoru sıfırlandı. Başlamak için !tas !kagit veya !makas");
            console.log('--------------------------------------------------------\n');
            msg.channel.send('Skorlar sıfırlandı. Başlamak için !tas !kagit veya !makas');
        }
        else {
            if (msg.content === ("!tas")) {
                randomInt = Math.floor(Math.random() * 3);
                pcDecision = arr[randomInt];
                // console.log(pcDecision);
                if (arr[0] == pcDecision) {
                    msg.reply("Berabere!");
                }
                else if (arr[1] == pcDecision) {
                    pcScore++;
                    msg.reply("Bilgisayar (" + pcDecision + ") kazandı. \nSKOR sen: " + humanScore + " bilgisayar: " + pcScore);
                }
                else if (arr[2] == pcDecision) {
                    humanScore++;
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

            pool[serverid] = {
                pcScore,
                humanScore
            }
        }
        console.log('\npool =>', pool);
    }
});

client.login(process.env.BOT_TOKEN);