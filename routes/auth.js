const express = require('express');
const router = express.Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Redirect home → login
router.get('/', (req, res) => res.redirect('/login'));

// Show login page
router.get('/login', (req, res) => res.render('login'));

// Show register page
router.get('/register', (req, res) => res.render('register'));

// Handle registration
router.post('/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('User already exists. Please login.');
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    await User.create({ username, password: hashedPassword });

    // Go to login
    res.redirect('/login');
  } catch (err) {
    console.error('Error in /register:', err);
    res.status(500).send('Internal Server Error');
  }
});

// Handle login
router.post('/login', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.send('❌ Invalid credentials');

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.send('❌ Invalid credentials');

    req.session.user = user;
    res.redirect('/courses');
  } catch (err) {
    console.error('Error in /login:', err);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
