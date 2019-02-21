
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('rules', table => {
            table.increments('id').primary()
            table.string('name')
            table.integer('points')
            table.bigInteger('showId').unsigned().index().references('id').inTable('shows').onDelete('CASCADE')
        })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('rules')
  ])
};
