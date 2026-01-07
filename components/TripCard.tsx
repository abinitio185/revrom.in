
import React from 'react';
import type { Trip } from '../types';

interface TripCardProps {
  trip: Trip;
  onSelectTrip: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
}

const TripCard: React.FC<TripCardProps> = ({ trip, onSelectTrip, onBookNow }) => {
    const difficultyColors = {
        Intermediate: 'bg-emerald-500 text-white shadow-emerald-500/20',
        Advanced: 'bg-orange-500 text-white shadow-orange-500/20',
        Expert: 'bg-red-500 text-white shadow-red-500/20',
    };

  return (
    <div 
      className="group relative bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-2xl rounded-tr-[3rem] md:rounded-tr-[4rem] overflow-hidden transition-all duration-500 hover:shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] dark:hover:shadow-[0_20px_60px_-15px_rgba(242,92,5,0.05)] hover:-translate-y-1 cursor-pointer flex flex-col"
      onClick={() => onSelectTrip(trip)}
    >
      <div className="relative h-56 md:h-72 overflow-hidden">
        <img 
          src={trip.imageUrl} 
          alt={trip.title} 
          className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent"></div>
        
        <div className="absolute top-4 left-4">
            <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-3 md:px-4 py-1.5 rounded-full shadow-lg backdrop-blur-md bg-opacity-90 ${difficultyColors[trip.difficulty]}`}>
                {trip.difficulty}
            </span>
        </div>

        <div className="absolute top-0 right-0 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
            <div className="bg-brand-primary text-white font-black px-3 py-5 md:px-5 md:py-7 rounded-bl-[1.5rem] md:rounded-bl-[2rem] shadow-xl flex flex-col items-center">
                <span className="text-[8px] md:text-[9px] uppercase opacity-70 leading-none tracking-widest">FROM</span>
                <span className="text-lg md:text-2xl leading-none mt-1">₹{Math.floor(trip.price/1000)}K</span>
            </div>
        </div>

        <div className="absolute bottom-4 left-4 right-4 md:bottom-6 md:left-6 md:right-6 text-white">
            <div className="flex items-center gap-2 mb-1.5 md:mb-2">
                <span className="h-[2px] w-4 md:w-6 bg-brand-primary"></span>
                <span className="text-[8px] md:text-[9px] font-black uppercase tracking-[0.3em] text-brand-primary">{trip.duration} DAYS JOURNEY</span>
            </div>
            <h3 className="text-xl md:text-3xl font-black font-display leading-tight uppercase tracking-tighter">{trip.title}</h3>
        </div>
      </div>

      <div className="p-5 md:p-8 flex flex-col flex-grow">
        <p className="text-[9px] md:text-[10px] font-black text-brand-primary uppercase tracking-[0.2em] mb-2 md:mb-3">{trip.destination}</p>
        <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mb-5 md:mb-6 font-medium leading-relaxed italic">
          "{trip.shortDescription}"
        </p>

        <div className="mt-auto pt-5 md:pt-6 border-t border-border dark:border-dark-border flex flex-col sm:flex-row items-center justify-between gap-3 md:gap-4">
            <button 
                onClick={(e) => { e.stopPropagation(); onSelectTrip(trip); }}
                className="w-full sm:w-auto text-[9px] md:text-[10px] font-black uppercase tracking-widest text-foreground dark:text-dark-foreground hover:text-brand-primary transition-colors flex items-center justify-center gap-1.5"
            >
                View Itinerary
                <svg className="w-4 h-4 text-brand-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </button>
            <button 
                onClick={(e) => { e.stopPropagation(); onBookNow(trip); }}
                className="w-full sm:w-auto bg-foreground text-white dark:bg-white dark:text-black text-[9px] md:text-[10px] font-black uppercase tracking-widest px-5 md:px-6 py-2.5 rounded-xl hover:bg-brand-primary dark:hover:bg-brand-primary dark:hover:text-white transition-all transform active:scale-95 shadow-lg"
            >
                Book Your Trip
            </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
