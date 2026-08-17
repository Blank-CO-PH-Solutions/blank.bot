const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("userinfo")
    .setDescription("Get information about a member")
    .addUserOption((opt) => opt.setName("target").setDescription("The member to inspect"))
    .setDefaultMemberPermissions(PermissionFlagsBits.ViewAuditLog),
  async execute(interaction) {
    const member = interaction.options.getMember("target") || interaction.member;

    const embed = new EmbedBuilder()
      .setTitle(`${member.user.tag}`)
      .setThumbnail(member.user.displayAvatarURL())
      .addFields(
        { name: "ID", value: member.id, inline: true },
        { name: "Nickname", value: member.nickname ?? "None", inline: true },
        { name: "Joined", value: `<t:${Math.floor(member.joinedTimestamp / 1000)}:R>`, inline: true },
        { name: "Created", value: `<t:${Math.floor(member.user.createdTimestamp / 1000)}:R>`, inline: true },
        { name: "Roles", value: member.roles.cache.map((r) => r.toString()).join(" ") || "None", inline: false }
      )
      .setColor(0x5865f2);

    await interaction.reply({ embeds: [embed] });
  },
};
