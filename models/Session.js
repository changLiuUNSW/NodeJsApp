var postgres = require("wetasker-module/lib/postgres");

var common   = require("wetasker-module/lib/common");

exports.authentication = function(username, password, cb) {
    if (!username || !password) {
        return cb(null);
    }
    password = common.hashPassword(password);
    var sql = {
        text: 'select * from Admin_Login($1, $2)',
        values: [String(username), String(password)]
    }

    postgres.exec('website', sql, function(err, result) {

        if (err) return cb(err);

        if (result) {
            return cb(null, result[0]);
        } else {
            return cb();
        }
    });
};

exports.getRoles = function(adminUserId, cb) {


    var sql = {
        text: 'select * from Admin_Role_Get($1)',
        values: [Number(adminUserId)]
    }

    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        return cb(null, result);
    });
};

exports.updatePassword = function(password,adminUserId, cb) {

    var password = common.hashPassword(password);
    var sql = {
        text: 'update adminuser set adminpassword=$2 where adminuserid=$1',
        values: [Number(adminUserId), String(password)]
    }

    postgres.exec('website', sql, function(err) {
        if (err) return cb(err);
        return cb(null);
    });
};
