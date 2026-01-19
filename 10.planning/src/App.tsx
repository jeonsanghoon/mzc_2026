import { useState, useEffect } from "react";
import { Button } from "./components/ui/button";
import { Badge } from "./components/ui/badge";
import { Monitor, Presentation, FileText } from "lucide-react";

import { DashboardApp } from "./apps/dashboard/DashboardApp";
import { PresentationApp } from "./apps/presentation/PresentationApp";
import { DocsApp } from "./apps/docs/DocsApp";

export default function App() {
  const [mode, setMode] = useState<
    "solution" | "presentation" | "docs"
  >("presentation");

  // 해시로 모드 감지 및 업데이트
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.slice(1); // # 제거
      
      if (hash.startsWith("presentation")) {
        if (mode !== "presentation") {
          setMode("presentation");
        }
      } else if (hash.startsWith("solution") || hash.startsWith("dashboard")) {
        if (mode !== "solution") {
          setMode("solution");
        }
      } else if (hash.startsWith("docs")) {
        if (mode !== "docs") {
          setMode("docs");
        }
      } else {
        // 기본값: presentation
        if (mode !== "presentation") {
          setMode("presentation");
        }
        if (!hash) {
          window.location.hash = "#presentation";
        }
      }
    };

    // 초기 로드
    handleHashChange();
    
    // 해시 변경 이벤트 리스너
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [mode]);

  // 모드 전환 시 해시 업데이트
  const toggleMode = (
    newMode: "solution" | "presentation" | "docs",
  ) => {
    setMode(newMode);
    // 하위 호환성을 위해 dashboard도 solution으로 변환
    const hashMode = newMode === "solution" ? "solution" : newMode;
    window.location.hash = `#${hashMode}`;
  };

  // 모드 선택 버튼 컴포넌트
  const ModeButtons = () => {
    const baseButtonClass = "flex items-center gap-1 text-xs px-3 py-1.5 font-semibold transition-all [&_svg]:!text-current [&_span]:!text-current";
    const activeButtonClass = "!bg-blue-600 !text-white hover:!bg-blue-700 hover:!text-white hover:[&_svg]:!text-white hover:[&_span]:!text-white shadow-lg !border-0";
    const inactiveButtonClass = "!bg-white !backdrop-blur-sm !border-2 !border-gray-300 !text-gray-900 hover:!bg-gray-100 hover:!text-gray-900 hover:[&_svg]:!text-gray-900 hover:[&_span]:!text-gray-900 shadow-md hover:shadow-lg";

    return (
      <div className="fixed top-4 right-4 z-50 flex gap-2">
        <Button
          onClick={() => toggleMode("presentation")}
          variant="outline"
          size="sm"
          className={`${baseButtonClass} ${mode === "presentation" ? activeButtonClass : inactiveButtonClass}`}
        >
          <Presentation className="h-3 w-3" />
          <span className="hidden sm:inline">프레젠테이션</span>
        </Button>
        <Button
          onClick={() => toggleMode("solution")}
          variant="outline"
          size="sm"
          className={`${baseButtonClass} ${mode === "solution" ? activeButtonClass : inactiveButtonClass}`}
        >
          <Monitor className="h-3 w-3" />
          <span className="hidden sm:inline">솔루션 상세</span>
        </Button>
        <Button
          onClick={() => toggleMode("docs")}
          variant="outline"
          size="sm"
          className={`${baseButtonClass} ${mode === "docs" ? activeButtonClass : inactiveButtonClass}`}
        >
          <FileText className="h-3 w-3" />
          <span className="hidden sm:inline">설계 문서</span>
        </Button>
      </div>
    );
  };

  // 모드 전환 버튼 (개발용)
  if (mode === "solution") {
    return (
      <div>
        <ModeButtons />
        <DashboardApp />
      </div>
    );
  }

  if (mode === "docs") {
    return (
      <div>
        <ModeButtons />
        <DocsApp />
      </div>
    );
  }

  return (
    <div>
      <ModeButtons />
      <PresentationApp onModeChange={toggleMode} currentMode={mode} />
    </div>
  );
}
