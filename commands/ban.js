module.exports = {
    name: "ban",
    description: "Ban's a user.",
    execute(message, args, Discord) {
        if (message.channel.type !== "dm") {
            if (message.member.hasPermission("ban_MEMBERS")) {
                const member = message.mentions.users.first();
                if (member) {
                    try {
                        var randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
                        var reason;
                        
                        const memberTarget = message.guild.members.cache.get(member.id);
                        memberTarget.ban();
                        const banEmbed = new Discord.MessageEmbed()
                            .setColor("#00ff00")
                            .setTitle(":white_check_mark: **__" + member.tag + "__ has been banned.**");
                        message.channel.send(banEmbed);
                        args.shift();
                        if (args instanceof Array && args.length) {reason = args.join(" ")}
                        else {reason = "undefined"}
                        const dmEmbed = new Discord.MessageEmbed()
                            .setTitle(`You have been banned from **__${message.guild.name}__**`)
                            .setDescription(`**Reason:** \`${reason}\``)
                            .setColor(randomColor)
                        memberTarget.send(dmEmbed)
                    } catch (err) {
                        const newEmbed = new Discord.MessageEmbed()
                            .setColor("#ff0000")
                            .setTitle(`:x: There's an error while banning __**${member.tag}**__.`);
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
                    .setTitle(":x: You don't have permission to ban members.")
                    .setDescription("Required permission: `Ban Members`");
                message.channel.send(newEmbed).then(msg =>{
                    msg.delete({timeout:3000})
                });
            }
        } else {
            const newEmbed = new Discord.MessageEmbed()
                .setColor("#ff0000")
                .setTitle(":x: You can't use the ban command in direct messages.");
            message.channel.send(newEmbed).then(msg =>{
                msg.delete({timeout:3000})
            });
        }
    }
}