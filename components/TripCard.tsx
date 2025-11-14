import React from 'react';
import type { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onSelectTrip: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
}

const RoadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path d="M10 2a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5A.75.75 0 0 1 10 2zM10 15.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75zM4.09 4.09a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 0 1-1.06 1.06L4.09 5.15a.75.75 0 0 1 0-1.06zm9.76 9.76a.75.75 0 0 1 1.06 0l1.06 1.06a.75.75 0 1 1-1.06 1.06l-1.06-1.06a.75.75 0 0 1 0-1.06zM15.91 4.09a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 0 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0zm-9.76 9.76a.75.75 0 0 1 0 1.06l-1.06 1.06a.75.75 0 1 1-1.06-1.06l1.06-1.06a.75.75 0 0 1 1.06 0zM2 10a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5A.75.75 0 0 1 2 10zm14.5 0a.75.75 0 0 1 .75-.75h1.5a.75.75 0 0 1 0 1.5h-1.5a.75.75 0 0 1-.75-.75z"/>
    </svg>
);

const CalendarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.75 3a.75.75 0 0 1 .75.75V4h7V3.75a.75.75 0 0 1 1.5 0V4h.25A2.75 2.75 0 0 1 18 6.75v8.5A2.75 2.75 0 0 1 15.25 18H4.75A2.75 2.75 0 0 1 2 15.25v-8.5A2.75 2.75 0 0 1 4.75 4H5V3.75A.75.75 0 0 1 5.75 3zM4.5 8.25a.75.75 0 0 0 0 1.5h11a.75.75 0 0 0 0-1.5h-11z" clipRule="evenodd" />
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
        <img src={trip.imageUrl} alt={trip.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
        <div className={`absolute top-0 left-0 text-xs font-bold px-3 py-1 m-4 rounded-full ${difficultyColors[trip.difficulty]}`}>{trip.difficulty}</div>
        
        {/* Price with Tooltip */}
        <div className="absolute top-0 right-0 m-4">
          <div className="relative group/tooltip">
            <div className="bg-slate-800 text-white font-bold px-3 py-1 rounded-md text-sm">₹{trip.price.toLocaleString('en-IN')}</div>
            <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-max px-3 py-1.5 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
              Starting from ₹{trip.price.toLocaleString('en-IN')}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-b-4 border-b-slate-900"></div>
            </div>
          </div>
        </div>

        {/* Duration with Tooltip */}
        <div className="absolute bottom-0 left-0 m-4">
            <div className="relative group/tooltip">
                <div className="bg-slate-800/80 backdrop-blur-sm text-white font-semibold text-sm px-3 py-1 rounded-md flex items-center gap-1.5">
                    <CalendarIcon className="w-4 h-4" />
                    <span>{trip.duration} Days</span>
                </div>
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max px-3 py-1.5 bg-slate-900 text-white text-xs rounded-md opacity-0 group-hover/tooltip:opacity-100 transition-opacity pointer-events-none z-10">
                    Duration: {trip.duration} Days
                    <div className="absolute top-full left-1/2 -translate-x-1/2 w-0 h-0 border-x-4 border-x-transparent border-t-4 border-t-slate-900"></div>
                </div>
            </div>
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