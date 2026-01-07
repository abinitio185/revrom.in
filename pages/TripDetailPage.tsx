
import React, { useState, useCallback, useMemo, useRef, useEffect } from 'react';
import type { Trip, Review, ItineraryQuery } from '../types';
import type { Theme } from '../App';
import { generatePackingList } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';
import TripRouteMap from '../components/TripRouteMap';
import SEOHead from '../components/SEOHead';

interface TripDetailPageProps {
  trip: Trip;
  onBookNow: (trip: Trip) => void;
  onBack: () => void;
  onAddQuery: (query: Omit<ItineraryQuery, 'id' | 'date'>) => void;
  theme: Theme;
}

const XIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.28 7.22a.75.75 0 00-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 101.06 1.06L10 11.06l1.72 1.72a.75.75 0 101.06-1.06L11.06 10l1.72-1.72a.75.75 0 00-1.06-1.06L10 8.94 8.28 7.22z" clipRule="evenodd" /></svg>
);

const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm3.707-9.293a1 1 0 0 0-1.414-1.414L9 10.586 7.707 9.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4z" clipRule="evenodd" />
    </svg>
);

const XCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path fillRule="evenodd" d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16zM8.707 7.293a1 1 0 0 0-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 1 0 1.414 1.414L10 11.414l1.293 1.293a1 1 0 0 0 1.414-1.414L11.414 10l1.293-1.293a1 1 0 0 0-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
    </svg>
);

const ChevronLeftIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M7.72 12.53a.75.75 0 0 1 0-1.06l7.5-7.5a.75.75 0 1 1 1.06 1.06L9.31 12l6.97 6.97a.75.75 0 1 1-1.06 1.06l-7.5-7.5z" clipRule="evenodd" />
    </svg>
);

const ChevronRightIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M16.28 11.47a.75.75 0 0 1 0 1.06l-7.5 7.5a.75.75 0 0 1-1.06-1.06L14.69 12 7.72 5.03a.75.75 0 0 1 1.06-1.06l7.5 7.5z" clipRule="evenodd" />
    </svg>
);

const FacebookIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const TwitterIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22.46 6c-.77.35-1.6.58-2.46.67.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.55v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z" />
    </svg>
);

const DownloadIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
      <path d="M10.75 2.75a.75.75 0 00-1.5 0v8.614L6.295 8.235a.75.75 0 10-1.09 1.03l4.25 4.5a.75.75 0 001.09 0l4.25-4.5a.75.75 0 00-1.09-1.03l-2.955 3.129V2.75z" />
      <path d="M3.5 12.75a.75.75 0 00-1.5 0v2.5A2.75 2.75 0 004.75 18h10.5A2.75 2.75 0 0018 15.25v-2.5a.75.75 0 00-1.5 0v2.5c0 .69-.56 1.25-1.25 1.25H4.75c-.69 0-1.25-.56-1.25-1.25v-2.5z" />
    </svg>
);

const WhatsAppIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.29 4.93L2 22l5.25-1.38c1.41.78 2.99 1.21 4.68 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM16.88 15.18c-.3-.15-1.76-.86-2.03-1.02-.27-.15-.47-.15-.67.15-.2.29-.76.96-.94 1.15-.17.19-.34.22-.64.07-.3-.15-1.31-.48-2.5-1.54-1.2-1.06-1.55-1.84-1.71-2.14-.15-.3-.02-.46.13-.61.13-.13.29-.35.44-.52.15-.17.2-.22.3-.37.1-.15.05-.29-.02-.44-.08-.15-.67-1.61-.92-2.19-.24-.58-.49-.5-.67-.5h-.4c-.2 0-.5.08-.76.33-.26.25-.98.96-.98 2.37 0 1.41.93 2.78 1.06 2.96.13.19 1.91 3.01 4.63 4.1.72.29 1.28.46 1.71.58.71.2 1.35.17 1.86.1.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.45-.08-.15-.28-.22-.58-.38z" />
    </svg>
);

const InstagramIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
    </svg>
);

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.135-.662 1.456 0l1.86 3.847 4.25.618c.73.107 1.022.992.494 1.505l-3.076 2.998.726 4.232c.124.725-.638 1.282-1.28.948L10 15.347l-3.818 2.007c-.642.335-1.404-.223-1.28-.948l.726-4.232L2.55 8.854c-.528-.513-.236-1.398.494-1.505l4.25-.618 1.86-3.847z" clipRule="evenodd" />
    </svg>
);

const PlusIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
    </svg>
);

const MinusIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14" />
    </svg>
);

const StarRating: React.FC<{ rating: number; onRatingChange?: (rating: number) => void; size?: string }> = ({ rating, onRatingChange, size = 'h-5 w-5' }) => {
    const [hoverRating, setHoverRating] = useState(0);
    const isInteractive = !!onRatingChange;

    return (
        <div className="flex items-center">
            {[1, 2, 3, 4, 5].map((star) => (
                <button
                    key={star}
                    type="button"
                    className={` ${isInteractive ? 'cursor-pointer' : ''}`}
                    onClick={() => isInteractive && onRatingChange(star)}
                    onMouseEnter={() => isInteractive && setHoverRating(star)}
                    onMouseLeave={() => isInteractive && setHoverRating(0)}
                    aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                >
                    <StarIcon className={`${size} transition-colors ${(hoverRating >= star || rating >= star) ? 'text-yellow-400' : 'text-slate-400 dark:text-slate-600'}`} />
                </button>
            ))}
        </div>
    );
};


