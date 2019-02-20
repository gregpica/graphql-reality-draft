
exports.up = function(knex, Promise) {
    return Promise.all([
        knex.schema.createTable('drafters', table => {
            table.increments('id').primary()
            table.string('name')
            table.string('image')
        })
    ])
};

exports.down = function(knex, Promise) {
  return Promise.all([
      knex.schema.dropTable('drafters')
  ])
};
