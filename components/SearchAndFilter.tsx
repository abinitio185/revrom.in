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
    const inputClass = "w-full p-3 border border-border dark:border-dark-border rounded-md focus:ring-brand-primary focus:border-brand-primary bg-card dark:bg-dark-card text-foreground dark:text-dark-foreground";
    return (
        <div className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-lg space-y-4 md:space-y-0 border border-border dark:border-dark-border">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 items-center">
                {/* Search Bar */}
                <div className="relative md:col-span-2 lg:col-span-2">
                    <label htmlFor="search" className="sr-only">Search tours</label>
                    <input
                        type="text"
                        id="search"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by name, destination..."
                        className="w-full pl-10 pr-4 py-3 border border-border dark:border-dark-border rounded-md focus:ring-brand-primary focus:border-brand-primary bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground"
                    />
                    <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>

                {/* Destination Filter */}
                <div>
                    <label htmlFor="destination" className="sr-only">Destination</label>
                    <select
                        id="destination"
                        value={destinationFilter}
                        onChange={(e) => setDestinationFilter(e.target.value)}
                        className={inputClass}
                    >
                        <option value="all">All Destinations</option>
                        {destinations.map(dest => (
                            <option key={dest} value={dest}>{dest}</option>
                        ))}
                    </select>
                </div>

                {/* Duration Filter */}
                <div>
                    <label htmlFor="duration" className="sr-only">Duration</label>
                    <select
                        id="duration"
                        value={durationFilter}
                        onChange={(e) => setDurationFilter(e.target.value)}
                        className={inputClass}
                    >
                        <option value="all">All Durations</option>
                        <option value="1-7">Up to 7 Days</option>
                        <option value="8-14">8 - 14 Days</option>
                        <option value="15-999">15+ Days</option>
                    </select>
                </div>

                {/* Difficulty Filter */}
                <div>
                    <label htmlFor="difficulty" className="sr-only">Difficulty</label>
                    <select
                        id="difficulty"
                        value={difficultyFilter}
                        onChange={(e) => setDifficultyFilter(e.target.value)}
                        className={inputClass}
                    >
                        <option value="all">All Difficulties</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Advanced">Advanced</option>
                        <option value="Expert">Expert</option>
                    </select>
                </div>
            </div>
             <div className="flex justify-end pt-2">
                <button
                    onClick={onClearFilters}
                    className="text-sm font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                >
                    Clear Filters
                </button>
            </div>
        </div>
    );
};

export default SearchAndFilter;
