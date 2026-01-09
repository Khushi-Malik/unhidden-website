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
    };

    try {
        const perPage = 10;
        const page = parseInt(req.query.page) || 1;
        
        const data = await Post.find()
            .sort({ createdAt: -1 })
            .skip((perPage * page) - perPage)
            .limit(perPage);
        
        const count = await Post.countDocuments();
        const nextPage = page + 1;
        const hasNextPage = nextPage <= Math.ceil(count / perPage);
        
        res.render('index', { 
            locals, 
            data,
            current: page,
            pages: Math.ceil(count / perPage),
            hasNextPage
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
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

router.get('/contact', (req, res) => {
  res.render('contact');
});

module.exports = router;