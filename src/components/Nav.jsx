import React from 'react';
import {Link } from 'react-router-dom';
function Nav() {
  return (
    <>
      <nav className='flex flex-row gap-16 p-4 items-center fixed'>
        <Link to="/" className='hover:underline font-normal text-xl'>Home</Link>
        <Link to="/about" className='hover:underline font-normal text-xl'>About</Link>
        <Link to="/project" className='hover:underline font-normal text-xl'>Project</Link>
        <Link to="/contact" className='hover:underline font-normal text-xl'>Contact</Link>
        <Link to="/activity" className='hover:underline font-normal text-xl'>Activity</Link>
      </nav>
    </>
  );
}

export default Nav;
