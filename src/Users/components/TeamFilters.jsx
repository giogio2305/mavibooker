import React from 'react'
import { Community, NavArrowDown, Search } from 'iconoir-react'
// Component for filters section
const TeamFilters = ({ searchQuery, setSearchQuery, sortBy, setSortBy }) => (
    <div className="w-full flex items-center justify-between p-4 mt-1">
      <div className='flex items-center w-auto'>
        <div className="max-w-60 bg-white flex items-center ring-1 ring-gray-950/5 shadow rounded-md p-1.5">
          <Search strokeWidth={2} className='text-zinc-700 w-4 h-4 mx-1.5' />
          <input
            type='text'
            placeholder='Search here...'
            className='text-[13px] w-48 border-0 outline-none h-auto'
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
  
        <select
          className='min-w-32 px-1 py-1.5 flex items-center justify-center rounded-md ml-2 bg-white ring-1 ring-gray-950/5 shadow text-sm font-semibold text-zinc-800 outline-none cursor-pointer'
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
        >
          <option value="" disabled>Sort</option>
          <option value="name">Name</option>
          <option value="department">Department</option>
          <option value="createdAt">Creation Date</option>
          <option value="officeLocation">Office Location</option>
          <option value="employeeId">Employee ID</option>
        </select>
      </div>
    </div>
  )

export default TeamFilters