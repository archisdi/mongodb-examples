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

const User = mongoose.model('user', UserSchema);

module.exports = User;
