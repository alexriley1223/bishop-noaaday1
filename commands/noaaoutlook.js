const { SlashCommandBuilder } = require('@discordjs/builders');
const pullNoaa = require(__dirname + '/../helpers/pullNoaaImage');
const { getParentDirectoryString } = require('@helpers/utils');
const { commands } = require('../config.json');

module.exports = {
	enabled: commands[getParentDirectoryString(__filename, __dirname)],
	data: new SlashCommandBuilder().setName('noaaoutlook').setDescription('Show current NOAA NWS Day 1 Outlook'),
	async execute(interaction) {
		pullNoaa(interaction);
	},
};
