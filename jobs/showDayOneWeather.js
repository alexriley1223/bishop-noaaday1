const CronJob = require('cron').CronJob;
const pullNoaa = require(__dirname + '/../helpers/pullNoaaImage');
const { getParentDirectoryString } = require('@helpers/utils');
const { jobs } = require('../config.json');

module.exports = function(client) {

	const job = {};

	job.enabled = jobs[getParentDirectoryString(__filename, __dirname, 'jobs')];

	job.executeJob = function() {
		new CronJob(
			'0 9 * * *',
			async function() {
				pullNoaa(null, client);
			},
			null,
			true,
			'America/Indianapolis');
	};

	return job;
};
