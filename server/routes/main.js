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
router.get('/search', async (req, res) => {
  try {
    let searchTerm = req.query.searchTerm;

    const data = await Post.find({ title: { $regex: searchTerm, $options: 'i' } });

    const locals = {
      title: "Search Results",
      description: "Search the site"
    }

    res.render('post', { locals, data });
  } catch (error) {
    console.error(error);
  }
});

// function insertPostData() {
//   Post.insertMany([
//     {
//       title:"First Post",
//       body:"This is the body of the first post."
//     }
//   ])
// }
// insertPostData(); 


router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;