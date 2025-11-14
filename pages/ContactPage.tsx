
import React, { useState } from 'react';

const MailIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M1.5 4.5a3 3 0 0 1 3-3h15a3 3 0 0 1 3 3v15a3 3 0 0 1-3-3h-15a3 3 0 0 1-3-3v-15Z" />
        <path fill="#fff" d="M12 14.25a2.25 2.25 0 1 0 0-4.5 2.25 2.25 0 0 0 0 4.5Z" />
        <path fill="#fff" fillRule="evenodd" d="M12 21a9 9 0 0 0 8.368-5.555 1.5 1.5 0 0 0-2.6-1.482A6 6 0 0 1 12 16.5a6 6 0 0 1-5.768-3.537 1.5 1.5 0 0 0-2.6 1.482A9 9 0 0 0 12 21Z" clipRule="evenodd" />
    </svg>
);

const CheckCircleIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
    </svg>
);


const ContactPage: React.FC = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In a real app, you'd integrate with an email service
        console.log('Form submitted:', { name, email, message });
        setSubmitted(true);
        setName('');
        setEmail('');
        setMessage('');
    };

    return (
        <div className="bg-white">
            <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/ladakh-contact/1920/1080')" }}>
                <div className="absolute inset-0 bg-black/50"></div>
                <div className="container mx-auto px-4 sm:px-6 h-full flex items-center justify-center relative z-10">
                    <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display text-center">Get in Touch</h1>
                </div>
            </div>

            <div className="container mx-auto px-4 sm:px-6 py-12 md:py-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <div className="md:col-span-2">
                        <h2 className="text-3xl font-bold font-display mb-2">Send Us a Message</h2>
                        <p className="text-slate-600 mb-8">Have a question or need more information? Drop us a line!</p>
                        
                        {submitted ? (
                            <div className="bg-green-50 border-l-4 border-green-400 p-4 rounded-md shadow-md">
                                <div className="flex">
                                    <div className="flex-shrink-0">
                                        <CheckCircleIcon className="h-6 w-6 text-green-400" />
                                    </div>
                                    <div className="ml-3">
                                        <h3 className="text-lg font-medium text-green-800">Message Sent!</h3>
                                        <div className="mt-2 text-sm text-green-700">
                                            <p>Thank you for reaching out. We'll get back to you as soon as possible.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-slate-700">Full Name</label>
                                    <input type="text" id="name" value={name} onChange={e => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-slate-700">Email Address</label>
                                    <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"/>
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-slate-700">Message</label>
                                    <textarea id="message" value={message} onChange={e => setMessage(e.target.value)} required rows={5} className="mt-1 block w-full px-3 py-2 bg-white border border-slate-300 rounded-md shadow-sm placeholder-slate-400 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"></textarea>
                                </div>
                                <div>
                                    <button 
                                        type="submit" 
                                        className="w-full sm:w-auto bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-md transition-colors duration-300 text-lg"
                                    >
                                        Send Message
                                    </button>
                                </div>
                            </form>
                        )}
                    </div>
                    
                    <aside className="md:col-span-1">
                         <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                            <h3 className="text-2xl font-bold font-display mb-4">Contact Information</h3>
                            <ul className="space-y-4 text-slate-600">
                                <li className="flex items-start">
                                    <MailIcon className="w-6 h-6 text-orange-500 mr-3 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-800">Email</h4>
                                        <a href="mailto:contact@revrom.in" className="hover:text-orange-600">contact@revrom.in</a>
                                    </div>
                                </li>
                                 <li className="flex items-start">
                                    <MailIcon className="w-6 h-6 text-orange-500 mr-3 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-800">Phone</h4>
                                        <span>+91 987 654 3210</span>
                                    </div>
                                </li>
                                 <li className="flex items-start">
                                    <MailIcon className="w-6 h-6 text-orange-500 mr-3 mt-1 shrink-0" />
                                    <div>
                                        <h4 className="font-semibold text-slate-800">Address</h4>
                                        <p>Fort Road, Leh, Ladakh, 194101, India</p>
                                    </div>
                                </li>
                            </ul>
                         </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
