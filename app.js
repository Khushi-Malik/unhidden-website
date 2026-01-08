console.log('ENV CHECK →', {
  MONGODB_URL: process.env.MONGODB_URL,
});

require('dotenv').config();


const express = require('express');
const expressLayout = require('express-ejs-layouts');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const MongoStore = require('connect-mongo').default;
const methodOverride = require('method-override');

const connectDB = require('./server/config/db');

const app = express();
const PORT = process.env.PORT || 3000;

// DB
connectDB();

// Middleware - IMPORTANT: Increase body size limits for images
app.use(express.urlencoded({ 
  extended: true,
  limit: '50mb',              // Increase limit for form data
  parameterLimit: 50000       // Increase parameter limit
}));
app.use(express.json({ 
  limit: '50mb'               // Increase limit for JSON data
}));
app.use(cookieParser());
app.use(methodOverride('_method'));

// Sessions
app.use(session({
  secret: process.env.SESSION_SECRET || 'keyboard cat',
  resave: false,
  saveUninitialized: false,
  store: MongoStore.create({
    mongoUrl: process.env.MONGODB_URL,
    collectionName: 'sessions'
  })
}));

// Static
app.use(express.static('public'));

// Views
app.use(expressLayout);
app.set('layout', './layouts/main');
app.set('view engine', 'ejs');
app.use((req, res, next) => {
  res.locals.userId = req.session.userId;
  next();
});

// Routes
app.use('/', require('./server/routes/main'));
app.use('/', require('./server/routes/admin'));

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});