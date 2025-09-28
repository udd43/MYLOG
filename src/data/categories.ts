// 블로그 포스트용 카테고리 목록
export const CATEGORIES = [
	'JavaScript',
	'React',
	'Next.js',
	'TypeScript',
	'Web Development'
] as const

export type Category = typeof CATEGORIES[number]