# 프로젝트 전체 분석 문서

## 📋 프로젝트 개요

**프로젝트명**: 서비스 구성 제안  
**버전**: 0.1.0  
**목적**: 데이터 통합 플랫폼 기반 지능형 IoT 관리 솔루션 서비스 제안 프레젠테이션 및 대시보드

**원본 디자인**: [Figma 디자인](https://www.figma.com/design/Vw6CObicvb987G2VWpPpHF/%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B5%AC%EC%84%B1-%EC%A0%9C%EC%95%88)

---

## 🏗️ 프로젝트 구조

### 기술 스택
- **프레임워크**: React 18.3.1 + TypeScript
- **빌드 도구**: Vite 6.3.5
- **UI 라이브러리**: 
  - Radix UI (접근성 기반 컴포넌트)
  - shadcn/ui 스타일 컴포넌트
  - Tailwind CSS
- **애니메이션**: Motion (Framer Motion fork)
- **차트**: Recharts 2.15.2
- **아이콘**: Lucide React

### 주요 의존성
```json
{
  "@radix-ui/*": "UI 컴포넌트 (20개 이상)",
  "motion": "애니메이션 라이브러리",
  "recharts": "차트 및 데이터 시각화",
  "react-hook-form": "폼 관리",
  "next-themes": "다크모드 지원",
  "sonner": "토스트 알림",
  "vaul": "드로어 컴포넌트"
}
```

---

## 🎯 애플리케이션 아키텍처

### 이중 모드 구조
프로젝트는 **두 가지 주요 모드**로 구성됩니다:

1. **Presentation Mode** (기본 모드)
   - 서비스 제안 프레젠테이션 슬라이드
   - 총 7개 슬라이드: 제목 + 6개 콘텐츠 슬라이드

2. **Dashboard Mode**
   - 상세 대시보드 및 분석 화면
   - 7개 프레임으로 구성된 상세 분석

### 모드 전환
- URL 파라미터로 모드 제어: `?mode=presentation`
- 우측 상단 버튼으로 모드 전환 가능

---

## 📊 Presentation Mode 상세

### 슬라이드 구성
1. **제목 슬라이드**
   - "데이터 통합 플랫폼 - 지능형 IoT 관리 솔루션"
   - 그라데이션 배경 (blue-600 to purple-600)

2. **현재 문제점 (ProblemSlide)**
   - 데이터 분산 문제 (시스템 간 데이터 통합 불가)
   - 느린 장애 대응
   - 높은 운영 비용
   - 제한적 확장성
   - 현재 상황 지표 대시보드

3. **솔루션 개요 (SolutionSlide)**
   - 통합 데이터 플랫폼
   - AI 기반 지능형 분석
   - 실시간 자동화
   - 안전한 원격 제어
   - 솔루션 플로우 (4단계)
   - 예상 개선 효과 KPI

4. **시스템 아키텍처 (ArchitectureSlide)**
   - 4계층 아키텍처:
     - 데이터 수집 계층
     - 데이터 플랫폼 계층
     - 분석 엔진 계층
     - 자동화 제어 계층
   - 데이터 플로우 성능 지표
   - AWS 기술 스택

5. **핵심 기능 및 이점 (BenefitsSlide)**
   - 기능별 상세 설명 및 이점

6. **구현 로드맵 (RoadmapSlide)**
   - 단계별 구현 계획

7. **ROI & 비즈니스 임팩트 (ROISlide)**
   - 투자 대비 효과 분석

### 프레젠테이션 기능
- 키보드/마우스 네비게이션
- 슬라이드 인디케이터
- 진행률 표시
- 애니메이션 전환 효과
- 반응형 디자인 (모바일/태블릿/데스크톱)

---

## 📈 Dashboard Mode 상세

### 프레임 구성 (7개)
1. **Frame 1: 데이터 문제 정의 (ProblemFrame)**
   - 5개 카테고리별 문제 분석:
     - 데이터 문제 (RDBMS/NoSQL/File/IoT 분산)
     - 운영 문제 (알람 오탐/미탐, 대응 지연)
     - 제품 문제 (성능 데이터 부족)
     - 서비스 문제 (원격 제어 미흡)
     - 보안/비용 문제 (권한 관리, 비용 과다)
   - 룰 엔진 예시 (5가지 타입):
     - Threshold 룰
     - Anomaly 룰
     - Correlation 룰
     - Predictive 룰
     - Batch Check 룰
   - 구체적 해결 방안 로드맵 (5단계)
   - 전체 영향 및 예상 효과

2. **Frame 2: 데이터 표준화 (SchemaFrame)**
   - 7개 도메인 통합 스키마:
     - telemetry (시계열)
     - event (알람/경고)
     - device (상태/설정/펌웨어)
     - site (사이트 정보)
     - customer (고객 정보)
     - control (제어 명령)
     - ota (업데이트)
   - 핵심 필드 구조:
     - ID 필드, 값 필드, 시간 필드, 품질 필드
   - 도메인별 확장 필드
   - 데이터 품질 규칙

3. **Frame 3: 데이터 통합 플랫폼 (DataIntegrationFrame)**
   - **통합 과제 탭**:
     - 3가지 핵심 문제 및 해결 방안
   - **품질 관리 탭**:
     - 데이터 품질 프레임워크 (스키마 검증, 무결성, 비즈니스 룰)
     - 실시간 품질 지표
   - **아키텍처 탭**:
     - 원데이터 수집 경로 (IoT/센서/측정 데이터 → S3 Raw)
     - 기초 정보 수집 (업체/고객/사용자/사이트/장비 정보 → RDS)
     - S3 3계층 구조 (Raw, Standardized, Curated)
     - 소비 레이어 (Hot/Warm/Cold)
     - 수집 방식 옵션 비교
   - **보안 연결 탭**:
     - Site-to-Site VPN + AWS PrivateLink
     - 보안 베스트 프랙티스
   - **생명주기 탭**:
     - 원데이터 생명주기 (Raw → Hot → Cold)
     - 기초 정보 관리 (RDS 상시 유지)
     - Hot/Warm/Cold 데이터 저장 전략
     - 자동화된 데이터 생명주기 관리
     - 비용 최적화 효과

4. **Frame 4: 실시간 데이터 모니터링 (MonitoringFrame)**
   - 실시간 모니터링 대시보드
   - 알람 관리 시스템

5. **Frame 5: 데이터 기반 자동 제어 (RemoteControlFrame)**
   - Shadow 기반 원격 제어
   - OTA 관리 시스템

6. **Frame 6: 지능형 데이터 분석 (AnalysisFrame)**
   - AI 기반 분석 엔진
   - 예측 분석 시스템

7. **Frame 7: 데이터 활용 확장 (FutureFrame)**
   - 향후 확장 계획
   - 고객별 맞춤 서비스

### 대시보드 주요 기능
- 프레임별 탭 네비게이션
- 상세 데이터 시각화
- KPI 지표 카드
- 반응형 레이아웃

---

## 🎨 UI/UX 특징

### 디자인 시스템
- **컬러 스킴**: 
  - 프레젠테이션: 다크 그라데이션 배경 (slate-900 to slate-800)
  - 대시보드: 밝은 배경 (slate-50 to slate-100)
- **컴포넌트**: shadcn/ui 기반 일관된 디자인
- **아이콘**: Lucide React 아이콘 세트
- **타이포그래피**: 반응형 텍스트 크기 (sm/md/lg/xl)

### 반응형 디자인
- 모바일 우선 설계
- 브레이크포인트:
  - sm: 640px
  - md: 768px
  - lg: 1024px
  - xl: 1280px
- 터치 최적화 (min-height: 44px/48px)

### 애니메이션
- Motion 라이브러리 활용
- 페이지 전환 애니메이션
- 컴포넌트 등장 애니메이션 (fade, slide, scale)
- 부드러운 전환 효과

---

## 📁 파일 구조 상세

```
서비스 구성 제안/
├── index.html                 # 진입점 HTML
├── package.json              # 프로젝트 의존성 및 스크립트
├── vite.config.ts            # Vite 설정 (포트 3000, React SWC)
├── README.md                 # 프로젝트 설명
│
├── src/
│   ├── main.tsx              # React 진입점
│   ├── App.tsx               # 메인 앱 (모드 전환 로직)
│   ├── index.css             # 전역 스타일
│   │
│   ├── apps/
│   │   ├── presentation/
│   │   │   ├── PresentationApp.tsx    # 프레젠테이션 메인
│   │   │   └── slides/                # 6개 슬라이드 컴포넌트
│   │   │       ├── ProblemSlide.tsx
│   │   │       ├── SolutionSlide.tsx
│   │   │       ├── ArchitectureSlide.tsx
│   │   │       ├── BenefitsSlide.tsx
│   │   │       ├── RoadmapSlide.tsx
│   │   │       └── ROISlide.tsx
│   │   │
│   │   └── dashboard/
│   │       └── DashboardApp.tsx       # 대시보드 메인
│   │
│   ├── components/
│   │   ├── ui/                        # shadcn/ui 컴포넌트 (30+ 개)
│   │   ├── dashboard/                 # 대시보드 전용 컴포넌트
│   │   │   ├── AnalyticsDashboard.tsx
│   │   │   ├── CustomerSLA.tsx
│   │   │   ├── DeviceManagement.tsx
│   │   │   ├── OTAManagement.tsx
│   │   │   └── RealTimeMonitoring.tsx
│   │   │
│   │   ├── ProblemFrame.tsx           # 프레임 1
│   │   ├── SchemaFrame.tsx            # 프레임 2
│   │   ├── DataIntegrationFrame.tsx   # 프레임 3 (가장 복잡)
│   │   ├── MonitoringFrame.tsx        # 프레임 4
│   │   ├── RemoteControlFrame.tsx     # 프레임 5
│   │   ├── AnalysisFrame.tsx          # 프레임 6
│   │   └── FutureFrame.tsx            # 프레임 7
│   │
│   ├── styles/
│   │   └── globals.css                # 전역 CSS
│   │
│   ├── guidelines/
│   │   └── Guidelines.md              # 디자인 가이드라인 (템플릿)
│   │
│   └── Attributions.md                # 오픈소스 라이선스 정보
│
└── build/                              # 빌드 산출물 (빌드 후 생성)
```

---

## 🔧 빌드 및 실행

### 개발 모드
```bash
npm install        # 의존성 설치
npm run dev        # 개발 서버 실행 (포트 3000)
```

### 프로덕션 빌드
```bash
npm run build      # 빌드 실행 (build/ 디렉토리에 생성)
npm run preview    # 빌드 결과 미리보기 (포트 4173)
```

### 빌드 설정
- **출력 디렉토리**: `build/`
- **타겟**: `esnext`
- **React 플러그인**: `@vitejs/plugin-react-swc` (빠른 빌드)

---

## 💡 핵심 기능 요약

### 1. 데이터 통합 플랫폼
- 7개 도메인 통합 스키마
- S3 3계층 구조 (Raw → Standardized → Curated)
- Hot/Warm/Cold 데이터 저장 전략
- Data Contract 기반 품질 관리

### 2. 지능형 모니터링
- 4가지 룰 엔진 타입 (Threshold, Anomaly, Correlation, Predictive)
- 배치 통신 오류 체크
- 실시간 알람 시스템
- AI 기반 False Positive 감소

### 3. 자동화 시스템
- Shadow 기반 원격 제어
- OTA 무선 펌웨어 업데이트
- 자동 진단 및 대응
- 폐쇄 루프 자동 해결

### 4. AI/ML 분석
- 예측 분석 시스템
- 근본 원인 분석 (RCA)
- 패턴 기반 이상 탐지
- Amazon Bedrock/SageMaker 활용

### 5. 보안 및 거버넌스
- AWS PrivateLink + VPN
- KMS 암호화
- Lake Formation 권한 관리
- CloudTrail 감사 로그

---

## 📊 예상 성과 지표 (KPI)

### 개선 효과
- **알람 정확도**: 98% (+68%p)
- **자동 해결률**: 85% (+65%p)
- **운영비 절감**: 40%
- **복구 시간**: 15분 (-75%)
- **무선 업데이트 성공률**: 98%
- **고객 만족도**: +25%

### 비용 최적화
- **스토리지 비용**: 80% 절감 (S3 Standard/IA 티어링 + Iceberg 최적화)
- **처리 비용**: 60% 절감
- **히스토리 분석**: 무제한 (서버리스 Athena + Iceberg 테이블 쿼리)
- **Iceberg 파티션 프루닝**: 쿼리 비용 추가 절감

---

## 🚀 로드맵 (6단계)

1. **1-2개월**: 데이터 통합 및 표준화
2. **2-3개월**: 지능형 모니터링 시스템 구축
3. **3-4개월**: Shadow 기반 원격 제어 및 OTA
4. **4-5개월**: 자동 진단 및 대응 시스템
5. **5-6개월**: 고객별 맞춤 서비스 및 예측 분석
6. **6개월+**: 지속적 개선 및 확장

---

## 🛠️ 기술 아키텍처 (AWS 기반)

### 데이터 인프라
- Amazon Kinesis (원데이터 실시간 스트리밍)
- AWS Lambda (서버리스 처리)
- Amazon S3 (데이터 레이크, 원데이터 저장)
- Apache Iceberg (Cold 원데이터 테이블 형식, ACID 트랜잭션, 스키마 진화)
- Amazon RDS PostgreSQL (기초 정보 데이터 + 분석 집계 결과)
- DynamoDB/OpenSearch (Hot 원데이터)

### AI/ML 플랫폼
- Amazon SageMaker (ML 모델)
- Amazon Bedrock (LLM 기반 분석)
- Amazon Forecast (예측)
- Amazon QuickSight (BI)

### IoT 관리
- AWS IoT Core
- Device Shadow
- IoT Device Management
- OTA Service

### 모니터링 및 보안
- CloudWatch (모니터링)
- X-Ray (분산 추적)
- SNS (알림)
- EventBridge (이벤트 기반 아키텍처)
- CloudTrail (감사)
- GuardDuty (위협 탐지)

---

## 📝 주요 특징

### 코드 품질
- TypeScript로 타입 안정성 확보
- 컴포넌트 기반 모듈화
- 반응형 디자인 일관성
- 접근성 고려 (Radix UI)

### 사용자 경험
- 부드러운 애니메이션 전환
- 직관적인 네비게이션
- 명확한 정보 구조
- 모바일 최적화

### 확장성
- 컴포넌트 재사용 가능
- 슬라이드/프레임 추가 용이
- 테마 커스터마이징 가능
- 다국어 지원 가능 (현재 한국어만)

---

## 🔍 개선 제안사항

### 기능적 개선
1. **다국어 지원**: i18n 라이브러리 추가
2. **데이터 연동**: 실제 API 연동 (현재는 정적 데이터)
3. **인터랙티브 차트**: 실시간 데이터 업데이트
4. **인쇄 모드**: PDF 다운로드 기능
5. **프레젠테이션 모드**: 전체화면 프레젠테이션 모드

### 기술적 개선
1. **성능 최적화**: 
   - 코드 스플리팅 (현재 500KB+ 번들)
   - 이미지 최적화
   - 지연 로딩
2. **테스팅**: Jest + React Testing Library
3. **문서화**: Storybook 추가
4. **CI/CD**: GitHub Actions 설정

### UX 개선
1. **키보드 단축키**: 슬라이드 네비게이션 단축키
2. **접근성**: ARIA 레이블 강화
3. **오프라인 지원**: Service Worker
4. **프로그레스 저장**: 로컬 스토리지에 슬라이드 위치 저장

---

## 📚 참고 자료

- **디자인**: Figma 원본
- **UI 컴포넌트**: [shadcn/ui](https://ui.shadcn.com/)
- **아이콘**: [Lucide Icons](https://lucide.dev/)
- **애니메이션**: [Motion](https://motion.dev/)

---

## 🎯 프로젝트 목적 및 활용

이 프로젝트는 **데이터 통합 플랫폼 기반 지능형 IoT 관리 솔루션**을 고객에게 제안하기 위한 시각화 도구입니다.

### 주요 사용 사례
1. **고객 제안 프레젠테이션**: Presentation Mode 활용
2. **상세 설계 검토**: Dashboard Mode 활용
3. **기술 검토 회의**: 아키텍처 및 구현 세부사항 검토
4. **ROI 분석**: 비즈니스 임팩트 및 투자 대비 효과 분석

---

## 📅 프로젝트 현황

- **버전**: 0.1.0
- **상태**: 기본 기능 완성
- **빌드**: 성공 (500KB+ 번들 경고 있음)
- **개발 환경**: Vite + React + TypeScript
- **배포**: 정적 파일 배포 가능 (build/ 디렉토리)

---

*최종 업데이트: 2026년 3월*