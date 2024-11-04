// Import necessary icons and React dependencies
import { Community, NavArrowDown, Search } from 'iconoir-react'
import { FolderOpenIcon, XCircleIcon } from '@heroicons/react/24/solid'
import React, { useState, useEffect } from 'react'
import TeamHeader from '../components/TeamHeader'
import TeamFilters from '../components/TeamFilters'
import useTeams from '../utils/useTeams'



// Main Teams component
function Teams() {
  document.title = "Teams"
  
  const {
    isOpen, setIsOpen, selectedTeam, selectedTeamId, selectedTeamData,
    teams, employees, searchQuery, setSearchQuery, sortBy, setSortBy,
    isLoading, error, setSelectedTeam, setSelectedTeamId, setSelectedTeamData,
    fetchEmployees
  } = useTeams()

  const handleTeamSelect = (team) => {
    setSelectedTeamData(team)
    setSelectedTeam(team.name)
    setSelectedTeamId(team.id)
    fetchEmployees(team.id)
    setIsOpen(false)
  }

  const formatDateTimeToLocale = (date) => {
    return new Date(date).toLocaleDateString()
  }

  return (
    <div className='w-full h-screen flex flex-col overflow-auto bg-zinc-50'>
      <TeamHeader 
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        selectedTeam={selectedTeam}
        teams={teams}
        onTeamSelect={handleTeamSelect}
      />

      <div className='w-[96%] mx-auto h-[1.3px] bg-gray-200 rounded-md'></div>

      <div className="w-full p-4">
        <h1 className='font-bold text-[#0A0458] text-xl mb-1'>{selectedTeam ? selectedTeam : 'Select a team to view members'}</h1>
        <h4 className='font-normal text-zinc-500 text-xs mt-2'>{selectedTeamData?.description ? selectedTeamData?.description : 'Select a team to view details'}</h4>
      </div>

      <TeamFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      <div className='w-full h-auto'>
        {isLoading ? (
          <div className="w-full h-96 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#100693] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-zinc-600 font-medium mt-4">Chargement des équipes...</p>
          </div>
        ) : error ? (
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
          <div className="w-full h-96 flex flex-col items-center justify-center">
            <FolderOpenIcon className="w-16 h-16 text-zinc-400" />
            <p className="text-zinc-800 font-semibold mt-4">Aucun membre trouvé</p>
            <p className="text-zinc-600 mt-2">Cette équipe n'a pas encore de membres</p>
          </div>
        ) : (
          <div className="w-full overflow-x-auto mt-4">
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
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
                <tbody className="bg-white divide-y divide-gray-200">
                  {employees
                    .filter(employee =>
                      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      employee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      employee.officeLocation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                      employee.employeeId.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .sort((a, b) => {
                      switch (sortBy) {
                        case 'name': return a.name.localeCompare(b.name)
                        case 'department': return a.position.localeCompare(b.position)
                        case 'createdAt': return new Date(b.createdAt) - new Date(a.createdAt)
                        case 'officeLocation': return a.officeLocation.localeCompare(b.officeLocation)
                        case 'employeeId': return a.employeeId.localeCompare(b.employeeId)
                        default: return 0
                      }
                    })
                    .map(employee => (
                      <tr key={employee.id} className="hover:bg-gray-50">
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
          </div>
        )}
      </div>
    </div>
  )
}

export default Teams