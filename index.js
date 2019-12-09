
const Discord = require('discord.js');

const client = new Discord.Client();

const Query = require("minecraft-query");

client.on('ready', () => {

    console.log('I am ready!');

});

client.on("ready", () => { client.user.setActivity("test", {type: "PLAYING"}); 
 

client.on('message', message => {

    if (message.content === 'ping') {

       message.reply('pong');

       }

});

 

// THIS  MUST  BE  THIS  WAY

client.login(process.env.BOT_TOKEN);//BOT_TOKEN is the Client Secret
