const Discord = require("discord.js"); // We Call The Packages.
// const PREFIX = "<"; // You can change this Prefix to whatever you want.
const PREFIX = process.env.PREFIX;

var bot = new Discord.Client();

// Events.
bot.on("ready", function() {
    bot.user.setGame(`/help | Draconium`);
    console.log(`${bot.user.username} is Ready!`);
});

bot.on("message", function(message) {

    if (message.author.bot) return;

    if (!message.guild) return;

    if (!message.content.startsWith(PREFIX)) return;
    
    var args = message.content.substring(PREFIX.length).split(" ");
    var command = args[0].toLowerCase();

// Commands.
    if (command == "help") {
        var embedhelpmember = new Discord.RichEmbed()
            .setAuthor("💬 Liste des Commandes.")
            .addField(" - avatar", "Montre ta Photo de Profil.")
            .addField(" - ping", "PING PONG.")
            .setColor(0x00FFEE)
            .setFooter("Ⓒ 2019 Example Bot.", bot.user.displayAvatarURL);
        var embedhelpadmin = new Discord.RichEmbed()
            .setAuthor("💬 Commandes de Modération.")
            .addField(" - clear", "Clear jusqu'à`99` Messages.")
            .addField(" - kick", "Kick quelqu'un du serveur.")
            .setColor(0x00FFEE)
            .setFooter("Ⓒ 2019 Draconium.", bot.user.displayAvatarURL);
            message.channel.send(embedhelpmember)
        if(message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embedhelpadmin);
    };

    if (command == "avatar") {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        message.channel.send({
               embed: {
                  title: `${member.displayAvatarURL}'s Profile Picture.`,
                  image: {
                      url: member.AvatarURL
                  },
                  color: 0x00FFEE
               }
        })
    };

    if (command == "ping") {
        message.channel.send("**:ping_pong: PONG!**");
    };

    if(command === "clear") {
        if (!message.member.hasPermission('MANAGE_MESSAGES')) return message.reply("**🔒 Sorry, you can't do that.**");
        var messagesToDelete = args[1];
        if (!args[1]) return message.channel.send("❌ Merci de donner le nombre de message à Clear!");
        if (args[1] > 99) return message.channel.send("❌ Je ne peux pas **Clear** plus de `99` Messages.");
        message.channel.fetchMessages({limit: messagesToDelete})
        .then(messages => message.channel.bulkDelete(messages.size + 1))
        .catch(error => message.channel.send(`❌ Désolé ${message.author}, Échec du **Clear** car: *${error}*.`));
    };

    if(command == "kick") {
        message.delete()
        let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
        if(!kUser) return message.channel.send("❌ Merci de **@mention** la personne à Expulser!");
        let kReason = args.join(" ").slice(0);
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("**🔒 Sorry, you can't do that.**");
        if(kUser.hasPermission("KICK_MEMBERS")) return message.channel.send("❌ Échec Du **Kick**, besoin d'un rôle plus haut que le sien.");
    
        let kickEmbed = new Discord.RichEmbed()
        .setDescription("**👢 Kick**")
        .setColor(0xFF0000)
        .addField("Utilisateur", `${kUser}`)
        .addField("Moderateurr", `<@${message.author.id}>`)
        .addField("Raison", `**\`\`\`${kReason}\`\`\`**`);
    
        let adminlog = message.guild.channels.find(`name`, "mod-logs");
        if(!adminlog) return message.channel.send("❌ Sorry, i need the Logging Channels with name **#mod-logs**.");
        message.guild.member(kUser).kick(kReason);
        adminlog.send(kickEmbed);
    };
    
    if (command == "help") {
        var embedhelpmember = new Discord.RichEmbed()
            .setAuthor("💬 Liste des Commandes.")
            .addField(" - avatar", "Montre ta Photo de Profil.")
            .addField(" - ping", "PING PONG.")
            .setColor(0x00FFEE)
            .setFooter("Ⓒ 2019 Example Bot.", bot.user.displayAvatarURL);
        var embedhelpadmin = new Discord.RichEmbed()
            .setAuthor("💬 Commandes de Modération.")
            .addField(" - clear", "Clear jusqu'à`99` Messages.")
            .addField(" - kick", "Kick quelqu'un du serveur.")
            .setColor(0x00FFEE)
            .setFooter("Ⓒ 2019 Draconium.", bot.user.displayAvatarURL);
            message.channel.send(embedhelpmember)
        if(message.member.hasPermission('MANAGE_MESSAGES')) return message.channel.send(embedhelpadmin);
};
});

// Bot Login.
// bot.login('YourAwesomeBotToken');
bot.login(process.env.BOT_TOKEN);
