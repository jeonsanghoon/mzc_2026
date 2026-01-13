import { useState, useEffect } from "react";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Progress } from "../../components/ui/progress";
import { ArrowRight, ArrowLeft, Sparkles, Monitor, Presentation, FileText } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

import { ProblemSlide } from "./slides/ProblemSlide";
import { SolutionSlide } from "./slides/SolutionSlide";
import { ArchitectureSlide } from "./slides/ArchitectureSlide";
import { BenefitsSlide } from "./slides/BenefitsSlide";
import { RoadmapSlide } from "./slides/RoadmapSlide";
import { ROISlide } from "./slides/ROISlide";

interface PresentationAppProps {
  
  onModeChange?: (mode: "dashboard" | "presentation" | "docs") => void;
  currentMode?: "dashboard" | "presentation" | "docs";
}

export function PresentationApp({ onModeChange, currentMode = "presentation" }: PresentationAppProps = {}) {
  const slides = [
    {
      id: "title",
      title: "제목",
      component: null,
      bgColor: "from-blue-600 to-purple-600",
    },
    {
      id: "problem",
      title: "현재 문제점",
      component: <ProblemSlide />,
      bgColor: "from-red-500 to-orange-500",
    },
    {
      id: "solution",
      title: "솔루션 개요",
      component: <SolutionSlide />,
      bgColor: "from-blue-500 to-teal-500",
    },
    {
      id: "architecture",
      title: "시스템 아키텍처",
      component: <ArchitectureSlide />,
      bgColor: "from-purple-500 to-indigo-500",
    },
    {
      id: "benefits",
      title: "핵심 기능 및 이점",
      component: <BenefitsSlide />,
      bgColor: "from-green-500 to-emerald-500",
    },
    {
      id: "roadmap",
      title: "구현 로드맵",
      component: <RoadmapSlide />,
      bgColor: "from-orange-500 to-yellow-500",
    },
    {
      id: "roi",
      title: "ROI & 비즈니스 임팩트",
      component: <ROISlide />,
      bgColor: "from-pink-500 to-rose-500",
    },
  ];

  const [currentSlide, setCurrentSlide] = useState(() => {
    // 초기 상태 설정 시 해시 확인
    const hash = window.location.hash.slice(1);
    if (hash.startsWith("presentation/")) {
      const slideId = hash.replace("presentation/", "");
      const slideIndex = slides.findIndex(s => s.id === slideId);
      return slideIndex !== -1 ? slideIndex : 0;
    }
    return 0;
  });

  // 해시로 슬라이드 감지 및 업데이트
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1);
      
      if (hash.startsWith("presentation/")) {
        const slideId = hash.replace("presentation/", "");
        const slideIndex = slides.findIndex(s => s.id === slideId);
        if (slideIndex !== -1 && slideIndex !== currentSlide) {
          setCurrentSlide(slideIndex);
        }
      } else if (hash === "presentation") {
        if (currentSlide !== 0) {
          setCurrentSlide(0);
        }
      }
    };

    // 초기 로드
    handleHashChange();
    
    // 해시 변경 이벤트 리스너
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [slides, currentSlide]);

  const nextSlide = () => {
    const next = (currentSlide + 1) % slides.length;
    setCurrentSlide(next);
    window.location.hash = `#presentation/${slides[next].id}`;
  };
  
  const prevSlide = () => {
    const prev = (currentSlide - 1 + slides.length) % slides.length;
    setCurrentSlide(prev);
    window.location.hash = `#presentation/${slides[prev].id}`;
  };
  
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    window.location.hash = `#presentation/${slides[index].id}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-white overflow-hidden">
      {/* Title Slide */}
      {currentSlide === 0 && (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="min-h-screen relative"
        >
          {/* 배경 그라데이션 */}
          <div
            className={`absolute inset-0 bg-gradient-to-br ${slides[currentSlide].bgColor} opacity-90`}
          />

          {/* 3행 Grid: [타이틀/설명(1fr)] [버튼(auto)] [하단 포인트(auto)] */}
          <div className="relative z-10 max-w-4xl mx-auto px-3 sm:px-6 min-h-screen grid grid-rows-[1fr_auto_auto] place-items-center gap-4 sm:gap-6 md:gap-8 pb-[env(safe-area-inset-bottom)]">
            {/* 타이틀/설명 */}
            <div className="w-full text-center">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.8 }}
              >
                <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-8xl mb-6 sm:mb-8 bg-gradient-to-r from-white via-blue-50 to-blue-100 bg-clip-text text-transparent px-2 font-black tracking-tight">
                  데이터 통합 플랫폼
                </h1>
                <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl mb-4 sm:mb-6 text-blue-50 px-2 font-semibold">
                  지능형 IoT 관리 솔루션
                </h2>
                <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-blue-100 max-w-3xl mx-auto leading-relaxed px-4 font-medium">
                  실시간 데이터 분석과 AI 기반 자동화를 통한
                  <br className="hidden sm:block" />
                  <span className="sm:hidden"> </span>차세대
                  스마트 디바이스 관리 시스템
                </p>
              </motion.div>
            </div>

            {/* 모드 선택 버튼 - 오른쪽 위 (첫 화면) */}
            {onModeChange && (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="fixed top-4 right-4 z-50 flex gap-2"
              >
                <Button
                  onClick={nextSlide}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 !bg-blue-600 !text-white hover:!bg-blue-700 hover:!text-white hover:[&_svg]:!text-white hover:[&_span]:!text-white text-xs px-3 py-1.5 font-semibold shadow-lg !border-0 [&_svg]:!text-white [&_span]:!text-white"
                >
                  <Presentation className="h-3 w-3" />
                  <span className="hidden sm:inline">프레젠테이션</span>
                </Button>
                <Button
                  onClick={() => onModeChange("dashboard")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 !bg-white !backdrop-blur-sm !border-2 !border-gray-300 !text-gray-900 hover:!bg-gray-100 hover:!text-gray-900 hover:[&_svg]:!text-gray-900 hover:[&_span]:!text-gray-900 text-xs px-3 py-1.5 shadow-md hover:shadow-lg transition-all font-semibold [&_svg]:!text-gray-900 [&_span]:!text-gray-900"
                >
                  <Monitor className="h-3 w-3" />
                  <span className="hidden sm:inline">대시보드</span>
                </Button>
                <Button
                  onClick={() => onModeChange("docs")}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-1 !bg-white !backdrop-blur-sm !border-2 !border-gray-300 !text-gray-900 hover:!bg-gray-100 hover:!text-gray-900 hover:[&_svg]:!text-gray-900 hover:[&_span]:!text-gray-900 text-xs px-3 py-1.5 shadow-md hover:shadow-lg transition-all font-semibold [&_svg]:!text-gray-900 [&_span]:!text-gray-900"
                >
                  <FileText className="h-3 w-3" />
                  <span className="hidden sm:inline">설계 문서</span>
                </Button>
              </motion.div>
            )}

            {/* 하단 포인트 텍스트 */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.6 }}
              className="w-full flex items-center justify-center px-4 mb-4 sm:mb-10"
            >
              <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-blue-100 text-center">
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200" />
                <span className="text-xs sm:text-sm font-medium">
                  AI 기반 예측 분석
                </span>
                <span className="hidden sm:inline text-blue-300">
                  •
                </span>
                <span className="text-xs sm:text-sm font-medium">
                  실시간 모니터링
                </span>
                <span className="hidden sm:inline text-blue-300">
                  •
                </span>
                <span className="text-xs sm:text-sm font-medium">
                  자동화 솔루션
                </span>
                <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 text-blue-200" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}

      {/* Content Slides */}
      {currentSlide > 0 && (
        <div className="min-h-screen flex flex-col">
          {/* 모드 선택 셀렉트 박스 - 오른쪽 위 (다른 슬라이드에서) */}
          {onModeChange && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="fixed top-4 right-4 z-50 flex gap-2"
            >
              <Button
                onClick={() => setCurrentSlide(0)}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 !bg-blue-600 !text-white hover:!bg-blue-700 hover:!text-white hover:[&_svg]:!text-white hover:[&_span]:!text-white text-xs px-3 py-1.5 font-semibold shadow-lg !border-0 [&_svg]:!text-white [&_span]:!text-white"
              >
                <Presentation className="h-3 w-3" />
                <span className="hidden sm:inline">프레젠테이션</span>
              </Button>
              <Button
                onClick={() => onModeChange("dashboard")}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 !bg-white !backdrop-blur-sm !border-2 !border-gray-300 !text-gray-900 hover:!bg-gray-100 hover:!text-gray-900 hover:[&_svg]:!text-gray-900 hover:[&_span]:!text-gray-900 text-xs px-3 py-1.5 shadow-md hover:shadow-lg transition-all font-semibold [&_svg]:!text-gray-900 [&_span]:!text-gray-900"
              >
                <Monitor className="h-3 w-3" />
                <span className="hidden sm:inline">대시보드</span>
              </Button>
              <Button
                onClick={() => onModeChange("docs")}
                variant="outline"
                size="sm"
                className="flex items-center gap-1 !bg-white !backdrop-blur-sm !border-2 !border-gray-300 !text-gray-900 hover:!bg-gray-100 hover:!text-gray-900 hover:[&_svg]:!text-gray-900 hover:[&_span]:!text-gray-900 text-xs px-3 py-1.5 shadow-md hover:shadow-lg transition-all font-semibold [&_svg]:!text-gray-900 [&_span]:!text-gray-900"
              >
                <FileText className="h-3 w-3" />
                <span className="hidden sm:inline">설계 문서</span>
              </Button>
            </motion.div>
          )}

          {/* Header */}
          <motion.header
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="pt-16 pb-2 px-2 sm:pt-6 sm:pb-4 sm:px-4 md:px-6 border-b border-white/20"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <div className="flex items-center gap-2 sm:gap-4">
                <div
                  className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full bg-gradient-to-r ${slides[currentSlide].bgColor}`}
                />
                <h1 className="text-lg sm:text-xl md:text-2xl font-semibold">
                  데이터 통합 플랫폼
                </h1>
              </div>
              <div className="flex items-center gap-2 sm:gap-4">
                <span className="text-xs sm:text-sm text-slate-300">
                  {currentSlide} / {slides.length - 1}
                </span>
                <Badge
                  variant="outline"
                  className="border-white/40 text-slate-100 text-xs sm:text-sm px-1 sm:px-2 py-0.5 sm:py-1 font-medium bg-white/5"
                >
                  <span className="hidden sm:inline">
                    {slides[currentSlide].title}
                  </span>
                  <span className="sm:hidden">
                    {slides[currentSlide].title.split(" ")[0]}
                  </span>
                </Badge>
              </div>
            </div>
          </motion.header>

          {/* Progress Bar */}
          <div className="px-2 sm:px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
              <div className="w-full bg-white/20 rounded-full h-1.5 sm:h-2">
                <div
                  className={`h-1.5 sm:h-2 rounded-full transition-all duration-500 bg-gradient-to-r ${slides[currentSlide].bgColor}`}
                  style={{
                    width: `${(currentSlide / (slides.length - 1)) * 100}%`,
                  }}
                />
              </div>
            </div>
          </div>

          {/* Slide Content */}
          <motion.main
            key={currentSlide}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="flex-1 p-2 sm:p-4 md:p-6 overflow-auto"
          >
            <div className="max-w-7xl mx-auto h-full">
              <AnimatePresence mode="wait">
                {slides[currentSlide].component}
              </AnimatePresence>
            </div>
          </motion.main>

          {/* Navigation */}
          <motion.footer
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="p-2 sm:p-4 md:p-6 border-t border-white/20"
          >
            <div className="max-w-7xl mx-auto flex items-center justify-between">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="sm"
                className="border-white/60 bg-white/10 text-slate-100 hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed min-h-[44px] px-3 sm:px-4 touch-manipulation font-medium shadow-sm"
                disabled={currentSlide === 0}
              >
                <ArrowLeft className="mr-1 sm:mr-2 h-4 w-4" />
                <span className="text-sm sm:text-base">
                  이전
                </span>
              </Button>

              <div className="flex items-center gap-1 sm:gap-2">
                {slides.slice(1).map((_, index) => (
                  <button
                    key={index + 1}
                    onClick={() => goToSlide(index + 1)}
                    className={`w-2 h-2 sm:w-3 sm:h-3 rounded-full transition-all duration-300 touch-manipulation ${
                      currentSlide === index + 1
                        ? `bg-gradient-to-r ${slides[currentSlide].bgColor}`
                        : "bg-white/30 hover:bg-white/50"
                    }`}
                  />
                ))}
              </div>

              <Button
                onClick={nextSlide}
                variant="outline"
                size="sm"
                className="border-white/60 bg-white/10 text-slate-100 hover:bg-white/20 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed min-h-[44px] px-3 sm:px-4 touch-manipulation font-medium shadow-sm"
                disabled={currentSlide === slides.length - 1}
              >
                <span className="text-sm sm:text-base">
                  다음
                </span>
                <ArrowRight className="ml-1 sm:ml-2 h-4 w-4" />
              </Button>
            </div>
          </motion.footer>
        </div>
      )}

      {/* Mini Slide Navigator (Bottom Right) - Hidden on mobile */}
      {currentSlide > 0 && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="fixed bottom-16 sm:bottom-20 right-2 sm:right-4 z-50 hidden sm:block"
        >
          <div className="bg-black/30 backdrop-blur-sm border border-white/10 rounded-lg p-1.5 sm:p-2">
            <div className="flex flex-col gap-1">
              {slides.slice(1).map((slide, index) => (
                <button
                  key={index + 1}
                  onClick={() => goToSlide(index + 1)}
                  className={`w-8 sm:w-12 h-1.5 sm:h-2 rounded-full transition-all duration-200 touch-manipulation ${
                    currentSlide === index + 1
                      ? `bg-gradient-to-r ${slides[currentSlide].bgColor} opacity-100`
                      : "bg-white/20 hover:bg-white/40"
                  }`}
                  title={slide.title}
                />
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}