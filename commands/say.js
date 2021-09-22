module.exports = {
    name: "say",
    description: "Say anything",
    execute(message, args, Discord) {
        message.delete();
        const embed = new Discord.MessageEmbed()
            .setDescription(message.content.split(" ").slice(1).join(" "))
            .setFooter(message.author.tag, message.author.avatarURL())
            .setTimestamp();
        message.channel.send(embed);
    },
};
