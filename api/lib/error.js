var http = require('http');
var env = process.env.NODE_ENV;

function* error(next) {
  try {
    yield next;
    if (this.response.status && this.response.status > 400) {
      this.throw(this.response.status);
    }
  } catch (err) {
    this.status = err.status || 500;
    this.type = 'application/json';
    this.cacheControl = {
      maxAge: 15,
      staleIfError: false
    };

    if (env === 'dev') {
      this.body = { error: err.message };
    } else {
      this.body = { error: http.STATUS_CODES[this.status] };
    }
  }
}

module.exports = error;
