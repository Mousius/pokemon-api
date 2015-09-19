var util = require('util');
var knex = require('knex');

function buildConnectionString() {
    return util.format(
        "postgresql://%s:%s@pokedex/%s",
        process.env.POSTGRES_USER,
        process.env.POSTGRES_PASSWORD,
        process.env.POSTGRES_DB
    );
}

module.exports = knex({
    client: "pg",
    connection: buildConnectionString()
});
