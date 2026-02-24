
// Charger les variables d'environnement
require('dotenv').config();

// Importer Express et CORS
const express = require('express');
const cors = require('cors');

// Importer le proxy HTTP middleware
const { createProxyMiddleware } = require('http-proxy-middleware');

// Création de l'application Express
const app = express();
app.use(cors());

// =========================
// Proxy vers le service User
// Toutes les requêtes /users seront redirigées vers http://localhost:5000
const userProxy = createProxyMiddleware({ target: 'http://localhost:5000', changeOrigin: true });
app.use('/users', userProxy);

// Proxy vers le service Post
// Toutes les requêtes /posts seront redirigées vers http://localhost:6000
const postProxy = createProxyMiddleware({ target: 'http://localhost:6000', changeOrigin: true });
app.use('/posts', postProxy);

// Lancer le Gateway
app.listen(process.env.PORT, () => 
  console.log(`Gateway running on port ${process.env.PORT}`)
);
  