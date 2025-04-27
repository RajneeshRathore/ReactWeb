import dotenv from 'dotenv';
dotenv.config();
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';

async function uploadToCloudinary(localFilePath) {
  cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
  });

  if (!localFilePath) {
    console.log("No file path provided.");
    return null;
  }

  try {
    // Create a dynamic public_id using a timestamp or UUID
    const publicId = `video-${Date.now()}`;

    // Upload the video to Cloudinary
    const uploadResult = await cloudinary.uploader.upload(localFilePath, {
      public_id: publicId,  // Dynamic public_id
      resource_type: 'video' // Specify resource type as video
    });

    console.log("Upload Result:", uploadResult.url);

    // Optimize the video URL (auto-format and quality)
    const optimizedUrl = cloudinary.url(publicId, {
      fetch_format: 'auto',
      quality: 'auto',
      resource_type: 'video',
    });

    console.log("Optimized Video URL:", optimizedUrl);

    // Optionally, remove the local file if upload is successful
    fs.unlinkSync(localFilePath);

    return uploadResult;
  } catch (error) {
    console.error("Error uploading to Cloudinary:", error);
    // Only remove the local file if there was an error in uploading
    if (fs.existsSync(localFilePath)) {
      fs.unlinkSync(localFilePath);
    }
    return null;
  }
}

export { uploadToCloudinary };
