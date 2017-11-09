const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

before((done) => {
  mongoose.connect('mongodb://127.0.0.1/users_test');
  mongoose.connection.once('open', () => done()
  ).on('error',(err) => {
    console.log('Error : ' + err);
  });
})

beforeEach((done) => {
  const { users, comments, blogposts } = mongoose.connection.collections;
  users.drop(() => {
    comments.drop(() => {
      blogposts.drop(() => {
        done()
      });
    });
  });
});
