var BaseController = require("./Base");
var View           = require("../views/Base");
var Model          = require("../models/TranslationTemplate");
var ModelCategory  = require("../models/TranslationCategory");
var async          = require('async');
var _              = require('underscore');


module.exports = BaseController.extend({
    name: "TranslationTemplate",


    run: function(req, res, next) {
        var templates = null;
        var categories = null;
        if(!req.body.categorySelectValue) {
            categorySelectValue = null;
        } else {
            categorySelectValue = req.body.categorySelectValue;
        }
        async.series({
            getTemplates: function(next) {
                Model.getTemplates(categorySelectValue, function(err, result) {
                    if (err) return next(err);
                    templates = result;
                    return next();
                });

            },
            getCategories: function(next) {
                ModelCategory.getCategories(function(err,result) {
                    if (err) return next(err);
                    categories = result;
                    return next();
                });
            }
        }, function(err) {
            if (err) return next(err);

            return new View(req, res, 'translationtemplate/index').renderWidth({
                templates: templates,
                categories: categories,
                categorySelectValue: categorySelectValue
            });
        });


    },
    edit: function(req, res, next) {
        var template = null;
        var categories = null;
        async.series({
            getTemplate: function(next) {
                Model.getTemplate(req.params.id, function(err, result) {
                    if (err) return next(err);
                    template = result;
                    return next();
                });

            },
            getCategories: function(next) {
                ModelCategory.getCategories(function(err,result) {
                    if (err) return next(err);
                    categories = result;
                    return next();
                });
            }
        }, function(err) {
            if (err) return next(err);
            return new View(req, res, 'translationtemplate/edit').renderWidth({
                data: template,
                categories: categories
            });
        });


    },
    update: function(req, res, next) {

        if (_.isEmpty(req.body.translationTemplateId) ||  _.isEmpty(req.body.templateName) || _.isEmpty(req.body.category)) {

            res.writeHead(302, {
                'Location': '/translationtemplate/edit'
                //add other headers here...
            });
            res.end();
        } else {
            Model.updateTemplate(req.body.translationTemplateId, req.body.templateName, req.body.category, function(err) {
                if (err) return next(err);
                res.writeHead(302, {
                    'Location': '/translationtemplate'
                    //add other headers here...
                });
                res.end();
            });
        }


    },
    add: function(req, res, next) {
        ModelCategory.getCategories(function(err,result) {
            if (err) return next(err);
            return new View(req, res, 'translationtemplate/add').renderWidth({

                categories: result,
            });
        });

    },
    create: function(req, res, next) {


        if (req.body.template.length === 0 || req.body.category.length === 0) {

            ModelCategory.getCategories(function(err,categories) {
                return new View(req, res, 'translationtemplate/add').renderWidth({
                    error: 'name or category is null',
                    categories: categories
                });
            });
        } else {

            Model.addTemplate(req.body.template, req.body.category, function(err) {
                if (err) return next(err);

                res.writeHead(302, {
                    'Location': '/translationtemplate'
                    //add other headers here...
                });
                res.end();
            });
        }


    }
});
