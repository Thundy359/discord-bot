const {
  Client,
  Interaction,
  ApplicationCommandOptionType,
  PermissionFlagsBits,
} = require("discord.js");

module.exports = {
  /**
   * Command callback for banning a user from the server
   * @param {Client} client
   * @param {Interaction} interaction
   */
  callback: async (client, interaction) => {
    // Get the target user and reason from the interaction options
    const targetUserId = interaction.options.get("target-user").value;
    const reason =
      interaction.options.get("reason")?.value || "No reason provided";

    // Defer the reply to acknowledge the interaction while processing
    await interaction.deferReply();

    // Fetch the target user from the server
    const targetUser = await interaction.guild.members.fetch(targetUserId);

    // Check if the target user exists in the server
    if (!targetUser) {
      await interaction.editReply("That user doesn't exist in this server.");
      return;
    }

    // Check if the user is the server owner
    if (targetUser.id === interaction.guild.ownerId) {
      await interaction.editReply(
        "You can't ban that user because they're the server owner."
      );
      return;
    }

    // Compare the roles of the target user, requesting user, and bot
    const targetUserRolePosition = targetUser.roles.highest.position;
    const requestUserRolePosition = interaction.member.roles.highest.position;
    const botRolePosition = interaction.guild.members.me.roles.highest.position;

    // Ensure the requesting user has a higher role than the target
    if (targetUserRolePosition >= requestUserRolePosition) {
      await interaction.editReply(
        "You can't ban that user because they have the same/higher role than you."
      );
      return;
    }

    // Ensure the bot has a higher role than the target
    if (targetUserRolePosition >= botRolePosition) {
      await interaction.editReply(
        "I can't ban that user because they have the same/higher role than me."
      );
      return;
    }

    // Attempt to ban the target user and reply with the result
    try {
      await targetUser.ban({ reason });
      await interaction.editReply(
        `User ${targetUser} was banned\nReason: ${reason}`
      );
    } catch (error) {
      console.log(`There was an error when banning: ${error}`);
    }
  },

  // Command details
  name: "ban",
  description: "Bans a member from this server.",
  options: [
    {
      name: "target-user",
      description: "The user you want to ban.",
      type: ApplicationCommandOptionType.Mentionable,
      required: true,
    },
    {
      name: "reason",
      description: "The reason you want to ban.",
      type: ApplicationCommandOptionType.String,
    },
  ],
  permissionsRequired: [PermissionFlagsBits.BanMembers], // Permissions required by the user to execute the command
  botPermissions: [PermissionFlagsBits.BanMembers], // Permissions required by the bot to execute the action
};
