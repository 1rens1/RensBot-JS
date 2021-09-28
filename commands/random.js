module.exports = {
    name: "random",
    description: "Sends a random number.",
    execute(message, args, Discord, prefix) {
        const arg1 = args[0];
        const arg2 = args[1];

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }

        function isInt(value) {
            return (
                !isNaN(value) &&
                parseInt(Number(value)) == value &&
                !isNaN(parseInt(value, 10))
            );
        }

        var embed;

        function sendInvalidArgError() {
            embed = new Discord.MessageEmbed()
                .setTitle(":x: Invalid arguements, expected INT/NUMBER.")
                .setDescription(
                    `Example: \`${prefix}random 10\` or \`${prefix}random 5 20\``
                )
                .setColor("#ff0000");
        }

        function sendMaxArgTooSmall() {
            embed = new Discord.MessageEmbed()
                .setTitle(":x: Max value is bigger than Min.")
                .setDescription("Make sure the max is bigger than min.")
                .setColor("#ff0000");
        }

        function sendArgsTooHighOrSmall(too) {
            embed = new Discord.MessageEmbed()
                .setTitle(":x: Your number is too " + too)
                .setDescription("Min Limit: `-10.000` Max Limit: `10.000`")
                .setColor("#ff0000");
            message.channel.send(embed);
        }

        if (!arg1 && !arg2) {
            embed = new Discord.MessageEmbed()
                .setTitle(`Random Number Between 0 to 10`)
                .setDescription(`**${getRandomInt(0, 10)}**`)
                .setFooter(
                    `You can use ${prefix}random [MAX] or ${prefix}random [MIN] [MAX]`
                )
                .setColor("#3dd4ac");
            if (parseInt(arg1) > 10000) {
            }
        }
        if (arg1 && !arg2) {
            if (parseInt(arg1) > 10000) return sendArgsTooHighOrSmall("high")
            embed = new Discord.MessageEmbed()
                .setTitle(`Random Number Between 0 to ${arg1}`)
                .setDescription(`**${getRandomInt(0, parseInt(arg1))}**`)
                .setColor("#3dd4ac");
            if (!isInt(arg1)) sendInvalidArgError();
            if (parseInt(arg1) < 0) sendMaxArgTooSmall();
        }
        if (arg1 && arg2) {
            if (parseInt(arg1) > 10000) return sendArgsTooHighOrSmall("high");
            if (parseInt(arg1) < -10000) return sendArgsTooHighOrSmall("small");
            if (parseInt(arg2) > 10000) return sendArgsTooHighOrSmall("high");
            if (parseInt(arg2) < -10000) return sendArgsTooHighOrSmall("small");
            embed = new Discord.MessageEmbed()
                .setTitle(`Random Number Between ${arg1} to ${arg2}`)
                .setDescription(
                    `**${getRandomInt(parseInt(arg1), parseInt(arg2))}**`
                )
                .setColor("#3dd4ac");
            if (!isInt(arg1) || !isInt(arg2)) sendInvalidArgError();
            if (parseInt(arg2) < parseInt(arg1)) sendMaxArgTooSmall();
        }

        message.channel.send(embed);
    },
};
