module.exports = {
  name: "messageCreate", // The event name is 'messageCreate'
  execute(message, client) {
    // Ignore bot messages to prevent an infinite loop
    if (message.author.bot) return;

    // This will log every message to the console (for debugging purposes)
    console.log(`Message received: ${message.content}`);

    // You can add more behavior here to handle every message, such as checking for certain keywords.
    // Example: Respond to a specific message
    if (message.content === "Hello") {
      message.reply("Hi there!");
    }
  },
};
