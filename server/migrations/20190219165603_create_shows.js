
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('shows', table => {
            table.increments('id').primary()
            table.string('name')
        })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('shows')
  ])
};
