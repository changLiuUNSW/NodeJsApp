/**
 * Module dependencies.
 */

var express         = require('express'),
colors              = require('colors'),
path                = require('path'),
settings            = require('./settings')(),
app                 = express();

var routes          = require("./routes");
var less            = require('less-middleware');

var session         = require('express-session');
var redisStore      = require('connect-redis')(session);
var bodyParser      = require('body-parser');
var auth            = require("http-auth");

var cookieParser    = require('cookie-parser');
/*var cookieSession = require('cookie-session');*/
var serveStatic     = require('serve-static');
var csurf           = require('csurf');
var morgan          = require('morgan');
var errorhandler    = require('errorhandler');
var consolidate     = require('consolidate');
var flash           = require('connect-flash');
// var ejs           = require('ejs');


if(settings.mode === 'staging') {
  var basic = auth.basic({
      realm: "Private Server.",
      file: __dirname + "/htpasswd" // staging:wetasker ...
  });
  app.use(auth.connect(basic));
}



app.set('port', process.env.PORT || 8081);

app.set('views', __dirname + '/templates');
app.set('view engine', "html");
app.engine('html', consolidate.underscore);
// app.engine('html', ejs.renderFile);


app.use(morgan('combined'));
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// parse application/vnd.api+json as json
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(cookieParser());
app.use(session({
    store: new redisStore({
        host: '127.0.0.1',
        port: 6379,
        prefix: 'admin_session'
    }),
    secret: 'SEKR37',
    resave: true,
    saveUninitialized: true
}));

// app.use(csurf());
//this line should be above the router
app.use(express.static(path.join(__dirname, 'public')));
// development only
if (settings.mode === 'development') {
    app.use(errorhandler());
}
app.use(flash());


routes.routes(app);

var webServer = app.listen(process.env.PORT || 8081);
console.log("Admin listening on port %d".yellow, webServer.address().port);
