
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('characters', table => {
            table.increments('id').primary()
            table.string('name')
            table.string('image')
            table.bigInteger('showId').unsigned().index().references('id').inTable('shows').onDelete('CASCADE')
            table.bigInteger('drafterId').unsigned().index().references('id').inTable('drafters').onDelete('CASCADE')
        })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('characters')
  ])
};
