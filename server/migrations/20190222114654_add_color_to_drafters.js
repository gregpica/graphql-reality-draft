
exports.up = function(knex, Promise) {
    return knex.schema.table('drafters', function(t) {
        t.string('color');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('drafters', function(t) {
        t.dropColumn('color');
    });
};