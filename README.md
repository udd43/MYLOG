# 블로그 템플릿

개인 블로그를 위한 Next.js 기반 템플릿입니다.

## 📋 프로젝트 개요

이 프로젝트는 개인 블로그 작성을 위한 현대적이고 반응형 웹사이트 템플릿입니다. Next.js 14와 TypeScript를 기반으로 구축되었으며, 마크다운 기반의 블로그 포스트 작성을 지원합니다.

## ✨ 주요 기능

- 🚀 **Next.js 14** - 최신 React 프레임워크
- 📝 **TypeScript** - 타입 안전성 보장
- 🎨 **Tailwind CSS** - 유틸리티 우선 CSS 프레임워크
- 📱 **반응형 디자인** - 모든 디바이스에서 최적화
- 🌙 **다크 모드** - 라이트/다크 테마 지원
- 📄 **마크다운 지원** - MDX 파일 지원
- 🔍 **검색 기능** - 정적 검색 지원
- 📊 **SEO 최적화** - 메타 태그 및 사이트맵 자동 생성
- ⚡ **빠른 로딩** - 이미지 최적화 및 성능 최적화
- 📖 **읽기 시간** - 자동 읽기 시간 계산
- 🏷️ **카테고리 및 태그** - 포스트 분류 시스템
- 📤 **소셜 공유** - 소셜 미디어 공유 기능

## 🛠️ 기술 스택

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Content**: Markdown, MDX
- **Deployment**: Vercel, Netlify 지원

## 🚀 시작하기

### 필수 요구사항

- Node.js 18.0 이상
- npm, yarn, 또는 pnpm

### 설치 및 실행

1. **저장소 클론**
   ```bash
   git clone [your-repository-url]
   cd blog-template
   ```

2. **의존성 설치**
   ```bash
   npm install
   # 또는
   yarn install
   # 또는
   pnpm install
   ```

3. **개발 서버 실행**
   ```bash
   npm run dev
   # 또는
   yarn dev
   # 또는
   pnpm dev
   ```

4. **브라우저에서 확인**
   - [http://localhost:3000](http://localhost:3000)에서 사이트를 확인하세요.

## 📁 프로젝트 구조

```
blog-template/
├── public/                 # 정적 파일
├── src/
│   ├── components/        # React 컴포넌트
│   ├── content/          # 블로그 포스트 (마크다운)
│   ├── data/             # 설정 파일
│   ├── lib/              # 유틸리티 함수
│   ├── styles/           # 스타일 파일
│   └── app/              # Next.js 앱 라우터
├── README.md
└── package.json
```

## ⚙️ 설정

### 1. 사이트 정보 설정

`src/data/site.config.ts` 파일에서 블로그 기본 정보를 설정하세요:

```typescript
export const SITE_CONFIG = {
  title: "당신의 블로그 제목",
  description: "블로그 설명",
  url: "https://your-domain.com",
  author: "당신의 이름",
  // ... 기타 설정
}
```

### 2. 소셜 링크 설정

`src/data/links.ts` 파일에서 소셜 미디어 링크를 설정하세요:

```typescript
export const SOCIAL_LINKS = {
  github: "https://github.com/your-username",
  twitter: "https://twitter.com/your-username",
  // ... 기타 소셜 링크
}
```

### 3. 카테고리 설정

`src/data/categories.ts` 파일에서 블로그 카테고리를 설정하세요:

```typescript
export const CATEGORIES = [
  '기술',
  '일상',
  '여행',
  // ... 원하는 카테고리 추가
] as const
```

## 📝 블로그 포스트 작성

### 새 포스트 추가

1. `src/content/blog/` 폴더에 새로운 `.md` 또는 `.mdx` 파일을 생성하세요.
2. 파일명이 URL 슬러그가 됩니다. (예: `my-first-post.md` → `/blog/my-first-post`)

### 포스트 프론트매터

각 포스트 파일 상단에 다음 정보를 추가하세요:

```markdown
---
title: "포스트 제목"
description: "포스트 설명"
pubDate: "2024-01-01"
heroImage: "/images/cover.jpg"
category: "기술"
tags: ["JavaScript", "React"]
draft: false
---
```

### 필수 필드
- `title`: 포스트 제목
- `description`: 포스트 설명
- `pubDate`: 발행일 (YYYY-MM-DD 형식)
- `heroImage`: 커버 이미지 경로
- `category`: 카테고리 (categories.ts에 정의된 것 중 하나)

### 선택 필드
- `tags`: 태그 배열
- `draft`: 초안 여부 (true면 게시되지 않음)

## 🎨 커스터마이징

### 테마 색상 변경

`tailwind.config.js` 파일에서 색상을 수정할 수 있습니다.

### 컴포넌트 수정

`src/components/` 폴더의 컴포넌트를 수정하여 디자인을 변경할 수 있습니다.

## 📦 빌드 및 배포

### 프로덕션 빌드

```bash
npm run build
```

### 정적 사이트 생성

```bash
npm run export
```

### 배포

- **Vercel**: GitHub에 푸시하면 자동 배포
- **Netlify**: GitHub 연결 후 자동 배포
- **기타 호스팅**: 빌드된 파일을 업로드

## 🛠️ 개발 명령어

| 명령어 | 설명 |
|--------|------|
| `npm run dev` | 개발 서버 시작 |
| `npm run build` | 프로덕션 빌드 |
| `npm run start` | 프로덕션 서버 시작 |
| `npm run lint` | ESLint 실행 |
| `npm run format` | Prettier 포맷팅 |

## 📄 라이선스

이 프로젝트는 개인 사용을 위한 템플릿입니다.

## 🤝 기여

버그 리포트나 기능 제안은 이슈로 등록해 주세요.

---

**즐거운 블로깅 되세요! 🎉**