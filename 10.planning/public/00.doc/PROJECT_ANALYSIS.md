# 기술 분석 문서

## 📋 문서 개요

이 문서는 **통합 데이터 플랫폼 기반 지능형 IoT 관리 솔루션**의 기술적 상세 분석 문서입니다.

> **참고**: 서비스 개요 및 비즈니스 관점의 내용은 [SERVICE_OVERVIEW.md](./SERVICE_OVERVIEW.md)를 참고하세요.

---

## 🏗️ 통합 데이터 플랫폼 (핵심 - 기술적 상세)

### 플랫폼 아키텍처

**통합 데이터 플랫폼**은 이 서비스의 핵심이며, 모든 기능의 기술적 기반이 됩니다.

#### 플랫폼의 핵심 통합 프로세스

통합 데이터 플랫폼은 **두 가지 핵심 통합 프로세스**로 구성됩니다:

##### 1. 센서 데이터 통합 (플랫폼 내 실시간 스트리밍 통합)

**기술적 구현**:
- **다중 프로토콜 지원**: TCP (ECS), MQTT (IoT Core), REST API (ECS, 특별한 경우만 API Gateway)
- **VPN 터널링**: Site-to-Site VPN을 통한 기존 온프레미스 시스템과 AWS 간 안전한 연동
- **실시간 스트리밍**: Kinesis Data Streams를 통한 실시간 데이터 통합 수집
- **YAML 기반 변환**: Lambda Function (Node.js 20.x, ESM 모듈)을 통한 다양한 데이터 형식 변환
  - **지원 형식**: Hex Binary, JSON, CSV
  - **파싱 방식**:
    - 길이 기반 파싱 (Length-based)
    - Key-Value 파싱 (2바이트 헥스 키)
    - 하이브리드 파싱 (세퍼레이터 + 길이)
- **데이터 분류**: Lambda Function을 통한 제품별/디바이스별 분류 및 라우팅
- **스키마 검증**: Data Contract를 통한 데이터 품질 보장
- **DLQ 처리**: SQS Dead Letter Queue를 통한 변환 실패 데이터 보존 및 재처리
- **배치 처리**: 파일 데이터는 별도 배치 Job (Glue/ECS/Lambda)으로 처리

**표준 텔레메트리 데이터 구조**:
- **중요**: 센서 데이터에는 고객 정보(`customerId`, `siteId`)가 포함되지 않습니다.
- **필수 필드**: `device_id`, `device_timestamp`, `productId`, `metrics`
- **허브-차일드 구조**: `hub_id`, `hub_timestamp`, `childDeviceId` (허브-차일드 구조인 경우)
- **타임스탬프 관리**: 
  - `device_timestamp`: 디바이스에서 생성된 타임스탬프 (디바이스 측 시간)
  - `hub_timestamp`: 허브에서 수신/전달한 타임스탬프 (허브 측 시간)
  - `ingest_timestamp`: 플랫폼 수신 타임스탬프 (Kinesis 수신 시점, 자동 생성)
- **토픽에서 추출**: MQTT 토픽에서 `hub_id`, `device_id` 추출
- **원본 참조**: `rawRef` (프로토콜, 토픽, 원본 형식 등)
- **고객 정보 조인**: 집계 단계에서 `device_id` → `siteId` → `customerId` 조인 수행

**허브-차일드 디바이스 구조**:
- **허브 디바이스 (Hub Device)**: 여러 차일드 디바이스를 관리하는 게이트웨이
- **차일드 디바이스 (Child Device)**: 허브를 통해 연결되는 실제 센서/액추에이터
- **단독 디바이스 (Standalone Device)**: 허브 없이 직접 연결되는 디바이스
- **MQTT 토픽 구조**:
  - 허브: `devices/{hub_id}/telemetry`
  - 차일드: `devices/{hub_id}/child/{device_id}/telemetry`
  - 단독: `devices/{device_id}/telemetry`
