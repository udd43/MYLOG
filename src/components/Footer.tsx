import Link from 'next/link'
import { siteConfig } from '@/data/site.config'
import { SOCIALNETWORKS } from '@/data/links'

export default function Footer() {
	return (
		<footer className="border-t bg-background">
			<div className="container mx-auto px-4 py-6 sm:py-8">
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
					{/* About */}
					<div className="text-center sm:text-left">
						<h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">{siteConfig.title}</h3>
						<p className="text-sm text-muted-foreground">
							{siteConfig.description}
						</p>
					</div>

					{/* Quick Links */}
					<div className="text-center sm:text-left">
						<h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">빠른 링크</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/"
									className="text-sm text-muted-foreground hover:text-foreground transition-colors"
								>
									홈
								</Link>
							</li>
							<li>
								<Link
									href="/category"
									className="text-sm text-muted-foreground hover:text-foreground transition-colors"
								>
									카테고리
								</Link>
							</li>
							<li>
								<Link
									href="/tags"
									className="text-sm text-muted-foreground hover:text-foreground transition-colors"
								>
									태그
								</Link>
							</li>
						</ul>
					</div>

					{/* Social Links */}
					<div className="text-center sm:text-left sm:col-span-2 lg:col-span-1">
						<h3 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">소셜 미디어</h3>
						<div className="flex justify-center sm:justify-start space-x-4">
							{SOCIALNETWORKS.map((social) => (
								<Link
									key={social.name}
									href={social.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-muted-foreground hover:text-foreground transition-colors"
								>
									<span className="sr-only">{social.name}</span>
									<social.icon className="h-5 w-5" />
								</Link>
							))}
						</div>
					</div>
				</div>

				<div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t text-center text-sm text-muted-foreground">
					<p>
						© {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
