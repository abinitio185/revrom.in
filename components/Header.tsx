
import React, { useState, useEffect } from 'react';
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

const Header: React.FC<HeaderProps> = ({ onNavigateHome, onNavigateContact, onNavigateBlog, onNavigateGallery, onNavigateCustomize, onNavigateToTours, onNavigateCustomPage, destinations, siteContent, theme, toggleTheme, customPages }) => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled ? 'py-3' : 'py-6'}`}>
      <div className="container mx-auto px-6">
        <div className={`flex justify-between items-center px-6 py-3 rounded-full transition-all duration-500 ${isScrolled ? 'glass shadow-2xl border border-white/20 dark:border-white/5' : 'bg-transparent'}`}>
          <button onClick={onNavigateHome} className="flex items-center gap-2 group">
            {siteContent.logoUrl ? (
                <img 
                  src={siteContent.logoUrl} 
                  alt="Logo" 
                  style={{ height: isScrolled ? `${siteContent.logoHeight * 0.7}px` : `${siteContent.logoHeight}px` }}
                  className="w-auto transition-all duration-500 group-hover:scale-105" 
                />
            ) : (
                <div className={`font-display font-black text-2xl tracking-tighter transition-colors ${isScrolled || theme === 'dark' ? 'text-foreground' : 'text-white'}`}>REVROM</div>
            )}
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {[
              { label: 'Expeditions', onClick: () => onNavigateToTours(null) },
              { label: 'Customize', onClick: onNavigateCustomize },
              { label: 'Gallery', onClick: onNavigateGallery },
              { label: 'Blog', onClick: onNavigateBlog },
            ].map((item) => (
              <button 
                  key={item.label}
                  onClick={item.onClick}
                  className={`text-[11px] font-black uppercase tracking-[0.2em] transition-all hover:text-brand-primary ${isScrolled || theme === 'dark' ? 'text-foreground' : 'text-white/80 hover:text-white'}`}
              >
                  {item.label}
              </button>
            ))}
            <div className="h-4 w-px bg-border/20"></div>
            <button 
              onClick={onNavigateContact}
              className={`text-[10px] font-black uppercase tracking-widest px-6 py-2.5 rounded-full transition-all border ${isScrolled || theme === 'dark' ? 'bg-brand-primary text-white border-brand-primary hover:bg-black hover:border-black' : 'bg-white text-black border-white hover:bg-transparent hover:text-white'}`}
            >
              Contact
            </button>
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />
          </nav>

          <button className="lg:hidden p-2 rounded-full glass border border-white/20">
              <svg className={`w-6 h-6 ${isScrolled || theme === 'dark' ? 'text-foreground' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"/></svg>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
