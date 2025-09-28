import { getAllPosts } from '@/lib/posts'
import PostList from '@/components/PostList'
import { siteConfig } from '@/data/site.config'
import FuzzyText from '@/components/FuzzyText'

export default function HomePage() {
	const posts = getAllPosts()

	return (
		<div className="container mx-auto px-4 py-8">
			{/* Hero Section */}
			<section className="mb-12 text-center">
				<div className="mb-4">
					<FuzzyText 
						fontSize="clamp(2rem, 8vw, 6rem)"
						fontWeight={900}
						color="hsl(var(--foreground))"
						baseIntensity={0.15}
						hoverIntensity={0.4}
						enableHover={true}
					>
						{siteConfig.title}
					</FuzzyText>
				</div>
				<p className="mx-auto max-w-2xl text-lg text-muted-foreground">
					{siteConfig.description}
				</p>
			</section>

			{/* Latest Posts */}
			<section className="text-center">
				<PostList
					posts={posts}
					title="최신 포스트"
					description="새로 작성된 블로그 포스트들을 확인해보세요"
				/>
			</section>
		</div>
	)
}
