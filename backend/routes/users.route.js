const express = require('express');
const router = express.Router();
const User = require('../Models/user');
const {requireAuth} =require("../middleware/auth")
// Get all users
router.get('/',requireAuth, async (req, res) => {
  try {
    const users = await User.find({});
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get a single user by id
router.get('/:id', requireAuth,getUser, (req, res) => {
  res.json(res.user);
});

// Limit results
router.get('/limit/:limit',requireAuth, async (req, res) => {
  try {
    const limit = parseInt(req.params.limit);
    const users = await User.find({}).limit(limit);
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sort results
router.get('/sort/:field',requireAuth, async (req, res) => {
  try {
    const field = req.params.field;
    const users = await User.find({}).sort({ [field]: 1 });
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new user
router.post('/',requireAuth, async (req, res) => {
  const user = new User({
    id: req.body.id,
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  });

  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a user by id
router.patch('/:id',requireAuth, getUser, async (req, res) => {
  if (req.body.id != null) {
    res.user.id = req.body.id;
  }
  if (req.body.username != null) {
    res.user.username = req.body.username;
  }
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }
  if (req.body.password != null) {
    res.user.password = req.body.password;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a user by id
router.delete('/:id',requireAuth, getUser, async (req, res) => {
  try {
    await res.user.deleteOne({ id: req.params.id });
    res.json({ message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

async function getUser(req, res, next) {
  try {
    const { id } = req.params;
    const user = await User.findOne({ id : id });
    if (user == null) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.user = user;
    next();
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
}

module.exports = router;
