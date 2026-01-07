
import React from 'react';
import type { SiteContent } from '../types';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateAdmin: () => void;
  onNavigateBlog: () => void;
  onNavigateGallery: () => void;
  onNavigateCustomize: () => void;
  siteContent: SiteContent;
}

const Footer: React.FC<FooterProps> = ({ 
  onNavigateHome, 
  onNavigateContact, 
  onNavigateAdmin, 
  onNavigateBlog, 
  onNavigateGallery, 
  onNavigateCustomize, 
  siteContent 
}) => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-foreground text-white pt-20 pb-12">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          <div className="space-y-6">
            <button onClick={onNavigateHome} className="block text-3xl font-black font-display tracking-tighter text-brand-primary transition-transform active:scale-95">REVROM</button>
            <p className="text-slate-400 font-medium text-sm leading-relaxed">
              "{siteContent.footerTagline}" Crafting uncompromised Himalayan expeditions since 2018.
            </p>
            <div className="flex gap-4">
              {['Instagram', 'Facebook', 'Youtube'].map(social => (
                <a key={social} href="#" className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-brand-primary hover:border-brand-primary transition-all active:scale-90">
                  <span className="sr-only">{social}</span>
                  <div className="w-4 h-4 bg-white/50 rounded-sm"></div>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-6">Navigation</h3>
            <ul className="space-y-3 font-bold text-xs uppercase tracking-wider">
              <li><button onClick={onNavigateHome} className="text-slate-400 hover:text-white transition-colors">Basecamp</button></li>
              <li><button onClick={onNavigateHome} className="text-slate-400 hover:text-white transition-colors">All Expeditions</button></li>
              <li><button onClick={onNavigateCustomize} className="text-slate-400 hover:text-white transition-colors">Custom Routes</button></li>
              <li><button onClick={onNavigateGallery} className="text-slate-400 hover:text-white transition-colors">Gallery</button></li>
              <li><button onClick={onNavigateBlog} className="text-slate-400 hover:text-white transition-colors">Logbook</button></li>
            </ul>
          </div>

          <div>
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-6">Basecamp HQ</h3>
            <ul className="space-y-4 text-slate-400 font-medium text-xs">
              <li className="flex items-start gap-3">
                <span className="text-brand-primary">📍</span>
                <span>{siteContent.contactAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-brand-primary">📞</span>
                <span>{siteContent.contactPhone}</span>
              </li>
              <li className="flex items-center gap-3">
                <span className="text-brand-primary">✉️</span>
                <a href={`mailto:${siteContent.contactEmail}`} className="hover:text-white transition-colors break-all underline underline-offset-4">
                  {siteContent.contactEmail}
                </a>
              </li>
            </ul>
          </div>

          <div className="bg-white/5 p-8 rounded-[2rem] border border-white/10 shadow-2xl">
            <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-brand-primary mb-3">Newsletter</h3>
            <p className="text-[11px] text-slate-400 mb-6 font-medium">Join 5,000+ travelers for monthly frontier updates and gear lists.</p>
            <form className="space-y-3" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Your Email" 
                className="w-full p-4 text-xs rounded-xl bg-black/40 border border-white/10 focus:border-brand-primary outline-none text-white font-bold transition-all" 
              />
              <button type="submit" className="w-full bg-brand-primary hover:bg-white hover:text-black text-white font-black uppercase tracking-widest py-3.5 rounded-xl transition-all active:scale-95 shadow-lg">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="pt-10 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6 text-[10px] text-slate-500 font-black uppercase tracking-[0.2em]">
          <p>© {currentYear} REVROM EXPEDITIONS. RIDE. ROAM. RELAX.</p>
          <div className="flex gap-8">
            <button className="hover:text-white transition-colors">Privacy Policy</button>
            <button className="hover:text-white transition-colors">Terms of Service</button>
            <button onClick={onNavigateAdmin} className="opacity-30 hover:opacity-100 transition-opacity">System Login</button>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
