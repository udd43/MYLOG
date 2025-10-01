interface SiteConfig {
	site: string
	author: string
	title: string
	description: string
	lang: string
	ogLocale: string
	shareMessage: string
	paginationSize: number
}

export const siteConfig: SiteConfig = {
	site: 'https://blog-template-gray.vercel.app/', // 여기에 웹사이트 URL을 작성하세요
	author: 'udd43', // 사이트 작성자
	title: 'MY LOG', // 사이트 제목
	description: '개인 블로그입니다.', // 메타 태그에 표시할 설명
	lang: 'ko-KR',
	ogLocale: 'ko_KR',
	shareMessage: '이 포스트를 공유하세요', // 소셜 미디어에서 포스트 공유 시 메시지
	paginationSize: 6 // 페이지당 포스트 수
}