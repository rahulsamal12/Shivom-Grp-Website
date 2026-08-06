import { PageBanner } from '@/components/layout/PageBanner';
import { projectsService } from '@/services/projects.service';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

export const revalidate = 300; // Revalidate every 5 minutes

export default async function ProjectsPage() {
  const projects = await projectsService.getProjects();

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
            <p className="text-gray-600 text-lg leading-relaxed">
              Explore our successfully executed substation, power transmission line, and green energy projects across Odisha.
            </p>
          </div>

          {projects.length === 0 ? (
            <div className="text-center py-20 bg-white rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-gray-500 text-lg font-medium">No projects found. Check back soon!</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
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
                    <p className="text-gray-600 leading-relaxed mb-6 flex-grow">
                      {project.shortDescription}
                    </p>
                    
                    <div className="border-t border-gray-100 pt-6 mt-auto flex items-center justify-between">
                      <span className="text-sm text-gray-400 font-medium">
                        {project.clientName || 'Shivom Group'}
                      </span>
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
          )}
        </div>
      </section>
    </>
  );
}
