module.exports = {
    name: 'help',
    description: 'Help command',
    execute(message, args, Discord, prefix) {
        const embed = new Discord.MessageEmbed().setTitle('List of Commands.')
        .setColor('#3236a8')
        .setAuthor('Rens Help')
        .setThumbnail('https://i.ibb.co/nD793MT/rens-logo.jpg')
        .setDescription('The following commands are just for Rens bot.')
        .addFields(
            {name:`${prefix}help`, value:"Shows this message", inline:true},
            {name:`${prefix}random / ${prefix}r`, value:"Sends a random number", inline:true},
            {name:`${prefix}8ball / ${prefix}8b`, value:"Got a question?\nAsk the magic 8 ball!", inline:true},
            {name:`${prefix}ping`, value:"Shows the bot latency", inline:true},
            {name:`${prefix}kick`, value:"Kicks a person from a server", inline:true},
            {name:`${prefix}ban`, value:"Bans a person from a server", inline:true}
        )
        .setFooter("‎Bot made by: rens#4472\nVersion: Beta 0.65", message.author.avatarURL());
        message.channel.send(embed);
    }
}