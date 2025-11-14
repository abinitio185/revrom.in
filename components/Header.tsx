

import React, { useState, useRef, useEffect } from 'react';
import type { SiteContent } from '../types';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateBlog: () => void;
  onNavigateGallery: () => void;
  onNavigateCustomize: () => void;
  onNavigateToTours: (destination: string | null) => void;
  destinations: string[];
  siteContent: SiteContent;
}

const RevromLogo = ({ className }: { className?: string }) => (
    <div className={`flex items-center space-x-3 ${className}`}>
        <svg width="40" height="40" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-10 h-10 text-orange-500">
            <g>
                <path d="M43.06 14.44C41.1 10.66 37.8 7.36 34.02 5.4C33.2 5 32.32 5.3 31.9 6.12L28.12 13.66C27.7 14.48 28 15.36 28.82 15.78C32.02 17.54 34.46 20.48 35.54 24H25V26H35.54C34.46 29.52 32.02 32.46 28.82 34.22C28 34.64 27.7 35.52 28.12 36.34L31.9 43.88C32.32 44.7 33.2 45 34.02 44.6C37.8 42.64 41.1 39.34 43.06 35.56C44.96 31.84 45.94 27.54 45.94 23C45.94 22.5 45.94 23.5 45.94 23C45.94 18.46 44.96 18.16 43.06 14.44Z" fill="currentColor"/>
                <path d="M6.94 35.56C8.9 39.34 12.2 42.64 15.98 44.6C16.8 45 17.68 44.7 18.1 43.88L21.88 36.34C22.3 35.52 22 34.64 21.18 34.22C17.98 32.46 15.54 29.52 14.46 26H25V24H14.46C15.54 20.48 17.98 17.54 21.18 15.78C22 15.36 22.3 14.48 21.88 13.66L18.1 6.12C17.68 5.3 16.8 5 15.98 5.4C12.2 7.36 8.9 10.66 6.94 14.44C5.04 18.16 4.06 22.5 4.06 23C4.06 27.46 5.04 31.84 6.94 35.56Z" fill="currentColor"/>
            </g>
        </svg>
        <div className="flex flex-col">
            <span className="text-2xl sm:text-3xl font-black tracking-tighter text-orange-500" style={{fontFamily: "'Poppins', sans-serif", letterSpacing: '-0.05em'}}>REVROM.IN</span>
            <span className="text-[9px] sm:text-[10px] font-semibold tracking-[0.2em] sm:tracking-[0.3em] text-orange-500/80 -mt-1 sm:-mt-0.5" style={{fontFamily: "'Poppins', sans-serif"}}>RIDE.ROAM.RELAX</span>
        </div>
    </div>
);

const ChevronDownIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
    </svg>
);

const MenuIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
    </svg>
);

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNavigateContact, onNavigateBlog, onNavigateGallery, onNavigateCustomize, onNavigateToTours, destinations, siteContent }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleMobileNavClick = (navFunction: (arg?: any) => void, arg?: any) => {
    navFunction(arg);
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
        if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
            setIsDropdownOpen(false);
        }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  return (
    <header className="bg-white/80 backdrop-blur-lg shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <button onClick={onNavigateHome} className="flex items-center space-x-3 cursor-pointer">
          {siteContent.logoUrl ? (
              <img src={siteContent.logoUrl} alt="Revrom.in Logo" className="h-10 w-auto" />
          ) : (
              <RevromLogo />
          )}
        </button>
        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="text-slate-600 hover:text-orange-500 transition-colors duration-300 font-medium">Home</a>
          
          <div className="relative" ref={dropdownRef}>
              <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="flex items-center text-slate-600 hover:text-orange-500 transition-colors duration-300 font-medium"
              >
                  Destinations
                  <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                  <div 
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className="absolute top-full mt-2 w-56 bg-white rounded-md shadow-lg py-1 z-50"
                  >
                      <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToTours(null); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600">All Tours</a>
                      {destinations.map(dest => (
                         <a key={dest} href="#" onClick={(e) => { e.preventDefault(); onNavigateToTours(dest); setIsDropdownOpen(false); }} className="block px-4 py-2 text-sm text-slate-700 hover:bg-orange-50 hover:text-orange-600">{dest}</a>
                      ))}
                  </div>
              )}
          </div>

          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCustomize(); }} className="text-slate-600 hover:text-orange-500 transition-colors duration-300 font-medium">Customize Tour</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateGallery(); }} className="text-slate-600 hover:text-orange-500 transition-colors duration-300 font-medium">Gallery</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateBlog(); }} className="text-slate-600 hover:text-orange-500 transition-colors duration-300 font-medium">Blog</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateContact(); }} className="text-slate-600 hover:text-orange-500 transition-colors duration-300 font-medium">Contact</a>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} aria-label="Open menu">
                <MenuIcon className="w-6 h-6 text-slate-600" />
            </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`fixed inset-0 z-50 bg-white transform ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'} transition-transform duration-300 ease-in-out md:hidden`}>
          <div className="flex justify-between items-center p-4 border-b">
              <button onClick={() => handleMobileNavClick(onNavigateHome)}>
                 {siteContent.logoUrl ? (
                    <img src={siteContent.logoUrl} alt="Revrom.in Logo" className="h-10 w-auto" />
                 ) : (
                    <RevromLogo />
                 )}
              </button>
              <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                  <XIcon className="w-6 h-6 text-slate-600" />
              </button>
          </div>
          <div className="flex flex-col space-y-6 p-6">
              <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateHome); }} className="text-slate-600 hover:text-orange-500 text-lg font-medium">Home</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateToTours, null); }} className="text-slate-600 hover:text-orange-500 text-lg font-medium">All Tours</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateCustomize); }} className="text-slate-600 hover:text-orange-500 text-lg font-medium">Customize Tour</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateGallery); }} className="text-slate-600 hover:text-orange-500 text-lg font-medium">Gallery</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateBlog); }} className="text-slate-600 hover:text-orange-500 text-lg font-medium">Blog</a>
              <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateContact); }} className="text-slate-600 hover:text-orange-500 text-lg font-medium">Contact</a>
          </div>
      </div>
    </header>
  );
};

export default Header;