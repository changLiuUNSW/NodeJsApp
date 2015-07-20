/**
 * Created by Chang on 7/08/2014.
 */
var postgres = require("wetasker-module/lib/postgres");

exports.getPendingTask = function(cb) {


    var sql = 'SELECT memberid as "memberId", emailaddress as "emailAddress", username as "userName", lastlogoutdate as "LastLogoutDate" from member';

    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);
        return cb(null, result);
    });
};


exports.getPendingCount = function(cb) {

};