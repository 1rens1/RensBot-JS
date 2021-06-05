const fs = require("fs");

module.exports = {
    name: "setprefix",
    description: "Changes the server prefix",
    execute(client, message, args, Discord, prefix) {
        const prefixesDir = "../prefixes.json"
        const prefixesJSON = require(prefixesDir)
        function changePrefix(prefix) {
            prefixesJSON[message.guild.id].prefix = prefix
            try {
                fs.writeFile(prefixesDir, JSON.stringify(prefixesJSON), function writeJSON(err) {
                    if (err) return console.log(err);
                });
            } catch (err) {
                message.channel.send("error changing server prefix")
            }
        }
        
    }
}