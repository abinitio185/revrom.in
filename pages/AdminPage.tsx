
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
const ToursIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 14v6m-3-3h6M6 10h2a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2zm10 0h2a2 2 0 002-2V6a2 2 0 00-2-2h-2a2 2 0 00-2 2v2a2 2 0 002 2zM6 20h2a2 2 0 002-2v-2a2 2 0 00-2-2H6a2 2 0 00-2 2v2a2 2 0 002 2z" /></svg>;
const ContentIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>;
const MediaIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const LeadsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>;
const SettingsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const BuilderIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" /></svg>;
const PencilIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.5L15.232 5.232z" /></svg>;
const TrashIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg>;
const PlusIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>;
const SyncIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h5M20 20v-5h-5M4 4l1.5 1.5A9 9 0 0120.4 18M20 20l-1.5-1.5A9 9 0 003.6 6" /></svg>;
const StarIcon: React.FC<{ className?: string }> = ({ className }) => <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className={className}><path fillRule="evenodd" d="M10.868 2.884c.321-.662 1.135-.662 1.456 0l1.86 3.847 4.25.618c.73.107 1.022.992.494 1.505l-3.076 2.998.726 4.232c.124.725-.638 1.282-1.28.948L10 15.347l-3.818 2.007c-.642.335-1.404-.223-1.28-.948l.726-4.232L2.55 8.854c-.528-.513-.236-1.398.494-1.505l4.25-.618 1.86-3.847z" clipRule="evenodd" /></svg>;
const ChevronUpIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg>;
const ChevronDownIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg>;
const EyeIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" /></svg>;
const EyeOffIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" /></svg>;
const SearchIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>;

// --- Helper Functions ---
const formatCoordinatesToString = (coords: [number, number][]): string => {
    if (!Array.isArray(coords)) return '';
    return coords.map(c => c.join(',')).join(';\n');
};
const parseCoordinatesFromString = (str: string): [number, number][] => {
    if (!str || typeof str !== 'string') return [];
    try {
        return str.split(';').map(s => s.trim()).filter(s => s).map(pair => {
            const [lat, lng] = pair.split(',').map(numStr => parseFloat(numStr.trim()));
            return (!isNaN(lat) && !isNaN(lng)) ? [lat, lng] as [number, number] : null;
        }).filter((c): c is [number, number] => c !== null);
    } catch (error) {
        console.error("Error parsing coordinates:", error);
        return [];
    }
};

// --- Hooks ---
const usePagination = <T,>(items: T[], itemsPerPage: number = 5) => {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = useMemo(() => Math.ceil(items.length / itemsPerPage), [items.length, itemsPerPage]);
    const currentItems = useMemo(() => {
        const startIndex = (currentPage - 1) * itemsPerPage;
        return items.slice(startIndex, startIndex + itemsPerPage);
    }, [items, currentPage, itemsPerPage]);
    const handlePageChange = (page: number) => {
        if (page > 0 && page <= totalPages) {
            setCurrentPage(page);
        }
    };
    useEffect(() => {
        if (currentPage > totalPages && totalPages > 0) setCurrentPage(totalPages);
        else if (items.length > 0 && currentPage === 0 && totalPages > 0) setCurrentPage(1);
    }, [currentPage, totalPages, items.length]);
    return { currentPage, totalPages, onPageChange: handlePageChange, currentItems };
};

