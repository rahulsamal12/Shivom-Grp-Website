import { ProjectDetailClient } from '@/components/sections/ProjectDetailClient';
import { projectsService } from '@/services/projects.service';

export async function generateStaticParams() {
  try {
    const projects = await projectsService.getProjects();
    if (!projects || projects.length === 0) {
      return [{ slug: 'default' }];
    }
    return projects.map((project) => ({
      slug: project.slug,
    }));
  } catch {
    return [{ slug: 'default' }];
  }
}

export default async function ProjectDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <ProjectDetailClient slug={resolvedParams.slug} />;
}
