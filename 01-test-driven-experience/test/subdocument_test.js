const assert = require('assert');
const User = require('../src/user');

describe('subdocuments', () => {

  it('should create a sub document', (done) => {
    const user = new User({
      name:'edwina anky',
      posts:[{title:'postTitle'}]
    })

    user.save()
    .then(() => User.findOne({name:'edwina anky'}))
    .then((user) => {
      assert(user.posts[0].title === 'postTitle');
      done();
    })
  });

  it('should create a sub document to existing record', (done) => {
    const user = new User({
      name:'edwina anky',
    });

    user.save()
    .then(() => User.findOne({name:'edwina anky'}))
    .then((user) => {
      user.posts.push({title:'postTitle'});
      return user.save()
    })
    .then(() => User.findOne({name:'edwina anky'}))
    .then((user) => {
      assert(user.posts[0].title === 'postTitle');
      done()
    })

  })

  it('should remove a sub document from existing record', (done) => {
    const user = new User({
      name:'edwina anky',
      posts:[{title:'postTitle'}]
    })

    user.save()
    .then(() => User.findOne({name:'edwina anky'}))
    .then((user) => {
      user.posts[0].remove();
      return user.save()
    })
    .then(() => User.findOne({name:'edwina anky'}))
    .then((user) => {
      assert(user.posts.length === 0);
      done();
    })
  })
})
