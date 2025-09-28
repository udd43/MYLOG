import Link from 'next/link'
import { siteConfig } from '@/data/site.config'
import { SOCIALNETWORKS } from '@/data/links'

export default function Footer() {
	return (
		<footer className="border-t bg-background">
			<div className="container mx-auto px-4 py-8">
				<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
					{/* About */}
					<div>
						<h3 className="text-lg font-semibold mb-4">{siteConfig.title}</h3>
						<p className="text-sm text-muted-foreground">
							{siteConfig.description}
						</p>
					</div>

					{/* Quick Links */}
					<div>
						<h3 className="text-lg font-semibold mb-4">빠른 링크</h3>
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
					<div>
						<h3 className="text-lg font-semibold mb-4">소셜 미디어</h3>
						<div className="flex space-x-4">
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

				<div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
					<p>
						© {new Date().getFullYear()} {siteConfig.author}. All rights reserved.
					</p>
				</div>
			</div>
		</footer>
	)
}
