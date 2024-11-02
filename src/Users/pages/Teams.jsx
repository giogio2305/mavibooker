// Import necessary icons and React dependencies
import { Community, NavArrowDown, Search, SortDown } from 'iconoir-react'
import { FolderOpenIcon, XCircleIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect } from 'react'

function Teams() {
  // Set page title
  document.title = "Teams"

  // State management for teams and UI
  const [isOpen, setIsOpen] = useState(false)
  const [selectedTeam, setSelectedTeam] = useState('')
  const [selectedTeamId, setSelectedTeamId] = useState(1)
  const [selectedTeamData, setSelectedTeamData] = useState(null)
  const [teams, setTeams] = useState([])
  const [employees, setEmployees] = useState([])
  const [searchQuery, setSearchQuery] = useState('')
  const [sortBy, setSortBy] = useState('')

  // Loading and error states
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // Fetch teams data on component mount
  useEffect(() => {
    const fetchTeams = () => {
      setIsLoading(true)
      setError(null)
      fetch("http://localhost:3030/teams")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des équipes")
          }
          return response.json()
        })
        .then((teamsData) => {
          setTeams(teamsData)
          // Set first team as default if no team is selected
          if (teamsData.length > 0 && !selectedTeam) {
            setSelectedTeam(teamsData[0].name)
            setSelectedTeamData(teamsData[0])
            setSelectedTeamId(teamsData[0].id)
          }
          setIsLoading(false)
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des équipes:", error)
          setError(error.message)
          setIsLoading(false)
        })
    }

    fetchTeams()
  }, [])

  // Fetch employees for a specific team
  const fetchEmployees = async (teamId) => {
    if (!teamId) return

    setIsLoading(true)
    try {
      const res = await fetch(`http://localhost:3030/employees`)
      if (!res.ok) throw new Error("Erreur lors de la récupération des employés")

      const allEmployees = await res.json()

      // Filter employees by team ID
      const filteredEmployees = allEmployees.filter(employee =>
        employee.teamIds && employee.teamIds.includes(teamId)
      )

      setEmployees(filteredEmployees)
      setIsLoading(false)
    } catch (err) {
      console.error("Erreur:", err)
      setError(err.message)
      setIsLoading(false)
    }
  }

  // Fetch employees when selected team changes
  useEffect(() => {
    if (selectedTeamId) {
      fetchEmployees(selectedTeamId)
      // Refresh employee data every 20 minutes
      const intervalId = setInterval(() => fetchEmployees(selectedTeamId), 1200000)
      return () => clearInterval(intervalId)
    }
  }, [selectedTeamId, selectedTeam])

  // Helper function to format dates
  const formatDateTimeToLocale = (date) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className='w-full h-screen flex flex-col overflow-auto bg-zinc-50'>
      {/* Top Navigation Bar */}
      <div className="w-full flex items-center justify-between p-4 mt-2">
        {/* Page Title and Description */}
        <div className="flex flex-col">
          <h2 className="text-lg text-[#100693] font-bold">Teams</h2>
          <p className="text-[12px] text-zinc-700 mt-0.5">Collaborate with other colleagues</p>
        </div>

        {/* Action Buttons */}
        <div className='flex items-center'>
          {/* Team Selection Dropdown */}
          <div className="flex items-center mr-3">
            <Community className='w-6 h-6 text-zinc-700 mr-1' />
            <div className="relative">
              <button
                className='min-w-12 px-2 py-1 flex items-center justify-center rounded-md ml-2 bg-white shadow-sm ring-1 ring-zinc-950/5'
                onClick={() => { setIsOpen(!isOpen) }}
              >
                <h6 className='font-bold text-zinc-800 text-sm mx-1'>{selectedTeam || 'Select Team'}</h6>
                <NavArrowDown strokeWidth={2} className='mt-0.5 w-4 h-4 text-zinc-800' />
              </button>

              {/* Dropdown Menu */}
              {isOpen && (
                <ul className="absolute z-10 w-32 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                  {teams.map((team) => (
                    <li
                      key={team.id}
                      className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                      onClick={() => {
                        setSelectedTeamData(team)
                        setSelectedTeam(team.name)
                        setSelectedTeamId(team.id)
                        setIsOpen(false)
                        fetchEmployees(team.id)
                      }}
                    >
                      {team.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          {/* Create Team Button */}
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
        </div>
      </div>

      {/* Divider */}
      <div className='w-[96%] mx-auto h-[1.3px] bg-gray-200 rounded-md'></div>

      {/* Team Information Section */}
      <div className="w-full p-4">
        <h1 className='font-bold text-[#0A0458] text-xl mb-1'>{selectedTeam} team members</h1>
        <h4 className='font-normal text-zinc-500 text-xs mt-2'>{selectedTeamData?.description}</h4>
      </div>

      {/* Filters Bar */}
      <div className="w-full flex items-center justify-between p-4 mt-1">
        <div className='flex items-center w-auto'>
          {/* Search Input */}
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

          {/* Sort Dropdown */}
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

      {/* Team Members Data Table */}
      <div className='w-full h-auto'>
        {/* Loading State */}
        {isLoading ? (
          <div className="w-full h-96 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#100693] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-zinc-600 font-medium mt-4">Chargement des équipes...</p>
          </div>
        ) : error ? (
          // Error State
          <div className="w-full h-96 flex flex-col items-center justify-center">
            <XCircleIcon className="w-16 h-16 text-red-500" />
            <p className="text-zinc-800 font-semibold mt-4">Une erreur est survenue</p>
            <p className="text-zinc-600 mt-2">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#100693] text-white rounded-lg hover:bg-[#0c0574]"
            >
              Réessayer
            </button>
          </div>
        ) : employees.length === 0 ? (
          // Empty State
          <div className="w-full h-96 flex flex-col items-center justify-center">
            <FolderOpenIcon className="w-16 h-16 text-zinc-400" />
            <p className="text-zinc-800 font-semibold mt-4">Aucun membre trouvé</p>
            <p className="text-zinc-600 mt-2">Cette équipe n'a pas encore de membres</p>
          </div>
        ) : (
          // Data Table
          <div className="w-full overflow-x-auto mt-4">
            <table className="w-full border-collapse">
              {/* Table Header */}
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Poste</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Téléphone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Bureau</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date d'ajout</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="bg-white divide-y divide-gray-200">
                {employees
                  // Filter employees based on search query
                  .filter(employee =>
                    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    employee.officeLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  // Sort employees based on selected criteria
                  .sort((a, b) => {
                    switch (sortBy) {
                      case 'name':
                        return a.name.localeCompare(b.name)
                      case 'department':
                        return a.position.localeCompare(b.position)
                      case 'createdAt':
                        return new Date(b.createdAt) - new Date(a.createdAt)
                      case 'officeLocation':
                        return a.officeLocation.localeCompare(b.officeLocation)
                      case 'employeeId':
                        return a.employeeId.localeCompare(b.employeeId)
                      default:
                        return 0
                    }
                  })
                  .map(employee => (
                    <tr key={employee._id} className="hover:bg-gray-50">
                      {/* Employee Name and Avatar */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="h-8 w-8 rounded-full bg-[#100693] flex items-center justify-center">
                            <span className="text-white text-sm font-medium">
                              {employee.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                          </div>
                        </div>
                      </td>
                      {/* Employee Details */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{employee.employeeId}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{employee.position}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{employee.email}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{employee.phone}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{employee.officeLocation}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {formatDateTimeToLocale(employee.dateAdded)}
                        </div>
                      </td>
                      {/* Employee Status Badge */}
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-3 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.isActive === true ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.isActive === true ? 'Actif' : 'Inactif'}
                        </span>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}

export default Teams