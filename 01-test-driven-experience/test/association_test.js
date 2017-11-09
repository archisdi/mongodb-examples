const assert = require('assert');
const User = require('../src/user');
const Comment = require('../src/comment');
const BlogPost = require('../src/blogPost');

describe('association records', () => {
  let user, blogPost, comment

  beforeEach((done) => {
    user = new User({name:'edwina anky'})
    blogpost = new BlogPost({title:'face treatment',content:'lorem ipsum dolor amet'})
    comment = new Comment({content:'nice info sis'})

    user.blogposts.push(blogpost);
    blogpost.comments.push(comment);
    comment.user = user;

    Promise.all([user.save(), blogpost.save(), comment.save()])
    .then(() => done());

  })


  it('should show relation between user and blogpost', (done) => {
    User.findOne({name:'edwina anky'})
    .populate('blogposts')
    .then((user) => {
      assert(user.blogposts[0].title === 'face treatment')
      done();
    })
  })

  it('should show nested relations between models', (done) => {
    User.findOne({name:'edwina anky'})
    .populate({
      path:'blogposts',
      populate:{
        path:'comments',
        model:'comment',
        populate:{
          path:'user',
          model:'user'
        }
      }
    })
    .then((user) => {
      assert(user.blogposts[0].title === 'face treatment')
      assert(user.blogposts[0].comments[0].content === 'nice info sis')
      assert(user.blogposts[0].comments[0].user.name === 'edwina anky')
      done();
    })
  })
})
