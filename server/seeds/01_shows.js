
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('shows').del()
    .then(function () {
      // Inserts seed entries
      return knex('shows').insert([
        {id: 1, name: 'The Bachelor: Season 23'},
        {id: 2, name: 'MasterChef Junior: Season 6'}
      ]);
    });
};
