

var postgres = require("wetasker-module/lib/postgres");



exports.getRoles = function(cb) {


    var sql = 'select  adminRoleId as "adminRoleId",name, dateCreated as "dateCreated" from adminRole order by adminRoleId desc';

    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        return cb(null, result);
    });
};

exports.getRole = function(roleId, cb) {

    var sql = {
        text: 'select  adminRoleId as "adminRoleId",name, dateCreated as "dateCreated" from adminRole where adminRoleId=$1',
        values: [Number(roleId)]
    }


    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        return cb(null, result[0]);
    });
};


exports.addRole = function(name, cb) {


    var sql = {
        text: 'insert into adminRole(name) values($1)',
        values: [String(name)]
    }

    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        return cb();
    });
};

exports.updateRole = function(roleId, name, cb) {


    var sql = {
        text: 'update adminRole set name=$2 where adminRoleId=$1',
        values: [Number(roleId), String(name)]
    }

    console.log(sql);

    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        return cb();
    });
};

