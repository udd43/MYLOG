import { MetadataRoute } from 'next'
import { getAllPosts } from '@/lib/posts'
import { siteConfig } from '@/data/site.config'

export default function sitemap(): MetadataRoute.Sitemap {
	const posts = getAllPosts()
	const baseUrl = siteConfig.site

	const postUrls = posts.map((post) => ({
		url: `${baseUrl}post/${post.slug}`,
		lastModified: new Date(post.pubDate),
		changeFrequency: 'monthly' as const,
		priority: 0.8,
	}))

	return [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'daily',
			priority: 1,
		},
		{
			url: `${baseUrl}category`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		{
			url: `${baseUrl}tags`,
			lastModified: new Date(),
			changeFrequency: 'weekly',
			priority: 0.8,
		},
		...postUrls,
	]
}
