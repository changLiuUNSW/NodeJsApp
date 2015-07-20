var _ = require("underscore");
module.exports = {
	name: "base",
	extend: function(child) {


		return _.extend({}, this, child);
	},
	init: function(req, res, next) {
		if(req.session && req.session.user) {
			return next();
		} else {
			console.log('redict');
			return res.redirect('/');
		}

	}
};