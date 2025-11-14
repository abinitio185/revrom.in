
import React, { useState } from 'react';
import type { Trip } from '../types';

interface BookingPageProps {
  trip: Trip;
  onBack: () => void;
}

const WhatsAppIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.29 4.93L2 22l5.25-1.38c1.41.78 2.99 1.21 4.68 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM12.04 20.15h-.01c-1.48 0-2.92-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31c-.82-1.31-1.26-2.82-1.26-4.38 0-4.41 3.58-7.99 7.99-7.99s7.99 3.58 7.99 7.99-3.58 7.99-7.99 7.99z" />
        <path d="M9.25 7.35c-.19-.05-.44-.12-.66-.23-.22-.11-.47-.16-.67-.16-.25 0-.48.08-.68.23-.2.15-.33.32-.46.51-.13.19-.26.4-.38.63-.12.23-.23.47-.33.73-.1.26-.2.54-.27.84-.07.3-.13.61-.16.94-.03.33-.04.67-.04 1.02 0 .35.01.7.04 1.04.03.34.09.67.16 1 .07.33.17.65.29.95s.26.59.42.86c.16.27.34.52.54.76.2.24.42.46.66.66.24.2.5.38.77.54.27.16.56.3.85.42.29.12.59.22.9.3.31.08.62.15.94.19.32.04.64.07.97.08.33.01.66.02.99.02.33 0 .66-.01.99-.02.32-.01.64-.04.95-.08.31-.04.62-.1.92-.19.3-.09.6-.2.88-.33.28-.13.56-.28.81-.45.25-.17.49-.37.7-.58.21-.21.4-.44.56-.69.16-.25.3-.52.41-.8.11-.28.2-.57.26-.88.06-.31.1-.62.13-.94.03-.32.04-.65.04-.98 0-.33-.01-.66-.04-.98-.03-.32-.09-.64-.15-.95-.06-.31-.15-.61-.25-.9-.1-.29-.22-.57-.36-.84s-.3-.54-.47-.79c-.17-.25-.36-.48-.57-.69-.21-.21-.44-.39-.69-.54-.25-.15-.52-.28-.8-.38-.28-.1-.57-.18-.87-.24-.3-.06-.61-.1-.92-.12-.31-.02-.63-.03-.95-.03-1.38 0-2.69.24-3.91.71zm5.2 9.5c-.11.19-.24.36-.39.51s-.32.28-.51.39c-.19.11-.4.2-.62.27-.22.07-.45.13-.69.16-.24.03-.49.05-.73.05-.93 0-1.81-.19-2.61-.56-.8-.37-1.51-.88-2.12-1.5-.61-.62-1.12-1.33-1.5-2.12-.38-.8-.57-1.68-.57-2.61 0-.49.06-.97.17-1.44.11-.47.28-.92.49-1.34.21-.42.47-.81.77-1.15.3-.34.64-.63 1.01-.86.37-.23.77-.41 1.18-.53.41-.12.83-.18 1.25-.18.41 0 .82.06 1.21.17s.77.28 1.12.49c.35.21.67.47.95.77.28.3.52.64.71 1.01.19.37.33.76.43 1.17.1.41.15.83.15 1.25 0 .46-.06.91-.17 1.35-.11.44-.28.86-.5 1.26-.22.4-.48.77-.79 1.1-.31.33-.66.62-1.04.85z" />
    </svg>
);

