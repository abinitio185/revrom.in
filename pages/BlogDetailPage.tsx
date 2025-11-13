
import React from 'react';
import type { BlogPost } from '../types';

interface BlogDetailPageProps {
  post: BlogPost;
  onBack: () => void;
}

const CalendarIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a1 1 0 0 0-1 1v1H4a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1V3a1 1 0 1 0-2 0v1H7V3a1 1 0 0 0-1-1zm0 5a1 1 0 0 0 0 2h8a1 1 0 1 0 0-2H6z" clipRule="evenodd" />
    </svg>
);

const UserIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm-7 9a7 7 0 1 1 14 0H3z" clipRule="evenodd" />
    </svg>
);

const BlogDetailPage: React.FC<BlogDetailPageProps> = ({ post, onBack }) => {
  return (
    <div className="bg-white">
      <div className="relative h-96 bg-cover bg-center" style={{ backgroundImage: `url(${post.imageUrl})` }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-6 h-full flex flex-col justify-end pb-12 relative z-10">
           <button onClick={onBack} className="absolute top-8 left-6 text-white bg-black/30 hover:bg-black/50 px-3 py-1 rounded-md text-sm transition-colors z-20">&larr; Back to Blog</button>
           <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display">{post.title}</h1>
           <div className="flex items-center text-sm text-gray-200 mt-4">
                <UserIcon className="w-4 h-4 mr-2" />
                <span>By {post.author}</span>
                <span className="mx-3">|</span>
                <CalendarIcon className="w-4 h-4 mr-2" />
                <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
           </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-4xl">
         <div className="prose lg:prose-xl max-w-none text-slate-700 leading-relaxed">
            {post.content.split('\n\n').map((paragraph, index) => {
              if (paragraph.startsWith('**') && paragraph.endsWith('**')) {
                return <h3 key={index} className="text-2xl font-bold font-display mt-8 mb-4">{paragraph.replaceAll('**', '')}</h3>;
              }
              return <p key={index} className="mb-4">{paragraph}</p>;
            })}
         </div>
      </div>
    </div>
  );
};

export default BlogDetailPage;
