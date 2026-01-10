# MZC 2025 - 데이터 통합 플랫폼 기반 지능형 IoT 관리 솔루션

데이터 통합 플랫폼 기반 지능형 IoT 관리 솔루션을 제안하기 위한 프레젠테이션 및 대시보드 애플리케이션입니다.

## 📋 프로젝트 개요

이 프로젝트는 기업 고객에게 데이터 통합 플랫폼과 지능형 IoT 관리 솔루션을 시각적으로 제안하기 위한 도구입니다.

### 주요 특징
- **이중 모드 지원**: 프레젠테이션 모드와 상세 대시보드 모드
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 지원
- **실시간 데이터 시각화**: 차트 및 KPI 지표 제공
- **인터랙티브 UI**: 부드러운 애니메이션과 직관적인 네비게이션

## 🚀 빠른 시작

### 필수 요구사항
- Node.js 18.x 이상
- npm 또는 yarn

### 설치 및 실행

```bash
# 프로젝트 디렉토리로 이동
cd 10.planning

# 의존성 설치
npm install

# 개발 서버 실행 (포트 3000)
npm run dev
```

브라우저에서 `http://localhost:3000`으로 접속하세요.

### 빌드

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드 결과물은 `build/` 디렉토리에 생성됩니다.

## 🎯 주요 기능

### Presentation Mode (기본 모드)
고객 제안용 프레젠테이션 슬라이드
- 문제점 분석 (Problem)
- 솔루션 개요 (Solution)
- 시스템 아키텍처 (Architecture)
- 핵심 기능 및 이점 (Benefits)
- 구현 로드맵 (Roadmap)
- ROI 분석 (ROI)

### Dashboard Mode
상세 분석 및 대시보드 화면
- 데이터 문제 정의 및 해결 방안
- 데이터 표준화 스키마 (7개 도메인)
- 데이터 통합 플랫폼 아키텍처
- 실시간 모니터링 및 알람 관리
- 원격 제어 및 OTA 관리
- AI 기반 데이터 분석
- 향후 확장 계획

## 🛠️ 기술 스택

### Frontend
- **프레임워크**: React 18.3.1 + TypeScript
- **빌드 도구**: Vite 6.3.5
- **UI 라이브러리**: 
  - Radix UI (접근성 기반 컴포넌트)
  - shadcn/ui 스타일
  - Tailwind CSS
- **애니메이션**: Motion (Framer Motion fork)
- **차트**: Recharts 2.15.2
- **아이콘**: Lucide React

### Infrastructure (계획)
- AWS 기반 인프라 (Terraform)
- Lambda (Node.js 20.x, ESM 모듈)
- S3, Kinesis, IoT Core 등

## 📁 프로젝트 구조

```
mzc_2025/
├── 10.planning/              # 프레젠테이션 및 대시보드 애플리케이션
│   ├── 00.doc/              # 문서
│   │   ├── README.md        # 상세 문서
│   │   └── PROJECT_ANALYSIS.md
│   ├── src/
│   │   ├── apps/            # 앱 모듈
│   │   │   ├── dashboard/   # 대시보드 앱
│   │   │   └── presentation/ # 프레젠테이션 앱
│   │   ├── components/      # 컴포넌트
│   │   │   ├── ui/          # shadcn/ui 컴포넌트
│   │   │   ├── dashboard/   # 대시보드 전용
│   │   │   └── [Frame components]
│   │   └── ...
│   ├── package.json
│   └── vite.config.ts
└── README.md                 # 프로젝트 메인 문서
```

## 🎨 모드 전환

### URL 파라미터 방식
- 기본 (프레젠테이션): `http://localhost:3000`
- 프레젠테이션: `http://localhost:3000?mode=presentation`
- 대시보드: 화면 우측 상단 버튼으로 전환

### 버튼으로 전환
각 모드의 우측 상단에 모드 전환 버튼이 있습니다.

## 📊 주요 기능 상세

### 1. 데이터 통합 플랫폼
- 7개 도메인 통합 스키마 (telemetry, event, device, site, customer, control, ota)
- S3 3계층 구조 (Raw → Standardized → Curated)
- Hot/Warm/Cold 데이터 저장 전략
- Data Contract 기반 품질 관리

### 2. 지능형 모니터링
- 4가지 룰 엔진 (Threshold, Anomaly, Correlation, Predictive)
- 실시간 알람 시스템
- AI 기반 False Positive 감소

### 3. 자동화 시스템
- Shadow 기반 원격 제어
- OTA 무선 펌웨어 업데이트
- 자동 진단 및 대응

### 4. AI/ML 분석
- 예측 분석 시스템
- 근본 원인 분석 (RCA)
- Amazon Bedrock/SageMaker 활용

## 📈 예상 성과 지표

- 알람 정확도: 98% (+68%p)
- 자동 해결률: 85% (+65%p)
- 운영비 절감: 40%
- 복구 시간: 15분 (-75%)
- 스토리지 비용: 80% 절감

## 🔗 참고 자료

- [프로젝트 상세 분석](./10.planning/00.doc/PROJECT_ANALYSIS.md)
- [Figma 디자인 원본](https://www.figma.com/design/Vw6CObicvb987G2VWpPpHF/%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B5%AC%EC%84%B1-%EC%A0%9C%EC%95%88)
- [shadcn/ui 문서](https://ui.shadcn.com/)

## 📝 라이선스

이 프로젝트는 프라이빗 프로젝트입니다.

## 🤝 기여

프로젝트 관련 문의사항은 이슈로 등록해주세요.

---

**버전**: 0.1.0  
**최종 업데이트**: 2025년 1월
