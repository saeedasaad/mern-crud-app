const express = require('express');
const router = express.Router();
const User = require('../models/User');

// CREATE user
router.post('/', async (req, res) => {
  try {
    const { name, email, phone, address, birthday, jobTitle, companyName, gender } = req.body;

    const user = new User({
      name,
      email,
      phone,
      address,
      birthday,
      jobTitle,
      companyName,
      gender
    });

    const savedUser = await user.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Error creating user:', err);
    res.status(500).json({ message: err.message });
  }
});

// GET all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET single user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// UPDATE user
router.put('/:id', async (req, res) => {
  try {
    const updates = req.body;
    const updatedUser = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true });
    if (!updatedUser) return res.status(404).json({ message: 'User not found' });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// DELETE user
router.delete('/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: 'User not found' });
    res.json({ message: 'User deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
