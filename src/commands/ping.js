module.exports = {
  name: "ping",
  description: "Ping the bot to check if it's alive!",
  execute(message, args) {
    message.channel.send("Pong!"); // Reply with "Pong!"
  },
};
