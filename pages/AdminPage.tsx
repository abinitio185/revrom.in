import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Trip, Departure, BlogPost, GalleryPhoto, InstagramPost, GoogleReview, SiteContent, ItineraryQuery, CustomPage, SectionConfig, SEOConfig } from '../types';
import type { Theme } from '../App';
import { instagramSyncMock } from '../data/mockData';
import TripRouteMap from '../components/TripRouteMap';
import Pagination from '../components/Pagination';
import ThemePicker from '../components/ThemePicker';
import { themes } from '../data/themes';

interface AdminPageProps {
  trips: Trip[];
  departures: Departure[];
  blogPosts: BlogPost[];
  galleryPhotos: GalleryPhoto[];
  instagramPosts: InstagramPost[];
  googleReviews: GoogleReview[];
  siteContent: SiteContent;
  itineraryQueries: ItineraryQuery[];
  customPages: CustomPage[];
  onAddTrip: (trip: Omit<Trip, 'id' | 'reviews'>) => void;
  onUpdateTrip: (updatedTrip: Trip) => void;
  onDeleteTrip: (tripId: string) => void;
  onAddDeparture: (departure: Omit<Departure, 'id'>) => void;
  onUpdateDeparture: (updatedDeparture: Departure) => void;
  onDeleteDeparture: (departureId: string) => void;
  onAddBlogPost: (post: Omit<BlogPost, 'id' | 'date' | 'imageUrl'> & { imageUrl?: string }) => Promise<void>;
  onUpdateBlogPost: (updatedPost: BlogPost) => void;
  onDeleteBlogPost: (postId: string) => void;
  onAddGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
  onUpdateGalleryPhoto: (updatedPhoto: GalleryPhoto) => void;
  onDeleteGalleryPhoto: (photoId: string) => void;
  onAddInstagramPost: (post: Omit<InstagramPost, 'id'>) => void;
  onUpdateInstagramPost: (updatedPost: InstagramPost) => void;
  onDeleteInstagramPost: (postId: string) => void;
  onAddGoogleReview: (review: Omit<GoogleReview, 'id'>) => void;
  onUpdateGoogleReview: (updatedReview: GoogleReview) => void;
  onDeleteGoogleReview: (reviewId: string) => void;
  onUpdateSiteContent: (newContent: Partial<SiteContent>) => void;
  onAddCustomPage: (page: Omit<CustomPage, 'id'>) => void;
  onUpdateCustomPage: (updatedPage: CustomPage) => void;
  onDeleteCustomPage: (pageId: string) => void;
  onNavigateCustomPage: (slug: string) => void;
  onLogout: () => void;
  theme: Theme;
}

// --- SVG Icons ---
const ToursIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2-2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" /></svg>;
const ContentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const MediaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const LeadsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BuilderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" /></svg>;
const PencilIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const SyncIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.4 18M20 20l-1.5-1.5A9 9 0 003.6 6" /></svg>;
const UploadIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" /></svg>;
const ChevronUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>;

type AdminTab = 'Tours' | 'Content' | 'Media' | 'Leads' | 'Builder' | 'Settings';

