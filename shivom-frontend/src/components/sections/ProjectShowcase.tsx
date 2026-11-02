'use client';

import React, { useState, useEffect } from 'react';
import { projectsService } from '@/services/projects.service';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowUpRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { IProject } from '@/types';
import { ClientBrand } from '../ui/ClientBrand';

export function ProjectShowcase() {
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const fetched = await projectsService.getFeaturedProjects();
        setProjects(fetched);
      } catch (error) {
        console.error('[ProjectShowcase] Error fetching projects:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  if (loading) {
    return (
      <section className="py-24 bg-gray-50 animate-pulse">
        <div className="container mx-auto px-4 md:px-6">
          <SectionHeading title="Featured Projects" subtitle="Our Portfolio" />
          <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4 md:gap-6 mt-16">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-gray-200 rounded-xl" />
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (!projects || projects.length === 0) return null;

  return (
    <section className="py-24 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Featured Projects" subtitle="Our Portfolio" />

        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[250px] gap-4 md:gap-6 mt-16">
          {projects.slice(0, 4).map((project: IProject, index: number) => {
            const span =
              index === 0
                ? 'col-span-1 md:col-span-2 row-span-2'
                : index === 3
                  ? 'col-span-1 md:col-span-2 row-span-1'
                  : 'col-span-1 row-span-1';
            return (
              <div
                key={project._id}
                className={`relative group rounded-xl overflow-hidden shadow-lg ${span}`}
              >
                <Link prefetch={false} href={`/projects/${project.slug}`} className="block w-full h-full relative">
                  <Image
                    loading="lazy"
                    src={project.featuredImage || '/placeholder-project.jpg'}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-brand-navy/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />

                  <div className="absolute bottom-0 left-0 w-full p-6 md:p-8 flex items-end justify-between z-10">
                    <div>
                      <ClientBrand name={project.clientName || project.category} theme="dark" className="mb-3" />
                      <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">
                        {project.title}
                      </h3>
                    </div>
                    <div className="w-12 h-12 rounded-full bg-brand-orange text-white flex items-center justify-center shrink-0 translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <ArrowUpRight className="w-6 h-6" />
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
