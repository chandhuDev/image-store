// pages/api/upload/index.js
import { v2 as cloudinary } from 'cloudinary';
import fileUpload from 'express-fileupload';
import fs from 'fs';

export const config = {
  api: {
    bodyParser: false,
  },
};

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const fileUploadMiddleware = fileUpload({
  useTempFiles: true,
  tempFileDir: '/tmp/'
});

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  await new Promise((resolve, reject) => {
    fileUploadMiddleware(req, res, (err) => {
      if (err) reject(err);
      resolve();
    });
  });

  try {
    const uploadedFile = req.files.postImage.tempFilePath;
    
    if (!uploadedFile) {
      return res.status(400).json({ message: 'No file uploaded' });
    }

    const result = await cloudinary.uploader.upload(uploadedFile, {
      folder: `imageEcommerce/postImages/${req.body.category}`,
      resource_type: 'auto',
    });

    // Clean up temp file
    fs.unlinkSync(uploadedFile);

    return res.status(200).json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id
    });

  } catch (error) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message
    });
  }
}