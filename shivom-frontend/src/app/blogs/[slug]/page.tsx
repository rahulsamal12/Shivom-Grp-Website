import { BlogDetailClient } from '@/components/sections/BlogDetailClient';
import { blogsService } from '@/services/blogs.service';

export async function generateStaticParams() {
  try {
    const blogs = await blogsService.getBlogs();
    if (!blogs || blogs.length === 0) {
      return [{ slug: 'default' }];
    }
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch {
    return [{ slug: 'default' }];
  }
}

export default async function BlogDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = await params;
  return <BlogDetailClient slug={resolvedParams.slug} />;
}
