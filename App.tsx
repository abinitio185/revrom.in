
import React, { useState, useCallback, useMemo, useEffect } from 'react';
import type { Trip, Departure, BlogPost, GalleryPhoto, InstagramPost, Review, GoogleReview, SiteContent, ItineraryQuery, ThemeColors, CustomPage } from './types';
import { trips as initialTrips, departures as initialDepartures, blogPosts as initialBlogPosts, galleryPhotos as initialGalleryPhotos, instagramPosts as initialInstagramPosts, googleReviews as initialGoogleReviews, siteContent as initialSiteContent, itineraryQueries as initialItineraryQueries, customPages as initialCustomPages } from './data/mockData';
import { themes } from './data/themes';
import { generateBlogImage } from './services/geminiService';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import TripDetailPage from './pages/TripDetailPage';
import BookingPage from './pages/BookingPage';
import ContactPage from './pages/ContactPage';
import AdminPage from './pages/AdminPage';
import LoginPage from './pages/LoginPage';
import BlogPage from './pages/BlogPage';
import BlogDetailPage from './pages/BlogDetailPage';
import GalleryPage from './pages/GalleryPage';
import CustomizePage from './pages/CustomizePage';
import DynamicPage from './pages/DynamicPage';

type View = 'home' | 'tripDetail' | 'booking' | 'contact' | 'admin' | 'login' | 'blog' | 'blogDetail' | 'gallery' | 'customize' | 'customPage';
export type Theme = 'light' | 'dark';

