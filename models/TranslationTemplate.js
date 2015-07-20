

var postgres = require("wetasker-module/lib/postgres");

var _ = require('underscore');


exports.getTemplatesWithCategory = function(cb) {

    var sql = 'select * from Admin_Translation_GetTemplates()';

    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        return cb(null, result);
    });

};

exports.getTemplates = function(id, cb) {
    var sql = null;

    if(id && !isNaN(id)) {
        sql = {
            text:  'select  translationTemplateId as "translationTemplateId",name from translationTemplate  where translationCategoryId=$1 order by name',
            values: [Number(id)]
        };
    } else {
        sql = 'select  translationTemplateId as "translationTemplateId",name from translationTemplate order by name';
    }

    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        return cb(null, result);
    });
};

exports.getTemplate = function(id, cb) {

    var sql = {
        text: 'select  translationTemplateId as "translationTemplateId", name, translationCategoryId as "translationCategoryId" from translationTemplate where translationTemplateId=$1',
        values: [Number(id)]
    };


    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        return cb(null, result[0]);
    });
};


exports.addTemplate = function(name, categoryId, cb) {


    var sql = {
        text: 'insert into translationTemplate(name, translationCategoryId) values($1, $2)',
        values: [String(name), Number(categoryId)]
    };

    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        return cb();
    });
};

exports.updateTemplate = function(id, name, category, cb) {


    var sql = {
        text: 'update translationTemplate set name=$2, translationCategoryId=$3 where translationTemplateId=$1',
        values: [Number(id), String(name), Number(category)]
    };

    console.log(sql);
    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        return cb();
    });
};

