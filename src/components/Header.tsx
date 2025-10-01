'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { Menu, X, Sun, Moon, Edit3, LogOut } from 'lucide-react'
import { useTheme } from 'next-themes'
import { siteConfig } from '@/data/site.config'
import Search from './Search'
import { Post } from '@/lib/posts'
import SimpleFuzzyText from './SimpleFuzzyText'

interface HeaderProps {
	posts: Post[]
}

export default function Header({ posts }: HeaderProps) {
	const [isMenuOpen, setIsMenuOpen] = useState(false)
	const [isAdmin, setIsAdmin] = useState(false)
	const { theme, setTheme } = useTheme()

	useEffect(() => {
		// 관리자 상태 확인
		const admin = localStorage.getItem('admin')
		setIsAdmin(admin === 'true')
	}, [])

	const toggleMenu = () => {
		setIsMenuOpen(!isMenuOpen)
	}

	const toggleTheme = () => {
		setTheme(theme === 'dark' ? 'light' : 'dark')
	}

	const handleLogout = () => {
		localStorage.removeItem('admin')
		setIsAdmin(false)
		window.location.href = '/'
	}

	return (
		<header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
			<div className="container mx-auto flex h-16 items-center justify-between px-4">
				{/* Left side - Logo */}
				<Link href="/" className="flex items-center space-x-2">
					<SimpleFuzzyText 
						fontSize="clamp(0.8rem, 2.5vw, 2rem)"
						fontWeight={700}
						color="hsl(var(--foreground))"
						baseIntensity={0.1}
						hoverIntensity={0.3}
						enableHover={true}
					>
						{siteConfig.title}
					</SimpleFuzzyText>
				</Link>

				{/* Center - Desktop Navigation */}
				<nav className="hidden lg:flex items-center space-x-4 xl:space-x-6 absolute left-1/2 transform -translate-x-1/2">
					<Link
						href="/"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						홈
					</Link>
					<Link
						href="/category"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						카테고리
					</Link>
					<Link
						href="/tags"
						className="text-sm font-medium transition-colors hover:text-primary"
					>
						태그
					</Link>
					{isAdmin && (
						<Link
							href="/admin/write"
							className="text-sm font-medium transition-colors hover:text-primary flex items-center gap-1"
						>
							<Edit3 className="h-3 w-3" />
							글쓰기
						</Link>
					)}
				</nav>

				{/* Right side - Search, Theme Toggle & Mobile Menu Button */}
				<div className="flex items-center space-x-1 sm:space-x-2">
					<Search posts={posts} />
					{isAdmin && (
						<button
							onClick={handleLogout}
							className="hidden sm:inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-8 w-8 sm:h-10 sm:w-10"
							title="로그아웃"
						>
							<LogOut className="h-3 w-3 sm:h-4 sm:w-4" />
							<span className="sr-only">로그아웃</span>
						</button>
					)}
					<button
						onClick={toggleTheme}
						className="inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-8 w-8 sm:h-10 sm:w-10"
					>
						<Sun className="h-3 w-3 sm:h-4 sm:w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
						<Moon className="absolute h-3 w-3 sm:h-4 sm:w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
						<span className="sr-only">테마 전환</span>
					</button>

					{/* Mobile Menu Button */}
					<button
						onClick={toggleMenu}
						className="lg:hidden inline-flex items-center justify-center rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background hover:bg-accent hover:text-accent-foreground h-8 w-8 sm:h-10 sm:w-10"
					>
						{isMenuOpen ? (
							<X className="h-3 w-3 sm:h-4 sm:w-4" />
						) : (
							<Menu className="h-3 w-3 sm:h-4 sm:w-4" />
						)}
						<span className="sr-only">메뉴 토글</span>
					</button>
				</div>
			</div>

			{/* Mobile Navigation */}
			{isMenuOpen && (
				<div className="md:hidden border-t bg-background">
					<nav className="container mx-auto px-4 py-4 space-y-2">
						<Link
							href="/"
							className="block py-2 text-sm font-medium transition-colors hover:text-primary"
							onClick={() => setIsMenuOpen(false)}
						>
							홈
						</Link>
						<Link
							href="/category"
							className="block py-2 text-sm font-medium transition-colors hover:text-primary"
							onClick={() => setIsMenuOpen(false)}
						>
							카테고리
						</Link>
						<Link
							href="/tags"
							className="block py-2 text-sm font-medium transition-colors hover:text-primary"
							onClick={() => setIsMenuOpen(false)}
						>
							태그
						</Link>
						{isAdmin && (
							<>
								<Link
									href="/admin/write"
									className="block py-2 text-sm font-medium transition-colors hover:text-primary flex items-center gap-2"
									onClick={() => setIsMenuOpen(false)}
								>
									<Edit3 className="h-3 w-3" />
									글쓰기
								</Link>
								<button
									onClick={() => {
										handleLogout()
										setIsMenuOpen(false)
									}}
									className="block py-2 text-sm font-medium transition-colors hover:text-primary flex items-center gap-2 w-full text-left"
								>
									<LogOut className="h-3 w-3" />
									로그아웃
								</button>
							</>
						)}
					</nav>
				</div>
			)}
		</header>
	)
}
