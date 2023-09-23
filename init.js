const { isModuleEnabled } = require('./config.json');

module.exports = function() {
	const module = {};

	module.name = 'Bishop NOAA Day 1';
	module.description = 'Post the NOAA NWS Day One prediction each morning on the Bishop Discord bot';
	module.version = '1.3.0';
	module.enabled = isModuleEnabled;

	module.init = function init() {
		/* ~empty~ */
	};
	return module;
};
