import React, { useState, useCallback, useMemo } from 'react';
import type { Trip, Review } from '../types';
import { generatePackingList } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';

interface TripDetailPageProps {
  trip: Trip;
  onBookNow: (trip: Trip) => void;
  onBack: () => void;
}

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

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.135-.662 1.456 0l1.86 3.847 4.25.618c.73.107 1.022.992.494 1.505l-3.076 2.998.726 4.232c.124.725-.638 1.282-1.28.948L10 15.347l-3.818 2.007c-.642.335-1.404-.223-1.28-.948l.726-4.232L2.55 8.854c-.528-.513-.236-1.398.494-1.505l4.25-.618 1.86-3.847z" clipRule="evenodd" />
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
                    <StarIcon className={`${size} transition-colors ${(hoverRating >= star || rating >= star) ? 'text-yellow-400' : 'text-gray-300'}`} />
                </button>
            ))}
        </div>
    );
};


const TripDetailPage: React.FC<TripDetailPageProps> = ({ trip, onBookNow, onBack }) => {
  const [packingList, setPackingList] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const sortedReviews = useMemo(() => {
    return [...trip.reviews].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [trip.reviews]);

  const pageUrl = window.location.href;
  const shareText = `Check out this amazing motorcycle tour: ${trip.title}!`;
  const encodedUrl = encodeURIComponent(pageUrl);
  const encodedText = encodeURIComponent(shareText);

  const facebookShareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`;
  const twitterShareUrl = `https://twitter.com/intent/tweet?url=${encodedUrl}&text=${encodedText}`;

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
      Intermediate: 'bg-yellow-100 text-yellow-800',
      Advanced: 'bg-orange-100 text-orange-800',
      Expert: 'bg-red-100 text-red-800',
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
  
  const renderInlineMarkdown = (text: string): React.ReactNode => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**')) {
            return <strong key={i}>{part.slice(2, -2)}</strong>;
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
            elements.push(<ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4 text-slate-600">{listItems}</ul>);
            listItems = [];
        }
    };

    lines.forEach((line, index) => {
        if (line.startsWith('### ')) {
            flushList();
            elements.push(<h3 key={index} className="text-2xl font-bold font-display mt-6 mb-2 text-slate-800">{renderInlineMarkdown(line.substring(4))}</h3>);
        } else if (line.startsWith('#### ')) {
            flushList();
            elements.push(<h4 key={index} className="text-xl font-bold font-display mt-4 mb-2 text-slate-800">{renderInlineMarkdown(line.substring(5))}</h4>);
        } else if (line.startsWith('* ')) {
            listItems.push(<li key={index}>{renderInlineMarkdown(line.substring(2))}</li>);
        } else if (line.trim() !== '') {
            flushList();
            elements.push(<p key={index} className="text-slate-600 leading-relaxed">{renderInlineMarkdown(line)}</p>);
        }
    });

    flushList();
    return elements;
  };


  return (
    <div className="bg-white">
      {/* Hero */}
      <div 
        className="relative h-[50vh] bg-cover bg-center group" 
        style={{ 
          backgroundImage: `url(${trip.gallery[currentIndex]})`,
          transition: 'background-image 0.5s ease-in-out'
        }}
      >
        <div className="absolute inset-0 bg-black/40"></div>
        
        <button onClick={goToPrevious} aria-label="Previous image" className="absolute top-1/2 left-5 -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100">
            <ChevronLeftIcon className="w-6 h-6" />
        </button>
        <button onClick={goToNext} aria-label="Next image" className="absolute top-1/2 right-5 -translate-y-1/2 z-30 bg-black/30 text-white p-2 rounded-full hover:bg-black/50 transition-all opacity-0 group-hover:opacity-100">
            <ChevronRightIcon className="w-6 h-6" />
        </button>
        
        <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-12 relative z-10">
          <button onClick={onBack} className="absolute top-8 left-6 text-white bg-black/30 hover:bg-black/50 px-3 py-1 rounded-md text-sm transition-colors z-20">&larr; Back to all tours</button>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">{trip.title}</h1>
          <p className="text-lg text-white mt-2">{trip.destination} | {trip.duration} Days</p>
        </div>
        
        <div className="absolute bottom-5 left-0 right-0 z-20 flex items-center justify-center gap-2">
          {trip.gallery.map((_, slideIndex) => (
            <button
              key={slideIndex}
              onClick={() => setCurrentIndex(slideIndex)}
              aria-label={`Go to slide ${slideIndex + 1}`}
              className={`w-2.5 h-2.5 rounded-full ${currentIndex === slideIndex ? 'bg-white' : 'bg-white/50'} hover:bg-white transition-colors`}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <h2 className="text-3xl font-bold font-display mb-4">Tour Overview</h2>
            <div className="mb-8 prose max-w-none text-slate-600">
              {renderMarkdown(trip.longDescription)}
            </div>

            <h2 className="text-3xl font-bold font-display mb-6">Daily Itinerary</h2>
            <div className="space-y-6 border-l-2 border-orange-200 ml-3">
              {trip.itinerary.map(item => (
                <div key={item.day} className="relative pl-8">
                  <div className="absolute -left-[11px] top-1 w-5 h-5 bg-orange-500 rounded-full border-4 border-white"></div>
                  <h3 className="font-semibold text-lg text-slate-800">Day {item.day}: {item.title}</h3>
                  <p className="text-slate-600">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-12">
              <div>
                <h3 className="text-2xl font-bold font-display mb-4">What's Included</h3>
                <ul className="space-y-2">
                  {trip.inclusions.map(item => <li key={item} className="flex items-start"><CheckCircleIcon className="w-5 h-5 text-green-500 mr-2 shrink-0 mt-1" />{item}</li>)}
                </ul>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-display mb-4">What's Not Included</h3>
                <ul className="space-y-2">
                  {trip.exclusions.map(item => <li key={item} className="flex items-start"><XCircleIcon className="w-5 h-5 text-red-500 mr-2 shrink-0 mt-1" />{item}</li>)}
                </ul>
              </div>
            </div>

            {/* Rider Reviews Section */}
            <div className="my-12">
                <h2 className="text-3xl font-bold font-display mb-6">Rider Reviews</h2>
                
                <div className="space-y-6">
                    {sortedReviews.length > 0 ? sortedReviews.map((review, index) => (
                        <div key={index} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
                            <div className="flex items-center justify-between mb-2">
                                <div>
                                    <p className="font-bold text-slate-800">{review.name}</p>
                                    <p className="text-xs text-slate-500">{new Date(review.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                </div>
                                <StarRating rating={review.rating} />
                            </div>
                            <p className="text-slate-600 italic">"{review.comment}"</p>
                        </div>
                    )) : (
                        <p className="text-slate-500">No reviews yet for this tour.</p>
                    )}
                </div>
            </div>
            
            <h2 className="text-3xl font-bold font-display mb-4">AI-Powered Moto Packing List</h2>
            <div className="bg-gray-100 p-6 rounded-lg">
                <p className="mb-4 text-slate-600">Let our AI assistant generate a personalized packing list for your high-altitude motorcycle adventure!</p>
                <button 
                    onClick={handleGenerateList} 
                    disabled={isLoading}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-md transition-colors disabled:bg-blue-300"
                >
                    {isLoading ? 'Generating...' : 'Generate Packing List'}
                </button>
                {isLoading && <LoadingSpinner />}
                {error && <p className="text-red-500 mt-4">{error}</p>}
                {packingList && (
                    <div className="mt-6 bg-white p-4 rounded shadow-inner prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap font-sans text-sm leading-relaxed">{packingList}</pre>
                    </div>
                )}
            </div>

          </div>

          {/* Sidebar */}
          <aside className="lg:col-span-1">
            <div className="sticky top-28 bg-gray-50 p-8 rounded-lg shadow-md">
              <p className="text-3xl font-bold text-slate-800">${trip.price}<span className="text-base font-normal text-slate-500">/person</span></p>
              <div className="mt-4">
                  <h4 className="font-semibold mb-2">Difficulty</h4>
                  <span className={`text-sm font-bold px-3 py-1 rounded-full ${difficultyColors[trip.difficulty]}`}>{trip.difficulty}</span>
              </div>
              <button onClick={() => onBookNow(trip)} className="mt-6 w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 rounded-lg text-lg transition-transform transform hover:scale-105">
                Book This Tour
              </button>
              <div className="mt-8">
                <h4 className="font-semibold mb-2">Activities</h4>
                <div className="flex flex-wrap gap-2">
                  {trip.activities.map(activity => (
                    <span key={activity} className="bg-orange-100 text-orange-800 text-xs font-medium px-2.5 py-1.5 rounded-full capitalize">{activity}</span>
                  ))}
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-gray-200">
                <h4 className="font-semibold mb-3 text-center text-slate-600">Share This Adventure</h4>
                <div className="flex justify-center items-center gap-4">
                  <a 
                    href={facebookShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Facebook"
                    className="text-gray-500 hover:text-blue-600 transition-colors"
                  >
                    <FacebookIcon className="w-8 h-8" />
                  </a>
                  <a 
                    href={twitterShareUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Share on Twitter"
                    className="text-gray-500 hover:text-sky-500 transition-colors"
                  >
                    <TwitterIcon className="w-8 h-8" />
                  </a>
                </div>
              </div>

            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default TripDetailPage;