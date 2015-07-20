var ejs    = require('ejs');
var fs     = require('fs');
var moment = require('moment');
var _      = require('underscore');

module.exports = {
    Format_Date_Full: function(dateValue) {
        if(!dateValue) {
            return moment().format('DD MMM YYYY HH:MM:SS');
        } else {
            return moment(dateValue).format('DD MMM YYYY HH:MM:SS');
        }

    },
    Format_Date_Short: function(dateValue) {
        return moment(dateValue).format('DD MMM YYYY');
    },
    Format_Date_Week: function(dateValue) {
        return moment(dateValue).format('DDDD DD-MMM-YYYY');
    },
    /**
     * View Helper for selection tag
     * @param {[type]} args {
     *                      name,
     *                      id,
     *                      valueField,
     *                      textField,
     *                      selected
     *                      options, array/struct
     * }
     */
    Selection_Tag: function(args) {
        var html = '';
        if(!args.class) {
            args.class= '';
        }
        if(!args.id) {
            args.id = args.name;
        }
        if(args.onChangeSubmit) {
            html += '<select name="' + args.name + '" class="' + args.class  + '" id="' + args.id + '" onchange="this.form.submit();">';
        } else {
            html += '<select name="' + args.name + '" class="' + args.class + '" id="' + args.id + '">';
        }

        if(args.includeBlank) {
            html += '<option>' + args.includeBlank + '</option>';
        }
        _.each(args.options, function(option) {
            if(args.selected && String(args.selected) === String(option[args.valueField])) {
                html += '<option value="' + option[args.valueField] + '" selected>' + option[args.textField] + '</option>';
            } else {
                html += '<option value="' + option[args.valueField] + '">' + option[args.textField] + '</option>';
            }

        });
        html += '</select>';


        return html;
    }

};
