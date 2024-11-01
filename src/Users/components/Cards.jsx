import React from 'react';
import { AntennaSignal, Clock, Community, Group, Microscope, Timer } from 'iconoir-react';
import { Link } from 'react-router-dom';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/solid';
import { MapPinIcon } from '@heroicons/react/24/outline';

function Cards({ event }) {
    if (!event) {
        return <p>Loading event...</p>; // Message si l'événement n'est pas encore chargé
    }

    const today = new Date();
    const startOfDay = new Date(today.setHours(0, 0, 0, 0));
    const endOfDay = new Date(today.setHours(23, 59, 59, 999));
    const eventStatus = event.status;


    // Vérifiez si l'événement est aujourd'hui et n'est pas "Break Time"
    if (event.title === 'Break Time' || new Date(event.start) < startOfDay || new Date(event.start) > endOfDay) {
        return null; // Ne rien afficher si c'est "Break Time" ou si l'événement n'est pas aujourd'hui
    }

    const formatTime = (minutes) => {
        const hours = Math.floor(minutes / 60);
        const mins = minutes % 60;
        if (hours > 0) {
            return `${hours} heure${hours > 1 ? 's' : ''} ${mins} minute${mins > 1 ? 's' : ''}`;
        }
        return `${mins} minute${mins > 1 ? 's' : ''}`;
    };

    const formatTimeString = (timeString) => {
        const [hours, minutes] = timeString.split(':');
        const formattedHours = hours % 12 || 12; // Convertir en format 12 heures
        const ampm = hours >= 12 ? 'PM' : 'AM'; // Déterminer AM ou PM
        return `${formattedHours}:${minutes} ${ampm}`;
    };

    function getTimeFromDate(date) {
        const dateObj = new Date(date);
        const hours = dateObj.getHours();
        const minutes = dateObj.getMinutes();
        const ampm = hours >= 12 ? 'PM' : 'AM';
        const hours12 = hours % 12;
        const formattedHours = hours12 ? hours12 : 12; // handle 0 as 12
        return `${formattedHours}:${minutes.toString().padStart(2, '0')} ${ampm}`;
    }

    const getTimeUntilEvent = (eventStart) => {
        const now = new Date();
        const timeDiff = new Date(eventStart) - now;

        if (timeDiff > 0 && eventStatus !== 'Canceled') {
            const minutes = Math.ceil(timeDiff / 60000);
            return `Begin in ${minutes} min`;
        } else if(timeDiff > 0 && eventStatus === 'Canceled') { 
            return 'Canceled';
        } else if(timeDiff < 0 && eventStatus === 'Canceled') { 
            return 'Canceled';
        }
        return 'Passed';
    };

    const timeUntilEvent = getTimeUntilEvent(event.start);
    let statusColor = 'text-green-800'; // Couleur par défaut pour "Passed"
    let backgroundColor = 'bg-green-200'; // Couleur de fond par défaut
    let icon = <Timer className='w-4 h-4 text-green-800 mx-1.5' />;
    let statusText = timeUntilEvent;
    const eventStart = new Date(event.start);
    const eventEnd = new Date(event.end);
    const now = new Date(); 

    if (now >= eventStart && now <= eventEnd && eventStatus !=='Canceled') {
        // Si l'événement est en cours
        statusColor = 'text-blue-900'; // Bleu pour l'événement en cours
        backgroundColor = 'bg-blue-100'; // Fond bleu clair
        icon = <AntennaSignal className={`w-4 h-4 ${statusColor} mx-0.5`} />;
        statusText = 'Event is ongoing'; // Texte pour l'événement en cours
    } else if (timeUntilEvent === 'Passed') {
        statusColor = 'text-gray-500'; // Gris pour passé
        backgroundColor = 'bg-zinc-100';
        icon = <CheckCircleIcon className={`w-4 h-4 ${statusColor} mx-0.5`} />;
        statusText = 'Passed';
    } else if (new Date(event.start) - new Date() <= 15 * 60000 && eventStatus !=='Canceled') { // Proche si moins de 30 minutes
        statusColor = 'text-green-800'; // Vert pour proche
        icon = <Timer className={`w-4 h-4 ${statusColor} mx-0.5`} />;
        statusText = 'Event is coming soon'; // Texte pour l'événement proche
    } else if (timeUntilEvent === 'Canceled') { // Si l'événement est annulé
        statusColor = 'text-red-900'; // Rouge pour annulé
        backgroundColor = 'bg-red-100';
        icon = <XCircleIcon className={`w-4 h-4 ${statusColor} mx-0.5`} />;
        statusText = 'Cancelled'; // Texte pour annulé
    }

    return (
        <div className={`w-72 max-w-72 h-auto shadow ring-1 ring-gray-950/5 p-3 mr-4 rounded-lg bg-white`}>
            <h3 className='text-zinc-800 text-md font-semibold my-0.5'>{event.title}</h3>
            <div className="flex w-full items-center my-2">
                <Clock strokeWidth={2} className='w-3.5 h-3.5 mr-2 text-gray-500' />
                <p className="text-xs text-zinc-800 font-medium">
                    {event.startTime && event.endTime ?
                        formatTimeString(event.startTime) + ' - ' + formatTimeString(event.endTime) :
                        getTimeFromDate(event.start) + ' - ' + getTimeFromDate(event.end)}
                </p>
            </div>
            {event.teams && (
                <div className="flex w-full items-center my-2">
                    <Group strokeWidth={2} className='w-3.5 h-3.5 mr-2 text-gray-500' />
                    {event.teams.map(team => (
                        <Link to='/team/business' className={`px-2.5 py-0.5 rounded-lg ${statusColor} mr-0.5 ${backgroundColor} text-[10px] font-bold`} key={team.id}>{team.name}</Link>
                    ))}
                </div>
            )}
            {event.location && (
                <div className="flex w-full items-center mt-2.5">
                    <MapPinIcon strokeWidth={2} className='w-3.5 h-3.5 mr-2 text-gray-500' />
                    <p className={`text-xs ${statusColor} font-medium`}>{event.location}</p>
                </div>
            )}
            <div className={`w-full px-1.5 py-[3px] flex items-center justify-between mt-3.5 rounded ${backgroundColor}`}>
                <div className="flex items-center">
                    {icon}
                    <p className={`text-[12px] font-semibold ml-0.5 ${statusColor}`}>{statusText}</p>
                </div>
                {event.link && (
                    <Link to={event.link} className={`${statusColor} truncate  text-[12px] font-semibold underline mr-3`}>Link</Link>
                )}
            </div>
        </div>
    );
}

export default Cards;
