const express = require('express');
const router = express.Router();
const Course = require('../models/Course');

router.get('/', async (req, res) => {
    if (!req.session.user) return res.redirect('/login');
    const courses = await Course.find();
    res.render('courses', { courses });
});

router.post('/add', async (req, res) => {
    const { name, description } = req.body;
    await Course.create({ name, description });
    res.redirect('/courses');
});

module.exports = router;
