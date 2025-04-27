import React from 'react';

function ActivityCard({ videoUrl }) {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden m-4 w-80">
      <video src={videoUrl} controls className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-lg font-bold mb-2">Activity</h2>
        <p className="text-gray-700">Enjoy your uploaded activity video!</p>
      </div>
    </div>
  );
}

export default ActivityCard;
