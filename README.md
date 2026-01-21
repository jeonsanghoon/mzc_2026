# MZC 2026 — 데이터 통합 플랫폼 기반 지능형 IoT 관리 솔루션

데이터 통합·IoT 관리 솔루션을 **제안·설계**하기 위한 프레젠테이션, 대시보드, 설계 문서 웹 앱입니다.

---

## 프로젝트 진행 관련 요약

### 1. 프로젝트 목표

| 구분 | 내용 |
|------|------|
| **서비스 목적** | 분산 IoT 데이터 통합, TCP·MQTT·REST 등 다채널 수집, **실시간 모니터링·원격 제어·분석**으로 무중단 서비스를 지원하는 **지능형 IoT 관리 플랫폼** |
| **운영 목표** | 데이터 수집 → 모니터링 → 알림 → 제어/OTA → 기사 출동 → 제품 개선 **무중단 서비스 지원** |
| **핵심 가치** | 데이터 활용도 30%→90%+, 복구 4h→15분, 알람 정확도 30%→98%, 현장 출동 120→18건/월(자동 85%), 운영비 40% 절감 |

상세: [00.doc/00_PROJECT_GOALS.md](./10.planning/00.doc/00_PROJECT_GOALS.md)

---

### 2. 명확한 데이터 목표 (8개)

| # | 목표 |
|---|------|
| 1 | 다채널 데이터 원활한 수집 (TCP·MQTT·REST) |
| 2 | 제품별 YAML 관리를 통한 데이터 통합 |
| 3 | 알람 룰셋 등록에 따른 알람 자동화 |
| 4 | 알람 장비 원격제어·FoTA를 통한 정비 |
| 5 | AS 기사 알림 처리 |
| 6 | 연구소 분석 데이터 생성 |
| 7 | 서비스 분석데이터 및 관련 서비스 데이터 관리 |
| 8 | 향후 AI·LLM 기반 자동화 **(※ 별도 프로젝트)** |

상세: [00.doc/00_DATA_GOALS.md](./10.planning/00.doc/00_DATA_GOALS.md)

---

### 3. 프론트엔드 설계·진행 시 요건

- **관점별 화면 구성·권한 처리** 필요 (필터가 아닌 **역할별 화면·접근 제어**)
- **서비스**: 경영/비즈니스/의사결정 — 서비스 가치, ROI, KPI  
- **연구소**: 개발/아키텍트 — 기술 스택, 아키텍처, 인프라  
- **고객**: 고객사/운영 — 기능, 사용법, 대시보드, 리포트  

상세: [00.doc/00_FRONTEND_REQUIREMENTS.md](./10.planning/00.doc/00_FRONTEND_REQUIREMENTS.md)

---

### 4. 프로젝트 구조

```
mzc_2026/
├── 10.planning/                 # 메인 앱 (Vite) — 배포·실행 대상
│   ├── 00.doc/                  # 설계 문서
│   │   ├── 00_PROJECT_GOALS.md
│   │   ├── 00_DATA_GOALS.md
│   │   ├── 00_FRONTEND_REQUIREMENTS.md
│   │   ├── DESIGN_GUIDE.md      # 설계 문서 가이드 (읽는 순서·관점별 분류)
│   │   ├── SERVICE_OVERVIEW.md
│   │   ├── PROCESS_FLOW.md
│   │   ├── PROJECT_ANALYSIS.md
│   │   ├── README.md            # 웹 애플리케이션 가이드 (서비스 관점)
│   │   └── VERCEL_DEPLOY.md
│   ├── public/00.doc/           # 00.doc 복사 (웹에서 /00.doc/... 제공)
│   ├── src/
│   │   ├── apps/
│   │   │   ├── presentation/    # 프레젠테이션 (슬라이드)
│   │   │   ├── dashboard/       # 대시보드 (7개 프레임)
│   │   │   └── docs/            # 설계 문서 뷰어 (Mermaid·섹션 네비)
│   │   └── components/
│   ├── app/                     # Next (문서 뷰어, 로컬 3001용)
│   ├── vercel.json              # build: npm run build, output: build
│   ├── vite.config.ts
│   └── package.json
└── README.md                    # 이 문서
```

- **3000 (Vite)**: 프레젠테이션·대시보드·설계 문서 → **배포·메인 사용**
- **3001 (Next)**: 별도 문서 뷰어 (로컬 `dev:docs` 전용, 배포 미사용)

---

### 5. 실행·빌드·배포

| 작업 | 명령 | 비고 |
|------|------|------|
| **개발 (메인)** | `cd 10.planning && npm run dev` | Vite, **http://localhost:3000** |
| **개발 (문서만)** | `npm run dev:docs` | Next, http://localhost:3001 |
| **프로덕션 빌드** | `npm run build` | Vite → `build/` |
| **미리보기** | `npm run preview` | `build/` 기준 |
| **Vercel 배포** | 저장소 푸시 → Vercel 자동 배포 | Root: `10.planning`, **Framework: Vite 또는 Other** (Next 미사용) |

- 배포 시 **Framework Preset = Vite 또는 Other** 필수. Next로 두면 `routes-manifest.json` 오류.
- 상세: [00.doc/VERCEL_DEPLOY.md](./10.planning/00.doc/VERCEL_DEPLOY.md)

---

### 6. 문서 읽는 순서 (진행·설계 참고)

1. **DESIGN_GUIDE.md** — 설계 문서 가이드 (전체 흐름, 관점별 분류, 읽는 순서)
2. **SERVICE_OVERVIEW.md** — 서비스 개요 (비즈니스·고객 관점)
3. **PROCESS_FLOW.md** — 프로세스·데이터 흐름 (Mermaid 다이어그램)
4. **PROJECT_ANALYSIS.md** — 기술 분석 (스택, 아키텍처)
5. **00.doc/README.md** — 웹 애플리케이션 가이드 (서비스 관점, 접속·화면 구성)

---

### 7. 웹 화면 (3가지)

| 화면 | URL 예 | 내용 |
|------|--------|------|
| **프레젠테이션** | `/#presentation` | 제안 슬라이드 (문제→솔루션→아키텍처→로드맵→ROI) |
| **대시보드** | `/#solution` | 7개 프레임 (문제정의·표준화·통합·모니터링·제어·분석·확장) |
| **설계 문서** | `/#docs` | 00.doc 문서 목록, Mermaid 다이어그램, 섹션 네비·화살표 이동 |

---

### 8. 기술 스택·인프라 (참고)

- **Frontend**: React 18, TypeScript, Vite 6, Tailwind, Radix UI, Recharts, Mermaid, react-markdown
- **인프라(계획)**: AWS, Terraform, Lambda(Node 20.x ESM)

---

### 9. 참고 링크

- [설계 문서 가이드](./10.planning/00.doc/DESIGN_GUIDE.md) — 문서 역할·읽는 순서
- [프로세스 플로우](./10.planning/00.doc/PROCESS_FLOW.md) — Mermaid 다이어그램
- [기술 분석](./10.planning/00.doc/PROJECT_ANALYSIS.md)
- [Vercel 배포 가이드](./10.planning/00.doc/VERCEL_DEPLOY.md)
- [Figma: 서비스 구성 제안](https://www.figma.com/design/Vw6CObicvb987G2VWpPpHF/%EC%84%9C%EB%B9%84%EC%8A%A4-%EA%B5%AC%EC%84%B1-%EC%A0%9C%EC%95%88)

---

**버전** 0.1.0 | **라이선스** 프라이빗
