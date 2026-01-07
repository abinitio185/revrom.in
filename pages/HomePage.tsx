
import React, { useState, useMemo, useEffect, useRef } from 'react';
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

const TaglineSequence = () => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    const sequence = [
      { duration: 2000 }, // Bike
      { duration: 1500 }, // Ride, Roam, Relax (blink)
      { duration: 2500 }, // Another Bike appears behind
      { duration: 2000 }, // Ride, Roam, Relax repeated
    ];
    
    let timer: any;
    const run = (idx: number) => {
      setStep(idx);
      timer = setTimeout(() => {
        run((idx + 1) % sequence.length);
      }, sequence[idx].duration);
    };
    
    run(0);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="relative h-48 md:h-64 flex flex-col items-center justify-center">
      {/* Background Graphic Bike */}
      <div className={`absolute inset-0 flex items-center justify-center transition-all duration-1000 transform ${step >= 2 ? 'opacity-30 scale-125' : 'opacity-0 scale-90'}`}>
        <svg className="w-48 h-48 md:w-72 md:h-72 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/>
        </svg>
      </div>

      <div className="relative z-10 text-center space-y-4">
        <h2 className={`text-5xl md:text-8xl font-black uppercase tracking-tighter text-white transition-all duration-500 ${step === 0 ? 'opacity-100 scale-100' : 'opacity-0 scale-95 absolute inset-0'}`}>
          Bike
        </h2>
        
        <div className={`flex flex-col items-center transition-all duration-500 ${step === 1 || step === 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 absolute inset-0'}`}>
          <span className={`text-2xl md:text-4xl font-black uppercase tracking-[0.2em] text-brand-primary ${step === 1 ? 'animate-blink' : ''}`}>
            Ride. Roam. Relax.
          </span>
          {step === 3 && (
            <span className="text-xl md:text-2xl font-bold uppercase tracking-[0.4em] text-white/60 mt-2">
              The Frontier Awaits
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

const HomePage: React.FC<HomePageProps> = (props) => {
  const { 
    trips, 
    departures, 
    siteContent, 
    onSelectTrip, 
    onBookNow, 
    initialDestinationFilter, 
    onClearInitialFilter, 
    onNavigateCustomize, 
    blogPosts, 
    galleryPhotos, 
    instagramPosts,
    googleReviews, 
    onSelectBlogPost, 
    onNavigateGallery 
  } = props;

  const [searchTerm, setSearchTerm] = useState('');
  const [destinationFilter, setDestinationFilter] = useState('all');
  const [depDestFilter, setDepDestFilter] = useState('all');
  const [depMonthFilter, setDepMonthFilter] = useState('all');

  const tripScrollRef = useRef<HTMLDivElement>(null);
  const reviewScrollRef = useRef<HTMLDivElement>(null);
  const blogScrollRef = useRef<HTMLDivElement>(null);

  const uniqueDestinations = useMemo(() => [...new Set(trips.map(trip => trip.destination))], [trips]);
  
  const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

  useEffect(() => {
    if (initialDestinationFilter) {
      setDestinationFilter(initialDestinationFilter);
      document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' });
      onClearInitialFilter();
    }
  }, [initialDestinationFilter, onClearInitialFilter]);

  const filteredTrips = useMemo(() => {
    return trips.filter(trip => {
      const searchLower = searchTerm.toLowerCase();
      const matchesSearch = searchLower === '' || trip.title.toLowerCase().includes(searchLower) || trip.destination.toLowerCase().includes(searchLower);
      const matchesDestination = destinationFilter === 'all' || trip.destination === destinationFilter;
      return matchesSearch && matchesDestination;
    });
  }, [trips, searchTerm, destinationFilter]);

  const filteredDepartures = useMemo(() => {
    return departures.filter(dep => {
      const trip = trips.find(t => t.id === dep.tripId);
      if (!trip) return false;
      const matchesDest = depDestFilter === 'all' || trip.destination === depDestFilter;
      const depDate = new Date(dep.startDate);
      const matchesMonth = depMonthFilter === 'all' || months[depDate.getMonth()] === depMonthFilter;
      return matchesDest && matchesMonth;
    }).sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
  }, [departures, trips, depDestFilter, depMonthFilter]);

  const scroll = (ref: React.RefObject<HTMLDivElement>, direction: 'left' | 'right') => {
    if (ref.current) {
      const { scrollLeft, clientWidth } = ref.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth * 0.8 : scrollLeft + clientWidth * 0.8;
      ref.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const NavigationControls = ({ scrollRef, totalItems }: { scrollRef: React.RefObject<HTMLDivElement>, totalItems: number }) => (
    <div className="flex items-center gap-3">
      <div className="flex gap-1.5">
        <button 
          onClick={() => scroll(scrollRef, 'left')}
          className="w-10 h-10 rounded-full border border-border dark:border-dark-border flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all active:scale-90"
        >
          <svg className="w-4 h-4 transform rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </button>
        <button 
          onClick={() => scroll(scrollRef, 'right')}
          className="w-10 h-10 rounded-full border border-border dark:border-dark-border flex items-center justify-center hover:bg-brand-primary hover:text-white transition-all active:scale-90"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </button>
      </div>
      <div className="hidden sm:block text-[9px] font-black uppercase tracking-[0.2em] text-muted-foreground whitespace-nowrap">
        {totalItems} Available
      </div>
    </div>
  );

  const formatDateRange = (start: string, end: string) => {
    const d1 = new Date(start);
    const d2 = new Date(end);
    const options: Intl.DateTimeFormatOptions = { day: 'numeric', month: 'short' };
    return `${d1.toLocaleDateString('en-US', options)} – ${d2.toLocaleDateString('en-US', options)} ${d1.getFullYear()}`;
  };

  return (
    <div className="bg-background">
      <SEOHead title={siteContent.globalSeo?.title} description={siteContent.globalSeo?.description} />
      
      {/* 1. HERO SECTION */}
      <section className="relative h-[90vh] md:h-screen flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1558981403-c5f91cbba527?auto=format&fit=crop&q=80&w=1920" 
            className="w-full h-full object-cover opacity-60 md:opacity-50 scale-105 animate-pulse-slow" 
            alt="Adventure Hero"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-background"></div>
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-xl px-4 py-2 rounded-full border border-white/20 mb-8 md:mb-10">
            <span className="flex h-2 w-2 rounded-full bg-brand-primary animate-pulse"></span>
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">Native Himalayan Expertise</span>
          </div>

          <TaglineSequence />

          <p className="text-base md:text-xl text-white/80 max-w-2xl mx-auto font-medium mt-12 mb-12 italic leading-relaxed">
            "{siteContent.heroSubtitle}"
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-6">
            <button 
              onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
              className="w-full sm:w-auto bg-brand-primary text-white font-black uppercase tracking-widest px-10 py-4 rounded-xl shadow-2xl transition-all hover:scale-105"
            >
              Browse Journeys
            </button>
            <button onClick={onNavigateCustomize} className="w-full sm:w-auto text-white font-black uppercase tracking-widest px-10 py-4 border-2 border-white/30 rounded-xl hover:bg-white hover:text-black transition-all">
              Bespoke Planning
            </button>
          </div>
        </div>
      </section>

      {/* 2. WHY US / FEATURES */}
      <section className="py-16 md:py-24 border-b border-border dark:border-dark-border bg-card/30">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[
              { icon: '🏔️', title: 'Frontier Experts', desc: 'Native guides born at 14,000ft who know every hidden valley.' },
              { icon: '🚐', title: 'Seamless Support', desc: 'Fully equipped support vehicles and precision technical backups.' },
              { icon: '✨', title: 'Handpicked Stays', desc: 'A perfect balance of grit and comfort across the high desert.' },
              { icon: '🛡️', title: 'Elite Safety', desc: 'Satellite communication and specialized high-altitude medical support.' },
            ].map((f, i) => (
              <div key={i} className="space-y-4 text-center sm:text-left">
                <div className="text-4xl">{f.icon}</div>
                <h3 className="text-lg font-black uppercase tracking-tight">{f.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed font-medium">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. TOURS GRID (Active Expeditions) */}
      <section id="explore" className="py-20 relative overflow-hidden">
        <div className="container mx-auto px-6 mb-12">
          <div className="flex flex-col lg:flex-row justify-between items-end gap-8">
            <div className="max-w-xl w-full">
              <span className="text-brand-primary font-black uppercase text-[10px] tracking-[0.4em] mb-3 block">Adventure Portfolio</span>
              <h2 className="text-3xl md:text-5xl font-black text-foreground uppercase tracking-tighter leading-none mb-4">
                Active <span className="text-brand-primary">Expeditions</span>
              </h2>
              <NavigationControls scrollRef={tripScrollRef} totalItems={filteredTrips.length} />
            </div>
            <div className="w-full lg:w-auto">
                <SearchAndFilter 
                    searchTerm={searchTerm} setSearchTerm={setSearchTerm} 
                    destinationFilter={destinationFilter} setDestinationFilter={setDestinationFilter} 
                    durationFilter="all" setDurationFilter={()=>{}} difficultyFilter="all" setDifficultyFilter={()=>{}} 
                    destinations={uniqueDestinations} onClearFilters={() => { setSearchTerm(''); setDestinationFilter('all'); }} 
                />
            </div>
          </div>
        </div>
        <div ref={tripScrollRef} className="flex overflow-x-auto gap-6 md:gap-10 px-6 md:px-[10vw] pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth">
          {filteredTrips.map(trip => (
            <div key={trip.id} className="min-w-[280px] sm:min-w-[320px] md:min-w-[420px] snap-center">
              <TripCard trip={trip} onSelectTrip={onSelectTrip} onBookNow={onBookNow} />
            </div>
          ))}
          <div className="min-w-[40px] flex-shrink-0"></div>
        </div>
      </section>

      {/* 4. UPCOMING DEPARTURES */}
      <section className="py-20 bg-card/20 border-y border-border dark:border-dark-border">
        <div className="container mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-5xl font-black uppercase tracking-tighter mb-4 italic">Upcoming Departures</h2>
            <div className="h-1 w-16 bg-brand-primary mx-auto"></div>
          </div>
          
          {/* Desktop Table View */}
          <div className="hidden md:block max-w-5xl mx-auto bg-background dark:bg-dark-card rounded-[3rem] overflow-hidden shadow-xl border border-border dark:border-dark-border">
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="bg-slate-50 dark:bg-black/20 text-[9px] font-black uppercase tracking-[0.4em] text-muted-foreground">
                  <tr>
                    <th className="px-10 py-8">Your Trip</th>
                    <th className="px-10 py-8">Travel Period</th>
                    <th className="px-10 py-8 text-center">Status</th>
                    <th className="px-10 py-8 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border dark:divide-dark-border">
                  {filteredDepartures.map(dep => {
                    const trip = trips.find(t => t.id === dep.tripId)!;
                    return (
                      <tr key={dep.id} className="hover:bg-slate-50 dark:hover:bg-white/5 transition-colors">
                        <td className="px-10 py-8">
                          <span className="block font-black uppercase text-sm tracking-tight">{trip.title}</span>
                          <span className="text-[10px] font-bold text-muted-foreground uppercase">{trip.destination}</span>
                        </td>
                        <td className="px-10 py-8 text-xs font-bold">{formatDateRange(dep.startDate, dep.endDate)}</td>
                        <td className="px-10 py-8 text-center">
                          <span className={`text-[9px] font-black uppercase tracking-widest px-4 py-2 rounded-full ${dep.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{dep.status}</span>
                        </td>
                        <td className="px-10 py-8 text-right">
                          <button onClick={() => onBookNow(trip)} className="text-[10px] font-black uppercase tracking-widest text-brand-primary hover:underline">Book Your Trip</button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Mobile Card View */}
          <div className="md:hidden space-y-4">
              {filteredDepartures.map(dep => {
                  const trip = trips.find(t => t.id === dep.tripId)!;
                  return (
                    <div key={dep.id} className="bg-background dark:bg-dark-card p-6 rounded-2xl border border-border dark:border-dark-border shadow-md">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <h4 className="font-black uppercase text-sm tracking-tight">{trip.title}</h4>
                                <span className="text-[9px] font-bold text-muted-foreground uppercase">{trip.destination}</span>
                            </div>
                            <span className={`text-[8px] font-black uppercase px-2 py-1 rounded-full ${dep.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>{dep.status}</span>
                        </div>
                        <div className="flex items-center gap-2 mb-6 text-xs font-bold text-slate-600 dark:text-slate-400">
                           <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"/></svg>
                           {formatDateRange(dep.startDate, dep.endDate)}
                        </div>
                        <button onClick={() => onBookNow(trip)} className="w-full bg-foreground dark:bg-white dark:text-black text-white font-black uppercase tracking-widest py-3 rounded-xl text-[10px] active:scale-95 transition-transform">Book Your Trip</button>
                    </div>
                  );
              })}
          </div>
        </div>
      </section>

      {/* 5. CUSTOMIZE CTA */}
      <section className="py-24 md:py-32 bg-foreground text-white relative overflow-hidden">
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-6 md:mb-8 leading-none">Your Map, <br className="md:hidden"/> <span className="text-brand-primary">Our Expertise.</span></h2>
          <p className="text-lg md:text-xl text-slate-300 max-w-2xl mx-auto italic mb-10 md:mb-12">"Design a private itinerary for your group, family, or personal ambition."</p>
          <button onClick={onNavigateCustomize} className="w-full md:w-auto bg-brand-primary text-white font-black uppercase tracking-widest px-12 py-5 rounded-2xl shadow-2xl hover:bg-white hover:text-black transition-all">Start Your Plan</button>
        </div>
      </section>

      {/* 6. ABOUT / ROOTS */}
      <section className="py-24 md:py-32 bg-background overflow-hidden">
        <div className="container mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 md:gap-20 items-center">
            <div className="space-y-8 md:space-y-10">
              <span className="text-xs font-black uppercase tracking-[0.8em] text-brand-primary">Native Resilience</span>
              <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none">Roots of <br className="hidden sm:block"/> Chushul</h2>
              <p className="text-xl text-slate-600 dark:text-slate-400 font-medium leading-relaxed italic border-l-4 border-brand-primary pl-8 md:pl-10">"Born at 14,000ft, our resilience is forged by the frontier."</p>
              <p className="text-sm md:text-base text-muted-foreground leading-relaxed">Our story began in the shadow of Rezang La. Every trip we design is an homage to the unyielding spirit of the high Himalayas.</p>
              <button onClick={onNavigateCustomize} className="w-full md:w-auto bg-foreground dark:bg-white text-white dark:text-black font-black uppercase tracking-widest px-10 py-4 rounded-xl shadow-xl hover:bg-brand-primary transition-all">Our Story</button>
            </div>
            <div className="relative mt-8 md:mt-0">
              <img src="https://images.unsplash.com/photo-1544735038-179ad6bc293c?auto=format&fit=crop&q=80&w=1200" className="rounded-[3rem] w-full h-[400px] md:h-[500px] object-cover grayscale" alt="Roots" />
            </div>
          </div>
        </div>
      </section>

      {/* 7. TESTIMONIALS (Traveler Legacy) */}
      <section className="py-20 md:py-24 bg-card/30 relative overflow-hidden border-t border-border dark:border-dark-border">
        <div className="container mx-auto px-6 mb-12 md:mb-16">
          <div className="flex flex-col md:flex-row justify-between items-end gap-6 md:gap-8">
            <div>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">Traveler <span className="text-brand-primary">Legacy</span></h2>
              <div className="h-1 w-20 bg-brand-primary"></div>
            </div>
            <NavigationControls scrollRef={reviewScrollRef} totalItems={googleReviews.length} />
          </div>
        </div>
        <div ref={reviewScrollRef} className="flex overflow-x-auto gap-8 md:gap-10 px-6 md:px-[10vw] pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth">
          {googleReviews.map(review => (
            <div key={review.id} className="min-w-[280px] md:min-w-[450px] snap-center bg-background p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] border border-border flex flex-col justify-between shadow-sm">
              <p className="text-base md:text-lg italic text-slate-600 dark:text-slate-400 leading-relaxed mb-8 md:mb-10">"{review.text}"</p>
              <div className="flex items-center gap-4 md:gap-6 pt-5 md:pt-6 border-t border-border/50">
                <img src={review.profilePhotoUrl} className="w-12 h-12 md:w-14 md:h-14 rounded-xl md:rounded-2xl object-cover grayscale" alt={review.authorName} />
                <div>
                  <span className="block font-black uppercase text-[10px] md:text-xs tracking-widest">{review.authorName}</span>
                  <span className="block text-[8px] md:text-[10px] font-bold text-brand-primary uppercase">Certified Traveler</span>
                </div>
              </div>
            </div>
          ))}
          <div className="min-w-[40px] flex-shrink-0"></div>
        </div>
      </section>

      {/* 8. PHOTO GALLERY (Vista Stream) */}
      <section className="py-20 md:py-24 bg-background">
        <div className="container mx-auto px-6 text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">Vista <span className="text-brand-primary">Stream</span></h2>
          <p className="text-sm md:text-base text-muted-foreground font-medium">A visual narrative of raw beauty across the high frontier.</p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 px-4">
          {galleryPhotos.slice(0, 8).map((photo, i) => (
            <div key={photo.id} className={`relative group overflow-hidden rounded-2xl md:rounded-3xl ${i === 0 ? 'col-span-2 row-span-2' : ''}`}>
              <img src={photo.imageUrl} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt={photo.caption} />
            </div>
          ))}
        </div>
      </section>

      {/* 9. BLOG (The Logbook) */}
      <section className="py-20 md:py-24 bg-card/30 border-t border-border dark:border-dark-border">
        <div className="container mx-auto px-6 mb-12 md:mb-16">
          <div className="flex justify-between items-end gap-6">
            <div>
              <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">The <span className="text-brand-primary">Logbook</span></h2>
              <div className="h-1 w-20 bg-brand-primary"></div>
            </div>
            <NavigationControls scrollRef={blogScrollRef} totalItems={blogPosts.length} />
          </div>
        </div>
        <div ref={blogScrollRef} className="flex overflow-x-auto gap-8 md:gap-12 px-6 md:px-[10vw] pb-10 snap-x snap-mandatory no-scrollbar scroll-smooth">
          {blogPosts.map(post => (
            <div key={post.id} className="min-w-[280px] md:min-w-[450px] snap-center">
              <BlogPostCard post={post} onSelectPost={onSelectBlogPost} />
            </div>
          ))}
          <div className="min-w-[40px] flex-shrink-0"></div>
        </div>
      </section>

      {/* 10. INSTAGRAM (The Frontier Movement) */}
      <section className="py-20 md:py-24 bg-background border-t border-border dark:border-dark-border overflow-hidden">
        <div className="container mx-auto px-6 text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-6xl font-black uppercase tracking-tighter mb-4 italic">The Frontier <span className="text-brand-primary">Movement</span></h2>
          <p className="text-muted-foreground font-medium uppercase tracking-[0.3em] text-[10px] md:text-xs">Join our global collective @revrom.in</p>
        </div>
        <div className="flex gap-4 md:gap-8 animate-scroll-x whitespace-nowrap">
          {[...instagramPosts, ...instagramPosts].map((post, i) => (
            <div key={i} className="w-56 h-56 md:w-72 md:h-72 flex-shrink-0 rounded-[1.5rem] md:rounded-[2rem] overflow-hidden shadow-2xl grayscale hover:grayscale-0 transition-all duration-700">
              <img src={post.imageUrl} className="w-full h-full object-cover" alt="Movement" />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;
