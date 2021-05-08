const config = require('./config.json')

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

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

client.login(config.token);