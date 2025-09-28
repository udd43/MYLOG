import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import readingTime from 'reading-time'
import { Category } from '@/data/categories'

export interface Post {
	slug: string
	title: string
	description: string
	pubDate: string
	heroImage: string
	category: Category
	tags?: string[]
	draft?: boolean
	readingTime: string
	content: string
}

const postsDirectory = path.join(process.cwd(), 'src/content/blog')

export function getAllPosts(): Post[] {
	const fileNames = fs.readdirSync(postsDirectory)
	const allPostsData = fileNames
		.filter((fileName) => fileName.endsWith('.md') || fileName.endsWith('.mdx'))
		.map((fileName) => {
			const slug = fileName.replace(/\.(md|mdx)$/, '')
			const fullPath = path.join(postsDirectory, fileName)
			const fileContents = fs.readFileSync(fullPath, 'utf8')
			const { data, content } = matter(fileContents)
			const readingTimeResult = readingTime(content)

			return {
				slug,
				title: data.title,
				description: data.description,
				pubDate: data.pubDate,
				heroImage: data.heroImage,
				category: data.category,
				tags: data.tags || [],
				draft: data.draft || false,
				readingTime: readingTimeResult.text,
				content,
			} as Post
		})
		.filter((post) => !post.draft)
		.sort((a, b) => (a.pubDate < b.pubDate ? 1 : -1))

	return allPostsData
}

export function getPostBySlug(slug: string): Post | null {
	try {
		const fullPath = path.join(postsDirectory, `${slug}.md`)
		const fileContents = fs.readFileSync(fullPath, 'utf8')
		const { data, content } = matter(fileContents)
		const readingTimeResult = readingTime(content)

		return {
			slug,
			title: data.title,
			description: data.description,
			pubDate: data.pubDate,
			heroImage: data.heroImage,
			category: data.category,
			tags: data.tags || [],
			draft: data.draft || false,
			readingTime: readingTimeResult.text,
			content,
		} as Post
	} catch (error) {
		return null
	}
}

export function getPostsByCategory(category: Category): Post[] {
	const allPosts = getAllPosts()
	return allPosts.filter((post) => post.category === category)
}

export function getPostsByTag(tag: string): Post[] {
	const allPosts = getAllPosts()
	return allPosts.filter((post) => post.tags?.includes(tag))
}

export function getAllTags(): string[] {
	const allPosts = getAllPosts()
	const tags = allPosts.flatMap((post) => post.tags || [])
	return Array.from(new Set(tags)).sort()
}
