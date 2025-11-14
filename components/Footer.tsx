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

const FacebookIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
    </svg>
);

const InstagramIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.85s-.011 3.585-.069 4.85c-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07s-3.585-.012-4.85-.07c-3.252-.148-4.771-1.691-4.919-4.919-.058-1.265-.069-1.645-.069-4.85s.011-3.585.069-4.85c.149-3.225 1.664 4.771 4.919 4.919 1.266-.057 1.645-.069 4.85-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948s.014 3.667.072 4.947c.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072s3.667-.014 4.947-.072c4.358-.2 6.78-2.618 6.98-6.98.059-1.281.073-1.689.073-4.948s-.014-3.667-.072-4.947c-.2-4.358-2.618-6.78-6.98-6.98C15.667.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.88 1.44 1.44 0 000-2.88z" />
    </svg>
);

const YouTubeIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
);

// Fix: Completed the Footer component which was truncated and did not export a default component.
const Footer: React.FC<FooterProps> = ({
  onNavigateHome,
  onNavigateContact,
  onNavigateAdmin,
  onNavigateBlog,
  onNavigateGallery,
  onNavigateCustomize,
  siteContent,
}) => {
  return (
    <footer className="bg-slate-800 text-slate-300">
      <div className="container mx-auto px-4 sm:px-6 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
          <div className="col-span-2 lg:col-span-2">
            <h3 className="text-lg font-semibold text-white mb-4">Revrom.in</h3>
            <p className="text-sm">
              Unforgettable Motorcycle Adventures in the Heart of the Himalayas.
            </p>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-orange-400 transition-colors">Home</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateBlog(); }} className="hover:text-orange-400 transition-colors">Blog</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateGallery(); }} className="hover:text-orange-400 transition-colors">Gallery</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateContact(); }} className="hover:text-orange-400 transition-colors">Contact</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Adventures</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="hover:text-orange-400 transition-colors">All Tours</a>
              </li>
              <li>
                <a href="#" onClick={(e) => { e.preventDefault(); onNavigateCustomize(); }} className="hover:text-orange-400 transition-colors">Customize Tour</a>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-white mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" aria-label="Facebook" className="hover:text-orange-400 transition-colors">
                <FacebookIcon className="w-6 h-6" />
              </a>
              <a href={siteContent.instagramUrl} target="_blank" rel="noopener noreferrer" aria-label="Instagram" className="hover:text-orange-400 transition-colors">
                <InstagramIcon className="w-6 h-6" />
              </a>
              <a href="#" aria-label="YouTube" className="hover:text-orange-400 transition-colors">
                <YouTubeIcon className="w-6 h-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-700 text-center text-sm">
          <p>&copy; {new Date().getFullYear()} Revrom.in. All rights reserved.</p>
          <p className="mt-1">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateAdmin(); }} className="hover:text-orange-400 transition-colors">
              Admin Login
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
