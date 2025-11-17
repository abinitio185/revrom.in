import React, { useState, useMemo, useRef, useEffect } from 'react';
import type { Trip, Departure, BlogPost, GalleryPhoto, InstagramPost, GoogleReview, SiteContent, ItineraryQuery } from '../types';
import type { Theme } from '../App';
import { instagramSyncMock } from '../data/mockData';
import TripRouteMap from '../components/TripRouteMap';
import Pagination from '../components/Pagination';

interface AdminPageProps {
    trips: Trip[];
    departures: Departure[];
    blogPosts: BlogPost[];
    galleryPhotos: GalleryPhoto[];
    instagramPosts: InstagramPost[];
    googleReviews: GoogleReview[];
    siteContent: SiteContent;
    itineraryQueries: ItineraryQuery[];
    onAddTrip: (trip: Omit<Trip, 'id' | 'reviews'>) => void;
    onUpdateTrip: (trip: Trip) => void;
    onDeleteTrip: (tripId: string) => void;
    onAddDeparture: (departure: Omit<Departure, 'id'>) => void;
    onUpdateDeparture: (departure: Departure) => void;
    onDeleteDeparture: (departureId: string) => void;
    onAddBlogPost: (post: Omit<BlogPost, 'id' | 'date' | 'imageUrl'>) => Promise<void>;
    onUpdateBlogPost: (post: BlogPost) => void;
    onDeleteBlogPost: (postId: string) => void;
    onAddGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
    onUpdateGalleryPhoto: (photo: GalleryPhoto) => void;
    onDeleteGalleryPhoto: (photoId: string) => void;
    onAddInstagramPost: (post: Omit<InstagramPost, 'id'>) => void;
    onUpdateInstagramPost: (post: InstagramPost) => void;
    onDeleteInstagramPost: (postId: string) => void;
    onAddGoogleReview: (review: Omit<GoogleReview, 'id'>) => void;
    onUpdateGoogleReview: (review: GoogleReview) => void;
    onDeleteGoogleReview: (reviewId: string) => void;
    onUpdateSiteContent: (newContent: Partial<SiteContent>) => void;
    onLogout: () => void;
    theme: Theme;
}

const StarIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}>
        <path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.135-.662 1.456 0l1.86 3.847 4.25.618c.73.107 1.022.992.494 1.505l-3.076 2.998.726 4.232c.124.725-.638 1.282-1.28.948L10 15.347l-3.818 2.007c-.642.335-1.404-.223-1.28-.948l.726-4.232L2.55 8.854c-.528-.513-.236-1.398.494-1.505l4.25-.618 1.86-3.847z" clipRule="evenodd" />
    </svg>
);

const formatCoordinatesToString = (coords: [number, number][]): string => {
    if (!Array.isArray(coords)) return '';
    return coords.map(c => c.join(',')).join(';\n');
};

const parseCoordinatesFromString = (str: string): [number, number][] => {
    if (!str || typeof str !== 'string') return [];
    try {
        return str.split(';')
            .map(s => s.trim())
            .filter(s => s) // remove empty strings
            .map(pair => {
                const [lat, lng] = pair.split(',').map(numStr => parseFloat(numStr.trim()));
                if (!isNaN(lat) && !isNaN(lng)) {
                    return [lat, lng] as [number, number];
                }
                return null;
            })
            .filter((c): c is [number, number] => c !== null);
    } catch (error) {
        console.error("Error parsing coordinates:", error);
        return [];
    }
};

const usePagination = <T,>(items: T[], itemsPerPage: number = 5) => {
    const [currentPage, setCurrentPage] = useState(1);
  
    const totalPages = useMemo(() => Math.ceil(items.length / itemsPerPage), [items.length, itemsPerPage]);
  
    const currentItems = useMemo(() => {
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return items.slice(startIndex, endIndex);
    }, [items, currentPage, itemsPerPage]);
  
    const handlePageChange = (page: number) => {
      if (page > 0 && page <= totalPages) {
        setCurrentPage(page);
      }
    };
    
    useEffect(() => {
      if (currentPage > totalPages && totalPages > 0) {
          setCurrentPage(totalPages);
      } else if (items.length > 0 && currentPage === 0 && totalPages > 0) {
        setCurrentPage(1);
      }
    }, [currentPage, totalPages, items.length]);
  
    return {
      currentPage,
      totalPages,
      handlePageChange,
      currentItems,
    };
};


