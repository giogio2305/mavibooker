import React, { Fragment, useRef, useState, useEffect } from 'react'
import { Listbox, Transition } from '@headlessui/react'
import { Combobox} from "@headlessui/react";
import { CheckIcon, ChevronDownIcon, ChevronUpDownIcon, UserGroupIcon } from '@heroicons/react/20/solid'
import { Link, NavLink } from 'react-router-dom'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import rrulePlugin from '@fullcalendar/rrule'
import interactionPlugin from '@fullcalendar/interaction'
import {  createEventId } from './event-utils'
import { AntennaSignal, ArrowRight, Cancel,Trash,WarningTriangle ,Community, Internet, Computer, Clock, Pin, PinAlt, Repeat, Timer, VideoCamera, VideoCameraOff, VideoProjector, BreadSlice} from 'iconoir-react'
import DatePicker from 'react-datepicker'
import moment from"moment";
import "react-datepicker/dist/react-datepicker.css";
import { computeShrinkWidth } from '@fullcalendar/core/internal';
import toast, { Toaster } from "react-hot-toast";
import classNames from "classnames";
import styles from '../../App.module.css'


const date = new Date();
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const isWeekday = (date) => {
  const day = date.getDay();
  return day !== 0 && day !== 6;}

const people = [
  { name: 'Meeting Room' },
  { name: 'Maviance Hall' },
  { name: 'Maviance Deido office' },
  { name: 'Maviance Dev office' },
  { name: 'Maviance Marketing office' },
]

const teams = [
  { id: 1, name: "Maviance staff" },
  { id: 2, name: "Business" },
  { id: 3, name: "Marketing" },
  { id: 4, name: "Finance" },
  { id: 5, name: "IT" },
  { id: 6, name: "Ops" },
  { id: 7, name: "Frontend" },
  { id: 8, name: "Backend" },
  { id: 9, name: "Q.A" },
  { id: 10, name: "UI/UX" },
  { id: 11, name: "Product Team" }
];

const statusArr = [
  { name: 'Future', "classNames": ["bg-green-200", "text-green-800"," border-green-200"]},
  { name: 'Recurrent', "classNames": ["bg-lime-200", "text-lime-800","border-0"]},
  { name: 'Canceled', "classNames": ["bg-red-200", "text-red-800","border-0"]},
  { name: 'Past', "classNames": ["bg-slate-200", "text-slate-800"," border-slate-200"]},
  { name: 'Pause', "classNames": ["bg-orange-200","text-orange-800","border-0"] },
  { name: 'Postponed', "classNames": ["bg-purple-200","text-purple-800","border-0"] },
]

const repeatArr = [
  { name: 'Every day', "classNames": ["bg-green-200", "text-green-800"," border-green-200"]},
  { name: 'Every week', "classNames": ["bg-lime-200", "text-lime-800","border-0"]},
  { name: 'Every 2 weeks', "classNames": ["bg-red-200", "text-red-800","border-0"]},
  { name: 'Every Month', "classNames": ["bg-slate-200", "text-slate-800"," border-slate-200"]},
  { name: 'Every Year', "classNames": ["bg-orange-200","text-orange-800","border-0"] },
]

const vidCallArr = [
  { name: 'No video call', "icon": <VideoCameraOff className='w-5 h-5 text-gray-600 mx-1.5'/>},
  { name: 'Video call only', "icon": <Computer className='w-5 h-5 text-gray-600 mx-1.5'/>},
  { name: 'Hybrid', "icon": <VideoProjector className='w-5 h-5 text-gray-600 mx-1.5'/>},
]

const notify = () =>
  toast.custom(
    (t) => (
      <div
        className={classNames([
          styles.notificationWrapper,
          t.visible ? "top-0" : "-top-96",
        ])}
      >
        <div className={styles.iconWrapper}>
          <WarningTriangle />
        </div>
        <div className={styles.contentWrapper}>
          <h1>Scheduling declined</h1>
          <p>
          Event scheduling time has passed. Let's plan for another time!
          </p>
        </div>
        <div className={styles.closeIcon} onClick={() => toast.dismiss(t.id)}>
          <Cancel />
        </div>
      </div>
    ),
    { id: "unique-notification", position: "top-center" }
  );

