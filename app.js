const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config()

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});


console.log('                                                        ');
console.log('--------------------------------------------------------');
console.log("Taş kağıt makas botu github@devkaan tarafından. versiyon 0.0.2");
console.log("Başlamak için !tas !kagit veya !makas. Skoru sıfırlamak için !sifirla");
console.log('--------------------------------------------------------');
console.log('                                                        ');

var pcScore = 0;
var humanScore = 0;
// const command = "!bot";
arr = ['taş', 'kağıt', 'makas'];
client.on('message', msg => {
    if (msg.content === "!sifirla") {
        pcScore = 0, humanScore = 0
        console.log('--------------------------------------------------------');
        console.log('Skorlar sıfırlandı. Başlamak için !tas !kagit veya !makas');
        console.log('--------------------------------------------------------');
        msg.channel.send('Skorlar sıfırlandı. Başlamak için !tas !kagit veya !makas');
    }
    else {
        if (msg.content === ("!tas")) {
            randomInt = Math.floor(Math.random() * 3);
            pcDecision = arr[randomInt];
            console.log(pcDecision);
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
            console.log(pcDecision);
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
            console.log(pcDecision);
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
});

client.login(process.env.BOT_TOKEN);