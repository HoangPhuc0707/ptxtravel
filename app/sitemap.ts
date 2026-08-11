import { MetadataRoute } from 'next';
import { getTours, getBlogs } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://ptxtravel.com';
  
  // Get all tours and blogs
  const tours = await getTours();
  const blogs = await getBlogs();
  
  // Static routes
  const staticRoutes = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/tours`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }
  ];

  // Dynamic tour routes
  const tourRoutes = tours.map((tour) => ({
    url: `${baseUrl}/tours/${tour.slug}`,
    lastModified: new Date(), // Alternatively, use tour.updatedAt if available
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // Dynamic blog routes
  const blogRoutes = blogs.map((blog) => ({
    url: `${baseUrl}/blog/${blog.slug}`,
    lastModified: new Date(blog.date || Date.now()),
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...tourRoutes, ...blogRoutes];
}
