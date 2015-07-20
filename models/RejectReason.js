/**
 * Created by Chang on 7/08/2014.
 */
var postgres = require("wetasker-module/lib/postgres");

exports.getTaskRejectReason = function(cb) {


    var sql = {
        text: 'select rejectreasonid as "rejectReasonId", name from rejectReason where processtype=$1',
        values: ['task']
    };

    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);
        return cb(null, result);
    });
};
