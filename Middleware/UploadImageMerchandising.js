const multer = require('multer');
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const cloudinary = require('cloudinary').v2;

cloudinary.config({ 
  cloud_name: process.env.CLOUD_NAME, 
  api_key: process.env.CLOUDINARY_API_KEY, 
  api_secret: process.env.CLOUDINARY_API_SECRET, 
});

const storageMerch = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'Merch', 
    allowed_formats: ['jpg', 'jpeg', 'png'], 
  },
});

const MerchImage = multer({ storage: storageMerch });

module.exports = MerchImage;