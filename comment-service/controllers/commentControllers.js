const Comment = require('../models/Comment');

exports.getComments = async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
};

exports.createComment = async (req, res) => {
  const comment = new Comment(req.body);
  await comment.save();
  res.json(comment);
};