- **토픽 파싱**: Lambda 컨버트 모듈이 MQTT 토픽을 파싱하여 `hub_id`, `device_id`, `childDeviceId` 추출
- **타임스탬프 관리**: 
  - 토픽에서 추출한 `hub_id`, `device_id`와 함께 각각의 타임스탬프(`hub_timestamp`, `device_timestamp`) 관리
  - 디바이스 페이로드에서 `device_timestamp` 추출
  - 허브에서 수신한 시점을 `hub_timestamp`로 기록

##### 2. 기초 데이터 통합 (플랫폼 내 분산 데이터베이스 통합)

**기술적 구현**:
- **분산된 RDBMS 통합**: MariaDB, MySQL, MSSQL, Oracle 등 다양한 데이터베이스 통합
- **NoSQL 통합**: MongoDB, DynamoDB 등 NoSQL 데이터베이스 통합
- **DMS (Database Migration Service)**: 분산된 RDBMS를 통합 Aurora PostgreSQL로 마이그레이션
  - **Full Load**: 초기 데이터 전체 마이그레이션
  - **CDC (Change Data Capture)**: 실시간 변경사항 동기화
    - DMS CDC: RDBMS 트랜잭션 로그 기반 실시간 캡처 → Kinesis Data Streams
- **NoSQL CDC**: 
  - MongoDB Change Streams → Kinesis Producer SDK → Kinesis Data Streams
  - DynamoDB Streams → Lambda Trigger → Kinesis Data Streams
- **통합 Aurora PostgreSQL**: 모든 기초 정보를 통합 저장
  - **CQRS 패턴**: Read/Write Endpoint 분리
    - **Write Endpoint**: Primary Aurora (데이터 변경 작업 - Command)
    - **Read Endpoint**: Read Replica (데이터 조회 작업 - Query)
    - **효과**: 조회 성능 향상, Write 부하 분산, 확장성 향상
- **데이터 품질 관리**: 중복 제거, 정규화, 일관성 검증

##### 3. 통합 분석 데이터 생성 (플랫폼 핵심 출력)

**기술적 구현**:
- **데이터 조인**: 통합 Aurora Read Endpoint의 기초 정보와 센서 데이터를 조인 (CQRS 패턴)
- **데이터 보강**: Lambda Function을 통한 비즈니스 룰 적용 및 컨텍스트 정보 추가
- **계산식 기반 분석 데이터 생성**: 
  - **계산식 등록 및 관리**: 제품별/고객별/디바이스별 계산식 등록 시스템
  - **실시간 계산식 적용**: Lambda Function을 통한 실시간 계산
  - **계산 결과 저장**: 분석 데이터로 저장 및 활용
- **계층별 저장**: Hot/Warm/Cold 레이어로 분리 저장

### 데이터 저장 계층 (Data Lake Architecture)

통합 분석 데이터는 **3계층 데이터 레이어**로 분리 저장됩니다:

#### Hot Layer (실시간 접근)
- **저장소**: DocumentDB (CQRS 패턴 적용)
  - **Write Endpoint**: Primary DocumentDB (데이터 변경 작업)
  - **Read Endpoint**: Read Replica (데이터 조회 작업)
- **용도**: 실시간 대시보드, 즉시 조회가 필요한 통합 데이터, **제품별 시간별/일별 집계**
- **특징**: 빠른 읽기/쓰기 성능, 실시간 쿼리 지원, MongoDB 호환 NoSQL, Read/Write 분리로 성능 최적화
- **데이터**: 
  - 센서 데이터 + 기초 정보가 조인된 실시간 데이터
  - **제품별 시간별 집계** (1시간, 6시간 단위)
  - **제품별 일별 집계** (일 단위)
- **집계 특징**: 센서 데이터에는 고객 정보가 없으므로, 제품별 집계만 수행 (고객 정보 조인 불필요)
- **CQRS 패턴**: Command(Write)와 Query(Read) 분리로 효율적 운영

