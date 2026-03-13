const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const axios = require('axios');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get('/feed', async (req, res) => {
  try {
    // 1. Fetch Posts
    const postsResponse = await axios.get(`${process.env.POST_SERVICE_URL}/posts`);
    const posts = postsResponse.data;

    // 2. Fetch Users
    const usersResponse = await axios.get(`${process.env.USER_SERVICE_URL}/users`);
    const users = usersResponse.data;
    
    // Create a map for quick user lookup
    const userMap = {};
    users.forEach(u => {
      userMap[u._id] = u;
    });

    // 3. Fetch Comments
    let comments = [];
    try {
        const commentsResponse = await axios.get(`${process.env.COMMENT_SERVICE_URL}/comments`);
        comments = commentsResponse.data;
    } catch (commentErr) {
        console.warn("Could not fetch comments:", commentErr.message);
    }
    
    // Group comments by postId
    const commentMap = {};
    comments.forEach(c => {
        if (!commentMap[c.postId]) commentMap[c.postId] = [];
        commentMap[c.postId].push(c);
    });

    // 4. Aggregate
    const feed = posts.map(post => {
        return {
            ...post, // Convert mongoose document properties if needed, but normally raw JSON here
            author: userMap[post.userId] || { name: 'Unknown User', _id: post.userId },
            comments: commentMap[post._id] || []
        };
    });

    res.json(feed);
  } catch (error) {
    console.error("Error generating feed:", error.message);
    res.status(500).json({ error: "Failed to generate feed" });
  }
});

app.listen(process.env.PORT, () => {
  console.log(`Feed Service (Aggregator) running on port ${process.env.PORT}`);
});
