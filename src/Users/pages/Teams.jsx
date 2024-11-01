import { Community, NavArrowDown, Search, SortDown } from 'iconoir-react'
import { FolderOpenIcon, XCircleIcon } from '@heroicons/react/24/solid';
import React, { useState, useEffect } from 'react'

function Teams() {
  document.title="Teams";
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(null);
  const [teams, setTeams] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('');

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch teams
  useEffect(() => {
    const fetchTeams = () => {
      setIsLoading(true);
      setError(null);
      fetch("http://localhost:3030/teams")
        .then((response) => {
          if (!response.ok) {
            throw new Error("Erreur lors de la récupération des équipes");
          }
          return response.json();
        })
        .then((teamsData) => {
          console.log(teamsData);
          setTeams(teamsData);
          // Set first team as default selected
          if(teamsData.length > 0 && !selectedTeam) {
            setSelectedTeam(teamsData[0].name);
            setSelectedTeamId(teamsData[0].id);
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Erreur lors de la récupération des équipes:", error);
          setError(error.message);
          setIsLoading(false);
        });
    };

    fetchTeams();
    const intervalId = setInterval(fetchTeams, 50000);
    return () => clearInterval(intervalId);
  }, []);

  // Fetch employees when selected team changes
  useEffect(() => {
    const fetchEmployees = () => {
      if(selectedTeamId) {
        setIsLoading(true);
        fetch(`http://localhost:3030/employees?teamId=${selectedTeamId}`)
          .then(res => {
            if(!res.ok) throw new Error("Erreur lors de la récupération des employés");
            return res.json();
          })
          .then(data => {
            setEmployees(data);
            setIsLoading(false);
          })
          .catch(err => {
            console.error("Erreur:", err);
            setError(err.message);
            setIsLoading(false);
          });
      }
    };

    fetchEmployees();
    const intervalId = setInterval(fetchEmployees, 50000);
    return () => clearInterval(intervalId);
  }, [selectedTeamId, selectedTeam]);
  
  return (
    <div className='w-full h-screen flex flex-col overflow-auto bg-zinc-50'>
      {/* Top bar */}
    <div className="w-full flex items-center justify-between p-4 mt-2">
      {/* Titles */}
    <div className="flex flex-col">
    <h2 className="text-lg text-[#100693] font-bold">Teams</h2>
    <p className="text-[12px] text-zinc-700 mt-0.5">Collaborate with other colleagues</p>
    </div>
    
    {/* Actions Buttons */}
    <div className='flex items-center'>

      <div className="flex items-center mr-3">
        <Community className='w-6 h-6 text-zinc-700 mr-1'/>
        <div className="relative">
          <button className='min-w-12 px-2 py-1 flex items-center justify-center rounded-md ml-2 bg-white shadow-sm ring-1 ring-zinc-950/5' onClick={() => setIsOpen(!isOpen)}>
            <h6 className='font-bold text-zinc-800 text-sm mx-1'>{selectedTeam || 'Select Team'}</h6>
            <NavArrowDown strokeWidth={2} className='mt-0.5 w-4 h-4 text-zinc-800'/>
          </button>

          {isOpen && (
            <ul className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
              {teams.map((team) => (
                <li
                  key={team._id}
                  className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer flex items-center"
                  onClick={() => {
                    setSelectedTeam(team.name);
                    setSelectedTeamId(team._id);
                    setIsOpen(false);
                  }}
                >
                  {team.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="min-w-36 flex items-center justify-center h-auto p-2 rounded-lg bg-[#100693]">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className='mx-0.5'>
                <g clipPath="url(#clip0_67_258)">
                <path d="M17 10H20M23 10H20M20 10V7M20 10V13" stroke="#FFFF00" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1 20V19C1 15.134 4.13401 12 8 12V12C11.866 12 15 15.134 15 19V20" stroke="#FAFCFB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 12C10.2091 12 12 10.2091 12 8C12 5.79086 10.2091 4 8 4C5.79086 4 4 5.79086 4 8C4 10.2091 5.79086 12 8 12Z" stroke="#FAFCFB" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                <clipPath id="clip0_67_258">
                <rect width="24" height="24" fill="white"/>
                </clipPath>
                </defs>
                </svg>

              <p className='text-white text-sm font-semibold mx-2'>Create a team</p>
              </div>
    </div>
    </div>
    <div className='w-[96%] mx-auto h-[1.3px] bg-gray-200 rounded-md'></div>

    {/* Team Title */}
    <div className="w-full">
      <h1 className='font-bold text-[#0A0458] text-xl my-1 p-4'>{selectedTeam} team members</h1>
    </div>
    {/* Filters Bar */}
    <div className="w-full flex items-center justify-between p-4 mt-1">
    <div className='flex items-center w-auto'>
      {/* Search Bar */}
      <div className="max-w-60 bg-white flex items-center ring-1 ring-gray-950/5 shadow rounded-md p-1.5">
        <Search strokeWidth={2} className='text-zinc-700 w-4 h-4 mx-1.5'/>
        <input 
          type='text' 
          placeholder='Search here...' 
          className='text-[13px] w-48 border-0 outline-none h-auto'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      {/* Sort Button */}
      <select 
        className='min-w-32 px-1 py-1.5 flex items-center justify-center rounded-md ml-2 bg-white ring-1 ring-gray-950/5 shadow text-sm font-semibold text-zinc-800 outline-none cursor-pointer'
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value)}
      >
        <option value="" disabled>Sort</option>
        <option value="name">Name</option>
        <option value="department">Department</option>
        <option value="createdAt">Creation Date</option>
      </select>

    </div>
    </div>

      {/* Data Table  of current team members with pagination, search, sort and preloader */}
      <div className='w-full h-auto'>
        {isLoading ? (
          // Écran de chargement
          <div className="w-full h-96 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-[#100693] border-t-transparent rounded-full animate-spin"></div>
            <p className="text-zinc-600 font-medium mt-4">Chargement des équipes...</p>
          </div>
        ) : error ? (
          // État d'erreur
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
          // État vide
          <div className="w-full h-96 flex flex-col items-center justify-center">
            <FolderOpenIcon className="w-16 h-16 text-zinc-400" />
            <p className="text-zinc-800 font-semibold mt-4">Aucun membre trouvé</p>
            <p className="text-zinc-600 mt-2">Cette équipe n'a pas encore de membres</p>
          </div>
        ) : (
          // Table des membres de l'équipe sélectionnée
          <div className="w-full overflow-x-auto mt-4">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-50">
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Nom</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Poste</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Téléphone</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date d'ajout</th>
                  <th className="px-4 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Statut</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {employees
                  .filter(employee => 
                    employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    employee.position.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    employee.email.toLowerCase().includes(searchQuery.toLowerCase())
                  )
                  .sort((a, b) => {
                    switch(sortBy) {
                      case 'name':
                        return a.name.localeCompare(b.name);
                      case 'department':
                        return a.position.localeCompare(b.position);
                      case 'createdAt':
                        return new Date(b.createdAt) - new Date(a.createdAt);
                      default:
                        return 0;
                    }
                  })
                  .map(employee => (
                    <tr key={employee._id} className="hover:bg-gray-50">
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
                        <div className="text-sm text-gray-600">{employee.position}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{employee.email}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-600">{employee.phone}</div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <div className="text-sm text-gray-600">
                          {new Date(employee.createdAt).toLocaleDateString()}
                        </div>
                      </td>
                      <td className="px-4 py-3 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          employee.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {employee.status === 'active' ? 'Actif' : 'Inactif'}
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