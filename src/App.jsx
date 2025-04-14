import React from 'react';
import toast, { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom';
import Home from './components/Home';
import Project from './components/Project';
import About from './components/About';
import Contact from './components/Contact';
import Nav from './components/Nav';
import Activity from './components/Activity';
import './App.css';
function App() {
  return (
   <div className='min-h-screen text-white bg-slate-800 flex flex-col w-full'>
    <Toaster/>
    <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route path='/project' element={<Project />} />
        <Route path='/contact' element={<Contact />} />
        <Route path='/activity' element={<Activity />} />
      </Routes>
      <Nav/>
   </div>
  )
}

export default App;