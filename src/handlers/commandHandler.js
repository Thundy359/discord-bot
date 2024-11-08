const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  // Set up a collection to store commands
  client.commands = new Map();

  // Read command files from the 'commands' folder
  const commandFiles = fs
    .readdirSync(path.join(__dirname, "../commands"))
    .filter((file) => file.endsWith(".js"));

  // Loop through each command file and register it
  commandFiles.forEach((file) => {
    const command = require(path.join(__dirname, "../commands", file));
    client.commands.set(command.name, command); // Store the command in the client's commands map
  });

  // Listen for messages
  client.on("messageCreate", (message) => {
    // Ignore messages from bots
    if (message.author.bot) return;

    // Check if the message starts with the configured prefix
    if (!message.content.startsWith(client.config.prefix)) return;
    // Remove the prefix from the message to get the command
    const args = message.content
      .slice(client.config.prefix.length)
      .trim()
      .split(/ +/);
    const commandName = args.shift().toLowerCase();

    // Check if the command exists in the map
    const command = client.commands.get(commandName);
    if (!command) return;

    // Execute the command
    try {
      command.execute(message, args); // Pass message and arguments to command's execute method
    } catch (error) {
      console.error(error);
      message.reply("There was an error while executing that command!");
    }
  });
};