function TimeGrid() {
const [weekendsVisible, setweekendsVisible] = useState(false)
const [currentEvents, setcurrentEvents] = useState([])
const [dbEvents, setDbEvents] = useState(null)
const [slotData, setSlotData] = useState(null)
const [slotEventData, setSlotEventData] = useState(null)
const [evmd, setEvmd] = useState(false)
const [eved, setEved] = useState(false)
let calendarRef = useRef(null)

const closeModal = () => {
  setEvmd(false);
};
const closeEditModal = () => {
  setEved(false);
};
const handleWeekendsToggle = () => {
    setweekendsVisible(!weekendsVisible)
  }

const   handleDateSelect = (selectInfo) => {

  if(selectInfo.end < moment().toDate().getTime())
  {
    notify();
  }
  else
  {
    setTimeout(() => {
      setSlotData(selectInfo);
      setEvmd(true)
      console.log(JSON.stringify(selectInfo))
    }, 1000);
  }
  let calendarApi = selectInfo.view.calendar
  calendarApi.unselect() // clear date selection
  



    // if (title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //   })
    // }
  }

const handleEventClick = (clickInfo) => {
  setTimeout(() => {
    setSlotEventData(clickInfo);
    setEved(true)
    //console.log(JSON.stringify(clickInfo))
  }, 1000);
}

const handleEvents = (events) => {setcurrentEvents(events)}


  useEffect(() => {
    fetch("http://localhost:3030/events") // replace with your API endpoint
      .then((response) => response.json())
      .then((slotData) => setDbEvents(slotData));
  }, []);


  const fetchEvents = () => {
    fetch("http://localhost:3030/events") // replace with your API endpoint
      .then((response) => response.json())
      .then((slotData) => setDbEvents(slotData));
  };
  return (<>

  <NewEvent slotData={slotData} evmd={evmd} onClose={closeModal} fetchEvents={fetchEvents}/>
  <Event slotEventData={slotEventData} eved={eved} onClose={closeEditModal} fetchEvents={fetchEvents}/>
    <FullCalendar
    className='relative'
    plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin, rrulePlugin]}
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
    ref={calendarRef}
    droppable= {false}
    editable={true}
    selectable={true}
    selectMirror={true}
    dayMaxEvents={true}
    weekends={weekendsVisible}
// alternatively, use the `events` setting to fetch from a feed
    select={handleDateSelect}
    eventContent={renderEventContent} // custom render function
    eventClick={handleEventClick}
    events={dbEvents}
    eventsSet={handleEvents} // called after events are initialized/added/changed/removed
    /* you can update a remote database when these fire:
    eventAdd={function(){}}
    eventChange={function(){}}
    eventRemove={function(){}}
    */
  />
  <Toaster />
    </>
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


