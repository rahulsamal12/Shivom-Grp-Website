import { blogsService } from '@/services/blogs.service';
import { SectionHeading } from '../ui/SectionHeading';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { IBlog } from '@/types';
import { Button } from '../ui/Button';

export async function BlogSection() {
  let blogs: IBlog[] = [];

  try {
    blogs = await blogsService.getBlogs();
  } catch {
    // Return null on API failure
  }

  if (blogs.length === 0) return null;

  const featuredBlogs = blogs.slice(0, 2);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <SectionHeading title="Latest Insights" subtitle="News &amp; Updates" />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
          {featuredBlogs.map((blog: IBlog) => (
            <div key={blog._id} className="group cursor-pointer flex flex-col h-full">
              <div className="relative h-64 w-full rounded-2xl overflow-hidden mb-6 shadow-md">
                <Image
                  loading="lazy"
                  src={blog.featuredImage || '/placeholder-blog.jpg'}
                  alt={blog.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full text-xs font-bold text-brand-navy uppercase tracking-wider shadow-sm">
                  {blog.category}
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm text-gray-500 font-medium mb-3">
                <span>
                  {new Date(blog.publishedAt).toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>

              <h3 className="text-2xl font-bold text-brand-navy mb-3 leading-snug group-hover:text-brand-orange transition-colors">
                <Link prefetch={false} href={`/blogs/${blog.slug}`}>{blog.title}</Link>
              </h3>

              <p className="text-gray-600 leading-relaxed mb-6 flex-grow">{blog.excerpt}</p>

              <Link
                prefetch={false}
                href={`/blogs/${blog.slug}`}
                className="inline-flex items-center gap-2 text-brand-orange font-bold uppercase tracking-wider text-sm mt-auto group-hover:gap-3 transition-all"
              >
                Read More <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          ))}
        </div>

        {blogs.length > 2 && (
          <div className="flex justify-center mt-10">
            <Link prefetch={false} href="/blogs">
              <Button
                variant="secondary"
                className="flex items-center gap-2 hover:bg-brand-orange hover:text-white hover:border-transparent transition-all"
              >
                <span>View All Insights</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        )}
      </div>
    </section>
  );
}
