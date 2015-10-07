var router = require('koa-route');
var errors = require('http-errors');
var db = require('../lib/db');

function getPokemon(id) {
    var criteria = isFinite(id) ? { 'pokemon.species_id': id } : { 'pokemon.identifier': id.toLowerCase() };

    criteria.local_language_id = 9;

    return db.first('pokemon.*', 'pokemon_species_names.name')
        .from('pokemon')
        .innerJoin('pokemon_species_names', 'pokemon_species_names.pokemon_species_id', '=', 'pokemon.species_id')
        .where(criteria)
        .then(function (row) {
            if (!row) {
                throw errors.NotFound();
            } else {
                return getStats(row.id).then(function (stats) {
                    row.stats = stats;

                    return row;
                });
            }
        })
}

function getStats(id) {
    return db.select('pokemon_stats.base_stat', 'stats.identifier')
        .from('pokemon_stats')
        .innerJoin('stats', 'pokemon_stats.stat_id', '=', 'stats.id')
        .where({ pokemon_id: id })
        .then(function (stats) {
            return stats.reduce(function (obj, curr) {
                obj[curr.identifier.replace('-', '_')] = curr.base_stat;
                return obj;
            }, {});
        });
}

module.exports = [
    router.get('/v1/pokemon/:id', function *(id) {
        this.body = yield getPokemon(id);
    })
];
