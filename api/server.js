const ROUTES_FOLDER = __dirname + '/routes';

var koa = require('koa');
var app = koa();
var error = require('./lib/error');
var errors = require('http-errors');
var fs = require('fs');
var path = require('path');
var routes = fs.readdirSync(ROUTES_FOLDER);
var cacheControl = require('koa-cache-control');

// Catchs any errors thrown below
app.use(cacheControl({ maxAge: 60, staleIfError: 300 }));
app.use(error);

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
