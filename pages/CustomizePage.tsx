import React, { useState } from 'react';
import type { Trip } from '../types';
import { generateCustomItinerary } from '../services/geminiService';
import LoadingSpinner from '../components/LoadingSpinner';

const SparklesIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M9 4.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm6 0a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-3.75 7.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-6-3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm12-3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-3.75 10.5a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm-6-3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Zm12-3a.75.75 0 0 1 .75.75v1.5a.75.75 0 0 1-1.5 0v-1.5a.75.75 0 0 1 .75-.75Z" clipRule="evenodd" />
    </svg>
);


interface CustomizePageProps {
    onNavigateContact: () => void;
    trips: Trip[];
}

const CustomizePage: React.FC<CustomizePageProps> = ({ onNavigateContact, trips }) => {
    const [formData, setFormData] = useState({
        travelers: '2',
        duration: '10',
        destinations: 'Ladakh, Spiti Valley',
        style: 'Adventure Focused',
        interests: 'High passes like Khardung La, ancient monasteries like Key & Diskit, and pristine lakes like Pangong Tso.'
    });
    const [isLoading, setIsLoading] = useState(false);
    const [generatedItinerary, setGeneratedItinerary] = useState('');
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setGeneratedItinerary('');
        try {
            const itinerary = await generateCustomItinerary(formData, trips);
            setGeneratedItinerary(itinerary);
        } catch (err: any) {
            setError(err.message || 'An unexpected error occurred.');
            console.error(err);
        } finally {
            setIsLoading(false);
            const resultsSection = document.getElementById('results-section');
            if (resultsSection) {
                setTimeout(() => resultsSection.scrollIntoView({ behavior: 'smooth' }), 100);
            }
        }
    };
    
    const handleStartOver = () => {
        setGeneratedItinerary('');
        setError('');
    };
    
    const renderMarkdown = (text: string) => {
        const parts = text.split(/(\n)/).map(part => part.trim());
        const elements: React.ReactNode[] = [];
        let listItems: string[] = [];
    
        const flushList = () => {
            if (listItems.length > 0) {
                elements.push(
                    <ul key={`ul-${elements.length}`} className="list-disc list-inside space-y-2 my-4 pl-4 text-muted-foreground dark:text-dark-muted-foreground">
                        {listItems.map((item, i) => <li key={i}>{item}</li>)}
                    </ul>
                );
                listItems = [];
            }
        };
    
        parts.forEach((line, index) => {
            if (line.startsWith('# ')) {
                elements.push(<h1 key={index} className="text-3xl font-bold font-display text-foreground dark:text-dark-foreground mb-4">{line.substring(2)}</h1>);
            } else if (line.startsWith('### ')) {
                elements.push(<h3 key={index} className="text-xl font-semibold text-foreground dark:text-dark-foreground mt-6 mb-2">{line.substring(4)}</h3>);
            } else if (line.startsWith('* ')) {
                listItems.push(line.substring(2));
            } else if (line) {
                flushList();
                elements.push(<p key={index} className="text-muted-foreground dark:text-dark-muted-foreground leading-relaxed mb-4">{line}</p>);
            }
        });
    
        flushList();
        return elements;
    };


    return (
        <div className="bg-background dark:bg-dark-background">
            <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/ladakh-customize-hero/1920/1080')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display text-center">AI-Powered Trip Planner</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-display text-foreground dark:text-dark-foreground">Design Your Dream Adventure</h2>
                    <p className="mt-4 text-lg text-muted-foreground dark:text-dark-muted-foreground">Tell our AI assistant your vision for the perfect Himalayan motorcycle tour. It will craft a custom-tailored preliminary itinerary just for you.</p>
                </div>
                
                {!generatedItinerary && (
                    <form onSubmit={handleSubmit} className="bg-card dark:bg-dark-card p-6 md:p-8 rounded-lg shadow-lg space-y-6 border border-border dark:border-dark-border">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="travelers" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Number of Riders</label>
                                <input type="number" name="travelers" id="travelers" value={formData.travelers} onChange={handleInputChange} min="1" required className="mt-1 block w-full px-3 py-2 border border-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground"/>
                            </div>
                             <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Desired Trip Duration (days)</label>
                                <input type="number" name="duration" id="duration" value={formData.duration} onChange={handleInputChange} min="3" max="30" required className="mt-1 block w-full px-3 py-2 border border-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="destinations" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Preferred Destinations / Regions</label>
                            <input type="text" name="destinations" id="destinations" value={formData.destinations} onChange={handleInputChange} placeholder="e.g., Ladakh, Spiti, Zanskar, Kashmir" required className="mt-1 block w-full px-3 py-2 border border-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground"/>
                        </div>
                        <div>
                            <label htmlFor="style" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Preferred Travel Style</label>
                            <select name="style" id="style" value={formData.style} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
                                <option>Adventure Focused</option>
                                <option>Leisure & Sightseeing</option>
                                <option>Cultural Immersion</option>
                                <option>Photography Focused</option>
                                <option>A Mix of Everything</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="interests" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">What are you most excited to see or do?</label>
                            <textarea name="interests" id="interests" value={formData.interests} onChange={handleInputChange} placeholder="Tell us about your must-see places, activities, or any special requests." rows={4} required className="mt-1 block w-full px-3 py-2 border border-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground"></textarea>
                        </div>
                        <div>
                            <button type="submit" disabled={isLoading} className="w-full flex items-center justify-center gap-2 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-lg disabled:bg-brand-primary/50">
                                <SparklesIcon className="w-6 h-6"/>
                                {isLoading ? 'Crafting Your Adventure...' : 'Generate My Itinerary'}
                            </button>
                        </div>
                    </form>
                )}
                
                <div id="results-section" className="mt-12">
                    {isLoading && <LoadingSpinner />}
                    {error && (
                         <div className="bg-red-100 dark:bg-red-900/20 border-l-4 border-red-500 p-4 rounded-md text-center">
                            <h3 className="text-lg font-medium text-red-800 dark:text-red-200">Something went wrong</h3>
                            <p className="mt-2 text-sm text-red-700 dark:text-red-300">{error}</p>
                            <button onClick={handleStartOver} className="mt-4 text-sm font-semibold text-red-800 dark:text-red-200 hover:underline">Try Again</button>
                         </div>
                    )}
                    {generatedItinerary && (
                         <div className="bg-card dark:bg-dark-card p-6 md:p-8 rounded-lg shadow-lg border border-border dark:border-dark-border">
                            {renderMarkdown(generatedItinerary)}

                            <div className="mt-8 pt-8 border-t border-border dark:border-dark-border text-center">
                                <h3 className="text-2xl font-bold font-display text-foreground dark:text-dark-foreground">Ready for the Next Step?</h3>
                                <p className="mt-4 text-lg text-muted-foreground dark:text-dark-muted-foreground max-w-2xl mx-auto">Like what you see? Contact our experts to get a detailed quote, make adjustments, and book your unforgettable Himalayan adventure.</p>
                                <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-4">
                                    <button 
                                        onClick={onNavigateContact}
                                        className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        Request a Quote
                                    </button>
                                     <button 
                                        onClick={handleStartOver}
                                        className="bg-slate-500 hover:bg-slate-600 dark:bg-slate-700 dark:hover:bg-slate-800 text-white font-bold py-3 px-8 rounded-full transition-transform duration-300 transform hover:scale-105 shadow-lg"
                                    >
                                        Start Over
                                    </button>
                                </div>
                            </div>
                         </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CustomizePage;