#### Warm Layer (빠른 조회)
- **저장소**: Aurora PostgreSQL (CQRS 패턴 적용)
  - **Write Endpoint**: Primary Aurora (데이터 변경 작업)
  - **Read Endpoint**: Read Replica (데이터 조회 작업)
- **용도**: 통합 기초 정보 + **일별 고객별 집계**, 분석 리포트, 알람 이력, 에러 알림 처리 서비스 정보, **계산식 적용 분석 데이터**
- **특징**: 관계형 데이터 조인, 복잡한 쿼리 지원, Read/Write 분리로 성능 최적화, 고가용성 및 자동 백업
- **데이터**: 
  - 통합 기초 정보 (device → site → customer 매핑)
  - **일별 고객별 제품별 집계** (고객 정보 조인 후 집계)
  - **계산식 적용 분석 데이터** (고객별 제품별 일별 데이터에 계산식 적용 결과)
  - 알람 이력, 에러 알림 처리 서비스 정보
- **집계 특징**: 
  - DocumentDB의 제품별 일별 집계를 읽어와서
  - Aurora의 기초 정보(deviceId → customerId)와 조인하여
  - 고객별 제품별 일별 집계 생성
- **계산식 적용**: 고객별 제품별 일별 집계 데이터부터 계산식 적용하여 분석 데이터 생성
- **CQRS 패턴**: Command(Write)와 Query(Read) 분리로 효율적 운영

#### Cold Layer (장기 보관)
- **저장소**: Apache Iceberg on S3 + Athena
- **용도**: 통합 데이터 장기 보관, 히스토리 분석
- **특징**: 저렴한 스토리지 비용, 대용량 데이터 분석, RDS와 조인 가능
- **데이터**: 센서 데이터와 기초 정보가 조인된 장기 보관 데이터
- **Iceberg 장점**:
  - ACID 트랜잭션 지원
  - 스키마 진화 및 파티션 진화
  - 시간 여행 쿼리
  - 파티션 프루닝으로 쿼리 비용 절감

---

## 📊 주요 기능 (기술적 상세)

### 1. 통합 데이터 플랫폼 (핵심)

위에서 상세히 설명한 통합 데이터 플랫폼이 모든 기능의 기술적 기반입니다.

**핵심 역할**:
- 센서 데이터와 기초 데이터를 단일 플랫폼으로 통합
- 실시간 데이터 처리 및 변환
- 통합 분석 데이터 생성 및 제공
- 모든 고급 기능(모니터링, 제어, 분석)의 기반 제공

**기술적 특징**:
- 다중 프로토콜 지원 (TCP/ECS, MQTT/IoT Core, REST/ECS)
- YAML 기반 유연한 데이터 변환
- CQRS 패턴으로 성능 최적화
- 3계층 데이터 저장 (Hot/Warm/Cold)

### 2. 지능형 모니터링 시스템

#### 룰 엔진 (Lambda Function 기반)
- **Threshold 룰**: 임계값 기반 알람
- **Anomaly 룰**: 이상 패턴 감지 (Bedrock 기반)
- **Correlation 룰**: 다중 데이터 소스 상관관계 분석
- **Predictive 룰**: 예측 기반 사전 알람 (SageMaker 기반)
- **Batch Check 룰**: EventBridge 스케줄러 기반 배치 통신 오류 체크

#### 제품별 룰셋 (Aurora 저장 및 동적 로드)
- 제품별로 독립적인 알람 룰셋 정의 및 관리 (Aurora에 저장)
- Lambda Function에서 동적으로 룰셋 로드
- 고객별, 디바이스별 맞춤 룰셋 적용
- AI 기반 False Positive 감소 (Bedrock)

#### 실시간 대시보드
- DocumentDB Read Endpoint를 통한 실시간 데이터 조회
- QuickSight 또는 커스텀 대시보드
- KPI 지표 모니터링
- 알람 현황 및 이력 관리 (Aurora PostgreSQL)

