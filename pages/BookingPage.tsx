import React, { useState } from 'react';
import type { Trip } from '../types';

interface BookingPageProps {
  trip: Trip;
  onBack: () => void;
}

const WhatsAppIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 12c0 1.77.46 3.45 1.29 4.93L2 22l5.25-1.38c1.41.78 2.99 1.21 4.68 1.21h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2zM16.88 15.18c-.3-.15-1.76-.86-2.03-1.02-.27-.15-.47-.15-.67.15-.2.29-.76.96-.94 1.15-.17.19-.34.22-.64.07-.3-.15-1.31-.48-2.5-1.54-1.2-1.06-1.55-1.84-1.71-2.14-.15-.3-.02-.46.13-.61.13-.13.29-.35.44-.52.15-.17.2-.22.3-.37.1-.15.05-.29-.02-.44-.08-.15-.67-1.61-.92-2.19-.24-.58-.49-.5-.67-.5h-.4c-.2 0-.5.08-.76.33-.26.25-.98.96-.98 2.37 0 1.41.93 2.78 1.06 2.96.13.19 1.91 3.01 4.63 4.1.72.29 1.28.46 1.71.58.71.2 1.35.17 1.86.1.56-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.45-.08-.15-.28-.22-.58-.38z" />
    </svg>
);

const BookingPage: React.FC<BookingPageProps> = ({ trip, onBack }) => {
  const [travelers, setTravelers] = useState(1);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isTermsModalOpen, setIsTermsModalOpen] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; terms?: string }>({});

  const validate = () => {
    const newErrors: { name?: string; email?: string; terms?: string } = {};
    if (!name.trim()) {
        newErrors.name = "Full name is required.";
    }
    if (!email.trim()) {
        newErrors.email = "Email address is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
        newErrors.email = "Please enter a valid email address.";
    }
    if (!agreedToTerms) {
        newErrors.terms = "You must agree to the Terms & Conditions.";
    }
    return newErrors;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
        return;
    }
    
    const phoneNumber = '919876543210';
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
        <button onClick={onBack} className="text-muted-foreground dark:text-dark-muted-foreground hover:text-brand-primary mb-8">&larr; Back to Tour Details</button>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
                <h1 className="text-3xl md:text-4xl font-bold font-display mb-8 text-foreground dark:text-dark-foreground">Send a Booking Inquiry</h1>
                <form onSubmit={handleSubmit} className="bg-card dark:bg-dark-card p-6 md:p-8 rounded-lg shadow-lg space-y-6 border border-border dark:border-dark-border">
                    <div>
                        <label htmlFor="name" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Full Name</label>
                        <input 
                            type="text" 
                            id="name" 
                            value={name} 
                            onChange={e => setName(e.target.value)} 
                            required 
                            className={`mt-1 block w-full px-3 py-2 bg-background dark:bg-dark-background border rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-foreground dark:text-dark-foreground ${errors.name ? 'border-red-500' : 'border-border dark:border-dark-border'}`} 
                            placeholder="Your Name" 
                        />
                        {errors.name && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.name}</p>}
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Email Address</label>
                        <input 
                            type="email" 
                            id="email" 
                            value={email} 
                            onChange={e => setEmail(e.target.value)} 
                            required 
                            className={`mt-1 block w-full px-3 py-2 bg-background dark:bg-dark-background border rounded-md shadow-sm placeholder-slate-400 dark:placeholder-slate-500 focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-foreground dark:text-dark-foreground ${errors.email ? 'border-red-500' : 'border-border dark:border-dark-border'}`} 
                            placeholder="you@example.com" 
                        />
                        {errors.email && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.email}</p>}
                    </div>
                    <div>
                        <label htmlFor="travelers" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Number of Riders</label>
                        <input type="number" id="travelers" value={travelers} onChange={e => setTravelers(Math.max(1, parseInt(e.target.value, 10)))} min="1" className="mt-1 block w-full px-3 py-2 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-brand-primary focus:border-brand-primary sm:text-sm text-foreground dark:text-dark-foreground"/>
                    </div>
                    <div>
                        <div className="flex items-center">
                            <input 
                                type="checkbox" 
                                id="terms" 
                                checked={agreedToTerms} 
                                onChange={e => setAgreedToTerms(e.target.checked)} 
                                className={`h-4 w-4 text-brand-primary focus:ring-brand-primary-dark border-border dark:border-dark-border rounded bg-background dark:bg-dark-background ${errors.terms ? 'ring-2 ring-red-500' : ''}`}
                            />
                            <label htmlFor="terms" className="ml-2 block text-sm text-foreground dark:text-dark-foreground">
                                I agree to the <button type="button" onClick={() => setIsTermsModalOpen(true)} className="underline font-medium hover:text-brand-primary">Terms & Conditions</button>.
                            </label>
                        </div>
                        {errors.terms && <p className="mt-1 text-sm text-red-500 dark:text-red-400">{errors.terms}</p>}
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
                 <div className="sticky top-28 bg-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-border dark:border-dark-border">
                    <h2 className="text-2xl font-bold font-display mb-4 text-foreground dark:text-dark-foreground">Tour Summary</h2>
                    <img src={trip.imageUrl} alt={trip.title} className="w-full h-40 object-cover rounded-md mb-4" loading="lazy"/>
                    <h3 className="text-xl font-semibold text-foreground dark:text-dark-foreground">{trip.title}</h3>
                    <p className="text-muted-foreground dark:text-dark-muted-foreground">{trip.destination}</p>
                    <div className="mt-4 border-t border-border dark:border-dark-border pt-4 space-y-2">
                        <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground dark:text-dark-muted-foreground">Duration:</span>
                            <span className="font-bold text-foreground dark:text-dark-foreground">{trip.duration} Days</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="font-medium text-muted-foreground dark:text-dark-muted-foreground">Price per rider:</span>
                            <span className="font-bold text-foreground dark:text-dark-foreground">₹{trip.price.toLocaleString('en-IN')}</span>
                        </div>
                         <div className="flex justify-between text-lg">
                            <span className="font-semibold text-foreground dark:text-dark-foreground">Total (for {travelers} rider{travelers > 1 ? 's' : ''}):</span>
                            <span className="font-extrabold text-brand-primary">₹{(trip.price * travelers).toLocaleString('en-IN')}</span>
                        </div>
                    </div>
                    <p className="mt-4 text-sm text-muted-foreground dark:text-dark-muted-foreground">This is an inquiry, not a confirmed booking. Our team will contact you via WhatsApp to finalize the details and payment.</p>
                 </div>
            </aside>
        </div>
    </div>

    {isTermsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={() => setIsTermsModalOpen(false)}>
            <div className="bg-card dark:bg-dark-card p-8 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[80vh] overflow-y-auto border border-border dark:border-dark-border" onClick={e => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4 text-foreground dark:text-dark-foreground">Terms & Conditions</h2>
                <div className="prose prose-sm max-w-none text-muted-foreground dark:text-dark-muted-foreground dark:prose-invert">
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
                <button onClick={() => { setAgreedToTerms(true); setIsTermsModalOpen(false); }} className="mt-6 bg-brand-primary hover:bg-brand-primary-dark text-white font-bold py-2 px-4 rounded-md">
                    I Understand and Agree
                </button>
            </div>
        </div>
    )}
    </>
  );
};

export default BookingPage;