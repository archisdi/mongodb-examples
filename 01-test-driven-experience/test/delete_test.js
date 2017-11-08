const assert = require('assert');
const User = require('../src/user');

describe('deleting records', () => {
  let edwina;

  beforeEach((done) => {
    edwina = new User({name:'edwina anky'});
    edwina.save().then(() => done());
  });

  it('should delete with model instance remove', (done) => {
    edwina.remove().then(() =>
      User.findOne({name:'edwina anky'})
    ).then(user => {
      assert(user === null);
      done();
    });
  });

  it('should delete with class method remove', (done) => {
    // remove a bunch data with same criteria
    User.remove({name:'edwina anky'}).then(() =>
      User.findOne({name:'edwina anky'})
    ).then(user => {
      assert(user === null);
      done();
    });
  });

  it('should delete with class method findAndRemove', (done) => {
    User.findOneAndRemove({name:'edwina anky'}).then(() =>
      User.findOne({name:'edwina anky'})
    ).then(user => {
      assert(user === null);
      done();
    });
  });

  it('should delete with class method findByIdAndRemove', (done) => {
    User.findByIdAndRemove(edwina._id).then(() =>
      User.findOne({name:'edwina anky'})
    ).then(user => {
      assert(user === null);
      done();
    });
  });

})
