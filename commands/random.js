module.exports = {
    name: "random",
    description: "Sends a random number from 0-10.",
    execute(message, args, Discord) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Random Number")
            .setDescription(`**${Math.round(Math.random() * 10)}**`)
            .setColor("#3dd4ac");
        message.channel.send(embed);
    },
};
