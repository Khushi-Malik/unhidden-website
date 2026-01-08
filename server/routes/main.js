const express = require('express');
const router = express.Router();
const Post = require('../models/Post');

// Routes

// GET
// HOME
router.get('', async (req, res) => {
    const locals = {
        title: "Unhidden",
        description: "Welcome to the Unhidden Blog"

    }

    try {
      const data = await Post.find();
      res.render('index', { locals, data });
    } catch (error) {
      console.error(error);
    }
});


// GET
// Post:id
router.get('/post/:id', async (req, res) => {
  try {
    let slug = req.params.id;

    const data = await Post.findById({ _id: slug });

    const locals = {
      title: data.title,
      description: data.body
    }

    res.render('post', { locals, data });
  } catch (error) {
    console.error(error);
  }
});


// GET
// Post: SearchTerm
router.post('/search', async (req, res) => {
  try {
    const locals = {
      title: "Search Results",
      description: "Search the site"
    }

    let searchTerm = req.body.searchTerm;
    const searchRegex = searchTerm.replace(/[^a-zA-Z0-9 ]/g, '');
    const data = await Post.find(
      { $or: [
        { title: { $regex: new RegExp(searchRegex, 'i') }},
        { body: { $regex: new RegExp(searchRegex, 'i') }},
      ]}
    );

    res.render('search', { data, locals });

  } catch (error) {
    console.error(error);
  }
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;