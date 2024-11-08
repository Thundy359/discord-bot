module.exports = {
  name: "sayhello",
  description: "Say hello to the bot!",
  execute(message, args) {
    if (args.length > 0) {
      const user = args.join(" "); // Join all words into a single string
      message.channel.send(`Hello, ${user}!`); // Greet the specified user
    } else {
      message.channel.send("Hello!"); // Default greeting if no name provided
    }
  },
};