const AdminPage: React.FC<AdminPageProps> = (props) => {
    const { trips, departures, blogPosts, galleryPhotos, instagramPosts, googleReviews, siteContent, onLogout, itineraryQueries, theme } = props;

    // Modal & Form State
    const [modal, setModal] = useState<'TRIP' | 'DEPARTURE' | 'BLOG' | 'GALLERY' | 'INSTAGRAM' | 'REVIEW' | null>(null);
    const [formData, setFormData] = useState<any>({});
    const [isSaving, setIsSaving] = useState(false);
    
    // State for file uploads and sync
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [siteContentData, setSiteContentData] = useState<SiteContent>(siteContent);

    const findTripTitle = (tripId: string) => trips.find(t => t.id === tripId)?.title || 'Unknown Trip';
    
    // Pagination Hooks
    const { 
        currentPage: queriesCurrentPage,
        totalPages: queriesTotalPages,
        handlePageChange: handleQueriesPageChange,
        currentItems: currentQueries,
    } = usePagination(itineraryQueries, 5);

    const {
        currentPage: reviewsCurrentPage,
        totalPages: reviewsTotalPages,
        handlePageChange: handleReviewsPageChange,
        currentItems: currentReviews,
    } = usePagination(googleReviews, 5);

    const {
        currentPage: tripsCurrentPage,
        totalPages: tripsTotalPages,
        handlePageChange: handleTripsPageChange,
        currentItems: currentTrips,
    } = usePagination(trips, 5);

    const sortedDepartures = useMemo(() => [...departures].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()), [departures]);
    const {
        currentPage: departuresCurrentPage,
        totalPages: departuresTotalPages,
        handlePageChange: handleDeparturesPageChange,
        currentItems: currentDepartures,
    } = usePagination(sortedDepartures, 5);

    const {
        currentPage: blogCurrentPage,
        totalPages: blogTotalPages,
        handlePageChange: handleBlogPageChange,
        currentItems: currentBlogPosts,
    } = usePagination(blogPosts, 5);

    const {
        currentPage: galleryCurrentPage,
        totalPages: galleryTotalPages,
        handlePageChange: handleGalleryPageChange,
        currentItems: currentGalleryPhotos,
    } = usePagination(galleryPhotos, 5);

    const {
        currentPage: instagramCurrentPage,
        totalPages: instagramTotalPages,
        handlePageChange: handleInstagramPageChange,
        currentItems: currentInstagramPosts,
    } = usePagination(instagramPosts, 5);

    const handleOpenModal = (type: typeof modal, data: any | null = null) => {
        let initialData = data ? { ...data } : {};
        if (type === 'TRIP' && initialData.routeCoordinates) {
            initialData.routeCoordinates = formatCoordinatesToString(initialData.routeCoordinates);
        }
        setFormData(initialData);
        if ((type === 'GALLERY' || type === 'REVIEW') && (data?.imageUrl || data?.profilePhotoUrl)) {
            setImagePreview(data.imageUrl || data.profilePhotoUrl);
        }
        setModal(type);
    };

    const handleCloseModal = () => {
        setModal(null);
        setFormData({});
        setImagePreview(null);
        setIsSaving(false);
    };
    
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (type === 'checkbox') {
          const { checked } = e.target as HTMLInputElement;
          setFormData((prev: any) => ({ ...prev, [name]: checked }));
        } else {
          const isNumber = type === 'number';
          setFormData((prev: any) => ({ ...prev, [name]: isNumber && value !== '' ? Number(value) : value }));
        }
    };
    
    const handleSiteContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setSiteContentData(prev => ({ ...prev, [name]: value }));
    };

    const handleSaveSiteContent = () => {
        props.onUpdateSiteContent(siteContentData);
        alert('Site content updated successfully!');
    };

    const processFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                setImagePreview(result);
                // Differentiate based on modal type
                if (modal === 'GALLERY') {
                    setFormData((prev: any) => ({ ...prev, imageUrl: result }));
                } else if (modal === 'REVIEW') {
                    setFormData((prev: any) => ({ ...prev, profilePhotoUrl: result }));
                }
            };
            reader.readAsDataURL(file);
        } else {
            alert('Please select a valid image file.');
        }
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            processFile(e.target.files[0]);
        }
    };
    
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault(); e.stopPropagation(); setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) { processFile(e.dataTransfer.files[0]); }
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({...prev, [name]: value.split(',').map(item => item.trim())}));
    };
    
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);
        let finalData = { ...formData };
        if (modal === 'TRIP' && typeof finalData.routeCoordinates === 'string') {
            finalData.routeCoordinates = parseCoordinatesFromString(finalData.routeCoordinates);
        }
        
        const { id, ...data } = finalData;
        
        try {
            switch(modal) {
                case 'TRIP': id ? props.onUpdateTrip(finalData) : props.onAddTrip(data); break;
                case 'DEPARTURE': id ? props.onUpdateDeparture(formData) : props.onAddDeparture(data); break;
                case 'BLOG': 
                    if (id) {
                      props.onUpdateBlogPost(formData);
                    } else {
                      await props.onAddBlogPost(data); 
                    }
                    break;
                case 'GALLERY':
                    if (!formData.imageUrl) { alert("Please upload an image for the gallery."); setIsSaving(false); return; }
                    id ? props.onUpdateGalleryPhoto(formData) : props.onAddGalleryPhoto(data);
                    break;
                case 'INSTAGRAM': id ? props.onUpdateInstagramPost(formData) : props.onAddInstagramPost(data); break;
                case 'REVIEW': 
                    if (!formData.profilePhotoUrl) { alert("Please provide a profile photo URL or upload an image."); setIsSaving(false); return; }
                    id ? props.onUpdateGoogleReview(formData) : props.onAddGoogleReview(data); 
                    break;
            }
        } catch (error) {
            console.error("Failed to save:", error);
            alert("An error occurred while saving. Please try again.");
        } finally {
            handleCloseModal();
        }
    };

    const handleSyncInstagram = () => {
        setIsSyncing(true); setSyncMessage('');
        setTimeout(() => {
            let newPostsCount = 0;
            instagramSyncMock.forEach(item => {
                if (!galleryPhotos.some(p => p.imageUrl === item.photo.imageUrl)) {
                    props.onAddGalleryPhoto(item.photo); newPostsCount++;
                }
                if (!instagramPosts.some(p => p.imageUrl === item.post.imageUrl)) {
                    props.onAddInstagramPost(item.post);
                }
            });
            setIsSyncing(false);
            setSyncMessage(newPostsCount > 0 ? `Synced ${newPostsCount} new post(s)!` : 'Feed is already up to date!');
            setTimeout(() => setSyncMessage(''), 5000);
        }, 1500);
    };

    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onloadend = () => {
                    setSiteContentData(prev => ({ ...prev, logoUrl: reader.result as string }));
                };
                reader.readAsDataURL(file);
            } else {
                alert('Please select a valid image file (PNG, JPG, SVG).');
            }
        }
    };
    
    const currentCoords = useMemo(() => {
        if (modal === 'TRIP' && typeof formData.routeCoordinates === 'string') {
            return parseCoordinatesFromString(formData.routeCoordinates);
        }
        return [];
    }, [modal, formData.routeCoordinates]);
    
    const textContentEntries = Object.entries(siteContentData).filter(([key]) => key !== 'logoUrl');


    const renderModal = () => {
        if (!modal) return null;

        const modalTitle = `${formData.id ? 'Edit' : 'Add'} ${modal}`;
        const inputClass = "w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary";
        const textareaClass = (h: string) => `${inputClass} ${h}`;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60 backdrop-blur-sm" onClick={handleCloseModal}>
                <div className="bg-card dark:bg-dark-card text-foreground dark:text-dark-foreground p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto border border-border dark:border-dark-border" onClick={e => e.stopPropagation()}>
                    <h2 className="text-2xl font-bold font-display mb-4">{modalTitle}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {modal === 'TRIP' && ( <>
                            <input name="title" value={formData.title || ''} onChange={handleFormChange} placeholder="Title" required className={inputClass}/>
                            <input name="destination" value={formData.destination || ''} onChange={handleFormChange} placeholder="Destination" required className={inputClass}/>
                            <textarea name="shortDescription" value={formData.shortDescription || ''} onChange={handleFormChange} placeholder="Short Description" required className={textareaClass('h-20')}></textarea>
                            <textarea name="longDescription" value={formData.longDescription || ''} onChange={handleFormChange} placeholder="Long Description (Markdown)" required className={textareaClass('h-40')}></textarea>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="number" name="duration" value={formData.duration || ''} onChange={handleFormChange} placeholder="Duration (days)" required className={inputClass}/>
                                <input type="number" name="price" value={formData.price || ''} onChange={handleFormChange} placeholder="Price (INR)" required className={inputClass}/>
                            </div>
                            <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleFormChange} placeholder="Main Image URL" required className={inputClass}/>
                            <input name="route" value={formData.route || ''} onChange={handleFormChange} placeholder="Route" required className={inputClass}/>
                            <select name="difficulty" value={formData.difficulty || 'Intermediate'} onChange={handleFormChange} required className={inputClass}><option>Intermediate</option><option>Advanced</option><option>Expert</option></select>
                            <textarea name="inclusions" value={Array.isArray(formData.inclusions) ? formData.inclusions.join(', ') : ''} onChange={handleArrayChange} placeholder="Inclusions (comma-separated)" className={textareaClass('h-24')}></textarea>
                            <textarea name="exclusions" value={Array.isArray(formData.exclusions) ? formData.exclusions.join(', ') : ''} onChange={handleArrayChange} placeholder="Exclusions (comma-separated)" className={textareaClass('h-24')}></textarea>
                            <textarea name="activities" value={Array.isArray(formData.activities) ? formData.activities.join(', ') : ''} onChange={handleArrayChange} placeholder="Activities (comma-separated)" className={textareaClass('h-24')}></textarea>
                            <textarea name="gallery" value={Array.isArray(formData.gallery) ? formData.gallery.join(', ') : ''} onChange={handleArrayChange} placeholder="Gallery URLs (comma-separated)" className={textareaClass('h-24')}></textarea>
                            <div>
                                <label htmlFor="routeCoordinates" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-1">Route Coordinates</label>
                                <textarea name="routeCoordinates" id="routeCoordinates" value={formData.routeCoordinates || ''} onChange={handleFormChange} placeholder="Enter coordinates: lat,lng; lat,lng; ..." className={textareaClass('h-24 font-mono text-sm')}></textarea>
                                {currentCoords.length > 1 && (
                                  <div className="mt-4 rounded-lg overflow-hidden shadow">
                                    <TripRouteMap coordinates={currentCoords} theme={theme} />
                                  </div>
                                )}
                            </div>
                        </>)}
                         {modal === 'DEPARTURE' && (<>
                            <select name="tripId" value={formData.tripId || ''} onChange={handleFormChange} required className={inputClass}><option value="">Select a Trip</option>{trips.map(trip => <option key={trip.id} value={trip.id}>{trip.title}</option>)}</select>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <input type="date" name="startDate" value={formData.startDate || ''} onChange={handleFormChange} required className={inputClass}/>
                                <input type="date" name="endDate" value={formData.endDate || ''} onChange={handleFormChange} required className={inputClass}/>
                                <input type="number" name="slots" value={formData.slots || ''} onChange={handleFormChange} placeholder="Slots" required className={inputClass}/>
                                <select name="status" value={formData.status || 'Available'} onChange={handleFormChange} required className={inputClass}><option>Available</option><option>Limited</option><option>Sold Out</option></select>
                            </div>
                        </>)}
                        {modal === 'BLOG' && (<>
                            <input name="title" value={formData.title || ''} onChange={handleFormChange} placeholder="Title" required className={inputClass}/>
                            <input name="author" value={formData.author || ''} onChange={handleFormChange} placeholder="Author" required className={inputClass}/>
                            {!formData.id && <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground bg-blue-50 dark:bg-blue-900/20 p-3 rounded-md">A featured image will be automatically generated by AI based on the title and excerpt upon saving.</p>}
                            {formData.id && <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleFormChange} placeholder="Image URL" required className={inputClass}/>}
                            <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleFormChange} placeholder="Excerpt" required className={textareaClass('h-24')}></textarea>
                            <textarea name="content" value={formData.content || ''} onChange={handleFormChange} placeholder="Full Content" required className={textareaClass('h-40')}></textarea>
                        </>)}
                        {modal === 'GALLERY' && (<>
                             <div onClick={() => fileInputRef.current?.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`relative w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${ isDragging ? 'border-brand-primary bg-slate-50 dark:bg-slate-800' : 'border-border dark:border-dark-border hover:border-brand-primary-dark' }`}><input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />{imagePreview ? <img src={imagePreview} alt="Preview" className="w-full h-40 object-contain rounded" /> : <div className="text-center text-muted-foreground dark:text-dark-muted-foreground"><p className="mt-2">Drag & drop, or <span className="font-semibold text-brand-primary-dark">click to select</span></p></div>}</div>
                            <input name="caption" value={formData.caption || ''} onChange={handleFormChange} placeholder="Caption" required className={inputClass}/>
                            <select name="category" value={formData.category || 'Landscapes'} onChange={handleFormChange} required className={inputClass}><option>Landscapes</option><option>Riders</option><option>Culture</option><option>Behind the Scenes</option></select>
                        </>)}
                        {modal === 'INSTAGRAM' && (<>
                            <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleFormChange} placeholder="Image URL" required className={inputClass}/>
                            <select name="type" value={formData.type || 'photo'} onChange={handleFormChange} required className={inputClass}><option value="photo">Photo</option><option value="reel">Reel</option></select>
                            <input type="number" name="likes" value={formData.likes || ''} onChange={handleFormChange} placeholder="Likes" required className={inputClass}/>
                            <input type="number" name="comments" value={formData.comments || ''} onChange={handleFormChange} placeholder="Comments" required className={inputClass}/>
                        </>)}
                        {modal === 'REVIEW' && (<>
                             <input name="authorName" value={formData.authorName || ''} onChange={handleFormChange} placeholder="Author Name" required className={inputClass}/>
                             <div onClick={() => fileInputRef.current?.click()} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className={`relative w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${ isDragging ? 'border-brand-primary bg-slate-50 dark:bg-slate-800' : 'border-border dark:border-dark-border hover:border-brand-primary-dark' }`}><input ref={fileInputRef} type="file" accept="image/*" onChange={handleFileChange} className="hidden" />{imagePreview ? <img src={imagePreview} alt="Preview" className="w-24 h-24 object-cover rounded-full mx-auto" /> : <div className="text-center text-muted-foreground dark:text-dark-muted-foreground"><p className="mt-2">Drag & drop profile photo, or <span className="font-semibold text-brand-primary-dark">click to select</span></p></div>}</div>
                             <textarea name="text" value={formData.text || ''} onChange={handleFormChange} placeholder="Review Text" required className={textareaClass('h-24')}></textarea>
                             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                 <div><label className="font-medium">Rating:</label><input type="number" name="rating" value={formData.rating || 5} onChange={handleFormChange} min="1" max="5" required className="ml-2 w-20 p-2 border rounded"/></div>
                                 <div className="flex items-center"><input type="checkbox" id="isFeatured" name="isFeatured" checked={formData.isFeatured || false} onChange={handleFormChange} className="h-4 w-4 text-brand-primary-dark focus:ring-brand-primary border-gray-300 rounded"/><label htmlFor="isFeatured" className="ml-2">Feature on homepage</label></div>
                             </div>
                        </>)}
                        <div className="flex justify-end space-x-4 pt-4">
                            <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-slate-200 dark:bg-slate-600 rounded hover:bg-slate-300 dark:hover:bg-slate-500">Cancel</button>
                            <button type="submit" disabled={isSaving} className="px-4 py-2 bg-brand-primary text-white rounded hover:bg-brand-primary-dark disabled:bg-brand-primary/50">
                                {isSaving ? (modal === 'BLOG' && !formData.id ? 'Saving & Generating Image...' : 'Saving...') : 'Save'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground min-h-screen">
            <header className="bg-card dark:bg-dark-card shadow-md p-4 sticky top-0 z-40 border-b border-border dark:border-dark-border">
                <div className="container mx-auto flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                    <h1 className="text-xl sm:text-2xl font-bold font-display text-foreground dark:text-dark-foreground">Admin Dashboard</h1>
                    <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md w-full sm:w-auto">Logout</button>
                </div>
            </header>
            <main className="container mx-auto p-4 md:p-6 space-y-8">
                {/* Website Content Management */}
                <section className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-border dark:border-dark-border">
                    <h2 className="text-xl font-bold font-display mb-4">Website Content Management</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {textContentEntries.map(([key, value]) => (
                            <div key={key}>
                                <label htmlFor={key} className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                <input type="text" id={key} name={key} value={value} onChange={handleSiteContentChange} className="mt-1 w-full p-2 border rounded border-border dark:border-dark-border bg-background dark:bg-dark-background" />
                            </div>
                        ))}
                        <div className="md:col-span-2">
                            <label htmlFor="logoUpload" className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Logo</label>
                            <div className="mt-1 flex items-center gap-4">
                                {siteContentData.logoUrl && <img src={siteContentData.logoUrl} alt="Current Logo" className="h-12 w-auto bg-slate-200 dark:bg-slate-700 p-1 rounded" />}
                                <input 
                                    type="file" 
                                    id="logoUpload" 
                                    name="logoUpload" 
                                    accept="image/png, image/jpeg, image/svg+xml" 
                                    onChange={handleLogoUpload} 
                                    className="block w-full text-sm text-muted-foreground dark:text-dark-muted-foreground file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-100 dark:file:bg-slate-700 file:text-brand-primary dark:file:text-brand-primary-dark hover:file:bg-slate-200 dark:hover:file:bg-slate-600"
                                />
                            </div>
                        </div>
                    </div>
                    <div className="text-right mt-4"><button onClick={handleSaveSiteContent} className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Save Content</button></div>
                </section>
                
                {/* Itinerary Queries / Leads */}
                <section className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-border dark:border-dark-border">
                    <h2 className="text-xl font-bold font-display mb-4">Itinerary Queries / Leads</h2>
                    {itineraryQueries.length > 0 ? (
                        <>
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b border-border dark:border-dark-border">
                                            <th className="p-2 text-left">Date</th>
                                            <th className="p-2 text-left">Customer Name</th>
                                            <th className="p-2 text-left">WhatsApp</th>
                                            <th className="p-2 text-left">Interested Tour</th>
                                            <th className="p-2 text-left">Planning Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentQueries.map(query => (
                                            <tr key={query.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800">
                                                <td className="p-2">{new Date(query.date).toLocaleDateString()}</td>
                                                <td className="p-2">{query.name}</td>
                                                <td className="p-2">{query.whatsappNumber}</td>
                                                <td className="p-2">{query.tripTitle}</td>
                                                <td className="p-2">{query.planningTime}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                            <Pagination 
                                currentPage={queriesCurrentPage}
                                totalPages={queriesTotalPages}
                                onPageChange={handleQueriesPageChange}
                            />
                        </>
                    ) : (
                        <p className="text-muted-foreground dark:text-dark-muted-foreground">No new itinerary queries yet.</p>
                    )}
                </section>

                {/* Google Reviews Management */}
                <section className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-border dark:border-dark-border">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                        <h2 className="text-xl font-bold font-display">Google Reviews Management</h2>
                        <button onClick={() => handleOpenModal('REVIEW')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto">Add Review</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                           <thead><tr className="border-b border-border dark:border-dark-border"><th className="p-2 text-left">Author</th><th className="p-2 text-left">Rating</th><th className="p-2 text-left">Featured</th><th className="p-2 text-right">Actions</th></tr></thead>
                           <tbody>
                            {currentReviews.map(review => (
                                <tr key={review.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800">
                                    <td className="p-2 flex items-center gap-2"><img src={review.profilePhotoUrl} alt={review.authorName} className="w-8 h-8 rounded-full" loading="lazy" />{review.authorName}</td>
                                    <td className="p-2"><div className="flex">{[...Array(review.rating)].map((_, i) => <StarIcon key={i} className="w-4 h-4 text-yellow-400"/>)}</div></td>
                                    <td>{review.isFeatured ? 'Yes' : 'No'}</td>
                                    <td className="p-2 text-right space-x-2"><button onClick={() => handleOpenModal('REVIEW', review)} className="text-blue-600 hover:underline">Edit</button><button onClick={() => props.onDeleteGoogleReview(review.id)} className="text-red-600 hover:underline">Delete</button></td>
                                </tr>
                            ))}
                           </tbody>
                        </table>
                    </div>
                    <Pagination 
                        currentPage={reviewsCurrentPage}
                        totalPages={reviewsTotalPages}
                        onPageChange={handleReviewsPageChange}
                    />
                </section>
                
                {/* Tour Management */}
                <section className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-border dark:border-dark-border">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4"><h2 className="text-xl font-bold font-display">Tour Management</h2><button onClick={() => handleOpenModal('TRIP')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto">Add Tour</button></div>
                    <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border dark:border-dark-border"><th className="p-2 text-left">Title</th><th className="p-2 text-left">Duration</th><th className="p-2 text-left">Price</th><th className="p-2 text-right">Actions</th></tr></thead><tbody>{currentTrips.map(trip => (<tr key={trip.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800"><td className="p-2">{trip.title}</td><td>{trip.duration} days</td><td>₹{trip.price.toLocaleString('en-IN')}</td><td className="p-2 text-right space-x-2"><button onClick={() => handleOpenModal('TRIP', trip)} className="text-blue-600 hover:underline">Edit</button><button onClick={() => props.onDeleteTrip(trip.id)} className="text-red-600 hover:underline">Delete</button></td></tr>))}</tbody></table></div>
                    <Pagination 
                        currentPage={tripsCurrentPage}
                        totalPages={tripsTotalPages}
                        onPageChange={handleTripsPageChange}
                    />
                </section>
                
                {/* Departure Management */}
                <section className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-border dark:border-dark-border">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4"><h2 className="text-xl font-bold font-display">Departure Management</h2><button onClick={() => handleOpenModal('DEPARTURE')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto">Add Departure</button></div>
                    <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border dark:border-dark-border"><th className="p-2 text-left">Trip</th><th className="p-2 text-left">Start Date</th><th className="p-2 text-left">Slots</th><th className="p-2 text-left">Status</th><th className="p-2 text-right">Actions</th></tr></thead><tbody>{currentDepartures.map(dep => (<tr key={dep.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800"><td className="p-2">{findTripTitle(dep.tripId)}</td><td>{dep.startDate}</td><td>{dep.slots}</td><td>{dep.status}</td><td className="p-2 text-right space-x-2"><button onClick={() => handleOpenModal('DEPARTURE', dep)} className="text-blue-600 hover:underline">Edit</button><button onClick={() => props.onDeleteDeparture(dep.id)} className="text-red-600 hover:underline">Delete</button></td></tr>))}</tbody></table></div>
                    <Pagination
                        currentPage={departuresCurrentPage}
                        totalPages={departuresTotalPages}
                        onPageChange={handleDeparturesPageChange}
                    />
                </section>

                {/* Blog Management */}
                <section className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-border dark:border-dark-border">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                        <h2 className="text-xl font-bold font-display">Blog Management</h2>
                        <button onClick={() => handleOpenModal('BLOG')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto">Add Blog Post</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border dark:border-dark-border">
                                    <th className="p-2 text-left">Title</th>
                                    <th className="p-2 text-left">Author</th>
                                    <th className="p-2 text-left">Date</th>
                                    <th className="p-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentBlogPosts.map(post => (
                                    <tr key={post.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800">
                                        <td className="p-2">{post.title}</td>
                                        <td className="p-2">{post.author}</td>
                                        <td className="p-2">{post.date}</td>
                                        <td className="p-2 text-right space-x-2">
                                            <button onClick={() => handleOpenModal('BLOG', post)} className="text-blue-600 hover:underline">Edit</button>
                                            <button onClick={() => props.onDeleteBlogPost(post.id)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination 
                        currentPage={blogCurrentPage}
                        totalPages={blogTotalPages}
                        onPageChange={handleBlogPageChange}
                    />
                </section>
                
                {/* Gallery Management */}
                <section className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-border dark:border-dark-border">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                        <h2 className="text-xl font-bold font-display">Gallery Management</h2>
                        <button onClick={() => handleOpenModal('GALLERY')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto">Add Photo</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border dark:border-dark-border">
                                    <th className="p-2 text-left">Preview</th>
                                    <th className="p-2 text-left">Caption</th>
                                    <th className="p-2 text-left">Category</th>
                                    <th className="p-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentGalleryPhotos.map(photo => (
                                    <tr key={photo.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800">
                                        <td className="p-2"><img src={photo.imageUrl} alt={photo.caption} className="w-16 h-12 object-cover rounded" loading="lazy" /></td>
                                        <td className="p-2">{photo.caption}</td>
                                        <td className="p-2">{photo.category}</td>
                                        <td className="p-2 text-right space-x-2">
                                            <button onClick={() => handleOpenModal('GALLERY', photo)} className="text-blue-600 hover:underline">Edit</button>
                                            <button onClick={() => props.onDeleteGalleryPhoto(photo.id)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination 
                        currentPage={galleryCurrentPage}
                        totalPages={galleryTotalPages}
                        onPageChange={handleGalleryPageChange}
                    />
                </section>

                {/* Instagram Management */}
                <section className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-md border border-border dark:border-dark-border">
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                        <h2 className="text-xl font-bold font-display">Instagram Management</h2>
                        <div className="flex gap-2">
                            <button onClick={handleSyncInstagram} disabled={isSyncing} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-purple-300">
                                {isSyncing ? 'Syncing...' : 'Sync with Instagram'}
                            </button>
                            <button onClick={() => handleOpenModal('INSTAGRAM')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto">Add Post</button>
                        </div>
                    </div>
                    {syncMessage && <p className="mb-4 text-center text-sm font-semibold">{syncMessage}</p>}
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-border dark:border-dark-border">
                                    <th className="p-2 text-left">Preview</th>
                                    <th className="p-2 text-left">Type</th>
                                    <th className="p-2 text-left">Likes</th>
                                    <th className="p-2 text-left">Comments</th>
                                    <th className="p-2 text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {currentInstagramPosts.map(post => (
                                    <tr key={post.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800">
                                        <td className="p-2"><img src={post.imageUrl} alt="Instagram Post" className="w-12 h-12 object-cover rounded" loading="lazy"/></td>
                                        <td className="p-2 capitalize">{post.type}</td>
                                        <td className="p-2">{post.likes}</td>
                                        <td className="p-2">{post.comments}</td>
                                        <td className="p-2 text-right space-x-2">
                                            <button onClick={() => handleOpenModal('INSTAGRAM', post)} className="text-blue-600 hover:underline">Edit</button>
                                            <button onClick={() => props.onDeleteInstagramPost(post.id)} className="text-red-600 hover:underline">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <Pagination 
                        currentPage={instagramCurrentPage}
                        totalPages={instagramTotalPages}
                        onPageChange={handleInstagramPageChange}
                    />
                </section>
            </main>
            {renderModal()}
        </div>
    );
};

export default AdminPage;