const BookingPage: React.FC<BookingPageProps> = ({ trip, onBack }) => {
  const [travelers, setTravelers] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreedToTerms) {
        alert("Please agree to the Terms & Conditions before booking.");
        return;
    }
    
    const phoneNumber = '919876543210'; // Your WhatsApp number without '+' or ' '
    const message = `Hello Revrom.in,
I'm interested in the "${trip.title}" tour.

Here are my details:
Name: ${name}
Email: ${email}
Number of Riders: ${travelers}

Please get back to me with more information regarding booking.
`;
    
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
    <div className="container mx-auto px-4 sm:px-6 py-8 md:py-16">
        <button onClick={onBack} className="text-slate-600 hover:text-orange-500 mb-8">&larr; Back to Tour Details</button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-8">Send a Booking Inquiry</h1>
                <form onSubmit={handleSubmit} className="bg-white p-6 md:p-8 rounded-lg shadow-lg space-y-6">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                        <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="Your Name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                        <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm" placeholder="you@example.com" />
                    </div>
                    <div>
                        <label htmlFor="travelers" className="block text-sm font-medium text-slate-700">Number of Riders</label>
                        <input type="number" id="travelers" value={travelers} onChange={e => setTravelers(Math.max(1, parseInt(e.target.value, 10)))} min="1" className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                    </div>
                    <div className="flex items-center">
                        <input type="checkbox" id="terms" checked={agreedToTerms} onChange={e => setAgreedToTerms(e.target.checked)} className="h-4 w-4 text-orange-600 focus:ring-orange-500 border-gray-300 rounded"/>
                        <label htmlFor="terms" className="ml-2 block text-sm text-slate-900">
                            I agree to the <button type="button" onClick={() => setIsTermsModalOpen(true)} className="underline font-medium hover:text-orange-600">Terms & Conditions</button>.
                        </label>
                    </div>
                    <div>
                        <button type="submit" className="w-full sm:w-auto flex items-center justify-center space-x-2 bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-lg">
                            <WhatsAppIcon className="w-6 h-6" />
                            <span>Inquire on WhatsApp</span>
                        </button>
                    </div>
                </form>
            </div>
            <aside className="md:col-span-1">
                 <div className="sticky top-28 bg-gray-50 p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-bold font-display mb-4">Tour Summary</h2>
                    <img src={trip.imageUrl} alt={trip.title} className="w-full h-40 object-cover rounded-md mb-4" loading="lazy"/>
                    <h3 className="text-xl font-semibold text-slate-800">{trip.title}</h3>
                    <p className="text-slate-500">{trip.destination}</p>
                    <div className="mt-4 border-t border-gray-200 pt-4 space-y-2">
                        <div className="flex justify-between">
                            <span className="font-medium text-slate-600">Duration:</span>
                            <span className="font-bold">{trip.duration} Days</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-slate-600">Price per rider:</span>
                            <span className="font-bold">₹{trip.price.toLocaleString('en-IN')}</span>
                        </div>
                         <div className="flex justify-between text-lg">
                            <span className="font-semibold text-slate-700">Total (for {travelers} rider{travelers > 1 ? 's' : ''}):</span>
                            <span className="font-extrabold text-orange-600">₹{(trip.price * travelers).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-slate-500">This is an inquiry, not a confirmed booking. Our team will contact you via WhatsApp to finalize the details and payment.</p>
                 </div>
            </aside>
        </div>
    </div>

    {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={() => setIsTermsModalOpen(false)}>
            <div className="bg-white p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">Terms & Conditions</h2>
                <div className="prose prose-sm max-w-none text-slate-600">
                    <p>This is a placeholder for the full Terms & Conditions. In a real application, this would contain important information about booking, cancellation policies, liability, safety requirements, and more.</p>
                    <p>Key points would include:</p>
                    <ul>
                        <li>Payment schedules and what's included/excluded.</li>
                        <li>Cancellation and refund policies.</li>
                        <li>Required documents (license, passport, visa, insurance).</li>
                        <li>Riding gear requirements (helmet, jacket, etc.).</li>
                        <li>Code of conduct and safety rules.</li>
                        <li>Assumption of risk and liability waiver.</li>
                    </ul>
                </div>
                <button onClick={() => { setAgreedToTerms(true); setIsTermsModalOpen(false); }} className="mt-6 bg-orange-500 text-white font-bold py-2 px-4 rounded-md">
                    I Understand and Agree
                </button>
            </div>
        </div>
    )}
    </>
  );
};

export default BookingPage;
