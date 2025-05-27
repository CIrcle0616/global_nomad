# 💻 Global Nomad

> **" 이 프로젝트는 캘린더 뷰 SDK와 지도 뷰 SDK를 활용해 예약 가능한 날짜를 설정하고, 체험 상품을 예약하는 기능을 구현하는 것을 목표로 합니다. "**

---

## 👤 팀원 소개 & 역할

| 프로필 | 이름 | GitHub | 주요 담당 기능 |
|--------|------|--------|----------------|
| <img src="https://avatars.githubusercontent.com/u/81224667?v=4" width="60" /> | **나예진** | [@JjinJjin](https://github.com/NaYejin94) | 역할1(추후 수정) |
| <img src="https://avatars.githubusercontent.com/u/81631735?v=4" width="60" /> | **박원현** | [@CIrcle0616](https://github.com/CIrcle0616) | 역할2(추후 수정) | 
| <img src="https://avatars.githubusercontent.com/u/120624055?v=4" width="60" /> | **박찬영** | [@Parkchanyoung0710](https://github.com/Parkchanyoung0710) | 역할3(추후 수정) | 
| <img src="https://avatars.githubusercontent.com/u/61350224?v=4" width="60" /> | **오종택** | [@ohjongteak](https://github.com/ohjongteak) | 역할4(추후 수정) |
| <img src="https://avatars.githubusercontent.com/u/16948775?v=4" width="60" /> | **전수영** | [@daonJeon](https://github.com/daonJeon) | 역할5(추후 수정) |
| <img src="https://avatars.githubusercontent.com/u/192935871?v=4" width="60" /> | **조지현** | [@zeon0xx0](https://github.com/zeon0xx0) | 역할6(추후 수정) |

---

## 🔗 배포 주소
- [Global Nomad](배포 후 주소 업데이트 하겠습니다 )

## 🚀 배포 환경
- vercel

## 🗓 개발 기간
- **2025.05.27 ~ 2025.06.26**

---

## ✨ 주요 기능 요약

---

## ⚙️ 설치 및 실행 방법

```bash
# 1. 저장소 클론
$ git clone [저장소 URL]
$ cd [프로젝트 디렉토리]

# 2. 의존성 설치
$ npm install

# 3. 개발 서버 실행
$ npm run dev
```

---

## 🛠 Tech Stack

> 본 프로젝트는 아래 기술 스택을 기반으로 구성되었습니다.

---

### 📚 Language & Framework
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=react&logoColor=white)
![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=nextdotjs&logoColor=white)

---

### 🎨 UI & Styling
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)

---

### 🔁 Routing & State
![App Router](https://img.shields.io/badge/App_Router-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![React Query](https://img.shields.io/badge/React_Query-FF4154?style=flat-square&logo=react-query&logoColor=white)
![Zustand](https://img.shields.io/badge/Zustand-000000?style=flat-square&logo=Zustand&logoColor=white)

---

### 🔌 API & Auth
![Fetch API](https://img.shields.io/badge/Fetch_API-native?style=flat-square&logo=javascript&logoColor=white)

---

### ⚙️ Build & Deploy
![Webpack](https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=webpack&logoColor=black)
![Vercel](https://img.shields.io/badge/Vercel-000000?style=flat-square&logo=vercel&logoColor=white)

---

### 🧹 Code Quality
![ESLint](https://img.shields.io/badge/ESLint-4B32C3?style=flat-square&logo=eslint&logoColor=white)
![Prettier](https://img.shields.io/badge/Prettier-F7B93E?style=flat-square&logo=prettier&logoColor=black)

---

## 🤔 Why These Tools?

- **Next.js (App Router)**: 파일 기반 라우팅과 서버 컴포넌트 지원으로 빠른 렌더링 성능
- **React Query & Zustand**: 서버와 클라이언트 상태를 분리해 성능과 코드 유지보수 향상
- **Tailwind CSS**: 빠른 스타일링과 일관성 있는 디자인 시스템 구성
- **ESLint & Prettier**: 코드 품질 유지 및 팀 간 협업을 위한 포맷 통일

---

 
## 📂 폴더 및 파일 구조 (Folder Structure)

```
/
├── public/                      # 정적 파일 (이미지, 폰트 등)
├── src/
│   ├── app/                     # Next.js App Router (라우팅, 페이지, 레이아웃, 로딩 UI, 에러 UI 등)
│   │   ├── (auth)/              # 라우트 그룹 (예: 인증 관련 페이지)
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── api/                 # API 라우트 핸들러 (Route Handlers)
│   │   │   └── hello/
│   │   │       └── route.ts
│   │   ├── layout.tsx    pa       # 루트 레이아웃
│   │   ├── page.tsx             # 루트 페이지
│   │   └── global.css           # 전역 스타일 (Tailwind CSS import 등)
│   ├── components/              # 재사용 가능한 UI 컴포넌트
│   │   ├── common/              # 여러 도메인에서 사용되는 범용 컴포넌트 (Button, Input 등)
│   │   │   ├── Button.tsx
│   │   │   └── Input.tsx
│   │   └── domain/              # 특정 도메인에 종속적인 컴포넌트 (예: ProductCard)
│   │       └── product/
│   │           └── ProductCard.tsx
│   ├── constants/               # 전역적으로 사용되는 상수 (API URL, 공통 메시지 등)
│   │   └── index.ts
│   ├── contexts/                # React Context API 사용 시 (Zustand로 대부분 대체 가능)
│   │   └── AuthContext.tsx
│   ├── hooks/                   # 커스텀 React Hooks
│   │   └── useAuth.ts
│   ├── lib/                     # 라이브러리 헬퍼, 유틸리티 함수 (React Query 클라이언트 설정 등)
│   │   ├── queryClient.ts
│   │   └── utils.ts
│   ├── services/                # API 요청 로직 (React Query와 함께 사용)
│   │   ├── userService.ts
│   │   └── productService.ts
│   ├── store/                   # Zustand 스토어 정의
│   │   └── useAuthStore.ts
│   ├── styles/                  # 전역 스타일 또는 테마 관련 스타일 (global.css 외 추가)
│   │   └── theme.ts
│   ├── types/                   # 전역 TypeScript 타입 및 인터페이스
│   │   ├── index.ts             # 모든 타입을 export 하는 메인 파일
│   │   └── user.ts
│   └── middleware.ts            # Next.js 미들웨어
├── .eslintrc.json               # ESLint 설정 파일
├── .prettierrc.json             # Prettier 설정 파일
├── next.config.mjs              # Next.js 설정 파일
├── tailwind.config.ts           # Tailwind CSS 설정 파일
├── tsconfig.json                # TypeScript 설정 파일
└── package.json

```
---

## 🧾 네이밍 규칙

| 항목 | 방식 | 예시 |
|------|------|------|
| 폴더명 | camelCase  | userService |
| 컴포넌트 | PascalCase | UserProfile.tsx |
| css클래스 | kebab-case + .styles.js | wiki-section.styles.js |
| 이미지 | kebab-case | logo-icon.png |
| 변수/함수 | camelCase | getUserInfo |
| 환경변수 | UPPER_SNAKE_CASE | NEXT_PUBLIC_API_URL |
---


## 🌿 Git Branch 전략

| 브랜치명 | 목적 |
|----------|------|
| `main` | 배포 전용 브랜치 |
| `develop` | 통합 개발 브랜치 |
| `feature/*` | 기능 개발 단위 브랜치 |
| `fix/*` | 버그 수정 브랜치 |
| `docs/*` | 문서 관련 브랜치 |

---

## 💬 커밋 메시지 컨벤션

| 태그 | 의미 |
|------|------|
| Feat | ✨ 기능 추가 |
| Fix | 🐛 버그 수정 |
| Style | 💄 스타일 변경 |
| Docs | 📝 문서 변경 |
| Refactor | 🔨 리팩토링 |
| Test | ✅ 테스트 코드 |
| Chore | 🔧 기타 설정 변경 |

### 예시

```bash
✨ Feat: 위키 카드 컴포넌트 생성
- 사용자 이미지 및 소개 텍스트 구현
- 반응형 레이아웃 처리 완료
```

---

