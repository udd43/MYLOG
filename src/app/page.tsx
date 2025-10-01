import { getAllPosts } from '@/lib/posts'
import PostList from '@/components/PostList'
import { siteConfig } from '@/data/site.config'
import SimpleFuzzyText from '@/components/SimpleFuzzyText'

export default function HomePage() {
	const posts = getAllPosts()

	return (
		<div className="min-h-screen flex flex-col justify-center items-center px-4 py-8 sm:py-12">
			{/* Hero Section - 정가운데 */}
			<section className="text-center -mt-24 sm:-mt-28">
				<div className="mb-4 sm:mb-6">
					<SimpleFuzzyText 
						fontSize="clamp(2rem, 8vw, 6rem)"
						fontWeight={900}
						color="hsl(var(--foreground))"
						baseIntensity={0.15}
						hoverIntensity={0.4}
						enableHover={true}
					>
						{siteConfig.title}
					</SimpleFuzzyText>
				</div>
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