### 3. 원격 제어 및 OTA

#### AWS IoT Device Shadow
- 디바이스 상태 동기화
- 원격 명령 전송 및 실행
- 상태 변경 이력 추적 (DocumentDB)

#### OTA 업데이트
- 무선 펌웨어 업데이트
- 롤백 및 버전 관리
- 배포 전략 (Blue-Green, Canary)
- 업데이트 진행 상황 모니터링 (CloudWatch)

### 4. 자동 진단 및 대응

#### AI/ML 기반 분석
- **Bedrock**: LLM 기반 이상 탐지, 근본 원인 분석 (RCA)
- **SageMaker**: ML 모델 기반 예측 분석, 시계열 예측
- 패턴 기반 이상 탐지
- 예방 보수 추천

#### 계산식 기반 분석 데이터 생성
- **계산식 등록 및 관리**: 제품별/고객별/디바이스별 계산식 등록 (Aurora 저장)
- **계산식 적용 시점**: **고객별 제품별 일별 집계 데이터부터** 계산식 적용
  - 센서 데이터에는 고객 정보가 없으므로, 고객 정보가 포함된 집계 데이터부터 계산식 적용
  - 제품별 시간별/일별 집계에는 계산식 적용하지 않음 (고객 정보 없음)
- **계산식 적용 프로세스**:
  1. EventBridge 스케줄러가 일별 집계 완료 후 트리거
  2. Lambda Function이 Aurora에서 계산식 조회 (고객별/제품별)
  3. 고객별 제품별 일별 집계 데이터에 계산식 평가
  4. 계산 결과를 분석 데이터 테이블에 저장 (Aurora)
- **계산 결과 저장**: 분석 데이터로 저장 및 활용 (Aurora)
- **관리 화면 표시**: Aurora Read Endpoint에서 분석 데이터 조회하여 관리 화면에 표시

#### 자동 대응 워크플로우
- Step Functions 기반 워크플로우
- 자동 제어 명령 실행 (IoT Device Shadow)
- OTA 업데이트 자동 배포
- 알림 및 에스컬레이션 (SNS)

### 5. 고객별 맞춤 서비스

#### SLA 관리
- **고객별 SLA 정의**: Aurora에 고객사별 SLA 기준 저장 (가동률, 응답 시간 등)
- **실시간 모니터링**: SLA 준수율을 실시간으로 계산 및 추적
- **SLA 위반 알림**: 위반 시 즉시 고객사 및 운영팀에 알림 전송 (SNS)
- **대응 조치**: 위반 발생 시 자동으로 대응 프로세스 시작
- **성능 리포트**: QuickSight를 통한 고객사별 성능 리포트 생성

#### 맞춤형 리포트
- **고객별 맞춤 리포트**: 산업별, 고객사별로 다른 리포트 형식 제공
- **자동 리포트 생성**: EventBridge 스케줄러를 통한 정기 리포트 자동 생성
- **배포**: 이메일, 대시보드, API를 통한 리포트 배포
- **대시보드 커스터마이징**: 고객사별로 다른 대시보드 레이아웃 및 지표 제공
- **트렌드 분석**: 과거 데이터 분석을 통한 서비스 개선 제안

---

## 🛠️ 기술 스택 (상세)

### 데이터 수집 및 스트리밍
- **Kinesis Data Streams**: 실시간 데이터 수집
- **IoT Core**: MQTT 브로커
- **ECS**: TCP 연결 수신 및 REST API 수집 (특별한 경우만 API Gateway)
  - **TCP 처리**: ECS에서 수신 → Kinesis Producer SDK → Kinesis Data Streams
- **Lambda**: 센서 데이터 처리 중심 (컨버트, 분류, 변환)
  - **런타임**: Node.js 20.x
  - **모듈 시스템**: ESM (ES Module)

