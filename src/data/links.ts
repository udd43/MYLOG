import { Mail, Github } from 'lucide-react'

// 여기에 소셜 네트워크를 추가하세요
export const SOCIALNETWORKS = [
	{
		name: 'Email',
		url: 'mailto:your-email@example.com',
		icon: Mail
	},
	{
		name: 'GitHub',
		url: 'https://github.com/udd43',
		icon: Github
	}
] as const