
// Import d’Express et création du routeur
const express = require('express');
const router = express.Router();



// =========================
// GET /users → récupérer tous les utilisateurs
// =========================
router.get('/', async (req, res) => {
  const users = await User.find();
  res.json(users);
});

// =========================
// POST /users → créer un utilisateur
// =========================
router.post('/', async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

// =========================
// DELETE /users/:id → supprimer un utilisateur
// =========================
router.delete('/:id', async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ status: 'deleted' });
});

// Export du routeur
module.exports = router;
  