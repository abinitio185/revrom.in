
import React, { useState } from 'react';

const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);

const CustomizePage: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        travelers: 1,
        duration: 10,
        destinations: '',
        style: 'Adventure Focused',
        message: ''
    });
    const [submitted, setSubmitted] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, this would send data to a backend or email service
        console.log('Custom tour inquiry submitted:', formData);
        setSubmitted(true);
    };

    return (
        <div className="bg-white">
            <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/ladakh-customize-hero/1920/1080')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container mx-auto px-6 h-full flex items-center justify-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display text-center">Design Your Dream Adventure</h1>
                </div>
            </div>

            <div className="container mx-auto px-6 py-16 max-w-4xl">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold font-display text-slate-800">Tell Us Your Vision</h2>
                    <p className="mt-4 text-lg text-slate-600">Use the form below to outline your perfect Himalayan motorcycle tour. We'll get back to you with a custom itinerary and quote.</p>
                </div>
                
                {submitted ? (
                    <div className="bg-green-50 border-l-4 border-green-400 p-6 rounded-md shadow-md text-center">
                        <CheckCircleIcon className="h-12 w-12 text-green-400 mx-auto mb-4" />
                        <h3 className="text-2xl font-bold font-display text-green-800">Inquiry Sent!</h3>
                        <p className="mt-2 text-green-700">Thank you for sharing your dream trip with us. Our travel experts are on it and will contact you via email within 48 hours to start planning.</p>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="bg-gray-50 p-8 rounded-lg shadow-lg space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                                <input type="text" name="name" id="name" value={formData.name} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
                            </div>
                             <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                                <input type="email" name="email" id="email" value={formData.email} onChange={handleInputChange} required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
                            </div>
                        </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="travelers" className="block text-sm font-medium text-slate-700">Number of Riders</label>
                                <input type="number" name="travelers" id="travelers" value={formData.travelers} onChange={handleInputChange} min="1" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
                            </div>
                             <div>
                                <label htmlFor="duration" className="block text-sm font-medium text-slate-700">Desired Trip Duration (days)</label>
                                <input type="number" name="duration" id="duration" value={formData.duration} onChange={handleInputChange} min="3" required className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"/>
                            </div>
                        </div>
                        <div>
                            <label htmlFor="destinations" className="block text-sm font-medium text-slate-700">Preferred Destinations / Regions of Interest</label>
                            <textarea name="destinations" id="destinations" value={formData.destinations} onChange={handleInputChange} placeholder="e.g., Ladakh, Spiti, Zanskar, Kashmir" required rows={3} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                        </div>
                        <div>
                            <label htmlFor="style" className="block text-sm font-medium text-slate-700">Preferred Travel Style</label>
                            <select name="style" id="style" value={formData.style} onChange={handleInputChange} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500">
                                <option>Adventure Focused</option>
                                <option>Leisure & Sightseeing</option>
                                <option>Cultural Immersion</option>
                                <option>Photography Focused</option>
                                <option>A Mix of Everything</option>
                            </select>
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-700">Anything Else We Should Know?</label>
                            <textarea name="message" id="message" value={formData.message} onChange={handleInputChange} placeholder="Tell us about your ideal bike, specific places you want to see, or any other special requests." rows={5} className="mt-1 block w-full px-3 py-2 border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500"></textarea>
                        </div>
                        <div>
                            <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-lg">
                                Submit Inquiry
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default CustomizePage;
