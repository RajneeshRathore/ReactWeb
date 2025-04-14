import React from 'react';
import Card from './Card';
import AboutMe from './AboutMe';
import ProjectCard from './ProjectCard';
import ContactSection from './ContactSection';
function Home() {
  return (
    <div className=''> 
    <div className='flex justify-evenly'>
      <div className='mt-10 ml-7'>
        <h1 className='font-bold text-8xl ml-10 mt-7'>Hello, I'm</h1>
        <h1 className='font-bold text-8xl ml-10 mt-7'>Rajneesh.</h1>
        <h3 className='font-normal text-3xl ml-10 mt-7'>I'm the fullstack developer.</h3>
        <button className='ml-12 mt-5 font-semibold rounded-md bg-pink-600 px-2 py-2 w-54'>View Projects</button>
      </div>
      <Card />
    </div>
    <AboutMe/>
    <h2 className='mt-5 ml-15 font-bold text-2xl'>My Work</h2>
    <div className='flex ml-10'>
   <ProjectCard/>
   <ProjectCard/>
   </div>
   <ContactSection/>
    </div>

  )
}

export default Home;