const leroyImage = 'https://images.unsplash.com/photo-1520796412393-db86e624492e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80';
const ollieImage = 'https://images.unsplash.com/photo-1533450718592-29d45635f0a9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=800&q=60';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('drafters').del()
    .then(function () {
      // Inserts seed entries
      return knex('drafters').insert([
        {id: 1, name: 'Leroy', image: leroyImage},
        {id: 2, name: 'Ollie', image: ollieImage}
      ]);
    });
};