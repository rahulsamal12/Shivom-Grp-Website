import { PageBanner } from '@/components/layout/PageBanner';
import { blogsService } from '@/services/blogs.service';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  try {
    const blogs = await blogsService.getBlogs();
    return blogs.map((blog) => ({
      slug: blog.slug,
    }));
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const resolvedParams = await params;
  const blog = await blogsService.getBlogBySlug(resolvedParams.slug);
  
  if (!blog) return { title: 'Blog Not Found | Shivom Group' };
  
  return {
    title: `${blog.title} | Shivom Group`,
    description: blog.excerpt || `Read about ${blog.title}`,
    openGraph: {
      images: blog.featuredImage ? [blog.featuredImage] : [],
    },
  };
}

export default async function BlogDetailPage({ params }: Props) {
  const resolvedParams = await params;
  const blog = await blogsService.getBlogBySlug(resolvedParams.slug);

  if (!blog) {
    notFound();
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
            <Image src={blog.featuredImage} alt={blog.title} fill loading="lazy" className="object-cover" />
          </div>
        )}
        <div className="prose prose-lg max-w-none text-gray-600">
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
