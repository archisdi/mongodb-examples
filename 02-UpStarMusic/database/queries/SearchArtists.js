const Artist = require('../models/artist');

/**
 * Searches through the Artist collection
 * @param {object} criteria An object with a name, age, and yearsActive
 * @param {string} sortProperty The property to sort the results by
 * @param {integer} offset How many records to skip in the result set
 * @param {integer} limit How many records to return in the result set
 * @return {promise} A promise that resolves with the artists, count, offset, and limit
 */

function buildQuery(crit) {
    let query = {};

    if(crit.name){
      query.$text = { $search: crit.name}
    }

    if (crit.age){
      query.age = {
        $gte: crit.age.min,
        $lte: crit.age.max
      }
    }

    if (crit.yearsActive){
      query.yearsActive = {
        $gte: crit.yearsActive.min,
        $lte: crit.yearsActive.max
      }
    }

    return query;
}

module.exports = (criteria, sortProperty, offset = 0, limit = 20) => {
  let query =  Artist.find(buildQuery(criteria)).sort(sortProperty).skip(offset).limit(limit);

  return Promise.all([query,Artist.find(buildQuery(criteria)).count()])
    .then(res => {
      return {
        all:res[0],
        count:res[1],
        offset:offset,
        limit:limit
      }
    })
};
