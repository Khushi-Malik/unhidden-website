const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const Post = require('../models/Post');
const User = require('../models/User');

const adminLayout = '../views/layouts/admin';

/* ---------------------------
   AUTH MIDDLEWARE
---------------------------- */
const authMiddleware = (req, res, next) => {
  if (!req.session.userId) {
    return res.redirect('/admin');
  }
  next();
};

/* ---------------------------
   GET — ADMIN LOGIN
---------------------------- */
router.get('/admin', (req, res) => {
  const locals = {
    title: 'Admin Login',
    description: 'Admin login page'
  };

  res.render('admin/index', {
    locals,
    layout: adminLayout
  });
});

/* ---------------------------
   POST — ADMIN LOGIN
---------------------------- */
router.post('/admin', async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) {
      return res.redirect('/admin');
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.redirect('/admin');
    }

    req.session.userId = user._id;
    res.redirect('/dashboard');

  } catch (error) {
    console.error(error);
    res.redirect('/admin');
  }
});

/* ---------------------------
   POST — ADMIN REGISTER
   (OPTIONAL: REMOVE IN PROD)
---------------------------- */
router.post('/admin/register', async (req, res) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      password: hashedPassword
    });

    res.redirect('/admin');

  } catch (error) {
    console.error(error);
    res.redirect('/admin');
  }
});

/* ---------------------------
   GET — DASHBOARD
---------------------------- */
router.get('/dashboard', authMiddleware, async (req, res) => {
  try {
    const locals = {
      title: 'Dashboard',
      description: 'Admin dashboard'
    };

    const data = await Post.find().sort({ createdAt: -1 });

    res.render('admin/dashboard', {
      locals,
      data,
      layout: adminLayout
    });

  } catch (error) {
    console.error(error);
  }
});

/* ---------------------------
   GET — ADD POST FORM
---------------------------- */
router.get('/add-post', authMiddleware, (req, res) => {
  const locals = {
    title: 'Add New Post',
    description: 'Create a new blog post'
  };

  res.render('admin/add-post', {
    locals,
    layout: adminLayout,
    process: { env: { TINYMCE_API_KEY: process.env.TINYMCE_API_KEY } }
  });
});

/* ---------------------------
   POST — ADD POST
---------------------------- */
router.post('/add-post', authMiddleware, async (req, res) => {
  try {
    const { title, body } = req.body;

    await Post.create({
      title,
      body
    });

    res.redirect('/dashboard');

  } catch (error) {
    console.error('Error creating post:', error);
    res.redirect('/dashboard');
  }
});

/* ---------------------------
   GET — EDIT POST FORM
---------------------------- */
router.get('/edit-post/:id', authMiddleware, async (req, res) => {
  try {
    const data = await Post.findById(req.params.id);

    const locals = {
      title: 'Edit Post',
      description: 'Edit blog post'
    };

    res.render('admin/edit-post', {
      locals,
      data,
      layout: adminLayout,
      process: { env: { TINYMCE_API_KEY: process.env.TINYMCE_API_KEY } }
    });

  } catch (error) {
    console.error(error);
    res.redirect('/dashboard');
  }
});

/* ---------------------------
   PUT — UPDATE POST
---------------------------- */
router.put('/edit-post/:id', authMiddleware, async (req, res) => {
  try {
    const { title, body } = req.body;

    await Post.findByIdAndUpdate(req.params.id, {
      title,
      body,
      updatedAt: Date.now()
    });

    res.redirect('/dashboard');

  } catch (error) {
    console.error('Error updating post:', error);
    res.redirect('/dashboard');
  }
});

/* ---------------------------
   DELETE — DELETE POST
---------------------------- */
router.delete('/delete-post/:id', authMiddleware, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.redirect('/dashboard');

  } catch (error) {
    console.error('Error deleting post:', error);
    res.redirect('/dashboard');
  }
});


/* ---------------------------
   GET — LOGOUT
---------------------------- */
router.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/admin');
  });
});


/* ---------------------------
   POST — Search
---------------------------- */
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

module.exports = router;
