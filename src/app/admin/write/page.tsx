'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Save, Eye, ArrowLeft } from 'lucide-react'
import { CATEGORIES } from '@/data/categories'

export default function WritePost() {
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [content, setContent] = useState('')
	const [category, setCategory] = useState('')
	const [tags, setTags] = useState('')
	const [heroImage, setHeroImage] = useState('/placeholder-hero.jpg')
	const [draft, setDraft] = useState(false)
	const [isAuthenticated, setIsAuthenticated] = useState(false)
	const router = useRouter()

	useEffect(() => {
		// 관리자 인증 확인
		const admin = localStorage.getItem('admin')
		if (admin === 'true') {
			setIsAuthenticated(true)
		} else {
			router.push('/admin/login')
		}
	}, [router])

	const handleSave = () => {
		if (!title || !description || !content || !category) {
			alert('제목, 설명, 내용, 카테고리는 필수입니다.')
			return
		}

		// 파일명 생성 (제목을 기반으로)
		const slug = title
			.toLowerCase()
			.replace(/[^a-z0-9가-힣\s]/g, '')
			.replace(/\s+/g, '-')
			.trim()

		// Front matter 생성
		const frontMatter = `---
title: "${title}"
description: "${description}"
pubDate: "${new Date().toLocaleDateString('en-US', { 
	year: 'numeric', 
	month: 'short', 
	day: '2-digit' 
})}"
heroImage: "${heroImage}"
category: "${category}"
tags: [${tags.split(',').map(tag => `"${tag.trim()}"`).join(', ')}]
draft: ${draft}
---

${content}`

		// 파일 다운로드
		const blob = new Blob([frontMatter], { type: 'text/markdown' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = `${slug}.md`
		document.body.appendChild(a)
		a.click()
		document.body.removeChild(a)
		URL.revokeObjectURL(url)

		alert('포스트가 다운로드되었습니다. src/content/blog/ 폴더에 파일을 복사하세요.')
	}

	if (!isAuthenticated) {
		return <div>인증 중...</div>
	}

	return (
		<div className="container mx-auto px-4 py-8 max-w-4xl">
			{/* 헤더 */}
			<div className="mb-8">
				<button
					onClick={() => router.push('/')}
					className="mb-4 inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
				>
					<ArrowLeft className="h-4 w-4" />
					홈으로 돌아가기
				</button>
				<h1 className="text-3xl font-bold">새 포스트 작성</h1>
				<p className="text-muted-foreground">블로그 포스트를 작성하고 관리하세요</p>
			</div>

			<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
				{/* 작성 폼 */}
				<div className="lg:col-span-2 space-y-6">
					{/* 제목 */}
					<div>
						<label className="block text-sm font-medium mb-2">제목 *</label>
						<input
							type="text"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
							className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
							placeholder="포스트 제목을 입력하세요"
						/>
					</div>

					{/* 설명 */}
					<div>
						<label className="block text-sm font-medium mb-2">설명 *</label>
						<textarea
							value={description}
							onChange={(e) => setDescription(e.target.value)}
							rows={3}
							className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
							placeholder="포스트 설명을 입력하세요"
						/>
					</div>

					{/* 내용 */}
					<div>
						<label className="block text-sm font-medium mb-2">내용 *</label>
						<textarea
							value={content}
							onChange={(e) => setContent(e.target.value)}
							rows={20}
							className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring font-mono text-sm"
							placeholder="마크다운으로 포스트 내용을 작성하세요..."
						/>
					</div>
				</div>

				{/* 사이드바 */}
				<div className="space-y-6">
					{/* 카테고리 */}
					<div>
						<label className="block text-sm font-medium mb-2">카테고리 *</label>
						<select
							value={category}
							onChange={(e) => setCategory(e.target.value)}
							className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
						>
							<option value="">카테고리 선택</option>
							{CATEGORIES.map((cat) => (
								<option key={cat} value={cat}>
									{cat}
								</option>
							))}
						</select>
					</div>

					{/* 태그 */}
					<div>
						<label className="block text-sm font-medium mb-2">태그</label>
						<input
							type="text"
							value={tags}
							onChange={(e) => setTags(e.target.value)}
							className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
							placeholder="태그1, 태그2, 태그3"
						/>
						<p className="text-xs text-muted-foreground mt-1">
							쉼표로 구분하여 입력하세요
						</p>
					</div>

					{/* 히어로 이미지 */}
					<div>
						<label className="block text-sm font-medium mb-2">히어로 이미지</label>
						<input
							type="text"
							value={heroImage}
							onChange={(e) => setHeroImage(e.target.value)}
							className="w-full px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
							placeholder="/이미지경로.jpg"
						/>
					</div>

					{/* 초안 모드 */}
					<div className="flex items-center space-x-2">
						<input
							type="checkbox"
							id="draft"
							checked={draft}
							onChange={(e) => setDraft(e.target.checked)}
							className="rounded border-input"
						/>
						<label htmlFor="draft" className="text-sm font-medium">
							초안으로 저장
						</label>
					</div>

					{/* 저장 버튼 */}
					<button
						onClick={handleSave}
						className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
					>
						<Save className="h-4 w-4" />
						포스트 저장
					</button>
				</div>
			</div>
		</div>
	)
}
