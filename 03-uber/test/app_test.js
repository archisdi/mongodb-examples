const assert = require('assert');
const request = require('supertest');
const app = require('../app');

describe('main app', () => {

  it('should handlea GET request to /api', (done) => {
      request(app).get('/api').end((err, res) => {
        assert(res.body.message === 'hello world')
        done()
      });
  })

});