const AdminPage: React.FC<AdminPageProps> = (props) => {
  const { 
    trips, departures, blogPosts, galleryPhotos, instagramPosts, googleReviews, 
    siteContent, itineraryQueries, customPages,
    onAddTrip, onUpdateTrip, onDeleteTrip, 
    onAddDeparture, onUpdateDeparture, onDeleteDeparture,
    onAddBlogPost, onUpdateBlogPost, onDeleteBlogPost,
    onAddGalleryPhoto, onUpdateGalleryPhoto, onDeleteGalleryPhoto,
    onAddInstagramPost, onUpdateInstagramPost, onDeleteInstagramPost,
    onAddGoogleReview, onUpdateGoogleReview, onDeleteGoogleReview,
    onUpdateSiteContent, onAddCustomPage, onUpdateCustomPage, onDeleteCustomPage,
    onNavigateCustomPage, onLogout, theme
  } = props;

  const [activeTab, setActiveTab] = useState<AdminTab>('Tours');
  const [editingTrip, setEditingTrip] = useState<Trip | null>(null);
  const [isTripModalOpen, setIsTripModalOpen] = useState(false);
  const [isDepartureModalOpen, setIsDepartureModalOpen] = useState(false);
  const [editingDeparture, setEditingDeparture] = useState<Departure | null>(null);
  const [isThemePickerOpen, setIsThemePickerOpen] = useState(false);
  
  // Site Settings Logic
  const handleSettingsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
      const { name, value, type } = e.target;
      if (type === 'number') {
        onUpdateSiteContent({ [name]: parseFloat(value) });
      } else {
        onUpdateSiteContent({ [name]: value });
      }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
            onUpdateSiteContent({ logoUrl: reader.result as string });
        };
        reader.readAsDataURL(file);
    }
  };

  const handleInstagramSync = () => {
    instagramSyncMock.forEach(item => {
      onAddGalleryPhoto(item.photo);
      onAddInstagramPost(item.post);
    });
    alert('Instagram content synchronized successfully!');
  };

  // HomePage Layout Logic
  const moveSection = (index: number, direction: 'up' | 'down') => {
      const newLayout = [...siteContent.homePageLayout];
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= newLayout.length) return;
      
      const temp = newLayout[index];
      newLayout[index] = newLayout[targetIndex];
      newLayout[targetIndex] = temp;
      
      onUpdateSiteContent({ homePageLayout: newLayout });
  };

  const toggleSectionVisibility = (index: number) => {
      const newLayout = [...siteContent.homePageLayout];
      newLayout[index].isVisible = !newLayout[index].isVisible;
      onUpdateSiteContent({ homePageLayout: newLayout });
  };

  // --- RENDERING TABS ---

  const renderToursTab = () => (
      <div className="space-y-12 animate-fade-in">
          <div>
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold font-display text-foreground dark:text-dark-foreground">Manage Tours</h3>
                  <button onClick={() => { setEditingTrip(null); setIsTripModalOpen(true); }} className="bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded-lg flex items-center font-semibold transition-colors">
                      <PlusIcon /> Add Tour
                  </button>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                  {trips.map(trip => (
                      <div key={trip.id} className="bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg overflow-hidden flex shadow-sm hover:shadow-md transition-shadow">
                          <img src={trip.imageUrl} className="w-24 object-cover" alt={trip.title} />
                          <div className="p-3 flex-grow">
                              <h4 className="font-bold text-foreground dark:text-dark-foreground line-clamp-1">{trip.title}</h4>
                              <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">{trip.destination} • {trip.duration} days</p>
                              <div className="flex gap-2 mt-2">
                                  <button onClick={() => { setEditingTrip(trip); setIsTripModalOpen(true); }} className="p-1.5 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded transition-colors"><PencilIcon /></button>
                                  <button onClick={() => { if(confirm('Delete this tour?')) onDeleteTrip(trip.id); }} className="p-1.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded transition-colors"><TrashIcon /></button>
                              </div>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="border-t border-border dark:border-dark-border pt-8">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold font-display text-foreground dark:text-dark-foreground">Upcoming Departures</h3>
                  <button onClick={() => { setEditingDeparture(null); setIsDepartureModalOpen(true); }} className="bg-brand-accent-gold hover:bg-yellow-600 text-white px-4 py-2 rounded-lg flex items-center font-semibold transition-colors">
                      <PlusIcon /> Add Departure
                  </button>
              </div>
              <div className="bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg overflow-hidden overflow-x-auto shadow-sm">
                  <table className="w-full text-sm text-left">
                      <thead className="bg-slate-50 dark:bg-dark-background/50 text-muted-foreground uppercase text-xs">
                          <tr>
                              <th className="px-6 py-4">Tour Product</th>
                              <th className="px-6 py-4">Start/End Dates</th>
                              <th className="px-6 py-4 text-center">Slots</th>
                              <th className="px-6 py-4">Public Status</th>
                              <th className="px-6 py-4 text-right">Actions</th>
                          </tr>
                      </thead>
                      <tbody className="divide-y divide-border dark:divide-dark-border">
                          {departures.map(dep => {
                              const tour = trips.find(t => t.id === dep.tripId);
                              return (
                                  <tr key={dep.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                      <td className="px-6 py-4 font-bold text-foreground dark:text-dark-foreground">{tour?.title || 'Unknown Tour'}</td>
                                      <td className="px-6 py-4 whitespace-nowrap text-muted-foreground">{new Date(dep.startDate).toLocaleDateString()} &rarr; {new Date(dep.endDate).toLocaleDateString()}</td>
                                      <td className="px-6 py-4 text-center font-mono font-bold">{dep.slots}</td>
                                      <td className="px-6 py-4">
                                          <span className={`px-2 py-0.5 rounded-full text-xs font-bold ring-1 ring-inset ${
                                              dep.status === 'Available' ? 'bg-green-50 text-green-700 ring-green-600/20' : 
                                              dep.status === 'Sold Out' ? 'bg-red-50 text-red-700 ring-red-600/20' : 'bg-yellow-50 text-yellow-700 ring-yellow-600/20'
                                          }`}>{dep.status}</span>
                                      </td>
                                      <td className="px-6 py-4 text-right">
                                          <div className="flex justify-end gap-3">
                                              <button onClick={() => { setEditingDeparture(dep); setIsDepartureModalOpen(true); }} className="text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 p-1.5 rounded transition-colors"><PencilIcon /></button>
                                              <button onClick={() => { if(confirm('Delete departure?')) onDeleteDeparture(dep.id); }} className="text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 p-1.5 rounded transition-colors"><TrashIcon /></button>
                                          </div>
                                      </td>
                                  </tr>
                              );
                          })}
                      </tbody>
                  </table>
              </div>
          </div>
      </div>
  );

  const renderContentTab = () => (
      <div className="space-y-8 animate-fade-in">
          <div className="bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg p-6 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                  <h3 className="text-xl font-bold font-display text-foreground dark:text-dark-foreground">Manage Blog Posts</h3>
                  <button onClick={() => {}} className="bg-brand-primary text-white px-4 py-2 rounded-lg font-bold text-sm hover:opacity-90 transition-opacity flex items-center gap-2"><PlusIcon /> New Post</button>
              </div>
              <div className="space-y-3">
                  {blogPosts.map(post => (
                      <div key={post.id} className="flex items-center gap-4 p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg border border-transparent hover:border-border dark:hover:border-dark-border transition-all">
                          <img src={post.imageUrl} className="w-16 h-16 rounded object-cover" alt="" />
                          <div className="flex-grow">
                              <h4 className="font-bold text-sm text-foreground dark:text-dark-foreground">{post.title}</h4>
                              <p className="text-xs text-muted-foreground italic">By {post.author} • {new Date(post.date).toLocaleDateString()}</p>
                          </div>
                          <div className="flex gap-1">
                               <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded"><PencilIcon /></button>
                               <button onClick={() => onDeleteBlogPost(post.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded"><TrashIcon /></button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>

          <div className="bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg p-6 shadow-sm">
              <h3 className="text-xl font-bold font-display text-foreground dark:text-dark-foreground mb-6">Featured Reviews</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {googleReviews.map(review => (
                      <div key={review.id} className="p-4 border border-border dark:border-dark-border rounded-lg flex flex-col justify-between">
                          <div className="flex items-center gap-3 mb-3">
                              <img src={review.profilePhotoUrl} className="w-8 h-8 rounded-full" alt="" />
                              <span className="font-bold text-sm">{review.authorName}</span>
                          </div>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-4">"{review.text}"</p>
                          <div className="flex items-center justify-between border-t border-border dark:border-dark-border pt-3">
                               <label className="flex items-center gap-2 text-xs font-bold cursor-pointer">
                                  <input type="checkbox" checked={review.isFeatured} onChange={() => onUpdateGoogleReview({...review, isFeatured: !review.isFeatured})} className="rounded text-brand-primary" />
                                  Feature on Home
                               </label>
                               <button onClick={() => onDeleteGoogleReview(review.id)} className="text-red-500 hover:text-red-700 transition-colors"><TrashIcon /></button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );

  const renderLeadsTab = () => (
      <div className="animate-fade-in">
           <div className="bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg overflow-hidden shadow-sm">
                <div className="p-4 border-b border-border dark:border-dark-border bg-slate-50 dark:bg-dark-background/50 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Inquiry Inbox</h3>
                    <span className="text-xs font-bold px-3 py-1 bg-brand-primary text-white rounded-full">{itineraryQueries.length} Recent Requests</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-muted-foreground uppercase text-xs bg-slate-50 dark:bg-dark-background/30">
                            <tr>
                                <th className="px-6 py-4">Rider</th>
                                <th className="px-6 py-4">Tour Interested</th>
                                <th className="px-6 py-4">WhatsApp No.</th>
                                <th className="px-6 py-4">Timeframe</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-border dark:divide-dark-border">
                            {itineraryQueries.length > 0 ? itineraryQueries.map(q => (
                                <tr key={q.id} className="hover:bg-black/5 dark:hover:bg-white/5 transition-colors">
                                    <td className="px-6 py-4 font-bold">{q.name}</td>
                                    <td className="px-6 py-4 text-muted-foreground">{q.tripTitle}</td>
                                    <td className="px-6 py-4 font-mono text-brand-primary">{q.whatsappNumber}</td>
                                    <td className="px-6 py-4"><span className="px-2 py-0.5 bg-slate-100 dark:bg-slate-700 rounded text-xs">{q.planningTime}</span></td>
                                    <td className="px-6 py-4 text-right">
                                        <a href={`https://wa.me/${q.whatsappNumber.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="bg-green-500 text-white px-4 py-1.5 rounded text-xs font-bold hover:bg-green-600 transition-colors inline-block">WhatsApp Reply</a>
                                    </td>
                                </tr>
                            )) : (
                                <tr><td colSpan={5} className="p-12 text-center text-muted-foreground">No leads found. Your inquiries will appear here as they come in.</td></tr>
                            )}
                        </tbody>
                    </table>
                </div>
           </div>
      </div>
  );

  const renderBuilderTab = () => (
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 animate-fade-in">
          <div className="space-y-6">
              <h3 className="text-xl font-bold font-display text-foreground dark:text-dark-foreground border-b border-border dark:border-dark-border pb-3">Home Page Layout</h3>
              <div className="space-y-3">
                  {siteContent.homePageLayout.map((section, idx) => (
                      <div key={section.id} className={`flex items-center gap-4 p-4 rounded-xl border transition-all ${section.isVisible ? 'bg-card dark:bg-dark-card border-border dark:border-dark-border' : 'bg-slate-50 dark:bg-dark-background/20 border-dashed opacity-50'}`}>
                          <div className="flex flex-col gap-1">
                              <button onClick={() => moveSection(idx, 'up')} disabled={idx === 0} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors disabled:opacity-20"><ChevronUpIcon /></button>
                              <button onClick={() => moveSection(idx, 'down')} disabled={idx === siteContent.homePageLayout.length - 1} className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition-colors disabled:opacity-20"><ChevronDownIcon /></button>
                          </div>
                          <span className="font-bold flex-grow text-foreground dark:text-dark-foreground">{section.label}</span>
                          <button onClick={() => toggleSectionVisibility(idx)} className={`p-2 rounded-full transition-colors ${section.isVisible ? 'text-blue-500 bg-blue-50 dark:bg-blue-900/20' : 'text-slate-400 bg-slate-100 dark:bg-slate-800'}`}>
                              {section.isVisible ? <EyeIcon /> : <EyeOffIcon />}
                          </button>
                      </div>
                  ))}
              </div>
          </div>

          <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-border dark:border-dark-border pb-3">
                  <h3 className="text-xl font-bold font-display text-foreground dark:text-dark-foreground">Custom Landing Pages</h3>
                  <button onClick={() => {
                      const title = prompt('Page Title:');
                      if (title) onAddCustomPage({ title, slug: title.toLowerCase().replace(/\s+/g, '-'), content: '# ' + title, isVisible: true });
                  }} className="text-sm font-bold bg-brand-primary text-white px-3 py-1.5 rounded-md hover:bg-brand-primary-dark flex items-center gap-1"><PlusIcon /> New Page</button>
              </div>
              <div className="space-y-4">
                  {customPages.map(page => (
                      <div key={page.id} className="bg-card dark:bg-dark-card border border-border dark:border-dark-border p-4 rounded-xl flex items-center justify-between shadow-sm group">
                          <div>
                              <h4 className="font-bold text-foreground dark:text-dark-foreground">{page.title}</h4>
                              <p className="text-xs text-brand-primary font-mono tracking-tighter">revrom.in/page/{page.slug}</p>
                          </div>
                          <div className="flex gap-2">
                              <button onClick={() => onNavigateCustomPage(page.slug)} className="p-2 text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded transition-colors"><EyeIcon /></button>
                              <button className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded transition-colors"><PencilIcon /></button>
                              <button onClick={() => onDeleteCustomPage(page.id)} className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"><TrashIcon /></button>
                          </div>
                      </div>
                  ))}
              </div>
          </div>
      </div>
  );

  const renderSettingsTab = () => (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 animate-fade-in pb-20">
          <div className="space-y-8">
              <div>
                  <h4 className="text-lg font-bold font-display mb-6 text-foreground dark:text-dark-foreground border-b border-border dark:border-dark-border pb-2 flex items-center gap-2">
                      <span className="p-1.5 bg-brand-primary/10 rounded-lg text-brand-primary"><UploadIcon /></span> Brand Identity
                  </h4>
                  <div className="space-y-6">
                      <div className="bg-slate-50 dark:bg-dark-background/50 p-6 rounded-xl border border-border dark:border-dark-border">
                          <label className="block text-sm font-bold mb-3 text-foreground dark:text-dark-foreground uppercase tracking-wider">Logo Configuration</label>
                          <div className="flex flex-col sm:flex-row items-center gap-6">
                              <div className="h-24 w-24 bg-card dark:bg-dark-card rounded-xl border-2 border-dashed border-border dark:border-dark-border flex items-center justify-center p-2 relative group overflow-hidden shrink-0">
                                  {siteContent.logoUrl ? (
                                      <img src={siteContent.logoUrl} alt="Preview" className="max-h-full max-w-full object-contain" />
                                  ) : (
                                      <span className="text-muted-foreground text-[10px] text-center">No Logo Uploaded</span>
                                  )}
                              </div>
                              <div className="flex-grow space-y-3 w-full">
                                  <input 
                                      type="file" 
                                      id="logo-upload-input" 
                                      accept="image/*" 
                                      onChange={handleLogoUpload} 
                                      className="hidden" 
                                  />
                                  <label 
                                      htmlFor="logo-upload-input" 
                                      className="cursor-pointer block w-full text-center bg-brand-primary text-white font-bold py-2.5 px-4 rounded-lg hover:bg-brand-primary-dark transition-all shadow-md active:scale-95"
                                  >
                                      Select Logo Image
                                  </label>
                                  <p className="text-[10px] text-muted-foreground text-center sm:text-left">Transparent PNG or SVG recommended. Max size 2MB.</p>
                              </div>
                          </div>
                          <div className="mt-8 space-y-4">
                              <div>
                                  <div className="flex justify-between items-center mb-2">
                                      <label className="text-sm font-semibold">Pixel Adjustment Height</label>
                                      <span className="text-xs font-mono font-bold bg-brand-primary/10 text-brand-primary px-2 py-0.5 rounded">{siteContent.logoHeight}px</span>
                                  </div>
                                  <input 
                                      type="range" 
                                      name="logoHeight" 
                                      min="20" 
                                      max="150" 
                                      value={siteContent.logoHeight} 
                                      onChange={handleSettingsChange} 
                                      className="w-full h-2 bg-slate-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer accent-brand-primary" 
                                  />
                              </div>
                          </div>
                      </div>

                      <div className="p-4 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-xl shadow-sm">
                          <label className="block text-sm font-bold mb-3">Color Palette</label>
                          <div className="flex items-center justify-between gap-4">
                              <span className="font-mono text-brand-primary font-bold text-sm">{siteContent.activeTheme} Theme</span>
                              <button onClick={() => setIsThemePickerOpen(true)} className="bg-slate-200 dark:bg-slate-700 text-slate-800 dark:text-white px-5 py-2 rounded-lg font-bold text-xs hover:opacity-80 transition-all border border-transparent hover:border-brand-primary">Change Colors</button>
                          </div>
                      </div>
                  </div>
              </div>

              <div>
                  <h4 className="text-lg font-bold font-display mb-6 text-foreground dark:text-dark-foreground border-b border-border dark:border-dark-border pb-2">Hero Messaging</h4>
                  <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Headline</label>
                        <input type="text" name="heroTitle" value={siteContent.heroTitle} onChange={handleSettingsChange} className="w-full p-3 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg text-sm focus:ring-brand-primary" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Sub-headline</label>
                        <textarea name="heroSubtitle" value={siteContent.heroSubtitle} onChange={handleSettingsChange} rows={3} className="w-full p-3 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg text-sm focus:ring-brand-primary" />
                    </div>
                  </div>
              </div>
          </div>

          <div className="space-y-8">
              <div>
                  <h4 className="text-lg font-bold font-display mb-6 text-foreground dark:text-dark-foreground border-b border-border dark:border-dark-border pb-2">Business Operations</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Admin WhatsApp (For Lead Sync)</label>
                        <input type="text" name="adminWhatsappNumber" value={siteContent.adminWhatsappNumber} onChange={handleSettingsChange} className="w-full p-3 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg text-sm" placeholder="Country code + number (e.g. 919876543210)" />
                      </div>
                      <div className="sm:col-span-2">
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Business Address</label>
                        <input type="text" name="contactAddress" value={siteContent.contactAddress} onChange={handleSettingsChange} className="w-full p-3 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Support Email</label>
                        <input type="email" name="contactEmail" value={siteContent.contactEmail} onChange={handleSettingsChange} className="w-full p-3 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg text-sm" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Support Phone</label>
                        <input type="text" name="contactPhone" value={siteContent.contactPhone} onChange={handleSettingsChange} className="w-full p-3 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg text-sm" />
                      </div>
                  </div>
              </div>

              <div>
                  <h4 className="text-lg font-bold font-display mb-6 text-foreground dark:text-dark-foreground border-b border-border dark:border-dark-border pb-2">Social Integrations</h4>
                  <div className="space-y-4">
                    <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Instagram Link</label>
                        <input type="text" name="instagramUrl" value={siteContent.instagramUrl} onChange={handleSettingsChange} className="w-full p-3 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg text-xs font-mono" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">Facebook Link</label>
                        <input type="text" name="facebookUrl" value={siteContent.facebookUrl} onChange={handleSettingsChange} className="w-full p-3 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg text-xs font-mono" />
                    </div>
                    <div>
                        <label className="block text-xs font-bold uppercase text-muted-foreground mb-1">YouTube Link</label>
                        <input type="text" name="youtubeUrl" value={siteContent.youtubeUrl} onChange={handleSettingsChange} className="w-full p-3 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded-lg text-xs font-mono" />
                    </div>
                  </div>
              </div>
          </div>
      </div>
  );

  return (
    <div className="min-h-screen bg-background dark:bg-dark-background">
      <div className="container mx-auto px-4 sm:px-6 py-8 md:py-12">
          {/* Admin Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
              <div>
                  <div className="flex items-center gap-3 mb-1">
                      <span className="bg-brand-primary text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-widest">Administrator</span>
                      <h1 className="text-3xl md:text-4xl font-extrabold font-display text-foreground dark:text-dark-foreground">Hub Console</h1>
                  </div>
                  <p className="text-muted-foreground text-sm">Welcome back. Manage your tours, content, and site configuration here.</p>
              </div>
              <button onClick={onLogout} className="bg-card dark:bg-dark-card border border-border dark:border-dark-border text-foreground dark:text-dark-foreground font-bold px-6 py-2.5 rounded-lg hover:bg-slate-50 dark:hover:bg-dark-card transition-all flex items-center gap-2 shadow-sm">
                  Sign Out
              </button>
          </div>

          {/* Navigation Bar */}
          <div className="flex overflow-x-auto gap-1 border-b border-border dark:border-dark-border mb-8 pb-px no-scrollbar bg-card dark:bg-dark-card/30 rounded-t-xl">
              {(['Tours', 'Content', 'Media', 'Leads', 'Builder', 'Settings'] as AdminTab[]).map(tab => (
                  <button 
                    key={tab} 
                    onClick={() => setActiveTab(tab)}
                    className={`flex items-center gap-2 px-6 py-4 font-bold transition-all whitespace-nowrap border-b-4 ${activeTab === tab ? 'border-brand-primary text-brand-primary' : 'border-transparent text-muted-foreground hover:text-foreground dark:hover:text-dark-foreground hover:bg-black/5 dark:hover:bg-white/5'}`}
                  >
                      {tab === 'Tours' && <ToursIcon />}
                      {tab === 'Content' && <ContentIcon />}
                      {tab === 'Media' && <MediaIcon />}
                      {tab === 'Leads' && <LeadsIcon />}
                      {tab === 'Builder' && <BuilderIcon />}
                      {tab === 'Settings' && <SettingsIcon />}
                      {tab}
                  </button>
              ))}
          </div>

          {/* Dynamic Tab Content */}
          <div className="pb-24">
              {activeTab === 'Tours' && renderToursTab()}
              {activeTab === 'Content' && renderContentTab()}
              {activeTab === 'Leads' && renderLeadsTab()}
              {activeTab === 'Builder' && renderBuilderTab()}
              {activeTab === 'Settings' && renderSettingsTab()}
              {activeTab === 'Media' && (
                  <div className="animate-fade-in space-y-12">
                      <div className="bg-indigo-600 rounded-2xl p-10 text-white flex flex-col md:flex-row items-center justify-between gap-8 shadow-xl relative overflow-hidden">
                          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2"></div>
                          <div className="relative z-10 max-w-xl text-center md:text-left">
                              <h3 className="text-3xl font-bold font-display mb-3">Instagram Data Sync</h3>
                              <p className="text-indigo-100 text-lg">Automatically pull your latest road stories and reels into the website gallery. Keep your feed fresh without manual uploads.</p>
                          </div>
                          <button 
                            onClick={handleInstagramSync}
                            className="relative z-10 bg-white text-indigo-600 px-10 py-4 rounded-xl font-bold shadow-2xl hover:bg-indigo-50 transition-all flex items-center gap-3 transform active:scale-95"
                          >
                              <SyncIcon /> Sync Social Assets
                          </button>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                          {galleryPhotos.map(photo => (
                              <div key={photo.id} className="aspect-square relative group rounded-xl overflow-hidden shadow-md border border-border dark:border-dark-border">
                                  <img src={photo.imageUrl} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" alt="" />
                                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                      <button onClick={() => onDeleteGalleryPhoto(photo.id)} className="bg-red-500 text-white p-2.5 rounded-full hover:bg-red-600 shadow-lg"><TrashIcon /></button>
                                  </div>
                              </div>
                          ))}
                      </div>
                  </div>
              )}
          </div>
      </div>

      {/* --- MODALS --- */}

      {/* Trip Modal */}
      {isTripModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-md p-4 overflow-y-auto" onClick={() => setIsTripModalOpen(false)}>
              <div className="bg-card dark:bg-dark-card rounded-2xl shadow-2xl max-w-4xl w-full my-auto border border-border dark:border-dark-border" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-border dark:border-dark-border flex justify-between items-center">
                      <h3 className="text-2xl font-bold font-display">{editingTrip ? 'Modify' : 'Launch New'} Tour</h3>
                      <button onClick={() => setIsTripModalOpen(false)} className="text-muted-foreground hover:text-foreground">&times;</button>
                  </div>
                  <form className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={(e) => {
                      e.preventDefault();
                      const f = e.target as HTMLFormElement;
                      const data = {
                          title: (f.elements.namedItem('title') as HTMLInputElement).value,
                          destination: (f.elements.namedItem('destination') as HTMLInputElement).value,
                          price: parseFloat((f.elements.namedItem('price') as HTMLInputElement).value),
                          duration: parseInt((f.elements.namedItem('duration') as HTMLInputElement).value),
                          shortDescription: (f.elements.namedItem('shortDescription') as HTMLInputElement).value,
                          longDescription: (f.elements.namedItem('longDescription') as HTMLTextAreaElement).value,
                          imageUrl: (f.elements.namedItem('imageUrl') as HTMLInputElement).value,
                          difficulty: (f.elements.namedItem('difficulty') as HTMLSelectElement).value as Trip['difficulty'],
                          route: (f.elements.namedItem('route') as HTMLInputElement).value,
                          gallery: editingTrip?.gallery || [],
                          itinerary: editingTrip?.itinerary || [],
                          inclusions: editingTrip?.inclusions || [],
                          exclusions: editingTrip?.exclusions || [],
                          activities: editingTrip?.activities || [],
                          routeCoordinates: editingTrip?.routeCoordinates || [],
                      };
                      if (editingTrip) onUpdateTrip({ ...editingTrip, ...data });
                      else onAddTrip(data as any);
                      setIsTripModalOpen(false);
                  }}>
                      <div className="md:col-span-2 space-y-4">
                          <label className="block text-xs font-bold uppercase tracking-widest text-muted-foreground">Tour Core Data</label>
                          <input name="title" placeholder="Tour Title (e.g. Ladakh Odyssey)" defaultValue={editingTrip?.title} required className="w-full p-3 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-lg text-sm" />
                      </div>
                      <div className="space-y-4">
                          <input name="destination" placeholder="Primary Destination" defaultValue={editingTrip?.destination} required className="w-full p-3 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-lg text-sm" />
                          <select name="difficulty" defaultValue={editingTrip?.difficulty} className="w-full p-3 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-lg text-sm">
                              <option>Intermediate</option>
                              <option>Advanced</option>
                              <option>Expert</option>
                          </select>
                      </div>
                      <div className="space-y-4">
                          <div className="flex gap-2">
                              <input name="price" type="number" placeholder="Price (INR)" defaultValue={editingTrip?.price} required className="w-1/2 p-3 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-lg text-sm" />
                              <input name="duration" type="number" placeholder="Days" defaultValue={editingTrip?.duration} required className="w-1/2 p-3 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-lg text-sm" />
                          </div>
                          <input name="imageUrl" placeholder="Featured Image URL" defaultValue={editingTrip?.imageUrl} required className="w-full p-3 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-lg text-sm" />
                      </div>
                      <div className="md:col-span-2">
                           <textarea name="shortDescription" placeholder="Teaser Text (Short)" defaultValue={editingTrip?.shortDescription} rows={2} required className="w-full p-3 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-lg text-sm mb-4" />
                           <textarea name="longDescription" placeholder="Full Itinerary / Story Description (Markdown supported)" defaultValue={editingTrip?.longDescription} rows={8} className="w-full p-3 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-lg text-sm" />
                      </div>
                      <div className="md:col-span-2">
                          <input name="route" placeholder="Route Summary (e.g. Leh - Nubra - Pangong)" defaultValue={editingTrip?.route} className="w-full p-3 bg-background dark:bg-dark-background border border-border dark:border-dark-border rounded-lg text-sm" />
                      </div>
                      <div className="md:col-span-2 flex justify-end gap-3 pt-6 border-t border-border dark:border-dark-border">
                          <button type="button" onClick={() => setIsTripModalOpen(false)} className="px-6 py-2 text-muted-foreground font-bold hover:text-foreground">Discard</button>
                          <button type="submit" className="bg-brand-primary text-white px-10 py-2 rounded-lg font-bold hover:bg-brand-primary-dark shadow-xl">Confirm Product</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Departure Modal */}
      {isDepartureModalOpen && (
          <div className="fixed inset-0 z-[120] flex items-center justify-center bg-black/70 backdrop-blur-md p-4" onClick={() => setIsDepartureModalOpen(false)}>
              <div className="bg-card dark:bg-dark-card rounded-2xl shadow-2xl max-w-lg w-full border border-border dark:border-dark-border" onClick={e => e.stopPropagation()}>
                  <div className="p-6 border-b border-border dark:border-dark-border flex justify-between items-center">
                      <h3 className="text-2xl font-bold font-display">{editingDeparture ? 'Edit' : 'Schedule'} Departure</h3>
                  </div>
                  <form className="p-6 space-y-5" onSubmit={(e) => {
                      e.preventDefault();
                      const f = e.target as HTMLFormElement;
                      const data = {
                          tripId: (f.elements.namedItem('tripId') as HTMLSelectElement).value,
                          startDate: (f.elements.namedItem('startDate') as HTMLInputElement).value,
                          endDate: (f.elements.namedItem('endDate') as HTMLInputElement).value,
                          slots: parseInt((f.elements.namedItem('slots') as HTMLInputElement).value),
                          status: (f.elements.namedItem('status') as HTMLSelectElement).value as Departure['status'],
                      };
                      if (editingDeparture) onUpdateDeparture({ ...editingDeparture, ...data });
                      else onAddDeparture(data);
                      setIsDepartureModalOpen(false);
                  }}>
                      <div>
                          <label className="block text-xs font-bold uppercase mb-1">Assigned Tour</label>
                          <select name="tripId" defaultValue={editingDeparture?.tripId} className="w-full p-3 border rounded-lg bg-background dark:bg-dark-background border-border dark:border-dark-border">
                              {trips.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                          </select>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-xs font-bold uppercase mb-1">Start Date</label>
                            <input type="date" name="startDate" defaultValue={editingDeparture?.startDate} required className="w-full p-3 border rounded-lg bg-background dark:bg-dark-background border-border dark:border-dark-border" />
                          </div>
                          <div>
                            <label className="block text-xs font-bold uppercase mb-1">End Date</label>
                            <input type="date" name="endDate" defaultValue={editingDeparture?.endDate} required className="w-full p-3 border rounded-lg bg-background dark:bg-dark-background border-border dark:border-dark-border" />
                          </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1">Total Slots</label>
                            <input type="number" name="slots" defaultValue={editingDeparture?.slots} required className="w-full p-3 border rounded-lg bg-background dark:bg-dark-background border-border dark:border-dark-border" />
                        </div>
                        <div>
                            <label className="block text-xs font-bold uppercase mb-1">Booking State</label>
                            <select name="status" defaultValue={editingDeparture?.status} className="w-full p-3 border rounded-lg bg-background dark:bg-dark-background border-border dark:border-dark-border">
                                <option>Available</option>
                                <option>Limited</option>
                                <option>Sold Out</option>
                            </select>
                        </div>
                      </div>
                      <div className="flex justify-end gap-3 pt-6">
                          <button type="button" onClick={() => setIsDepartureModalOpen(false)} className="px-6 py-2 font-bold text-muted-foreground">Cancel</button>
                          <button type="submit" className="bg-brand-primary text-white px-8 py-2 rounded-lg font-bold shadow-lg">Save Batch</button>
                      </div>
                  </form>
              </div>
          </div>
      )}

      {/* Theme Picker Component */}
      {isThemePickerOpen && (
          <ThemePicker 
            themes={themes} 
            siteContent={siteContent} 
            onClose={() => setIsThemePickerOpen(false)} 
            onSave={(newContent) => {
                onUpdateSiteContent(newContent);
                setIsThemePickerOpen(false);
            }} 
          />
      )}
    </div>
  );
};

export default AdminPage;
