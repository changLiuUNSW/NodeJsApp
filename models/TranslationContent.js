var postgres = require("wetasker-module/lib/postgres");

exports.getTranslationContent = function(translationId, cultureId, cb) {
	var sql = {
        text: 'select translationContentId as "translationContentId", content, translationId as "translationId", cultureId as "cultureId" from translationContent where translationId=$1 and cultureId=$2',
        values: [Number(translationId), Number(cultureId)]
    }


    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        return cb();
    });

};

exports.updateTranslationContent = function(translationId, cultureId, content, cb) {

	var sql = {
        text: 'update translationContentId as "translationContentId", content, translationId as "translationId", cultureId as "cultureId" from translationContent where translationId=$1 and cultureId=$2',
        values: [Number(translationId), Number(cultureId)]
    }


    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        return cb();
    });
};