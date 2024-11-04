import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Search, Bell } from 'iconoir-react'
import cal from '../../assets/calendar.png'
import TimeGrid from '../components/TimeGrid'
import CommonSpaceStatus from '../components/CommonSpaceStatus'
import CardsBar from '../components/CardsBar'

// Calendar Header Component
const CalendarHeader = ({ date, months, meetings }) => (
  <div className="flex items-center">
    <img src={cal} width='48px' height='48px' className='mr-2'/>
    <div className="flex flex-col">
      <h2 className="text-md text-zinc-800 font-bold">
        {months[date.getMonth()]} {date.getDate()}, {date.getFullYear()}
      </h2>
      <p className="text-[11px] text-zinc-700 mt-0.5">
        You have {meetings} meetings today
      </p>
    </div>
  </div>
)

// Schedule Button Component
const ScheduleButton = () => (
  <div className="w-36 flex items-center justify-center h-auto cursor-pointer p-2 rounded-lg bg-[#100693]">
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 21H5C3.89543 21 3 20.1046 3 19V10H21V13M15 4V2M15 4V6M15 4H10.5" 
        stroke="#FAFCFB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3 10V6C3 4.89543 3.89543 4 5 4H7" 
        stroke="#FAFCFB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M7 2V6" 
        stroke="#FAFCFB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M21 10V6C21 4.89543 20.1046 4 19 4H18.5" 
        stroke="#FAFCFB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M14.9922 18H17.9922M21 18H17.9922M17.9922 18V15M17.9922 18V21" 
        stroke="#FBBF24" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
    <p className='text-white text-sm font-semibold ml-2'>Schedule</p>
  </div>
)

// Navigation Links Component 
const NavigationLinks = () => (
  <div className="flex items-center">
    <Link to='/search' className="w-8 h-8 flex items-center mx-1.5 justify-center rounded-full border-[1.5px] border-gray-300">
      <Search strokeWidth={1.8} className='w-4 h-4 text-gray-600'/>
    </Link>
    <Link to='/search' className="w-8 h-8 flex mx-1.5 items-center justify-center rounded-full border-[1.5px] border-gray-300">
      <Bell strokeWidth={1.8} className='w-4 h-4 text-gray-600'/>
    </Link>
  </div>
)

function Calendar() {
  const [meetings, setMeetings] = useState(0)
  document.title = "Calendar"

  const date = new Date()
  const months = ["January", "February", "March", "April", "May", "June", 
                 "July", "August", "September", "October", "November", "December"]

  return (
    <div className="w-full h-screen flex flex-col overflow-auto bg-zinc-50">
      <div className="w-full flex items-center justify-between p-4 mt-1">
        <CalendarHeader 
          date={date}
          months={months}
          meetings={meetings}
        />

        <div className="flex items-center">
          <NavigationLinks />
          <CommonSpaceStatus />
          <ScheduleButton />
        </div>
      </div>

      <div className='w-[96%] mx-auto h-[1.3px] bg-gray-200 rounded-md'></div>

      <CardsBar setMeetings={setMeetings} />
      <TimeGrid />
    </div>
  )
}

export default Calendar