const User = require('../models/user');

// Create a new user
exports.createUser = async (req, res) => {
  try {
    const { name, email, phone, address, birthday, jobTitle, companyName, gender } = req.body;

    const newUser = new User({
      name,
      email,
      phone,
      address,
      birthday,
      jobTitle,
      companyName,
      gender
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser);
  } catch (err) {
    console.error('Create error:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).send('Server Error');
  }
};

// Update an existing user
exports.updateUser = async (req, res) => {
  try {
    const { name, email, phone, address, birthday, jobTitle, companyName, gender } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { name, email, phone, address, birthday, jobTitle, companyName, gender },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(updatedUser);
  } catch (err) {
    console.error('Update error:', err);
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({ errors: messages });
    }
    res.status(500).send('Server Error');
  }
};

// Get all users
exports.getUsers = async (req, res) => {
  try {
    const users = await User.find().sort({ createdAt: -1 });
    res.json(users);
  } catch (err) {
    console.error('Fetch error:', err);
    res.status(500).send('Server Error');
  }
};

// Get a single user by ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json(user);
  } catch (err) {
    console.error('Fetch single user error:', err);
    res.status(500).send('Server Error');
  }
};

// Delete a user
exports.deleteUser = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error('Delete error:', err);
    res.status(500).send('Server Error');
  }
};
