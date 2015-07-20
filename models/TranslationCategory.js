

var postgres = require("wetasker-module/lib/postgres");



exports.getCategories = function(cb) {


    var sql = 'select  translationCategoryId as "translationCategoryId",name, enabled from translationCategory order by name';

    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        return cb(null, result);
    });
};

exports.getCategory = function(id, cb) {

    var sql = {
        text: 'select  translationCategoryId as "translationCategoryId", name, enabled from translationCategory where translationCategoryId=$1',
        values: [Number(id)]
    }


    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        return cb(null, result[0]);
    });
};


exports.addCategory = function(name, cb) {


    var sql = {
        text: 'insert into translationCategory(name) values($1)',
        values: [String(name)]
    }

    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        return cb();
    });
};

exports.updateCategory = function(id, name, cb) {


    var sql = {
        text: 'update translationCategory set name=$2 where translationCategoryId=$1',
        values: [Number(id), String(name)]
    }


    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        return cb();
    });
};

