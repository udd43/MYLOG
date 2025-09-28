import { getAllTags, getAllPosts } from '@/lib/posts'
import Link from 'next/link'
import { Tag } from 'lucide-react'

export default function TagsPage() {
	const tags = getAllTags()
	const posts = getAllPosts()

	// 태그별 포스트 수 계산
	const tagCounts = tags.map((tag) => ({
		tag,
		count: posts.filter((post) => post.tags?.includes(tag)).length,
	}))

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-12 text-center">
				<h1 className="mb-4 text-4xl font-bold tracking-tight">태그</h1>
				<p className="text-lg text-muted-foreground">
					태그별로 정리된 블로그 포스트들을 확인해보세요
				</p>
			</div>

			<div className="flex flex-wrap gap-3">
				{tagCounts.map(({ tag, count }) => (
					<Link
						key={tag}
						href={`/tags/${tag.toLowerCase().replace(/\s+/g, '-')}`}
						className="group inline-flex items-center gap-2 rounded-full border bg-card px-4 py-2 text-card-foreground shadow-sm transition-all hover:shadow-md"
					>
						<Tag className="h-3 w-3" />
						<span className="font-medium">{tag}</span>
						<span className="text-xs text-muted-foreground">({count})</span>
					</Link>
				))}
			</div>
		</div>
	)
}
