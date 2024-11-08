module.exports = {
  name: "ready", // Event name 'ready'
  execute(client) {
    console.log(`${client.user.tag} is online!`); // Log the bot's tag when it comes online
  },
};
