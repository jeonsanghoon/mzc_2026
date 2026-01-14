import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";
import { Badge } from "../../components/ui/badge";
import {
  AlertTriangle,
  Database,
  Cloud,
  BarChart3,
  Settings,
  TrendingUp,
  Target,
  CheckCircle2,
  Brain,
  Rocket,
  Presentation,
  Play,
} from "lucide-react";
import { Button } from "../../components/ui/button";

import { ProblemFrame } from "../../components/ProblemFrame";
import { SchemaFrame } from "../../components/SchemaFrame";
import { DataIntegrationFrame } from "../../components/DataIntegrationFrame";
import { MonitoringFrame } from "../../components/MonitoringFrame";
import { RemoteControlFrame } from "../../components/RemoteControlFrame";
import { AnalysisFrame } from "../../components/AnalysisFrame";
import { FutureFrame } from "../../components/FutureFrame";

export function DashboardApp() {
  const frames = [
    {
      id: "problem",
      title: "1. 데이터 문제 정의",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      id: "schema",
      title: "2. 데이터 표준화",
      icon: Database,
      color: "text-blue-500",
    },
    {
      id: "integration",
      title: "3. 통합 데이터 플랫폼",
      icon: Cloud,
      color: "text-yellow-500",
    },
    {
      id: "monitoring",
      title: "4. 실시간 모니터링",
      icon: BarChart3,
      color: "text-orange-500",
    },
    {
      id: "control",
      title: "5. 자동 제어 및 OTA",
      icon: Settings,
      color: "text-purple-500",
    },
    {
      id: "analysis",
      title: "6. 지능형 분석",
      icon: Brain,
      color: "text-indigo-500",
    },
    {
      id: "future",
      title: "7. 데이터 활용 확장",
      icon: Rocket,
      color: "text-green-500",
    },
  ];

  const [activeFrame, setActiveFrame] = useState<
    | "problem"
    | "schema"
    | "integration"
    | "monitoring"
    | "control"
    | "analysis"
    | "future"
  >(() => {
    // 초기 상태 설정 시 해시 확인
    const hash = window.location.hash.slice(1);
    if (hash.startsWith("dashboard/")) {
      const frameId = hash.replace("dashboard/", "");
      const frame = frames.find(f => f.id === frameId);
      return frame ? (frameId as typeof activeFrame) : "problem";
    }
    return "problem";
  });

  // 해시로 프레임 감지 및 업데이트
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      
      if (hash.startsWith("dashboard/")) {
        const frameId = hash.replace("dashboard/", "");
        const frame = frames.find(f => f.id === frameId);
        if (frame && frameId !== activeFrame) {
          setActiveFrame(frameId as typeof activeFrame);
        }
      } else if (hash === "dashboard") {
        if (activeFrame !== "problem") {
          setActiveFrame("problem");
          window.location.hash = "#dashboard/problem";
        }
      }
    };

    // 초기 로드
    handleHashChange();
    
    // 해시 변경 이벤트 리스너
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [frames, activeFrame]);

  const renderFrameContent = () => {
    switch (activeFrame) {
      case "problem":
        return <ProblemFrame />;
      case "schema":
        return <SchemaFrame />;
      case "integration":
        return <DataIntegrationFrame />;
      case "monitoring":
        return <MonitoringFrame />;
      case "control":
        return <RemoteControlFrame />;
      case "analysis":
        return <AnalysisFrame />;
      case "future":
        return <FutureFrame />;
      default:
        return <ProblemFrame />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="container mx-auto py-2 sm:py-8 px-2 sm:px-4">
        {/* Header with Purple Gradient Background */}
        <header className="relative mb-4 sm:mb-10 max-w-6xl mx-auto rounded-2xl overflow-hidden">
          {/* Purple Gradient Background */}
          <div className="absolute inset-0 bg-gradient-to-b from-purple-400 via-purple-600 to-purple-800"></div>
          
          {/* Content */}
          <div className="relative px-6 sm:px-12 py-8 sm:py-16 text-center">
            {/* Main Title */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-3 sm:mb-4 text-white">
              데이터 통합 플랫폼
            </h1>
            
            {/* Subtitle */}
            <h2 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-white/95">
              지능형 IoT 관리 솔루션
            </h2>
            
            {/* Description Lines */}
            <div className="space-y-2 mb-6 sm:mb-8">
              <p className="text-sm sm:text-base md:text-lg text-white/90 font-medium">
                실시간 데이터 분석과 AI 기반 자동화를 통한
              </p>
              <p className="text-xs sm:text-sm md:text-base text-white/85">
                차세대 스마트 디바이스 관리 시스템
              </p>
            </div>
            
            {/* 프레젠테이션 시작 버튼 */}
            <div className="flex justify-center">
              <Button
                onClick={() => {
                  window.location.hash = "#presentation";
                  window.location.reload();
                }}
                size="lg"
                className="bg-white text-purple-700 hover:bg-purple-50 font-semibold px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 border-2 border-white/20"
              >
                <Presentation className="mr-2 h-5 w-5" />
                <Play className="mr-2 h-4 w-4" />
                프레젠테이션 시작
              </Button>
            </div>
          </div>
        </header>

        {/* Key Features Overview */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-10 auto-rows-fr">
          {/* Card 1 */}
          <Card className="h-full">
            <CardHeader className="items-center text-center pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 justify-center text-base sm:text-lg md:text-xl">
                <Database className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                데이터 중심 아키텍처
              </CardTitle>
              <CardDescription className="hidden md:block text-sm">
                표준화된 데이터 기반으로 안정적이고 확장 가능한 분석 토대 구축
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-5 text-center p-3 sm:p-6">
              <div className="flex flex-col items-center gap-1">
                <Database className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium">
                    통합 데이터 플랫폼
                  </div>
                  <div className="text-sm text-muted-foreground">
                    센서 데이터와 기초 데이터를 단일 플랫폼으로 통합
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BarChart3 className="h-5 w-5 text-purple-500" />
                <div>
                  <div className="font-medium">
                    실시간 분석 엔진
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Hot/Warm/Cold 3계층 데이터 저장 및 분석
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">
                    AI 기반 자동 해결
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Bedrock/SageMaker를 활용한 예측 분석 및 자동 대응
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 2 */}
          <Card className="h-full">
            <CardHeader className="items-center text-center pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">
                데이터 기반 핵심 기능
              </CardTitle>
              <CardDescription className="hidden md:block text-sm">
                데이터 수집부터 정제, 분석, 이상 탐지까지 완전 자동화된 파이프라인
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3 sm:space-y-5 text-center p-3 sm:p-6">
              <div className="flex flex-col items-center gap-1">
                <Database className="h-5 w-5 text-blue-500" />
                <div>
                  <div className="font-medium">
                    통합 데이터 수집 및 정제
                  </div>
                  <div className="text-sm text-muted-foreground">
                    TCP/MQTT/REST 다중 프로토콜 지원 및 YAML 기반 표준화
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <BarChart3 className="h-5 w-5 text-orange-500" />
                <div>
                  <div className="font-medium">
                    지능형 패턴 분석 및 이상 탐지
                  </div>
                  <div className="text-sm text-muted-foreground">
                    제품별 룰셋 기반 실시간 모니터링 및 AI 기반 근본 원인 분석
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">
                    예측 기반 자동 문제 해결
                  </div>
                  <div className="text-sm text-muted-foreground">
                    폐쇄 루프 자동화: 분석 → 예측 → Shadow 제어/OTA → 검증
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Card 3 (KPI) */}
          <Card className="h-full flex flex-col">
            <CardHeader className="items-center text-center pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 justify-center text-base sm:text-lg md:text-xl text-slate-800">
                <TrendingUp className="h-5 w-5 text-green-500" />
                데이터 통합 기반 개선 효과
              </CardTitle>
              <CardDescription className="text-slate-500 text-sm">
                통합 데이터 플랫폼 도입으로 달성한 측정 가능한 KPI 개선
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col justify-center p-3 sm:p-6">
              <div className="divide-y divide-slate-200">
                <div className="flex justify-between py-2 text-sm text-slate-700">
                  <span>알람 정확도</span>
                  <span className="font-semibold text-green-600">
                    98%{" "}
                    <span className="text-xs text-slate-500">
                      (+68%)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between py-2 text-sm text-slate-700">
                  <span>자동 해결률</span>
                  <span className="font-semibold text-green-600">
                    85%{" "}
                    <span className="text-xs text-slate-500">
                      (+65%)
                    </span>
                  </span>
                </div>
                <div className="flex justify-between py-2 text-sm text-slate-700">
                  <span>운영비 절감</span>
                  <span className="font-semibold text-blue-600">
                    40%
                  </span>
                </div>
                <div className="flex justify-between py-2 text-sm text-slate-700">
                  <span>복구 시간</span>
                  <span className="font-semibold text-red-600">
                    15분{" "}
                    <span className="text-xs text-slate-500">
                      (-75%)
                    </span>
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Frame Navigation - 좌우 레이아웃 */}
        <section>
          <Card>
            <CardHeader className="pb-2 sm:pb-4 text-center p-3 sm:p-6">
              <CardTitle className="text-base sm:text-lg md:text-xl">
                통합 데이터 플랫폼 기반 7단계 아키텍처
              </CardTitle>
              <CardDescription className="text-sm">
                데이터 수집 → 표준화 → 통합 → 모니터링 → 제어 → 분석 → 확장
              </CardDescription>
            </CardHeader>
            <CardContent className="p-3 sm:p-6">
              <div className="flex flex-col lg:flex-row gap-4">
                {/* 왼쪽: 프레임 네비게이션 */}
                <div className="lg:w-64 flex-shrink-0">
                  <div className="flex flex-row lg:flex-col gap-2 overflow-x-auto lg:overflow-x-visible pb-2 lg:pb-0">
                    {frames.map((frame) => {
                      const Icon = frame.icon;
                      const isActive = activeFrame === frame.id;
                      return (
                        <button
                          key={frame.id}
                          type="button"
                          onClick={() => {
                            setActiveFrame(frame.id as any);
                            window.location.hash = `#dashboard/${frame.id}`;
                          }}
                          aria-pressed={isActive}
                          aria-current={
                            isActive ? "page" : undefined
                          }
                          className={[
                            "w-full min-w-[120px] lg:min-w-0",
                            "inline-flex items-center gap-2 lg:gap-3",
                            "rounded-lg px-3 py-2.5 text-sm",
                            "border transition-all duration-200",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-200",
                            "active:translate-y-[1px]",
                            isActive
                              ? "bg-blue-50 text-blue-800 border-blue-300 ring-2 ring-blue-200 shadow-sm font-semibold"
                              : "bg-white text-slate-700 border-slate-200 hover:bg-slate-50",
                          ].join(" ")}
                        >
                          <Icon
                            className={`h-4 w-4 flex-shrink-0 ${isActive ? "text-blue-700" : frame.color}`}
                          />
                          <span className="leading-tight text-left whitespace-nowrap lg:whitespace-normal">
                            {frame.title}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* 오른쪽: 프레임 콘텐츠 */}
                <div className="flex-1 min-w-0">
                  <div className="border rounded-lg p-2 sm:p-4 lg:p-6 bg-white">
                    {renderFrameContent()}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* 하단 프레젠테이션 시작 버튼 */}
        <section className="mt-6 sm:mt-10 flex justify-center">
          <Button
            onClick={() => {
              window.location.hash = "#presentation";
              window.location.reload();
            }}
            size="lg"
            className="bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 text-white font-semibold px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
          >
            <Presentation className="mr-2 h-5 w-5" />
            <Play className="mr-2 h-4 w-4" />
            프레젠테이션 시작
          </Button>
        </section>
      </div>
    </div>
  );
}