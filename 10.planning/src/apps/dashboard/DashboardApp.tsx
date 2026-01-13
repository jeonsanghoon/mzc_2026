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
} from "lucide-react";

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
      title: "Frame 1. 데이터 문제 정의",
      icon: AlertTriangle,
      color: "text-red-500",
    },
    {
      id: "schema",
      title: "Frame 2. 데이터 표준화",
      icon: Database,
      color: "text-blue-500",
    },
    {
      id: "integration",
      title: "Frame 3. 데이터 통합 플랫폼",
      icon: Cloud,
      color: "text-yellow-500",
    },
    {
      id: "monitoring",
      title: "Frame 4. 실시간 데이터 모니터링",
      icon: BarChart3,
      color: "text-orange-500",
    },
    {
      id: "control",
      title: "Frame 5. 데이터 기반 자동 제어",
      icon: Settings,
      color: "text-purple-500",
    },
    {
      id: "analysis",
      title: "Frame 6. 지능형 데이터 분석",
      icon: Brain,
      color: "text-indigo-500",
    },
    {
      id: "future",
      title: "Frame 7. 데이터 활용 확장",
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
        {/* Header */}
        <header className="text-center mb-4 sm:mb-10 max-w-4xl mx-auto">
          <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold tracking-tight mb-2 sm:mb-3 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent px-2">
            데이터 통합을 통한 지능형 분석 및 자동화 솔루션
          </h1>
          <p className="text-sm sm:text-base text-muted-foreground max-w-2xl mx-auto px-2">
            피그마 구성용 최종 상세 정리 - 통합 데이터 플랫폼
            기반 사물인터넷 문제 분석 및 해결 시스템
          </p>
        </header>

        {/* Key Features Overview */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 md:gap-6 mb-4 sm:mb-10 auto-rows-fr">
          {/* Card 1 */}
          <Card className="h-full">
            <CardHeader className="items-center text-center pb-2 sm:pb-3 p-3 sm:p-6">
              <CardTitle className="flex items-center gap-2 justify-center text-base sm:text-lg md:text-xl">
                <Database className="h-5 w-5 sm:h-6 sm:w-6 text-blue-500" />
                데이터 중심 아키텍처
              </CardTitle>
              <CardDescription className="hidden md:block text-sm">
                표준 데이터 기반으로 안정적인 분석 토대 구성
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
                    7개 도메인 데이터 통합 및 표준화
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
                    Hot/Warm/Cold 계층화 분석
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center gap-1">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">
                    인공지능 기반 자동 해결
                  </div>
                  <div className="text-sm text-muted-foreground">
                    예측 분석 → 자동 대응 → 검증
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
                수집·정제부터 이상 탐지까지 파이프라인 완성
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
                    실시간 품질 검증 + 표준화
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
                    기계학습 기반 근본 원인 분석
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
                    데이터 → 분석 → 예측 → 자동 대응
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
                측정 가능한 KPI 개선
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
                데이터 중심 프레임 구성
              </CardTitle>
              <CardDescription className="text-sm">
                데이터 수집부터 지능형 분석 및 자동 해결까지
                7단계 아키텍처
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
      </div>
    </div>
  );
}