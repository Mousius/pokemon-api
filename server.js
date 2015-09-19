const ROUTES_FOLDER = __dirname + '/routes';

var koa = require('koa');
var app = koa();
var error = require('koa-error');
var errors = require('http-errors');
var fs = require('fs');
var path = require('path');
var routes = fs.readdirSync(ROUTES_FOLDER);

// Catchs any errors thrown below
app.use(error());

routes.forEach(function (route) {
    require(path.join(ROUTES_FOLDER, route)).forEach(function (path) {
         app.use(path);
    });
});

// Catch all 404 :)
app.use(function *(){
    this.throw(errors.NotFound());
});

app.listen(3000);
