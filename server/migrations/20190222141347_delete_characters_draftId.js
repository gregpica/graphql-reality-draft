
exports.up = function(knex, Promise) {
    return knex.schema.table('characters', function(t) {
        t.dropColumn('drafterId');
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.table('characters', function(t) {
        t.bigInteger('drafterId').unsigned().index().references('id').inTable('drafters').onDelete('CASCADE');
    });
};