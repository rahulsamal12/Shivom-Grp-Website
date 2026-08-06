import { PageBanner } from '@/components/layout/PageBanner';
import { projectsService } from '@/services/projects.service';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const projects = await projectsService.getProjects();
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const project = await projectsService.getProjectBySlug(resolvedParams.slug);
  
  if (!project) return { title: 'Project Not Found | Shivom Group' };
  
  return {
    title: `${project.title} | Shivom Group`,
    description: project.description || `Details about ${project.title}`,
    openGraph: {
      images: project.featuredImage ? [project.featuredImage] : [],
    },
  };
}

export default async function ProjectDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const project = await projectsService.getProjectBySlug(resolvedParams.slug);

  if (!project) {
    notFound();
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
                <Image src={project.featuredImage} alt={project.title} fill loading="lazy" className="object-cover" />
              </div>
            )}
            <div className="text-gray-600 leading-relaxed text-lg mb-6 prose max-w-none">
              <p>{project.description || 'Detailed information is not available.'}</p>
            </div>
            
            {project.gallery && project.gallery.length > 0 && (
              <div className="mt-12">
                <h3 className="font-bold text-xl mb-6">Gallery</h3>
                <div className="grid grid-cols-2 gap-4">
                  {project.gallery.map((img, i) => (
                    <div key={i} className="relative h-48 rounded-lg overflow-hidden">
                      <Image src={img} alt={`Gallery ${i+1}`} fill loading="lazy" className="object-cover" />
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
