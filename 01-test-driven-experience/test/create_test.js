const assert = require('assert');
const User = require('../src/user');

describe('creating records', () => {
  it('should create new record', (done) => {
    let edwina = new User({name:'edwina anky'});

    edwina.save().then(() => {
      assert(!edwina.isNew);
      done()
    });
    
  })
})
