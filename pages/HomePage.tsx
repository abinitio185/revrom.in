import React, { useState, useMemo, useRef } from 'react';
import type { Trip, Departure, BlogPost, GalleryPhoto, InstagramPost } from '../types';
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
  onSelectBlogPost: (post: BlogPost) => void;
  onNavigateGallery: () => void;
  onNavigateCustomize: () => void;
}

const WhatsAppIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.29 4.93L2 22l5.25-1.38c1.41.78 2.99 1.21 4.68 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15h-.01c-1.48 0-2.92-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.82-1.26-4.38 0-4.41 3.58-7.99 7.99-7.99s7.99 3.58 7.99 7.99-3.58 7.99-7.99 7.99z" />
        <path d="M9.25 7.35c-.19-.05-.44-.12-.66-.23-.22-.11-.47-.16-.67-.16-.25 0-.48.08-.68.23-.2.15-.33.32-.46.51-.13.19-.26.4-.38.63-.12.23-.23.47-.33.73-.1.26-.2.54-.27.84-.07.3-.13.61-.16.94-.03.33-.04.67-.04 1.02 0 .35.01.7.04 1.04.03.34.09.67.16 1 .07.33.17.65.29.95s.26.59.42.86c.16.27.34.52.54.76.2.24.42.46.66.66.24.2.5.38.77.54.27.16.56.3.85.42.29.12.59.22.9.3.31.08.62.15.94.19.32.04.64.07.97.08.33.01.66.02.99.02.33 0 .66-.01.99-.02.32-.01.64-.04.95-.08.31-.04.62-.1.92-.19.3-.09.6-.2.88-.33.28-.13.56-.28.81-.45.25-.17.49-.37.7-.58.21-.21.4-.44.56-.69.16-.25.3-.52.41-.8.11-.28.2-.57.26-.88.06-.31.1-.62.13-.94.03-.32.04-.65.04-.98 0-.33-.01-.66-.04-.98-.03-.32-.09-.64-.15-.95-.06-.31-.15-.61-.25-.9-.1-.29-.22-.57-.36-.84s-.3-.54-.47-.79c-.17-.25-.36-.48-.57-.69-.21-.21-.44-.39-.69-.54-.25-.15-.52-.28-.8-.38-.28-.1-.57-.18-.87-.24-.3-.06-.61-.1-.92-.12-.31-.02-.63-.03-.95-.03-1.38 0-2.69.24-3.91.71zm5.2 9.5c-.11.19-.24.36-.39.51s-.32.28-.51.39c-.19.11-.4.2-.62.27-.22.07-.45.13-.69.16-.24.03-.49.05-.73.05-.93 0-1.81-.19-2.61-.56-.8-.37-1.51-.88-2.12-1.5-.61-.62-1.12-1.33-1.5-2.12-.38-.8-.57-1.68-.57-2.61 0-.49.06-.97.17-1.44.11-.47.28-.92.49-1.34.21-.42.47-.81.77-1.15.3-.34.64-.63 1.01-.86.37-.23.77-.41 1.18-.53.41-.12.83-.18 1.25-.18.41 0 .82.06 1.21.17s.77.28 1.12.49c.35.21.67.47.95.77.28.3.52.64.71 1.01.19.37.33.76.43 1.17.1.41.15.83.15 1.25 0 .46-.06.91-.17 1.35-.11.44-.28.86-.5 1.26-.22.4-.48.77-.79 1.1-.31.33-.66.62-1.04.85z" />
    </svg>
);

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

const DepartureStatusBadge: React.FC<{ status: Departure['status'] }> = ({ status }) => {
  const baseClasses = "px-3 py-1 text-xs font-semibold rounded-full";
  const statusClasses = {
    Available: "bg-green-100 text-green-800",
    'Sold Out': "bg-red-100 text-red-800",
    Limited: "bg-yellow-100 text-yellow-800",
  };
  return <span className={`${baseClasses} ${statusClasses[status]}`}>{status}</span>;
};

