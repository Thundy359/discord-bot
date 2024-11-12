// Import developers array and guildId from config, and utility to fetch local commands
const { developers, testServer } = require("../../config/config.json");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client, interaction) => {
  // Exit if interaction is not a chat input command (like a slash command)
  if (!interaction.isChatInputCommand()) return;

  // Retrieve all locally defined commands
  const localCommands = getLocalCommands();

  try {
    // Find the command object that matches the command name in the interaction
    const commandObject = localCommands.find(
      (cmd) => cmd.name === interaction.commandName
    );

    // Exit if command is not found locally
    if (!commandObject) return;

    // Check if command is restricted to developers
    if (commandObject.devOnly) {
      // If user isn't a developer, deny access to the command
      if (!developers.includes(interaction.member.id)) {
        interaction.reply({
          content: "Only developers are allowed to run this command.",
          ephemeral: true, // Send message privately to user
        });
        return;
      }
    }

    // Check if command is restricted to a test guild (guildId)
    if (commandObject.testOnly) {
      // If not in the test guild, deny command access
      if (!(interaction.guild.id === testServer)) {
        interaction.reply({
          content: "This command cannot be ran here.",
          ephemeral: true,
        });
        return;
      }
    }

    // Check if user has required permissions for the command
    if (commandObject.permissionsRequired?.length) {
      for (const permission of commandObject.permissionsRequired) {
        // Deny access if user lacks any required permission
        if (!interaction.member.permissions.has(permission)) {
          interaction.reply({
            content: "Not enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    // Check if the bot has required permissions for the command
    if (commandObject.botPermissions?.length) {
      for (const permission of commandObject.botPermissions) {
        const bot = interaction.guild.members.me; // Bot's guild member object

        // Deny command execution if bot lacks required permissions
        if (!bot.permissions.has(permission)) {
          interaction.reply({
            content: "I don't have enough permissions.",
            ephemeral: true,
          });
          return;
        }
      }
    }

    // Execute the command callback, passing in the client and interaction
    await commandObject.callback(client, interaction);
  } catch (error) {
    console.log(`There was an error running this command: ${error}`);
  }
};
