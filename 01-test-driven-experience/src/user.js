const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const PostSchema = require('./post');

const UserSchema = new Schema({
  name: {
    type: String,
    // Validation function
    validate:{
      validator: (name) => name.length > 2,
      message: 'Name must be longer than 2 character'
    },
    // Require validation
    required: [true, 'User name is required']
  },
  // postCount: Number, // => Changed to virtual field
  posts: [ PostSchema ],
  likes: Number,
  blogposts: [{ type:Schema.Types.ObjectId, ref:'blogPost'}]
});

UserSchema.virtual('postCount').get(function(){
  return this.posts.length;
});

// pre middleware
UserSchema.pre('remove',function (next) {
  const BlogPost = mongoose.model('blogPost');
  BlogPost.remove({_id:{$in:this.blogposts}})
  .then(() => next())
});

const User = mongoose.model('user', UserSchema);

module.exports = User;
