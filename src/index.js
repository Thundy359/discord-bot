const { Client, IntentsBitField } = require("discord.js");
const config = require("./config/config.json");

// Initialize the bot client
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});
// Attach the config.son to the client
client.config = config;

// Set up the command and event handler systems
const commandHandler = require("./handlers/commandHandler");
const eventHandler = require("./handlers/eventHandler");

// Initialize the command handler
commandHandler(client);

// Initialize the event handler
eventHandler(client);

// Log in to Discord with the bot token from config.json
client.login(config.token);
