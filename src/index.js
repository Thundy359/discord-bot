const { Client, IntentsBitField } = require("discord.js");
const config = require("./config/config.json");
const eventHandler = require("./handlers/eventHandler");

// Initialize the bot client with necessary intents to handle events
const client = new Client({
  intents: [
    IntentsBitField.Flags.Guilds,
    IntentsBitField.Flags.GuildMessages,
    IntentsBitField.Flags.DirectMessages,
    IntentsBitField.Flags.GuildMembers,
    IntentsBitField.Flags.MessageContent,
  ],
});

// Pass the client to the event handler to register events
eventHandler(client);

// Log in to Discord with the bot token from config.json
client
  .login(config.token)
  .then(() => {
    console.log("Successfully logged in.");
  })
  .catch((error) => {
    console.error("Login failed:", error);
  });
