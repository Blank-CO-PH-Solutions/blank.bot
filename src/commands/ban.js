const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ban")
    .setDescription("Ban a member from the server")
    .addUserOption((opt) => opt.setName("target").setDescription("The member to ban").setRequired(true))
    .addStringOption((opt) => opt.setName("reason").setDescription("Reason for the ban"))
    .setDefaultMemberPermissions(PermissionFlagsBits.BanMembers),
  async execute(interaction) {
    const member = interaction.options.getMember("target");
    const reason = interaction.options.getString("reason") ?? "No reason provided";

    if (!member) return interaction.reply({ content: "That user is not in this server.", ephemeral: true });
    if (!member.bannable) return interaction.reply({ content: "I cannot ban this member. They may have a higher role than me.", ephemeral: true });

    await member.ban({ reason });
    await interaction.reply(`**${member.user.tag}** has been banned. Reason: ${reason}`);
  },
};
