import { useState, useEffect } from "react"

// Custom hook for teams data fetching and state management
const useTeams = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [selectedTeam, setSelectedTeam] = useState('')
    const [selectedTeamId, setSelectedTeamId] = useState(1)
    const [selectedTeamData, setSelectedTeamData] = useState(null)
    const [teams, setTeams] = useState([])
    const [employees, setEmployees] = useState([])
    const [searchQuery, setSearchQuery] = useState('')
    const [sortBy, setSortBy] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)
  
    // Fetch teams data
    const fetchTeams = async () => {
      setIsLoading(true)
      setError(null)
      try {
        const response = await fetch("http://localhost:3030/teams")
        if (!response.ok) throw new Error("Erreur lors de la récupération des équipes")
        const teamsData = await response.json()
        setTeams(teamsData)
        if (teamsData.length > 0 && !selectedTeam) {
          setSelectedTeam(teamsData[0].name)
          setSelectedTeamData(teamsData[0])
          setSelectedTeamId(teamsData[0].id)
        }
        setIsLoading(false)
      } catch (error) {
        console.error("Erreur:", error)
        setError(error.message)
        setIsLoading(false)
      }
    }
  
    useEffect(() => {
      fetchTeams()
    }, [])
  
    // Fetch employees
    const fetchEmployees = async (teamId) => {
      if (!teamId) return
  
      setIsLoading(true)
      try {
        const res = await fetch(`http://localhost:3030/employees`)
        if (!res.ok) throw new Error("Erreur lors de la récupération des employés")
  
        const allEmployees = await res.json()
        const filteredEmployees = allEmployees.filter(employee => 
          employee.teamIds && Array.isArray(employee.teamIds) && employee.teamIds.includes(Number(teamId))
        )
        setEmployees(filteredEmployees)
        setIsLoading(false)
      } catch (err) {
        console.error("Erreur:", err)
        setError(err.message)
        setIsLoading(false)
      }
    }
  
    useEffect(() => {
      if (selectedTeamId) {
        fetchEmployees(selectedTeamId)
        const intervalId = setInterval(() => fetchEmployees(selectedTeamId), 1200000)
        return () => clearInterval(intervalId)
      }
    }, [selectedTeamId])
  
    return {
      isOpen, setIsOpen, selectedTeam, selectedTeamId, selectedTeamData,
      teams, employees, searchQuery, setSearchQuery, sortBy, setSortBy,
      isLoading, error, setSelectedTeam, setSelectedTeamId, setSelectedTeamData,
      fetchEmployees, fetchTeams
    }
  }

export default useTeams