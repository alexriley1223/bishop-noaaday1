const { isModuleEnabled } = require('./config.json');
const package = require('./package.json');

module.exports = function() {
	const module = {};

	module.name = 'Bishop NOAA Day 1';
	module.description = package.description;
	module.version = package.version;
	module.enabled = isModuleEnabled;

	module.init = function init() {
		/* ~empty~ */
	};
	return module;
};
