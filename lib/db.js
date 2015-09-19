var config = require('config');
var knex = require('knex');

module.exports = knex(config.get('database'));