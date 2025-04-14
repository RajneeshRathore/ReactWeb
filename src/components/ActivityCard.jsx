import React from 'react';

function ActivityCard() {
  return (
    <div className='bg-slate-50  rounded-t-lg border m-5 w-lg px-0.4'>
      <div className='rounded-t-lg w-lg'>
      <iframe width="510" height="315" src="https://www.youtube.com/embed/2ltGXfmI6mk?si=D3X1kPvVcHhAbmwj" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin"  className='rounded-md'></iframe>
      </div>
      <h2 className='text-lg font-semibold mt-5 bg-zinc-500'>
        <p className='flex flex-wrap px-3 py-2'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, repellendus? Exercitationem maiores, itaque harum nulla rerum dicta corrupti accusamus obcaecati aspernatur tenetur a, aut iure est tempora ullam atque expedita.</p>
      </h2>
    </div>
  );
}

export default ActivityCard;
