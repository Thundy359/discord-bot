module.exports = {
  name: "guildMemberAdd", // The event name is 'guildMemberAdd'
  execute(member, client) {
    console.log(`${member.user.tag} has joined the server!`);

    // Send a greeting to a specific channel when a new member joins
    const channel = member.guild.systemChannel;
    if (channel) {
      channel.send(`Welcome to the server, ${member.user.username}!`);
    }
  },
};
