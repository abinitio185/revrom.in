import React, { useState, useMemo, useRef } from 'react';
import type { Trip, Departure, BlogPost, GalleryPhoto, InstagramPost } from '../types';
import { instagramSyncMock } from '../data/mockData';

interface AdminPageProps {
    trips: Trip[];
    departures: Departure[];
    blogPosts: BlogPost[];
    galleryPhotos: GalleryPhoto[];
    instagramPosts: InstagramPost[];
    onAddTrip: (trip: Omit<Trip, 'id' | 'reviews'>) => void;
    onUpdateTrip: (trip: Trip) => void;
    onDeleteTrip: (tripId: string) => void;
    onAddDeparture: (departure: Omit<Departure, 'id'>) => void;
    onUpdateDeparture: (departure: Departure) => void;
    onDeleteDeparture: (departureId: string) => void;
    onAddBlogPost: (post: Omit<BlogPost, 'id' | 'date'>) => void;
    onUpdateBlogPost: (post: BlogPost) => void;
    onDeleteBlogPost: (postId: string) => void;
    onAddGalleryPhoto: (photo: Omit<GalleryPhoto, 'id'>) => void;
    onUpdateGalleryPhoto: (photo: GalleryPhoto) => void;
    onDeleteGalleryPhoto: (photoId: string) => void;
    onAddInstagramPost: (post: Omit<InstagramPost, 'id'>) => void;
    onUpdateInstagramPost: (post: InstagramPost) => void;
    onDeleteInstagramPost: (postId: string) => void;
    onLogout: () => void;
}