const NewEvent = ({slotData, evmd, onClose, fetchEvents}) => {

  const [eventData, setEventData] = useState({});
  const [selected, setSelected] = useState(people[0]);
  const [status, setStatus] = useState(statusArr[0]);
  const [repeat, setRepeat] = useState(repeatArr[0]);
  const [video, setVideo] = useState(vidCallArr[2]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [query, setQuery] = useState("");
  
  
    const filteredTeams =
      query === ""
        ? teams
        : teams.filter((person) =>
            person.name
              .toLowerCase()
              .replace(/\s+/g, "")
              .includes(query.toLowerCase().replace(/\s+/g, ""))
          );

    

  useEffect(() => {
            if (evmd === true) {
              setEventData({
            "id": null,
            "title": "",
            "start": new Date(slotData.startStr),
            "end": new Date(slotData.endStr),
            "classNames": null,
            "dow": null,
            "dom": null,
            "doy": null,
            "editable": false,
            "link": "",
            "teams": [],
            "author": "Testy"
          });
          setSelected(people[0]);
          setStatus(statusArr[0]);
          setRepeat(repeatArr[0]);
          setVideo(vidCallArr[2]);
          setSelectedTeam([]);
            }
  }, [evmd]);

  const handleTitleChange = (e) => {
    setEventData({
      ...eventData,
      title: e.target.value});
  };

  const handleLinkChange = (e) => {
    setEventData({
      ...eventData,
      link: e.target.value});
  };

  function SubmitEvent(){
    const postEvent =
    {
      "id": createEventId(),
      "title": eventData.title,
      "start": eventData.start,
      "end": eventData.end,
      "location": selected.name,
      "status": status.name,
      "classNames": status.classNames,
      "dow": status.name === "Recurrent" ? repeat:null,
      "dom": status.name === "Recurrent" ? repeat:null,
      "doy": status.name === "Recurrent" ? repeat:null,
      "editable": false,
      "teams": selectedTeam,
      "link": eventData.link,
      "author": eventData.author
    }

    fetch("http://localhost:3030/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(postEvent)
    })
      .then((response) => response.json())
      .then(() => {
        fetchEvents();
        onClose()
      });
      
    
    //     if (slotData.title) {
    //   calendarApi.addEvent({
    //     id: createEventId(),
    //     title:slotData,
    //     start: selectInfo.startStr,
    //     end: selectInfo.endStr,
    //   })
    // }
  }



  return(
    <div className={`${evmd ? "flex":"hidden"} w-screen h-screen fixed inset-0 bg-black/40 z-50  items-center justify-center`}>
    <div className="flex items-center flex-col w-[320px] min-h-60 bg-white rounded-lg p-3">
      <div className="flex items-center justify-center w-full h-auto">
        <h5>Create an event</h5>
        {/* <div className="flex items-center justify-center cursor-pointer w-6 h-6 rounded-full bg-gray-700/60" onClick={modalClose}>
        <Cancel className='text-white w-5 h-5'/>
        </div> */}
      </div>
      <main className='w-full p-2 my-2 mx-auto'>
        <input type='text' name="title" placeholder='Event title' value={eventData.title} className='w-full p-1 outline-none font-semibold text-zinc-700 mb-2' onChange={handleTitleChange}/>
        
        {/* Date */}
        <div className="w-full flex items-center my-1 z-50">
          <Clock className='w-4 h-4 text-gray-500 mr-1.5'/>
          <DatePicker
          name="startDate"
            selected={eventData.start}
            onChange={(date) => setEventData({...eventData, start: date})}
            filterDate={isWeekday}
            placeholder={months[date.getMonth()]+" "+date.getDate()+","+date.getFullYear()}
            minDate={new Date()}
            dateFormat="MMMM dd,yyyy"
            className='bg-white rounded text-center font-medium outline-none ring-1 ring-gray-300 shadow-sm py-0.5 px-6 text-sm'
          />
          
            </div>

        {/* Time */}
        <div className="w-auto flex items-center justify-start py-1 mt-2">
            <Timer className='w-4 h-4 text-gray-500 mr-1.5'/>
            <DatePicker
            name="startTime"
            selected={eventData.start}
            onChange={(date) => setEventData({...eventData, start: date})}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            minTime={new Date()}
            maxTime={new Date().setHours(16, 59, 59)}
            placeholder='End time'
            dateFormat="h:mm"
            className='w-20 bg-white ring-1 ring-gray-300 z-40 rounded-s text-center font-medium outline-nones hadow-sm p-0.5 text-sm'
          />
          <div className='w-12 p-1 bg-gray-100 ring-1 ring-gray-300 border-x flex items-center justify-center'>
            <ArrowRight className='w-4 h-4 text-zinc-800 stroke-[2.3] '/>
          </div>
          <DatePicker
          name="endTime"
            selected={eventData.end}
            onChange={(date) => setEventData({...eventData, end: date})}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            minTime={new Date()}
            maxTime={new Date().setHours(16, 59, 59)}
            dateFormat="h:mm"
            className='w-20 bg-white ring-1 ring-gray-300 rounded-e text-center font-medium outline-none shadow-sm p-0.5 text-sm'
          />
        </div>

        {/* status */}
    <div className="w-full flex items-center my-1">
          <AntennaSignal className='w-5 h-5 text-gray-400 mr-1.5'/>
          <Listbox value={status} onChange={setStatus} >
      <div className="w-2/3 relative mt-1 ">
        <Listbox.Button className="relative w-full cursor-default rounded bg-white ring-1 ring-gray-300 py-0.5 px-8  pl-3 pr-10 text-left shadow-sm text-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{status.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {statusArr.slice(0,3).map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-50 text-gray-900' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ status }) => (
                  <>
                    <span
                      className={`flex items-center truncate ${
                        status ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      <div className={`w-3 h-3 ${person.classNames[0]} shadow-sm rounded-full mr-2`}></div>
                      {person.name}
                    </span>
                    {status ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
    </div>

    {status.name === "Recurrent" && <><div className="w-full flex items-center my-1.5">
          <Repeat className='w-5 h-5 text-gray-500 mr-1.5'/>
          <Listbox value={repeat} onChange={setRepeat} >
      <div className="w-2/3 relative mt-1 ">
        <Listbox.Button className="relative w-full cursor-default rounded bg-white ring-1 ring-gray-300 py-0.5 px-8  pl-3 pr-10 text-left shadow-sm text-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{repeat.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full z-20 overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {repeatArr.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-50 text-gray-900' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ repeat }) => (
                  <>
                    <span
                      className={`block truncate ${
                        repeat ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.name}
                    </span>
                    {repeat ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
    </div>
    </>
    }
        

    <div className="w-full flex items-center my-1.5">
    <VideoCamera className='w-5 h-5 text-gray-500 mr-1.5'/>
    <Listbox value={video} onChange={setVideo} >
      <div className="w-2/3 relative mt-1 ">
        <Listbox.Button className="relative w-full cursor-default rounded bg-white ring-1 ring-gray-300 py-0.5 px-8  pl-3 pr-10 text-left shadow-sm text-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{video.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {vidCallArr.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-8 pr-4 ${
                    active ? 'bg-gray-50 text-gray-900' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ video }) => (
                  <>
                    <span
                      className={`flex items-center truncate ${
                        video ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.icon}
                      {person.name}
                    </span>
                    {video ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
    </div>

    { video.name !== "No video call" && <div className="w-full flex items-center my-1.5 z-0">
    <Internet className='w-5 h-5 text-gray-500 mr-1.5'/>
    <input type="text" name="eventlink" id="evli" value={eventData.link} className='bg-white rounded font-medium outline-none ring-1 ring-gray-300 shadow-sm py-0.5 px-6 text-sm' onChange={handleLinkChange}/>
    </div>}

    <div className="w-full flex items-center my-1.5 z-auto">
    <UserGroupIcon className='w-5 h-5 text-gray-500 mr-1.5'/>
    <Combobox value={selectedTeam} onChange={setSelectedTeam} multiple>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded bg-white ring-1 ring-gray-300  text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-0.5 px-4  outline-0 text-sm pr-8 leading-1 text-gray-900 focus:ring-0"
              displayValue={(people) =>
                people.map((person) => person.name).join(", ")
              }
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredTeams.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredTeams.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
      </Combobox>
    </div>

    { video.name !== "Video call only" &&
      <div className="w-full flex items-center my-1">
          <PinAlt className='w-5 h-5 text-gray-400 mr-1.5'/>
          <Listbox value={selected} onChange={setSelected} >
      <div className="w-2/3 relative mt-1">
        <Listbox.Button className="relative w-full cursor-default rounded bg-white ring-1 ring-gray-300 py-0.5 px-8  pl-3 pr-10 text-left shadow-sm text-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{selected.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-0 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {people.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ selected }) => (
                  <>
                    <span
                      className={`block truncate ${
                        selected ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.name}
                    </span>
                    {selected ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
          </Listbox>
</div>}

<div className="flex items-center justify-start w-full h-auto mt-8"> 
<div className='min-w-52 px-2 py-1.5 font-semibold rounded text-white text-xs bg-gray-700 mx-1 cursor-pointer' onClick={onClose}>Cancel</div>
<div className='min-w-52 px-2 py-1.5 font-semibold rounded text-white text-xs bg-[#100693] mx-2 cursor-pointer' onClick={SubmitEvent}>Schedule an event</div>
</div>
      </main>
    </div>
  </div>
  )


}

const Event =({slotEventData, eved, onClose, fetchEvents})=>{
  const session_name = 'Testy'
  const [eventData, setEventData] = useState({});
  const [isMe, setIsMe] = useState(true)
  const [link, setLink] = useState('')
  const [selected, setSelected] = useState(people[0]);
  const [status, setStatus] = useState(statusArr[0]);
  const [repeat, setRepeat] = useState(repeatArr[0]);
  const [video, setVideo] = useState(vidCallArr[2]);
  const [selectedTeam, setSelectedTeam] = useState([]);
  const [query, setQuery] = useState("");
  console.log(slotEventData)
  useEffect(() => {
    if (eved === true) {
      setLink(slotEventData.event.extendedProps.link);
      setSelected(people[people.findIndex(selected => selected.name === slotEventData.event.extendedProps.location)])
      setEventData({"id":slotEventData.event.id,"title":slotEventData.event.title,"start":slotEventData.event.start, "end":slotEventData.event.end, "location":selected.name, "link": link})
      setStatus(statusArr[statusArr.findIndex(status => status.name === slotEventData.event.extendedProps.status)]);
      setSelectedTeam(slotEventData.event.extendedProps.teams)

      if(slotEventData.event.extendedProps.location && slotEventData.event.extendedProps.location !==""){
        if(slotEventData.event.extendedProps.link && slotEventData.event.extendedProps.link !==""){
          setVideo(vidCallArr[2])
        }else{
          setVideo(vidCallArr[0])
        }
      }else 
      {
      setVideo(vidCallArr[1])
      }
      if(slotEventData.event.extendedProps.author === session_name){
        setIsMe(true)
      }else{
        setIsMe(false)
      }
    }
}, [eved]);

const filteredTeams =
query === ""
  ? teams
  : teams.filter((person) =>
      person.name
        .toLowerCase()
        .replace(/\s+/g, "")
        .includes(query.toLowerCase().replace(/\s+/g, ""))
    );


const handleTitleChange = (e) => {
  setEventData({
    ...eventData,
    title: e.target.value});
};

const handleLinkChange = (e) => {
  setLink(e.target.value);
};

const updateEvent =  () =>{
  const putEvent =
  {
    "id": eventData.id,
    "title": eventData.title,
    "start": eventData.start,
    "end": eventData.end,
    "location": video.name === "Video call only" ? "":selected.name,
    "status": status.name,
    "classNames": status.classNames,
    "dow": status.name === "Recurrent" ? repeat:null,
    "dom": status.name === "Recurrent" ? repeat:null,
    "doy": status.name === "Recurrent" ? repeat:null,
    "editable": false,
    "teams": selectedTeam,
    "link": video.name === "No video call" ? "":link,
    "author": eventData.author
  }

  fetch(`http://localhost:3030/events/${eventData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(putEvent)
  })
  .then(response => response.json())
  .then(data => {
    fetchEvents();
    onClose();
    console.log(data);
  })
  .catch(error => console.error(error));
}

const deleteEvent = () => {
  const cancelEvent =
  {
    "status": 'Canceled',
    "classNames": [
      "bg-red-200",
      "text-red-800",
      "border-0"
    ],
  }
  fetch(`http://localhost:3030/events/${eventData.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(cancelEvent)
  })
  .then(response => response.json())
  .then(data => {
    fetchEvents();
    onClose();
    console.log(data)})
  .catch(error => console.error(error));
}


  return(
    <div className={`${eved ? "flex":"hidden"} w-screen h-screen fixed inset-0 bg-black/40 z-50  items-center justify-center`}>
        <div className="flex items-center flex-col w-[320px] min-h-60 bg-white rounded-lg p-3">
          <div className="flex flex-col items-center justify-center w-full h-auto">
          {isMe === true ? 
        <input type="text" placeholder='Event title' value={eventData.title} className='w-full text-center p-1 outline-none font-semibold text-zinc-700' onChange={handleTitleChange} />
          :
          <div className='font-semibold text-zinc-700'>{eventData.title}</div>
          }
          </div>
      <main className='w-full p-2 my-1 mx-auto'>
          {/* Date */}
          <div className="w-full flex items-center my-1 z-50">
          <Clock className='w-4 h-4 text-gray-500 mr-1.5'/>
          <DatePicker
          disabled={isMe === true ? false:true}
          name="startDate"
            selected={eventData.start}
            onChange={(date) => {setEventData({...eventData, start: date}); setStatus(statusArr[statusArr.findIndex(status => status.name === "Postponed")])}}
            filterDate={isWeekday}
            placeholder={months[date.getMonth()]+" "+date.getDate()+","+date.getFullYear()}
            minDate={new Date()}
            dateFormat="MMMM dd,yyyy"
            className='bg-white rounded text-center font-medium outline-none ring-1 ring-gray-300 shadow-sm py-0.5 px-6 text-sm'
          />
          
            </div>
          {/* Time */}
          <div className="w-auto flex items-center justify-start py-1 mt-2">
            <Timer className='w-4 h-4 text-gray-500 mr-1.5'/>
            <DatePicker
            disabled={isMe === true ? false:true}
            name="startTime"
            selected={eventData.start}
            onChange={(date) => {setEventData({...eventData, start: date}); setStatus(statusArr[statusArr.findIndex(status => status.name === "Postponed")])}}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            minTime={new Date()}
            maxTime={new Date().setHours(16, 59, 59)}
            placeholder='End time'
            dateFormat="h:mm"
            className='w-20 bg-white ring-1 ring-gray-300 z-40 rounded-s text-center font-medium outline-nones hadow-sm p-0.5 text-sm'
          />
          <div className='w-12 p-1 bg-gray-100 ring-1 ring-gray-300 border-x flex items-center justify-center'>
            <ArrowRight className='w-4 h-4 text-zinc-800 stroke-[2.3] '/>
          </div>
          <DatePicker
          disabled={isMe === true ? false:true}
          name="endTime"
            selected={eventData.end}
            onChange={(date) => {setEventData({...eventData, end: date}); setStatus(statusArr[statusArr.findIndex(status => status.name === "Postponed")])}}
            showTimeSelect
            showTimeSelectOnly
            timeIntervals={30}
            timeCaption="Time"
            minTime={eventData.start}
            maxTime={new Date().setHours(16, 59, 59)}
            dateFormat="h:mm"
            className='w-20 bg-white ring-1 ring-gray-300 rounded-e text-center font-medium outline-none shadow-sm p-0.5 text-sm'
          />
        </div>

        {/* Status */}
        <div className="w-full flex items-center my-1">
          <AntennaSignal className={`w-5 h-5 ${isMe === false ? status.classNames[1]:"text-gray-500"} mr-1.5`}/>
          {isMe === true
          ?
          <Listbox value={status} onChange={setStatus} >
      <div className="w-2/3 relative mt-1 ">
        <Listbox.Button className="relative w-full cursor-default rounded bg-white ring-1 ring-gray-300 py-0.5 px-8  pl-3 pr-10 text-left shadow-sm text-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{status.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute z-30 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {statusArr.slice(0,3).map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-50 text-gray-900' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ status }) => (
                  <>
                    <span
                      className={`flex items-center truncate ${
                        status ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      <div className={`w-3 h-3 ${person.classNames[0]} shadow-sm rounded-full mr-2`}></div>
                      {person.name}
                    </span>
                    {status ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
          </Listbox>
        :
        <div className={`rounded ${status.classNames[0]}  ${status.classNames[1]} py-0.5 px-6 text-sm font-medium shadow flex items-center justify-start`}>
          {status.name}
        </div>  
        }
        </div>

        {/* Repeat */}
        {status.name === "Recurrent" && isMe === true && <><div className="w-full flex items-center my-1.5">
          <Repeat className='w-5 h-5 text-gray-500 mr-1.5'/>
          <Listbox value={repeat} onChange={setRepeat} >
      <div className="w-2/3 relative mt-1 ">
        <Listbox.Button className="relative w-full cursor-default rounded bg-white ring-1 ring-gray-300 py-0.5 px-8  pl-3 pr-10 text-left shadow-sm text-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{repeat.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 max-h-60 w-full z-20 overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {repeatArr.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-10 pr-4 ${
                    active ? 'bg-gray-50 text-gray-900' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ repeat }) => (
                  <>
                    <span
                      className={`block truncate ${
                        repeat ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.name}
                    </span>
                    {repeat ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
          </Listbox>
            </div>
            </>
            }

        {/* Meet type */}
    <div className="w-full flex items-center my-2">
    <VideoCamera className='w-5 h-5 text-gray-500 mr-1.5'/>
    {isMe === true
    ?
    <Listbox value={video} onChange={setVideo} >
      <div className="w-2/3 relative mt-1 ">
        <Listbox.Button className="relative w-full cursor-default rounded bg-white ring-1 ring-gray-300 py-0.5 px-8  pl-3 pr-10 text-left shadow-sm text-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
          <span className="block truncate">{video.name}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        <Transition
          as={Fragment}
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <Listbox.Options className="absolute mt-1 z-20 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
            {vidCallArr.map((person, personIdx) => (
              <Listbox.Option
                key={personIdx}
                className={({ active }) =>
                  `relative cursor-default select-none py-2 pl-8 pr-4 ${
                    active ? 'bg-gray-50 text-gray-900' : 'text-gray-900'
                  }`
                }
                value={person}
              >
                {({ video }) => (
                  <>
                    <span
                      className={`flex items-center truncate ${
                        video ? 'font-medium' : 'font-normal'
                      }`}
                    >
                      {person.icon}
                      {person.name}
                    </span>
                    {video ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-blue-600">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                )}
              </Listbox.Option>
            ))}
          </Listbox.Options>
        </Transition>
      </div>
    </Listbox>
    :
    <div className='bg-white rounded text-center font-medium outline-none ring-1 ring-gray-300 shadow-sm py-0.5 text-zinc-700 px-6 text-sm'>
      {eventData.location !==''
      ? eventData.link !='' ? "Hybrid":"No video call"
      :"Video call only"
      }
    </div>  
  }

    </div>

    {video.name !== "No video call" &&
     
     <div className="w-full flex items-center my-1.5 z-0">
    <Internet className='w-5 h-5 text-gray-500 mr-1.5'/>
    {isMe === true ?  <input type="text" name="eventlink" id="evli" value={link} className='bg-white rounded font-medium outline-none ring-1 ring-gray-300 shadow-sm py-0.5 px-6 text-sm' onChange={(e)=>setLink(e.target.value)}/>
    :
    <Link to={link} className='ml-1 max-w-72 truncate text-sm underline font-semibold text-gray-500'>Join the call here</Link> 
    }
    </div> 
  }
  
  {eventData.location !=='' && video.name !== "Video call only" &&
      <div className="w-full flex items-center my-1">
                  <PinAlt className='w-5 h-5 text-gray-500 mr-1.5'/>
                 {isMe === true ?
                 <Listbox value={eventData.location} onChange={setSelected} >
              <div className="w-2/3 relative mt-1">
                <Listbox.Button className="relative w-full cursor-default rounded bg-white ring-1 ring-gray-300 py-0.5 px-8  pl-3 pr-10 text-left shadow-sm text-sm focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                  <span className="block truncate">{selected.name}</span>
                  <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                    <ChevronUpDownIcon
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </span>
                </Listbox.Button>
                <Transition
                  as={Fragment}
                  leave="transition ease-in duration-100"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <Listbox.Options className="absolute z-20 mt-1 max-h-60 w-full overflow-auto rounded-sm bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    {people.map((person, personIdx) => (
                      <Listbox.Option
                        key={personIdx}
                        className={({ active }) =>
                          `relative cursor-default select-none py-2 pl-10 pr-4 ${
                            active ? 'bg-amber-100 text-amber-900' : 'text-gray-900'
                          }`
                        }
                        value={person}
                      >
                        {({ selected }) => (
                          <>
                            <span
                              className={`block truncate ${
                                selected ? 'font-medium' : 'font-normal'
                              }`}
                            >
                              {person.name}
                            </span>
                            {selected ? (
                              <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-amber-600">
                                <CheckIcon className="h-5 w-5" aria-hidden="true" />
                              </span>
                            ) : null}
                          </>
                        )}
                      </Listbox.Option>
                    ))}
                  </Listbox.Options>
                </Transition>
              </div>
                  </Listbox>
                :
                <Link to={eventData.location} className='ml-1 max-w-72 truncate text-sm my-0.5 font-semibold text-gray-500'>{eventData.location}</Link>
                }
        </div>
  }

    {selectedTeam.length > 0 && <div className="w-full flex items-center my-1.5">
    <UserGroupIcon className='w-5 h-5 text-gray-500 mr-1.5'/>
    {isMe === true ?
    <Combobox value={selectedTeam} onChange={setSelectedTeam} multiple>
        <div className="relative mt-1">
          <div className="relative w-full cursor-default overflow-hidden rounded bg-white ring-1 ring-gray-300  text-left shadow-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
            <Combobox.Input
              className="w-full border-none py-0.5 px-4  outline-0 text-sm pr-8 leading-1 text-gray-900 focus:ring-0"
              displayValue={(people) =>
                people.map((person) => person.name).join(", ")
              }
            />
            <Combobox.Button className="absolute inset-y-0 right-0 flex items-center pr-2">
              <ChevronUpDownIcon
                className="h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Combobox.Button>
          </div>
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            afterLeave={() => setQuery("")}
          >
            <Combobox.Options className="absolute mt-1 z-10 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
              {filteredTeams.length === 0 && query !== "" ? (
                <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                  Nothing found.
                </div>
              ) : (
                filteredTeams.map((person) => (
                  <Combobox.Option
                    key={person.id}
                    className={({ active }) =>
                      `relative cursor-default select-none py-2 pl-10 pr-4 ${
                        active ? "bg-teal-600 text-white" : "text-gray-900"
                      }`
                    }
                    value={person}
                  >
                    {({ selected, active }) => (
                      <>
                        <span
                          className={`block truncate ${
                            selected ? "font-medium" : "font-normal"
                          }`}
                        >
                          {person.name}
                        </span>
                        {selected ? (
                          <span
                            className={`absolute inset-y-0 left-0 flex items-center pl-3 ${
                              active ? "text-white" : "text-teal-600"
                            }`}
                          >
                            <CheckIcon
                              className="h-5 w-5"
                              aria-hidden="true"
                            />
                          </span>
                        ) : null}
                      </>
                    )}
                  </Combobox.Option>
                ))
              )}
            </Combobox.Options>
          </Transition>
        </div>
    </Combobox>
    :
    <div className="flex items-center justify-start">

      {
      selectedTeam.map((el)=>{
        return(
          <div className={`min-w-6 h-auto flex items-center justify-center px-2 mt-0.5 ml-0.5 py-0.5 rounded-xl text-zinc-500 cursor-pointer bg-black bg-opacity-5 mr-2  text-[12px] font-bold`}>
          {el.name}
          </div>
        )
      })

      }
      
    </div>  
  }
    </div>}


        {/* Footer */}
        <div className='flex items-center justify-between w-full h-auto mt-8'>
        <div className="flex items-center justify-start w-auto h-auto">
        <div className='min-w-52 px-2 py-1.5 font-semibold rounded text-white text-xs bg-gray-700 mx-1 cursor-pointer' onClick={onClose}>Close</div>
        {isMe === true && <div className='min-w-52 px-2 py-1.5 font-semibold rounded text-white text-xs bg-[#100693] mx-1.5 cursor-pointer' onClick={updateEvent}>Update event</div>}
        </div>
        {isMe === true && 
        <div className='min-w-52 px-2 py-1 shadow font-semibold rounded text-red-700 text-xs bg-white ring-1 ring-gray-300 mx-1.5 cursor-pointer' onClick={deleteEvent}>Cancel event</div>
      }
        </div>
        </main>
    </div>
    </div>
  );
}



export default TimeGrid