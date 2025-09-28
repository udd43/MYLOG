import { getAllPosts } from '@/lib/posts'
import { CATEGORIES } from '@/data/categories'
import Link from 'next/link'

export default function CategoryPage() {
	const posts = getAllPosts()

	// 카테고리별 포스트 수 계산
	const categoryCounts = CATEGORIES.map((category) => ({
		category,
		count: posts.filter((post) => post.category === category).length,
	}))

	return (
		<div className="container mx-auto px-4 py-8">
			<div className="mb-12 text-center">
				<h1 className="mb-4 text-4xl font-bold tracking-tight">카테고리</h1>
				<p className="text-lg text-muted-foreground">
					주제별로 정리된 블로그 포스트들을 확인해보세요
				</p>
			</div>

			<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{categoryCounts.map(({ category, count }) => (
					<Link
						key={category}
						href={`/category/${category.toLowerCase().replace(/\s+/g, '-')}`}
						className="group block rounded-lg border bg-card p-6 text-card-foreground shadow-sm transition-all hover:shadow-md"
					>
						<h2 className="mb-2 text-xl font-semibold group-hover:text-primary transition-colors">
							{category}
						</h2>
						<p className="text-sm text-muted-foreground">
							{count}개의 포스트
						</p>
					</Link>
				))}
			</div>
		</div>
	)
}
