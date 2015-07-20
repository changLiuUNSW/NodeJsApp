

var postgres = require("wetasker-module/lib/postgres");
var _        = require('underscore');

exports.getTranslationSummary = function(cb) {


};

exports.getUnTranslatedCount = function(cultureId, cb) {

	var sql = {
        text: 'select * from Admin_Translation_GetPendingCount($1)',
        values: [Number(cultureId)]
    };

    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);

        return cb(null, result);
    });
};

exports.getTranslation = function(translationId, cultureId, cb) {
	var sql = {
        text: 'select * from Admin_Translation_Get($1, $2)',
        values: [Number(translationId), Number(cultureId)]
    };

    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);

        console.log(result);
        return cb(null, result);
    });
};

exports.getTranslationsByTemplateId = function(translationTemplateId, cultureId, cb) {
	if(!_.isEmpty(cultureId)) {
		cultureId = 1;
	}
	var sql = {
        text: 'select * from Admin_Translation_GetByTemplateID($1, $2)',
        values: [Number(translationTemplateId), Number(cultureId)]
    };


    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        console.log(result);
        return cb(null, result);
    });

};

exports.addTranslation = function(translationTemplateId, name, cb) {
	var sql = {
        text: 'insert into translation(translationTemplateId, name, translationStatusId) values($1, $2, 1)',
        values: [Number(translationTemplateId), String(name)]
    };

    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        return cb();
    });

};


