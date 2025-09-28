import Link from 'next/link'
import Image from 'next/image'
import { Calendar, Clock, Tag } from 'lucide-react'
import { Post } from '@/lib/posts'

interface PostCardProps {
	post: Post
}

export default function PostCard({ post }: PostCardProps) {
	return (
		<article className="group relative overflow-hidden rounded-lg border bg-card text-card-foreground shadow-sm transition-all hover:shadow-md">
			<Link href={`/post/${post.slug}`} className="block">
				{/* Hero Image */}
				<div className="relative aspect-video overflow-hidden">
					<Image
						src={post.heroImage}
						alt={post.title}
						fill
						className="object-cover transition-transform group-hover:scale-105"
					/>
				</div>

				{/* Content */}
				<div className="p-6">
					{/* Category */}
					<div className="mb-2">
						<span className="inline-flex items-center rounded-full bg-primary/10 px-2.5 py-0.5 text-xs font-medium text-primary">
							{post.category}
						</span>
					</div>

					{/* Title */}
					<h2 className="mb-2 text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
						{post.title}
					</h2>

					{/* Description */}
					<p className="mb-4 text-sm text-muted-foreground line-clamp-2">
						{post.description}
					</p>

					{/* Meta Info */}
					<div className="flex items-center gap-4 text-xs text-muted-foreground">
						<div className="flex items-center gap-1">
							<Calendar className="h-3 w-3" />
							<span>{new Date(post.pubDate).toLocaleDateString('ko-KR')}</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="h-3 w-3" />
							<span>{post.readingTime}</span>
						</div>
					</div>

					{/* Tags */}
					{post.tags && post.tags.length > 0 && (
						<div className="mt-3 flex flex-wrap gap-1">
							{post.tags.slice(0, 3).map((tag) => (
								<span
									key={tag}
									className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-xs text-secondary-foreground"
								>
									<Tag className="h-2 w-2" />
									{tag}
								</span>
							))}
							{post.tags.length > 3 && (
								<span className="text-xs text-muted-foreground">
									+{post.tags.length - 3} more
								</span>
							)}
						</div>
					)}
				</div>
			</Link>
		</article>
	)
}
