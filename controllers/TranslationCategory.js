var BaseController = require("./Base");
var View = require("../views/Base");
var Model = require("../models/TranslationCategory");

module.exports = BaseController.extend({
    name: "TranslationCategory",


    run: function(req, res, next) {

        Model.getCategories(function(err, result) {

            if (err) return next(err);
            console.log(result);
            return new View(req, res, 'translationcategory/index').renderWidth({
                categories: result
            });
        });
    },
    edit: function(req, res, next) {

        Model.getCategory(req.params.id, function(err, result) {

            if (err) return next(err);
            return new View(req, res, 'translationcategory/edit').renderWidth({
                category: result
            });

        });

    },
    update: function(req, res, next) {
        if (!req.body.translationCategoryId || !req.body.categoryName) {
            res.writeHead(302, {
                'Location': '/translationcategory'
                //add other headers here...
            });
            res.end();
        }

        Model.updateCategory(req.body.translationCategoryId, req.body.categoryName, function(err) {
            if (err) return next(err);
            res.writeHead(302, {
                'Location': '/translationcategory'
                //add other headers here...
            });
            res.end();
        });
    },
    add: function(req, res, next) {
        return new View(req, res, 'translationcategory/add').renderWidth();
    },
    create: function(req, res, next) {
        if (!req.body.category) {
            return new View(req, res, 'translationcategory/add').renderWidth({
                error: 'name is null'
            });
        }
        console.log(req.body.category);
        Model.addCategory(req.body.category, function(err) {
            if (err) return next(err);

            res.writeHead(302, {
                'Location': '/translationcategory'
                //add other headers here...
            });
            res.end();
        });
    }
});
