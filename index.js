import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { uploadToCloudinary } from './video.js'; // Ensure the correct path to video.js

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

// MongoDB Connection URI (replace with your MongoDB Atlas URI or local MongoDB URI)
const dbURI = process.env.MONGODB_URI;

mongoose.connect(dbURI)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

// Create the Video schema directly in index.js
const videoSchema = new mongoose.Schema({
  url: { 
    type: String, 
    required: true 
  },
  text: { 
    type: String, 
    required: false  // Optional text field for video description
  },
  createdAt: { 
    type: Date, 
    default: Date.now 
  }
});

const Video = mongoose.model('Video', videoSchema); // Create the Video model

// Middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup multer for file storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const uploadsFolder = './uploads';
    cb(null, uploadsFolder);
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Cloudinary uploader server!');
});

// Upload video
app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    console.log('Received file:', req.file);

    // Path to the uploaded file
    const localFilePath = req.file.path;

    // Upload the file to Cloudinary and get the URL
    const uploadResult = await uploadToCloudinary(localFilePath);

    if (uploadResult) {
      const videoUrl = uploadResult.url; // Cloudinary URL
      const videoText = req.body.text || 'No description provided'; // Optional text (description) from the request

      // Save the video URL and text to MongoDB
      const newVideo = new Video({
        url: videoUrl,
        text: videoText,
      });
      await newVideo.save();

      console.log('Upload successful:', videoUrl);

      // Respond with the URL of the uploaded video
      res.status(200).json({
        message: 'Upload successful',
        url: videoUrl,
      });
    } else {
      console.log('Upload failed: No result from Cloudinary');
      res.status(500).json({ message: 'Upload failed' });
    }
  } catch (error) {
    console.error('Error in upload route:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Retrieve all video URLs and text
app.get('/videos', async (req, res) => {
  try {
    const videos = await Video.find(); // Fetch all video URLs and text from MongoDB
    res.status(200).json(videos); // Serve the array of video URLs and descriptions
  } catch (error) {
    console.error('Error fetching videos:', error);
    res.status(500).json({ message: 'Failed to retrieve videos' });
  }
});

// Start server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
