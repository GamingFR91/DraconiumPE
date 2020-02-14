const Discord = require("discord.js"); // We Call The Packages.
// const PREFIX = "<"; // You can change this Prefix to whatever you want.
const PREFIX = process.env.PREFIX;
const Query = require("minecraft-query");
var request = require('request');

var bot = new Discord.Client();

// Events.
bot.on("ready", function() {
    bot.user.setActivity('d!help | Draconium', { type: 'STREAMING' });
    console.log(`${bot.user.username} est Prêt!`);
});

bot.on('guildMemberAdd', member => {

    member.guild.channels.get('652994649497010176').send('Hey **' + member.user.username + '**, bienvenue sur le meilleur le plus chili serveur  ---> **Draconium [Faction MC:BE]** amuse toi sur ce serveur 0 insulte 100% chili le meilleur moyen de ce faire des potes :tada::hugging: !'); 

});

bot.on('guildMemberRemove', member => {

    member.guild.channels.get('652995719703166995').send('**' + member.user.username + '** vien juste de quitter le serveur nous espérons te revoir très prochainement :slight_frown:');

    //

});

bot.on("message", function(message) {

    if (message.author.bot) return;

    if (!message.guild) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");
    var command = args[0].toLowerCase();

// Commands.
    
    if(command == ip) {
    var url = 'http://mcapi.us/server/query?ip=draconium.ouimc.fr&port=25561';
        request(url, function(err, response, body) {
            if(err) {
                console.log(err);
                return message.reply('Une erreur a eu lieu pendent la récupération du Status du Serveur');
            }
            body = JSON.parse(body);
            var status = ;
            if(body.online) {
                status = new Discord.RichEmbed()

            .setAuthor("Draconium")

            .addField("📡IP:", "draconium.ouimc.fr")

            .addField("🛰️Port:", "25561")
        
            .addField("<:MCPE_Logo:652637305999458354>Minecraft:", "1.14")
        
            .addField("<:online:675622232155881495>Status:", "En Ligne")
                
            .addField("Joueurs:", body.players.now + "/" + body.players.max)

            .setColor(0xFF0011)

            .setFooter("Ⓒ 2019-2020 Draconium.", bot.user.displayAvatarURL);
            }
             

else {
                    status += new Discord.RichEmbed()

            .setAuthor("Draconium")

            .addField("📡IP:", "draconium.ouimc.fr")

            .addField("🛰️Port:", "25561")
        
            .addField("<:MCPE_Logo:652637305999458354>Minecraft:", "1.14")
        
            .addField("<:offline:677930869599764496>Status:", "Hors Ligne")

            .setColor(0xFF0011)

            .setFooter("Ⓒ 2019-2020 Draconium.", bot.user.displayAvatarURL);;
                }
            }
            message.reply(status);
        });
    };
    
    if (command == "help") {
        var embedhelpmember = new Discord.RichEmbed()
            .setAuthor("💬 Liste des Commandes.")
            .addField(" - avatar", "Affiche ton avatar.")
            .addField(" - ping", "PING PONG.")
            .addField(" - ip", "Affiche l'IP et le Port du serveur.")
            .setColor(0xFF0011)
            .setFooter("Ⓒ 2019-2020 Draconium.", bot.user.displayAvatarURL);
        var embedhelpadmin = new Discord.RichEmbed()
            .setAuthor("💬 Commandes de Modération.")
            .addField(" - clear", "Clear jusqu'à **99** Messages.")
            .addField(" - kick", "Expulser un membre du serveur.")
            .setColor(0xFF0011)
            .setFooter("Ⓒ 2019-2020 Draconium.", bot.user.displayAvatarURL);
            message.channel.send(embedhelpmember);
            message.channel.send(embedhelpadmin);
    };
   

    
    if (command == "lll") {

        var embedserverip = new Discord.RichEmbed()

            .setAuthor("Draconium")

            .addField("📡IP:", "draconium.ouimc.fr")

            .addField("🛰️Port:", "25561")
        
            .addField("<:MCPE_Logo:652637305999458354>Minecraft:", "1.14")
        
            .addField("<:online:675622232155881495>Status:", "En Ligne")

            .setColor(0xFF0011)

            .setFooter("Ⓒ 2019-2020 Draconium.", bot.user.displayAvatarURL);

        message.channel.send(embedserverip);


       };

    };

    if (command == "avatar") {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        message.channel.send({
               embed: {
                  title: `Photo de profil de ${member.user.username}:`,
                  image: {
                      url: member.user.displayAvatarURL
                  },
                  color: 0xFF0011
               }
        })
    };

    if (command == "ping") {
        message.channel.send("**:ping_pong: PONG!**");
    };
    
    if (command == "test") {
        message.channel.send("Pas de test pour le moment");
    };

    if(command === "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("**🔒 Sorry, you can't do that.**");
        var messagesToDelete = args[1];
        if (!args[1]) return message.channel.send("❌ Merci de donner le nombre de messages à Clear.");

        if (args[1] > 99) return message.channel.send("❌ Je ne peux pas Clear Plus de 99 Messages.");
        message.channel.fetchMessages({limit: messagesToDelete})
        .then(messages => message.channel.bulkDelete(messages.size + 1))
        .catch(error => message.channel.send(`❌ Désolé ${message.author}, Échec du Clear car: *${error}*.`));
    };

    if(command == "kick") {
        message.delete()
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("❌ Merci de **@mention** la personne à Expulser!");
        let kReason = args.join(" ").slice(0);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**🔒 Désolé, tu ne peux pas faire ça.**");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ Échec du Kick, j'ai besoin d'un rôle plus haut.");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("**👢 Kicked**")
        .setColor(0xFF0011)
        .addField("Personne", `${kUser}`)
        .addField("Modérateur", `<@${message.author.id}>`)
        .addField("Raison", `**\`\`\`${kReason}\`\`\`**`);
    
        let adminlog = message.guild.channels.find(`name`, "【❗】logs");
        if(!adminlog) return message.channel.send("❌ Désolé, j'ai besoin de me connecter dans un channel de logs.");
        message.guild.member(kUser).kick(kReason);
        adminlog.send(kickEmbed);
    };

});

// Bot Login.
// bot.login('YourAwesomeBotToken');
bot.login(process.env.BOT_TOKEN);
