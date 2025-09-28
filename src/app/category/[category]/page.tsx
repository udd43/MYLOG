import { notFound } from 'next/navigation'
import { getPostsByCategory, getAllPosts } from '@/lib/posts'
import { CATEGORIES } from '@/data/categories'
import PostList from '@/components/PostList'
import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'

interface CategoryPageProps {
	params: {
		category: string
	}
}

export async function generateStaticParams() {
	return CATEGORIES.map((category) => ({
		category: category.toLowerCase().replace(/\s+/g, '-'),
	}))
}

export default function CategoryPage({ params }: CategoryPageProps) {
	const categoryName = params.category
		.split('-')
		.map((word) => word.charAt(0).toUpperCase() + word.slice(1))
		.join(' ')

	const category = CATEGORIES.find(
		(cat) => cat.toLowerCase().replace(/\s+/g, '-') === categoryName.toLowerCase().replace(/\s+/g, '-')
	)

	if (!category) {
		notFound()
	}

	const posts = getPostsByCategory(category)

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Back Button */}
			<Link
				href="/category"
				className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
			>
				<ArrowLeft className="h-4 w-4" />
				카테고리 목록으로 돌아가기
			</Link>

			<PostList
				posts={posts}
				title={`${category} 카테고리`}
				description={`${category} 관련 포스트들을 확인해보세요`}
			/>
		</div>
	)
}
