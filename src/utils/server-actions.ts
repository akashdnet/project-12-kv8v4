"use server";

import { v2 as cloudinary } from "cloudinary";

// Cloudinary config
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadImage(formData: any) {
  const file = formData.get("file");

  // ✅ Check if file is actually a File instance
  if (!(file instanceof File)) {
    return { success: false, message: "Invalid file" };
  }

  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const result = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: "events",
          resource_type: "image",
        },
        (error, result) => {
          if (error || !result) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );

      stream.end(buffer);
    });

    const res = result as any;

    return { success: true, url: res.secure_url };
  } catch (error: any) {
    console.error("Upload failed:", error);
    return { success: false, message: `File upload failed: ${error.message || error}` };
  }
}
