import { NavArrowDown, Bell, Calendar, CalendarPlus, Clock, Community, LogOut, NavArrowLeft, NavArrowRight, Search, Settings } from 'iconoir-react'
import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import cal from '../../assets/calendar.png'

function Home() {
  document.title="Calendar";
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  const date = new Date();

  const [monthidex, setMonthIndex] = useState(date.getMonth());
  const [ldisabled, setLdisabled] = useState(false);
  const [rdisabled, setRdisabled] = useState(false);
  return (
  <>
        {/* Outlet */}
        <div className="w-full h-screen flex flex-col overflow-auto">
            {/* Top bar */}
            <div className="w-full flex items-center justify-between p-4 mt-1">
              <div className="flex items-center">
              <img src={cal} width='48px' height='48px' className='mr-2'/>
            <div className="flex flex-col">
              <h2 className="text-md text-zinc-800 font-bold">{months[date.getMonth()]}  {date.getDate()}, {date.getFullYear()}</h2>
              <p className="text-[11px] text-zinc-700 mt-0.5">You have 2 meetings today</p>
            </div>
              </div>

              <div className="flex items-center">
              <Link to='/search' className="w-8 h-8 flex items-center  mx-1.5 justify-center rounded-full border-[1.5px] border-gray-300">
                <Search strokeWidth={1.8} className='w-4 h-4 text-gray-600'/>
              </Link>
              <Link to='/search' className="w-8 h-8 flex mx-1.5 items-center justify-center rounded-full border-[1.5px] border-gray-300">
                <Bell strokeWidth={1.8} className='w-4 h-4 text-gray-600'/>
              </Link>

              <div className="max-w-68 min-h-12 mx-2.5 p-2 px-3 py-2 flex flex-col rounded-md bg-green-300">
                <h5 className='text-[11px] text-green-800 font-medium'>Meeting Room, Bonanjo</h5>
                <h3 className='text-sm text-green-800 font-bold mt-0.5'>Available</h3>
              </div>

              <div className="w-36 flex items-center justify-center h-auto p-2 rounded-lg bg-[#100693]">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 21H5C3.89543 21 3 20.1046 3 19V10H21V13M15 4V2M15 4V6M15 4H10.5" stroke="#FAFCFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M3 10V6C3 4.89543 3.89543 4 5 4H7" stroke="#FAFCFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M7 2V6" stroke="#FAFCFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5" stroke="#FAFCFB" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              <path d="M14.9922 18H17.9922M21 18H17.9922M17.9922 18V15M17.9922 18V21" stroke="#FBBF24" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              <p className='text-white text-sm font-semibold ml-2'>Schedule</p>
              </div>
            </div>
            </div>
            <div className='w-[96%] mx-auto h-[1.3px] bg-gray-200 rounded-md'></div>

            {/* Cards bar */}
            <div className="w-full flex items-center justify-start p-4 mt-1">
              {/* Card */}
              <div className="w-72 max-w-72 h-auto bg-white shadow p-3 mr-4 rounded-lg">
                <h3 className='text-zinc-800 text-md font-semibold my-0.5'>Mavibooker Business meet</h3>
                <div className="flex w-full items-center my-2">
                  <Clock strokeWidth={1.8} className='w-4 h-4 mr-2 text-gray-400'/>
                  <p className="text-xs text-zinc-800 font-medium">9 AM-10 AM</p>
                </div>
                <div className="flex w-full items-center my-2">
                  <Community strokeWidth={1.8} className='w-5 h-5 mr-2 text-gray-400'/>
                  <Link to='/team/business' className="px-2.5 py-0.5 rounded-lg bg-fuchsia-300 mr-0.5 text-fuchsia-800 text-[10px] font-bold">Business</Link>
                  <Link to='/team/it' className="px-2.5 py-0.5 rounded-lg bg-indigo-300 mr-0.5 text-indigo-800 text-[10px] font-bold">I.T</Link>
                </div>

                <div className="w-full px-1.5 py-[3px] flex items-center justify-between bg-green-300 rounded-md mt-5">
                  <div className="flex items-center">
                  <svg width="16px" height="16px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.75 1.5L11.25 1.5" stroke="#166534" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 16.5C12.3137 16.5 15 13.8137 15 10.5C15 7.18629 12.3137 4.5 9 4.5C5.68629 4.5 3 7.18629 3 10.5C3 13.8137 5.68629 16.5 9 16.5Z" fill="#166534" stroke="#166534" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                <path d="M9 7.5L9 10.5" stroke="#BBF7D0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
                <p className="text-green-800 text-[12px] font-semibold ml-2">Begin in 15 min</p>
                  </div>
                  <Link to='/zooom-456-kjyh' className='text-green-800 text-[12px] font-bold underline mr-3'>Join</Link>
                </div>
              </div>
              {/* Card */}
              <div className="w-72 max-w-72 h-auto bg-white shadow p-3 rounded-lg">
                <h3 className='text-zinc-800 text-md font-semibold my-0.5'>Monthly KPI's Review</h3>
                <div className="flex w-full items-center my-2">
                  <Clock strokeWidth={1.8} className='w-4 h-4 mr-2 text-gray-400'/>
                  <p className="text-xs text-zinc-800 font-medium">2 PM-3:30 AM</p>
                </div>
                <div className="flex w-full items-center my-2">
                  <Community strokeWidth={1.8} className='w-5 h-5 mr-2 text-gray-400'/>
                  <Link to='/team/business' className="px-2.5 py-0.5 rounded-lg bg-yellow-300 mr-0.5 text-yellow-700 text-[10px] font-bold">Maviance Staff</Link>
                </div>

                <div className="w-full px-1.5 py-[3px] flex items-center justify-between bg-red-200 rounded-md mt-5">
                  <div className="flex items-center">
                  <svg width="16px" height="16px" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_28_134)">
                    <path d="M9 16.5C13.1421 16.5 16.5 13.1421 16.5 9C16.5 4.85786 13.1421 1.5 9 1.5C4.85786 1.5 1.5 4.85786 1.5 9C1.5 13.1421 4.85786 16.5 9 16.5Z" fill="#7F1D1D" stroke="#7F1D1D" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    <path d="M6.87816 11.1213L8.99948 9M11.1208 6.87868L8.99948 9M8.99948 9L6.87816 6.87868M8.99948 9L11.1208 11.1213" stroke="#FECACA" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                    </g>
                    <defs>
                    <clipPath id="clip0_28_134">
                    <rect width="18" height="18" fill="white"/>
                    </clipPath>
                    </defs>
                    </svg>
                <p className="text-red-800 text-[12px] font-semibold ml-2">Canceled</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Calendar controls bar */}
            <div className="w-full flex items-center justify-between p-4 mt-1">
              <div className="flex items-center w-auto">
                <h2 className='font-bold text-zinc-800 text-xl mr-2'>{months[monthidex]}</h2>
                <h2 className='font-bold text-[#100693] text-xl'>{date.getFullYear()}</h2>
              </div>

              <div className="flex items-center w-auto mr-10">
                <div className='flex items-center w-auto'>
                  <button disabled={ldisabled} className={`w-10 px-2  py-1 flex items-center justify-center rounded-l-md border-r-[1px] ${ldisabled ? "opacity-[0.2]":"opacity-1"} border-gray-200 bg-white shadow`} onClick={()=>{if(monthidex > 0 && monthidex <= months.length){setMonthIndex(monthidex - 1);if(!ldisabled && rdisabled){setRdisabled(!rdisabled)}}else{setLdisabled(!ldisabled)}}}>
                    <NavArrowLeft className='w-5 h-5 text-zinc-800'/>
                  </button>
                  <button disabled={rdisabled} className={`w-10 px-2  py-1 flex items-center justify-center rounded-r-md mr-2 border-l-[1px] border-gray-200 ${rdisabled ? "opacity-[0.2]":"opacity-1"} bg-white shadow`} onClick={()=>{if(monthidex >= 0 && monthidex < 11){setMonthIndex(monthidex + 1); if(ldisabled && !rdisabled){setLdisabled(!ldisabled)}}else if (monthidex > 10){setRdisabled(!rdisabled)} console.log(months.length)}}>
                    <NavArrowRight className='w-5 h-5 text-zinc-800'/>
                  </button>
                </div>
                <button  className='min-w-12 px-2  py-1 flex items-center justify-center rounded-md   bg-white shadow' >
                    <div className='w-2 h-2 shadow-xs rounded-full bg-yellow-300  mr-1 border-[0.8px] border-white'></div>
                    <h6 className='font-semibold text-zinc-800 text-sm mx-1'>Today</h6>
                  </button>

                  <button  className='min-w-12 px-2  py-1 flex items-center justify-center rounded-md  ml-2 bg-white shadow'>
                    <h6 className='font-semibold text-zinc-800 text-sm mx-1'>Day</h6>
                    <NavArrowDown className='w-4 h-4 text-zinc-800'/>
                  </button>
              </div>
            </div>
        </div>
        </>
  )
}

export default Home