

import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Trip, Departure, BlogPost, GalleryPhoto, InstagramPost, GoogleReview, SiteContent } from '../types';
import TripCard from '../components/TripCard';
import BlogPostCard from '../components/BlogPostCard';
import SearchAndFilter from '../components/SearchAndFilter';

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
            <StarIcon key={star} className={`h-5 w-5 ${rating >= star ? 'text-yellow-400' : 'text-gray-300'}`} />
        ))}
    </div>
);

const DepartureStatusBadge: React.FC<{ status: Departure['status'] }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  const statusClasses = {
    Available: "bg-green-100 text-green-800",
    'Sold Out': "bg-red-100 text-red-800",
    Limited: "bg-yellow-100 text-yellow-800",
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const HomePage: React.FC<HomePageProps> = (props) => {
  const { trips, departures, onSelectTrip, onBookNow, blogPosts, galleryPhotos, instagramPosts, googleReviews, siteContent, onSelectBlogPost, onNavigateGallery, onNavigateCustomize, initialDestinationFilter, onClearInitialFilter } = props;
  const [searchTerm, setSearchTerm] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');
  const [currentReview, setCurrentReview] = useState(0);
  
  // State for departure filters
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

  // Combine trip data with departures for efficient filtering and rendering
  const departuresWithTripInfo = useMemo(() => {
    const tripMap = new Map(trips.map(trip => [trip.id, trip]));
    return departures
        .map(departure => ({
            ...departure,
            trip: tripMap.get(departure.tripId)
        }))
        .filter((d): d is Departure & { trip: Trip } => !!d.trip);
  }, [departures, trips]);


  // Memoize unique departure months for filtering
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

  // Memoize filtered departures
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

  const FeatureCard = ({ icon, title, children }: { icon: React.ReactNode, title: string, children: React.ReactNode }) => (
    <div className="text-center p-2">
        <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 mx-auto mb-4">
            {icon}
        </div>
        <h3 className="text-xl font-bold font-display mb-2 text-slate-800">{title}</h3>
        <p className="text-slate-600 leading-relaxed">{children}</p>
    </div>
  );

  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[90vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('https://picsum.photos/seed/ladakh-hero/1920/1080')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center z-10 px-4">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold font-display leading-tight mb-4">{siteContent.heroTitle}</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">{siteContent.heroSubtitle}</p>
          <button onClick={() => document.getElementById('tours-section')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">
            Explore Tours
          </button>
        </div>
      </section>

      {/* Our Adventures Section */}
      <section id="tours-section" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-800">{siteContent.adventuresTitle}</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">{siteContent.adventuresSubtitle}</p>
          </div>
          <SearchAndFilter {...{ searchTerm, setSearchTerm, destinationFilter, setDestinationFilter, durationFilter, setDurationFilter, difficultyFilter, setDifficultyFilter, destinations: uniqueDestinations, onClearFilters: handleClearFilters }} />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredTrips.length > 0 ? (
                filteredTrips.map(trip => <TripCard key={trip.id} trip={trip} onSelectTrip={onSelectTrip} onBookNow={onBookNow} />)
            ) : (
                <div className="col-span-1 md:col-span-2 lg:col-span-3 text-center py-16">
                    <h3 className="text-2xl font-semibold text-slate-700">No Adventures Found</h3>
                    <p className="text-slate-500 mt-2">Try adjusting your search or filters. The perfect ride is waiting!</p>
                    <button onClick={handleClearFilters} className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-bold py-2 px-6 rounded-full transition-transform duration-300 transform hover:scale-105">
                        Clear All Filters
                    </button>
                </div>
            )}
          </div>
        </div>
      </section>

      {/* Upcoming Departures Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
           <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">{siteContent.departuresTitle}</h2>
           
           {/* Departure Filters */}
           <div className="max-w-4xl mx-auto mb-8 p-4 bg-gray-50 rounded-lg shadow">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                    <div className="sm:col-span-1">
                        <label htmlFor="departureDestination" className="sr-only">Filter by Destination</label>
                        <select
                            id="departureDestination"
                            value={departureDestinationFilter}
                            onChange={(e) => setDepartureDestinationFilter(e.target.value)}
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 bg-white"
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
                            className="w-full p-3 border border-gray-300 rounded-md focus:ring-orange-500 focus:border-orange-500 bg-white"
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
                            className="text-sm font-semibold text-orange-600 hover:text-orange-800 transition-colors"
                        >
                            Clear Filters
                        </button>
                    </div>
                </div>
            </div>

           <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-xl overflow-hidden">
             <div className="overflow-x-auto">
               <table className="w-full text-sm text-left text-slate-600">
                  <thead className="text-xs text-slate-700 uppercase bg-slate-50">
                    <tr>
                      <th scope="col" className="px-6 py-3">Tour Name</th>
                      <th scope="col" className="px-6 py-3">Date</th>
                      <th scope="col" className="px-6 py-3">Status</th>
                      <th scope="col" className="px-6 py-3"><span className="sr-only">Inquire</span></th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredDepartures.length > 0 ? (
                      filteredDepartures.map(({ trip, ...departure }) => (
                          <tr key={departure.id} className="bg-white border-b hover:bg-slate-50">
                            <th scope="row" className="px-6 py-4 font-medium text-slate-900 whitespace-nowrap">
                              <a href="#" onClick={(e) => { e.preventDefault(); onSelectTrip(trip); }} className="hover:text-orange-600 transition-colors">{trip.title}</a>
                            </th>
                            <td className="px-6 py-4">{new Date(departure.startDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })} - {new Date(departure.endDate).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}</td>
                            <td className="px-6 py-4"><DepartureStatusBadge status={departure.status} /></td>
                            <td className="px-6 py-4 text-right">
                              <button onClick={() => onBookNow(trip)} disabled={departure.status === 'Sold Out'} className="font-medium text-orange-600 hover:underline disabled:text-slate-400 disabled:no-underline">Inquire</button>
                            </td>
                          </tr>
                        )
                      )
                    ) : (
                      <tr><td colSpan={4} className="p-6 text-center text-slate-500">No departures match your criteria. Try adjusting the filters.</td></tr>
                    )}
                  </tbody>
               </table>
             </div>
           </div>
        </div>
      </section>

      {/* Customize Tour Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-800">{siteContent.customizeTitle}</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">{siteContent.customizeSubtitle}</p>
            <button onClick={onNavigateCustomize} className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">
                Design Your Dream Trip
            </button>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6">
            <div className="text-center mb-12">
                <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-800">Why Choose Us?</h2>
                <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Experience the Himalayas with true local experts who prioritize your adventure, authenticity, and safety.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <FeatureCard title="Born & Bred in the Himalayas" icon={<MountainIcon className="w-8 h-8 text-orange-500" />}>
                    Our team are locals from Ladakh. We know the hidden trails, secret viewpoints, and stories behind every pass because this is our home.
                </FeatureCard>
                <FeatureCard title="Authentic Experiences" icon={<UsersIcon className="w-8 h-8 text-orange-500" />}>
                    Forget generic itineraries. We take you to the heart of the Himalayas, sharing meals with local families and experiencing raw, unfiltered culture.
                </FeatureCard>
                <FeatureCard title="Meticulously Maintained Fleet" icon={<CogIcon className="w-8 h-8 text-orange-500" />}>
                    Our Royal Enfield Himalayans are maintained in-house by expert mechanics who know the demands of high-altitude terrain, ensuring reliability.
                </FeatureCard>
                <FeatureCard title="Uncompromising Safety" icon={<ShieldCheckIcon className="w-8 h-8 text-orange-500" />}>
                    With experienced captains, certified mechanics, and a support vehicle on every tour, your safety is paramount. You just focus on the ride.
                </FeatureCard>
            </div>
        </div>
      </section>

      {/* Our Roots Section */}
      <section className="relative py-20 md:py-32 bg-cover bg-center text-white" style={{ backgroundImage: "url('https://picsum.photos/seed/ladakh-rezangla/1920/1080')" }}>
          <div className="absolute inset-0 bg-slate-900/70"></div>
          <div className="container mx-auto px-4 sm:px-6 relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="text-center md:text-left">
                  <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">{siteContent.rootsTitle}</h2>
                  <p className="text-lg text-slate-200 leading-relaxed">{siteContent.rootsBody}</p>
                  <button onClick={() => { const post = blogPosts.find(p => p.id === 'blog-4'); if (post) onSelectBlogPost(post); }} className="mt-8 bg-transparent border-2 border-orange-500 hover:bg-orange-500 text-white font-bold py-3 px-8 rounded-full transition-all duration-300 transform hover:scale-105 shadow-lg">
                      {siteContent.rootsButton}
                  </button>
              </div>
          </div>
      </section>

      {/* Google Reviews Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">What Our Riders Say</h2>
            <p className="max-w-2xl mx-auto text-slate-600 mb-12">Real stories from riders who have experienced the Himalayas with us.</p>
            {featuredReviews.length > 0 ? (
            <div className="relative max-w-3xl mx-auto">
                <div className="overflow-hidden">
                    <div className="flex transition-transform duration-500 ease-in-out" style={{ transform: `translateX(-${currentReview * 100}%)` }}>
                        {featuredReviews.map((review) => (
                            <div key={review.id} className="w-full flex-shrink-0 px-4 sm:px-8">
                                <img src={review.profilePhotoUrl} alt={review.authorName} className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-orange-200 shadow-md" loading="lazy" />
                                <StarRating rating={review.rating} />
                                <p className="text-slate-600 italic my-4 text-base sm:text-lg">"{review.text}"</p>
                                <p className="font-bold text-slate-800 text-sm uppercase tracking-wider">{review.authorName}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <button onClick={prevReview} aria-label="Previous review" className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"><ChevronLeftIcon className="w-6 h-6 text-slate-600" /></button>
                <button onClick={nextReview} aria-label="Next review" className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white p-2 rounded-full shadow-md hover:bg-gray-100 transition-colors"><ChevronRightIcon className="w-6 h-6 text-slate-600" /></button>
            </div>
             ) : (
                <p className="text-slate-500">No featured reviews yet. Check back soon!</p>
             )}
            <a href={siteContent.googleReviewsUrl} target="_blank" rel="noopener noreferrer" className="mt-12 inline-block bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">Read more on Google</a>
        </div>
      </section>
      
      {/* Latest Blog Posts Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">{siteContent.blogTitle}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map(post => <BlogPostCard key={post.id} post={post} onSelectPost={onSelectBlogPost} />)}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 sm:px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">{siteContent.galleryTitle}</h2>
            <p className="max-w-2xl mx-auto text-slate-600 mb-12">{siteContent.gallerySubtitle}</p>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2">
                {galleryPreview.map((photo) => (
                    <div key={photo.id} className="aspect-w-1 aspect-h-1">
                        <img src={photo.imageUrl} alt={photo.caption} className="w-full h-full object-cover rounded-md shadow-md transform hover:scale-105 transition-transform duration-300" loading="lazy" />
                    </div>
                ))}
            </div>
            <button onClick={onNavigateGallery} className="mt-12 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">View Full Gallery</button>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-4 sm:px-6 text-center">
          <div className="mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">{siteContent.instagramTitle}</h2>
            <p className="max-w-2xl mx-auto text-slate-600">{siteContent.instagramSubtitle}</p>
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
                <button onClick={() => handleInstaScroll('left')} aria-label="Scroll left" className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg text-slate-700 hover:bg-white transition-all z-10 opacity-0 group-hover:opacity-100 -translate-x-3"><ChevronLeftIcon className="w-6 h-6"/></button>
                <button onClick={() => handleInstaScroll('right')} aria-label="Scroll right" className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg text-slate-700 hover:bg-white transition-all z-10 opacity-0 group-hover:opacity-100 translate-x-3"><ChevronRightIcon className="w-6 h-6"/></button>
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
    </div>
  );
};

export default HomePage;
