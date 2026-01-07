
import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Trip, Departure, BlogPost, GalleryPhoto, InstagramPost, GoogleReview, SiteContent } from '../types';
import TripCard from '../components/TripCard';
import BlogPostCard from '../components/BlogPostCard';
import SearchAndFilter from '../components/SearchAndFilter';
import SEOHead from '../components/SEOHead';

interface HomePageProps {
  trips: Trip[];
  departures: Departure[];
  onSelectTrip: (trip: Trip) => void;
  onBookNow: (trip: Trip) => void;
  blogPosts: BlogPost[];
  galleryPhotos: GalleryPhoto[];
  instagramPosts: InstagramPost[];
  googleReviews: GoogleReview[];
  siteContent: SiteContent;
  onSelectBlogPost: (post: BlogPost) => void;
  onNavigateGallery: () => void;
  onNavigateCustomize: () => void;
  initialDestinationFilter: string | null;
  onClearInitialFilter: () => void;
}

// --- ICONS ---
const ReelIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M8.25 4.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 1 .75-.75ZM15.75 4.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-1.5 0V5.25a.75.75 0 0 1 .75-.75ZM4.5 8.25a.75.75 0 0 0 0 1.5h15a.75.75 0 0 0 0-1.5H4.5Z" />
        <path fillRule="evenodd" d="M3 3a1.5 1.5 0 0 0-1.5 1.5v15A1.5 1.5 0 0 0 3 21h18a1.5 1.5 0 0 0 1.5-1.5v-15A1.5 1.5 0 0 0 21 3H3Zm16.5 1.5H4.5v15h15V4.5Z" clipRule="evenodd" />
    </svg>
);

const ChevronLeftIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M15.707 5.293a1 1 0 010 1.414L11.414 12l4.293 4.293a1 1 0 01-1.414 1.414L8.586 12l5.707-5.707a1 1 0 011.414 0z" clipRule="evenodd" />
    </svg>
);

const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M8.293 18.707a1 1 0 010-1.414L12.586 12 8.293 7.707a1 1 0 011.414-1.414L15.414 12l-5.707 5.707a1 1 0 01-1.414 0z" clipRule="evenodd" />
    </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.135-.662 1.456 0l1.86 3.847 4.25.618c.73.107 1.022.992.494 1.505l-3.076 2.998.726 4.232c.124.725-.638 1.282-1.28.948L10 15.347l-3.818 2.007c-.642.335-1.404-.223-1.28-.948l.726-4.232L2.55 8.854c-.528-.513-.236-1.398.494-1.505l4.25-.618 1.86-3.847z" clipRule="evenodd" />
    </svg>
);

const MountainIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 15.75L12 8.25l8.25 7.5" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M3 20.25h18" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 15L12 18.75l3.75-3.75" />
    </svg>
);

const UsersIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" >
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-4.663M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
    </svg>
);

const CogIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12a7.5 7.5 0 0015 0m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5m-15 0a7.5 7.5 0 1115 0m-15 0H3m18 0h-1.5M12 4.5v.01M12 19.5v.01" />
    </svg>
);

const ShieldCheckIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.286zm0 13.036h.008v.008h-.008v-.008z" />
    </svg>
);

const StarRating: React.FC<{ rating: number }> = ({ rating }) => (
    <div className="flex items-center justify-center">
        {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon key={star} className={`h-5 w-5 ${rating >= star ? 'text-yellow-400' : 'text-slate-400 dark:text-slate-600'}`} />
        ))}
    </div>
);

const DepartureStatusBadge: React.FC<{ status: Departure['status'] }> = ({ status }) => {
  const baseClasses = "inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ring-1 ring-inset";
  const statusConfig = {
    Available: {
        classes: "bg-green-50 text-green-700 ring-green-600/20 dark:bg-green-900/30 dark:text-green-400 dark:ring-green-500/30",
        icon: (<svg className="h-1.5 w-1.5 fill-green-500" viewBox="0 0 6 6" aria-hidden="true"><circle cx={3} cy={3} r={3} /></svg>)
    },
    'Sold Out': {
        classes: "bg-red-50 text-red-700 ring-red-600/20 dark:bg-red-900/30 dark:text-red-400 dark:ring-red-500/30",
         icon: (<svg className="h-1.5 w-1.5 fill-red-500" viewBox="0 0 6 6" aria-hidden="true"><circle cx={3} cy={3} r={3} /></svg>)
    },
    Limited: {
        classes: "bg-yellow-50 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/30 dark:text-yellow-500 dark:ring-yellow-500/30",
         icon: (<svg className="h-1.5 w-1.5 fill-yellow-500" viewBox="0 0 6 6" aria-hidden="true"><circle cx={3} cy={3} r={3} /></svg>)
    },
  };
  
  const config = statusConfig[status];
  return <span className={`${baseClasses} ${config.classes}`}>{config.icon}{status}</span>;
};

