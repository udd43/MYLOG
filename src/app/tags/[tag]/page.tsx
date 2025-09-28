import { notFound } from 'next/navigation'
import { getPostsByTag, getAllTags } from '@/lib/posts'
import PostList from '@/components/PostList'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface TagPageProps {
	params: {
		tag: string
	}
}

export async function generateStaticParams() {
	const tags = getAllTags()
	return tags.map((tag) => ({
		tag: tag.toLowerCase().replace(/\s+/g, '-'),
	}))
}

export default function TagPage({ params }: TagPageProps) {
	const tagName = params.tag
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')

	const allTags = getAllTags()
	const tag = allTags.find(
		(t) => t.toLowerCase().replace(/\s+/g, '-') === tagName.toLowerCase().replace(/\s+/g, '-')
	)

	if (!tag) {
		notFound()
	}

	const posts = getPostsByTag(tag)

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Back Button */}
			<Link
				href="/tags"
				className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
			>
				<ArrowLeft className="h-4 w-4" />
				태그 목록으로 돌아가기
			</Link>

			<PostList
				posts={posts}
				title={`#${tag} 태그`}
				description={`${tag} 태그가 포함된 포스트들을 확인해보세요`}
			/>
		</div>
	)
}
