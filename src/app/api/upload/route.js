// app/api/upload/route.js
import { NextResponse } from 'next/server';
import { v2 as cloudinary } from "cloudinary";
import { writeFile } from 'fs/promises';
import { join } from 'path';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file');
    const category = formData.get('category');

    if (!file) {
      return NextResponse.json(
        { success: false, message: 'No file received' },
        { status: 400 }
      );
    }

    // Create buffer from file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const filename = `upload-${timestamp}-${file.name}`;
    const filepath = join(process.cwd(), 'uploads', filename);

    // Write file to uploads directory
    await writeFile(filepath, buffer);

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(filepath, {
      folder: `imageEcommerce/postImages/${category}`,
      resource_type: "auto",
      timeout: 60000,
    });

    // Delete the temporary file
    await unlink(filepath).catch(console.error);

    return NextResponse.json({
      success: true,
      url: result.secure_url,
      public_id: result.public_id,
    }, { status: 200 });

  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json({
      success: false,
      message: "Upload failed",
      error: error.message,
    }, { status: 500 });
  }
}