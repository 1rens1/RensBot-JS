module.exports = {
    name: "botinfo",
    description: "Bot info",
    execute(message, args, Discord, prefix, botver) {
        const embed = new Discord.MessageEmbed()
            .setTitle("Rens Bot Info")
            .setColor("#3236a8")
            .setImage("https://i.imgur.com/fkPYA5R.png")
            .addFields(
                { name: "`Prefix`", value: `${prefix}`, inline: true },
                {
                    name: "`Creator`",
                    value: "[rens#0001](https://discord.com/users/758518009093685359)",
                    inline: true,
                },
                { name: "`Version`", value: `${botver}`, inline: true },
                { name: "`Written in`", value: "discord.js", inline: true }
            );
        message.channel.send(embed);
    },
};
