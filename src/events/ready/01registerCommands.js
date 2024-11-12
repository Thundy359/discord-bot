/*
This code syncs local bot commands with those registered on Discord. It retrieves both local and registered commands, then checks each local command against the Discord-registered version. 
*/

const { guildId } = require("../../config/config.json");
const areCommandsDifferent = require("../../utils/areCommandsDifferent");
const getApplicationCommands = require("../../utils/getApplicationCommands");
const getLocalCommands = require("../../utils/getLocalCommands");

module.exports = async (client) => {
  try {
    // Fetching local and registered commands
    const localCommands = getLocalCommands();
    const applicationCommands = await getApplicationCommands(client, guildId);

    // Loop through each locally defined command
    for (const localCommand of localCommands) {
      const { name, description, options } = localCommand;

      // Find matching command on Discord by name
      const existingCommand = await applicationCommands.cache.find(
        (cmd) => cmd.name === name
      );

      // If the command exists on Discord
      if (existingCommand) {
        // Delete the command if flagged for deletion locally
        if (localCommand.deleted) {
          await applicationCommands.delete(existingCommand.id);
          console.log(`🗑 Deleted command "${name}".`);
          continue;
        }

        // Edit command if local version differs from Discord version
        if (areCommandsDifferent(existingCommand, localCommand)) {
          await applicationCommands.edit(existingCommand.id, {
            description,
            options,
          });
          console.log(`🔁 Edited command "${name}".`);
        }
      } else {
        // Skip if command is flagged for deletion locally and not registered
        if (localCommand.deleted) {
          console.log(
            `⏩ Skipping registering command "${name}" as it's set to delete.`
          );
          continue;
        }

        // Register new command on Discord
        await applicationCommands.create({
          name,
          description,
          options,
        });
        console.log(`👍 Registered command "${name}."`);
      }
    }
  } catch (error) {
    // Log any errors encountered during sync
    console.log(`There was an error: ${error}`);
  }
};
