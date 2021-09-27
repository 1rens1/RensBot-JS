module.exports = {
    name: "sayan",
    description: "Say anything",
    execute(message, args, Discord) {
        message.delete();
        message.channel.send(message.content.split(" ").slice(1).join(" "));
    },
};
