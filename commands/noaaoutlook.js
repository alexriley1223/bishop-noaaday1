const { SlashCommandBuilder } = require('@discordjs/builders');
const axios = require('axios');
const cheerio = require('cheerio');
const { weatherChannelId } = require('../config.json');

module.exports = {
	enabled: true,
	data: new SlashCommandBuilder().setName('noaaoutlook').setDescription('Show current NOAA NWS Day 1 Outlook'),
	async execute(interaction) {

        const res = await axios.get('https://www.spc.noaa.gov/products/outlook/day1otlk.html');

        if(res.status == 200) {
            const $ = cheerio.load(res.data);
            const bodyOnLoad = $("body").attr("onload");
            const imageName = bodyOnLoad.match(/'([^']+)'/)[1];
            const channel = await interaction.client.channels.fetch(weatherChannelId);
            await channel.send(`https://www.spc.noaa.gov/products/outlook/day1${imageName}.gif`);
        } else {
            interaction.reply({
                content: `Error fetching gif.`,
                ephemeral: true,
            });
        }

		interaction.reply({
			content: `Day 1 outlook sent into the specified weather channel`,
			ephemeral: true,
		});
	},
};
