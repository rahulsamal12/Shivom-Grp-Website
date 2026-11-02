'use client';

import React, { useState, useEffect } from 'react';
import { PageBanner } from '@/components/layout/PageBanner';
import { blogsService } from '@/services/blogs.service';
import Image from 'next/image';
import { IBlog } from '@/types';

type Props = {
  slug: string;
};

export function BlogDetailClient({ slug }: Props) {
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadBlog() {
      try {
        const data = await blogsService.getBlogBySlug(slug);
        setBlog(data);
      } catch (error) {
        console.error('[BlogDetailClient] Error loading blog:', error);
      } finally {
        setLoading(false);
      }
    }
    loadBlog();
  }, [slug]);

  useEffect(() => {
    if (blog) {
      document.title = `${blog.title} | Shivom Group`;
    }
  }, [blog]);

  if (loading) {
    return (
      <>
        <PageBanner title="Loading..." breadcrumb="Blogs / Loading..." />
        <div className="container mx-auto px-4 py-24 max-w-4xl animate-pulse">
          <div className="mb-12 text-center">
            <div className="h-4 w-24 bg-gray-200 rounded mx-auto mb-4" />
            <div className="h-10 w-3/4 bg-gray-200 rounded mx-auto mb-6" />
            <div className="h-4 w-32 bg-gray-200 rounded mx-auto" />
          </div>
          <div className="bg-gray-200 h-96 rounded-xl mb-12" />
          <div className="space-y-4">
            <div className="h-4 w-full bg-gray-200 rounded" />
            <div className="h-4 w-5/6 bg-gray-200 rounded" />
            <div className="h-4 w-4/5 bg-gray-200 rounded" />
          </div>
        </div>
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <PageBanner title="Blog Not Found" breadcrumb="Blogs / Not Found" />
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Blog Post Not Found</h2>
          <p className="text-gray-500">The blog post you are looking for might have been removed or is temporarily unavailable.</p>
        </div>
      </>
    );
  }

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": blog.title,
    "image": blog.featuredImage ? [blog.featuredImage] : [],
    "datePublished": blog.publishedAt,
    "author": [{
        "@type": "Organization",
        "name": "Shivom Group"
    }]
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [{
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://shivomgroup.in"
    },{
      "@type": "ListItem",
      "position": 2,
      "name": "Blogs",
      "item": "https://shivomgroup.in/blogs"
    },{
      "@type": "ListItem",
      "position": 3,
      "name": blog.title
    }]
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PageBanner title={blog.title} breadcrumb={`Blogs / ${blog.title}`} bgImage={blog.featuredImage || undefined} />
      <div className="container mx-auto px-4 py-24 max-w-4xl">
        <div className="mb-12 text-center">
          <span className="text-brand-orange font-bold text-sm tracking-wider uppercase mb-4 block">{blog.category || 'Industry Insights'}</span>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">{blog.title}</h1>
          <div className="text-gray-500 font-medium">Published on {new Date(blog.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
        </div>
        {blog.featuredImage && (
          <div className="bg-gray-100 h-96 rounded-xl mb-12 flex items-center justify-center text-gray-400 overflow-hidden relative shadow-lg">
            <Image src={blog.featuredImage} alt={blog.title} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
          </div>
        )}
        <div className="prose prose-lg max-w-none text-gray-600 text-justify-content">
          {blog.content ? (
            <div dangerouslySetInnerHTML={{ __html: blog.content }} />
          ) : (
            <p>{blog.excerpt || 'Detailed content is not available.'}</p>
          )}
        </div>
      </div>
    </>
  );
}
