module.exports = {
    name: "kick",
    description: "kick's a user.",
    execute(message, args, Discord, prefix) {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS")) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(":x: You don't have permission to kick members!")
                    .setDescription("Required permission: `Kick Members`")
                    .setColor("#ff0000");
                return message.channel.send(embed).then((msg) => {msg.delete({ timeout: 3000 })})
            }
            if (!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send("I don't have permission to kick members.").then((msg) => {msg.delete({ timeout: 3000 })})
            if (!args[0]) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Usage: \`${prefix}kick <USER> [REASON]\``)
                    .setDescription("Required permission: `Kick Members`")
                    .setColor("#ff0000");
                return message.channel.send(embed);
            }
            
            var kickMember = message.mentions.members.first();
            try {
                if (
                    kickMember.roles.highest.position >= message.member.roles.highest.position ||
                    kickMember.roles.highest.position >= message.guild.me.roles.highest.position||
                    kickMember.id === message.guild.ownerID
                    ) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`:x: You/I don't have permission to kick __${kickMember.user.tag}__`)
                        .setColor("#ff0000");
                    return message.channel.send(embed).then((msg) => {msg.delete({ timeout: 3000 })})
                }
            } catch (err) {
                message.channel.send(`\`\`\`${err.message}\`\`\``);
            }
            if (!kickMember) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(":x: User does not exist.")
                    .setColor("#ff0000");
                return message.channel.send(embed).then((msg) => {msg.delete({ timeout: 3000 })});
            }

            if (kickMember.id === message.member.id) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(":x: You can't kick yourself!")
                    .setColor("#ff0000");
                return message.channel.send(embed).then((msg) => {msg.delete({ timeout: 3000 })})
            }

            if (!kickMember.kickable) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(":x: Can't kick this user.")
                    .setColor("#ff0000");
                return message.channel.send(embed).then((msg) => {msg.delete({ timeout: 3000 })})
            }

            var reason = args.slice(1).join(" ");
            if (!reason) reason = "No reason."
            try {
                var randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                const dmembed = new Discord.MessageEmbed()
                    .setColor(randomColor)
                    .setTitle(`You have been kicked from **__${message.guild.name}__**`)
                    .setDescription(`**Reason:** \`${reason}\``)
                    .setFooter(message.guild.name, message.guild.iconURL())
                kickMember.send(dmembed).then(() =>
                    kickMember.kick()).catch(() => null)
            } catch {
                kickMember.kick()
            }
            var sembed = new Discord.MessageEmbed()
                .setColor("#00ff00")
                .setTitle(`:white_check_mark: **__${kickMember.user.tag}__** has been kicked`)
                .setDescription(`Reason: \`${reason}\``)
            message.channel.send(sembed);
            message.delete();
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};
