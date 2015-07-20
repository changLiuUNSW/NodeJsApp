var BaseController   = require("./Base");
var View             = require("../views/Base");
var ModelCategory    = require("../models/TranslationCategory");
var ModelTemplate    = require("../models/TranslationTemplate");
var ModelTranslation = require("../models/Translation");
var ServiceCulture   = require("wetasker-module/services/culture");
var _                = require('underscore');
var async            = require('async');

module.exports = BaseController.extend({
    name: "Translation",

    run: function(req, res, next) {
        if(_.isEmpty(req.body.templateSelectId)) {
            req.body.templateSelectId = '';
        }
        if(_.isEmpty(req.body.cultureSelectId)) {
            req.body.cultureSelectId = 1;
        }
        var cultures = null;
        var templates = null;
        var translations = null;
        var untranslated = null;
        async.series({
/*            getTemplates: function(next) {
                ModelTemplate.getTemplatesWithCategory(function(err, result) {
                    if (err) return next(err);
                    templates = _.groupBy(result, function(group) {
                        return group.translationCategoryId;
                    });
                    console.log(templates);
                    return next();
                });

            },*/
            getCulture: function(next) {
                ServiceCulture.getCultures(function(err, result) {
                    if(err) return next(err);
                    cultures = result;
                    return next();
                });
            },
            getUntranslatedCount: function(next) {
                ModelTranslation.getUnTranslatedCount(req.body.cultureSelectId, function(err, result) {
                    if(err) return next(err);
                    templates = _.groupBy(result, function(group) {
                        return group.translationCategoryId;
                    });
                    return next();
                });
            },
            getCategories: function(next) {
                if(_.isEmpty(req.body.templateSelectId)) {
                    return next();
                } else {
                    ModelTranslation.getTranslationsByTemplateId(req.body.templateSelectId, req.body.cultureSelectId, function(err, result) {
                        if (err) return next(err);
                        translations = result;
                        return next();
                    });
                }

            }
        }, function(err) {
            if (err) return next(err);


            return new View(req, res, 'translation/index').renderWidth({
                cultures: cultures,
                templates: templates,
                translations: translations,
                cultureSelectId: req.body.cultureSelectId,
                templateSelectId: req.body.templateSelectId,
                untranslated: untranslated
            });
        });

    },
    add: function(req, res, next) {
        if(_.isEmpty(req.query.templateId)) {
            req.query.templateId = null;
        }
        ModelTemplate.getTemplates(null, function(err,result) {
            if (err) return next(err);

            return new View(req, res, 'translation/add').renderWidth({
                templateId: req.query.templateId,
                templates: result
            });
        });

    },
    create: function(req, res, next) {
        if (!req.body.key) {
            return new View(req, res, '/translation/add').redirectTo({
                error: 'name/key is missing'
            });

        } else {
            console.log(req.body.key);
            ModelTranslation.addTranslation(req.body.key, function(err) {
                if (err) return next(err);

                res.writeHead(302, {
                    'Location': '/translation',

                    //add other headers here...
                });
                res.end();
            });
        }
    },
    edit: function(req, res, next) {

        ModelTranslation.getupdateTranslation(req.params.id, function(err, result) {

            if (err) return next(err);
            return new View(req, res, 'translation/edit').renderWidth({
                category: result
            });

        });

    },
    update: function(req, res, next) {
        if (!req.body.translationCategoryId || !req.body.categoryName) {
            res.writeHead(302, {
                'Location': '/translation'
                //add other headers here...
            });
            res.end();
        }

        ModelTranslation.updateTranslation(req.body.translationCategoryId, req.body.categoryName, function(err) {
            if (err) return next(err);
            res.writeHead(302, {
                'Location': '/translation'
                //add other headers here...
            });
            res.end();
        });
    }

});