const TripDetailPage: React.FC<TripDetailPageProps> = ({ trip, onBookNow, onBack, onAddQuery, theme }) => {
  const [packingList, setPackingList] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isQueryModalOpen, setIsQueryModalOpen] = useState(false);
  const [queryForm, setQueryForm] = useState({ name: '', whatsappNumber: '', planningTime: '1-3 Months' });
  const [querySubmitted, setQuerySubmitted] = useState(false);
  const [activeDay, setActiveDay] = useState<number | null>(1);


  const sortedReviews = useMemo(() => {
    return [...trip.reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [trip.reviews]);

  const pageUrl = window.location.href;
  const shareText = `Check out this amazing motorcycle tour: ${trip.title}!`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedText = encodeURIComponent(shareText);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;
  const whatsappShareUrl = `https://api.whatsapp.com/send?text=${encodedText}%20${encodedUrl}`;
  const instagramShareUrl = `https://www.instagram.com`;


  const goToThumbnail = (index: number) => {
    setCurrentIndex(index);
  };

  const goToPrevious = useCallback(() => {
    const isFirstSlide = currentIndex === 0;
    const newIndex = isFirstSlide ? trip.gallery.length - 1 : currentIndex - 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, trip.gallery.length]);

  const goToNext = useCallback(() => {
    const isLastSlide = currentIndex === trip.gallery.length - 1;
    const newIndex = isLastSlide ? 0 : currentIndex + 1;
    setCurrentIndex(newIndex);
  }, [currentIndex, trip.gallery.length]);

  const difficultyColors = {
    Intermediate: 'bg-yellow-100 text-yellow-800 ring-yellow-600/20 dark:bg-yellow-900/50 dark:text-yellow-300 dark:ring-yellow-400/20',
    Advanced: 'bg-orange-100 text-orange-800 ring-orange-600/20 dark:bg-orange-900/50 dark:text-orange-300 dark:ring-orange-400/20',
    Expert: 'bg-red-100 text-red-800 ring-red-600/20 dark:bg-red-900/50 dark:text-red-300 dark:ring-red-400/20',
  };

  const handleGenerateList = useCallback(async () => {
    setIsLoading(true);
    setError('');
    setPackingList('');
    try {
      const list = await generatePackingList(trip);
      setPackingList(list);
    } catch (err) {
      setError('Failed to generate packing list. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  }, [trip]);
  
  const handleQueryFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setQueryForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };
  
  const handleQuerySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAddQuery({
      tripId: trip.id,
      tripTitle: trip.title,
      ...queryForm
    });
    setQuerySubmitted(true);
    setTimeout(() => {
        setIsQueryModalOpen(false);
        setQuerySubmitted(false);
        setQueryForm({ name: '', whatsappNumber: '', planningTime: '1-3 Months' });
    }, 4000);
  };

  const renderInlineMarkdown = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i} className="text-foreground dark:text-dark-foreground">{part.slice(2, -2)}</strong>;
        }
        return part;
    });
  };

  const renderMarkdown = (text: string) => {
    const lines = text.split('\n');
    const elements: React.ReactNode[] = [];
    let listItems: React.ReactNode[] = [];

    const flushList = () => {
        if (listItems.length > 0) {
            elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground dark:text-dark-muted-foreground">{listItems}</ul>);
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        if (line.startsWith('### ')) {
            flushList();
            elements.push(<h3 key={index} className="text-2xl font-bold font-display mt-6 mb-2 text-foreground dark:text-dark-foreground">{renderInlineMarkdown(line.substring(4))}</h3>);
        } else if (line.startsWith('#### ')) {
            flushList();
            elements.push(<h4 key={index} className="text-xl font-bold font-display mt-4 mb-2 text-brand-accent-gold">{renderInlineMarkdown(line.substring(5))}</h4>);
        } else if (line.startsWith('* ')) {
            listItems.push(<li key={index}>{renderInlineMarkdown(line.substring(2))}</li>);
        } else if (line.trim() !== '') {
            flushList();
            elements.push(<p key={index} className="text-muted-foreground dark:text-dark-muted-foreground leading-relaxed">{renderInlineMarkdown(line)}</p>);
        }
    });

    flushList();
    return elements;
  };

  const toggleItineraryDay = (day: number) => {
    setActiveDay(activeDay === day ? null : day);
  };


  return (
    <div className="bg-background dark:bg-dark-background">
      <SEOHead 
        title={trip.seo?.title || `${trip.title} | Motorcycle Tour`} 
        description={trip.seo?.description || trip.shortDescription} 
        keywords={trip.seo?.keywords || `motorcycle tour, ${trip.destination}, ${trip.difficulty} riding`}
        image={trip.seo?.ogImage || trip.imageUrl}
      />

      {/* Hero Gallery */}
      <section className="relative bg-black group">
          <div className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
              {trip.gallery.map((imgUrl, index) => (
                  <img
                      key={index}
                      src={imgUrl}
                      alt={`${trip.title} gallery ${index + 1}`}
                      loading={index === 0 ? 'eager' : 'lazy'}
                      className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ease-in-out ${currentIndex === index ? 'opacity-100' : 'opacity-0'}`}
                  />
              ))}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
          </div>
  
          <button onClick={onBack} className="absolute top-4 left-4 sm:top-8 sm:left-6 text-white bg-black/30 hover:bg-black/50 px-3 py-1 rounded-md text-sm transition-colors z-30">&larr; Back to all tours</button>
  
          <button onClick={goToPrevious} aria-label="Previous image" className="absolute top-1/2 left-2 sm:left-5 -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100">
              <ChevronLeftIcon className="w-6 h-6" />
          </button>
          <button onClick={goToNext} aria-label="Next image" className="absolute top-1/2 right-2 sm:right-5 -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100">
              <ChevronRightIcon className="w-6 h-6" />
          </button>
  
          <div className="absolute bottom-[90px] md:bottom-[100px] left-0 right-0 z-20 px-4">
              <div className="container mx-auto">
                  <h1 className="text-3xl md:text-5xl font-extrabold text-white font-display">{trip.title}</h1>
                  <p className="text-md md:text-lg text-white mt-2">{trip.destination} | {trip.duration} Days</p>
              </div>
          </div>
  
          {/* Thumbnail Strip */}
          <div className="absolute bottom-0 left-0 right-0 z-20 h-[90px] md:h-[100px] bg-black/50 backdrop-blur-sm">
              <div className="container mx-auto h-full px-4 flex items-center">
                  <div className="w-full overflow-x-auto">
                      <div className="flex items-center gap-3">
                          {trip.gallery.map((imgUrl, index) => (
                              <button
                                  key={index}
                                  onClick={() => goToThumbnail(index)}
                                  aria-label={`Go to image ${index + 1}`}
                                  className={`flex-shrink-0 w-20 h-14 md:w-24 md:h-16 rounded-lg overflow-hidden transition-all duration-300 transform hover:scale-105 focus:outline-none ${currentIndex === index ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-100'}`}
                              >
                                  <img src={imgUrl} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                              </button>
                          ))}
                      </div>
                  </div>
              </div>
          </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-12">
          {/* Main Content */}
          <div className="md:col-span-3">
            <h2 className="text-3xl font-bold font-display mb-4 text-foreground dark:text-dark-foreground">Tour Overview</h2>
            <div className="mb-8 prose-invert max-w-none">
              {renderMarkdown(trip.longDescription)}
            </div>

            <h2 className="text-3xl font-bold font-display mb-6 text-foreground dark:text-dark-foreground">Daily Itinerary</h2>
            <div className="space-y-3">
                {trip.itinerary.map((item) => {
                    const isOpen = activeDay === item.day;
                    return (
                        <div key={item.day} className={`border rounded-xl overflow-hidden transition-all duration-300 ${isOpen ? 'border-brand-primary/50 bg-brand-primary/5 dark:bg-brand-primary/10' : 'border-border dark:border-dark-border bg-card dark:bg-dark-card'}`}>
                            <button
                                onClick={() => toggleItineraryDay(item.day)}
                                className="w-full flex justify-between items-center p-5 text-left focus:outline-none group"
                                aria-expanded={isOpen}
                            >
                                <div className="flex items-center gap-4">
                                    <span className={`flex items-center justify-center w-8 h-8 rounded-full border transition-all duration-300 ${isOpen ? 'bg-brand-primary border-brand-primary text-white' : 'bg-transparent border-muted-foreground text-muted-foreground group-hover:border-brand-primary group-hover:text-brand-primary'}`}>
                                        {isOpen ? <MinusIcon className="w-5 h-5" /> : <PlusIcon className="w-5 h-5" />}
                                    </span>
                                    <div>
                                        <span className={`text-xs font-bold uppercase tracking-wider ${isOpen ? 'text-brand-primary' : 'text-muted-foreground dark:text-dark-muted-foreground'}`}>Day {item.day}</span>
                                        <h3 className={`font-semibold text-lg ${isOpen ? 'text-foreground dark:text-dark-foreground' : 'text-foreground dark:text-dark-foreground'}`}>{item.title}</h3>
                                    </div>
                                </div>
                            </button>
                            <div 
                                className={`grid transition-[grid-template-rows] duration-300 ease-out ${isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}
                            >
                                <div className="overflow-hidden">
                                    <div className="px-5 pb-5 pt-0 pl-[4.5rem] text-muted-foreground dark:text-dark-muted-foreground leading-relaxed">
                                        {item.description}
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>


            {trip.routeCoordinates && trip.routeCoordinates.length > 1 && (
              <>
                <h2 className="text-3xl font-bold font-display mt-12 mb-6 text-foreground dark:text-dark-foreground">Route Map</h2>
                <div className="rounded-lg overflow-hidden shadow-lg">
                  <TripRouteMap coordinates={trip.routeCoordinates} theme={theme} />
                </div>
              </>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 my-12">
              <div className="bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 p-6 rounded-r-lg">
                <h3 className="text-2xl font-bold font-display mb-4 text-green-700 dark:text-green-300">What's Included</h3>
                <ul className="space-y-3 text-muted-foreground dark:text-dark-muted-foreground">
                  {trip.inclusions.map(item => <li key={item} className="flex items-start"><CheckCircleIcon className="w-6 h-6 text-green-500 dark:text-green-400 mr-3 shrink-0 mt-0.5" /><span>{item}</span></li>)}
                </ul>
              </div>
              <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 p-6 rounded-r-lg">
                <h3 className="text-2xl font-bold font-display mb-4 text-red-700 dark:text-red-300">What's Not Included</h3>
                <ul className="space-y-3 text-muted-foreground dark:text-dark-muted-foreground">
                  {trip.exclusions.map(item => <li key={item} className="flex items-start"><XCircleIcon className="w-6 h-6 text-red-500 dark:text-red-400 mr-3 shrink-0 mt-0.5" /><span>{item}</span></li>)}
                </ul>
              </div>
            </div>

            {/* Rider Reviews Section */}
            <div className="my-12">
                <h2 className="text-3xl font-bold font-display mb-6 text-foreground dark:text-dark-foreground">Rider Reviews</h2>
                
                <div className="space-y-6">
                    {sortedReviews.length > 0 ? sortedReviews.map((review, index) => (
                        <div key={index} className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-sm border border-border dark:border-dark-border">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <p className="font-bold text-foreground dark:text-dark-foreground">{review.name}</p>
                                    <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="text-muted-foreground dark:text-dark-muted-foreground italic">"{review.comment}"</p>
                        </div>
                    )) : (
                        <p className="text-muted-foreground dark:text-dark-muted-foreground">No reviews yet for this tour.</p>
                    )}
                </div>
            </div>
            
            <h2 className="text-3xl font-bold font-display mb-4 text-foreground dark:text-dark-foreground">AI-Powered Moto Packing List</h2>
            <div className="bg-card dark:bg-dark-card p-6 rounded-lg border border-border dark:border-dark-border">
                <p className="mb-4 text-muted-foreground dark:text-dark-muted-foreground">Let our AI assistant generate a personalized packing list for your high-altitude motorcycle adventure!</p>
                <button 
                    onClick={handleGenerateList} 
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-blue-400"
                >
                    {isLoading ? 'Generating...' : 'Generate Packing List'}
                </button>
                {isLoading && <LoadingSpinner />}
                {error && <p className="text-red-500 dark:text-red-400 mt-4">{error}</p>}
                {packingList && (
                    <div className="mt-6 bg-background dark:bg-dark-background p-4 rounded shadow-inner prose prose-sm max-w-none dark:prose-invert">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{packingList}</pre>
                    </div>
                )}
            </div>

          </div>

          {/* Sidebar */}
          <aside className="md:col-span-1">
            <div className="sticky top-24 bg-card dark:bg-dark-card p-6 md:p-8 rounded-lg shadow-md border border-border dark:border-dark-border">
              <p className="text-3xl font-bold text-foreground dark:text-dark-foreground">₹{trip.price.toLocaleString('en-IN')}<span className="text-base font-normal text-muted-foreground dark:text-dark-muted-foreground">/person</span></p>
              <div className="mt-4">
                  <h4 className="font-semibold mb-2 text-muted-foreground dark:text-dark-muted-foreground">Difficulty</h4>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ring-1 ring-inset ${difficultyColors[trip.difficulty]}`}>{trip.difficulty}</span>
              </div>
              <button onClick={() => onBookNow(trip)} className="mt-6 w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 rounded-lg text-lg transition-transform transform hover:scale-105">
                Book This Tour
              </button>
              <button onClick={() => setIsQueryModalOpen(true)} className="mt-3 w-full flex items-center justify-center gap-2 border-2 border-brand-primary text-brand-primary font-bold py-2.5 rounded-lg text-md transition-all hover:bg-brand-primary hover:text-white">
                <DownloadIcon className="w-5 h-5"/>
                <span>Download Itinerary</span>
              </button>
              <div className="mt-8">
                <h4 className="font-semibold mb-2 text-muted-foreground dark:text-dark-muted-foreground">Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {trip.activities.map(activity => (
                    <span key={activity} className="bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs font-medium px-2.5 py-1.5 rounded-full capitalize">{activity}</span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-border dark:border-dark-border text-center">
                  <h4 className="font-semibold mb-3 text-muted-foreground dark:text-dark-muted-foreground">Share This Adventure</h4>
                  <div className="flex justify-center items-center gap-4 text-muted-foreground dark:text-dark-muted-foreground">
                      <a href={whatsappShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on WhatsApp" className="hover:text-green-500 transition-colors">
                          <WhatsAppIcon className="w-7 h-7" />
                      </a>
                      <a href={facebookShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook" className="hover:text-blue-500 transition-colors">
                          <FacebookIcon className="w-7 h-7" />
                      </a>
                      <a href={twitterShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter" className="hover:text-sky-400 transition-colors">
                          <TwitterIcon className="w-7 h-7" />
                      </a>
                      <a href={instagramShareUrl} target="_blank" rel="noopener noreferrer" aria-label="Share on Instagram" className="hover:text-pink-500 transition-colors">
                          <InstagramIcon className="w-7 h-7" />
                      </a>
                  </div>
              </div>

            </div>
          </aside>
        </div>
      </div>

      {isQueryModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setIsQueryModalOpen(false)}>
            <div className="bg-card dark:bg-dark-card p-8 rounded-lg shadow-xl max-w-lg w-full mx-4 relative transform transition-all border border-border dark:border-dark-border" onClick={e => e.stopPropagation()}>
                <button onClick={() => setIsQueryModalOpen(false)} className="absolute top-4 right-4 text-muted-foreground dark:text-dark-muted-foreground hover:text-foreground dark:hover:text-dark-foreground" aria-label="Close modal"><XIcon className="w-6 h-6" /></button>
                
                {querySubmitted ? (
                    <div className="text-center py-8">
                        <CheckCircleIcon className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold font-display text-foreground dark:text-dark-foreground">Thank You!</h3>
                        <p className="text-muted-foreground dark:text-dark-muted-foreground mt-2">Your inquiry has been sent. An admin will contact you on WhatsApp shortly. You can now download the itinerary.</p>
                        <a href="#" onClick={(e) => { e.preventDefault(); alert("Actual PDF download would start here!"); }} className="mt-6 inline-block bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-8 rounded-md">Download Now</a>
                    </div>
                ) : (
                    <>
                        <h3 className="text-2xl font-bold font-display text-foreground dark:text-dark-foreground mb-2">Get The Full Itinerary</h3>
                        <p className="text-muted-foreground dark:text-dark-muted-foreground mb-6">Just enter your details below and we'll connect with you on WhatsApp to share the detailed PDF itinerary.</p>
                        <form onSubmit={handleQuerySubmit} className="space-y-4">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Full Name</label>
                                <input type="text" name="name" id="name" value={queryForm.name} onChange={handleQueryFormChange} required className="mt-1 w-full p-2 border rounded bg-background dark:bg-dark-background border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary text-foreground dark:text-dark-foreground"/>
                            </div>
                            <div>
                                <label htmlFor="whatsappNumber" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">WhatsApp Number</label>
                                <input type="tel" name="whatsappNumber" id="whatsappNumber" value={queryForm.whatsappNumber} onChange={handleQueryFormChange} required placeholder="+91 98765 43210" className="mt-1 w-full p-2 border rounded bg-background dark:bg-dark-background border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary text-foreground dark:text-dark-foreground"/>
                            </div>
                            <div>
                                <label htmlFor="planningTime" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">When are you planning to travel?</label>
                                <select name="planningTime" id="planningTime" value={queryForm.planningTime} onChange={handleQueryFormChange} className="mt-1 w-full p-2 border rounded border-border dark:border-dark-border bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground focus:ring-brand-primary focus:border-brand-primary">
                                    <option>1-3 Months</option>
                                    <option>3-6 Months</option>
                                    <option>6+ Months</option>
                                    <option>Just Researching</option>
                                </select>
                            </div>
                            <button type="submit" className="w-full bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-4 rounded-md transition-colors">Submit & Get Itinerary</button>
                        </form>
                    </>
                )}
            </div>
        </div>
      )}
    </div>
  );
};

export default TripDetailPage;
