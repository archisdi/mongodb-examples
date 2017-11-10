const assert = require('assert');
const request = require('supertest');
const app = require('../../app');
const mongoose = require('mongoose');
const Driver = mongoose.model('driver');

describe('main app', () => {

  it('should create a driver', (done) => {
      Driver.count().then(count => {

        request(app).post('/api/driver').send({email:'archie@gmail.c'}).end((err, res) => {
          Driver.count().then(newCount => {
            assert(count + 1 === newCount);
            done();
          });
        });

      });
  });

});
