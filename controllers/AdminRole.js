var BaseController = require("./Base");
var View = require("../views/Base");
var Role = require("../models/AdminRole");

module.exports = BaseController.extend({
    name: "Role",


    run: function(req, res, next) {

        Role.getRoles(function(err, result) {

            if (err) return next(err);

            return new View(req, res, 'role/index').renderWidth({
                roles: result
            });
        });
    },
    edit: function(req, res, next) {

        Role.getRole(req.params.id, function(err, result) {

            if (err) return next(err);
            return new View(req, res, 'role/edit').renderWidth({
                role: result
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

        Role.updateRole(req.body.roleId, req.body.roleName, function(err) {
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
        Role.addRole(req.body.role, function(err) {
            if (err) return next(err);
            res.writeHead(302, {
                'Location': '/role'
                //add other headers here...
            });
            res.end();
        });
    }
});
