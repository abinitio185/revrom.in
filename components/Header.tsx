
import React, { useState, useRef, useEffect } from 'react';
import type { SiteContent, CustomPage } from '../types';
import type { Theme } from '../App';
import ThemeToggle from './ThemeToggle';

interface HeaderProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateBlog: () => void;
  onNavigateGallery: () => void;
  onNavigateCustomize: () => void;
  onNavigateToTours: (destination: string | null) => void;
  onNavigateCustomPage: (slug: string) => void;
  destinations: string[];
  siteContent: SiteContent;
  theme: Theme;
  toggleTheme: () => void;
  customPages: CustomPage[];
}

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

const CompassIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9 9 0 100-18 9 9 0 000 18z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 3.75a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 3.75zM12 18a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0112 18zM18.364 5.636a.75.75 0 011.06 0l1.06 1.06a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 010-1.06zM5.636 18.364a.75.75 0 011.06 0l1.06 1.06a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 010-1.06zM21 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0121 12zM4.5 12a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 014.5 12zM18.364 18.364a.75.75 0 010-1.06l-1.06-1.06a.75.75 0 01-1.06 1.06l1.06 1.06a.75.75 0 011.06 0zM5.636 5.636a.75.75 0 010-1.06l-1.06-1.06a.75.75 0 01-1.06 1.06l1.06 1.06a.75.75 0 011.06 0z" />
    </svg>
);

const MapPinIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
    </svg>
);


