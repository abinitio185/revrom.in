
import React, { useState, useCallback, useMemo } from 'react';
import type { Trip, ItineraryQuery } from '../types';
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

const TripDetailPage: React.FC<TripDetailPageProps> = ({ trip, onBookNow, onBack, onAddQuery, theme }) => {
  const [packingList, setPackingList] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [activeDay, setActiveDay] = useState<number | null>(1);

  const difficultyColors = {
    Intermediate: 'bg-emerald-100 text-emerald-800 ring-emerald-600/20',
    Advanced: 'bg-orange-100 text-orange-800 ring-orange-600/20',
    Expert: 'bg-red-100 text-red-800 ring-red-600/20',
  };

  const handleGenerateList = async () => {
    setIsLoading(true);
    try {
      const list = await generatePackingList(trip);
      setPackingList(list);
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-background pt-24">
      <SEOHead 
        title={`${trip.title} | Revrom Expeditions`} 
        description={trip.shortDescription} 
        image={trip.imageUrl}
      />

      <div className="container mx-auto px-6 py-12">
        <button onClick={onBack} className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-12 hover:underline">&larr; Back to Expeditions</button>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-16">
          {/* Main Display */}
          <div className="lg:col-span-8 space-y-12 md:space-y-16">
            <div className="space-y-6">
                <div className="flex flex-wrap items-center gap-3">
                    <span className={`text-[9px] md:text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full ring-1 ring-inset ${difficultyColors[trip.difficulty]}`}>{trip.difficulty} Difficulty</span>
                    <span className="text-[9px] md:text-[10px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">{trip.duration} Day Journey</span>
                </div>
                <h1 className="text-4xl md:text-7xl font-black uppercase tracking-tighter leading-[1.1] md:leading-[0.9]">{trip.title}</h1>
                <p className="text-xl md:text-2xl font-bold text-brand-primary italic">{trip.destination}</p>
            </div>

            <div className="relative aspect-[4/3] md:aspect-[16/9] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl group">
                <img src={trip.gallery[currentIndex]} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt="Hero" />
                <div className="absolute inset-x-0 bottom-0 p-6 md:p-8 flex justify-center gap-2 md:gap-3">
                    {trip.gallery.map((_, i) => (
                        <button key={i} onClick={() => setCurrentIndex(i)} className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all ${currentIndex === i ? 'bg-brand-primary scale-125' : 'bg-white/50 hover:bg-white'}`}></button>
                    ))}
                </div>
            </div>

            <div className="space-y-6 md:space-y-8 prose dark:prose-invert max-w-none">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">The Journey</h2>
                <div className="text-base md:text-lg font-medium text-slate-600 dark:text-slate-400 leading-relaxed space-y-4">
                    {trip.longDescription.split('\n\n').map((para, i) => (
                      <p key={i}>{para}</p>
                    ))}
                </div>
            </div>

            <div className="space-y-6 md:space-y-8">
                <h2 className="text-3xl md:text-4xl font-black uppercase tracking-tighter italic">Daily Logistics</h2>
                <div className="space-y-4">
                    {trip.itinerary.map(item => (
                        <div key={item.day} className={`border rounded-[2rem] overflow-hidden transition-all duration-300 ${activeDay === item.day ? 'border-brand-primary ring-1 ring-brand-primary bg-brand-primary/5 shadow-lg' : 'border-border bg-card'}`}>
                            <button onClick={() => setActiveDay(activeDay === item.day ? null : item.day)} className="w-full p-6 md:p-8 flex justify-between items-center text-left">
                                <div className="flex items-center gap-4 md:gap-6">
                                    <span className={`w-10 h-10 md:w-12 md:h-12 flex items-center justify-center rounded-xl md:rounded-2xl font-black text-lg md:text-xl transition-all ${activeDay === item.day ? 'bg-brand-primary text-white shadow-lg' : 'bg-slate-200 dark:bg-slate-800'}`}>{item.day}</span>
                                    <h3 className="text-lg md:text-xl font-black uppercase tracking-tighter">{item.title}</h3>
                                </div>
                                <svg className={`w-5 h-5 transition-transform ${activeDay === item.day ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7"/></svg>
                            </button>
                            {activeDay === item.day && (
                              <div className="px-6 pb-6 md:px-8 md:pb-8 pl-[4.5rem] md:pl-[6.5rem] text-sm md:text-base text-slate-500 font-medium leading-relaxed animate-fade-up">
                                {item.description}
                              </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white/10 h-[300px] md:h-[450px]">
                <TripRouteMap coordinates={trip.routeCoordinates} theme={theme} />
            </div>

            <div className="bg-card p-8 md:p-12 rounded-[2.5rem] md:rounded-[4rem] border border-border shadow-xl text-center">
                <h3 className="text-2xl md:text-3xl font-black uppercase tracking-tighter mb-4">Gear Up with AI</h3>
                <p className="text-sm md:text-base text-slate-500 font-medium mb-8">Generate a custom-tailored packing list specifically for the {trip.title} terrain and altitude.</p>
                <button onClick={handleGenerateList} className="w-full md:w-auto bg-foreground text-white dark:bg-white dark:text-black font-black uppercase tracking-widest px-10 py-4 rounded-xl hover:bg-brand-primary dark:hover:bg-brand-primary dark:hover:text-white transition-all shadow-xl active:scale-95">
                    {isLoading ? 'Processing...' : 'Get Packing List'}
                </button>
                {packingList && (
                    <div className="mt-8 md:mt-12 text-left bg-background p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] border border-border shadow-inner font-medium text-slate-600 dark:text-slate-400">
                        <pre className="whitespace-pre-wrap font-sans text-xs md:text-sm leading-relaxed">{packingList}</pre>
                    </div>
                )}
            </div>
          </div>

          {/* Sticky Sidebar */}
          <div className="lg:col-span-4">
            <div className="sticky top-28 space-y-6 md:space-y-8">
                <div className="bg-foreground text-white p-8 md:p-10 rounded-[2.5rem] md:rounded-[3rem] shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-6 md:p-8 opacity-10 rotate-12 transition-transform group-hover:rotate-0">
                        <svg className="w-16 h-16 md:w-20 md:h-20" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L4.5 20.29l.71.71L12 18l6.79 3 .71-.71z"/></svg>
                    </div>
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-2">Trip Investment</p>
                    <div className="flex items-baseline gap-2 mb-8">
                        <span className="text-4xl md:text-5xl font-black">₹{trip.price.toLocaleString('en-IN')}</span>
                        <span className="text-white/40 font-bold uppercase text-[9px] md:text-[10px] tracking-widest">/Traveler</span>
                    </div>
                    <button onClick={() => onBookNow(trip)} className="w-full bg-brand-primary text-white font-black uppercase tracking-widest py-4 md:py-5 rounded-xl md:rounded-2xl shadow-xl hover:scale-105 transition-all transform active:scale-95 mb-4">
                        Book Your Trip
                    </button>
                    <p className="text-[9px] md:text-[10px] text-white/40 text-center uppercase font-black tracking-[0.2em]">Limited availability for 2025</p>
                </div>

                <div className="bg-card p-6 md:p-8 rounded-[2rem] border border-border space-y-6 shadow-sm">
                    <h4 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary">Inclusions</h4>
                    <ul className="space-y-3">
                        {trip.inclusions.map(inc => (
                            <li key={inc} className="flex items-center gap-3 text-xs md:text-sm font-bold text-slate-600 dark:text-slate-400">
                                <span className="w-5 h-5 bg-emerald-500/10 text-emerald-500 rounded-full flex items-center justify-center text-[10px]">✓</span>
                                {inc}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="p-6 md:p-8 rounded-[2rem] border border-dashed border-border text-center">
                    <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.4em] mb-4">Questions?</p>
                    <button className="text-brand-primary font-black uppercase text-xs tracking-widest hover:underline active:scale-95 transition-transform">WhatsApp Expert</button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TripDetailPage;
