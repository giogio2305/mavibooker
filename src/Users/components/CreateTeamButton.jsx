import React from 'react'

// Component for the create team button
const CreateTeamButton = () => (
    <div className="min-w-36 flex items-center justify-center h-auto p-2 rounded-lg bg-[#100693]">
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-0.5'>
        <g clipPath="url(#clip0_67_258)">
          <path d="M17 10H20M23 10H20M20 10V7M20 10V13" stroke="#FFFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20" stroke="#FAFCFB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="#FAFCFB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </g>
        <defs>
          <clipPath id="clip0_67_258">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
      <p className='text-white text-sm font-semibold mx-2'>Create a team</p>
    </div>
  )

export default CreateTeamButton