import { NavArrowDown, Bell, Calendar, CalendarPlus, Clock, Community, LogOut, NavArrowLeft, NavArrowRight, Search, Settings } from 'iconoir-react'
import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import cal from '../../assets/calendar.png'

function Layout({Outlet}) {
    const location = useLocation();
  return (
    <div className='flex relative items-center justify-start w-full max-w-[100vw] overflow-hidden max-h-screen bg-white font-PJS'>
        {/* Sidebar */}
        <div className='sticky w-1/6 max-w-[17%] h-[100vh] border-r-[2px] bg-white border-gray-200'>
            {/* Logo section */}
            <div className='w-full h-auto flex items-center p-2.5  my-3'>
            <div className='h-[40px] w-[40px] rounded-full bg-gray-200 mx-2'></div>
            <div className="flex flex-col w-auto">
            <h3 className='flex items-center font-semibold text-lg text-[#100693]'>Mavib<h4 className='text-[#FCD116]'>oo</h4>ker</h3>
            <h4 className="text-semibold text-xs text-zinc-800">The agile planner</h4>
            </div>
            </div>
            <div className='w-40 mx-auto h-[1.5px] my-1.5 bg-gray-200 rounded-md'></div>

            {/* Main section */}
            <div className='w-full flex flex-col pr-6 h-[62%]'>
              <h3 className='text-xs text-zinc-900 m-4'>MAIN</h3>
                {/* Calendar route item */}
                <NavLink to='/calendar' className='group   w-full flex items-center justify-start'>
                  <div className={`${location.pathname === '/calendar' ? "visible":"hidden"} h-4 w-1 bg-[#FCD116] rounded-md`}></div>
                  <div className={`w-full inline-flex items-center ml-3 justify-between px-3   py-1 ${location.pathname === '/calendar' ? "bg-[#F4F4F5]":"bg-transparent"} group-hover:bg-[#F4F4F5] rounded-lg`}>
                  <div className='flex items-center'>
                  <Calendar strokeWidth={2} className='w-4 h-4 text-[#0A0458] mr-2'/>
                  <div className={`text-[13px] font-${location.pathname === '/calendar' ? 'bold':'semibold'} text-[#06023B]`}>Calendar</div>
                  </div>
                  <NavArrowRight strokeWidth={2} className={`${location.pathname === '/calendar' ? "opacity-1":"opacity-0"} group-hover:block w-4 h-4 text-[#0A0458]  ml-8`}/>
                  </div>
                </NavLink>
                {/* Teams route item */}
                <NavLink to='/teams' className='group mt-3 w-full flex items-center justify-start'>
                  <div className={`${location.pathname === '/teams' ? "opacity-1":"opacity-0"} h-4 w-1 bg-[#FCD116] rounded-md`}></div>
                  <div className={`w-full inline-flex items-center ml-3 justify-between px-3   py-1 ${location.pathname === '/teams' ? "bg-[#F4F4F5]":"bg-transparent"} group-hover:bg-[#F4F4F5] rounded-lg`}>
                  <div className='flex items-center'>
                  <Community strokeWidth={1.7} className='w-5 h-5 text-[#0A0458] mr-2'/>
                  <div className={`text-[13px] font-${location.pathname === '/teams' ? 'bold':'semibold'} text-[#06023B]`}>Teams</div>
                  </div>
                  <NavArrowRight strokeWidth={2} className={`${location.pathname === '/teams' ? "opacity-1":"opacity-0"} group-hover:block w-4 h-4 text-[#0A0458]  ml-8`}/>
                  </div>
                </NavLink>
                {/* Reserved route item */}
                <NavLink to='/reserved' className='group mt-3 w-full flex items-center justify-start'>
                  <div className={`${location.pathname === '/reserved' ? "opacity-1":"opacity-0"} h-4 w-1 bg-[#FCD116] rounded-md`}></div>
                  <div className={`w-full inline-flex items-center ml-3 justify-between px-3   py-1 ${location.pathname === '/reserved' ? "bg-[#F4F4F5]":"bg-transparent"} group-hover:bg-[#F4F4F5] rounded-lg`}>
                  <div className='flex items-center'>
                  <CalendarPlus strokeWidth={1.7} className='w-4 h-4 text-[#0A0458] mr-2'/>
                  <div className={`text-[13px] font-${location.pathname === '/reserved' ? 'bold':'semibold'} text-[#06023B]`}>Reserved</div>
                  </div>
                  <NavArrowRight strokeWidth={2} className={`${location.pathname === '/reserved' ? "opacity-1":"opacity-0"} group-hover:block w-4 h-4 text-[#0A0458]  ml-8`}/>
                  </div>
                </NavLink>
                {/* Settings route item */}
                <NavLink to='/settings' className='group mt-3 w-full flex items-center justify-start'>
                  <div className={`${location.pathname === '/settings' ? "opacity-1":"opacity-0"} h-4 w-1 bg-[#FCD116] rounded-md`}></div>
                  <div className={`w-full inline-flex items-center ml-3 justify-between px-2 py-1 ${location.pathname === '/settings' ? "bg-[#F4F4F5]":"bg-transparent"} group-hover:bg-[#F4F4F5] rounded-lg`}>
                  <div className='flex items-center'>
                  <Settings strokeWidth={1.7} className='w-4 h-4 text-[#0A0458] mr-2'/>
                  <div className={`text-[13px] font-${location.pathname === '/settings' ? 'bold':'semibold'} text-[#06023B]`}>Settings</div>
                  </div>
                  <NavArrowRight strokeWidth={2} className={`${location.pathname === '/settings' ? "opacity-1":"opacity-0"} group-hover:block w-4 h-4 text-[#0A0458]  ml-8`}/>
                  </div>
                </NavLink>
            </div>

            {/* Profile */}
            <div className='w-40 mx-auto h-[1.3px] my-1.5 bg-gray-200 rounded-md'></div>
            <div className='w-full h-auto flex items-center p-2  mt-1'>
                <div className='h-[32px] w-[32px] rounded-full bg-gray-200 mr-2'></div>
                <div className="flex flex-col w-auto">
                    <h3 className='flex items-center font-semibold text-sm text-zinc-800'>Barry Anong</h3>
                    <h4 className="text-semibold text-[10px] text-zinc-800">anongbarry@gmail.com</h4>
                </div>
            </div>
            <NavLink to='/logout' className='group mt-0.5 w-full flex items-center justify-start'>
               <div className="w-full inline-flex items-center justify-between px-3  ml-3 py-1 rounded-lg">
                  <div className='flex items-center'>
                  <LogOut strokeWidth={2} className='w-4 h-4 text-red-600 mr-2'/>
                  <div className='text-[13px] font-semibold text-red-600'>Log out</div>
                  </div></div>
            </NavLink>
        </div>
        {/* End sidebar */}
    {Outlet}
    </div>
  )
}

export default Layout