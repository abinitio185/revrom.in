
import React from 'react';

interface FooterProps {
  onNavigateHome: () => void;
  onNavigateContact: () => void;
  onNavigateAdmin: () => void;
  onNavigateBlog: () => void;
  onNavigateGallery: () => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigateHome, onNavigateContact, onNavigateAdmin, onNavigateBlog, onNavigateGallery }) => {
  return (
    <footer className="bg-slate-800 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-display font-bold mb-4">Revrom.in</h3>
            <p className="text-slate-300">Ride. Roam. Relax.</p>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="text-slate-300 hover:text-orange-400 transition-colors">Home</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateHome(); }} className="text-slate-300 hover:text-orange-400 transition-colors">All Tours</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateGallery(); }} className="text-slate-300 hover:text-orange-400 transition-colors">Gallery</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateBlog(); }} className="text-slate-300 hover:text-orange-400 transition-colors">Blog</a></li>
              <li><a href="#" onClick={(e) => { e.preventDefault(); onNavigateContact(); }} className="text-slate-300 hover:text-orange-400 transition-colors">Contact Us</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Contact</h4>
            <ul className="space-y-2 text-slate-300">
              <li>Email: contact@revrom.in</li>
              <li>Phone: +91 987 654 3210</li>
              <li>Address: Fort Road, Leh, Ladakh</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-lg mb-4">Follow Our Adventures</h4>
            {/* Placeholder for social media icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-slate-300 hover:text-orange-400">FB</a>
              <a href="#" className="text-slate-300 hover:text-orange-400">IG</a>
              <a href="#" className="text-slate-300 hover:text-orange-400">YT</a>
            </div>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-8 pt-6 text-center text-slate-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Revrom.in. All rights reserved.</p>
          <p className="mt-2">
            <a href="#" onClick={(e) => { e.preventDefault(); onNavigateAdmin(); }} className="hover:text-orange-400 transition-colors">Admin Panel</a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;