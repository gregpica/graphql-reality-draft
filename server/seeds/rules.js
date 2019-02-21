
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('rules').del()
    .then(function () {
      // Inserts seed entries
      return knex('rules').insert([
        {showId: 1, name: 'Pre-ceremony rose', points: 2},
        {showId: 1, name: 'Ceremony rose', points: 1},
        {showId: 2, name: 'Wins challenge', points: 1},
        {showId: 2, name: 'Survives episode', points: 1}
      ]);
    });
};
