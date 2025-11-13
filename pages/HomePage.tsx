import React, { useRef } from 'react';
import type { Trip, Departure, BlogPost, GalleryPhoto, InstagramPost } from '../types';
import TripCard from '../components/TripCard';
import BlogPostCard from '../components/BlogPostCard';

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
}

const ArrowRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10.293 3.293a1 1 0 0 1 1.414 0l6 6a1 1 0 0 1 0 1.414l-6 6a1 1 0 0 1-1.414-1.414L14.586 11H3a1 1 0 1 1 0-2h11.586l-4.293-4.293a1 1 0 0 1 0-1.414z" clipRule="evenodd" />
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

const HomePage: React.FC<HomePageProps> = ({ trips, departures, onSelectTrip, onBookNow, blogPosts, galleryPhotos, instagramPosts, onSelectBlogPost, onNavigateGallery }) => {
  const featuredTrips = trips.slice(0, 3);
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
          <button onClick={() => { /* In a real app, this would scroll to the tours section */ }} className="mt-8 bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg">
            Explore Tours
          </button>
        </div>
      </section>

      {/* Featured Tours Section */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold font-display text-slate-800">Featured Tours</h2>
            <p className="mt-4 text-lg text-slate-600 max-w-2xl mx-auto">Handpicked adventures for the ultimate Himalayan experience.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredTrips.map(trip => (
              <TripCard key={trip.id} trip={trip} onSelectTrip={onSelectTrip} onBookNow={onBookNow} />
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Departures Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6">
           <h2 className="text-3xl md:text-4xl font-bold font-display text-center mb-12">Upcoming Departures</h2>
           <div className="bg-white rounded-lg shadow-xl overflow-hidden">
             <ul className="divide-y divide-gray-200">
               {departures.map(departure => {
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
                          className="flex items-center space-x-2 bg-orange-500 text-white font-semibold py-2 px-4 rounded-md transition-all duration-300 hover:bg-orange-600 disabled:bg-gray-300 disabled:cursor-not-allowed transform hover:scale-105"
                        >
                          <span>Book Now</span>
                          <ArrowRightIcon className="w-4 h-4" />
                        </button>
                     </div>
                   </li>
                 )
               })}
             </ul>
           </div>
        </div>
      </section>
      
      {/* Latest Blog Posts Section */}
      <section className="py-16 md:py-24 bg-gray-50">
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
      <section className="py-16 md:py-24 bg-white">
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
      <section className="py-16 md:py-24 bg-gray-50">
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