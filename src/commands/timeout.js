const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("timeout")
    .setDescription("Timeout a member")
    .addUserOption((opt) => opt.setName("target").setDescription("The member to timeout").setRequired(true))
    .addIntegerOption((opt) => opt.setName("minutes").setDescription("Duration in minutes").setRequired(true).setMinValue(1).setMaxValue(40320))
    .addStringOption((opt) => opt.setName("reason").setDescription("Reason for the timeout"))
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers),
  async execute(interaction) {
    const member = interaction.options.getMember("target");
    const minutes = interaction.options.getInteger("minutes");
    const reason = interaction.options.getString("reason") ?? "No reason provided";

    if (!member) return interaction.reply({ content: "That user is not in this server.", ephemeral: true });
    if (!member.moderatable) return interaction.reply({ content: "I cannot timeout this member.", ephemeral: true });

    await member.timeout(minutes * 60 * 1000, reason);
    await interaction.reply(`**${member.user.tag}** has been timed out for ${minutes} minute(s). Reason: ${reason}`);
  },
};
