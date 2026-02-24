const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());

// Proxy vers user-service
app.use(
  '/users',
  createProxyMiddleware({
    target: process.env.USER_SERVICE_URL,
    changeOrigin: true,
  })
);

const { createProxyMiddleware } = require('http-proxy-middleware');

app.use(
  '/users',
  createProxyMiddleware({
    target: 'http://localhost:5000',
    changeOrigin: true,
  })
);

app.use(
  '/posts',
  authenticateToken,
  createProxyMiddleware({
    target: 'http://localhost:5001',
    changeOrigin: true,
  })
);

const jwt = require('jsonwebtoken');

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

app.post('/login', (req, res) => {
  const { email } = req.body;

  const token = jwt.sign(
    { email },
    process.env.JWT_SECRET,
    { expiresIn: '1h' }
  );

  res.json({ token });
});

app.listen(process.env.PORT, () => {
  console.log(`API Gateway running on port ${process.env.PORT}`);
});