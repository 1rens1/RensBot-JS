module.exports = {
    name: "say",
    description: "Say anything",
    execute(message, args) {
        const sayMessage = message.content.split(" ").slice(1).join(" ");
        message.channel.send(sayMessage);
    }
}