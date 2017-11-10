const assert = require('assert');
const User = require('../src/user');

describe('reading records', () => {
  let user,user2,user3,user4,user5;

  beforeEach((done) => {
    user = new User({name:'edwina anky'});
    user2 = new User({name:'archie isdiningrat'});
    user3 = new User({name:'angga isdiningrat'});
    user4 = new User({name:'ryan ade'});
    user5 = new User({name:'fadhlurrahman'});

    Promise.all([user.save(),user2.save(),user3.save(),user4.save(),user5.save()])
    .then(() => done());

  });

  it('should find all record with name edwina anky', (done) => {
      User.find({name:'edwina anky'}).then(users => {
        assert(users[0]._id.toString() === user._id.toString())
        done();
      });
  });

  it('should find a user with a particular id', (done) => {
      User.findOne({_id: user._id}).then(user => {
        assert(user._id.toString() === user._id.toString())
        done();
      });
  });

 // paginate and sort
  it('should implement paginate', (done) => {
      User.find({}).sort({name:1}).skip(1).limit(2)
      .then(users => {
        assert(users.length === 2);
        assert(users[0].name === 'archie isdiningrat');
        assert(users[1].name === 'edwina anky');
        done()
      })
      .catch(err => console.log(err))
  });
})
