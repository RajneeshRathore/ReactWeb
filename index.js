import express from 'express';
import multer from 'multer';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import { uploadToCloudinary } from './video.js'; // Adjust if needed
import path from 'path';
import { fileURLToPath } from 'url';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Video Schema
const videoSchema = new mongoose.Schema({
  url: { type: String, required: true },
  text: { type: String, required: false },
  createdAt: { type: Date, default: Date.now }
});

const Video = mongoose.model('Video', videoSchema);

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Setup multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, './uploads'),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

// Enable CORS only in development
if (process.env.NODE_ENV !== 'production') {
  app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  }));
}

// Upload route
app.post('/upload', upload.single('video'), async (req, res) => {
  try {
    const localPath = req.file.path;
    const result = await uploadToCloudinary(localPath);

    const newVideo = new Video({
      url: result.url,
      text: req.body.text || 'No description'
    });

    await newVideo.save();

    res.status(200).json({ message: 'Upload successful', url: result.url });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Something went wrong' });
  }
});

// Fetch videos route
app.get('/videos', async (_, res) => {
  try {
    const videos = await Video.find();
    res.status(200).json(videos);
  } catch (error) {
    console.error('Fetching videos error:', error);
    res.status(500).json({ message: 'Failed to retrieve videos' });
  }
});

// Serve static React frontend
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const clientBuildPath = path.join(__dirname, 'dist');

app.use(express.static(clientBuildPath));

app.get('*', (req, res) => {
  res.sendFile(path.join(clientBuildPath, 'index.html'));
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