const FeatureCard: React.FC<{ icon: React.ReactNode, title: string, children: React.ReactNode }> = ({ icon, title, children }) => (
  <div className="text-center p-2">
      <div className="flex items-center justify-center h-16 w-16 rounded-full bg-card dark:bg-dark-card mx-auto mb-4 border border-border dark:border-dark-border">
          {icon}
      </div>
      <h3 className="text-xl font-bold font-display mb-2 text-foreground dark:text-dark-foreground">{title}</h3>
      <p className="text-muted-foreground dark:text-dark-muted-foreground leading-relaxed">{children}</p>
  </div>
);


const HomePage: React.FC<HomePageProps> = (props) => {
  const { trips, departures, onSelectTrip, onBookNow, blogPosts, galleryPhotos, instagramPosts, googleReviews, siteContent, onSelectBlogPost, onNavigateGallery, onNavigateCustomize, initialDestinationFilter, onClearInitialFilter } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [currentReview, setCurrentReview] = useState(0);
  
  const [departureDestinationFilter, setDepartureDestinationFilter] = useState('all');
  const [departureMonthFilter, setDepartureMonthFilter] = useState('all');

  const featuredReviews = useMemo(() => googleReviews.filter(r => r.isFeatured), [googleReviews]);

  const nextReview = () => setCurrentReview(prev => (prev + 1) % featuredReviews.length);
  const prevReview = () => setCurrentReview(prev => (prev - 1 + featuredReviews.length) % featuredReviews.length);
  
  const uniqueDestinations = useMemo(() => [...new Set(trips.map(trip => trip.destination))], [trips]);

  useEffect(() => {
    if (initialDestinationFilter) {
      setDestinationFilter(initialDestinationFilter);
      const toursSection = document.getElementById('tours-section');
      if (toursSection) {
        setTimeout(() => toursSection.scrollIntoView({ behavior: 'smooth' }), 100);
      }
      onClearInitialFilter();
    }
  }, [initialDestinationFilter, onClearInitialFilter]);

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch =
        searchLower === '' ||
        trip.title.toLowerCase().includes(searchLower) ||
        trip.destination.toLowerCase().includes(searchLower) ||
        trip.route.toLowerCase().includes(searchLower) ||
        trip.shortDescription.toLowerCase().includes(searchLower);

      const matchesDestination = destinationFilter === 'all' || trip.destination === destinationFilter;

      let matchesDuration = true;
      if (durationFilter !== 'all') {
        const [min, max] = durationFilter.split('-').map(Number);
        matchesDuration = trip.duration >= min && trip.duration <= max;
      }
      
      const matchesDifficulty = difficultyFilter === 'all' || trip.difficulty === difficultyFilter;

      return matchesSearch && matchesDestination && matchesDuration && matchesDifficulty;
    });
  }, [trips, searchTerm, destinationFilter, durationFilter, difficultyFilter]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setDestinationFilter('all');
    setDurationFilter('all');
    setDifficultyFilter('all');
  };

  const latestPosts = blogPosts.slice(0, 3);
  const galleryPreview = galleryPhotos.slice(0, 6);
  
  const instaScrollContainerRef = useRef<HTMLDivElement>(null);

  const handleInstaScroll = (direction: 'left' | 'right') => {
      if (instaScrollContainerRef.current) {
          const scrollAmount = instaScrollContainerRef.current.clientWidth * 0.8;
          instaScrollContainerRef.current.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: 'smooth' });
      }
  };

  const departuresWithTripInfo = useMemo(() => {
    const tripMap = new Map(trips.map(trip => [trip.id, trip]));
    return departures
        .map(departure => ({
            ...departure,
            trip: tripMap.get(departure.tripId)
        }))
        .filter((d): d is Departure & { trip: Trip } => !!d.trip);
  }, [departures, trips]);

  const uniqueDepartureMonths = useMemo(() => {
    const monthSet = new Set<string>();
    [...departures]
        .sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime())
        .forEach(dep => {
            const date = new Date(dep.startDate);
            const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
            monthSet.add(monthYear);
        });
    return Array.from(monthSet);
  }, [departures]);

  const filteredDepartures = useMemo(() => {
    return departuresWithTripInfo.filter(({ trip, ...departure }) => {
        const matchesDestination = departureDestinationFilter === 'all' || trip.destination === departureDestinationFilter;

        const date = new Date(departure.startDate);
        const monthYear = date.toLocaleString('en-US', { month: 'long', year: 'numeric' });
        const matchesMonth = departureMonthFilter === 'all' || monthYear === departureMonthFilter;

        return matchesDestination && matchesMonth;
    });
  }, [departuresWithTripInfo, departureDestinationFilter, departureMonthFilter]);
  
  const handleClearDepartureFilters = () => {
      setDepartureDestinationFilter('all');
      setDepartureMonthFilter('all');
  };


  // --- SUB-COMPONENTS RENDERERS ---

  const renderHero = () => (
      <section key="HERO" className="relative h-[70vh] md:h-[90vh] overflow-hidden flex items-center justify-center text-white">
        {/* Video Background */}
        <video 
            autoPlay 
            loop 
            muted 
            playsInline 
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            poster="https://picsum.photos/seed/ladakh-hero/1920/1080"
        >
            <source src="https://assets.mixkit.co/videos/preview/mixkit-motorcyclist-riding-through-a-mountain-road-4262-large.mp4" type="video/mp4" />
            Your browser does not support the video tag.
        </video>
        
        {/* Overlays for readability */}
        <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div> {/* Base dimming */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div> {/* Gradient for depth */}

        {/* Content */}
        <div className="relative text-center z-10 px-4 max-w-5xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-tight mb-6 drop-shadow-2xl tracking-tight">
            {siteContent.heroTitle}
          </h1>
          <p className="text-lg md:text-2xl max-w-3xl mx-auto mb-10 drop-shadow-lg font-medium text-gray-100 leading-relaxed">
            {siteContent.heroSubtitle}
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
             <button 
                onClick={() => document.getElementById('tours-section')?.scrollIntoView({ behavior: 'smooth' })} 
                className="group relative bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-4 px-10 rounded-full transition-all duration-300 transform hover:scale-105 shadow-[0_0_20px_rgba(221,107,32,0.5)] hover:shadow-[0_0_30px_rgba(221,107,32,0.7)] border border-white/10 overflow-hidden"
             >
                <span className="relative z-10 flex items-center gap-2">
                    Explore Tours
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 transition-transform group-hover:translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                </span>
                <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out"></div>
             </button>
          </div>
        </div>
      </section>
  );

  const renderAdventures = () => (
      <section key="ADVENTURES" id="tours-section" className="py-16 md:py-24 bg-background dark:bg-dark-background">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground dark:text-dark-foreground">{siteContent.adventuresTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground dark:text-dark-muted-foreground max-w-2xl mx-auto">{siteContent.adventuresSubtitle}</p>
          </div>
          <SearchAndFilter {...{ searchTerm, setSearchTerm, destinationFilter, setDestinationFilter, durationFilter, setDurationFilter, difficultyFilter, setDifficultyFilter, destinations: uniqueDestinations, onClearFilters: handleClearFilters }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredTrips.length > 0 ? (
                filteredTrips.map(trip => <TripCard key={trip.id} trip={trip} onSelectTrip={onSelectTrip} onBookNow={onBookNow} />)
            ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
                    <h3 className="text-2xl font-semibold text-foreground dark:text-dark-foreground">No Adventures Found</h3>
                    <p className="text-muted-foreground dark:text-dark-muted-foreground mt-2">Try adjusting your search or filters. The perfect ride is waiting!</p>
                    <button onClick={handleClearFilters} className="mt-6 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105">
                        Clear All Filters
                    </button>
                </div>
            )}
          </div>
        </div>
      </section>
  );

  const renderDepartures = () => (
      <section key="DEPARTURES" className="py-16 md:py-24 bg-card dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6">
           <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12 text-foreground dark:text-dark-foreground">{siteContent.departuresTitle}</h2>
           
           <div className="max-w-4xl mx-auto mb-8 p-4 bg-background dark:bg-dark-background/50 rounded-lg shadow">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div className="sm:col-span-1">
                        <label htmlFor="departureDestination" className="sr-only">Filter by Destination</label>
                        <select
                            id="departureDestination"
                            value={departureDestinationFilter}
                            onChange={(e) => setDepartureDestinationFilter(e.target.value)}
                            className="w-full p-3 border border-border dark:border-dark-border rounded-md focus:ring-brand-primary focus:border-brand-primary bg-card dark:bg-dark-card text-foreground dark:text-dark-foreground"
                        >
                            <option value="all">All Destinations</option>
                            {uniqueDestinations.map(dest => (
                                <option key={dest} value={dest}>{dest}</option>
                            ))}
                        </select>
                    </div>
                    <div className="sm:col-span-1">
                        <label htmlFor="departureMonth" className="sr-only">Filter by Month</label>
                        <select
                            id="departureMonth"
                            value={departureMonthFilter}
                            onChange={(e) => setDepartureMonthFilter(e.target.value)}
                            className="w-full p-3 border border-border dark:border-dark-border rounded-md focus:ring-brand-primary focus:border-brand-primary bg-card dark:bg-dark-card text-foreground dark:text-dark-foreground"
                        >
                            <option value="all">All Months</option>
                            {uniqueDepartureMonths.map(month => (
                                <option key={month} value={month}>{month}</option>
                            ))}
                        </select>
                    </div>
                    <div className="sm:col-span-1 text-right">
                        <button
                            onClick={handleClearDepartureFilters}
                            className="text-sm font-semibold text-brand-primary hover:text-brand-primary-dark transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

           <div className="max-w-4xl mx-auto bg-card dark:bg-dark-card rounded-lg shadow-xl overflow-hidden border border-border dark:border-dark-border">
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left text-foreground dark:text-dark-foreground">
                  <thead className="text-xs text-muted-foreground dark:text-dark-muted-foreground uppercase bg-background dark:bg-dark-background/50">
                    <tr>
                      <th scope="col" className="px-6 py-3">Tour Name</th>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3 text-center">Slots</th>
                      <th scope="col" className="px-6 py-3 text-center">Status</th>
                      <th scope="col" className="px-6 py-3"><span className="sr-only">Inquire</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDepartures.length > 0 ? (
                      filteredDepartures.map(({ trip, ...departure }) => (
                          <tr key={departure.id} className="border-b border-border dark:border-dark-border hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                            <th scope="row" className="px-6 py-4 font-medium text-foreground dark:text-dark-foreground whitespace-nowrap">
                              <a href="#" onClick={(e) => { e.preventDefault(); onSelectTrip(trip); }} className="hover:text-brand-primary transition-colors">{trip.title}</a>
                            </th>
                            <td className="px-6 py-4 whitespace-nowrap">
                                {new Date(departure.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - {new Date(departure.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap">
                                 <span className={`font-mono font-bold ${
                                     departure.slots === 0 ? 'text-red-500 dark:text-red-400' :
                                     departure.slots <= 3 ? 'text-yellow-600 dark:text-yellow-400' :
                                     'text-green-600 dark:text-green-400'
                                 }`}>
                                    {departure.slots}
                                 </span>
                            </td>
                            <td className="px-6 py-4 text-center whitespace-nowrap"><DepartureStatusBadge status={departure.status} /></td>
                            <td className="px-6 py-4 text-right whitespace-nowrap">
                              <button onClick={() => onBookNow(trip)} disabled={departure.status === 'Sold Out'} className="font-medium text-brand-primary hover:underline disabled:text-muted-foreground disabled:no-underline disabled:opacity-50 transition-all">Inquire</button>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr><td colSpan={5} className="p-6 text-center text-muted-foreground dark:text-dark-muted-foreground">No departures match your criteria. Try adjusting the filters.</td></tr>
                    )}
                  </tbody>
               </table>
             </div>
           </div>
        </div>
      </section>
  );

  const renderCustomize = () => (
      <section key="CUSTOMIZE" className="py-16 md:py-24 bg-background dark:bg-dark-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground dark:text-dark-foreground">{siteContent.customizeTitle}</h2>
            <p className="mt-4 text-lg text-muted-foreground dark:text-dark-muted-foreground max-w-3xl mx-auto">{siteContent.customizeSubtitle}</p>
            <button onClick={onNavigateCustomize} className="mt-8 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">
                Design Your Dream Trip
            </button>
        </div>
      </section>
  );

  const renderWhyChooseUs = () => (
      <section key="WHY_CHOOSE_US" className="py-16 md:py-24 bg-card dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display text-foreground dark:text-dark-foreground">Why Choose Us?</h2>
                <p className="mt-4 text-lg text-muted-foreground dark:text-dark-muted-foreground max-w-3xl mx-auto">Experience the Himalayas with true local experts who prioritize your adventure, authenticity, and safety.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard title="Born & Bred in the Himalayas" icon={<MountainIcon className="w-8 h-8 text-brand-primary" />}>
                    Our team are locals from Ladakh. We know the hidden trails, secret viewpoints, and stories behind every pass because this is our home.
                </FeatureCard>
                <FeatureCard title="Authentic Experiences" icon={<UsersIcon className="w-8 h-8 text-brand-primary" />}>
                    Forget generic itineraries. We take you to the heart of the Himalayas, sharing meals with local families and experiencing raw, unfiltered culture.
                </FeatureCard>
                <FeatureCard title="Meticulously Maintained Fleet" icon={<CogIcon className="w-8 h-8 text-brand-primary" />}>
                    Our Royal Enfield Himalayans are maintained in-house by expert mechanics who know the demands of high-altitude terrain, ensuring reliability.
                </FeatureCard>
                <FeatureCard title="Uncompromising Safety" icon={<ShieldCheckIcon className="w-8 h-8 text-brand-primary" />}>
                    With experienced captains, certified mechanics, and a support vehicle on every tour, your safety is paramount. You just focus on the ride.
                </FeatureCard>
            </div>
        </div>
      </section>
  );

  const renderRoots = () => (
      <section key="ROOTS" className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://picsum.photos/seed/ladakh-rezangla/1920/1080')" }}>
          <div className="absolute inset-0 bg-dark-background/70"></div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">{siteContent.rootsTitle}</h2>
                  <p className="text-lg text-slate-200 leading-relaxed">{siteContent.rootsBody}</p>
                  <button onClick={() => { const post = blogPosts.find(p => p.id === 'blog-4'); if (post) onSelectBlogPost(post); }} className="mt-8 bg-transparent border-2 border-brand-primary hover:bg-brand-primary text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {siteContent.rootsButton}
                  </button>
              </div>
          </div>
      </section>
  );

  const renderReviews = () => (
      <section key="REVIEWS" className="py-16 md:py-24 bg-card dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground dark:text-dark-foreground">What Our Riders Say</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground dark:text-dark-muted-foreground mb-12">Real stories from riders who have experienced the Himalayas with us.</p>
            {featuredReviews.length > 0 ? (
            <div className="relative max-w-3xl mx-auto">
                <div className="overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
                        {featuredReviews.map((review) => (
                            <div key={review.id} className="w-full flex-shrink-0 px-4 sm:px-8">
                                <img src={review.profilePhotoUrl} alt={review.authorName} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-brand-accent-gold/50 shadow-md" loading="lazy" />
                                <StarRating rating={review.rating} />
                                <p className="text-muted-foreground dark:text-dark-muted-foreground italic my-4 text-base sm:text-lg">"{review.text}"</p>
                                <p className="font-bold text-foreground dark:text-dark-foreground text-sm uppercase tracking-wider">{review.authorName}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={prevReview} aria-label="Previous review" className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-card dark:bg-dark-card p-2 rounded-full shadow-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-border dark:border-dark-border"><ChevronLeftIcon className="w-6 h-6 text-foreground dark:text-dark-foreground" /></button>
                <button onClick={nextReview} aria-label="Next review" className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-card dark:bg-dark-card p-2 rounded-full shadow-md hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors border border-border dark:border-dark-border"><ChevronRightIcon className="w-6 h-6 text-foreground dark:text-dark-foreground" /></button>
            </div>
             ) : (
                <p className="text-muted-foreground dark:text-dark-muted-foreground">No featured reviews yet. Check back soon!</p>
             )}
            <a href={siteContent.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="mt-12 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">Read more on Google</a>
        </div>
      </section>
  );

  const renderBlog = () => (
      <section key="BLOG" className="py-16 md:py-24 bg-background dark:bg-dark-background">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12 text-foreground dark:text-dark-foreground">{siteContent.blogTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map(post => <BlogPostCard key={post.id} post={post} onSelectPost={onSelectBlogPost} />)}
          </div>
        </div>
      </section>
  );

  const renderGallery = () => (
      <section key="GALLERY" className="py-16 md:py-24 bg-card dark:bg-dark-card">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground dark:text-dark-foreground">{siteContent.galleryTitle}</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground dark:text-dark-muted-foreground mb-12">{siteContent.gallerySubtitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {galleryPreview.map((photo) => (
                    <div key={photo.id} className="aspect-w-1 aspect-h-1">
                        <img src={photo.imageUrl} alt={photo.caption} className="w-full h-full object-cover rounded-md shadow-md transform hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                ))}
            </div>
            <button onClick={onNavigateGallery} className="mt-12 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">View Full Gallery</button>
        </div>
      </section>
  );

  const renderInstagram = () => (
      <section key="INSTAGRAM" className="py-16 md:py-24 bg-background dark:bg-dark-background">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4 text-foreground dark:text-dark-foreground">{siteContent.instagramTitle}</h2>
            <p className="max-w-2xl mx-auto text-muted-foreground dark:text-dark-muted-foreground">{siteContent.instagramSubtitle}</p>
          </div>
          <div className="relative group">
            <div ref={instaScrollContainerRef} className="flex space-x-4 overflow-x-auto pb-4 scroll-smooth snap-x snap-mandatory">
                {instagramPosts.map(post => (
                    <a href={siteContent.instagramUrl} target="_blank" rel="noopener noreferrer" key={post.id} className="relative block group aspect-square w-60 md:w-72 flex-shrink-0 snap-center">
                        <img src={post.imageUrl} alt="Instagram Post" className="w-full h-full object-cover rounded-lg shadow-lg" loading="lazy" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center rounded-lg">
                           {post.type === 'reel' && <ReelIcon className="absolute top-3 right-3 w-6 h-6 text-white" />}
                            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                                <span>❤️ {post.likes}</span><span className="ml-4">💬 {post.comments}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            <div className="hidden md:block">
                <button onClick={() => handleInstaScroll('left')} aria-label="Scroll left" className="absolute top-1/2 left-0 -translate-y-1/2 bg-card/90 dark:bg-dark-card/90 p-2 rounded-full shadow-lg text-foreground dark:text-dark-foreground hover:bg-slate-200 dark:hover:bg-dark-card transition-all z-10 opacity-0 group-hover:opacity-100 -translate-x-3"><ChevronLeftIcon className="w-6 h-6"/></button>
                <button onClick={() => handleInstaScroll('right')} aria-label="Scroll right" className="absolute top-1/2 right-0 -translate-y-1/2 bg-card/90 dark:bg-dark-card/90 p-2 rounded-full shadow-lg text-foreground dark:text-dark-foreground hover:bg-slate-200 dark:hover:bg-dark-card transition-all z-10 opacity-0 group-hover:opacity-100 translate-x-3"><ChevronRightIcon className="w-6 h-6"/></button>
            </div>
          </div>
           <a 
              href={siteContent.instagramUrl} 
              target="_blank" 
              rel="noopener noreferrer" 
              className="mt-12 inline-block bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 hover:from-purple-600 hover:via-pink-600 hover:to-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg"
            >
              Follow on Instagram
            </a>
        </div>
      </section>
  );

  const componentMap = {
      'HERO': renderHero,
      'ADVENTURES': renderAdventures,
      'DEPARTURES': renderDepartures,
      'CUSTOMIZE': renderCustomize,
      'WHY_CHOOSE_US': renderWhyChooseUs,
      'ROOTS': renderRoots,
      'REVIEWS': renderReviews,
      'BLOG': renderBlog,
      'GALLERY': renderGallery,
      'INSTAGRAM': renderInstagram
  };

  // If no layout is defined (legacy support), default to standard order
  const layout = siteContent.homePageLayout || [
      { id: 'HERO', isVisible: true },
      { id: 'ADVENTURES', isVisible: true },
      { id: 'DEPARTURES', isVisible: true },
      { id: 'CUSTOMIZE', isVisible: true },
      { id: 'WHY_CHOOSE_US', isVisible: true },
      { id: 'ROOTS', isVisible: true },
      { id: 'REVIEWS', isVisible: true },
      { id: 'BLOG', isVisible: true },
      { id: 'GALLERY', isVisible: true },
      { id: 'INSTAGRAM', isVisible: true }
  ];

  return (
    <div>
      <SEOHead 
        title={siteContent.globalSeo?.title} 
        description={siteContent.globalSeo?.description} 
        keywords={siteContent.globalSeo?.keywords}
      />
      {layout
        .filter(section => section.isVisible)
        .map(section => {
            const Renderer = componentMap[section.id];
            return Renderer ? Renderer() : null;
        })
      }
    </div>
  );
};

export default HomePage;
