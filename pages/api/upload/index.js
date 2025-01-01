import { connectDB } from '../../../utils/db';
import formidable from 'formidable';
import cloudinary from '../../../utils/cloudinary';

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await connectDB();
    const form = new formidable.IncomingForm();

    form.parse(req, async (err, fields, files) => {
      if (err) {
        return res.status(500).json({ message: 'Error parsing form data' });
      }

      try {
        const uploadedImage = await cloudinary.uploader.upload(files.file.filepath, {
          folder:`/imageEcommerce/postImages/${req.body.category}`,
        });

        res.status(200).json({
          url: uploadedImage.secure_url,
          public_id: uploadedImage.public_id,
        });
      } catch (error) {
        res.status(500).json({ message: 'Error uploading to cloudinary' });
      }
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}