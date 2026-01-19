# Vercel 배포 가이드

본 프로젝트(10.planning)를 **Vercel**에 배포하는 방법입니다. **Vite 앱**(포트 3000: 프레젠테이션·대시보드·설계 문서)을 배포 대상으로 합니다.

> ⚠️ **3000 vs 3001**: 로컬에서 **3000번(Vite)**이 메인 앱, **3001번(Next.js)**은 별도 문서 뷰어입니다. Vercel에는 **3000번과 동일한 Vite 앱**이 배포됩니다.

---

## 1. 사전 요건

- [Vercel](https://vercel.com) 계정 (GitHub/GitLab/Bitbucket 연동 권장)
- 이 저장소가 GitHub 등에 푸시된 상태

---

## 2. 프로젝트 구조 참고

- **배포 대상**: Vite 앱 (`vite build` / `npm run build`) — **포트 3000과 동일**
- **위치**: 저장소 루트 기준 `10.planning/` 폴더
- **빌드 결과**: `build/` (Vite `outDir`)

### 2-1. 저장소에 포함된 설정 (자동 적용)

- **`vercel.json`**: `buildCommand: "npm run build"`, `outputDirectory: "build"` — Vite 빌드 사용
- **`.gitignore`**: `.next/` 제외 (Next는 로컬 `dev:docs`용, 배포에는 미사용)

---

## 3. Vercel에서 프로젝트 import

### 3-1. 새 프로젝트 추가

1. [Vercel 대시보드](https://vercel.com/dashboard) → **Add New** → **Project**
2. **Import Git Repository**에서 이 저장소 선택 후 **Import**

### 3-2. 빌드 설정 (필수)

| 설정 | 값 | 비고 |
|------|-----|------|
| **Root Directory** | `10.planning` | 프로젝트가 `10.planning` 안에 있음 |
| **Framework Preset** | **Vite** 또는 **Other** | ⚠️ **반드시 Next.js가 아니어야 함** (아래 참고) |
| **Build Command** | *(비움 또는 기본)* | `vercel.json`으로 `npm run build` 지정됨 |
| **Output Directory** | *(비움 또는 기본)* | `vercel.json`으로 `build` 지정됨 |
| **Install Command** | `npm install` | 기본값 |

- **Root Directory**를 `10.planning`으로 두지 않으면 `package.json`·`vite.config.ts`를 찾지 못해 빌드가 실패합니다.
- **`vercel.json`**에 `buildCommand`, `outputDirectory`가 있으면, Vercel UI에서 별도 Override 없이 Vite 정적 빌드가 실행·서빙됩니다.

#### ⚠️ Framework Preset을 **Vite** 또는 **Other**로 꼭 지정할 것

- 이 저장소에는 `next.config.js`·`app/`(Next)와 `vite.config.ts`(Vite)가 함께 있어, Vercel이 **Next.js로 자동 감지**할 수 있습니다.
- **Framework Preset이 Next.js**이면, 배포 단계에서 `build/` 안의 **`routes-manifest.json`**(Next 전용)을 찾다가  
  `The file ".../build/routes-manifest.json" couldn't be found` 오류가 납니다.
- **해결:** **Settings → General → Build & Development Settings → Framework Preset**을 **Vite** 또는 **Other**로 바꾼 뒤 **Redeploy**하세요.

### 3-3. 환경 변수

- 현재 Vite 앱은 별도 환경 변수 없이 동작합니다.
- 외부 API URL, 키 등이 생기면 **Settings → Environment Variables**에서 추가합니다.

---

## 4. 배포

- **Deploy** 클릭 후 빌드·배포가 진행됩니다.
- 완료되면 `https://<프로젝트명>.vercel.app` 형태의 URL이 부여됩니다.

---

## 5. 배포 후 확인

- **메인(프레젠테이션)**: `https://<프로젝트명>.vercel.app/#presentation`
- **대시보드**: `https://<프로젝트명>.vercel.app/#solution` 또는 `/#dashboard`
- **설계 문서**: `https://<프로젝트명>.vercel.app/#docs`
- **문서 직접 링크**: `/#docs/project-goals`, `/#docs/design-guide` 등 (해시 라우팅 기준)

`public/00.doc/`의 마크다운이 `/00.doc/...`로 제공되므로, 문서 뷰어가 정상 동작하는지 확인합니다.

---

## 6. 커스텀 도메인(선택)

- **Settings → Domains**에서 도메인 추가
- DNS에 Vercel이 안내하는 CNAME/ A 레코드 설정

---

## 7. 트러블슈팅

| 현상 | 점검 |
|------|------|
| 빌드 실패: `package.json` not found | Root Directory가 `10.planning`인지 확인 |
| 빌드 실패: `vite` not found | Root를 `10.planning`으로 둔 뒤 `npm install`이 그 안에서 실행되는지 확인 |
| **3001번(Next) 화면이 나옴** | `vercel.json`의 `buildCommand`가 `npm run build`(Vite)인지 확인. `build:docs`(Next)면 3001과 같은 앱이 배포됨 |
| **3000번과 다른 화면** | `outputDirectory`가 `build`인지 확인. Next 기본 `.next`가 쓰이면 잘못된 앱이 서빙됨 |
| **`build/routes-manifest.json` couldn't be found** | **Framework Preset이 Next.js**이기 때문. **Settings → General → Framework Preset**을 **Vite** 또는 **Other**로 변경한 뒤 **Redeploy** |
| 문서(/00.doc/...) 404 | `public/00.doc/`에 마크다운이 포함돼 `build/`로 복사되는지 확인 |

---

## 8. 요약

1. Vercel에서 저장소 **Import**
2. **Root Directory** = `10.planning`
3. **Framework Preset** = **Vite** 또는 **Other** (Next.js이면 `routes-manifest.json` 오류 발생)
4. **Build Command** = `vercel.json`에 의해 `npm run build` (Vite) 사용
5. **Output Directory** = `build`
6. **Deploy** 후 `/#presentation`, `/#docs`, `/#docs/...` 접속으로 **3000번과 동일한 화면** 확인
