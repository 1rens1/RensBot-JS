module.exports = {
    name: '8ball',
    description: 'The magic 8 ball.',
    execute(message, args, Discord) {
        const answers = [
            "It is certain",
            "It is decidedly so",
            "Without a doubt",
            "Yes, definitely",
            "You may rely on it",
            "As I see it, yes",
            "Most likely",
            "Outlook good",
            "Yes",
            "Signs point to yes",
            "Reply hazy try again",
            "Ask again later",
            "Better not tell you now",
            "Cannot predict now",
            "Concentrate and ask again",
            "Don't count on it",
            "My reply is no",
            "My sources say no",
            "Outlook not so good",
            "Very doubtful"
        ]
        var answer = answers[Math.floor(Math.random() * answers.length)];
        var question;
        // var question = args.join(" ");

        if (args instanceof Array && args.length) {question = args.join(" ")}
        else {question = "?"}
        const embed = new Discord.MessageEmbed().setDescription(`What's <@${message.author.id}> question today?`)
        .setColor("#7b00ff")
        .addFields(
            {name:"Question", value:question, inline:true},
            {name:"Answer", value:answer, inline:true}
        )
        .setAuthor("Magic 8 Ball", "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fd/8-Ball_Pool.svg/1024px-8-Ball_Pool.svg.png")
        .setFooter(`Asked by ${message.author.tag}`, message.author.avatarURL());
        message.channel.send(embed);
    }
}