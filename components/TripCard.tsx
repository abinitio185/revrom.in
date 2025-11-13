import React from 'react';
import type { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onSelectTrip: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
}

const RoadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM4 10a.75.75 0 0 1 .75-.75h10.5a.75.75 0 0 1 0 1.5H4.75A.75.75 0 0 1 4 10z" clipRule="evenodd" />
    </svg>
);

const CalendarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 0 0-1 1v1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1V3a1 1 0 1 0-2 0v1H7V3a1 1 0 0 0-1-1zm0 5a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H6z" clipRule="evenodd" />
    </svg>
);

const ArrowRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 11H3a1 1 0 1 1 0-2h11.586l-4.293-4.293a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
    </svg>
);

const TripCard: React.FC<TripCardProps> = ({ trip, onSelectTrip, onBookNow }) => {
    const difficultyColors = {
        Intermediate: 'bg-yellow-100 text-yellow-800',
        Advanced: 'bg-orange-100 text-orange-800',
        Expert: 'bg-red-100 text-red-800',
    };

  return (
    <div 
      className="bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 cursor-pointer group flex flex-col hover:-translate-y-2 hover:shadow-2xl"
      onClick={() => onSelectTrip(trip)}
    >
      <div className="relative overflow-hidden">
        <img src={trip.imageUrl} alt={trip.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" />
        <div className={`absolute top-0 left-0 text-xs font-bold px-3 py-1 m-4 rounded-full ${difficultyColors[trip.difficulty]}`}>{trip.difficulty}</div>
        <div className="absolute top-0 right-0 bg-slate-800 text-white font-bold px-3 py-1 m-4 rounded-md text-sm">${trip.price}</div>
        <div className="absolute bottom-0 left-0 bg-slate-800/80 backdrop-blur-sm text-white font-semibold text-sm px-3 py-1 m-4 rounded-md flex items-center gap-1.5">
            <CalendarIcon className="w-4 h-4" />
            <span>{trip.duration} Days</span>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
            <h3 className="text-xl font-bold font-display mb-1 text-slate-800 group-hover:text-orange-600 transition-colors">{trip.title}</h3>
            <div className="flex items-start text-sm text-slate-500 mb-3">
              <RoadIcon className="w-4 h-4 mr-1.5 text-orange-400 shrink-0 mt-0.5" />
              <span className="leading-tight">{trip.route}</span>
            </div>
            <p className="text-slate-600 text-sm mb-4">{trip.shortDescription}</p>
        </div>
        <button 
            onClick={(e) => {
                e.stopPropagation();
                onBookNow(trip);
            }}
            className="mt-auto flex items-center justify-center space-x-2 w-full bg-orange-500 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:bg-orange-600 transform hover:scale-105"
        >
            <span>Book Now</span>
            <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TripCard;