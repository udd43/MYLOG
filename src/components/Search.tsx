'use client'

import { useState, useEffect } from 'react'
import { Search as SearchIcon, X } from 'lucide-react'
import { Post } from '@/lib/posts'
import Link from 'next/link'

interface SearchProps {
	posts: Post[]
}

export default function Search({ posts }: SearchProps) {
	const [isOpen, setIsOpen] = useState(false)
	const [query, setQuery] = useState('')
	const [results, setResults] = useState<Post[]>([])

	useEffect(() => {
		if (query.trim() === '') {
			setResults([])
			return
		}

		const filtered = posts.filter(
			(post) =>
				post.title.toLowerCase().includes(query.toLowerCase()) ||
				post.description.toLowerCase().includes(query.toLowerCase()) ||
				post.content.toLowerCase().includes(query.toLowerCase()) ||
				post.tags?.some((tag) => tag.toLowerCase().includes(query.toLowerCase()))
		)

		setResults(filtered)
	}, [query, posts])

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === 'Escape') {
			setIsOpen(false)
			setQuery('')
		}
	}

	return (
		<>
			{/* Search Button */}
			<button
				onClick={() => setIsOpen(true)}
				className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
			>
				<SearchIcon className="h-4 w-4" />
				<span className="sr-only">검색</span>
			</button>

			{/* Search Modal */}
			{isOpen && (
				<div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm">
					<div className="fixed left-1/2 top-20 w-full max-w-2xl -translate-x-1/2 transform">
						<div className="rounded-lg border bg-background p-6 shadow-lg">
							{/* Search Input */}
							<div className="relative mb-4">
								<SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<input
									type="text"
									placeholder="포스트 검색..."
									value={query}
									onChange={(e) => setQuery(e.target.value)}
									onKeyDown={handleKeyDown}
									className="w-full rounded-md border border-input bg-background px-10 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
									autoFocus
								/>
								<button
									onClick={() => setIsOpen(false)}
									className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								>
									<X className="h-4 w-4" />
								</button>
							</div>

							{/* Search Results */}
							<div className="max-h-96 overflow-y-auto">
								{query.trim() === '' ? (
									<p className="text-center text-sm text-muted-foreground">
										검색어를 입력하세요
									</p>
								) : results.length === 0 ? (
									<p className="text-center text-sm text-muted-foreground">
										검색 결과가 없습니다
									</p>
								) : (
									<div className="space-y-2">
										{results.map((post) => (
											<Link
												key={post.slug}
												href={`/post/${post.slug}`}
												onClick={() => setIsOpen(false)}
												className="block rounded-md border bg-card p-4 text-card-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
											>
												<h3 className="font-medium">{post.title}</h3>
												<p className="text-sm text-muted-foreground line-clamp-2">
													{post.description}
												</p>
												<div className="mt-2 flex items-center gap-2 text-xs text-muted-foreground">
													<span>{post.category}</span>
													<span>•</span>
													<span>{new Date(post.pubDate).toLocaleDateString('ko-KR')}</span>
												</div>
											</Link>
										))}
									</div>
								)}
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
