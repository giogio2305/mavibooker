import { Community, NavArrowDown, Search } from 'iconoir-react'
import React, { useState, useEffect } from 'react'
import CreateTeamButton from './CreateTeamButton';

const TeamHeader = ({ isOpen, setIsOpen, selectedTeam, teams, onTeamSelect }) => (
    <div className="w-full flex items-center justify-between p-4 mt-2">
      <div className="flex flex-col">
        <h2 className="text-lg text-[#100693] font-bold">Teams</h2>
        <p className="text-[12px] text-zinc-700 mt-0.5">Collaborate with other colleagues</p>
      </div>
  
      <div className='flex items-center'>
        <div className="flex items-center mr-3">
          <Community className='w-6 h-6 text-zinc-700 mr-1' />
          <div className="relative">
            <button
              className='min-w-12 px-2 py-1 flex items-center justify-center rounded-md ml-2 bg-white shadow-sm ring-1 ring-zinc-950/5'
              onClick={() => setIsOpen(!isOpen)}
            >
              <h6 className='font-bold text-zinc-800 text-sm mx-1'>{selectedTeam || 'Select Team'}</h6>
              <NavArrowDown strokeWidth={2} className='mt-0.5 w-4 h-4 text-zinc-800' />
            </button>
  
            {isOpen && (
              <ul className="absolute z-10 w-32 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                {teams.map((team) => (
                  <li
                    key={team.id}
                    className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => onTeamSelect(team)}
                  >
                    {team.name}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
  
        <CreateTeamButton />
      </div>
    </div>
  )

  export default TeamHeader;