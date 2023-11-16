const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const storageEvent = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Event', 
    allowed_formats: ['jpg', 'jpeg', 'png'], 
  },
});

const EventImage = multer({ storage: storageEvent });

module.exports = EventImage;