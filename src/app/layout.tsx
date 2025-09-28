import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/ThemeProvider'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { getAllPosts } from '@/lib/posts'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'MY LOG',
	description: 'Next.js로 만든 한국어 블로그 템플릿입니다.',
	metadataBase: new URL('https://blog-template-gray.vercel.app/'),
	openGraph: {
		title: 'MY LOG',
		description: 'Next.js로 만든 한국어 블로그 템플릿입니다.',
		url: 'https://blog-template-gray.vercel.app/',
		siteName: 'MY LOG',
		images: [
			{
				url: '/open-graph.png',
				width: 1200,
				height: 630,
				alt: 'MY LOG',
			},
		],
		locale: 'ko_KR',
		type: 'website',
	},
	twitter: {
		card: 'summary_large_image',
		title: 'MY LOG',
		description: 'Next.js로 만든 한국어 블로그 템플릿입니다.',
		images: ['/open-graph.png'],
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			'max-video-preview': -1,
			'max-image-preview': 'large',
			'max-snippet': -1,
		},
	},
}

export default function RootLayout({
	children,
}: {
	children: React.ReactNode
}) {
	const posts = getAllPosts()

	return (
		<html lang="en" suppressHydrationWarning>
			<body className={inter.className}>
				<ThemeProvider
					attribute="class"
					defaultTheme="system"
					enableSystem
					disableTransitionOnChange
				>
					<div className="relative flex min-h-screen flex-col">
						{/* Background */}
						<div className="fixed inset-0 z-0">
							<div className="absolute inset-0 bg-gradient-to-br from-indigo-500/30 via-purple-500/20 to-pink-500/30 animate-gradient"></div>
							<div className="absolute inset-0 bg-gradient-to-tr from-blue-500/20 via-cyan-500/15 to-teal-500/20 animate-gradient" style={{animationDelay: '2s'}}></div>
							<div className="absolute inset-0 bg-gradient-to-bl from-violet-500/15 via-fuchsia-500/10 to-rose-500/15 animate-gradient" style={{animationDelay: '4s'}}></div>
						</div>
						
						{/* Content */}
						<div className="relative z-10 flex min-h-screen flex-col bg-background/90 backdrop-blur-sm">
							<Header posts={posts} />
							<main className="flex-1">{children}</main>
							<Footer />
						</div>
					</div>
				</ThemeProvider>
			</body>
		</html>
	)
}
