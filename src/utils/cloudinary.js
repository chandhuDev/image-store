import { v2 as cloudinary } from 'cloudinary';
import { IncomingForm } from 'formidable';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const upload = async (req) => {
  const form = new IncomingForm();
  
  return new Promise((resolve, reject) => {
    form.parse(req, async (err, fields, files) => {
      if (err) return reject(err);
      
      try {
        const result = await cloudinary.uploader.upload(files.image.filepath, {
          folder: `/imageEcommerce/postImages/${req.body.category}`,
        });
        
        fs.unlinkSync(files.image.filepath);
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  });
};