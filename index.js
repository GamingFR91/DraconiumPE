const Discord = require('discord.js');
const client = new Discord.Client();
client.login("NjU3MTQ5ODM4MjUyODM0ODE2.XmiqgA.G3RYZrgZPnlIMYlL5G3vUViVd4Q");

var request = require('request');
var mcCommand = 't!ip'; // Command for triggering
var mcIP = 'sulfuritium.mcpe.dev'; // Your MC server IP or hostname address
var mcPort = 19132; // Your MC server port (25565 is the default)

// IMPORTANT: You need to run "npm install request" (without quotes) in your terminal before executing this script

client.on('message', message => {
    if (message.content === mcCommand) {
        var url = 'http://mcapi.us/server/query?ip=' + mcIP + '&port=' + mcPort;
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.channel.send('Une erreur a eu lieu pendant la récuperation du status du serveur');
            }
            body = JSON.parse(body);
            var status = '**Sulfuritium**\nIP: sulfuritium.mcpe.dev\nPort: 19132\nStatus: Hors Ligne';
            if(body.online) {
                status = '**Sulfuritium**\nIP: sulfuritium.mcpe.dev\nPort: 19132\nStatus: En Ligne\nConnectés: ' + body.players.now + '/' + body.players.max;
              
            }
            message.channel.send(status);
        });
    }
});