### 기초 정보 통합
- **DMS (Database Migration Service)**: 분산된 RDBMS 통합 마이그레이션
  - 지원 데이터베이스: MariaDB, MySQL, MSSQL, Oracle, PostgreSQL, MongoDB
  - Full Load + CDC 방식
- **CDC (Change Data Capture)**: 실시간 변경사항 동기화
  - DMS CDC: RDBMS 트랜잭션 로그 기반 실시간 캡처 → Kinesis Data Streams
  - MongoDB Change Streams: NoSQL 변경사항 스트리밍 → Kinesis Producer SDK → Kinesis Data Streams
  - DynamoDB Streams: DynamoDB 변경사항 캡처 → Lambda Trigger → Kinesis Data Streams
- **통합 Aurora PostgreSQL**: 모든 기초 정보를 통합 저장
  - **CQRS 패턴**: Read/Write Endpoint 분리

### 데이터 처리
- **Lambda**: 서버리스 데이터 변환 및 처리 (Node.js 20.x, ESM 모듈)
- **EventBridge**: 이벤트 기반 스케줄링
- **Step Functions**: 워크플로우 오케스트레이션

### 데이터 저장
- **S3**: 원본 데이터 및 Iceberg 테이블 저장
- **Apache Iceberg**: 테이블 형식 (ACID, 스키마 진화, 시간 여행)
- **Amazon Athena**: SQL 쿼리 엔진
- **Aurora PostgreSQL**: 통합 기초 정보, **일별 고객별 집계**, **계산식 적용 분석 데이터**, 알람 이력, 에러 알림 처리 서비스 정보
  - **CQRS 패턴**: Read/Write Endpoint 분리
    - **Write Endpoint**: Primary Aurora (데이터 변경)
    - **Read Endpoint**: Read Replica (데이터 조회)
  - **집계 데이터**: 일별 고객별 제품별 집계 (센서 데이터 + 기초 정보 조인 후 집계)
  - **분석 데이터**: 고객별 제품별 일별 데이터에 계산식 적용 결과
- **DocumentDB**: Hot 데이터 실시간 접근, **제품별 시간별/일별 집계** (MongoDB 호환 NoSQL, CQRS 패턴)
  - **Write Endpoint**: Primary DocumentDB (데이터 변경)
  - **Read Endpoint**: Read Replica (데이터 조회)
  - **집계 데이터**: 제품별 시간별(1시간, 6시간) / 일별 집계 (센서 데이터에는 고객 정보 없음)

### 모니터링 및 알람
- **EventBridge**: 이벤트 라우팅
- **SNS**: 알림 발송
- **CloudWatch**: 로그 및 메트릭 수집

### 제어 및 IoT
- **IoT Core**: 디바이스 관리 및 Shadow, MQTT 브로커
- **IoT Device Shadow**: 디바이스 상태 동기화 및 원격 제어

### AI/ML 분석
- **Bedrock**: LLM 기반 분석 (이상 탐지, 근본 원인 분석 (RCA))
- **SageMaker**: ML 모델 기반 예측 분석, 시계열 예측

### 인프라 및 보안
- **VPC**: 격리된 네트워크 환경
- **VPN Gateway**: Site-to-Site VPN
- **PrivateLink**: 프라이빗 연결
- **Cognito**: 사용자 인증 및 권한 관리
- **IAM**: 역할 및 정책
- **Secrets Manager**: 데이터베이스 연결 정보 등 시크릿 관리
- **Terraform**: 인프라 코드화

---

## 🏗️ 시스템 아키텍처 (상세)

### 4계층 아키텍처

1. **데이터 수집 계층**
   - 다중 프로토콜 지원: TCP (ECS), MQTT (IoT Core), REST API (ECS, 특별한 경우만 API Gateway)
   - VPN 터널링을 통한 기존 시스템 연동
   - Kinesis Data Streams를 통한 통합 수집

