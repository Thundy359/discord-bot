const path = require("path");
const getAllFiles = require("./getAllFiles");

module.exports = (exceptions = []) => {
  let localCommands = [];

  // Retrieve all folders in the "commands" directory
  const commandCategories = getAllFiles(
    path.join(__dirname, "..", "commands"),
    true
  );

  // Iterate through each category folder
  for (const commandCategory of commandCategories) {
    // Get all command files in the current category folder
    const commandFiles = getAllFiles(commandCategory);

    // Iterate over each command file in the category
    for (const commandFile of commandFiles) {
      // Import the command object from the file
      const commandObject = require(commandFile);

      // Skip commands specified in the exceptions array
      if (exceptions.includes(commandObject.name)) {
        continue;
      }

      // Add the command object to the localCommands array
      localCommands.push(commandObject);
    }
  }

  // Return the array of command objects
  return localCommands;
};
