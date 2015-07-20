var BaseController = require("./Base");
var View = require("../views/Base");
var data = require("../models/AdminUser");

module.exports = BaseController.extend({
    name: "AdminUser",


    run: function(req, res, next) {

        data.getAdminUsers(function(err, result) {

            if (err) return next(err);

            return new View(req, res, 'adminuser/index').renderWidth({
                users: result
            });
        });
    },
    edit: function(req, res, next) {

        data.getAdminUserById(req.params.id, function(err, result) {
            if (err) return next(err);
            data.getAdminUserRoles(function(err, roles) {
                if (err) return next(err);
                return new View(req, res, 'adminuser/edit').renderWidth({
                    user: result,
                    roles: roles
                });
            });


        });

    },
    update: function(req, res, next) {
        if (!req.body.roleId || !req.body.roleName) {
            res.writeHead(302, {
                'Location': '/role'
                //add other headers here...
            });
        }

        data.updateRole(req.body.roleId, req.body.roleName, function(err) {
            if (err) return next(err);
            res.writeHead(302, {
                'Location': '/role'
                //add other headers here...
            });
            res.end();
        });
    },
    add: function(req, res, next) {
        return new View(req, res, 'role/add').renderWidth()
    },
    create: function(req, res, next) {
        if (!req.body.role) {
            return new View(req, res, 'role/add').renderWidth({
                error: 'name is null'
            });
        }
        console.log(req.body.role);
        data.addRole(req.body.role, function(err) {
            if (err) return next(err);
            res.writeHead(302, {
                'Location': '/role'
                //add other headers here...
            });
            res.end();
        });
    }
});
