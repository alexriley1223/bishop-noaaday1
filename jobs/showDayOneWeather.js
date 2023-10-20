const BishopJob = require('@classes/BishopJob');
const CronJob = require('cron').CronJob;
const pullNoaa = require(__dirname + '/../helpers/pullNoaaImage');
const { getParentDirectoryString } = require('@helpers/utils');
const { jobs } = require('../config.json');

module.exports = new BishopJob({
	enabled: jobs[getParentDirectoryString(__filename, __dirname, 'jobs')],
	init: async function(client) {
		new CronJob(
			'0 9 * * *',
			async function() {
				client.bishop.logger.info('NOAA', 'Sending NOAA image into channel');
				pullNoaa(null, client);
			},
			null,
			true,
			'America/Indianapolis');
	}
});
