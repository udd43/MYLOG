'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Lock, User } from 'lucide-react'

export default function AdminLogin() {
	const [username, setUsername] = useState('')
	const [password, setPassword] = useState('')
	const [error, setError] = useState('')
	const router = useRouter()

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault()
		
		// 간단한 관리자 인증 (실제 프로젝트에서는 더 안전한 방법 사용)
		if (username === 'admin' && password === 'admin123') {
			localStorage.setItem('admin', 'true')
			router.push('/admin/write')
		} else {
			setError('잘못된 사용자명 또는 비밀번호입니다.')
		}
	}

	return (
		<div className="min-h-screen flex items-center justify-center bg-background">
			<div className="max-w-md w-full space-y-8 p-8">
				<div className="text-center">
					<h2 className="text-3xl font-bold text-foreground">관리자 로그인</h2>
					<p className="mt-2 text-sm text-muted-foreground">
						블로그 관리자 계정으로 로그인하세요
					</p>
				</div>
				
				<form className="mt-8 space-y-6" onSubmit={handleSubmit}>
					<div className="space-y-4">
						<div>
							<label htmlFor="username" className="block text-sm font-medium text-foreground">
								사용자명
							</label>
							<div className="mt-1 relative">
								<User className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<input
									id="username"
									name="username"
									type="text"
									required
									value={username}
									onChange={(e) => setUsername(e.target.value)}
									className="w-full pl-10 pr-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
									placeholder="사용자명을 입력하세요"
								/>
							</div>
						</div>
						
						<div>
							<label htmlFor="password" className="block text-sm font-medium text-foreground">
								비밀번호
							</label>
							<div className="mt-1 relative">
								<Lock className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
								<input
									id="password"
									name="password"
									type="password"
									required
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									className="w-full pl-10 pr-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent"
									placeholder="비밀번호를 입력하세요"
								/>
							</div>
						</div>
					</div>

					{error && (
						<div className="text-sm text-red-500 text-center">
							{error}
						</div>
					)}

					<div>
						<button
							type="submit"
							className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-primary-foreground bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-ring"
						>
							로그인
						</button>
					</div>
				</form>

				<div className="text-center text-xs text-muted-foreground">
					<p>테스트 계정:</p>
					<p>사용자명: admin</p>
					<p>비밀번호: admin123</p>
				</div>
			</div>
		</div>
	)
}
