import React, { useState, useEffect } from 'react';

function CommonSpaceStatus() {
    const [dbEvents, setDbEvents] = useState([]);
    const [status, setStatus] = useState('Available');
    const [timeMessage, setTimeMessage] = useState('');

    useEffect(() => {
        const fetchEvents = () => {
            fetch("http://localhost:3030/events") // Remplacez par votre point d'API
                .then((response) => response.json())
                .then((slotData) => {
                    setDbEvents(slotData);
                    checkRoomStatus(slotData);
                });
        };

        fetchEvents(); // Appel initial pour obtenir les données

        const intervalId = setInterval(fetchEvents, 20000); // Polling toutes les 60 secondes

        return () => clearInterval(intervalId); // Nettoyage de l'intervalle lors du démontage
    }, []);

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours} hour${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
        }
        return `${mins} minute${mins > 1 ? 's' : ''}`;
    };

    const checkRoomStatus = (events) => {
        const now = new Date();
        const fifteenMinutesFromNow = new Date(now.getTime() + 15 * 60000);

        const busyEvent = events.find(event => {
            const eventStart = new Date(event.start);
            const eventEnd = new Date(event.end);
            const isMeetingRoom = event.location === 'Meeting Room';

            return isMeetingRoom && (
                (eventStart <= fifteenMinutesFromNow && eventStart >= now) || // Commence dans les 15 prochaines minutes
                (eventStart <= now && eventEnd >= now) // Est en cours
            );
        });

        if (busyEvent) {
            setStatus('Busy');
            const eventEnd = new Date(busyEvent.end);
            const timeRemaining = Math.ceil((eventEnd - now) / 60000); // Temps restant en minutes
            setTimeMessage(`free in  ${formatTime(timeRemaining)}.`);
        } else {
            const nextEvent = events.find(event => {
                const eventStart = new Date(event.start);
                const isMeetingRoom = event.location === 'Meeting Room';
                return isMeetingRoom && eventStart > now;
            });

            setStatus('Available');
            if (nextEvent) {
                const eventStart = new Date(nextEvent.start);
                const timeUntilOccupied = Math.ceil((eventStart - now) / 60000); // Temps jusqu'à ce qu'elle soit occupée
                setTimeMessage(`busy in ${formatTime(timeUntilOccupied)}.`);
            } else {
                setTimeMessage('free now');
            }
        }
    };
    const bgColorClass = status === 'Busy' ? 'bg-red-300' : 'bg-green-300';
    const statusColorClass = status === 'Busy' ? 'red' : 'green';

    return (
        <div className={`max-w-68 min-h-12 mx-2.5 p-2 px-3 py-2 flex flex-col rounded-md ${bgColorClass}`}>
            <h5 className={`text-[11px] text-${statusColorClass}-800 font-medium`}>Meeting Room, <span className='font-bold'>{status}</span></h5>
            <h3 className={`text-sm text-${statusColorClass}-800 font-semibold mt-0.5`}>{timeMessage}</h3>
        </div>
    );
}

export default CommonSpaceStatus;
