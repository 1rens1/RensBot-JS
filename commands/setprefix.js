const fs = require("fs");

module.exports = {
    name: "setprefix",
    description: "Changes the server prefix",
    execute(client, message, args, Discord, prefix) {
        if (!message.member.hasPermission("MANAGE_GUILD")) {
            const embed = new Discord.MessageEmbed()
                .setTitle(":x: You don't have permission to do that!")
                .setDescription("Required permission: `Manage Server`")
                .setColor("#ff0000");
            message.channel.send(embed).then((msg) => {
                msg.delete({ timeout: 3000 });
            });
        } else {
            if (args[0]) {
                if (args[0].length <= 5 && args[0] !== "/") {
                    let prefixesJSON = JSON.parse(
                        fs.readFileSync("./prefixes.json", "utf-8")
                    );
                    prefixesJSON[message.guild.id] = {
                        name: message.guild.name,
                        prefix: args[0],
                    };

                    try {
                        fs.writeFile(
                            "./prefixes.json",
                            JSON.stringify(prefixesJSON),
                            (err) => {
                                if (err) {
                                    const embed = new Discord.MessageEmbed()
                                        .setTitle(
                                            ":x: There was an error while changing the prefix."
                                        )
                                        .setColor("#ff0000");
                                    console.log(err);
                                    message.channel.send(embed).then((msg) => {
                                        msg.delete({ timeout: 3000 });
                                    });
                                }
                            }
                        );

                        const embed = new Discord.MessageEmbed()
                            .setTitle(
                                `:white_check_mark: Succesfully changed server prefix to \`${args[0]}\``
                            )
                            .setColor("#00ff00")
                            .setFooter(
                                `Changed by ${message.author.tag}`,
                                message.author.avatarURL()
                            );
                        message.channel.send(embed);
                    } catch (err) {
                        const embed = new Discord.MessageEmbed()
                            .setTitle(
                                ":x: There was an error while changing the prefix."
                            )
                            .setColor("#ff0000");
                        console.log(err);
                        message.channel.send(embed).then((msg) => {
                            msg.delete({ timeout: 3000 });
                        });
                    }
                } else {
                    const embed = new Discord.MessageEmbed()
                        .setTitle(`:x: You can't change the prefix to that!`)
                        .setColor("#ff0000");
                    message.channel.send(embed).then((msg) => {
                        msg.delete({ timeout: 3000 });
                    });
                }
            } else {
                const embed = new Discord.MessageEmbed()
                    .setTitle(`Usage: \`${prefix}setprefix <SERVER_PREFIX>\``)
                    .setDescription("Required permission: `Manage Server`");
                message.channel.send(embed);
            }
        }
    },
};
