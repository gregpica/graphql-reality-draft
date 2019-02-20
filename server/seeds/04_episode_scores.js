
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('episode_scores').del()
    .then(function () {
      // Inserts seed entries
      return knex('episode_scores').insert([
        {number: 1, showId: 1, characterId: 1, points: 1},
        {number: 1, showId: 1, characterId: 2, points: 3},
        {number: 1, showId: 1, characterId: 3, points: 0},
        {number: 2, showId: 1, characterId: 1, points: 1},
        {number: 2, showId: 1, characterId: 2, points: 1},
        {number: 2, showId: 1, characterId: 3, points: 0},
        {number: 1, showId: 2, characterId: 4, points: 1},
        {number: 1, showId: 2, characterId: 5, points: 1},
        {number: 1, showId: 2, characterId: 6, points: 1},
        {number: 2, showId: 2, characterId: 4, points: 1},
        {number: 2, showId: 2, characterId: 5, points: 2},
        {number: 2, showId: 2, characterId: 6, points: 0}
      ]);
    });
};
