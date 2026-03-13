const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const app = express();

app.use(cors());

// Middleware d'authentification standard
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) return res.sendStatus(401);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Routes de Login (Besoin de JSON body parser ici uniquement)
app.post('/login', express.json(), (req, res) => {
  const { email } = req.body;
  const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
});

// PROXIES
// Note: On utilise createProxyMiddleware en mode global (sans mount point express) 
// pour éviter que le préfixe ne soit supprimé.

// 1. Users (Public)
app.use(createProxyMiddleware({
  target: process.env.USER_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/users'
}));

// 2. Posts (Protégé)
app.use('/posts', authenticateToken);
app.use(createProxyMiddleware({
  target: process.env.POST_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/posts'
}));

// 3. Comments (Protégé)
app.use('/comments', authenticateToken);
app.use(createProxyMiddleware({
  target: process.env.COMMENT_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/comments'
}));

// 4. Feed (Protégé)
app.use('/feed', authenticateToken);
app.use(createProxyMiddleware({
  target: process.env.FEED_SERVICE_URL,
  changeOrigin: true,
  pathFilter: '/feed'
}));

app.listen(process.env.PORT, () => {
  console.log(`API Gateway running on port ${process.env.PORT}`);
});