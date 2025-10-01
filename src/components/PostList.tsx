import { Post } from '@/lib/posts'
import PostCard from './PostCard'

interface PostListProps {
	posts: Post[]
	title?: string
	description?: string
}

export default function PostList({ posts, title, description }: PostListProps) {
	if (posts.length === 0) {
		return (
			<div className="text-center py-12">
				<h2 className="text-2xl font-bold mb-2">포스트가 없습니다</h2>
				<p className="text-muted-foreground">
					아직 작성된 포스트가 없습니다. 곧 새로운 콘텐츠를 추가할 예정입니다.
				</p>
			</div>
		)
	}

	return (
		<div className="space-y-6 sm:space-y-8 text-left">
			{(title || description) && (
				<div className="text-center px-4 py-6">
					{title && <h1 className="text-2xl sm:text-3xl font-bold mb-2 px-4 py-2">{title}</h1>}
					{description && (
						<p className="text-base sm:text-lg text-muted-foreground px-4 py-2">{description}</p>
					)}
				</div>
			)}

			<div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 justify-items-start">
				{posts.map((post) => (
					<PostCard key={post.slug} post={post} />
				))}
			</div>
		</div>
	)
}
