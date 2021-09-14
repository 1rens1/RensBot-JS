module.exports = {
    name: "say",
    description: "Say anything",
    execute(message, args) {
        const sayMessage = message.content.split(" ").slice(1).join(" ");
        if (!sayMessage) return;
        message.channel.send(sayMessage);
        message.delete();
    },
};
