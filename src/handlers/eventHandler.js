const fs = require("fs");
const path = require("path");

module.exports = (client) => {
  // Read event files from the 'events' folder
  const eventFiles = fs
    .readdirSync(path.join(__dirname, "../events"))
    .filter((file) => file.endsWith(".js"));

  // Log the event files that are being loaded
  console.log(`Loading ${eventFiles.length} event files...`);

  eventFiles.forEach((file) => {
    const event = require(path.join(__dirname, "../events", file));

    // Ensure the event is being registered correctly
    console.log(`Registering event: ${event.name}`);

    // Bind the event handler to the client
    client.on(event.name, (...args) => event.execute(...args, client));
  });
};
