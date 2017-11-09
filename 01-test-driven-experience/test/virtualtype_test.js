const assert = require('assert');
const User = require('../src/user');

describe('virtual type', () => {

  it('postCount return number of posts', (done) => {
    let user = new User({name:'edwina anky','posts':[{title:'postTitle'}]})

    user.save()
    .then(() => User.findOne({name:'edwina anky'}))
    .then((user) => {
      assert(user.postCount === 1);
      done();
    })
  });


})