2. **데이터 플랫폼 계층 (통합 데이터 플랫폼)**
   - 3계층 데이터 레이어: Hot (DocumentDB, CQRS 패턴), Warm (Aurora PostgreSQL, CQRS 패턴), Cold (S3 + Iceberg + Athena)
   - YAML 기반 데이터 변환 모듈 (Lambda)
   - Data Contract 기반 품질 관리
   - 센서 데이터 통합 및 기초 데이터 통합

3. **분석 엔진 계층**
   - AI/ML 기반 이상 탐지 (SageMaker, Bedrock)
   - 제품별 룰셋 엔진 (Lambda, Aurora 기반)
   - 근본 원인 분석 (RCA) 엔진 (Bedrock)

4. **자동화 제어 계층**
   - AWS IoT Device Shadow 기반 원격 제어
   - OTA (Over-The-Air) 펌웨어 업데이트
   - 자동 진단 및 대응 워크플로우 (Step Functions)

---

## 💼 서비스 제공 방식 (SaaS)

### 설치 및 배포
- **Terraform 기반 인프라**: 코드로 관리되는 인프라
- **CI/CD 파이프라인**: CodePipeline, CodeBuild, CodeDeploy
- **자동화된 배포**: Blue-Green, Canary 배포 전략
- **롤백 지원**: 문제 발생 시 즉시 롤백

### 기존 시스템 연동
- **VPN 터널링**: Site-to-Site VPN을 통한 안전한 연동
- **PrivateLink**: 프라이빗 연결을 통한 데이터 전송
- **DMS/CDC**: 기존 데이터베이스와의 실시간 동기화

### 필요한 리소스 및 시스템

**네트워크 및 보안**:
- VPC, Subnet, Internet Gateway, NAT Gateway
- VPN Gateway, Customer Gateway, VPN Connection
- Security Group, Network ACL, Route Table

**게이트웨이 및 어댑터**:
- ECS Service (TCP 수신 및 REST API 수신)
- Network Load Balancer (TCP 로드 밸런싱)
- Application Load Balancer (HTTP/HTTPS 로드 밸런싱)
- IoT Core (MQTT 브로커)
- API Gateway (특별한 경우만 사용)

**기초 정보 통합 (DMS 및 CDC)**:
- DMS Replication Instance
- DMS Source/Target Endpoints
- DMS Tasks
- Lambda Functions (CDC 변환)
- Kinesis Data Streams (CDC 변경사항)

**데이터 스트림**:
- Kinesis Data Streams
- Kinesis Data Firehose
- Kinesis Analytics

**Lambda 함수**:
- 컨버트 모듈 (Node.js 20.x, ESM)
- 데이터 분류 (Node.js 20.x, ESM)
- 표준화 변환 (Node.js 20.x, ESM)
- CDC 변환 (Node.js 20.x, ESM)
- 룰 엔진 (Node.js 20.x, ESM)
- 자동 제어 (Node.js 20.x, ESM)
- DLQ 처리 (Node.js 20.x, ESM)
- 배치 처리 (Node.js 20.x, ESM)
- **제품별 집계** (Node.js 20.x, ESM)
  - EventBridge 스케줄러 트리거 (1시간/6시간/일 단위)
  - DocumentDB에서 센서 데이터 조회하여 제품별 시간별/일별 집계
  - 집계 결과를 DocumentDB에 저장
- **고객별 집계** (Node.js 20.x, ESM)
  - EventBridge 스케줄러 트리거 (일 단위)
  - DocumentDB의 제품별 일별 집계 + Aurora 기초 정보 조인
  - 고객별 제품별 일별 집계 생성 후 Aurora에 저장
- **계산식 적용** (Node.js 20.x, ESM)
  - 고객별 집계 완료 후 트리거
  - Aurora에서 계산식 조회 (고객별/제품별)
  - 고객별 제품별 일별 집계 데이터에 계산식 평가
  - 계산 결과를 분석 데이터 테이블에 저장 (Aurora)

