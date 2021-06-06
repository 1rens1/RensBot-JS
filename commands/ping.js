module.exports = {
    name: "ping",
    description: "Pings the Discord API to the bot.",
    execute(message, args, Discord, client) {
        const embed = new Discord.MessageEmbed()
            .setTitle("**Ping**")
            .setDescription(
                `🏓 Pong! \`${Date.now() - message.createdTimestamp}ms\``
            )
            .setColor("#ff0000");
        message.channel.send(embed);
    },
};
