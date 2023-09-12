const CronJob = require('cron').CronJob;
const pullNoaa = require(__dirname + '/../helpers/pullNoaaImage');


module.exports = function(client) {

    const job = {};

	job.enabled = true;

	job.executeJob = function() {
		new CronJob(
            '0 9 * * *',
            async function() {
                pullNoaa(null, client);
            },
            null,
            true,
            'America/Indianapolis');
	}

    return job;
};
