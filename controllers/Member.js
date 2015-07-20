/**
 * Created by Chang on 7/08/2014.
 */
var BaseController = require("./Base");
var View = require("../views/Base");
var Member = require("../models/MemberUser.js");
module.exports=BaseController.extend({
    name:"Member",
    run: function(req, res, next) {
        Member.getMembers(function(err, result) {

            if (err) return next(err);

            return new View(req, res, 'member/index').renderWidth({
                members: result
            });
        });
    }
});