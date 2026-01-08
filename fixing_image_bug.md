# Fix for "PayloadTooLargeError" When Adding Images

## 🔴 The Problem

When you add an image in TinyMCE, it converts the image to **base64** format and embeds it directly in your HTML. This makes the post content HUGE:

```
Regular post: ~5KB
Post with image: ~2-5MB (400-1000x larger!)
```

Express has a default limit of **100KB**, so it rejects the large payload.

## ✅ Quick Fix (Increase Limit)

Update your `app.js` - add the `limit` options:

```javascript
// BEFORE (causes error)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// AFTER (fixes error)
app.use(express.urlencoded({ 
  extended: true,
  limit: '50mb',              // Allow up to 50MB
  parameterLimit: 50000 
}));
app.use(express.json({ 
  limit: '50mb' 
}));
```

This allows posts with images up to 50MB.

---

## 🎯 Better Solution: Image Upload (Recommended)

Instead of embedding base64 images (which bloats your database), upload images to a server/CDN.

### Option 1: Local Image Upload

**Install multer:**
```bash
npm install multer
```

**Add to app.js:**
```javascript
const multer = require('multer');
const path = require('path');

// Configure storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({ 
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: function (req, file, cb) {
    const filetypes = /jpeg|jpg|png|gif|webp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);
    
    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb('Error: Images only!');
    }
  }
});
```

**Add upload route (in admin.js):**
```javascript
router.post('/upload-image', authMiddleware, upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }
  
  // Return the URL to TinyMCE
  res.json({ 
    location: `/img/uploads/${req.file.filename}` 
  });
});
```

**Update TinyMCE config (in add-post.ejs and edit-post.ejs):**
```javascript
tinymce.init({
  selector: '#editor',
  height: 500,
  menubar: false,
  plugins: [
    'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
    'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
    'insertdatetime', 'media', 'table', 'help', 'wordcount'
  ],
  toolbar: 'undo redo | blocks | ' +
    'bold italic forecolor | alignleft aligncenter ' +
    'alignright alignjustify | bullist numlist outdent indent | ' +
    'removeformat | image | help',
  content_style: 'body { font-family: Poppins, sans-serif; font-size:14px }',
  
  // IMAGE UPLOAD HANDLER
  images_upload_url: '/upload-image',  // Your upload endpoint
  automatic_uploads: true,
  
  // Optional: Show upload progress
  images_upload_handler: function (blobInfo, success, failure) {
    const xhr = new XMLHttpRequest();
    xhr.withCredentials = false;
    xhr.open('POST', '/upload-image');
    
    xhr.onload = function() {
      if (xhr.status !== 200) {
        failure('HTTP Error: ' + xhr.status);
        return;
      }
      const json = JSON.parse(xhr.responseText);
      success(json.location);
    };
    
    xhr.onerror = function () {
      failure('Image upload failed');
    };
    
    const formData = new FormData();
    formData.append('file', blobInfo.blob(), blobInfo.filename());
    xhr.send(formData);
  }
});
```

**Create uploads directory:**
```bash
mkdir -p public/img/uploads
```

**Add to .gitignore:**
```
public/img/uploads/*
!public/img/uploads/.gitkeep
```

---

## 🌐 Option 2: Cloud Storage (Best for Production)

Use a service like:
- **Cloudinary** (easiest, has free tier)
- **AWS S3**
- **ImageKit**

### Cloudinary Example:

**Install:**
```bash
npm install cloudinary multer-storage-cloudinary
```

**Configure:**
```javascript
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'unhidden-blog',
    allowed_formats: ['jpg', 'png', 'gif', 'webp'],
    transformation: [{ width: 1200, quality: 'auto' }]
  }
});

const upload = multer({ storage: storage });
```

Then use the same upload route as above. Cloudinary returns a URL automatically.

---

## 📊 Comparison

| Method | Pros | Cons | Best For |
|--------|------|------|----------|
| **Base64 (current)** | Simple, no setup | Huge database size, slow | Small sites, no images |
| **Increase limit** | Quick fix | Still bloats database | Temporary solution |
| **Local upload** | Free, full control | Manual backups needed | Development, small sites |
| **Cloud storage** | Scalable, CDN, backups | Costs money (small) | Production sites |

---

## 🎯 My Recommendation

1. **Right now:** Use the quick fix (increase limit to 50mb)
2. **Soon:** Implement local image upload with multer
3. **Production:** Switch to Cloudinary or similar

---

## 🚀 Quick Implementation Steps

### Step 1: Fix the immediate error
Replace your `app.js` with the fixed version

### Step 2: Test
Restart server and try adding an image - should work now!

### Step 3: Later, implement proper uploads
Follow the "Option 1: Local Image Upload" guide above

---

## 📝 Additional Tips

**Optimize images before upload:**
```bash
npm install sharp
```

```javascript
const sharp = require('sharp');

router.post('/upload-image', authMiddleware, upload.single('file'), async (req, res) => {
  try {
    const optimizedPath = `public/img/uploads/optimized-${req.file.filename}`;
    
    await sharp(req.file.path)
      .resize(1200, null, { fit: 'inside', withoutEnlargement: true })
      .jpeg({ quality: 80 })
      .toFile(optimizedPath);
    
    // Delete original
    fs.unlinkSync(req.file.path);
    
    res.json({ 
      location: `/img/uploads/optimized-${req.file.filename}` 
    });
  } catch (error) {
    res.status(500).json({ error: 'Optimization failed' });
  }
});
```

This automatically optimizes images on upload!

---

## 🐛 Troubleshooting

**Still getting error after increasing limit?**
- Check MongoDB has enough space
- Restart your server
- Try a smaller image first

**Images not displaying?**
- Check file permissions on uploads folder
- Verify path in img src attribute
- Check browser console for 404 errors

**Upload route not working?**
- Make sure multer is installed
- Check authMiddleware is working
- Verify uploads directory exists
