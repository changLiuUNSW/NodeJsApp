var postgres = require("wetasker-module/lib/postgres");

exports.getPendingCount = function(sessionId, cb) {


    var sql = {
        text: 'select * from Admin_Task_GetPendingCount($1)',
        values: [String(sessionId)]
    };

    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);


        return cb(null, result);
    });

};



exports.getProcessNow = function(sessionId, cultureId, cb) {
    var sql = {
        text: 'select * from Admin_Task_ProcessApproval($1, $2, $3)',
        values: [
            String(sessionId),
            Number(cultureId),
            4
        ]
    };
    console.log(sql);
    postgres.exec('website', sql, function(err, result) {
        if (err) return cb(err);

        if(result && result.length > 0) {
            return cb(null, result[0]);
        } else {
            return cb(null);
        }

    });

};