const HomePage: React.FC<HomePageProps> = ({ trips, departures, onSelectTrip, onBookNow, blogPosts, galleryPhotos, instagramPosts, onSelectBlogPost, onNavigateGallery, onNavigateCustomize }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [durationFilter, setDurationFilter] = useState('all');
  const [difficultyFilter, setDifficultyFilter] = useState('all');

  const uniqueDestinations = useMemo(() => [...new Set(trips.map(trip => trip.destination))], [trips]);

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
  
  const findTripById = (tripId: string) => trips.find(t => t.id === tripId);

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const handleScroll = (direction: 'left' | 'right') => {
      if (scrollContainerRef.current) {
          const scrollAmount = scrollContainerRef.current.clientWidth * 0.8;
          scrollContainerRef.current.scrollBy({
              left: direction === 'left' ? -scrollAmount : scrollAmount,
              behavior: 'smooth',
          });
      }
  };


  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[70vh] md:h-[90vh] bg-cover bg-center text-white flex items-center justify-center" style={{ backgroundImage: "url('https://picsum.photos/seed/ladakh-hero/1920/1080')" }}>
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative text-center z-10 px-4">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold font-display leading-tight mb-4">Conquer the Roof of the World</h1>
          <p className="text-lg md:text-xl max-w-2xl mx-auto">Unforgettable Motorcycle Adventures in the Heart of the Himalayas.</p>
          <button onClick={() => document.getElementById('tours-section')?.scrollIntoView({ behavior: 'smooth' })} className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">
            Explore Tours
          </button>
        </div>
      </section>

      {/* Our Adventures Section */}
      <section id="tours-section" className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-800">Our Adventures</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Find the perfect ride. Filter by destination, duration, and difficulty.</p>
          </div>
          
          <SearchAndFilter
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            destinationFilter={destinationFilter}
            setDestinationFilter={setDestinationFilter}
            durationFilter={durationFilter}
            setDurationFilter={setDurationFilter}
            difficultyFilter={difficultyFilter}
            setDifficultyFilter={setDifficultyFilter}
            destinations={uniqueDestinations}
            onClearFilters={handleClearFilters}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            {filteredTrips.length > 0 ? (
                filteredTrips.map(trip => (
                    <TripCard key={trip.id} trip={trip} onSelectTrip={onSelectTrip} onBookNow={onBookNow} />
                ))
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

      {/* All Departures Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
           <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">All Departures</h2>
           <div className="bg-white rounded-lg shadow-xl overflow-hidden">
             <ul className="divide-y divide-gray-200">
              {departures.length > 0 ? (
                departures.map(departure => {
                 const trip = findTripById(departure.tripId);
                 if (!trip) return null;
                 return (
                   <li key={departure.id} className="p-4 md:p-6 hover:bg-gray-50 transition-colors duration-200 flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
                     <div className="flex items-center space-x-4 text-left w-full md:w-auto">
                       <img src={trip.imageUrl} alt={trip.title} className="w-16 h-16 rounded-md object-cover hidden sm:block" />
                       <div>
                         <p className="font-semibold text-slate-800 cursor-pointer hover:text-orange-600" onClick={() => onSelectTrip(trip)}>{trip.title}</p>
                         <p className="text-sm text-slate-500">{new Date(departure.startDate).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</p>
                       </div>
                     </div>
                     <div className="flex items-center justify-between w-full md:w-auto md:space-x-8">
                        <DepartureStatusBadge status={departure.status} />
                        <button 
                          onClick={() => onBookNow(trip)}
                          disabled={departure.status === 'Sold Out'}
                          className="flex items-center space-x-2 bg-green-500 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-105"
                        >
                          <WhatsAppIcon className="w-5 h-5" />
                          <span>Inquire Now</span>
                        </button>
                     </div>
                   </li>
                 )
               })
              ) : (
                <li className="p-6 text-center text-slate-500">
                  No departures scheduled at the moment. Please check back soon!
                </li>
              )}
             </ul>
           </div>
        </div>
      </section>

      {/* Customize Tour Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-800">Can't Find Your Perfect Tour?</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-3xl mx-auto">Let us craft a bespoke Himalayan adventure just for you. From custom routes to private groups, we can tailor an experience to your exact needs.</p>
            <button onClick={onNavigateCustomize} className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">
                Design Your Dream Trip
            </button>
        </div>
      </section>
      
      {/* Latest Blog Posts Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">Latest From Our Blog</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {latestPosts.map(post => (
              <BlogPostCard key={post.id} post={post} onSelectPost={onSelectBlogPost} />
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Preview Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 text-center">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Explore Our Gallery</h2>
            <p className="max-w-2xl mx-auto text-slate-600 mb-12">A glimpse into the breathtaking landscapes and unforgettable moments from our tours.</p>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">
                {galleryPreview.map((photo, index) => (
                    <div key={photo.id} className={`aspect-w-1 aspect-h-1 ${index > 3 ? 'hidden lg:block' : ''}`}>
                        <img src={photo.imageUrl} alt={photo.caption} className="w-full h-full object-cover rounded-md shadow-md transform hover:scale-105 transition-transform duration-300" />
                    </div>
                ))}
            </div>
            <button onClick={onNavigateGallery} className="mt-12 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">
                View Full Gallery
            </button>
        </div>
      </section>

      {/* Instagram Feed Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display mb-4">Follow Our Adventures</h2>
            <p className="max-w-2xl mx-auto text-slate-600">Join our community on Instagram for live stories, reels, and rider features from the road.</p>
          </div>

          <div className="relative group">
            <div 
                ref={scrollContainerRef} 
                className="flex space-x-4 overflow-x-auto pb-4 scroll-smooth"
            >
                {instagramPosts.map(post => (
                    <a href="#" key={post.id} className="relative block group aspect-square w-60 md:w-72 flex-shrink-0">
                        <img src={post.imageUrl} alt="Instagram Post" className="w-full h-full object-cover rounded-lg shadow-lg" />
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex items-center justify-center rounded-lg">
                           {post.type === 'reel' && <ReelIcon className="absolute top-3 right-3 w-6 h-6 text-white" />}
                            <div className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-sm">
                                <span>❤️ {post.likes}</span>
                                <span className="ml-4">💬 {post.comments}</span>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            
            <button 
                onClick={() => handleScroll('left')} 
                aria-label="Scroll left"
                className="absolute top-1/2 left-0 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg text-slate-700 hover:bg-white transition-all z-10 opacity-0 group-hover:opacity-100 -translate-x-3"
            >
                <ChevronLeftIcon className="w-6 h-6"/>
            </button>
            <button 
                onClick={() => handleScroll('right')} 
                aria-label="Scroll right"
                className="absolute top-1/2 right-0 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg text-slate-700 hover:bg-white transition-all z-10 opacity-0 group-hover:opacity-100 translate-x-3"
            >
                <ChevronRightIcon className="w-6 h-6"/>
            </button>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;