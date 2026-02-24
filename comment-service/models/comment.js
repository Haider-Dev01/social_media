const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  content: String,
  postId: String
});

module.exports = mongoose.model('Comment', commentSchema);