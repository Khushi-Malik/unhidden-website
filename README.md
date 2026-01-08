# Unhidden Blog

A minimalist blogging platform built with Node.js, Express, MongoDB, and EJS. Features a clean interface, rich text editing with TinyMCE, and secure admin panel.

## Tech Stack

- **Backend:** Node.js, Express 5.2
- **Database:** MongoDB, Mongoose
- **Template Engine:** EJS
- **Authentication:** express-session, bcrypt
- **Editor:** TinyMCE

## Installation

```bash
# Clone repository
git clone https://github.com/Khushi-Malik/unhidden-website.git
cd unhidden-website

# Install dependencies
npm install

# Configure environment
cp .env.example .env
# Edit .env with your values

# Start MongoDB
mongod

# Run application
npm run dev
```

## Environment Variables

```bash
MONGODB_URL=mongodb://localhost:27017/unhidden
SESSION_SECRET=your-secret-key
TINYMCE_API_KEY=your-tinymce-key
PORT=3000
NODE_ENV=development
```

## Project Structure

```
├── app.js                 # Application entry point
├── public/
│   ├── css/              # Stylesheets
│   └── js/               # Client scripts
├── server/
│   ├── config/db.js      # Database configuration
│   ├── models/           # Mongoose models
│   └── routes/           # Express routes
└── views/                # EJS templates
    ├── layouts/          # Page layouts
    ├── partials/         # Reusable components
    └── admin/            # Admin views
```

## Features

- Full-text search
- Rich text editing with TinyMCE
- Responsive design
- Admin dashboard (CRUD operations)
- Session-based authentication

## Development

```bash
npm run dev    # Development with nodemon
npm start      # Production
```

## Creating Admin User

Uncomment registration form in `views/admin/index.ejs`, register at `/admin`, then comment it out for security.

## Future Vision
- ThreeJS and Blender animations
- Contact Page
- Bug fixing, like text limits etc, maybe replace TinyMCE with a better editor.

## License