type AdminTab = 'builder' | 'tours' | 'content' | 'media' | 'leads' | 'settings' | 'seo';

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const { trips, departures, blogPosts, galleryPhotos, instagramPosts, googleReviews, siteContent, onLogout, itineraryQueries, customPages, theme } = props;
    const [activeTab, setActiveTab] = useState<AdminTab>('tours');
    const [modal, setModal] = useState<'TRIP' | 'DEPARTURE' | 'BLOG' | 'GALLERY' | 'INSTAGRAM' | 'REVIEW' | 'PAGE' | null>(null);
    const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
    const [formData, setFormData] = useState<any>({});
    const [isSaving, setIsSaving] = useState(false);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [siteContentData, setSiteContentData] = useState<SiteContent>(siteContent);
    const [tourSearchTerm, setTourSearchTerm] = useState('');
    const [departureSearchTerm, setDepartureSearchTerm] = useState('');

    useEffect(() => setSiteContentData(siteContent), [siteContent]);

    const findTripTitle = (tripId: string) => trips.find(t => t.id === tripId)?.title || 'Unknown Trip';
    
    // Filtering logic
    const filteredTrips = useMemo(() => {
        if (!tourSearchTerm) return trips;
        return trips.filter(trip =>
            trip.title.toLowerCase().includes(tourSearchTerm.toLowerCase())
        );
    }, [trips, tourSearchTerm]);

    const sortedDepartures = useMemo(() => [...departures].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime()), [departures]);

    const filteredDepartures = useMemo(() => {
        if (!departureSearchTerm) return sortedDepartures;
        const tripMap = new Map<string, string>(trips.map(trip => [trip.id, trip.title] as [string, string]));
        const searchTermLower = departureSearchTerm.toLowerCase();
        return sortedDepartures.filter(dep => {
            const tripTitle = tripMap.get(dep.tripId);
            const titleString = tripTitle || '';
            const matchesTitle = titleString.toLowerCase().includes(searchTermLower);
            const matchesDate = dep.startDate.includes(departureSearchTerm);
            return matchesTitle || matchesDate;
        });
    }, [sortedDepartures, departureSearchTerm, trips]);

    // Layout Management Logic
    const moveSection = (index: number, direction: 'up' | 'down') => {
        if (!siteContentData.homePageLayout) return;
        const newLayout = [...siteContentData.homePageLayout];
        if (direction === 'up' && index > 0) {
            [newLayout[index], newLayout[index - 1]] = [newLayout[index - 1], newLayout[index]];
        } else if (direction === 'down' && index < newLayout.length - 1) {
            [newLayout[index], newLayout[index + 1]] = [newLayout[index + 1], newLayout[index]];
        }
        const updatedContent = { ...siteContentData, homePageLayout: newLayout };
        setSiteContentData(updatedContent);
        props.onUpdateSiteContent(updatedContent);
    };

    const toggleSectionVisibility = (index: number) => {
        if (!siteContentData.homePageLayout) return;
        const newLayout = [...siteContentData.homePageLayout];
        newLayout[index].isVisible = !newLayout[index].isVisible;
        const updatedContent = { ...siteContentData, homePageLayout: newLayout };
        setSiteContentData(updatedContent);
        props.onUpdateSiteContent(updatedContent);
    };


    // Pagination Hooks
    const queriesPagination = usePagination(itineraryQueries, 5);
    const reviewsPagination = usePagination(googleReviews, 5);
    const tripsPagination = usePagination(filteredTrips, 5);
    const departuresPagination = usePagination(filteredDepartures, 5);
    const blogPagination = usePagination(blogPosts, 5);
    const galleryPagination = usePagination(galleryPhotos, 5);
    const instagramPagination = usePagination(instagramPosts, 5);

    const handleOpenModal = (type: typeof modal, data: any | null = null) => {
        let initialData = data ? { ...data } : {};
        if (type === 'TRIP' && initialData.routeCoordinates) {
            initialData.routeCoordinates = formatCoordinatesToString(initialData.routeCoordinates);
        }
        // Ensure nested SEO object exists for editing
        if ((type === 'TRIP' || type === 'BLOG' || type === 'PAGE') && !initialData.seo) {
            initialData.seo = { title: '', description: '', keywords: '', ogImage: '' };
        }
        
        setFormData(initialData);
        if ((type === 'GALLERY' || type === 'REVIEW' || type === 'BLOG' || type === 'PAGE') && (data?.imageUrl || data?.profilePhotoUrl)) {
            setImagePreview(data.imageUrl || data.profilePhotoUrl);
        }
        setModal(type);
    };

    const handleCloseModal = () => { setModal(null); setFormData({}); setImagePreview(null); setIsSaving(false); };
    
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        if (name.startsWith('seo.')) {
            const seoField = name.split('.')[1];
            setFormData((prev: any) => ({
                ...prev,
                seo: {
                    ...prev.seo,
                    [seoField]: value
                }
            }));
        } else if (type === 'checkbox') {
          const { checked } = e.target as HTMLInputElement;
          setFormData((prev: any) => ({ ...prev, [name]: checked }));
        } else {
          const isNumber = type === 'number';
          setFormData((prev: any) => ({ ...prev, [name]: isNumber && value !== '' ? Number(value) : value }));
        }
    };
    const handleSiteContentChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        if (name.startsWith('globalSeo.')) {
             const seoField = name.split('.')[1];
             setSiteContentData(prev => ({
                 ...prev,
                 globalSeo: {
                     ...prev.globalSeo,
                     [seoField]: value
                 }
             }));
        } else {
            setSiteContentData(prev => ({ ...prev, [name]: value }));
        }
    };
    const handleSaveSiteContent = () => {
        props.onUpdateSiteContent(siteContentData);
        localStorage.setItem('siteContent', JSON.stringify(siteContentData));
        alert('Website content saved successfully!');
    };
    const handleThemeSave = (updatedContent: SiteContent) => { setSiteContentData(updatedContent); props.onUpdateSiteContent(updatedContent); setIsThemeModalOpen(false); alert('Theme updated successfully!'); };
    const processFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                setImagePreview(result);
                if (modal === 'GALLERY') setFormData((prev: any) => ({ ...prev, imageUrl: result }));
                else if (modal === 'BLOG' || modal === 'PAGE') setFormData((prev: any) => ({ ...prev, imageUrl: result }));
                else if (modal === 'REVIEW') setFormData((prev: any) => ({ ...prev, profilePhotoUrl: result }));
            };
            reader.readAsDataURL(file);
        } else alert('Please select a valid image file.');
    };
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => { if (e.target.files?.[0]) processFile(e.target.files[0]); };
    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(true); };
    const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); };
    const handleDrop = (e: React.DragEvent<HTMLDivElement>) => { e.preventDefault(); e.stopPropagation(); setIsDragging(false); if (e.dataTransfer.files?.[0]) processFile(e.dataTransfer.files[0]); };
    const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setFormData((prev: any) => ({...prev, [e.target.name]: e.target.value.split(',').map(item => item.trim())}));
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
                case 'BLOG': id ? props.onUpdateBlogPost(formData) : await props.onAddBlogPost(data); break;
                case 'GALLERY':
                    if (!formData.imageUrl) { alert("Please upload an image."); setIsSaving(false); return; }
                    id ? props.onUpdateGalleryPhoto(formData) : props.onAddGalleryPhoto(data); break;
                case 'INSTAGRAM': id ? props.onUpdateInstagramPost(formData) : props.onAddInstagramPost(data); break;
                case 'REVIEW': 
                    if (!formData.profilePhotoUrl) { alert("Please provide a profile photo."); setIsSaving(false); return; }
                    id ? props.onUpdateGoogleReview(formData) : props.onAddGoogleReview(data); break;
                case 'PAGE':
                    id ? props.onUpdateCustomPage(formData) : props.onAddCustomPage(data); break;
            }
        } catch (error) { console.error("Failed to save:", error); alert("An error occurred."); }
        finally { handleCloseModal(); }
    };
    const handleSyncInstagram = () => {
        setIsSyncing(true); setSyncMessage('');
        setTimeout(() => {
            let newPostsCount = 0;
            instagramSyncMock.forEach(item => {
                if (!galleryPhotos.some(p => p.imageUrl === item.photo.imageUrl)) { props.onAddGalleryPhoto(item.photo); newPostsCount++; }
                if (!instagramPosts.some(p => p.imageUrl === item.post.imageUrl)) { props.onAddInstagramPost(item.post); }
            });
            setIsSyncing(false);
            setSyncMessage(newPostsCount > 0 ? `Synced ${newPostsCount} new post(s)!` : 'Feed is up to date!');
            setTimeout(() => setSyncMessage(''), 5000);
        }, 1500);
    };
    const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files?.[0]) {
            const file = e.target.files[0];
            const validTypes = ['image/png', 'image/jpeg', 'image/svg+xml'];
            if (validTypes.includes(file.type)) {
                const reader = new FileReader();
                reader.onloadend = () => setSiteContentData(prev => ({ ...prev, logoUrl: reader.result as string }));
                reader.readAsDataURL(file);
            } else alert('Please select a valid image file (PNG, JPG, SVG).');
        }
    };
    const currentCoords = useMemo(() => (modal === 'TRIP' && typeof formData.routeCoordinates === 'string') ? parseCoordinatesFromString(formData.routeCoordinates) : [], [modal, formData.routeCoordinates]);
    const textContentEntries = Object.entries(siteContentData).filter(([key]) => !['logoUrl', 'activeTheme', 'customThemeColors', 'homePageLayout', 'globalSeo'].includes(key));
    
    const navItems = [
        { id: 'tours', label: 'Tours & Departures', icon: <ToursIcon /> },
        { id: 'builder', label: 'Site Builder', icon: <BuilderIcon /> },
        { id: 'content', label: 'Text Content', icon: <ContentIcon /> },
        { id: 'seo', label: 'SEO', icon: <SearchIcon /> },
        { id: 'media', label: 'Media Gallery', icon: <MediaIcon /> },
        { id: 'leads', label: 'Leads & Reviews', icon: <LeadsIcon /> },
        { id: 'settings', label: 'Settings', icon: <SettingsIcon /> },
    ];

    const renderContent = () => {
        const Section: React.FC<{title: string, buttonLabel?: string, onButtonClick?: () => void, children: React.ReactNode}> = ({title, buttonLabel, onButtonClick, children}) => (
            <section className="bg-card dark:bg-dark-card p-4 sm:p-6 rounded-lg shadow-md border border-border dark:border-dark-border">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 gap-4">
                    <h2 className="text-xl font-bold font-display">{title}</h2>
                    {buttonLabel && <button onClick={onButtonClick} className="flex items-center justify-center bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 w-full sm:w-auto text-sm font-semibold"><PlusIcon/> {buttonLabel}</button>}
                </div>
                {children}
            </section>
        );

        const Table: React.FC<{headers: string[], children: React.ReactNode}> = ({ headers, children }) => (
            <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="border-b border-border dark:border-dark-border">{headers.map(h => <th key={h} className={`p-2 text-left ${h === 'Actions' && 'text-right'}`}>{h}</th>)}</tr></thead><tbody>{children}</tbody></table></div>
        );

        const ActionButtons: React.FC<{onEdit: () => void, onDelete: () => void}> = ({onEdit, onDelete}) => (
            <div className="flex justify-end space-x-2">
                <button onClick={onEdit} className="text-blue-600 hover:text-blue-800 p-1"><PencilIcon/></button>
                <button onClick={onDelete} className="text-red-600 hover:text-red-800 p-1"><TrashIcon/></button>
            </div>
        );

        switch (activeTab) {
            case 'tours': return (
                <div className="space-y-8">
                    <Section title="Tour Management" buttonLabel="Add Tour" onButtonClick={() => handleOpenModal('TRIP')}>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search tours by title..."
                                value={tourSearchTerm}
                                onChange={e => setTourSearchTerm(e.target.value)}
                                className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary sm:max-w-xs"
                            />
                        </div>
                        <Table headers={["Title", "Duration", "Price", "Actions"]}>
                            {tripsPagination.currentItems.map(trip => (<tr key={trip.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800"><td className="p-2">{trip.title}</td><td>{trip.duration} days</td><td>₹{trip.price.toLocaleString('en-IN')}</td><td className="p-2 text-right"><ActionButtons onEdit={() => handleOpenModal('TRIP', trip)} onDelete={() => props.onDeleteTrip(trip.id)} /></td></tr>))}
                        </Table>
                        <Pagination {...tripsPagination} />
                    </Section>
                    <Section title="Departure Management" buttonLabel="Add Departure" onButtonClick={() => handleOpenModal('DEPARTURE')}>
                        <div className="mb-4">
                            <input
                                type="text"
                                placeholder="Search by tour title or date..."
                                value={departureSearchTerm}
                                onChange={e => setDepartureSearchTerm(e.target.value)}
                                className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary sm:max-w-xs"
                            />
                        </div>
                        <Table headers={["Trip", "Start Date", "Slots", "Status", "Actions"]}>
                            {departuresPagination.currentItems.map(dep => (<tr key={dep.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800"><td className="p-2">{findTripTitle(dep.tripId)}</td><td>{dep.startDate}</td><td>{dep.slots}</td><td>{dep.status}</td><td className="p-2 text-right"><ActionButtons onEdit={() => handleOpenModal('DEPARTURE', dep)} onDelete={() => props.onDeleteDeparture(dep.id)} /></td></tr>))}
                        </Table>
                        <Pagination {...departuresPagination} />
                    </Section>
                </div>
            );
            case 'builder': return (
                <div className="space-y-8">
                    <Section title="Homepage Layout">
                        <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground mb-4">Reorder or hide sections to customize your homepage.</p>
                        <div className="space-y-2">
                            {(siteContentData.homePageLayout || []).map((section, index) => (
                                <div key={section.id} className={`flex items-center justify-between p-3 rounded border ${section.isVisible ? 'bg-background dark:bg-dark-background border-border dark:border-dark-border' : 'bg-gray-100 dark:bg-gray-800 border-transparent opacity-75'}`}>
                                    <div className="flex items-center gap-3">
                                        <span className="font-medium text-foreground dark:text-dark-foreground">{section.label}</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <button onClick={() => moveSection(index, 'up')} disabled={index === 0} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"><ChevronUpIcon /></button>
                                        <button onClick={() => moveSection(index, 'down')} disabled={index === (siteContentData.homePageLayout?.length || 0) - 1} className="p-1 rounded hover:bg-slate-200 dark:hover:bg-slate-700 disabled:opacity-30"><ChevronDownIcon /></button>
                                        <button onClick={() => toggleSectionVisibility(index)} className={`p-1 rounded ${section.isVisible ? 'text-green-600 hover:bg-green-100' : 'text-gray-400 hover:bg-gray-200'}`}>{section.isVisible ? <EyeIcon /> : <EyeOffIcon />}</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <button onClick={handleSaveSiteContent} className="mt-4 bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded text-sm font-semibold">Save Layout</button>
                    </Section>
                    <Section title="Custom Pages" buttonLabel="Add Page" onButtonClick={() => handleOpenModal('PAGE')}>
                         <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground mb-4">Create extra pages (e.g. About Us, Visa Info) that appear in the navigation menu.</p>
                         <Table headers={["Title", "Slug", "Visibility", "Actions"]}>
                            {customPages.map(page => (
                                <tr key={page.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800">
                                    <td className="p-2">{page.title}</td>
                                    <td>/{page.slug}</td>
                                    <td>
                                        <span className={`px-2 py-1 rounded-full text-xs font-bold ${page.isVisible ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                                            {page.isVisible ? 'Visible' : 'Hidden'}
                                        </span>
                                    </td>
                                    <td className="p-2 text-right flex justify-end gap-2">
                                        <button onClick={() => props.onNavigateCustomPage(page.slug)} className="text-gray-600 hover:text-gray-900 p-1" title="View Page"><EyeIcon /></button>
                                        <ActionButtons onEdit={() => handleOpenModal('PAGE', page)} onDelete={() => props.onDeleteCustomPage(page.id)} />
                                    </td>
                                </tr>
                            ))}
                         </Table>
                    </Section>
                </div>
            );
            case 'content': return (
                <Section title="Text Content">
                    <div className="grid grid-cols-1 gap-6">
                        {textContentEntries.map(([key, value]) => (
                            <div key={key}>
                                <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-1 capitalize">{key.replace(/([A-Z])/g, ' $1')}</label>
                                {key.toLowerCase().includes('body') || key.toLowerCase().includes('description') ? (
                                    <textarea name={key} value={value as string} onChange={handleSiteContentChange} rows={4} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary" />
                                ) : (
                                    <input type="text" name={key} value={value as string} onChange={handleSiteContentChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary" />
                                )}
                            </div>
                        ))}
                        <div className="pt-4"><button onClick={handleSaveSiteContent} className="bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-2 rounded font-bold">Save Content</button></div>
                    </div>
                </Section>
            );
            case 'seo': return (
                <Section title="Global SEO Settings">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-1">Default Site Title</label>
                            <input type="text" name="globalSeo.title" value={siteContentData.globalSeo?.title || ''} onChange={handleSiteContentChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-1">Default Meta Description</label>
                            <textarea name="globalSeo.description" rows={3} value={siteContentData.globalSeo?.description || ''} onChange={handleSiteContentChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-1">Default Keywords</label>
                            <input type="text" name="globalSeo.keywords" value={siteContentData.globalSeo?.keywords || ''} onChange={handleSiteContentChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary" placeholder="Comma separated keywords" />
                        </div>
                         <div className="pt-4"><button onClick={handleSaveSiteContent} className="bg-brand-primary hover:bg-brand-primary-dark text-white px-6 py-2 rounded font-bold">Save SEO Settings</button></div>
                    </div>
                </Section>
            );
            case 'media': return (
                <div className="space-y-8">
                    <Section title="Photo Gallery" buttonLabel="Add Photo" onButtonClick={() => handleOpenModal('GALLERY')}>
                        <Table headers={["Image", "Caption", "Category", "Actions"]}>
                            {galleryPagination.currentItems.map(photo => (<tr key={photo.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800"><td className="p-2"><img src={photo.imageUrl} alt="" className="h-12 w-12 object-cover rounded" /></td><td>{photo.caption}</td><td>{photo.category}</td><td className="p-2 text-right"><ActionButtons onEdit={() => handleOpenModal('GALLERY', photo)} onDelete={() => props.onDeleteGalleryPhoto(photo.id)} /></td></tr>))}
                        </Table>
                        <Pagination {...galleryPagination} />
                    </Section>
                    <Section title="Instagram Feed" buttonLabel="Add Post" onButtonClick={() => handleOpenModal('INSTAGRAM')}>
                        <div className="mb-4 flex items-center justify-between">
                             <p className="text-sm text-muted-foreground dark:text-dark-muted-foreground">Manually add posts or sync from mock source.</p>
                             <div className="flex items-center gap-2">
                                {syncMessage && <span className="text-green-600 font-medium text-sm animate-pulse">{syncMessage}</span>}
                                <button onClick={handleSyncInstagram} disabled={isSyncing} className="flex items-center bg-purple-600 hover:bg-purple-700 text-white px-3 py-1.5 rounded text-sm transition-colors disabled:opacity-50"><SyncIcon /> {isSyncing ? 'Syncing...' : 'Sync Feed'}</button>
                             </div>
                        </div>
                        <Table headers={["Image", "Type", "Likes", "Comments", "Actions"]}>
                            {instagramPagination.currentItems.map(post => (<tr key={post.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800"><td className="p-2"><img src={post.imageUrl} alt="" className="h-12 w-12 object-cover rounded" /></td><td>{post.type}</td><td>{post.likes}</td><td>{post.comments}</td><td className="p-2 text-right"><ActionButtons onEdit={() => handleOpenModal('INSTAGRAM', post)} onDelete={() => props.onDeleteInstagramPost(post.id)} /></td></tr>))}
                        </Table>
                        <Pagination {...instagramPagination} />
                    </Section>
                    <Section title="Blog Posts" buttonLabel="Add Post" onButtonClick={() => handleOpenModal('BLOG')}>
                        <Table headers={["Title", "Date", "Author", "Actions"]}>
                            {blogPagination.currentItems.map(post => (<tr key={post.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800"><td className="p-2">{post.title}</td><td>{post.date}</td><td>{post.author}</td><td className="p-2 text-right"><ActionButtons onEdit={() => handleOpenModal('BLOG', post)} onDelete={() => props.onDeleteBlogPost(post.id)} /></td></tr>))}
                        </Table>
                        <Pagination {...blogPagination} />
                    </Section>
                </div>
            );
            case 'leads': return (
                <div className="space-y-8">
                     <Section title="Itinerary Queries">
                        <Table headers={["Date", "Name", "Tour", "Phone", "Plan Time"]}>
                             {queriesPagination.currentItems.length > 0 ? (
                                 queriesPagination.currentItems.map(q => (
                                     <tr key={q.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800">
                                         <td className="p-2 whitespace-nowrap">{new Date(q.date).toLocaleDateString()}</td>
                                         <td className="font-medium">{q.name}</td>
                                         <td>{q.tripTitle}</td>
                                         <td><a href={`https://wa.me/${q.whatsappNumber.replace(/\D/g,'')}`} target="_blank" rel="noreferrer" className="text-green-600 hover:underline">{q.whatsappNumber}</a></td>
                                         <td>{q.planningTime}</td>
                                     </tr>
                                 ))
                             ) : (
                                 <tr><td colSpan={5} className="p-4 text-center text-muted-foreground dark:text-dark-muted-foreground">No queries yet.</td></tr>
                             )}
                        </Table>
                        <Pagination {...queriesPagination} />
                    </Section>
                    <Section title="Google Reviews" buttonLabel="Add Review" onButtonClick={() => handleOpenModal('REVIEW')}>
                        <Table headers={["Author", "Rating", "Review", "Featured", "Actions"]}>
                            {reviewsPagination.currentItems.map(review => (<tr key={review.id} className="border-b border-border dark:border-dark-border hover:bg-slate-50 dark:hover:bg-slate-800"><td className="p-2">{review.authorName}</td><td><div className="flex"><StarIcon className="h-4 w-4 text-yellow-400" /> {review.rating}</div></td><td className="truncate max-w-xs">{review.text}</td><td>{review.isFeatured ? 'Yes' : 'No'}</td><td className="p-2 text-right"><ActionButtons onEdit={() => handleOpenModal('REVIEW', review)} onDelete={() => props.onDeleteGoogleReview(review.id)} /></td></tr>))}
                        </Table>
                        <Pagination {...reviewsPagination} />
                    </Section>
                </div>
            );
            case 'settings': return (
                <Section title="Global Settings">
                     <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                             <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-2">Website Logo</label>
                             <div className="flex items-center gap-4">
                                 <div className="h-16 w-16 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center border border-border dark:border-dark-border overflow-hidden">
                                     {siteContentData.logoUrl ? (
                                         <img src={siteContentData.logoUrl} alt="Logo" className="h-full w-full object-contain" />
                                     ) : (
                                         <span className="text-xs text-gray-400">No Logo</span>
                                     )}
                                 </div>
                                 <div>
                                     <input 
                                        type="file" 
                                        accept="image/png, image/jpeg, image/svg+xml"
                                        onChange={handleLogoUpload}
                                        className="block w-full text-sm text-slate-500
                                          file:mr-4 file:py-2 file:px-4
                                          file:rounded-full file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-brand-primary file:text-white
                                          hover:file:bg-brand-primary-dark
                                          cursor-pointer"
                                     />
                                     <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground mt-1">PNG, JPG or SVG. Max 2MB.</p>
                                 </div>
                             </div>
                        </div>
                        <div className="flex flex-col justify-center">
                             <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-2">Visual Theme</label>
                             <div className="flex items-center gap-4">
                                 <div className="text-sm font-semibold px-3 py-1.5 bg-card dark:bg-dark-card border border-border dark:border-dark-border rounded">
                                     Current: {siteContentData.activeTheme}
                                 </div>
                                 <button onClick={() => setIsThemeModalOpen(true)} className="bg-brand-primary hover:bg-brand-primary-dark text-white px-4 py-2 rounded text-sm font-bold">Change Theme</button>
                             </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-1">Admin WhatsApp Number</label>
                             <input type="text" name="adminWhatsappNumber" value={siteContentData.adminWhatsappNumber} onChange={handleSiteContentChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary" />
                             <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground mt-1">For receiving booking inquiries (no spaces, e.g. 919876543210)</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-1">Instagram URL</label>
                             <input type="text" name="instagramUrl" value={siteContentData.instagramUrl} onChange={handleSiteContentChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                         <div>
                            <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground mb-1">Google Reviews URL</label>
                             <input type="text" name="googleReviewsUrl" value={siteContentData.googleReviewsUrl} onChange={handleSiteContentChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border focus:ring-brand-primary focus:border-brand-primary" />
                        </div>
                     </div>
                     <div className="pt-6 border-t border-border dark:border-dark-border mt-6">
                         <button onClick={handleSaveSiteContent} className="bg-brand-primary hover:bg-brand-primary-dark text-white px-8 py-3 rounded font-bold text-lg shadow-md">Save All Settings</button>
                     </div>
                </Section>
            );
        }
    };
    
    // SEO Settings Form Component
    const SEOSettingsForm = () => (
        <div className="mt-6 border-t border-border dark:border-dark-border pt-4">
            <h3 className="font-bold mb-3 text-foreground dark:text-dark-foreground">SEO Settings</h3>
            <div className="grid grid-cols-1 gap-4">
                <div>
                    <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Meta Title</label>
                    <input type="text" name="seo.title" value={formData.seo?.title || ''} onChange={handleFormChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" placeholder="Leave blank to use default title" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Meta Description</label>
                    <textarea name="seo.description" rows={2} value={formData.seo?.description || ''} onChange={handleFormChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" placeholder="Brief description for search engines" />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">Keywords</label>
                    <input type="text" name="seo.keywords" value={formData.seo?.keywords || ''} onChange={handleFormChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" placeholder="keyword1, keyword2, keyword3" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-muted-foreground dark:text-dark-muted-foreground">OG Image URL</label>
                    <input type="text" name="seo.ogImage" value={formData.seo?.ogImage || ''} onChange={handleFormChange} className="w-full p-2 border rounded bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" placeholder="https://example.com/image.jpg" />
                </div>
            </div>
        </div>
    );

    // Render Modal Logic
    const renderModal = () => {
        if (!modal) return null;
        const isEdit = !!formData.id;
        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4" onClick={handleCloseModal}>
                <div className="bg-card dark:bg-dark-card p-6 rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto border border-border dark:border-dark-border" onClick={e => e.stopPropagation()}>
                    <h2 className="text-2xl font-bold font-display mb-6 text-foreground dark:text-dark-foreground">{isEdit ? 'Edit' : 'Add'} {modal.charAt(0) + modal.slice(1).toLowerCase()}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {modal === 'TRIP' && (
                            <>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <input name="title" placeholder="Trip Title" value={formData.title || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                    <input name="destination" placeholder="Destination" value={formData.destination || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                </div>
                                <textarea name="shortDescription" placeholder="Short Description" value={formData.shortDescription || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" rows={2} />
                                <textarea name="longDescription" placeholder="Long Description (Markdown)" value={formData.longDescription || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" rows={5} />
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="number" name="duration" placeholder="Duration (days)" value={formData.duration || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                    <input type="number" name="price" placeholder="Price (₹)" value={formData.price || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                </div>
                                <input name="imageUrl" placeholder="Main Image URL" value={formData.imageUrl || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                <select name="difficulty" value={formData.difficulty || 'Intermediate'} onChange={handleFormChange} className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border">
                                    <option value="Intermediate">Intermediate</option>
                                    <option value="Advanced">Advanced</option>
                                    <option value="Expert">Expert</option>
                                </select>
                                <input name="route" placeholder="Route Summary" value={formData.route || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                <textarea name="routeCoordinates" placeholder="Route Coordinates (lat, lng; lat, lng...)" value={formData.routeCoordinates || ''} onChange={handleFormChange} className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border font-mono text-xs" rows={3} />
                                <p className="text-xs text-muted-foreground dark:text-dark-muted-foreground">Paste coordinates separated by semicolons (;). E.g. 34.1,77.5; 34.2,77.6</p>
                                {currentCoords.length > 1 && (
                                    <div className="mt-2 h-48 rounded border border-border dark:border-dark-border overflow-hidden">
                                        <TripRouteMap coordinates={currentCoords} theme={theme} />
                                    </div>
                                )}
                                <SEOSettingsForm />
                            </>
                        )}
                        {modal === 'DEPARTURE' && (
                            <>
                                <select name="tripId" value={formData.tripId || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border">
                                    <option value="">Select Trip</option>
                                    {trips.map(t => <option key={t.id} value={t.id}>{t.title}</option>)}
                                </select>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="date" name="startDate" value={formData.startDate || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                    <input type="date" name="endDate" value={formData.endDate || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="number" name="slots" placeholder="Available Slots" value={formData.slots || 0} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                    <select name="status" value={formData.status || 'Available'} onChange={handleFormChange} className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border">
                                        <option value="Available">Available</option>
                                        <option value="Limited">Limited</option>
                                        <option value="Sold Out">Sold Out</option>
                                    </select>
                                </div>
                            </>
                        )}
                        {(modal === 'BLOG' || modal === 'PAGE') && (
                            <>
                                <input name="title" placeholder="Title" value={formData.title || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                {modal === 'BLOG' && <input name="author" placeholder="Author" value={formData.author || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />}
                                {modal === 'PAGE' && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <input name="slug" placeholder="URL Slug (e.g. about-us)" value={formData.slug || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                        <div className="flex items-center">
                                            <input type="checkbox" name="isVisible" checked={formData.isVisible || false} onChange={handleFormChange} className="h-5 w-5 text-brand-primary rounded border-gray-300 focus:ring-brand-primary" />
                                            <label className="ml-2 text-sm text-foreground dark:text-dark-foreground">Visible in Menu</label>
                                        </div>
                                    </div>
                                )}
                                {modal === 'BLOG' && <textarea name="excerpt" placeholder="Excerpt" value={formData.excerpt || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" rows={3} />}
                                <textarea name="content" placeholder="Content (Markdown supported)" value={formData.content || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border font-mono text-sm" rows={8} />
                                <div 
                                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-300 dark:border-gray-600 hover:border-brand-primary'}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
                                            <p className="mt-2 text-xs text-gray-500">Click or drop to replace</p>
                                        </div>
                                    ) : (
                                        <>
                                            <p className="text-gray-500 dark:text-gray-400">Drag & drop an image here, or click to select</p>
                                            <p className="text-xs text-gray-400 mt-1">(Optional) Leave blank to auto-generate</p>
                                        </>
                                    )}
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {modal === 'BLOG' && <input name="imageUrl" placeholder="Or enter Image URL directly" value={formData.imageUrl || ''} onChange={(e) => { handleFormChange(e); setImagePreview(e.target.value); }} className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border text-sm mt-2" />}
                                <SEOSettingsForm />
                            </>
                        )}
                        {(modal === 'GALLERY' || modal === 'REVIEW') && (
                            <>
                                 <div 
                                    className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors ${isDragging ? 'border-brand-primary bg-brand-primary/10' : 'border-gray-300 dark:border-gray-600 hover:border-brand-primary'}`}
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                >
                                    {imagePreview ? (
                                        <div className="relative">
                                            <img src={imagePreview} alt="Preview" className="max-h-48 mx-auto rounded" />
                                            <p className="mt-2 text-xs text-gray-500">Click or drop to replace</p>
                                        </div>
                                    ) : (
                                        <p className="text-gray-500 dark:text-gray-400">Drag & drop image here, or click to select</p>
                                    )}
                                    <input 
                                        type="file" 
                                        ref={fileInputRef}
                                        className="hidden" 
                                        accept="image/*"
                                        onChange={handleFileChange}
                                    />
                                </div>
                                {modal === 'GALLERY' ? (
                                    <>
                                        <input name="caption" placeholder="Caption" value={formData.caption || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                        <select name="category" value={formData.category || 'Landscapes'} onChange={handleFormChange} className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border">
                                            <option>Landscapes</option>
                                            <option>Riders</option>
                                            <option>Culture</option>
                                            <option>Behind the Scenes</option>
                                        </select>
                                    </>
                                ) : (
                                    <>
                                        <input name="authorName" placeholder="Reviewer Name" value={formData.authorName || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                        <textarea name="text" placeholder="Review Text" value={formData.text || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" rows={3} />
                                        <div className="grid grid-cols-2 gap-4">
                                            <input type="number" name="rating" placeholder="Rating (1-5)" min="1" max="5" value={formData.rating || 5} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                            <div className="flex items-center">
                                                <input type="checkbox" name="isFeatured" checked={formData.isFeatured || false} onChange={handleFormChange} className="h-5 w-5 text-brand-primary rounded border-gray-300 focus:ring-brand-primary" />
                                                <label className="ml-2 text-sm text-foreground dark:text-dark-foreground">Featured Review</label>
                                            </div>
                                        </div>
                                    </>
                                )}
                            </>
                        )}
                         {modal === 'INSTAGRAM' && (
                            <>
                                <input name="imageUrl" placeholder="Image URL" value={formData.imageUrl || ''} onChange={handleFormChange} required className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                <select name="type" value={formData.type || 'photo'} onChange={handleFormChange} className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border">
                                    <option value="photo">Photo</option>
                                    <option value="reel">Reel</option>
                                </select>
                                <div className="grid grid-cols-2 gap-4">
                                    <input type="number" name="likes" placeholder="Likes" value={formData.likes || 0} onChange={handleFormChange} className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                    <input type="number" name="comments" placeholder="Comments" value={formData.comments || 0} onChange={handleFormChange} className="p-2 border rounded w-full bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground border-border dark:border-dark-border" />
                                </div>
                            </>
                        )}
                        
                        <div className="flex justify-end space-x-4 pt-4">
                            <button type="button" onClick={handleCloseModal} className="px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">Cancel</button>
                            <button type="submit" disabled={isSaving} className="px-6 py-2 bg-brand-primary text-white rounded hover:bg-brand-primary-dark disabled:opacity-50">{isSaving ? 'Saving...' : 'Save'}</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="min-h-screen bg-background dark:bg-dark-background text-foreground dark:text-dark-foreground">
            {isThemeModalOpen && <ThemePicker themes={themes} siteContent={siteContentData} onClose={() => setIsThemeModalOpen(false)} onSave={handleThemeSave} />}
            {/* Sidebar Navigation */}
            <aside className="fixed inset-y-0 left-0 z-20 w-64 bg-card dark:bg-dark-card border-r border-border dark:border-dark-border transform transition-transform duration-300 ease-in-out lg:translate-x-0 -translate-x-full">
                <div className="h-16 flex items-center px-6 border-b border-border dark:border-dark-border">
                    <h1 className="text-xl font-bold font-display text-brand-primary">Admin Panel</h1>
                </div>
                <nav className="p-4 space-y-2">
                    {navItems.map(item => (
                        <button
                            key={item.id}
                            onClick={() => setActiveTab(item.id as AdminTab)}
                            className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${activeTab === item.id ? 'bg-brand-primary text-white' : 'text-muted-foreground dark:text-dark-muted-foreground hover:bg-slate-100 dark:hover:bg-slate-800'}`}
                        >
                            {item.icon}
                            <span className="font-medium">{item.label}</span>
                        </button>
                    ))}
                </nav>
                <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-border dark:border-dark-border">
                     <button onClick={onLogout} className="w-full flex items-center justify-center space-x-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 px-4 py-2 rounded-lg transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>
                        <span>Logout</span>
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="lg:ml-64 min-h-screen p-4 sm:p-8">
                 {/* Mobile Header */}
                 <div className="lg:hidden flex justify-between items-center mb-6">
                    <h1 className="text-xl font-bold font-display text-brand-primary">Admin Panel</h1>
                    <button onClick={onLogout} className="text-red-600 text-sm font-medium">Logout</button>
                 </div>

                 <div className="max-w-6xl mx-auto">
                    <header className="flex justify-between items-end mb-8">
                        <div>
                            <h1 className="text-3xl font-bold font-display text-foreground dark:text-dark-foreground capitalize">{activeTab}</h1>
                            <p className="text-muted-foreground dark:text-dark-muted-foreground mt-1">Manage your {activeTab} settings and data.</p>
                        </div>
                    </header>
                    
                    {renderContent()}
                 </div>
            </main>

            {/* Modal */}
            {renderModal()}
        </div>
    );
};

export default AdminPage;
