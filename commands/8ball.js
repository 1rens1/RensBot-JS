module.exports = {
    name: "8ball",
    description: "The magic 8 ball.",
    execute(message, args, Discord, fetch) {
        var question;

        if (args instanceof Array && args.length) question = args.join(" ");
        else question = "?";

        var params = encodeURIComponent(question);
        var uri = "https://8ball.delegator.com/magic/JSON/" + params;
        const msg = await message.channel.send("Asking the magic 8 ball...");
        fetch(uri)
            .then((response) => response.json())
            .then((json) => {
                const embed = new Discord.MessageEmbed()
                    .setColor("#7b00ff")
                    .addFields(
                        { name: "Question", value: question, inline: true },
                        { name: "Answer", value: json.magic.answer, inline: true },
                        { name: "Type", value: json.magic.type, inline: false }
                    )
                    .setAuthor(
                        "Magic 8 Ball",
                        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/8-Ball_Pool.svg/1024px-8-Ball_Pool.svg.png"
                    )
                    .setFooter(
                        `Asked by ${message.author.tag}`,
                        message.author.avatarURL()
                    );
                msg.edit(embed);
            });
    },
};
