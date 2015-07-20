var BaseController = require("./Base");
var View = require("../views/Base");
var Session = require("../models/Session");
var async         = require('async');
var Role = require("../models/AdminRole");

module.exports = BaseController.extend({
    name: "Admin",

    run: function(req, res, next) {
        if (req.session && req.session.user && req.session.roles) {
            return new View(req, res, 'admin/home').renderWidth({
                user: req.session.user,
                roles: req.session.roles
            });
        }



        Session.authentication(req.body.username, req.body.password, function(err, result) {

            if (err) return next(err);

            if (!result) {
                var v = new View(req, res, 'login');
                return v.render({
                    title: 'Please login',
                    error: 'Username or password wrong!'
                });

            } else {
                req.session.user = result;

                Session.getRoles(req.session.user.adminUserId, function(err, result) {
                    if (err) return next(err);

                    req.session.roles = result;
                    return new View(req, res, 'admin/home').renderWidth({
                        user: req.session.user,
                        roles: result
                    });

                });



            }
        });

    },
    editPassword: function(req, res, next) {
         return new View(req, res, 'admin/password').renderWidth({


         });

    },
    updatePassword: function(req, res, cb) {
        if(!req.body.oldPassword||!req.body.newPassword1||!req.body.newPassword2)
        {
            return new View(req, res, 'admin/password').renderWidth({
                error: 'Please input all the fields!'
            });
        }
        if(req.body.newPassword1!==req.body.newPassword2){
            return new View(req, res, 'admin/password').renderWidth({
                error: 'The new passwords are not the same!'
            });
        }
        async.series({
            checkUserOldPassword: function(next) {
                Session.authentication(req.session.user.username,req.body.oldPassword, function(err,result) {
                    if (err) return cb(err);
                    if (!result) {
                        return new View(req, res, 'admin/password').renderWidth({
                            error: 'The old password is not correct!'
                        });
                    }
                    return next();
                });
            },
            updateUserPassword: function(next) {
                Session.updatePassword(req.body.newPassword1,req.session.user.adminUserId, function(err,result) {
                    if (err) return cb(err);
                    return next();
                });
            }
        }, function(err) {
            if (err) return cb(err);
            return new View(req, res, 'admin/password').renderWidth({
                error: 'Update successfully'
            });
        });
    }
});
