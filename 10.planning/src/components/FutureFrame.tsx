import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";
import {
  Target,
  Lightbulb,
  TrendingUp,
  Users,
  Bot,
  Share2,
  Sparkles,
  CheckCircle2,
  Brain,
  Settings,
  Database,
  Shield,
  DollarSign,
  Clock,
  AlertTriangle,
  Zap,
  Cloud,
  GitBranch,
  Briefcase,
  Map,
  Rocket
} from "lucide-react";

export function FutureFrame() {
  // 구체적인 문제별 해결 전략
  const detailedSolutions = [
    {
      problem: "데이터 분산으로 인한 통합 불가",
      currentState: "RDBMS/NoSQL/File/IoT 각각 관리",
      targetSolution: "통합 Data Lake + 표준 스키마",
      implementation: [
        "7개 도메인 통합 스키마 설계",
        "S3 기반 3계층(Raw/Standardized/Curated) 구축",
        "실시간 스키마 검증 및 데이터 품질 관리",
        "Glue Catalog 자동 스키마 발견"
      ],
      timeline: "2-3개월",
      metrics: {
        before: "데이터 신뢰도 15%",
        after: "85% 향상",
        cost: "통합 비용 60% 절감"
      },
      icon: Database,
      color: "text-blue-600"
    },
    {
      problem: "알람 오탐/미탐으로 운영 혼란",
      currentState: "단순 임계값 기반 알람",
      targetSolution: "AI 기반 지능형 알람 시스템",
      implementation: [
        "4가지 룰 타입(Threshold/Pattern/Trend/Correlation) 적용",
        "머신러닝 기반 False Positive 필터링",
        "컨텍스트 인식 알람 그룹핑",
        "적응형 임계값 자동 조정"
      ],
      timeline: "3-4개월",
      metrics: {
        before: "오탐률 45%",
        after: "30% 감소",
        cost: "운영 인력 40% 절약"
      },
      icon: AlertTriangle,
      color: "text-red-600"
    },
    {
      problem: "근본 원인 분석 지연으로 SLA 위반",
      currentState: "수동 장애 분석",
      targetSolution: "AI 기반 자동 RCA 시스템",
      implementation: [
        "Amazon Bedrock 기반 원인 분석 엔진",
        "실시간 증상-원인 패턴 매핑",
        "자동 해결책 제안 및 실행",
        "지식 베이스 지속 학습"
      ],
      timeline: "4-5개월",
      metrics: {
        before: "MTTR 2.5시간",
        after: "40% 단축",
        cost: "고객 만족도 25% 향상"
      },
      icon: Brain,
      color: "text-purple-600"
    },
    {
      problem: "현장 출동 과다로 운영비 증가",
      currentState: "원격 제어 인프라 부족",
      targetSolution: "Shadow 기반 원격 관리 + OTA",
      implementation: [
        "AWS IoT Shadow 기반 안전 원격 제어",
        "단계별 OTA 배포 시스템",
        "AB 파티션 기반 자동 롤백",
        "예측 유지보수 스케줄링"
      ],
      timeline: "3-4개월",
      metrics: {
        before: "현장 출동 월 120건",
        after: "70% 감소",
        cost: "운영비 40% 절감"
      },
      icon: Settings,
      color: "text-green-600"
    }
  ];

  // 미래 비즈니스 모델
  const futureBusinessModels = [
    {
      model: "예측 정비 서비스",
      description: "장비 고장 예측 및 최적 정비 시점 제안",
      revenue: "구독 기반 월 정액제",
      targetMarket: "제조업, 에너지, 건물 관리",
      businessValue: [
        "고객사 정비 비용 30% 절감",
        "예상치 못한 다운타임 50% 감소",
        "부품 재고 최적화 20% 개선",
        "신규 수익원 창출"
      ],
      implementation: [
        "SageMaker 기반 고장 예측 모델",
        "실시간 센서 데이터 분석",
        "정비 스케줄 최적화 알고리즘",
        "ROI 계산 및 보고서 자동 생성"
      ],
      icon: Zap,
      color: "text-orange-600"
    },
    {
      model: "데이터 인사이트 서비스",
      description: "업종별 벤치마킹 및 최적화 컨설팅",
      revenue: "프로젝트 기반 + 지속 컨설팅",
      targetMarket: "중소기업, 스타트업",
      businessValue: [
        "업종별 성능 벤치마킹 제공",
        "에너지 효율 최적화 가이드",
        "운영 비용 절감 방안 제시",
        "데이터 기반 의사결정 지원"
      ],
      implementation: [
        "익명화된 업종별 데이터 분석",
        "AI 기반 최적화 추천 엔진",
        "자동 리포트 생성 시스템",
        "대시보드 및 API 제공"
      ],
      icon: TrendingUp,
      color: "text-blue-600"
    },
    {
      model: "데이터 마켓플레이스",
      description: "표준화된 IoT 데이터 거래 플랫폼",
      revenue: "거래 수수료 + 플랫폼 이용료",
      targetMarket: "AI/ML 회사, 연구기관, 정부기관",
      businessValue: [
        "고품질 IoT 데이터셋 판매",
        "파트너사와 수익 공유",
        "연구기관 협업 확대",
        "새로운 생태계 조성"
      ],
      implementation: [
        "데이터 상품 카탈로그 구축",
        "API 기반 데이터 유통",
        "블록체인 기반 거래 투명성",
        "데이터 품질 인증 시스템"
      ],
      icon: Share2,
      color: "text-purple-600"
    }
  ];

  const problemSolutions = [
    {
      category: "운영 개선",
      solutions: [
        {
          metric: "알람 오탐율",
          target: "30%↓",
          description: "룰 정확도 향상(임계값·추세·상관조건)",
        },
        {
          metric: "예비 경고→확정 알람 전환시간",
          target: "40%↓",
          description: "빠른 감지 및 자동 검증",
        },
        {
          metric: "평균 복구 시간",
          target: "30–40%↓",
          description: "자동 원인 분석 및 즉시 대응",
        },
      ],
      icon: "🔧",
      color: "border-blue-200 bg-blue-50",
    },
    {
      category: "서비스 품질",
      solutions: [
        {
          metric: "원격 업데이트(OTA) 성공율",
          target: "98% 이상",
          description: "AB 파티션 및 자동 롤백 지원",
        },
        {
          metric: "업데이트 롤백율",
          target: "1% 이하",
          description: "안전한 배포 전략",
        },
        {
          metric: "서비스 수준 목표 위반율",
          target: "30%↓",
          description: "예방적 모니터링",
        },
      ],
      icon: "⚡",
      color: "border-green-200 bg-green-50",
    },
    {
      category: "비용 효율",
      solutions: [
        {
          metric: "데이터 품질 실패율",
          target: "50%↓",
          description: "데이터 품질 규칙 자동화",
        },
        {
          metric: "저장 비용",
          target: "20–40%↓",
          description: "수명주기(Lifecycle) 관리",
        },
        {
          metric: "분석·조회 비용",
          target: "20–40%↓",
          description: "Iceberg 기반 최적화",
        },
      ],
      icon: "💰",
      color: "border-purple-200 bg-purple-50",
    },
  ];

  const futureServices = [
    {
      name: "예측 정비 서비스",
      description:
        "센서 + 이벤트 데이터를 활용한 사전 정비 추천",
      features: [
        "장비 수명 예측",
        "부품 교체 시기 알림",
        "최적 정비 일정 제안",
        "예상 비용 산출",
      ],
      icon: "🔮",
      color: "bg-blue-100 text-blue-700",
      value: "정비 비용 30% 절감",
    },
    {
      name: "고객 만족 서비스 대시보드",
      description: "고객사별 서비스 수준 준수 현황 및 리포트",
      features: [
        "실시간 서비스 모니터링",
        "위반 알림 자동화",
        "맞춤형 리포트 생성",
        "핵심 지표(KPI) 시각화",
      ],
      icon: "📊",
      color: "bg-green-100 text-green-700",
      value: "고객 만족도 25% 향상",
    },
    {
      name: "제품 품질 개선 서비스",
      description: "제품 유형별 그룹 분석 → 개선 피드백 제공",
      features: [
        "제품별 성능 분석",
        "결함 패턴 식별",
        "자동 개선안 생성",
        "연구·개발(R&D) 피드백 루프",
      ],
      icon: "✨",
      color: "bg-purple-100 text-purple-700",
      value: "제품 품질 40% 개선",
    },
    {
      name: "AI 운영 도우미",
      description: "Bedrock Agent를 활용한 원인분석·운영 Q&A",
      features: [
        "자연어 기반 질의응답",
        "실시간 원인 분석(RCA) 지원",
        "운영 가이드 제공",
        "지속 학습형 지식베이스",
      ],
      icon: "🤖",
      color: "bg-orange-100 text-orange-700",
      value: "운영 효율 50% 향상",
    },
    {
      name: "원격 업데이트(OTA) 자동 최적화",
      description: "AI가 배포 대상/시간 창 자동 추천",
      features: [
        "최적 배포 시점 예측",
        "대상 디바이스 선별",
        "리스크 평가 자동화",
        "배포 전략 최적화",
      ],
      icon: "🚀",
      color: "bg-red-100 text-red-700",
      value: "OTA 실패율 80% 감소",
    },
    {
      name: "데이터 공유·마켓 서비스",
      description:
        "표준화 데이터셋 기반 파트너/3rd-party 협업 지원",
      features: [
        "API 기반 데이터 공유",
        "데이터 상품 카탈로그",
        "파트너 생태계 구축",
        "다양한 수익 모델",
      ],
      icon: "🌐",
      color: "bg-indigo-100 text-indigo-700",
      value: "신규 수익원 창출",
    },
  ];

  const roadmap = [
    {
      phase: "0단계 (병렬)",
      title: "설계 및 목표설정",
      items: [
        "프로젝트 요구사항 분석",
        "목표 설정 및 성공 기준 정의",
        "시스템 아키텍처 설계",
        "데이터 모델 설계",
        "기술 스택 검토 및 개발 계획",
        "고객사 요구사항 정리",
      ],
      status: "계획 중",
    },
    {
      phase: "1단계 (2개월)",
      title: "데이터 수집 및 통합",
      items: [
        "VPN 연결 설정",
        "다중 프로토콜 통합 (TCP/MQTT/REST)",
        "데이터 표준화 및 변환",
        "데이터 품질 검증",
      ],
      status: "계획 중",
    },
    {
      phase: "2단계 (2개월)",
      title: "데이터 저장 및 집계 자동화",
      items: [
        "CQRS 패턴 적용",
        "3계층 데이터 저장소 구축",
        "제품별/고객별 집계 자동화",
        "계산식 적용 자동화",
      ],
      status: "계획 중",
    },
    {
      phase: "3단계 (2개월)",
      title: "알람 처리",
      items: [
        "룰 기반 알람 시스템",
        "알람/에스컬레이션 처리",
        "이력 관리",
      ],
      status: "계획 중",
    },
    {
      phase: "4단계 (병렬 진행)",
      title: "자동화 확장 및 프론트엔드",
      items: [
        "Shadow 기반 원격 제어",
        "OTA 파이프라인 구축",
        "프론트엔드 관리 화면 개발",
        "고객 관리 화면 개발",
      ],
      status: "계획 중",
    },
    {
      phase: "배포 시스템 (병렬)",
      title: "배포 시스템 구축",
      items: [
        "Terraform 배포 시스템",
        "Lambda/백엔드/프론트엔드 배포",
        "CI/CD 파이프라인 구축",
      ],
      status: "계획 중",
    },
    {
      phase: "5단계 (1개월)",
      title: "서비스 검수 및 보완",
      items: [
        "AWS 시스템 모니터링 구축",
        "스트레스 테스트 및 성능 검증",
        "보안 검수 및 보완 작업",
      ],
      status: "계획 중",
    },
  ];

  return (
    <div className="space-y-4 sm:space-y-6">
      <div className="text-center mb-4 sm:mb-8">
        <h2 className="mb-2 text-indigo-600 text-sm sm:text-base">
          🟤 Frame 7. 구체적 문제해결 & 미래 비즈니스 전략
        </h2>
        <p className="text-muted-foreground text-sm">
          각 문제별 상세 해결 방안과 데이터 기반 신규 비즈니스 모델 제안
        </p>
      </div>

      <Tabs defaultValue="solutions" className="w-full">
        <TabsList className="w-full h-auto p-1 bg-muted/30 grid grid-cols-2 sm:grid-cols-4 gap-1 sm:gap-2 mb-4 sm:mb-6">
          {[
            { key: "solutions", label: "해결방안", Icon: Target },
            { key: "business", label: "비즈니스", Icon: Briefcase },
            { key: "roadmap", label: "로드맵", Icon: Map },
            { key: "impact", label: "임팩트", Icon: Rocket },
          ].map((tab) => (
            <TabsTrigger
              key={tab.key}
              value={tab.key}
              className={[
                "w-full min-h-[48px] sm:min-h-[56px] h-auto",
                "inline-flex flex-col items-center justify-center",
                "rounded-lg px-1 py-2 sm:px-2 sm:py-3 text-xs md:text-sm",
                "border-0 bg-white/50 shadow-none transition-all duration-200",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200",
                "data-[state=active]:bg-blue-50 data-[state=active]:text-blue-800 data-[state=active]:border-blue-300 data-[state=active]:ring-2 data-[state=active]:ring-blue-200 data-[state=active]:shadow-sm",
                "data-[state=inactive]:text-slate-700 data-[state=inactive]:hover:bg-white/80",
              ].join(" ")}
            >
              <tab.Icon className="h-6 w-6 sm:h-7 sm:w-7 mb-1 flex-shrink-0" strokeWidth={2.5} />
              <span className="leading-tight text-center text-xs sm:text-sm whitespace-nowrap">
                {tab.label}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value="solutions" className="space-y-4 sm:space-y-6">
          {/* Detailed Problem Solutions */}
          <Card>
            <CardHeader className="p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                <Target className="h-4 w-4 sm:h-5 sm:w-5 text-green-500" />
                핵심 문제별 구체적 해결 전략
              </CardTitle>
              <CardDescription className="text-sm">
                현재 상태 → 목표 솔루션 → 구현 방법 → 예상 효과
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="space-y-8">
                {detailedSolutions.map((solution, index) => (
                  <div key={index} className="border rounded-lg p-6">
                    <div className="flex items-start gap-4 mb-6">
                      <solution.icon className={`h-10 w-10 ${solution.color} flex-shrink-0 mt-1`} strokeWidth={2.5} />
                      <div className="flex-1">
                        <h3 className="font-medium text-lg mb-2">{solution.problem}</h3>
                        <div className="grid md:grid-cols-2 gap-6 mb-6">
                          <div>
                            <h4 className="font-medium text-sm mb-2 text-red-700">🚨 현재 상태</h4>
                            <p className="text-sm text-muted-foreground mb-4">{solution.currentState}</p>
                            <h4 className="font-medium text-sm mb-2 text-green-700">🎯 목표 솔루션</h4>
                            <p className="text-sm text-muted-foreground">{solution.targetSolution}</p>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-3 text-blue-700">⚡ 구현 방법</h4>
                            <div className="space-y-2">
                              {solution.implementation.map((item, implIndex) => (
                                <div key={implIndex} className="flex items-start gap-2 text-sm">
                                  <CheckCircle2 className="h-4 w-4 text-blue-500 flex-shrink-0 mt-0.5" />
                                  {item}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="grid md:grid-cols-4 gap-4 p-4 bg-slate-50 rounded-lg">
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">구현 기간</div>
                            <Badge variant="outline">{solution.timeline}</Badge>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">현재</div>
                            <div className="text-sm font-medium text-red-600">{solution.metrics.before}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">목표</div>
                            <div className="text-sm font-medium text-green-600">{solution.metrics.after}</div>
                          </div>
                          <div className="text-center">
                            <div className="text-xs text-muted-foreground mb-1">부가 효과</div>
                            <div className="text-sm font-medium text-blue-600">{solution.metrics.cost}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="business" className="space-y-6">
          {/* Future Business Models */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lightbulb className="h-5 w-5 text-yellow-500" />
                데이터 기반 신규 비즈니스 모델
              </CardTitle>
              <CardDescription>
                IoT 데이터 플랫폼을 활용한 새로운 수익원 창출 전략
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-8">
                {futureBusinessModels.map((model, index) => (
                  <div key={index} className="border-2 border-indigo-200 bg-indigo-50 rounded-lg p-6">
                    <div className="flex items-center gap-3 mb-4">
                      <model.icon className={`h-10 w-10 ${model.color} flex-shrink-0`} strokeWidth={2.5} />
                      <div>
                        <h3 className="font-medium text-lg">{model.model}</h3>
                        <p className="text-sm text-muted-foreground">{model.description}</p>
                      </div>
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-6 mb-6">
                      <div>
                        <h4 className="font-medium text-sm mb-3">💰 수익 모델</h4>
                        <p className="text-sm bg-white/70 p-3 rounded mb-3">{model.revenue}</p>
                        <h4 className="font-medium text-sm mb-2">🎯 타겟 시장</h4>
                        <p className="text-sm text-muted-foreground">{model.targetMarket}</p>
                      </div>
                      <div>
                        <h4 className="font-medium text-sm mb-3">📈 비즈니스 가치</h4>
                        <div className="space-y-2">
                          {model.businessValue.map((value, valueIndex) => (
                            <div key={valueIndex} className="flex items-start gap-2 text-sm">
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              {value}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-medium text-sm mb-3">🔧 기술 구현</h4>
                      <div className="grid md:grid-cols-2 gap-2">
                        {model.implementation.map((impl, implIndex) => (
                          <div key={implIndex} className="text-sm bg-white/70 p-2 rounded">
                            {impl}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roadmap" className="space-y-6">
          {/* Implementation Roadmap */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-blue-500" />
                단계별 실행 로드맵
              </CardTitle>
              <CardDescription>
                문제 해결부터 신규 비즈니스 창출까지의 체계적 실행 계획
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {roadmap.map((phase, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start gap-4">
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-bold ${
                          phase.status === "계획 중"
                            ? "bg-blue-500"
                            : phase.status === "개발 중"
                              ? "bg-orange-500"
                              : "bg-purple-500"
                        }`}
                      >
                        {index + 1}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-medium text-lg">
                            {phase.title}
                          </h3>
                          <Badge variant="outline">
                            {phase.phase}
                          </Badge>
                          <Badge variant={
                            phase.status === "계획 중" ? "default" :
                            phase.status === "개발 중" ? "secondary" : "outline"
                          }>
                            {phase.status}
                          </Badge>
                        </div>
                        <div className="grid md:grid-cols-2 gap-2">
                          {phase.items.map((item, itemIndex) => (
                            <div
                              key={itemIndex}
                              className="text-sm bg-slate-50 px-3 py-2 rounded"
                            >
                              {item}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                    {index < roadmap.length - 1 && (
                      <div className="absolute left-6 top-12 w-0.5 h-6 bg-slate-300"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Wins vs Long-term */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-green-500" />
                단기 성과 vs 장기 전략
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 border-2 border-green-200 bg-green-50 rounded-lg">
                  <h3 className="font-medium text-lg mb-4 text-green-700">🚀 단기 성과 (3-6개월)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">데이터 통합으로 신뢰도 85% 향상</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">알람 오탐률 30% 감소</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">원격 제어로 현장 출동 70% 감소</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                      <span className="text-sm">운영 비용 40% 절감</span>
                    </div>
                  </div>
                </div>
                <div className="p-6 border-2 border-blue-200 bg-blue-50 rounded-lg">
                  <h3 className="font-medium text-lg mb-4 text-blue-700">🎯 장기 전략 (12-24개월)</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">예측 정비 서비스 런칭</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">데이터 마켓플레이스 구축</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">신규 수익원 30% 증가</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Target className="h-5 w-5 text-blue-500" />
                      <span className="text-sm">업계 리더십 확보</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="impact" className="space-y-6">
          {/* Problem Resolution Summary */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Target className="h-5 w-5 text-green-500" />
                문제 해결 효과 요약
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {problemSolutions.map((category, index) => (
                  <div
                    key={index}
                    className={`p-6 rounded-lg border-2 ${category.color}`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      <span className="text-2xl">
                        {category.icon}
                      </span>
                      <h3 className="font-medium text-lg">
                        {category.category}
                      </h3>
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      {category.solutions.map(
                        (solution, solutionIndex) => (
                          <div
                            key={solutionIndex}
                            className="text-center p-4 bg-white/50 rounded-lg"
                          >
                            <div className="font-medium text-sm mb-1">
                              {solution.metric}
                            </div>
                            <div className="text-2xl font-bold text-green-600 mb-2">
                              {solution.target}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {solution.description}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Expected Business Impact */}
          <Card className="border-2 border-indigo-200 bg-indigo-50/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-700">
                <Sparkles className="h-5 w-5" />
                종합 비즈니스 임팩트
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div className="space-y-4">
                  <h4 className="font-medium text-indigo-700">💰 재무적 효과</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <DollarSign className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-green-600">40%↓</div>
                      <div className="text-xs text-muted-foreground">운영 비용</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <TrendingUp className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-blue-600">30%↑</div>
                      <div className="text-xs text-muted-foreground">신규 수익</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Clock className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-orange-600">12개월</div>
                      <div className="text-xs text-muted-foreground">ROI 회수</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Shield className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-purple-600">98%</div>
                      <div className="text-xs text-muted-foreground">시스템 안정성</div>
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="font-medium text-indigo-700">📊 운영 효과</h4>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Users className="h-6 w-6 text-blue-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-blue-600">25%↑</div>
                      <div className="text-xs text-muted-foreground">고객 만족도</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Settings className="h-6 w-6 text-green-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-green-600">50%↑</div>
                      <div className="text-xs text-muted-foreground">운영 효율</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Brain className="h-6 w-6 text-purple-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-purple-600">60%</div>
                      <div className="text-xs text-muted-foreground">자동 해결률</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <GitBranch className="h-6 w-6 text-orange-500 mx-auto mb-2" />
                      <div className="text-lg font-bold text-orange-600">85%</div>
                      <div className="text-xs text-muted-foreground">데이터 신뢰도</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-4 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg">
                <h4 className="font-medium text-green-700 mb-2">🚀 핵심 성공 요인</h4>
                <div className="grid md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <strong>기술적 차별화:</strong> AI 기반 자동화, Shadow 원격 제어, 예측 분석
                  </div>
                  <div>
                    <strong>비즈니스 가치:</strong> 즉시 비용 절감, 신규 수익원, 경쟁 우위
                  </div>
                  <div>
                    <strong>지속 가능성:</strong> 데이터 생태계, 파트너십, 지속적 혁신
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}