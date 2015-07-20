var ejs = require('ejs');
var fs = require('fs');
var helper = require('./Helper');
var _ = require('underscore');

module.exports = function(request, response, template) {
    this.request = request;
    this.response = response;
    this.template = template;
};
module.exports.prototype = {
    extend: function(properties) {
        var Child = module.exports;
        Child.prototype = module.exports.prototype;
        for (var key in properties) {
            Child.prototype[key] = properties[key];
        }
        return Child;
    },

    render: function(data) {
        if (this.response && this.template) {
            this.response.render(this.template, data);
        } else {
            console.log('wrong template');
        }
    },
    renderWidth: function(data) {
        var self = this;
        if (this.template) {
            if(!data) {
                data = {};
            }
            if(!data.error) {
                data.error = null;
            }


            var path = __dirname + '/../templates/' + this.template + '.html';
            var str = fs.readFileSync(path, 'utf8');
            // console.log(_.extend(data, helper));
            var content = ejs.render(str, _.extend(data, helper, _));

            this.response.render('layout', {
                user: this.request.session.user,
                content: content,
                flash: self.request.flash()
            });
        } else {
            console.log('wrong template');
        }
    },

    /**
     * data is the flashing message that show in the page
     * @param  {[type]} data [description]
     * @return {[type]}      [description]
     */
    redirectTo: function(data) {
        var self = this;
        if (this.request && this.response && this.template) {
            if(data) {
                ['error', 'info', 'success'].forEach(function(type) {
                    if(data[type]) {
                        self.request.flash(type, data[type]);
                    }
                });
            }

            this.response.redirect(this.template);
        } else {
            console.log('missing res/req/template');
        }
    }
};
