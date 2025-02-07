const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
require("dotenv").config();
const client = new Discord.Client();
const defprefix = process.env.DEFPREFIX;
const botver = "Release 1.2";
client.commands = new Discord.Collection();
const commandFiles = fs
    .readdirSync("./commands/")
    .filter((file) => file.endsWith(".js"));
for (const file of commandFiles) {
    const command = require(`./commands/${file}`);
    client.commands.set(command.name, command);
}

client.once("ready", () => {
    console.log("Bot is online!\n\n === Logs ===");
    client.user.setActivity(`${defprefix}help | Release 1.3`);
});

function logCommand(message, command) {
    function get_date() {
        var d = new Date();
        var cur_date = d.getDate();
        var cur_month = d.getMonth() + 1;
        var cur_year = d.getFullYear();
        var cur_hour = d.getHours();
        var cur_minute = d.getMinutes();

        var formated_date = `${cur_year}-${cur_month}-${cur_date} ${cur_hour}:${cur_minute}`;
        return formated_date;
    }
    console.log(
        `${get_date()}> ${message.author.tag} called the "${command}" command.`
    );
}

client.on("message", (message) => {
    let prefix;
    let prefixesJSON;
    if (message.channel.type !== "dm") {
        prefixesJSON = JSON.parse(fs.readFileSync("./prefixes.json", "utf-8"));
        if (!prefixesJSON[message.guild.id]) {
            prefixesJSON[message.guild.id] = {
                name: message.guild.name,
                prefix: process.env.DEFPREFIX,
            };
            fs.writeFile(
                "./prefixes.json",
                JSON.stringify(prefixesJSON),
                (err) => {
                    if (err) console.log(err);
                }
            );
        }
        prefix = prefixesJSON[message.guild.id].prefix;
    } else prefix = process.env.DEFPREFIX;

    if (message.author.bot) return;
    if (message.content.toLowerCase().includes("uwu"))
        message.channel.send("uwu");
    if (message.content.toLowerCase().includes("owo"))
        message.channel.send("owo");
    if (
        message.content === "<@788673199956688906>" ||
        message.content === "<@!788673199956688906>" ||
        ((message.content.toLowerCase().includes("xeras") ||
            message.content === "<@788673199956688906>" ||
            message.content === "<@!788673199956688906>") &&
            message.content.toLowerCase().includes("prefix"))
    ) {
        message.channel.send(`My prefix here is \`${prefix}\``);
    }

    if (!message.content.startsWith(prefix)) return;

    const args = message.content.slice(prefix.length).split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === "help" || command === "?") {
        client.commands
            .get("help")
            .execute(message, args, Discord, prefix, botver);
        logCommand(message, "help");
        if (message.channel.type !== "dm") message.react("📩");
    }
    if (command === "botinfo" || command === "bi") {
        client.commands
            .get("botinfo")
            .execute(message, args, Discord, prefix, botver);
        logCommand(message, "botinfo");
    }

    if (command === "ping" || command === "pg") {
        client.commands.get("ping").execute(message, args, Discord, client);
        logCommand(message, "ping");
    }
    if (command === "random" || command === "r") {
        client.commands.get("random").execute(message, args, Discord, prefix);
        logCommand(message, "random");
    }
    if (command === "8ball" || command === "8b") {
        client.commands.get("8ball").execute(message, args, Discord, fetch);
        logCommand(message, "8ball");
    }
    if (command === "say") {
        client.commands.get("say").execute(message, args, Discord);
        logCommand(message, "say");
    }
    if (command === "sayan") {
        client.commands.get("sayan").execute(message, args);
        logCommand(message, "sayan");
    }

    if (command === "kick")
        client.commands.get("kick").execute(message, args, Discord, prefix);
    if (command === "ban")
        client.commands.get("ban").execute(message, args, Discord, prefix);

    if (command === "setprefix" || command === "prefix") {
        client.commands
            .get("setprefix")
            .execute(client, message, args, Discord, prefix);
        logCommand(message, "setprefix");
    }
});
client.login(process.env.TOKEN);

// CLIENT ID        h6erMnZbmI3xB5sRWnyVUvMUmO6LCO3O
// AUTHORIZE BOT    https://discord.com/api/oauth2/authorize?client_id=788673199956688906&permissions=8&scope=bot
