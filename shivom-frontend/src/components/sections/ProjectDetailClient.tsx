'use client';

import React, { useState, useEffect } from 'react';
import { PageBanner } from '@/components/layout/PageBanner';
import { projectsService } from '@/services/projects.service';
import Image from 'next/image';
import { IProject } from '@/types';

type Props = {
  slug: string;
};

export function ProjectDetailClient({ slug }: Props) {
  const [project, setProject] = useState<IProject | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      try {
        const data = await projectsService.getProjectBySlug(slug);
        setProject(data);
      } catch (error) {
        console.error('[ProjectDetailClient] Error loading project:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  useEffect(() => {
    if (project) {
      document.title = `${project.title} | Shivom Group`;
    }
  }, [project]);

  if (loading) {
    return (
      <>
        <PageBanner title="Loading..." breadcrumb="Projects / Loading..." />
        <div className="container mx-auto px-4 py-24 animate-pulse">
          <div className="h-8 w-48 bg-gray-200 rounded mb-8" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="md:col-span-2">
              <div className="h-96 bg-gray-200 rounded-xl mb-8" />
              <div className="space-y-4">
                <div className="h-4 w-full bg-gray-200 rounded" />
                <div className="h-4 w-5/6 bg-gray-200 rounded" />
                <div className="h-4 w-4/5 bg-gray-200 rounded" />
              </div>
            </div>
            <div className="bg-gray-100 p-8 rounded-xl h-48" />
          </div>
        </div>
      </>
    );
  }

  if (!project) {
    return (
      <>
        <PageBanner title="Project Not Found" breadcrumb="Projects / Not Found" />
        <div className="container mx-auto px-4 py-24 text-center">
          <h2 className="text-3xl font-bold mb-4">Project Not Found</h2>
          <p className="text-gray-500">The project you are looking for might have been removed or is temporarily unavailable.</p>
        </div>
      </>
    );
  }

  return (
    <>
      <PageBanner title={project.title} breadcrumb={`Projects / ${project.title}`} />
      <div className="container mx-auto px-4 py-24">
        <h2 className="text-3xl font-bold mb-8">Project Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          <div className="md:col-span-2">
            {project.featuredImage && (
              <div className="relative h-96 rounded-xl mb-8 overflow-hidden shadow-lg">
                <Image src={project.featuredImage} alt={project.title} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
              </div>
            )}
            <div className="text-gray-600 text-justify-content text-lg mb-6 prose max-w-none">
              <p>{project.description || 'Detailed information is not available.'}</p>
            </div>
            
            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-12">
                <h3 className="font-bold text-xl mb-6">Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="relative h-48 rounded-lg overflow-hidden">
                      <Image src={img} alt={`Gallery ${i+1}`} fill loading="lazy" className="object-cover" sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="bg-gray-50 p-8 rounded-xl h-fit border border-gray-100">
            <h3 className="font-bold text-xl mb-6">Project Info</h3>
            <ul className="space-y-4 text-sm">
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Client</span>
                <span className="font-semibold text-brand-navy">{project.clientName || 'N/A'}</span>
              </li>
              <li className="flex justify-between border-b border-gray-200 pb-2">
                <span className="text-gray-500">Category</span>
                <span className="font-semibold text-brand-navy">{project.category || 'N/A'}</span>
              </li>

              {project.location && (
                <li className="flex justify-between border-b border-gray-200 pb-2">
                  <span className="text-gray-500">Location</span>
                  <span className="font-semibold text-brand-navy text-right max-w-[60%]">{project.location}</span>
                </li>
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
