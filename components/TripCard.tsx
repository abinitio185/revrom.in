import React from 'react';
import type { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onSelectTrip: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
}

const RoadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.59 14.37a6 6 0 01-5.84 7.38v-4.82m5.84-2.56a16.5 16.5 0 00-1.232-1.232l-2.433 2.433m-2.911-2.911l2.433 2.433m0 0l2.433-2.433m-2.433 2.433l-2.433-2.433" />
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
        Intermediate: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/50 dark:text-yellow-300 dark:ring-yellow-400/20',
        Advanced: 'bg-orange-100 text-orange-800 ring-orange-600/20 dark:bg-orange-900/50 dark:text-orange-300 dark:ring-orange-400/20',
        Expert: 'bg-red-100 text-red-800 ring-red-600/20 dark:bg-red-900/50 dark:text-red-300 dark:ring-red-400/20',
    };

  return (
    <div 
      className="bg-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 cursor-pointer group flex flex-col hover:-translate-y-2 hover:shadow-2xl hover:shadow-brand-primary/10 border border-border dark:border-dark-border"
      onClick={() => onSelectTrip(trip)}
    >
      <div className="relative overflow-hidden">
        <img src={trip.imageUrl} alt={trip.title} className="w-full h-56 object-cover transition-transform duration-300 group-hover:scale-110" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>

        <div className={`absolute top-0 left-0 text-xs font-bold px-3 py-1 m-4 rounded-full ring-1 ring-inset ${difficultyColors[trip.difficulty]}`}>{trip.difficulty}</div>
        
        <div className="absolute top-0 right-0 m-4">
            <div className="bg-black/70 backdrop-blur-sm text-white font-bold px-3 py-1 rounded-md text-sm">₹{trip.price.toLocaleString('en-IN')}</div>
        </div>

        <div className="absolute bottom-0 left-0 m-4">
            <div className="bg-black/70 backdrop-blur-sm text-white font-semibold text-sm px-3 py-1 rounded-md flex items-center gap-1.5">
                <CalendarIcon className="w-4 h-4" />
                <span>{trip.duration} Days</span>
            </div>
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <div className="flex-grow">
            <h3 className="text-xl font-bold font-display mb-1 text-foreground dark:text-dark-foreground group-hover:text-brand-primary transition-colors">{trip.title}</h3>
            <div className="flex items-start text-sm text-muted-foreground dark:text-dark-muted-foreground mb-3">
              <RoadIcon className="w-4 h-4 mr-1.5 text-brand-accent-gold shrink-0 mt-0.5" />
              <span className="leading-tight">{trip.route}</span>
            </div>
            <p className="text-muted-foreground dark:text-dark-muted-foreground text-sm mb-4">{trip.shortDescription}</p>
        </div>
        <button 
            onClick={(e) => {
                e.stopPropagation();
                onBookNow(trip);
            }}
            className="mt-auto flex items-center justify-center space-x-2 w-full bg-brand-primary text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:bg-brand-primary-dark transform hover:scale-105"
        >
            <span>Book Now</span>
            <ArrowRightIcon className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default TripCard;
