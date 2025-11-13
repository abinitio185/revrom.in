
import React from 'react';
import type { BlogPost } from '../types';
import BlogPostCard from '../components/BlogPostCard';

interface BlogPageProps {
  posts: BlogPost[];
  onSelectPost: (post: BlogPost) => void;
}

const BlogPage: React.FC<BlogPageProps> = ({ posts, onSelectPost }) => {
  return (
    <div className="bg-gray-50">
      <div className="relative h-64 bg-cover bg-center" style={{ backgroundImage: "url('https://picsum.photos/seed/ladakh-blog-hero/1920/1080')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="container mx-auto px-6 h-full flex items-center justify-center relative z-10">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white font-display text-center">Rider's Logbook</h1>
          <p className="absolute bottom-8 text-white max-w-2xl text-center text-lg">Stories, tips, and insights from the high Himalayas.</p>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(post => (
            <BlogPostCard key={post.id} post={post} onSelectPost={onSelectPost} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BlogPage;
