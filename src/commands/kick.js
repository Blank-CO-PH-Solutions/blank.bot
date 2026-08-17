const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("kick")
    .setDescription("Kick a member from the server")
    .addUserOption((opt) => opt.setName("target").setDescription("The member to kick").setRequired(true))
    .addStringOption((opt) => opt.setName("reason").setDescription("Reason for the kick"))
    .setDefaultMemberPermissions(PermissionFlagsBits.KickMembers),
  async execute(interaction) {
    const member = interaction.options.getMember("target");
    const reason = interaction.options.getString("reason") ?? "No reason provided";

    if (!member) return interaction.reply({ content: "That user is not in this server.", ephemeral: true });
    if (!member.kickable) return interaction.reply({ content: "I cannot kick this member. They may have a higher role than me.", ephemeral: true });

    await member.kick(reason);
    await interaction.reply(`**${member.user.tag}** has been kicked. Reason: ${reason}`);
  },
};
