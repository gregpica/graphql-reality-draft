const demiImage = 'https://www.etonline.com/sites/default/files/styles/max_970x546/public/images/2018-12/1280_demi_150167_0176_1.jpg?itok=kTa1wJe0&h=854a7be2';
const miamiImage = 'https://imgix.bustle.com/uploads/image/2018/12/26/569dbb82-88ba-44d6-b863-527f8dc2638b-150167_2138.jpg';
const aussieImage = 'https://peopledotcom.files.wordpress.com/2019/01/bachelor-contestant-fake-accent-2.jpg';
const beniImage = 'http://www.trbimg.com/img-5abeaca9/turbine/ct-ent-masterchef-junior-beni-cwiakala-pierce-cleaveland-20180330';
const averyImage = 'https://pbs.twimg.com/media/DcZcpZTV4AAwPei.jpg';
const quaniImage = 'http://www.wtvm.com/resizer/LDDthsbdFwAgdIFm3xSmy0seulE=/1200x0/arc-anglerfish-arc2-prod-raycom.s3.amazonaws.com/public/F6Z6QNORWNBHBMNS2VFUE4ZHVE.jpg';

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('characters').del()
    .then(function () {
      // Inserts seed entries
      return knex('characters').insert([
        {id: 1, name: 'Demi', image: demiImage, showId: 1, drafterId: 1},
        {id: 2, name: 'Miami', image: miamiImage, showId: 1, drafterId: 1},
        {id: 3, name: 'Aussie', image: aussieImage , showId: 1, drafterId: 2},
        {id: 4, name: 'Beni', image: beniImage, showId: 2, drafterId: 1},
        {id: 5, name: 'Avery', image: averyImage, showId: 2, drafterId: 2},
        {id: 6, name: 'Quani', image: quaniImage, showId: 2, drafterId: 2}
      ]);
    });
};
