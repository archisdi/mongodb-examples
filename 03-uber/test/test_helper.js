const mongoose = require('mongoose');


before((done) => {
  mongoose.connect('mongodb://127.0.0.1/uber_test')
  mongoose.connection.once('open',() => done());
})

beforeEach((done) => {
  const { drivers } = mongoose.connection.collections;
  drivers.drop()
  .then(() => done())
  .catch((err) => done() )
})
