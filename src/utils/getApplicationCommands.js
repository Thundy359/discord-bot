module.exports = async (client, guildId) => {
  let applicationCommands;

  // Check if a specific guild ID is provided
  if (guildId) {
    // Fetch the guild object for the given guild ID
    const guild = await client.guilds.fetch(guildId);
    // Get the commands specific to that guild
    applicationCommands = guild.commands;
  } else {
    // If no guild ID is provided, get the global application commands
    applicationCommands = await client.application.commands;
  }

  // Fetch the latest command data from Discord to ensure accuracy
  await applicationCommands.fetch();

  return applicationCommands;
};
