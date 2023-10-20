const BishopCommand = require('@classes/BishopCommand');
const { SlashCommandBuilder } = require('@discordjs/builders');
const pullNoaa = require(__dirname + '/../helpers/pullNoaaImage');
const { getParentDirectoryString } = require('@helpers/utils');
const { commands } = require('../config.json');

module.exports = new BishopCommand({
	enabled: commands[getParentDirectoryString(__filename, __dirname)],
	data: new SlashCommandBuilder().setName('noaaoutlook').setDescription('Show current NOAA NWS Day 1 Outlook'),
	execute: async function(interaction) {
		pullNoaa(interaction);
	},
});
