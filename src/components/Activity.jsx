import React, { useState, useEffect } from 'react';
import axios from 'axios';

function Activity() {
  const [file, setFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [uploadMessage, setUploadMessage] = useState('');
  const [videoUrl, setVideoUrl] = useState('');

  useEffect(() => {
    // Check if video URL is already in localStorage on page load
    const storedUrl = localStorage.getItem('videoUrl');
    if (storedUrl) {
      setVideoUrl(storedUrl); // Set the URL from localStorage
    }
  }, []);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setUploadMessage('Please choose a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('video', file);

    try {
      setUploading(true);
      setUploadMessage('Uploading...');

      // Send video to backend for Cloudinary upload
      const response = await axios.post('http://localhost:3000/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent) => {
          const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setProgress(percentage);
        },
      });

      const { url } = response.data;  // Get video URL from backend
      setVideoUrl(url);  // Set video URL in state

      // Store the URL in localStorage
      localStorage.setItem('videoUrl', url);

      setUploading(false);
      setUploadMessage('Upload Successful!');
    } catch (error) {
      console.error('Error uploading video:', error);
      setUploading(false);
      setUploadMessage('Upload Failed!');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <h1 className="text-3xl font-semibold mb-6 text-gray-800">Upload Your Professional Speaking Video 🎤</h1>
      
      <div className="mb-6">
        <input
          type="file"
          id="file-input"
          onChange={handleFileChange}
          className="hidden"
        />
        <label htmlFor="file-input" className="px-6 py-3 bg-blue-500 text-white text-lg rounded-lg cursor-pointer hover:bg-blue-600 transition">
          Choose Video
        </label>
      </div>

      <button 
        className={`px-6 py-3 text-white text-lg rounded-lg ${uploading ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} transition`} 
        onClick={handleUpload} 
        disabled={uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {uploading && (
        <div className="w-full mt-4">
          <progress value={progress} max="100" className="w-full h-2 rounded-lg bg-gray-200" />
        </div>
      )}

      <p className="mt-4 text-xl text-gray-800">{uploadMessage}</p>

      {/* If video is successfully uploaded, show the video */}
      {videoUrl && (
        <div className="mt-8">
          <p className="text-lg text-gray-800">Video uploaded successfully! Watch it below:</p>
          <video width="400" controls className="mt-4 border-2 border-gray-300 rounded-lg shadow-lg">
            <source src={videoUrl} type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <p>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Repellat provident earum dolor? Temporibus, earum ipsam. Non, fugit exercitationem! Omnis nostrum beatae voluptatem assumenda dolor veritatis totam quas tempore nulla quisquam sequi nihil exercitationem praesentium est, hic quidem! Perspiciatis blanditiis iure non sapiente sunt facere itaque?</p>
        </div>
      )}
    </div>
  );
}

export default Activity;
