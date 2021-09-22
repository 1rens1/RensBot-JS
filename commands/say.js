module.exports = {
    name: "say",
    description: "Say anything",
    execute(message, args, Discord) {
        message.delete();
        const embed = new Discord.MessageEmbed()
            .setColor("RANDOM")
            .setDescription(message.content.split(" ").slice(1).join(" "))
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setTimestamp();
        message.channel.send(embed);
    },
};