**데이터 저장소**:
- DocumentDB (Hot 데이터, MongoDB 호환 NoSQL, CQRS 패턴)
  - Write Endpoint: Primary DocumentDB (데이터 변경)
  - Read Endpoint: Read Replica (데이터 조회)
  - **집계 데이터**: 제품별 시간별(1시간, 6시간) / 일별 집계
    - 센서 데이터에는 고객 정보가 없으므로 제품별 집계만 수행
- Aurora PostgreSQL (통합 기초 정보, **일별 고객별 집계**, **계산식 적용 분석 데이터**, 알람 이력, 에러 알림 처리 서비스 정보, CQRS 패턴)
  - Write Endpoint: Primary Aurora (데이터 변경)
  - Read Endpoint: Read Replica (데이터 조회)
  - **집계 데이터**: 일별 고객별 제품별 집계
    - DocumentDB의 제품별 일별 집계 + 기초 정보(deviceId → customerId) 조인 후 집계
  - **분석 데이터**: 고객별 제품별 일별 데이터에 계산식 적용 결과
    - 관리 화면에서 조회하여 표시
- S3 (Raw/Standardized/Curated Layer)
- S3 + Iceberg (Cold 데이터)

**분석 및 AI/ML**:
- Bedrock (LLM 기반 분석 - 이상 탐지, RCA)
- SageMaker (ML 모델 기반 예측 분석, 시계열 예측)
- Athena (SQL 쿼리)
- Glue (ETL 처리 및 카탈로그 관리)

**계산식 엔진**:
- 계산식 등록 및 관리 시스템 (Aurora)
  - 제품별/고객별/디바이스별 계산식 등록 및 버전 관리
- Lambda Function (계산식 적용, Node.js 20.x, ESM)
  - **적용 시점**: 고객별 제품별 일별 집계 데이터부터 적용
  - **프로세스**: 집계 완료 후 트리거 → 계산식 조회 → 평가 → 분석 데이터 저장
- 계산 결과 저장소 (분석 데이터 - Aurora)
  - 고객별 제품별 일별 분석 데이터 테이블
  - 관리 화면에서 조회하여 표시

**오케스트레이션**:
- EventBridge
- Step Functions

**모니터링 및 알림**:
- CloudWatch
- SNS
- QuickSight

**큐 및 메시징**:
- SQS (Dead Letter Queue)

**인증 및 보안**:
- Cognito (사용자 인증 및 권한 관리)
- IAM (역할 및 정책)
- Secrets Manager (데이터베이스 연결 정보 등 시크릿 관리)
- Parameter Store (설정 관리)

**기타**:
- CodePipeline, CodeBuild, CodeDeploy

---

## 🎯 핵심 차별화 포인트 (기술적 관점)

### 1. 통합 데이터 플랫폼 중심 아키텍처
- 센서 데이터와 기초 데이터를 단일 플랫폼으로 통합
- 모든 기능이 통합 데이터 플랫폼 기반으로 동작
- 확장 가능한 플랫폼 구조

### 2. 실시간 통합 및 처리
- 센서 데이터와 기초 데이터의 실시간 통합
- CDC를 통한 실시간 동기화
- 즉시 분석 가능한 통합 분석 데이터 제공

### 3. CQRS 패턴 적용
- DocumentDB와 Aurora 모두 CQRS 패턴 적용
- Read/Write 분리로 성능 최적화 및 확장성 향상

### 4. AI 기반 지능형 분석
- AI/ML 기반 이상 탐지 및 예측 분석
- 근본 원인 분석 (RCA)
- False Positive 감소

### 5. 자동화된 운영
- 자동 대응 워크플로우
- 원격 제어 및 OTA를 통한 자동 해결
- 최소한의 인력으로 운영 가능

### 6. 비용 최적화
- 3계층 데이터 레이어를 통한 비용 최적화
- Iceberg + Athena를 통한 쿼리 비용 절감
- 서버리스 아키텍처로 운영비 절감

---

*최종 업데이트: 2026년 3월*
