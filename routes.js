/************** WEB ROUTES **********************/

var Base                = require('./controllers/Base');
var settings            = require('./settings')();
var Admin               = require('./controllers/Admin');
var AdminRole           = require('./controllers/AdminRole');
var Member              = require('./controllers/Member');
var AdminUser           = require('./controllers/AdminUser');
var TranslationCategory = require('./controllers/TranslationCategory');
var TranslationTemplate = require('./controllers/TranslationTemplate');
var Translation         = require('./controllers/Translation');
var TaskApproval        = require('./controllers/TaskApproval');


exports.routes = function(app) {



    app.get('/password', Base.init, Admin.editPassword);
    app.post('/password', Base.init, Admin.updatePassword);

    app.get('/role', Base.init, AdminRole.run);
    app.get('/role/add', Base.init, AdminRole.add);
    app.post('/role/create', Base.init, AdminRole.create);
    app.get('/member', Base.init, Member.run);
    app.get('/role/edit/:id', Base.init, AdminRole.edit);
    app.post('/role/update', Base.init, AdminRole.update);

    app.get('/users', Base.init, AdminUser.run);
    app.get('/users/:id', Base.init, AdminUser.edit);
    app.post('/users/:id', Base.init, AdminUser.update);

    app.get('/translationcategory', Base.init, TranslationCategory.run);
    app.get('/translationcategory/add', Base.init, TranslationCategory.add);
    app.post('/translationcategory/create', Base.init, TranslationCategory.create);
    app.get('/translationcategory/edit/:id', Base.init, TranslationCategory.edit);
    app.post('/translationcategory/update', Base.init, TranslationCategory.update);

    app.all('/translationtemplate', Base.init, TranslationTemplate.run);
    app.get('/translationtemplate/add', Base.init, TranslationTemplate.add);
    app.post('/translationtemplate/create', Base.init, TranslationTemplate.create);
    app.get('/translationtemplate/edit/:id', Base.init, TranslationTemplate.edit);
    app.post('/translationtemplate/update', Base.init, TranslationTemplate.update);

    app.all('/translation', Base.init, Translation.run);
    app.get('/translation/add', Base.init, Translation.add);
    app.post('/translation/create', Base.init, Translation.create);
    app.get('/translation/edit/:id', Base.init, Translation.edit);
    app.post('/translation/update', Base.init, Translation.update);


    app.get('/taskapproval', Base.init, TaskApproval.run);
    app.get('/taskapproval/processnow/:cultureId', Base.init, TaskApproval.processnow);


    app.all('/home', function(req, res, next) {
        Admin.run(req, res, next);
    });
    app.all('/*', function(req, res, next) {
        //all other router redirect to the index page
        res.writeHead(302, {
            'Location': '/home'
            //add other headers here...
        });
        res.end();
    });
};

