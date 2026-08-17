const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("slowmode")
    .setDescription("Set slowmode delay for a channel")
    .addIntegerOption((opt) => opt.setName("seconds").setDescription("Slowmode delay in seconds (0 to disable)").setRequired(true).setMinValue(0).setMaxValue(21600))
    .addChannelOption((opt) => opt.setName("channel").setDescription("Channel to set slowmode on"))
    .setDefaultMemberPermissions(PermissionFlagsBits.ManageChannels),
  async execute(interaction) {
    const seconds = interaction.options.getInteger("seconds");
    const channel = interaction.options.getChannel("channel") || interaction.channel;

    await channel.setRateLimitPerUser(seconds);

    await interaction.reply(`Slowmode set to **${seconds}** second(s) in ${channel}.`);
  },
};
