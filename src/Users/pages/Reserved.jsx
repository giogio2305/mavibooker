import {  NavArrowDown, Packages } from 'iconoir-react'
import React, { useState, useEffect, useRef } from 'react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import rrulePlugin from '@fullcalendar/rrule'
import interactionPlugin from '@fullcalendar/interaction'
import { AntennaSignal, ArrowRight, Cancel,Trash,WarningTriangle ,Community, Internet, Computer, Clock, Pin, PinAlt, Repeat, Timer, VideoCamera, VideoCameraOff, VideoProjector, BreadSlice} from 'iconoir-react'
import { Link } from 'react-router-dom'


function Reserved() {
  const [isOpen, setIsOpen] = useState(false);
  const [resources, setResources] = useState([]);
  const [selectedResource, setSelectedResource] = useState(null);
  const [events, setEvents] = useState([]);

  const fetchResources = async () => {
    const response = await fetch('http://localhost:3030/resources')
    const data = await response.json()
    setResources(data)
  }

  const fetchEvents = async (resourceId) => {
    if (!resourceId) return;
    const response = await fetch(`http://localhost:3030/events?resourceId=${resourceId}`)
    const data = await response.json()
    setEvents(data)
  }

  useEffect(() => {
    fetchResources()
  }, [])

  useEffect(() => {
    if (selectedResource) {
      fetchEvents(selectedResource?.id)
    }
  }, [selectedResource])

  const handleResourceSelect = (resource) => {
    setSelectedResource(resource)
    setIsOpen(false)
  }

  // Removed the handleEvents function since it was causing infinite updates
  let calendarRef = useRef(null)



  return (
    <div className='w-full h-screen flex flex-col overflow-auto'>
      {/* Header */}
      <div className="w-full flex items-center justify-between p-4 mt-2">
      <div className="flex flex-col">
        <h2 className="text-lg text-[#100693] font-bold">Resources</h2>
        <p className="text-[12px] text-zinc-700 mt-0.5">A way to better manage your resources</p>
      </div>

            <div className='flex items-center'>
        <div className="flex items-center mr-3">
          <Packages className='w-6 h-6 text-zinc-700 mr-1' />
          <div className="relative">
            <button className='min-w-12 px-2 py-1 flex items-center justify-center rounded-md ml-2 bg-white shadow-sm ring-1 ring-zinc-950/5'
              onClick={() => setIsOpen(!isOpen)}
            >
              <h6 className='font-bold text-zinc-800 text-sm mx-1'>{selectedResource ? selectedResource.name : 'Select Resource'}</h6>
              <NavArrowDown strokeWidth={2} className='mt-0.5 w-4 h-4 text-zinc-800' />
            </button>

            {isOpen && (
              <ul className="absolute z-10 w-40 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                {resources.map((resource) => (
                  <li key={resource.id} className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleResourceSelect(resource)}
                  >
                    {resource.name}
                  </li>
                ))}
              </ul>
            )}  
          </div>
        </div>
      </div>
      </div>

      {/* Divider */}
      <div className="w-[96%] mx-auto h-[1.3px] bg-gray-200 rounded-md"></div>

      {/* Resource Details */}
      <div className="w-full p-4">
        <h1 className='font-bold text-[#0A0458] text-xl mb-1'>{selectedResource ? selectedResource.name : 'Select Resource'}</h1>
        <h4 className='font-normal text-zinc-500 text-xs mt-2'>{selectedResource ? selectedResource.description : 'Select a resource to view details'}</h4>
      </div>

      {/* Time Grid */}
      <FullCalendar 
        plugins={[
          dayGridPlugin,
          timeGridPlugin,
          rrulePlugin,
          interactionPlugin
        ]}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        initialView='timeGridDay'
        daysOfWeek= {[ 1, 2, 3, 4 ]}
        slotMinTime={"08:00:00"}
        slotMaxTime={"18:00:00"}
        slotDuration={"00:30:00"}
        timeZone={'local'}
        locale={"en-us"}
        allDaySlot = {false}
        droppable= {false}
        editable={false}
        selectable={false}
        selectMirror={false}
        dayMaxEvents={true}
        events={events}
        eventContent={renderEventContent}
        ref={calendarRef}
      />
    </div>
  )


  function renderEventContent(eventInfo) {
    let calendarApi = calendarRef.current.getApi();
    let currentView = calendarApi.view.type;
    return (
      <div className={`w-full max-w-full h-full flex truncate items-center overflow-clip justify-between  px-1 ${eventInfo.event.classNames[1]}`}>
        <div className="flex items-center">
        <h5 className='font-bold mr-2'>{eventInfo.event.title}</h5>
        <h6 className='font-semibold text-xs'>{eventInfo.timeText}</h6>
        </div>
       {eventInfo.event.extendedProps.location && currentView === "timeGridDay" ? <div className="flex items-center">
        <PinAlt trokeWidth={1.6} className={`w-4 h-4 ${eventInfo.event.classNames[1]} mr-1.5`}/>
        <Link to='/zooom-456-kjyh' className={`${eventInfo.event.classNames[1]} truncate text-[12px] font-semibold underline mr-3`}>{eventInfo.event.extendedProps.location}</Link>
        {eventInfo.event.extendedProps.link && <>
                  <Computer trokeWidth={1.6} className={`w-4 h-4 ${eventInfo.event.classNames[1]} mx-2`}/>
                  <Link to={eventInfo.event.extendedProps.link} className={`${eventInfo.event.classNames[1]} truncate text-[12px] font-semibold underline mr-3`}>Online meet</Link>
                  </>
        }
        </div>
        :
        null 
        }

        {eventInfo.event.extendedProps.location =='' && eventInfo.event.extendedProps.link  && currentView === "timeGridDay" ? <div className="flex items-center">
        <Computer trokeWidth={1.6} className={`w-4 h-4 ${eventInfo.event.classNames[1]} mr-1.5`}/>
        <Link to={eventInfo.event.extendedProps.link} className={`${eventInfo.event.classNames[1]} truncate text-[12px] font-semibold underline mr-3`}>Online meet</Link>
        </div>
        :
        null 
        }

        {eventInfo.event.extendedProps.teams && currentView === "timeGridDay" ? 
        
        <><div className="flex items-center">
        <Community className='w-5 h-5 text-zinc-700 mr-3'/>
        {eventInfo.event.extendedProps.teams.map(team=>
        (
        <Link to={`/team/${team.name}`} className={`min-w-6 h-auto flex items-center justify-center px-2 mt-0.5 ml-0.5 py-0.5 rounded-xl bg-black bg-opacity-5 mr-2  text-[10px] font-bold`}>{team.name}</Link>
        ))
        }
        </div>
        </>
         :
        null
        }

        { eventInfo.event.extendedProps.dow 
        ?
        <div className="flex items-center justify-center h-5 w-5 mr-3 rounded-full  bg-black bg-opacity-40">
             <Pin strokeWidth={2} className={`w-3.5 h-3.5 text-lime-100 `}/>
        </div>
       
        :
        null
        }

    { eventInfo.event.extendedProps.status === 'Pause' 
        ?
      <BreadSlice strokeWidth={1.8} className={`w-5 h-5 mr-4 ${eventInfo.event.classNames[1]} `}/>
        :
        null
        }
      </div>
    )
  }


}



export default Reserved