const path = require("path");
const getAllFiles = require("../utils/getAllFiles");

module.exports = (client) => {
  // Get all event folder paths
  const eventFolders = getAllFiles(path.join(__dirname, "..", "events"), true);

  // Iterate over each event folder
  for (const eventFolder of eventFolders) {
    // Get all event file paths from the folder
    const eventFiles = getAllFiles(eventFolder);
    eventFiles.sort((a, b) => a > b); // Sort the event files alphabetically

    // Get the event name from the folder's name
    const eventName = eventFolder.replace(/\\/g, "/").split("/").pop();

    // Register the event handler for the event
    client.on(eventName, async (arg) => {
      // Loop through all event files and execute them
      for (const eventFile of eventFiles) {
        const eventFunction = require(eventFile); // Import event handler
        await eventFunction(client, arg); // Execute event handler with the client and event argument
      }
    });
  }
};
