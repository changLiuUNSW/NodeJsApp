

var postgres = require("wetasker-module/lib/postgres");



exports.getAdminUsers = function(cb) {


    var sql = 'select  adminUserId as "adminUserId", adminName as "username", emailAddress as "emailAddress", dateCreated as "dateCreated", lastLogin as "lastLogin" from adminUser';

    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        return cb(null, result);
    });
};

exports.getAdminUserById = function(adminUserId, cb) {

    var sql = {
        text: 'select adminUserId as "adminUserId", adminName as "username", emailAddress as "emailAddress", dateCreated as "dateCreated", lastLogin as "lastLogin" from adminUser where adminUserId=$1',
        values: [Number(adminUserId)]
    }


    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        return cb(null, result[0]);
    });
};

exports.getAdminUserRoles = function(cb) {


    var sql = 'select r.adminRoleId as "adminRoleId", a.adminUserId as "adminUserId", r.name from adminRole r left join ' +
        	'adminUserAdminRole a on r.adminRoleId = a.adminRoleId';


    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);
        return cb(null, result);
    });
};

exports.addAdminUser = function(name, cb) {


    var sql = {
        text: 'insert into adminRole(name) values($1)',
        values: [String(name)]
    }

    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);
        return cb();
    });
};

exports.updateAdminUser = function(roleId, name, cb) {


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

