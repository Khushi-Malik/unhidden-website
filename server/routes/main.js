const express = require('express');
const router = express.Router();

// Routes
router.get('', (req, res) => {
    const locals = {
        title: "Unhidden",
        description: "Welcome to the Unhidden Blog"

    }
  res.render('index', { locals });
});

router.get('\about', (req, res) => {
  res.render('about');
});

module.exports = router;