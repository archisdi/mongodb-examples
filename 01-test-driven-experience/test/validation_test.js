const assert = require('assert');
const User = require('../src/user');

describe('validating records', () => {

  it('require a name', () => {
    const user = new User({name:undefined});
    const valid = user.validateSync();
    const { message } =  valid.errors.name;
    assert(message === 'User name is required');
  });

  it('require name to be longer than 2 character', () => {
    const user = new User({name:'AR'});
    const valid = user.validateSync();
    const { message } =  valid.errors.name;
    assert(message === 'Name must be longer than 2 character');
  });

  it('should disallow invalid user to be saved', (done) => {
    const user = new User({name:'AR'});
    user.save()
    .catch(err => {
      const { message } =  err.errors.name;
      assert(message === 'Name must be longer than 2 character');
      done();
    });
  })
  
})
