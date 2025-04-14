import React from 'react'

function ProjectCard() {
  return (
    <div className='bg-white text-black px-5 py-5 rounded-md mt-5 mb-5 mr-10'>
        <h3 className='font-bold text-xl text-orange-300'>Project One</h3>
        <p>A brief description of the project.</p>
        <button className='mt-3 font-bold '>View Details</button>
    </div>
  )
}

export default ProjectCard;