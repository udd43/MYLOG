import { MetadataRoute } from 'next'
import { siteConfig } from '@/data/site.config'

export default function robots(): MetadataRoute.Robots {
	return {
		rules: {
			userAgent: '*',
			allow: '/',
		},
		sitemap: `${siteConfig.site}sitemap.xml`,
	}
}
