const Artist = require('../models/artist');

/**
 * Finds the lowest and highest age of artists in the Artist collection
 * @return {promise} A promise that resolves with an object
 * containing the min and max ages, like { min: 16, max: 45 }.
 */
module.exports = () => {
  let min = Artist.find({}).sort({age:1}).limit(1).then((artist) => artist[0].age);
  let max = Artist.find({}).sort({age:-1}).limit(1).then((artist) => artist[0].age);

  return Promise.all([min,max])
          .then(res => {
            return Promise.resolve({ min: res[0], max: res[1] })
          })
};
