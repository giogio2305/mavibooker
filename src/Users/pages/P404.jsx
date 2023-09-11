import React from 'react'
import { Calendar } from 'iconoir-react'
import { Link } from 'react-router-dom'

function Lost() {
  return (
    <div className='w-full h-screen flex flex-col overflow-auto font-PJS p-4'>
      <div className="w-full h-auto items-center">
      <div className="flex flex-col items-center w-auto">
            <h3 className='flex items-center font-semibold text-2xl text-[#100693]'>Mavib<h4 className='text-[#FCD116]'>oo</h4>ker</h3>
            <h4 className="text-semibold text-sm mt-0.5 text-zinc-800">The agile planner</h4>
            </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center h-72 mt-12">
        <h1 className="flex items-center text-9xl text-bold text-zinc-600">404</h1>
        <p className="text-lg text-zinc-600 my-4 font-medium">Page not found</p>
        <Link to='/' className='min-w-24 h-auto flex items-center shadow-sm p-2 bg-[#100693] rounded-md '>
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-1'>
              <path d="M13 21H5C3.89543 21 3 20.1046 3 19V10H21V13M15 4V2M15 4V6M15 4H10.5" stroke="#FAFCFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 10V6C3 4.89543 3.89543 4 5 4H7" stroke="#FAFCFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 2V6" stroke="#FAFCFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5" stroke="#FAFCFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.9922 18H17.9922M21 18H17.9922M17.9922 18V15M17.9922 18V21" stroke="#FBBF24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
          <h6 className="text-sm text-white font-medium mx-2">Back to booking</h6>
        </Link>
      </div>
    </div>
  )
}

export default Lost