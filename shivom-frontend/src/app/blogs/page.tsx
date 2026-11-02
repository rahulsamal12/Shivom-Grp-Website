'use client';

import React, { useState, useEffect } from 'react';
import { PageBanner } from '@/components/layout/PageBanner';
import { blogsService } from '@/services/blogs.service';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { IBlog } from '@/types';

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<IBlog[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlogs() {
      try {
        const data = await blogsService.getBlogs();
        setBlogs(data);
      } catch (error) {
        console.error('[BlogsPage] Error loading blogs:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBlogs();
  }, []);

  return (
    <>
      <PageBanner 
        title="News & Insights" 
        breadcrumb="Blogs" 
        bgImage="https://images.unsplash.com/photo-1508514177221-188b1cf16e9d?q=80&w=2000" 
      />
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Publications
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Industry Knowledge & Updates
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full mb-6" />
            <p className="text-gray-600 text-lg text-justify-content">
              Read our latest updates, tech spotlights, and announcements about infrastructure advancements and energy programs.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3].map(n => (
                <div key={n} className="bg-gray-50 rounded-2xl h-[450px] border border-gray-100" />
              ))}
            </div>
          ) : !blogs || blogs.length === 0 ? (
            <div className="text-center py-20 bg-gray-50 rounded-2xl border border-gray-100 shadow-inner">
              <p className="text-gray-500 text-lg font-medium">No posts available. Stay tuned!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {blogs.map((blog) => (
                <div 
                  key={blog._id} 
                  className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 group flex flex-col h-full cursor-pointer"
                >
                  <div className="relative h-60 w-full rounded-xl overflow-hidden mb-6 bg-gray-50 shadow-sm">
                    <Image 
                      src={blog.featuredImage || '/placeholder-blog.jpg'} 
                      alt={blog.title} 
                      fill
                      loading="lazy"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                    <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1 rounded-full text-xs font-bold text-brand-navy uppercase tracking-wider shadow-sm">
                      {blog.category}
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-4 text-xs text-gray-400 font-medium mb-3">
                    <span>
                      {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                    <span>•</span>
                    <span>By {blog.author || 'Admin'}</span>
                  </div>
                  
                  <h3 className="text-2xl font-bold text-brand-navy mb-3 leading-snug group-hover:text-brand-orange transition-colors">
                    <Link prefetch={false} href={`/blogs/${blog.slug}`}>{blog.title}</Link>
                  </h3>
                  
                  <p className="text-gray-650 text-justify-content mb-6 flex-grow">
                    {blog.excerpt}
                  </p>
                  
                  <Link 
                    prefetch={false}
                    href={`/blogs/${blog.slug}`} 
                    className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-wider text-sm mt-auto group-hover:gap-3 transition-all"
                  >
                    Read Article <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
