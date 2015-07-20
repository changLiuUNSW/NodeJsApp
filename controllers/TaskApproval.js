var BaseController    = require("./Base");
var View              = require("../views/Base");
var ModelTask         = require("../models/TaskApproval");
var ModelRejectReason = require("../models/RejectReason");
var ServiceTask       = require("wetasker-module/services/task");
var ServiceMember     = require("wetasker-module/services/member/getprofile");
var ServiceCategory   = require("wetasker-module/services/taskcategory");
var _                 = require('underscore');
var async             = require('async');

module.exports = BaseController.extend({
    name: "TaskApproval",

    run: function(req, res, next) {
        console.log(req);

        ModelTask.getPendingCount(req.sessionID, function(err, results) {
            if(err) return next(err);

            return new View(req, res, 'taskapproval/index').renderWidth({
                results: results
            });
        });

    },
    processnow: function(req, res, next) {
        if (!req.params.cultureId) {
            return new View(req, res, '/taskapproval/index').redirectTo({
                error: 'culture id is missing!'
            });
        }


        ModelTask.getProcessNow(req.sessionID, req.params.cultureId, function(err, data) {
            if(err) return next(err);

            if(data) {
                var taskDetail = null;
                var memberDetail = null;
                var channel = null;
                var category = null;
                var subCategory = null;
                async.series({
                    getTaskDetail: function(next) {
                        ServiceTask.getTaskDetail(data.memberId, data.taskId, function(err, reply) {
                            if(err) return next(err);
                            taskDetail = reply;
                            return next();
                        });
                    },
                    getMemberDetail: function(next) {
                        ServiceMember.getProfileDetail(data.memberId, null, function(err, reply) {
                            if(err) return next(err);
                            memberDetail = reply;
                            return next();
                        });
                    },
                    getChannel: function(next) {
                        ServiceCategory.getChannels(function(err, reply) {
                            if(err) return next(err);
                            channel = _.findWhere(reply, {
                                taskChannelId: taskDetail.taskChannelId
                            });
                            return next();
                        });
                    },
                    getCategory: function(next) {
                        ServiceCategory.getCategoriesById(taskDetail.taskChannelId, function(err, reply) {
                            if(err) return next(err);
                            category = _.findWhere(reply, {
                                taskCategoryId: taskDetail.taskCategoryId
                            });
                            return next();
                        });
                    },
                    getRejectReason: function(next) {
                        ModelRejectReason.getTaskRejectReason(function(err, reply) {
                            if(err) return next(err);
                            rejectReason = reply;
                            return next();
                        });
                    }
                }, function(err) {
                    if(err) return next(err);
                    console.log(taskDetail);
                    console.log(memberDetail);
                    console.log(category);
                    console.log(rejectReason);
                    return new View(req, res, 'taskapproval/processnow').renderWidth({
                        data: data,
                        channel: channel,
                        category: category,
                        memberDetail: memberDetail,
                        taskDetail: taskDetail,
                        rejectReason: rejectReason
                    });
                });

            } else {
                return new View(req, res, '/taskapproval/index').redirectTo({
                    info: 'process done!'
                });
            }

        });
    }

});
