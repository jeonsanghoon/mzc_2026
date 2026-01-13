# 서비스 구성 제안 - 상세 문서

데이터 통합 플랫폼 기반 지능형 IoT 관리 솔루션 프레젠테이션 및 대시보드 애플리케이션입니다.

## 원본 디자인

이 프로젝트는 다음 Figma 디자인을 기반으로 개발되었습니다:
[서비스 구성 제안 Figma 디자인](https://www.figma.com/design/Vw6CObicvb987G2VWpPpHF/%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B5%AC%EC%84%B1-%EC%A0%9C%EC%95%88)

## 시작하기

### 설치

```bash
npm install
```

### 개발 서버 실행

**Next.js 모드 (기본)**:
```bash
npm run dev
```

**Vite 모드 (기존)**:
```bash
npm run dev:vite
```

개발 서버는 기본적으로 `http://localhost:3000`에서 실행됩니다.

### Next.js 페이지 구조

- **홈 페이지** (`/`): 서론 및 프로젝트 소개
- **대시보드** (`/dashboard`): 상세 분석 및 기술 검토용
- **프레젠테이션** (`/presentation`): 고객 제안용 슬라이드
- **프로세스 플로우** (`/process-flow`): Mermaid 다이어그램 뷰어
- **설계 문서** (`/docs`): 설계 문서 뷰어

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

## 애플리케이션 모드

이 애플리케이션은 두 가지 모드를 지원합니다:

### 1. Presentation Mode (기본)
- 고객 제안용 프레젠테이션 슬라이드
- 7개 슬라이드로 구성 (제목 + 6개 콘텐츠 슬라이드)
- 키보드/마우스 네비게이션 지원
- 슬라이드 인디케이터 및 진행률 표시

**접속**: `http://localhost:3000` 또는 `http://localhost:3000?mode=presentation`

### 2. Dashboard Mode
- 상세 분석 및 대시보드 화면
- 7개 프레임으로 구성된 상세 분석
- 실시간 데이터 시각화
- KPI 지표 카드

**접속**: 화면 우측 상단 버튼으로 전환 또는 URL에서 `mode` 파라미터 제거

## 기술 스택

- **Next.js 14+** (프레임워크, App Router)
- **React 18.3.1** + **TypeScript**
- **Tailwind CSS** (스타일링)
- **Radix UI** (UI 컴포넌트 기반)
- **shadcn/ui** (컴포넌트 스타일)
- **Motion** (애니메이션)
- **Recharts** (차트 라이브러리)
- **Lucide React** (아이콘)
- **Mermaid** (다이어그램 렌더링)
- **react-markdown** (마크다운 렌더링)

> **참고**: 기존 Vite 프로젝트도 `npm run dev:vite` 명령으로 실행 가능합니다.

## 프로젝트 구조

```
10.planning/
├── app/                        # Next.js App Router
│   ├── layout.tsx             # 루트 레이아웃
│   ├── page.tsx               # 홈 페이지 (서론/소개)
│   ├── dashboard/
│   │   └── page.tsx           # 대시보드 페이지
│   ├── presentation/
│   │   └── page.tsx           # 프레젠테이션 페이지
│   ├── process-flow/
│   │   └── page.tsx           # 프로세스 플로우 페이지
│   └── docs/
│       └── page.tsx           # 설계 문서 페이지
│
├── src/
│   ├── apps/
│   │   ├── dashboard/          # 대시보드 앱
│   │   │   └── DashboardApp.tsx
│   │   └── presentation/       # 프레젠테이션 앱
│   │       ├── PresentationApp.tsx
│   │       └── slides/         # 6개 슬라이드 컴포넌트
│   │
│   ├── components/
│   │   ├── ui/                 # shadcn/ui 컴포넌트 (30+)
│   │   ├── dashboard/          # 대시보드 전용 컴포넌트
│   │   └── [Frame components]  # 7개 프레임 컴포넌트
│   │
│   ├── App.tsx                 # 메인 앱 (Vite용, 모드 전환 로직)
│   ├── main.tsx                # React 진입점 (Vite용)
│   └── styles/
│       └── globals.css         # 전역 스타일
│
├── 00.doc/                     # 설계 문서
│   ├── PROCESS_FLOW.md        # 프로세스 플로우 다이어그램
│   ├── PROJECT_ANALYSIS.md     # 프로젝트 분석 문서
│   └── README.md              # 프로젝트 개요
│
├── package.json
├── next.config.js             # Next.js 설정
├── tsconfig.json              # TypeScript 설정
├── tailwind.config.js         # Tailwind CSS 설정
├── postcss.config.js          # PostCSS 설정
├── vite.config.ts             # Vite 설정 (기존)
└── index.html                 # Vite용 HTML (기존)
```

## 주요 기능

### 프레젠테이션 슬라이드
1. **문제점 분석** - 현재 시스템의 문제점 정리
2. **솔루션 개요** - 제안 솔루션의 핵심 내용
3. **시스템 아키텍처** - 4계층 아키텍처 및 AWS 기술 스택
4. **핵심 기능 및 이점** - 기능별 상세 설명
5. **구현 로드맵** - 6단계 구현 계획
6. **ROI 분석** - 투자 대비 효과

### 대시보드 프레임
1. **데이터 문제 정의** - 5개 카테고리별 문제 분석 및 해결 방안
2. **데이터 표준화** - 7개 도메인 통합 스키마
3. **데이터 통합 플랫폼** - 아키텍처, 품질 관리, 보안 연결, 생명주기 관리
4. **실시간 모니터링** - 실시간 대시보드 및 알람 관리
5. **원격 제어** - Shadow 기반 제어 및 OTA 관리
6. **지능형 분석** - AI 기반 분석 엔진
7. **데이터 활용 확장** - 향후 확장 계획

## 추가 문서

- [프로젝트 전체 분석](./PROJECT_ANALYSIS.md) - 프로젝트의 상세한 분석 및 기술 문서
- [프로젝트 루트 README](../../README.md) - 프로젝트 전체 개요

## 개발 가이드

### 컴포넌트 추가
새로운 슬라이드나 프레임을 추가하려면:
1. `src/apps/presentation/slides/` 또는 `src/components/`에 컴포넌트 생성
2. 해당 앱의 메인 컴포넌트에 등록

### 스타일 커스터마이징
- 전역 스타일: `src/styles/globals.css`
- Tailwind 설정: `tailwind.config.js` (필요시)
- 컴포넌트별 스타일: 각 컴포넌트 내부에서 Tailwind 클래스 사용

### 모드 전환 로직
`src/App.tsx`에서 모드 전환 로직을 관리합니다:
- URL 파라미터 기반 모드 감지
- 상태 기반 모드 전환
- 히스토리 API를 이용한 URL 업데이트

## 문제 해결

### 포트 충돌
기본 포트 3000이 사용 중인 경우, `vite.config.ts`에서 포트를 변경할 수 있습니다.

### 빌드 오류
의존성 문제가 발생하면:
```bash
rm -rf node_modules package-lock.json
npm install
```

## 라이선스

프라이빗 프로젝트입니다.

---

**버전**: 0.1.0  
**최종 업데이트**: 2026년 3월