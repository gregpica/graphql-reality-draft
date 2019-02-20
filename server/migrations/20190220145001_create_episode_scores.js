
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('episode_scores', table => {
            table.increments('id').primary()
            table.integer('number')
            table.integer('points')
            table.bigInteger('showId').unsigned().index().references('id').inTable('shows').onDelete('CASCADE')
            table.bigInteger('characterId').unsigned().index().references('id').inTable('characters').onDelete('CASCADE')
        })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('episode_scores')
  ])
};