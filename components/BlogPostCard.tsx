
import React from 'react';
import type { BlogPost } from '../types';

interface BlogPostCardProps {
  post: BlogPost;
  onSelectPost: (post: BlogPost) => void;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, onSelectPost }) => {
  return (
    <div 
      className="bg-card dark:bg-dark-card rounded-[2rem] shadow-sm overflow-hidden transform hover:-translate-y-2 transition-all duration-500 cursor-pointer group flex flex-col border border-border dark:border-dark-border hover:border-brand-primary"
      onClick={() => onSelectPost(post)}
    >
      <div className="relative h-64 overflow-hidden">
        <img src={post.imageUrl} alt={post.title} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" loading="lazy" />
        <div className="absolute top-6 left-6">
            <span className="bg-brand-primary text-white text-[9px] font-black uppercase tracking-widest px-4 py-1.5 rounded-full shadow-lg">New Logbook</span>
        </div>
      </div>
      <div className="p-10 flex flex-col flex-grow">
        <div className="flex items-center gap-3 text-[10px] font-black text-muted-foreground uppercase tracking-widest mb-4">
          <span className="text-brand-primary font-bold">●</span>
          <span>{new Date(post.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <h3 className="text-2xl font-black font-display mb-4 text-foreground dark:text-dark-foreground group-hover:text-brand-primary transition-colors leading-tight line-clamp-2">{post.title}</h3>
        <p className="text-slate-500 dark:text-slate-400 text-sm mb-8 line-clamp-3 leading-relaxed font-medium italic">"{post.excerpt}"</p>
        <button className="mt-auto flex items-center gap-3 text-brand-primary font-black text-[10px] uppercase tracking-[0.2em] group-hover:gap-5 transition-all">
          Read Full Report
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
        </button>
      </div>
    </div>
  );
};

export default BlogPostCard;
