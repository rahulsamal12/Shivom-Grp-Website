'use client';

import React, { useState, useEffect } from 'react';
import { PageBanner } from '@/components/layout/PageBanner';
import { projectsService } from '@/services/projects.service';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';
import { ClientBrand } from '@/components/ui/ClientBrand';
import { IProject } from '@/types';

export default function ProjectsPage() {
  const [projects, setProjects] = useState<IProject[] | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProjects() {
      try {
        const data = await projectsService.getProjects();
        setProjects(data);
      } catch (error) {
        console.error('[ProjectsPage] Error loading projects:', error);
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  let projectGroups: any[] = [];
  if (projects) {
    const sortedProjects = [...projects].sort((a: IProject, b: IProject) => {
      const dateA = new Date((a as any).createdAt || (a as any).projectDate || 0).getTime();
      const dateB = new Date((b as any).createdAt || (b as any).projectDate || 0).getTime();
      return dateB - dateA;
    });

    const ongoingProjects = sortedProjects.filter(p => p.category === 'Ongoing' || p.status === 'Ongoing');
    const completedProjects = sortedProjects.filter(p => p.category === 'Completed' || p.status === 'Completed');
    const clientProjects = sortedProjects.filter(p => !['Ongoing', 'Completed'].includes(p.category) && !['Ongoing', 'Completed'].includes(p.status || ''));

    projectGroups = [
      { title: 'Ongoing Projects', items: ongoingProjects, badgeColor: 'bg-blue-100 text-blue-800' },
      { title: 'Completed Projects', items: completedProjects, badgeColor: 'bg-green-100 text-green-800' },
      { title: 'Client Projects', items: clientProjects, badgeColor: 'bg-purple-100 text-purple-800' },
    ].filter(group => group.items.length > 0);
  }

  return (
    <>
      <PageBanner 
        title="Our Projects" 
        breadcrumb="Projects" 
        bgImage="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=2000" 
      />
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-brand-orange font-semibold tracking-wider uppercase text-sm mb-4 block">
              Our Portfolio
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-brand-navy mb-6">
              Infrastructure & Utility Projects
            </h2>
            <div className="w-24 h-1 bg-brand-orange mx-auto rounded-full mb-6" />
            <p className="text-gray-600 text-lg text-justify-content">
              Explore our successfully executed substation, power transmission line, and green energy projects across Odisha.
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 animate-pulse">
              {[1, 2, 3].map(n => (
                <div key={n} className="bg-white rounded-2xl h-96 border border-gray-100" />
              ))}
            </div>
          ) : !projects || projects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-lg font-medium">No projects found. Check back soon!</p>
            </div>
          ) : (
            <div className="flex flex-col gap-16">
              {projectGroups.map(group => (
                <div key={group.title}>
                  <div className="flex items-center gap-4 mb-8">
                    <h3 className="text-2xl md:text-3xl font-bold text-brand-navy">{group.title}</h3>
                    <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${group.badgeColor}`}>
                      {group.items.length} {group.items.length === 1 ? 'Project' : 'Projects'}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {group.items.map((project: IProject) => (
                      <div 
                        key={project._id} 
                        className="bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 group flex flex-col h-full"
                      >
                        <div className="relative h-64 w-full overflow-hidden bg-gray-100">
                          <Image 
                            src={project.featuredImage || 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=800'} 
                            alt={project.title}
                            fill
                            loading="lazy"
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                          />
                          <div className="absolute top-4 left-4 bg-brand-navy/90 text-white text-xs font-bold px-4 py-1.5 rounded-full uppercase tracking-wider">
                            {project.category}
                          </div>
                        </div>
                        
                        <div className="p-8 flex flex-col flex-grow">
                          {project.location && (
                            <span className="text-xs text-brand-orange font-semibold tracking-wider uppercase mb-3 block">
                              {project.location}
                            </span>
                          )}
                          <h3 className="text-2xl font-bold text-brand-navy mb-4 leading-tight group-hover:text-brand-orange transition-colors">
                            <Link prefetch={false} href={`/projects/${project.slug}`}>{project.title}</Link>
                          </h3>
                          <p className="text-gray-600 text-justify-content mb-6 flex-grow">
                            {project.shortDescription}
                          </p>
                          
                          <div className="border-t border-gray-100 pt-6 mt-auto flex items-center justify-between">
                            <ClientBrand name={project.clientName || project.category} />
                            <Link 
                              prefetch={false}
                              href={`/projects/${project.slug}`} 
                              className="w-10 h-10 rounded-full bg-brand-navy group-hover:bg-brand-orange text-white flex items-center justify-center transition-colors duration-300"
                            >
                              <ArrowUpRight className="w-5 h-5" />
                            </Link>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
