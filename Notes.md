# 📝 Unhidden Blog

A modern, minimalist blogging platform built with Node.js, Express, MongoDB, and EJS. Features a clean design, rich text editing, and a powerful admin panel for content management.

![Node.js](https://img.shields.io/badge/Node.js-v18+-green.svg)
![Express](https://img.shields.io/badge/Express-v5.2-blue.svg)
![MongoDB](https://img.shields.io/badge/MongoDB-v7.0-brightgreen.svg)
![License](https://img.shields.io/badge/License-ISC-yellow.svg)

## ✨ Features

- 🎨 **Clean, Responsive Design** - Beautiful blue color scheme with mobile-first approach
- 📝 **Rich Text Editor** - TinyMCE integration for formatted content
- 🔍 **Search Functionality** - Find posts quickly with full-text search
- 🔐 **Secure Admin Panel** - Password-protected content management
- 📱 **Mobile Optimized** - Works seamlessly on all devices
- ⚡ **Fast Performance** - Optimized for speed and SEO
- 🎯 **User-Friendly** - Intuitive interface for both readers and authors

## 🚀 Quick Start

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher)
- [MongoDB](https://www.mongodb.com/) (v7.0 or higher)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Khushi-Malik/unhidden-website.git
   cd unhidden-website
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env` file in the root directory:
   ```bash
   MONGODB_URL=mongodb://localhost:27017/unhidden
   SESSION_SECRET=your-super-secret-session-key-change-this
   TINYMCE_API_KEY=your-tinymce-api-key
   PORT=3000
   NODE_ENV=development
   ```

4. **Start MongoDB**
   ```bash
   # Make sure MongoDB is running on your system
   mongod
   ```

5. **Run the application**
   ```bash
   # Development mode (with auto-restart)
   npm run dev
   
   # Production mode
   npm start
   ```

6. **Open your browser**
   
   Navigate to `http://localhost:3000`

## 📁 Project Structure

```
unhidden-website/
├── public/                # Static assets
│   ├── css/
│   │   └── styles.css    # Main stylesheet
│   ├── js/
│   │   └── script.js     # Client-side JavaScript
│   └── img/              # Images
├── server/
│   ├── config/
│   │   └── db.js         # Database configuration
│   ├── models/
│   │   ├── Post.js       # Post model
│   │   └── User.js       # User model
│   └── routes/
│       ├── main.js       # Public routes
│       └── admin.js      # Admin routes
├── views/
│   ├── layouts/
│   │   ├── main.ejs      # Main layout
│   │   └── admin.ejs     # Admin layout
│   ├── partials/
│   │   ├── header.ejs
│   │   ├── footer.ejs
│   │   └── search.ejs
│   ├── admin/            # Admin views
│   ├── index.ejs         # Homepage
│   ├── post.ejs          # Single post view
│   ├── search.ejs        # Search results
│   └── about.ejs         # About page
├── .env                  # Environment variables (create this)
├── .gitignore
├── app.js                # Application entry point
├── package.json
└── README.md
```

## 🔧 Configuration

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URL` | MongoDB connection string | Yes |
| `SESSION_SECRET` | Secret key for sessions | Yes |
| `TINYMCE_API_KEY` | TinyMCE editor API key | Yes |
| `PORT` | Server port (default: 3000) | No |
| `NODE_ENV` | Environment (development/production) | No |

### Getting API Keys

**TinyMCE API Key:**
1. Visit [TinyMCE](https://www.tiny.cloud/)
2. Sign up for a free account
3. Get your API key from the dashboard
4. Add to `.env` file

## 👤 Creating an Admin Account

1. **Uncomment the registration form** in `views/admin/index.ejs`

2. **Navigate to** `/admin`

3. **Register your admin account**

4. **Comment out the registration form** in `views/admin/index.ejs` (for security)

   ```html
   <!-- 
   <h3>Register</h3>
   <form action="/admin/register" method="POST">
     ...
   </form>
   -->
   ```

5. **Or create via MongoDB directly:**
   ```javascript
   // In MongoDB shell or Compass
   use unhidden
   
   // Hash your password first using bcrypt with salt rounds of 10
   // Then insert:
   db.users.insertOne({
     username: "admin",
     password: "$2b$10$hashedpasswordhere"
   })
   ```

## 📖 Usage

### Public Features

- **Homepage** - View all published posts
- **Search** - Click the search icon to find posts
- **Read Posts** - Click on any post to read the full content
- **About Page** - Learn more about the author

### Admin Features

1. **Sign In** - Click "Sign In" or go to `/admin`
2. **Dashboard** - View all posts and manage content
3. **Create Post** - Click "Add New Post" to write with rich text editor
4. **Edit Post** - Click "Edit" on any post to modify
5. **Delete Post** - Click "Delete" to remove a post

### Writing Posts

The TinyMCE editor supports:
- **Text Formatting** - Bold, italic, underline
- **Headings** - H1, H2, H3, etc.
- **Lists** - Bullet points and numbered lists
- **Links** - Add hyperlinks
- **Alignment** - Left, center, right, justify
- **And more!**

## 🎨 Customization

### Changing Colors

Edit `public/css/styles.css` - CSS variables:

```css
:root {
    --primary: #2E86DE;        /* Main blue color */
    --primary-dark: #1e5f9e;   /* Darker blue */
    --bg-main: #E3F2FD;        /* Background */
    --text: #1a1a1a;           /* Text color */
    /* ... more variables */
}
```

### Updating Site Name

Edit `views/partials/header.ejs`:
```html
<a href="/" class="header-logo">Your Site Name</a>
```

### Modifying Layout

- **Homepage** - Edit `views/index.ejs`
- **Post Display** - Edit `views/post.ejs`
- **Header/Footer** - Edit `views/partials/header.ejs` and `footer.ejs`

## 🔒 Security Best Practices

- ✅ Use strong `SESSION_SECRET` (at least 32 random characters)
- ✅ Keep `.env` file out of version control
- ✅ Use HTTPS in production
- ✅ Regularly update dependencies
- ✅ Limit admin access to trusted users only
- ✅ Comment out registration route in production

## 🚀 Deployment

### Deploying to Heroku

1. **Install Heroku CLI**
   ```bash
   npm install -g heroku
   ```

2. **Create Heroku app**
   ```bash
   heroku create your-app-name
   ```

3. **Set environment variables**
   ```bash
   heroku config:set MONGODB_URL=your-mongodb-url
   heroku config:set SESSION_SECRET=your-secret
   heroku config:set TINYMCE_API_KEY=your-key
   heroku config:set NODE_ENV=production
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

### Deploying to Railway

1. **Connect GitHub repo** to Railway
2. **Add environment variables** in Railway dashboard
3. **Deploy automatically** on push

### MongoDB Atlas (Production Database)

1. Create account at [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a cluster
3. Get connection string
4. Add to production environment variables

## 🛠️ Development

### Available Scripts

```bash
# Start development server with auto-reload
npm run dev

# Start production server
npm start

# Run tests (when implemented)
npm test
```

### Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB, Mongoose
- **Template Engine:** EJS
- **Authentication:** Express-Session, bcrypt
- **Rich Text Editor:** TinyMCE
- **Styling:** Custom CSS with CSS Variables

## 🐛 Troubleshooting

### MongoDB Connection Error
```
Error: connect ECONNREFUSED
```
**Solution:** Make sure MongoDB is running
```bash
mongod
```

### Port Already in Use
```
Error: listen EADDRINUSE: address already in use :::3000
```
**Solution:** Change port in `.env` or kill process using port 3000
```bash
# Find process
lsof -i :3000
# Kill it
kill -9 <PID>
```

### TinyMCE Not Loading
**Solution:** 
1. Check API key in `.env`
2. Verify internet connection
3. Check browser console for errors

### Session Not Persisting
**Solution:** Make sure `SESSION_SECRET` is set in `.env`

## 📝 License

This project is licensed under the ISC License.

## 👥 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📧 Contact

**Aashi** - Writer of Unhidden

Project Link: [https://github.com/Khushi-Malik/unhidden-website](https://github.com/Khushi-Malik/unhidden-website)

## 🙏 Acknowledgments

- [Express.js](https://expressjs.com/) - Web framework
- [MongoDB](https://www.mongodb.com/) - Database
- [TinyMCE](https://www.tiny.cloud/) - Rich text editor
- [EJS](https://ejs.co/) - Template engine
- [Google Fonts - Poppins](https://fonts.google.com/specimen/Poppins) - Typography

## 📚 Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [Mongoose Documentation](https://mongoosejs.com/)
- [TinyMCE Documentation](https://www.tiny.cloud/docs/)
- [EJS Documentation](https://ejs.co/)

---
