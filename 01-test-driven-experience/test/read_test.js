const assert = require('assert');
const User = require('../src/user');

describe('reading records', () => {
  let edwina;

  beforeEach((done) => {
    edwina = new User({name:'edwina anky'});
    edwina.save().then(() => done());
  });

  it('should find all record with name edwina anky', (done) => {
      User.find({name:'edwina anky'}).then(users => {
        assert(users[0]._id.toString() === edwina._id.toString())
        done();
      });
  });

  it('should find a user with a particular id', (done) => {
      User.findOne({_id: edwina._id}).then(user => {
        assert(user._id.toString() === edwina._id.toString())
        done();
      });
  });
})
