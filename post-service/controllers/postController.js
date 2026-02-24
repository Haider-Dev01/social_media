const Post = require('../models/Post');

exports.getPosts = async (req, res) => {
  const posts = await Post.find();
  res.json(posts);
};

exports.createPost = async (req, res) => {
  const post = new Post(req.body);
  await post.save();
  res.json(post);
};