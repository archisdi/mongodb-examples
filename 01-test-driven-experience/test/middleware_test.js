const assert = require('assert');
const User = require('../src/user');
const BlogPost = require('../src/blogPost');

describe('middleware', () => {

  beforeEach((done) => {
    user = new User({name:'edwina anky'})
    blogpost = new BlogPost({title:'face treatment',content:'lorem ipsum dolor amet'})

    user.blogposts.push(blogpost);

    Promise.all([user.save(), blogpost.save()])
    .then(() => done());

  })

  it('should remove associating record of user', (done) => {
      user.remove()
      .then(() => BlogPost.count())
      .then(count => {
        assert(count === 0)
        done()
      });
  })
})
