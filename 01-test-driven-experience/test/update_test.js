const assert = require('assert');
const User = require('../src/user');

describe('updating records', () => {
  let edwina;

  beforeEach((done) => {
    edwina = new User({name:'edwina anky'});
    edwina.save().then(() => done());
  });

  function assertName(operation, done) {
    operation
    .then(() =>
      User.find({})
    )
    .then(users => {
      assert(users[0].name === 'parande');
      assert(users.length === 1);
      done();
    })
    .catch(err => console.log(err));
  }

  it('should update with model instance update', (done) => {
      assertName(edwina.update({name:'parande'}), done);
  });

  it('should update with model instance set and save', (done) => {
      edwina.set('name','parande');
      assertName(edwina.save(), done);
  });

  it('should update with model class update', (done) => {
    assertName(User.update({name: 'edwina anky'}, {name:'parande'}), done)
  });

  it('should update with model class findOneAndUpdate', (done) => {
    assertName(User.findOneAndUpdate({name: 'edwina anky'}, {name:'parande'}), done)
  });

  it('should update with model class findByIdAndUpdate', (done) => {
    assertName(User.findByIdAndUpdate(edwina._id, {name:'parande'}), done)
  });

})
