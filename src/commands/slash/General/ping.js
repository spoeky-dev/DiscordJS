const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
  data: new SlashCommandBuilder()

    // The name of your command
    .setName('ping')
    // The description of your command
    .setDescription('The classic ping command'),

  // The code executed once the command is called
  async execute(interaction) {
    await interaction.reply('Pong!');
  }
}