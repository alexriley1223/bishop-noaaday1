const CronJob = require('cron').CronJob;
const axios = require('axios');
const cheerio = require('cheerio');
const { weatherChannelId } = require('../config.json');

module.exports = function(client) {

    const job = {};

	job.enabled = true;

	job.executeJob = function() {
		new CronJob(
            '0 9 * * *',
            async function() {
                const res = await axios.get('https://www.spc.noaa.gov/products/outlook/day1otlk.html');

                if(res.status == 200) {
                    const $ = cheerio.load(res.data);
                    const bodyOnLoad = $("body").attr("onload");
                    const imageName = bodyOnLoad.match(/'([^']+)'/)[1];
                    const channel = await client.channels.fetch(weatherChannelId);
                    await channel.send(`https://www.spc.noaa.gov/products/outlook/day1${imageName}.gif`);
                }
            },
            null,
            true,
            'America/Indianapolis');
	}

    return job;
};
