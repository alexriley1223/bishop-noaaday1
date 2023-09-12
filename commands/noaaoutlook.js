const { SlashCommandBuilder } = require('@discordjs/builders');
const pullNoaa = require(__dirname + '/../helpers/pullNoaaImage');

module.exports = {
	enabled: true,
	data: new SlashCommandBuilder().setName('noaaoutlook').setDescription('Show current NOAA NWS Day 1 Outlook'),
	async execute(interaction) {
        pullNoaa(interaction);
	},
};
