import { NavArrowDown, Bell, Calendar, CalendarPlus, Clock, Community, LogOut, NavArrowLeft, NavArrowRight, Search, Settings } from 'iconoir-react'
import React, { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import cal from '../../assets/calendar.png'

const Layout = ({ Outlet }) => {
  const location = useLocation();

  const navItems = [
    {
      path: '/calendar',
      icon: <Calendar strokeWidth={1.7} className='w-4 h-4 text-[#0A0458] mr-2'/>,
      label: 'Calendar'
    },
    {
      path: '/teams', 
      icon: <Community strokeWidth={1.6} className='w-5 h-5 text-[#0A0458] mr-2'/>,
      label: 'Teams'
    },
    {
      path: '/reserved',
      icon: <CalendarPlus strokeWidth={1.7} className='w-4 h-4 text-[#0A0458] mr-2'/>, 
      label: 'Resources'
    },
    {
      path: '/settings',
      icon: <Settings strokeWidth={1.7} className='w-4 h-4 text-[#0A0458] mr-2'/>,
      label: 'Settings'
    }
  ];

  const NavItem = ({ path, icon, label }) => (
    <NavLink to={path} className='group mt-3 w-full flex items-center justify-start'>
      <div className={`${location.pathname === path ? "opacity-1":"opacity-0"} h-4 w-1 bg-[#FCD116] rounded-md`}></div>
      <div className={`w-full inline-flex items-center ml-3 justify-between px-3 py-1 ${location.pathname === path ? "bg-[#F4F4F5]":"bg-transparent"} group-hover:bg-[#F4F4F5] rounded-lg`}>
        <div className='flex items-center'>
          {icon}
          <div className={`text-[13px] font-${location.pathname === path ? 'semibold':'medium'} text-[#06023B]`}>{label}</div>
        </div>
        <NavArrowRight strokeWidth={2} className={`${location.pathname === path ? "opacity-1":"opacity-0"} group-hover:block w-4 h-4 text-[#0A0458] ml-8`}/>
      </div>
    </NavLink>
  );

  return (
    <div className='flex relative items-center justify-start w-full max-w-[100vw] overflow-hidden max-h-screen bg-white font-PJS'>
      {/* Sidebar */}
      <div className='sticky w-full md:w-1/6 md:max-w-[17%] h-[100vh] border-r-[2px] bg-white border-gray-200 transition-all duration-300 ease-in-out'>
        {/* Logo section */}
        <div className='w-full h-auto flex items-center p-2.5 my-3'>
          <div className='h-[40px] w-[40px] rounded-full bg-gray-200 mx-2'></div>
          <div className="flex flex-col w-auto">
            <h3 className='flex items-center font-semibold text-lg text-[#100693]'>Mavib<h4 className='text-[#FCD116]'>oo</h4>ker</h3>
            <h4 className="text-semibold text-xs text-zinc-800 hidden md:block">The agile planner</h4>
          </div>
        </div>
        <div className='w-[90%] mx-auto h-[1.4px] my-1.5 bg-gray-200 rounded-md'></div>

        {/* Main section */}
        <div className='w-full flex flex-col pr-6 h-[62%]'>
          <h3 className='text-xs text-zinc-900 m-4 hidden md:block'>MAIN</h3>
          {navItems.map((item, index) => (
            <NavItem key={index} {...item} />
          ))}
        </div>

        {/* Profile */}
        <div className='absolute bottom-2 w-full h-auto flex flex-col justify-center'>
          <div className='w-[90%] mx-auto h-[1.2px] my-1.5 bg-gray-200 rounded-md'></div>
          <div className='w-full h-auto flex items-center p-2 mt-1'>
            <div className='flex items-center justify-center h-[32px] w-[32px] rounded-full bg-[#0A0458] mr-2'>
              <h6 className='text-white text-center text-xs font-bold'>BA</h6>
            </div>
            <div className="flex-col w-auto hidden md:flex">
              <h3 className='flex items-center font-semibold text-sm text-zinc-800'>Barry Anong</h3>
              <h4 className="text-semibold text-[10px] text-zinc-800">anongbarry@gmail.com</h4>
            </div>
          </div>
          <NavLink to='/logout' className='group mt-0.5 w-full flex items-center justify-start'>
            <div className="w-full inline-flex items-center justify-between px-3 ml-3 py-1 rounded-lg">
              <div className='flex items-center'>
                <LogOut strokeWidth={2} className='w-4 h-4 text-red-600 mr-2'/>
                <div className='text-[13px] font-semibold text-red-600 hidden md:block'>Log out</div>
              </div>
            </div>
          </NavLink>
        </div>
      </div>
      {/* End sidebar */}
      {Outlet}
    </div>
  )
}

export default Layout