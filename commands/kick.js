module.exports = {
    name: "kick",
    description: "Kick's a user.",
    execute(message, args, Discord) {
        if (message.channel.type !== "dm") {
            if (message.member.hasPermission("KICK_MEMBERS")) {
                const member = message.mentions.users.first();
                if (member) {
                    try {
                        var randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                        var reason;
                        
                        const memberTarget = message.guild.members.cache.get(member.id);
                        memberTarget.kick();
                        const kickEmbed = new Discord.MessageEmbed()
                            .setColor("#00ff00")
                            .setTitle(":white_check_mark: **__" + member.tag + "__ has been kicked.**");
                        message.channel.send(kickEmbed);
                        args.shift();
                        if (args instanceof Array && args.length) {reason = args.join(" ")}
                        else {reason = "undefined"}
                        const dmEmbed = new Discord.MessageEmbed()
                        .setTitle(`You have been kicked from **__${message.guild.name}__**`)
                        .setDescription(`**Reason:** \`${reason}\``)
                        .setColor(randomColor)
                        memberTarget.send(dmEmbed)
                    } catch (err) {
                        const newEmbed = new Discord.MessageEmbed()
                            .setColor("#ff0000")
                            .setTitle(`:x: There's an error while kicking __**${member.tag}**__.`)
                            .setDescription("`Tip: I can't kick members that have higher permission than me`");
                        message.channel.send(newEmbed).then(msg =>{
                            msg.delete({timeout:3000})
                        });
                    }
                } else {
                    const newEmbed = new Discord.MessageEmbed()
                        .setColor("#ff0000")
                        .setTitle(":x: User does not exist.")
                        .setDescription("`Tip: Make sure you use @mentions`");
                    message.channel.send(newEmbed).then(msg =>{
                        msg.delete({timeout:3000})
                    });
                }
            } else {
                const newEmbed = new Discord.MessageEmbed()
                    .setColor("#ff0000")
                    .setTitle(":x: You don't have permission to kick members.");
                message.channel.send(newEmbed).then(msg =>{
                    msg.delete({timeout:3000})
                });
            }
        } else {
            const newEmbed = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle(":x: You can't use the kick command in direct messages.");
            message.channel.send(newEmbed).then(msg =>{
                msg.delete({timeout:3000})
            });
        }
    }
}