
import React from 'react';

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  destinationFilter: string;
  setDestinationFilter: (value: string) => void;
  durationFilter: string;
  setDurationFilter: (value: string) => void;
  difficultyFilter: string;
  setDifficultyFilter: (value: string) => void;
  destinations: string[];
  onClearFilters: () => void;
}

const SearchIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M9 3.5a5.5 5.5 0 100 11 5.5 5.5 0 000-11zM2 9a7 7 0 1112.452 4.391l3.328 3.329a.75.75 0 11-1.06 1.06l-3.329-3.328A7 7 0 012 9z" clipRule="evenodd" />
    </svg>
);

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
    searchTerm,
    setSearchTerm,
    destinationFilter,
    setDestinationFilter,
    durationFilter,
    setDurationFilter,
    difficultyFilter,
    setDifficultyFilter,
    destinations,
    onClearFilters,
}) => {
    const inputClass = "w-full pl-3 pr-8 py-3 border border-border dark:border-dark-border rounded-xl focus:ring-2 focus:ring-brand-primary focus:border-brand-primary bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground font-bold text-xs uppercase tracking-wider appearance-none transition-all outline-none";
    const labelClass = "block text-[10px] font-black uppercase tracking-[0.2em] text-muted-foreground dark:text-dark-muted-foreground mb-1.5 ml-1";

    return (
        <div className="glass dark:bg-dark-card/80 p-6 md:p-8 rounded-[2.5rem] shadow-2xl border border-border dark:border-dark-border max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 items-end">
                
                {/* Search Bar - Larger on desktop */}
                <div className="lg:col-span-4">
                    <label htmlFor="search" className={labelClass}>Search Term</label>
                    <div className="relative">
                        <input
                            type="text"
                            id="search"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="NAME OR TERRAIN..."
                            className={`${inputClass} pl-10`}
                        />
                        <SearchIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-primary" />
                    </div>
                </div>

                {/* Destination Filter */}
                <div className="lg:col-span-2">
                    <label htmlFor="destination" className={labelClass}>Territory</label>
                    <div className="relative">
                        <select
                            id="destination"
                            value={destinationFilter}
                            onChange={(e) => setDestinationFilter(e.target.value)}
                            className={inputClass}
                        >
                            <option value="all">ALL REGIONS</option>
                            {destinations.map(dest => (
                                <option key={dest} value={dest}>{dest.toUpperCase()}</option>
                            ))}
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-primary">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                        </div>
                    </div>
                </div>

                {/* Duration Filter */}
                <div className="lg:col-span-2">
                    <label htmlFor="duration" className={labelClass}>Duration</label>
                    <div className="relative">
                        <select
                            id="duration"
                            value={durationFilter}
                            onChange={(e) => setDurationFilter(e.target.value)}
                            className={inputClass}
                        >
                            <option value="all">ANY DAYS</option>
                            <option value="1-7">1-7 DAYS</option>
                            <option value="8-14">8-14 DAYS</option>
                            <option value="15-999">15+ DAYS</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-primary">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                        </div>
                    </div>
                </div>

                {/* Difficulty Filter */}
                <div className="lg:col-span-2">
                    <label htmlFor="difficulty" className={labelClass}>Difficulty</label>
                    <div className="relative">
                        <select
                            id="difficulty"
                            value={difficultyFilter}
                            onChange={(e) => setDifficultyFilter(e.target.value)}
                            className={inputClass}
                        >
                            <option value="all">ALL SKILLS</option>
                            <option value="Intermediate">INTERMEDIATE</option>
                            <option value="Advanced">ADVANCED</option>
                            <option value="Expert">EXPERT</option>
                        </select>
                        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-brand-primary">
                            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                        </div>
                    </div>
                </div>

                {/* Reset / Action Button */}
                <div className="lg:col-span-2 flex items-end h-full">
                    <button
                        onClick={onClearFilters}
                        className="w-full bg-foreground dark:bg-white dark:text-black text-white px-4 py-3 rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-brand-primary dark:hover:bg-brand-primary dark:hover:text-white transition-all shadow-lg active:scale-95"
                    >
                        Reset Filters
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SearchAndFilter;
