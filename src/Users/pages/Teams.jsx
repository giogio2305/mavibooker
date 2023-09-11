import { Community, NavArrowDown, Search, SortDown } from 'iconoir-react'
import React from 'react'

function Teams() {
  document.title="Teams";
  return (
    <div className='w-full h-screen flex flex-col overflow-auto'>
      {/* Top bar */}
    <div className="w-full flex items-center justify-between p-4 mt-2">
      {/* Titles */}
    <div className="flex flex-col">
    <h2 className="text-lg text-[#100693] font-bold">Teams</h2>
    <p className="text-[12px] text-zinc-700 mt-0.5">Collaborate with other colleagues</p>
    </div>
    {/* Actions Buttons */}
    <div className='flex items-center'>

      <div className="flex items-center mr-3">
        <Community className='w-6 h-6 text-zinc-700 mr-1'/>
        <button  className='min-w-12 px-2  py-1 flex items-center justify-center rounded-md  ml-2 bg-white shadow'>
        <div className='w-2.5 h-2.5 shadow-xs rounded-full bg-purple-900  mr-1'></div>
        <h6 className='font-bold text-zinc-800 text-sm mx-2'>Frontend</h6>
        <NavArrowDown strokeWidth={2} className='mt-0.5 w-4 h-4 text-zinc-800'/>
        </button>
      </div>

      <div className="min-w-36 flex items-center justify-center h-auto p-2 rounded-lg bg-[#100693]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-0.5'>
                <g clip-path="url(#clip0_67_258)">
                <path d="M17 10H20M23 10H20M20 10V7M20 10V13" stroke="#FFFF00" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20" stroke="#FAFCFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="#FAFCFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_67_258">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>

              <p className='text-white text-sm font-semibold mx-2'>Create a team</p>
              </div>
    </div>
    </div>
    <div className='w-[96%] mx-auto h-[1.3px] bg-gray-200 rounded-md'></div>

    {/* Team Title */}
    <div className="w-full">
      <h1 className='font-bold text-[#0A0458] text-xl my-1 p-4'>Frontend team members</h1>
    </div>
    {/* Filters Bar */}
    <div className="w-full flex items-center justify-between p-4 mt-1">
    <div className='flex items-center w-auto'>
      {/* Search Bar */}
      <div className="max-w-60 bg-white flex items-center shadow rounded-md p-1.5">
        <Search strokeWidth={2} className='text-zinc-700 w-4 h-4 mx-1.5'/>
        <input type='text' placeholder='Search here...' className='text-[13px] w-48 border-0 outline-none h-auto'/>
      </div>
      {/* Sort Button */}
      <button  className='min-w-12 px-2  py-1.5 flex items-center justify-center rounded-md  ml-2 bg-white shadow'>
        <SortDown strokeWidth={2} className='mt-0.5 w-4 h-4 text-zinc-700'/>
        <h6 className='font-semibold text-zinc-800 text-sm mx-2'>Sort by</h6>
        <NavArrowDown strokeWidth={2} className='mt-0.5 w-4 h-4 text-zinc-800'/>
        </button>
    </div>
    </div>


    </div>
  )
}

export default Teams