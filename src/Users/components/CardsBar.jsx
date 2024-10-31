import React,{ useState, useEffect } from 'react'
import Card from './Cards'

function CardsBar({setMeetings}) {
    const [dbEvents, setDbEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = () => {
            fetch("http://localhost:3030/events") // Remplacez par votre point d'API
                .then((response) => response.json())
                .then((slotData) => {
                    const today = new Date();
                    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
                    const endOfDay = new Date(today.setHours(23, 59, 59, 999));

                    // Filtrer les événements pour la journée en cours et exclure "Break Time"
                    const filteredEvents = slotData.filter(event => {
                        const eventStart = new Date(event.start);
                        const isRecurring = event.status == 'Recurrent';
                             // Inclure les événements récurrents
                             if (isRecurring) {
                                // Créer une date pour aujourd'hui avec l'heure de l'événement
                                const recurringTime = new Date();
                                recurringTime.setHours(eventStart.getHours(), eventStart.getMinutes(), 0, 0);
                                
                                // Vérifier si l'heure récurrente est dans la journée actuelle
                                return recurringTime >= startOfDay && recurringTime <= endOfDay;
                            }
    
                            // Inclure les événements non récurrents
                            return eventStart >= startOfDay && eventStart <= endOfDay && event.title !== "Break Time";
                        });
    
                        // Trier les événements par heure (du plus proche au moins proche)
                        filteredEvents.sort((a, b) => {
                            const aStart = a.status === 'Recurrent' ? new Date().setHours(new Date(a.start).getHours(), new Date(a.start).getMinutes()) : new Date(a.start);
                            const bStart = b.status === 'Recurrent' ? new Date().setHours(new Date(b.start).getHours(), new Date(b.start).getMinutes()) : new Date(b.start);
                            return aStart - bStart;
                        });

                    setDbEvents(filteredEvents);
                    setMeetings(filteredEvents.length);
                });
        };

        fetchEvents(); // Appel initial pour obtenir les données

        const intervalId = setInterval(fetchEvents, 15000); // Polling toutes les 45 secondes

        return () => clearInterval(intervalId); // Nettoyage de l'intervalle lors du démontage
    }, []);


  return (
    <div className="w-full min-h-[200px] flex items-center overflow-x-auto justify-start p-3 mt-1">
    {/* Card */}

    {dbEvents.map((event) => (
      <Card key={event._id} event={event} />
    ))}

  </div>
  )
}

export default CardsBar