module.exports = {
  name: "guildMemberRemove",
  execute(member, client) {
    console.log(`${member.user.tag} has left the server!`);

    // Send a farewell message to a specific channel
    const channel = member.guild.systemChannel;
    if (channel) {
      channel.send(`Goodbye, ${member.user.username}. We will miss you!`);
    }
  },
};