const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNavigateContact, onNavigateBlog, onNavigateGallery, onNavigateCustomize, onNavigateToTours, onNavigateCustomPage, destinations, siteContent, theme, toggleTheme, customPages }) => {
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

  const visibleCustomPages = customPages.filter(p => p.isVisible);

  return (
    <header className="bg-card/80 dark:bg-dark-card/80 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-border dark:border-dark-border">
      <nav className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center">
        <button onClick={onNavigateHome} className="flex items-center space-x-3 cursor-pointer">
          {siteContent.logoUrl ? (
              <img src={siteContent.logoUrl} alt="Agency Logo" className="h-10 w-auto" />
          ) : (
              <div className="text-foreground dark:text-dark-foreground font-display font-bold text-xl">Agency Logo</div>
          )}
        </button>
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="text-muted-foreground dark:text-dark-muted-foreground hover:text-brand-primary transition-colors duration-300 font-medium">Home</a>
          
          <div className="relative" ref={dropdownRef}>
              <button 
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  onMouseEnter={() => setIsDropdownOpen(true)}
                  className="flex items-center text-muted-foreground dark:text-dark-muted-foreground hover:text-brand-primary transition-colors duration-300 font-medium"
              >
                  Destinations
                  <ChevronDownIcon className={`w-5 h-5 ml-1 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
              </button>
              {isDropdownOpen && (
                  <div 
                    onMouseLeave={() => setIsDropdownOpen(false)}
                    className="absolute top-full mt-2 w-screen max-w-lg bg-card dark:bg-dark-card rounded-lg shadow-2xl z-50 transform -translate-x-1/2 left-1/2 border border-border dark:border-dark-border"
                  >
                      <div className="grid grid-cols-2 gap-4 p-6">
                        <div>
                          <h3 className="font-bold text-muted-foreground dark:text-dark-muted-foreground uppercase tracking-wider text-sm mb-4">Explore by Destination</h3>
                          <ul className="space-y-2">
                            <li>
                              <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToTours(null); setIsDropdownOpen(false); }} className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
                                <CompassIcon className="w-6 h-6 text-brand-primary flex-shrink-0" />
                                <span className="font-semibold text-foreground dark:text-dark-foreground">All Tours</span>
                              </a>
                            </li>
                            {destinations.map(dest => (
                              <li key={dest}>
                                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateToTours(dest); setIsDropdownOpen(false); }} className="flex items-center gap-3 p-2 -m-2 rounded-lg hover:bg-black/5 dark:hover:bg-white/5 transition-colors duration-200">
                                  <MapPinIcon className="w-6 h-6 text-brand-accent-gold flex-shrink-0" />
                                  <span className="font-medium text-muted-foreground dark:text-dark-muted-foreground hover:text-brand-primary-dark">{dest}</span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-background dark:bg-dark-background rounded-lg p-6 flex flex-col justify-center">
                          <h4 className="font-bold text-brand-primary text-lg">Can't Find Your Perfect Ride?</h4>
                          <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground mt-2 mb-4">Let us craft a bespoke Himalayan adventure just for you.</p>
                          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCustomize(); setIsDropdownOpen(false); }} className="font-semibold text-brand-primary-dark hover:underline">
                            Customize Your Tour &rarr;
                          </a>
                        </div>
                      </div>
                  </div>
              )}
          </div>

          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCustomize(); }} className="text-muted-foreground dark:text-dark-muted-foreground hover:text-brand-primary transition-colors duration-300 font-medium">Customize</a>
          
          {visibleCustomPages.map(page => (
             <a key={page.id} href="#" onClick={(e) => { e.preventDefault(); onNavigateCustomPage(page.slug); }} className="text-muted-foreground dark:text-dark-muted-foreground hover:text-brand-primary transition-colors duration-300 font-medium">{page.title}</a>
          ))}
          
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateGallery(); }} className="text-muted-foreground dark:text-dark-muted-foreground hover:text-brand-primary transition-colors duration-300 font-medium">Gallery</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateBlog(); }} className="text-muted-foreground dark:text-dark-muted-foreground hover:text-brand-primary transition-colors duration-300 font-medium">Blog</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onNavigateContact(); }} className="text-muted-foreground dark:text-dark-muted-foreground hover:text-brand-primary transition-colors duration-300 font-medium">Contact</a>
          <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
        </div>

        {/* Mobile Menu Button */}
        <div className="lg:hidden flex items-center gap-4">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
            <button onClick={() => setIsMobileMenuOpen(true)} aria-label="Open menu" aria-controls="mobile-menu" aria-expanded={isMobileMenuOpen}>
                <MenuIcon className="w-6 h-6 text-foreground dark:text-dark-foreground" />
            </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div 
        className={`fixed inset-0 z-50 lg:hidden transition-opacity duration-200 ease-out ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="mobile-menu-title"
        aria-hidden={!isMobileMenuOpen}
        id="mobile-menu"
      >
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-hidden="true"
          ></div>

          {/* Menu Panel */}
          <div className={`relative flex flex-col w-4/5 max-w-xs ml-auto h-full bg-card dark:bg-dark-card shadow-xl transform transition-transform duration-300 ease-out ${isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
              <div className="flex justify-between items-center p-4 border-b border-border dark:border-dark-border">
                  <h2 id="mobile-menu-title" className="sr-only">Main Menu</h2>
                  <button onClick={() => handleMobileNavClick(onNavigateHome)}>
                     {siteContent.logoUrl ? (
                        <img src={siteContent.logoUrl} alt="Agency Logo" className="h-10 w-auto" />
                     ) : (
                        <div className="text-foreground dark:text-dark-foreground">Agency Logo</div>
                     )}
                  </button>
                  <button onClick={() => setIsMobileMenuOpen(false)} aria-label="Close menu">
                      <XIcon className="w-6 h-6 text-foreground dark:text-dark-foreground" />
                  </button>
              </div>
              <div className="flex flex-col space-y-6 p-6 overflow-y-auto">
                  <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateHome); }} className="text-foreground dark:text-dark-foreground hover:text-brand-primary text-lg font-medium">Home</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateToTours, null); }} className="text-foreground dark:text-dark-foreground hover:text-brand-primary text-lg font-medium">All Tours</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateCustomize); }} className="text-foreground dark:text-dark-foreground hover:text-brand-primary text-lg font-medium">Customize Tour</a>
                  {visibleCustomPages.map(page => (
                     <a key={page.id} href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateCustomPage, page.slug); }} className="text-foreground dark:text-dark-foreground hover:text-brand-primary text-lg font-medium">{page.title}</a>
                  ))}
                  <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateGallery); }} className="text-foreground dark:text-dark-foreground hover:text-brand-primary text-lg font-medium">Gallery</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateBlog); }} className="text-foreground dark:text-dark-foreground hover:text-brand-primary text-lg font-medium">Blog</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); handleMobileNavClick(onNavigateContact); }} className="text-foreground dark:text-dark-foreground hover:text-brand-primary text-lg font-medium">Contact</a>
              </div>
          </div>
      </div>
    </header>
  );
};

export default Header;
