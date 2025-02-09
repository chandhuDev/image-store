// app/api/upload/route.js
import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { writeFile, mkdir, unlink } from "fs/promises";
import { join } from "path";
import { existsSync } from "fs";
import os from "os";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request) {
  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const category = formData.get("category");

    if (!file) {
      return NextResponse.json(
        { success: false, message: "No file received" },
        { status: 400 }
      );
    }

    // Use OS temp directory instead of project directory
    const tmpDir = join(os.tmpdir(), "app-uploads");

    // Create temp directory if it doesn't exist
    if (!existsSync(tmpDir)) {
      await mkdir(tmpDir, { recursive: true });
    }

    // Create buffer from file
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename with sanitization
    const timestamp = Date.now();
    const sanitizedFilename = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
    const filename = `upload-${timestamp}-${sanitizedFilename}`;
    const filepath = join(tmpDir, filename);

    try {
      // Write file to temp directory
      await writeFile(filepath, buffer);

      // Upload to Cloudinary
      const result = await cloudinary.uploader.upload(filepath, {
        folder: `imageEcommerce/postImages/${category}`,
        resource_type: "auto",
        timeout: 60000,
      });

      // Clean up: Delete the temporary file
      await unlink(filepath).catch(console.error);

      return NextResponse.json(
        {
          success: true,
          url: result.secure_url,
          public_id: result.public_id,
        },
        { status: 200 }
      );
    } catch (error) {
      // Clean up on error
      if (existsSync(filepath)) {
        await unlink(filepath).catch(console.error);
      }
      throw error;
    }
  } catch (error) {
    console.error("Upload error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "Upload failed",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
