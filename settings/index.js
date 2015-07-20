var config = {
	dev: {
		mode: 'dev',
		port: 4000
	},
	staging: {
		mode: 'staging',
		port: 5000
	},
	production: {
		mode: 'production',
		port: 6000
	}
};
module.exports = function(mode) {
	return config[mode || process.env.NODE_ENV || 'dev'] || config.dev;
};