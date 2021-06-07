module.exports = {
    name: "ban",
    description: "Ban's a user.",
    execute(message, args, Discord, prefix) {
        try {
            if (!message.member.hasPermission("BAN_MEMBERS")) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(":x: You don't have permission to ban members!")
                    .setDescription("Required permission: `Ban Members`")
                    .setColor("#ff0000");
                return message.channel.send(embed).then((msg) => {msg.delete({ timeout: 3000 })})
            }
            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send("I don't have permission to ban members.").then((msg) => {msg.delete({ timeout: 3000 })})
            if (!args[0]) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Usage: \`${prefix}ban <USER> [REASON]\``)
                    .setDescription("Required permission: `Ban Members`")
                    .setColor("#ff0000");
                return message.channel.send(embed);
            }
            
            var banMember = message.mentions.members.first();
            try {
                if (
                    banMember.roles.highest.position >= message.member.roles.highest.position ||
                    banMember.roles.highest.position >= message.guild.me.roles.highest.position||
                    banMember.id === message.guild.ownerID
                    ) {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`:x: You/I don't have permission to ban __${banMember.user.tag}__`)
                        .setColor("#ff0000");
                    return message.channel.send(embed).then((msg) => {msg.delete({ timeout: 3000 })})
                }
            } catch (err) {
                message.channel.send(`\`\`\`${err.message}\`\`\``);
            }
            if (!banMember) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(":x: User does not exist.")
                    .setColor("#ff0000");
                return message.channel.send(embed).then((msg) => {msg.delete({ timeout: 3000 })});
            }

            if (banMember.id === message.member.id) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(":x: You can't ban yourself!")
                    .setColor("#ff0000");
                return message.channel.send(embed).then((msg) => {msg.delete({ timeout: 3000 })})
            }

            if (!banMember.bannable) {
                const embed = new Discord.MessageEmbed()
                    .setTitle(":x: Can't ban this user.")
                    .setColor("#ff0000");
                return message.channel.send(embed).then((msg) => {msg.delete({ timeout: 3000 })})
            }

            var reason = args.slice(1).join(" ");
            if (!reason) reason = "No reason."
            try {
                var randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                const dmembed = new Discord.MessageEmbed()
                    .setColor(randomColor)
                    .setTitle(`You have been banned from **__${message.guild.name}__**`)
                    .setDescription(`**Reason:** \`${reason || "No reason."}\``)
                    .setFooter(message.guild.name, message.guild.iconURL())
                banMember.send(dmembed).then(() =>
                    banMember.ban()).catch(() => null)
            } catch {
                banMember.ban()
            }
            var sembed = new Discord.MessageEmbed()
                .setColor("#00ff00")
                .setTitle(`:white_check_mark: **__${banMember.user.tag}__** has been banned`)
                .setDescription(`Reason: \`${reason}\``)
            message.channel.send(sembed);
            message.delete();
        } catch (e) {
            return message.channel.send(`**${e.message}**`)
        }
    }
};
