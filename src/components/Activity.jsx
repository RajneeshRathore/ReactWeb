import React from 'react'
import ActivityCard from './ActivityCard';
function Activitiy() {
  return (
    <div className='mt-15 bg-white text-black min-h-screen'>
      <div className='w-full flex flex-wrap justify-center items-center bg-zinc-300'>
     <ActivityCard/>
     <ActivityCard/>
     <ActivityCard/>
      </div>
    </div>
  )
}

export default Activitiy;