const App: React.FC = () => {
  const [view, setView] = useState<View>('home');
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [selectedBlogPost, setSelectedBlogPost] = useState<BlogPost | null>(null);
  const [currentCustomPageSlug, setCurrentCustomPageSlug] = useState<string | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [initialDestinationFilter, setInitialDestinationFilter] = useState<string | null>(null);
  const [theme, setTheme] = useState<Theme>('light');

  // Data states
  const [trips, setTrips] = useState<Trip[]>(initialTrips);
  const [departures, setDepartures] = useState<Departure[]>(initialDepartures);
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>(initialBlogPosts);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(initialGalleryPhotos);
  const [instagramPosts, setInstagramPosts] = useState<InstagramPost[]>(initialInstagramPosts);
  const [googleReviews, setGoogleReviews] = useState<GoogleReview[]>(initialGoogleReviews);
  
  // Initialize siteContent from localStorage if available
  const [siteContent, setSiteContent] = useState<SiteContent>(() => {
    const savedContent = localStorage.getItem('siteContent');
    return savedContent ? JSON.parse(savedContent) : initialSiteContent;
  });

  const [itineraryQueries, setItineraryQueries] = useState<ItineraryQuery[]>(initialItineraryQueries);
  const [customPages, setCustomPages] = useState<CustomPage[]>(initialCustomPages);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    setTheme(initialTheme);
  }, []);

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
    localStorage.setItem('theme', theme);
  }, [theme]);
  
  // THEME INJECTION EFFECT
  useEffect(() => {
    const selectedThemeName = siteContent.activeTheme;
    let themeColors: ThemeColors;

    if (selectedThemeName === 'Custom') {
        themeColors = siteContent.customThemeColors;
    } else {
        const foundTheme = themes.find(t => t.name === selectedThemeName);
        themeColors = foundTheme ? foundTheme.colors : themes.find(t => t.name === 'Default')!.colors;
    }

    const root = document.documentElement;
    const colorsToApply = theme === 'light' ? themeColors.light : themeColors.dark;
    
    // Comprehensive mapping of all theme variables
    // These must match the Tailwind configuration in index.html
    const colorMap = {
        // Base Colors (Light Mode Default)
        '--color-brand-primary': themeColors.light.primary,
        '--color-brand-primary-dark': themeColors.light.primaryDark,
        '--color-brand-accent-gold': themeColors.light.accentGold,
        '--color-background': themeColors.light.background,
        '--color-foreground': themeColors.light.foreground,
        '--color-card': themeColors.light.card,
        '--color-muted-foreground': themeColors.light.mutedForeground,
        '--color-border': themeColors.light.border,
        
        // Dark Mode Specific Overrides (used by .dark class)
        '--color-dark-background': themeColors.dark.background,
        '--color-dark-foreground': themeColors.dark.foreground,
        '--color-dark-card': themeColors.dark.card,
        '--color-dark-muted-foreground': themeColors.dark.mutedForeground,
        '--color-dark-border': themeColors.dark.border,

        // If the current mode is dark, we also overwrite the 'base' variables
        // This ensures third-party libraries or inline styles using standard variables look correct immediately
        ...(theme === 'dark' ? {
            '--color-brand-primary': themeColors.dark.primary,
            '--color-brand-primary-dark': themeColors.dark.primaryDark,
            '--color-brand-accent-gold': themeColors.dark.accentGold,
            // Note: background/foreground/etc are handled by Tailwind 'dark:' prefix classes mapping to the dark-* vars
            // But overwriting the base ones helps for un-prefixed classes
            '--color-background': themeColors.dark.background,
            '--color-foreground': themeColors.dark.foreground,
            '--color-card': themeColors.dark.card,
            '--color-muted-foreground': themeColors.dark.mutedForeground,
            '--color-border': themeColors.dark.border,
        } : {})
    };
    
    for (const [property, value] of Object.entries(colorMap)) {
      root.style.setProperty(property, value);
    }

  }, [siteContent.activeTheme, siteContent.customThemeColors, theme]);


  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  const uniqueDestinations = useMemo(() => [...new Set(trips.map(trip => trip.destination))], [trips]);


  // --- Data Management Functions ---
  const addTrip = (trip: Omit<Trip, 'id' | 'reviews'>) => {
    setTrips(prev => [{ ...trip, id: `trip-${Date.now()}`, reviews: [] }, ...prev]);
  };
  const updateTrip = (updatedTrip: Trip) => {
    setTrips(prev => prev.map(t => t.id === updatedTrip.id ? updatedTrip : t));
  };
  const deleteTrip = (tripId: string) => {
    setTrips(prev => prev.filter(t => t.id !== tripId));
    setDepartures(prev => prev.filter(d => d.tripId !== tripId));
  };

  const addDeparture = (departure: Omit<Departure, 'id'>) => {
     setDepartures(prev => [...prev, { ...departure, id: `dep-${Date.now()}` }]);
  };
  const updateDeparture = (updatedDeparture: Departure) => {
    setDepartures(prev => prev.map(d => d.id === updatedDeparture.id ? updatedDeparture : d));
  };
  const deleteDeparture = (departureId: string) => {
    setDepartures(prev => prev.filter(d => d.id !== departureId));
  };

  const addBlogPost = async (post: Omit<BlogPost, 'id' | 'date' | 'imageUrl'> & { imageUrl?: string }) => {
    let imageUrl = post.imageUrl;
    if (!imageUrl) {
       imageUrl = await generateBlogImage(post.title, post.excerpt);
    }
    const newPost = { 
      ...post, 
      id: `blog-${Date.now()}`, 
      date: new Date().toISOString().split('T')[0],
      imageUrl: imageUrl 
    };
    setBlogPosts(prev => [newPost, ...prev]);
  };
  const updateBlogPost = (updatedPost: BlogPost) => {
    setBlogPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };
  const deleteBlogPost = (postId: string) => {
    setBlogPosts(prev => prev.filter(p => p.id !== postId));
  };

  const addGalleryPhoto = (photo: Omit<GalleryPhoto, 'id'>) => {
    setGalleryPhotos(prev => [{ ...photo, id: `gal-${Date.now()}` }, ...prev]);
  };
  const updateGalleryPhoto = (updatedPhoto: GalleryPhoto) => {
    setGalleryPhotos(prev => prev.map(p => p.id === updatedPhoto.id ? updatedPhoto : p));
  };
  const deleteGalleryPhoto = (photoId: string) => {
    setGalleryPhotos(prev => prev.filter(p => p.id !== photoId));
  };

  const addInstagramPost = (post: Omit<InstagramPost, 'id'>) => {
    setInstagramPosts(prev => [{ ...post, id: `insta-${Date.now()}` }, ...prev]);
  };
  const updateInstagramPost = (updatedPost: InstagramPost) => {
    setInstagramPosts(prev => prev.map(p => p.id === updatedPost.id ? updatedPost : p));
  };
  const deleteInstagramPost = (postId: string) => {
    setInstagramPosts(prev => prev.filter(p => p.id !== postId));
  };

  const addGoogleReview = (review: Omit<GoogleReview, 'id'>) => {
    setGoogleReviews(prev => [{ ...review, id: `gr-${Date.now()}` }, ...prev]);
  };
  const updateGoogleReview = (updatedReview: GoogleReview) => {
    setGoogleReviews(prev => prev.map(r => r.id === updatedReview.id ? updatedReview : r));
  };
  const deleteGoogleReview = (reviewId: string) => {
    setGoogleReviews(prev => prev.filter(r => r.id !== reviewId));
  };
  const updateSiteContent = (newContent: Partial<SiteContent>) => {
    setSiteContent(prev => ({ ...prev, ...newContent }));
  };
  
  // --- Custom Page Management ---
  const addCustomPage = (page: Omit<CustomPage, 'id'>) => {
      setCustomPages(prev => [...prev, { ...page, id: `page-${Date.now()}` }]);
  };
  const updateCustomPage = (updatedPage: CustomPage) => {
      setCustomPages(prev => prev.map(p => p.id === updatedPage.id ? updatedPage : p));
  };
  const deleteCustomPage = (pageId: string) => {
      setCustomPages(prev => prev.filter(p => p.id !== pageId));
  };

  const addItineraryQuery = (query: Omit<ItineraryQuery, 'id' | 'date'>) => {
    const newQuery: ItineraryQuery = {
        ...query,
        id: `query-${Date.now()}`,
        date: new Date().toISOString(),
    };
    setItineraryQueries(prev => [newQuery, ...prev]);

    // Admin Notification
    const adminNumber = siteContent.adminWhatsappNumber.replace(/\D/g, '');
    const message = `*New Itinerary Query!*\n-------------------------\n*Tour:* ${newQuery.tripTitle}\n*Name:* ${newQuery.name}\n*WhatsApp:* ${newQuery.whatsappNumber}\n*Planning:* ${newQuery.planningTime}\n*Date:* ${new Date(newQuery.date).toLocaleString()}`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  };

  // --- Auth Handlers ---
  const handleLoginSuccess = useCallback(() => {
    setIsLoggedIn(true);
    setView('admin');
  }, []);

  const handleLogout = useCallback(() => {
    setIsLoggedIn(false);
    setView('home');
    window.scrollTo(0, 0);
  }, []);

  // --- Navigation Handlers ---
  const handleNavigate = useCallback((newView: View) => {
    setView(newView);
    setInitialDestinationFilter(null);
    window.scrollTo(0, 0);
  }, []);

  const handleNavigateToTours = useCallback((destination: string | null = null) => {
    setInitialDestinationFilter(destination);
    setView('home');
    // Scrolling is handled in HomePage's useEffect to ensure the element exists
  }, []);

  const handleSelectTrip = useCallback((trip: Trip) => {
    setSelectedTrip(trip);
    handleNavigate('tripDetail');
  }, [handleNavigate]);
  
  const handleNavigateCustomPage = useCallback((slug: string) => {
      setCurrentCustomPageSlug(slug);
      handleNavigate('customPage');
  }, [handleNavigate]);

  const handleBookNow = useCallback((trip: Trip) => {
    const phoneNumber = '919876543210';
    const message = `Hello Revrom.in, I'm interested in the "${trip.title}" tour. Please provide me with more details.`;
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    window.open(whatsappUrl, '_blank');
  }, []);

  const handleSelectBlogPost = useCallback((post: BlogPost) => {
    setSelectedBlogPost(post);
    handleNavigate('blogDetail');
  }, [handleNavigate]);
  
  const handleNavigateHome = useCallback(() => handleNavigate('home'), [handleNavigate]);
  const handleNavigateContact = useCallback(() => handleNavigate('contact'), [handleNavigate]);
  const handleNavigateBlog = useCallback(() => handleNavigate('blog'), [handleNavigate]);
  const handleNavigateGallery = useCallback(() => handleNavigate('gallery'), [handleNavigate]);
  const handleNavigateCustomize = useCallback(() => handleNavigate('customize'), [handleNavigate]);
  
  const handleNavigateAdmin = useCallback(() => {
    handleNavigate(isLoggedIn ? 'admin' : 'login');
  }, [isLoggedIn, handleNavigate]);

  const handleBackToDetail = useCallback(() => {
    if (selectedTrip) {
      const currentTripState = trips.find(t => t.id === selectedTrip.id);
      if (currentTripState) setSelectedTrip(currentTripState);
    }
    handleNavigate('tripDetail');
  }, [selectedTrip, trips, handleNavigate]);


  const renderContent = () => {
    switch (view) {
      case 'tripDetail':
        return selectedTrip && <TripDetailPage trip={selectedTrip} onBookNow={() => handleNavigate('booking')} onBack={handleNavigateHome} onAddQuery={addItineraryQuery} theme={theme} />;
      case 'booking':
        return selectedTrip && <BookingPage trip={selectedTrip} onBack={handleBackToDetail} />;
      case 'contact':
        return <ContactPage siteContent={siteContent} />;
      case 'blog':
        return <BlogPage posts={blogPosts} onSelectPost={handleSelectBlogPost} />;
      case 'blogDetail':
        return selectedBlogPost && <BlogDetailPage post={selectedBlogPost} onBack={handleNavigateBlog} />;
      case 'gallery':
        return <GalleryPage photos={galleryPhotos} />;
      case 'customize':
        return <CustomizePage onNavigateContact={handleNavigateContact} trips={trips} />;
      case 'customPage':
        const activePage = customPages.find(p => p.slug === currentCustomPageSlug);
        return activePage ? <DynamicPage page={activePage} /> : <div>Page Not Found</div>;
      case 'login':
        return <LoginPage onLoginSuccess={handleLoginSuccess} />;
      case 'admin':
        if (!isLoggedIn) return <LoginPage onLoginSuccess={handleLoginSuccess} />;
        return <AdminPage 
                    trips={trips}
                    departures={departures}
                    blogPosts={blogPosts}
                    galleryPhotos={galleryPhotos}
                    instagramPosts={instagramPosts}
                    googleReviews={googleReviews}
                    siteContent={siteContent}
                    itineraryQueries={itineraryQueries}
                    customPages={customPages}
                    onAddTrip={addTrip}
                    onUpdateTrip={updateTrip}
                    onDeleteTrip={deleteTrip}
                    onAddDeparture={addDeparture}
                    onUpdateDeparture={updateDeparture}
                    onDeleteDeparture={deleteDeparture}
                    onAddBlogPost={addBlogPost}
                    onUpdateBlogPost={updateBlogPost}
                    onDeleteBlogPost={deleteBlogPost}
                    onAddGalleryPhoto={addGalleryPhoto}
                    onUpdateGalleryPhoto={updateGalleryPhoto}
                    onDeleteGalleryPhoto={deleteGalleryPhoto}
                    onAddInstagramPost={addInstagramPost}
                    onUpdateInstagramPost={updateInstagramPost}
                    onDeleteInstagramPost={deleteInstagramPost}
                    onAddGoogleReview={addGoogleReview}
                    onUpdateGoogleReview={updateGoogleReview}
                    onDeleteGoogleReview={deleteGoogleReview}
                    onUpdateSiteContent={updateSiteContent}
                    onAddCustomPage={addCustomPage}
                    onUpdateCustomPage={updateCustomPage}
                    onDeleteCustomPage={deleteCustomPage}
                    onNavigateCustomPage={handleNavigateCustomPage}
                    onLogout={handleLogout}
                    theme={theme}
                />;
      case 'home':
      default:
        return <HomePage 
                  trips={trips} 
                  departures={departures} 
                  onSelectTrip={handleSelectTrip} 
                  onBookNow={handleBookNow}
                  blogPosts={blogPosts}
                  galleryPhotos={galleryPhotos}
                  instagramPosts={instagramPosts}
                  googleReviews={googleReviews}
                  siteContent={siteContent}
                  onSelectBlogPost={handleSelectBlogPost}
                  onNavigateGallery={handleNavigateGallery}
                  onNavigateCustomize={handleNavigateCustomize}
                  initialDestinationFilter={initialDestinationFilter}
                  onClearInitialFilter={() => setInitialDestinationFilter(null)}
               />;
    }
  };

  return (
    <div className="bg-background text-foreground min-h-screen flex flex-col overflow-x-hidden">
      <Header 
        onNavigateHome={handleNavigateHome} 
        onNavigateContact={handleNavigateContact} 
        onNavigateBlog={handleNavigateBlog}
        onNavigateGallery={handleNavigateGallery}
        onNavigateCustomize={handleNavigateCustomize}
        onNavigateToTours={handleNavigateToTours}
        onNavigateCustomPage={handleNavigateCustomPage}
        destinations={uniqueDestinations}
        siteContent={siteContent}
        theme={theme}
        toggleTheme={toggleTheme}
        customPages={customPages}
      />
      <main className="flex-grow">
        {renderContent()}
      </main>
      <Footer 
        onNavigateHome={handleNavigateHome} 
        onNavigateContact={handleNavigateContact} 
        onNavigateAdmin={handleNavigateAdmin} 
        onNavigateBlog={handleNavigateBlog}
        onNavigateGallery={handleNavigateGallery}
        onNavigateCustomize={handleNavigateCustomize}
        siteContent={siteContent}
      />
    </div>
  );
};

export default App;
