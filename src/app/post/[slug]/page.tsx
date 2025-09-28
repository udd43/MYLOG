import { notFound } from 'next/navigation'
import { getPostBySlug, getAllPosts } from '@/lib/posts'
import { markdownToHtml } from '@/lib/markdown'
import Image from 'next/image'
import { Calendar, Clock, Tag, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { Metadata } from 'next'

interface PostPageProps {
	params: {
		slug: string
	}
}

export async function generateStaticParams() {
	const posts = getAllPosts()
	return posts.map((post) => ({
		slug: post.slug,
	}))
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
	const post = getPostBySlug(params.slug)

	if (!post) {
		return {
			title: 'Post Not Found',
		}
	}

	return {
		title: post.title,
		description: post.description,
		openGraph: {
			title: post.title,
			description: post.description,
			images: [post.heroImage],
		},
	}
}

export default async function PostPage({ params }: PostPageProps) {
	const post = getPostBySlug(params.slug)

	if (!post) {
		notFound()
	}

	const contentHtml = await markdownToHtml(post.content)

	return (
		<article className="container mx-auto px-4 py-8">
			{/* Back Button */}
			<Link
				href="/"
				className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
			>
				<ArrowLeft className="h-4 w-4" />
				뒤로 가기
			</Link>

			{/* Hero Image */}
			<div className="mb-8">
				<div className="relative aspect-video overflow-hidden rounded-lg">
					<Image
						src={post.heroImage}
						alt={post.title}
						fill
						className="object-cover"
					/>
				</div>
			</div>

			{/* Post Header */}
			<header className="mb-8">
				{/* Category */}
				<div className="mb-4">
					<span className="inline-flex items-center rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
						{post.category}
					</span>
				</div>

				{/* Title */}
				<h1 className="mb-4 text-4xl font-bold tracking-tight sm:text-5xl">
					{post.title}
				</h1>

				{/* Description */}
				<p className="mb-6 text-xl text-muted-foreground">
					{post.description}
				</p>

				{/* Meta Info */}
				<div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
					<div className="flex items-center gap-2">
						<Calendar className="h-4 w-4" />
						<span>{new Date(post.pubDate).toLocaleDateString('ko-KR')}</span>
					</div>
					<div className="flex items-center gap-2">
						<Clock className="h-4 w-4" />
						<span>{post.readingTime}</span>
					</div>
				</div>

				{/* Tags */}
				{post.tags && post.tags.length > 0 && (
					<div className="mt-4 flex flex-wrap gap-2">
						{post.tags.map((tag) => (
							<span
								key={tag}
								className="inline-flex items-center gap-1 rounded-md bg-secondary px-2 py-1 text-sm text-secondary-foreground"
							>
								<Tag className="h-3 w-3" />
								{tag}
							</span>
						))}
					</div>
				)}
			</header>

			{/* Post Content */}
			<div className="prose prose-lg max-w-none dark:prose-invert">
				<div dangerouslySetInnerHTML={{ __html: contentHtml }} />
			</div>
		</article>
	)
}
