import React from 'react';
import BagesCard from './BagesCard';
function Project() {
  return (
    <div className='mt-16 min-h-screen bg-white text-black w-full'>
     <div className='flex flex-wrap mt-5'>
        <BagesCard/>
        <BagesCard/>
        <BagesCard/>
        <BagesCard/>
     </div>
    </div>
  )
}

export default Project;