const AdminPage: React.FC<AdminPageProps> = (props) => {
    const { trips, departures, blogPosts, galleryPhotos, instagramPosts, onLogout } = props;

    // Modal & Form State
    const [modal, setModal] = useState<'TRIP' | 'DEPARTURE' | 'BLOG' | 'GALLERY' | 'INSTAGRAM' | null>(null);
    const [formData, setFormData] = useState<any>({});
    
    // State for file uploads and sync
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isSyncing, setIsSyncing] = useState(false);
    const [syncMessage, setSyncMessage] = useState('');
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const findTripTitle = (tripId: string) => trips.find(t => t.id === tripId)?.title || 'Unknown Trip';
    
    const handleOpenModal = (type: typeof modal, data: any | null = null) => {
        setFormData(data || {});
        if (type === 'GALLERY' && data?.imageUrl) {
            setImagePreview(data.imageUrl);
        }
        setModal(type);
    };

    const handleCloseModal = () => {
        setModal(null);
        setFormData({});
        setImagePreview(null);
    };
    
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const isNumber = type === 'number';
        setFormData((prev: any) => ({...prev, [name]: isNumber ? Number(value) : value }));
    };

    const processFile = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (event) => {
                const result = event.target?.result as string;
                setImagePreview(result);
                setFormData((prev: any) => ({ ...prev, imageUrl: result }));
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
        e.preventDefault();
        e.stopPropagation();
        setIsDragging(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            processFile(e.dataTransfer.files[0]);
        }
    };

    const handleArrayChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData((prev: any) => ({...prev, [name]: value.split(',').map(item => item.trim())}));
    };
    
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const { id, ...data } = formData;
        switch(modal) {
            case 'TRIP':
                id ? props.onUpdateTrip(formData) : props.onAddTrip(data);
                break;
            case 'DEPARTURE':
                 id ? props.onUpdateDeparture(formData) : props.onAddDeparture(data);
                break;
            case 'BLOG':
                id ? props.onUpdateBlogPost(formData) : props.onAddBlogPost(data);
                break;
            case 'GALLERY':
                if (!formData.imageUrl) {
                    alert("Please upload an image for the gallery.");
                    return;
                }
                id ? props.onUpdateGalleryPhoto(formData) : props.onAddGalleryPhoto(data);
                break;
            case 'INSTAGRAM':
                id ? props.onUpdateInstagramPost(formData) : props.onAddInstagramPost(data);
                break;
        }
        handleCloseModal();
    };

    const handleSyncInstagram = () => {
        setIsSyncing(true);
        setSyncMessage('');
        setTimeout(() => {
            let newPostsCount = 0;
            instagramSyncMock.forEach(item => {
                const galleryExists = galleryPhotos.some(p => p.imageUrl === item.photo.imageUrl);
                const postExists = instagramPosts.some(p => p.imageUrl === item.post.imageUrl);
                
                if (!galleryExists) {
                    props.onAddGalleryPhoto(item.photo);
                    newPostsCount++;
                }
                if (!postExists) {
                    props.onAddInstagramPost(item.post);
                }
            });
            setIsSyncing(false);
            setSyncMessage(newPostsCount > 0 ? `Synced ${newPostsCount} new post(s)!` : 'Feed is already up to date!');
            setTimeout(() => setSyncMessage(''), 5000);
        }, 1500);
    };
    
    const sortedDepartures = useMemo(() => {
        return [...departures].sort((a, b) => new Date(a.startDate).getTime() - new Date(b.startDate).getTime());
    }, [departures]);


    const renderModal = () => {
        if (!modal) return null;

        return (
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60" onClick={handleCloseModal}>
                <div className="bg-white p-6 rounded-lg shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
                    <h2 className="text-2xl font-bold font-display mb-4">{formData.id ? 'Edit' : 'Add'} {modal}</h2>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        {modal === 'TRIP' && (
                            <>
                                <input name="title" value={formData.title || ''} onChange={handleFormChange} placeholder="Title" required className="w-full p-2 border rounded"/>
                                <input name="destination" value={formData.destination || ''} onChange={handleFormChange} placeholder="Destination" required className="w-full p-2 border rounded"/>
                                <textarea name="shortDescription" value={formData.shortDescription || ''} onChange={handleFormChange} placeholder="Short Description" required className="w-full p-2 border rounded h-20"></textarea>
                                <textarea name="longDescription" value={formData.longDescription || ''} onChange={handleFormChange} placeholder="Long Description (Markdown supported)" required className="w-full p-2 border rounded h-40"></textarea>
                                <input type="number" name="duration" value={formData.duration || ''} onChange={handleFormChange} placeholder="Duration (days)" required className="w-full p-2 border rounded"/>
                                <input type="number" name="price" value={formData.price || ''} onChange={handleFormChange} placeholder="Price" required className="w-full p-2 border rounded"/>
                                <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleFormChange} placeholder="Main Image URL" required className="w-full p-2 border rounded"/>
                                <input name="route" value={formData.route || ''} onChange={handleFormChange} placeholder="Route (e.g. Manali - Leh)" required className="w-full p-2 border rounded"/>
                                <select name="difficulty" value={formData.difficulty || 'Intermediate'} onChange={handleFormChange} required className="w-full p-2 border rounded">
                                    <option>Intermediate</option>
                                    <option>Advanced</option>
                                    <option>Expert</option>
                                </select>
                                <textarea name="inclusions" value={Array.isArray(formData.inclusions) ? formData.inclusions.join(', ') : ''} onChange={handleArrayChange} placeholder="Inclusions (comma-separated)" className="w-full p-2 border rounded h-24"></textarea>
                                <textarea name="exclusions" value={Array.isArray(formData.exclusions) ? formData.exclusions.join(', ') : ''} onChange={handleArrayChange} placeholder="Exclusions (comma-separated)" className="w-full p-2 border rounded h-24"></textarea>
                                <textarea name="activities" value={Array.isArray(formData.activities) ? formData.activities.join(', ') : ''} onChange={handleArrayChange} placeholder="Activities (comma-separated)" className="w-full p-2 border rounded h-24"></textarea>
                                <textarea name="gallery" value={Array.isArray(formData.gallery) ? formData.gallery.join(', ') : ''} onChange={handleArrayChange} placeholder="Gallery Image URLs (comma-separated)" className="w-full p-2 border rounded h-24"></textarea>
                            </>
                        )}
                         {modal === 'DEPARTURE' && (
                            <>
                                <select name="tripId" value={formData.tripId || ''} onChange={handleFormChange} required className="w-full p-2 border rounded">
                                    <option value="">Select a Trip</option>
                                    {trips.map(trip => <option key={trip.id} value={trip.id}>{trip.title}</option>)}
                                </select>
                                <input type="date" name="startDate" value={formData.startDate || ''} onChange={handleFormChange} placeholder="Start Date" required className="w-full p-2 border rounded"/>
                                <input type="date" name="endDate" value={formData.endDate || ''} onChange={handleFormChange} placeholder="End Date" required className="w-full p-2 border rounded"/>
                                <input type="number" name="slots" value={formData.slots || ''} onChange={handleFormChange} placeholder="Slots" required className="w-full p-2 border rounded"/>
                                <select name="status" value={formData.status || 'Available'} onChange={handleFormChange} required className="w-full p-2 border rounded">
                                    <option>Available</option>
                                    <option>Limited</option>
                                    <option>Sold Out</option>
                                </select>
                            </>
                        )}
                        {modal === 'BLOG' && (
                             <>
                                <input name="title" value={formData.title || ''} onChange={handleFormChange} placeholder="Title" required className="w-full p-2 border rounded"/>
                                <input name="author" value={formData.author || ''} onChange={handleFormChange} placeholder="Author" required className="w-full p-2 border rounded"/>
                                <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleFormChange} placeholder="Image URL" required className="w-full p-2 border rounded"/>
                                <textarea name="excerpt" value={formData.excerpt || ''} onChange={handleFormChange} placeholder="Excerpt" required className="w-full p-2 border rounded h-24"></textarea>
                                <textarea name="content" value={formData.content || ''} onChange={handleFormChange} placeholder="Full Content" required className="w-full p-2 border rounded h-40"></textarea>
                            </>
                        )}
                        {modal === 'GALLERY' && (
                            <>
                                <div
                                    onDragOver={handleDragOver}
                                    onDragLeave={handleDragLeave}
                                    onDrop={handleDrop}
                                    onClick={() => fileInputRef.current?.click()}
                                    className={`relative w-full p-4 border-2 border-dashed rounded-lg cursor-pointer transition-colors ${
                                        isDragging ? 'border-orange-500 bg-orange-50' : 'border-gray-300 hover:border-orange-400'
                                    }`}
                                >
                                    <input
                                        ref={fileInputRef}
                                        type="file"
                                        accept="image/*"
                                        onChange={handleFileChange}
                                        className="hidden"
                                    />
                                    {imagePreview ? (
                                        <img src={imagePreview} alt="Preview" className="w-full h-40 object-contain rounded" />
                                    ) : (
                                        <div className="text-center text-gray-500">
                                            <svg className="mx-auto h-12 w-12" stroke="currentColor" fill="none" viewBox="0 0 48 48" aria-hidden="true"><path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
                                            <p className="mt-2">Drag & drop an image here, or <span className="font-semibold text-orange-600">click to select</span></p>
                                            <p className="text-xs mt-1">PNG, JPG, or GIF</p>
                                        </div>
                                    )}
                                </div>
                                <input name="caption" value={formData.caption || ''} onChange={handleFormChange} placeholder="Caption" required className="w-full p-2 border rounded"/>
                                <select name="category" value={formData.category || 'Landscapes'} onChange={handleFormChange} required className="w-full p-2 border rounded">
                                    <option>Landscapes</option>
                                    <option>Riders</option>
                                    <option>Culture</option>
                                    <option>Behind the Scenes</option>
                                </select>
                            </>
                        )}
                        {modal === 'INSTAGRAM' && (
                             <>
                                <input name="imageUrl" value={formData.imageUrl || ''} onChange={handleFormChange} placeholder="Image URL" required className="w-full p-2 border rounded"/>
                                <select name="type" value={formData.type || 'photo'} onChange={handleFormChange} required className="w-full p-2 border rounded">
                                    <option value="photo">Photo</option>
                                    <option value="reel">Reel</option>
                                </select>
                                <input type="number" name="likes" value={formData.likes || ''} onChange={handleFormChange} placeholder="Likes" required className="w-full p-2 border rounded"/>
                                <input type="number" name="comments" value={formData.comments || ''} onChange={handleFormChange} placeholder="Comments" required className="w-full p-2 border rounded"/>
                            </>
                        )}

                        <div className="flex justify-end space-x-4 pt-4">
                            <button type="button" onClick={handleCloseModal} className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300">Cancel</button>
                            <button type="submit" className="px-4 py-2 bg-orange-500 text-white rounded hover:bg-orange-600">Save</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    };

    return (
        <div className="bg-gray-100 min-h-screen">
            <header className="bg-white shadow-md p-4 flex justify-between items-center">
                <h1 className="text-2xl font-bold font-display text-slate-800">Admin Dashboard</h1>
                <button onClick={onLogout} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-md">Logout</button>
            </header>

            <main className="container mx-auto p-4 md:p-6 space-y-8">
                {/* Tour Management */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold font-display">Tour Management</h2>
                        <button onClick={() => handleOpenModal('TRIP')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Tour</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                           <thead><tr className="border-b"><th className="p-2 text-left">Title</th><th className="p-2 text-left">Duration</th><th className="p-2 text-left">Price</th><th className="p-2 text-right">Actions</th></tr></thead>
                           <tbody>
                            {trips.map(trip => (
                                <tr key={trip.id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{trip.title}</td><td>{trip.duration} days</td><td>${trip.price}</td>
                                    <td className="p-2 text-right space-x-2"><button onClick={() => handleOpenModal('TRIP', trip)}>Edit</button><button onClick={() => props.onDeleteTrip(trip.id)}>Delete</button></td>
                                </tr>
                            ))}
                           </tbody>
                        </table>
                    </div>
                </section>
                
                {/* Departure Management */}
                <section className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold font-display">Departure Management</h2>
                        <button onClick={() => handleOpenModal('DEPARTURE')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Departure</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                           <thead><tr className="border-b"><th className="p-2 text-left">Trip</th><th className="p-2 text-left">Start Date</th><th className="p-2 text-left">Slots</th><th className="p-2 text-left">Status</th><th className="p-2 text-right">Actions</th></tr></thead>
                           <tbody>
                            {sortedDepartures.map(dep => (
                                <tr key={dep.id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{findTripTitle(dep.tripId)}</td><td>{dep.startDate}</td><td>{dep.slots}</td><td>{dep.status}</td>
                                    <td className="p-2 text-right space-x-2"><button onClick={() => handleOpenModal('DEPARTURE', dep)}>Edit</button><button onClick={() => props.onDeleteDeparture(dep.id)}>Delete</button></td>
                                </tr>
                            ))}
                           </tbody>
                        </table>
                    </div>
                </section>

                {/* Blog Post Management */}
                 <section className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold font-display">Blog Post Management</h2>
                        <button onClick={() => handleOpenModal('BLOG')} className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">Add Post</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                           <thead><tr className="border-b"><th className="p-2 text-left">Title</th><th className="p-2 text-left">Author</th><th className="p-2 text-left">Date</th><th className="p-2 text-right">Actions</th></tr></thead>
                           <tbody>
                            {blogPosts.map(post => (
                                <tr key={post.id} className="border-b hover:bg-gray-50">
                                    <td className="p-2">{post.title}</td><td>{post.author}</td><td>{post.date}</td>
                                    <td className="p-2 text-right space-x-2"><button onClick={() => handleOpenModal('BLOG', post)}>Edit</button><button onClick={() => props.onDeleteBlogPost(post.id)}>Delete</button></td>
                                </tr>
                            ))}
                           </tbody>
                        </table>
                    </div>
                </section>

                {/* Social & Media Management */}
                 <section className="bg-white p-6 rounded-lg shadow-md">
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-xl font-bold font-display">Social & Media Management</h2>
                        <div className="flex items-center gap-4">
                            <button onClick={handleSyncInstagram} disabled={isSyncing} className="bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:bg-purple-300">
                                {isSyncing ? 'Syncing...' : 'Sync with Instagram'}
                            </button>
                            {syncMessage && <span className="text-sm text-green-600 font-medium">{syncMessage}</span>}
                        </div>
                    </div>
                    
                    {/* Gallery */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                           <h3 className="text-lg font-semibold">Gallery Photos</h3>
                           <button onClick={() => handleOpenModal('GALLERY')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Add Photo</button>
                        </div>
                         <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                               <thead><tr className="border-b"><th className="p-2 text-left">Preview</th><th className="p-2 text-left">Caption</th><th className="p-2 text-left">Category</th><th className="p-2 text-right">Actions</th></tr></thead>
                               <tbody>
                                {galleryPhotos.map(photo => (
                                    <tr key={photo.id} className="border-b hover:bg-gray-50">
                                        <td className="p-2"><img src={photo.imageUrl} alt={photo.caption} className="w-16 h-12 object-cover rounded"/></td>
                                        <td>{photo.caption}</td><td>{photo.category}</td>
                                        <td className="p-2 text-right space-x-2"><button onClick={() => handleOpenModal('GALLERY', photo)}>Edit</button><button onClick={() => props.onDeleteGalleryPhoto(photo.id)}>Delete</button></td>
                                    </tr>
                                ))}
                               </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Instagram */}
                    <div className="mt-6">
                        <div className="flex justify-between items-center mb-2">
                           <h3 className="text-lg font-semibold">Instagram Feed</h3>
                           <button onClick={() => handleOpenModal('INSTAGRAM')} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">Add Post</button>
                        </div>
                        <div className="overflow-x-auto">
                            <table className="w-full text-sm">
                               <thead><tr className="border-b"><th className="p-2 text-left">Preview</th><th className="p-2 text-left">Type</th><th className="p-2 text-left">Likes</th><th className="p-2 text-left">Comments</th><th className="p-2 text-right">Actions</th></tr></thead>
                               <tbody>
                                {instagramPosts.map(post => (
                                    <tr key={post.id} className="border-b hover:bg-gray-50">
                                        <td className="p-2"><img src={post.imageUrl} alt="Instagram Post" className="w-12 h-12 object-cover rounded"/></td>
                                        <td>{post.type}</td><td>{post.likes}</td><td>{post.comments}</td>
                                        <td className="p-2 text-right space-x-2"><button onClick={() => handleOpenModal('INSTAGRAM', post)}>Edit</button><button onClick={() => props.onDeleteInstagramPost(post.id)}>Delete</button></td>
                                    </tr>
                                ))}
                               </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </main>

            {renderModal()}
        </div>
    );
};

export default AdminPage;
