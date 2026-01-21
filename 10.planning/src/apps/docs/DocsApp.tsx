import { useState, useEffect, useRef, useCallback, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { Input } from "../../components/ui/input";
import { FileText, BookOpen, GitBranch, ChevronRight, Play, Code2, ZoomIn, ZoomOut, Maximize2, RotateCcw, X, Expand, Target, Flag, Layout, Menu } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import remarkGfm from "remark-gfm";
import mermaid from "mermaid";

type Perspective = "service" | "lab" | "customer" | "all";

const docFiles = [
  {
    id: "project-goals",
    title: "프로젝트 목표",
    description: "🚩 서비스 목적, 운영 목표, 핵심 가치",
    icon: Flag,
    color: "text-blue-600",
    file: "00_PROJECT_GOALS.md",
    perspectives: ["service", "lab", "customer"] as Perspective[],
  },
  {
    id: "frontend-requirements",
    title: "프론트엔드 설계 요건",
    description: "📌 관점별 화면 구성·권한 처리",
    icon: Layout,
    color: "text-amber-600",
    file: "00_FRONTEND_REQUIREMENTS.md",
    perspectives: ["service", "lab", "customer"] as Perspective[],
  },
  {
    id: "data-goals",
    title: "명확한 데이터 목표 (8개)",
    description: "🎯 데이터 관점 핵심 목표",
    icon: Target,
    color: "text-indigo-600",
    file: "00_DATA_GOALS.md",
    perspectives: ["service", "lab", "customer"] as Perspective[],
  },
  {
    id: "design-guide",
    title: "0. 설계 문서 가이드",
    description: "📖 시작점: 문서 읽는 순서 안내, 전체 시스템 흐름 요약, 예시 시나리오",
    icon: BookOpen,
    color: "text-slate-700",
    file: "DESIGN_GUIDE.md",
    perspectives: ["service", "lab", "customer"] as Perspective[],
  },
  {
    id: "service-overview",
    title: "1. 서비스 개요",
    description: "💼 비즈니스 관점: 서비스 가치, 해결 문제, KPI 개선, 비즈니스 모델",
    icon: FileText,
    color: "text-blue-600",
    file: "SERVICE_OVERVIEW.md",
    perspectives: ["service", "customer"] as Perspective[],
  },
  {
    id: "process-flow",
    title: "2. 프로세스 플로우",
    description: "🔄 시스템 흐름: 데이터 수집→처리→저장→분석→제어 전체 프로세스 (다이어그램)",
    icon: GitBranch,
    color: "text-green-600",
    file: "PROCESS_FLOW.md",
    perspectives: ["lab", "service"] as Perspective[],
  },
  {
    id: "project-analysis",
    title: "3. 기술 분석",
    description: "⚙️ 기술 상세: 기술 스택 선택 근거, CQRS 패턴, 인프라 구성, 구현 상세",
    icon: BookOpen,
    color: "text-purple-600",
    file: "PROJECT_ANALYSIS.md",
    perspectives: ["lab"] as Perspective[],
  },
  {
    id: "readme",
    title: "4. 웹 애플리케이션 가이드",
    description: "🌐 서비스 관점: 고객이 사용하는 웹 화면(프레젠테이션/대시보드/설계 문서), 접속·이용 방법",
    icon: FileText,
    color: "text-orange-600",
    file: "README.md",
    perspectives: ["service", "customer"] as Perspective[],
  },
];

// 프로젝트 구성 다이어그램 - 3개 섹션으로 분리하여 각각 크게 표시
function ProjectStructureDiagram() {
  return (
    <div className="w-full max-w-[1200px] mx-auto my-8 space-y-8">
      {/* 섹션 1: 설계 문서 */}
      <Card className="bg-blue-50 border-2 border-blue-300">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="text-2xl">📄</span>
            <span>설계 문서 (00.doc/)</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-700 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-slate-800 transition-colors">
              설계 문서 가이드
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              서비스 개요
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              프로세스 플로우
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              기술 분석
            </div>
            <div className="bg-orange-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-orange-600 transition-colors">
              웹 앱 가이드
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 섹션 2: 웹 애플리케이션 및 모드 */}
      <Card className="bg-green-50 border-2 border-green-300">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="text-2xl">🌐</span>
            <span>웹 애플리케이션 (Vite + React)</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* App.tsx */}
          <div className="flex justify-center">
            <div className="bg-green-600 text-white px-8 py-4 rounded-lg font-bold text-lg">
              App.tsx (모드 전환)
            </div>
          </div>
          
          {/* 3가지 모드 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-green-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-green-600 transition-colors">
              솔루션 상세 모드
            </div>
            <div className="bg-orange-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-orange-600 transition-colors">
              프레젠테이션 모드
            </div>
            <div className="bg-purple-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-purple-600 transition-colors">
              설계 문서 모드
            </div>
          </div>
        </CardContent>
      </Card>

      {/* 섹션 3: 솔루션 상세 Frame 및 프레젠테이션 Slide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 솔루션 상세 Frame */}
        <Card className="bg-green-50 border-2 border-green-300">
          <CardHeader>
            <CardTitle className="text-lg">솔루션 상세 모드 - 7개 Frame</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 첫 번째 행 (4개) */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-green-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-green-500 transition-colors">
                  Frame 1<br/>
                  <span className="text-xs">문제정의</span>
                </div>
                <div className="bg-green-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-green-500 transition-colors">
                  Frame 2<br/>
                  <span className="text-xs">표준화</span>
                </div>
                <div className="bg-green-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-green-500 transition-colors">
                  Frame 3<br/>
                  <span className="text-xs">통합플랫폼</span>
                </div>
                <div className="bg-green-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-green-500 transition-colors">
                  Frame 4<br/>
                  <span className="text-xs">모니터링</span>
                </div>
              </div>
              {/* 두 번째 행 (3개) */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-green-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-green-500 transition-colors">
                  Frame 5<br/>
                  <span className="text-xs">자동제어</span>
                </div>
                <div className="bg-green-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-green-500 transition-colors">
                  Frame 6<br/>
                  <span className="text-xs">지능분석</span>
                </div>
                <div className="bg-green-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-green-500 transition-colors">
                  Frame 7<br/>
                  <span className="text-xs">활용확장</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 프레젠테이션 Slide */}
        <Card className="bg-orange-50 border-2 border-orange-300">
          <CardHeader>
            <CardTitle className="text-lg">프레젠테이션 모드 - 7개 Slide</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {/* 첫 번째 행 (4개) */}
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-orange-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-orange-500 transition-colors">
                  Slide 1<br/>
                  <span className="text-xs">제목</span>
                </div>
                <div className="bg-orange-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-orange-500 transition-colors">
                  Slide 2<br/>
                  <span className="text-xs">문제점</span>
                </div>
                <div className="bg-orange-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-orange-500 transition-colors">
                  Slide 3<br/>
                  <span className="text-xs">솔루션</span>
                </div>
                <div className="bg-orange-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-orange-500 transition-colors">
                  Slide 4<br/>
                  <span className="text-xs">아키텍처</span>
                </div>
              </div>
              {/* 두 번째 행 (3개) */}
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-orange-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-orange-500 transition-colors">
                  Slide 5<br/>
                  <span className="text-xs">이점</span>
                </div>
                <div className="bg-orange-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-orange-500 transition-colors">
                  Slide 6<br/>
                  <span className="text-xs">로드맵</span>
                </div>
                <div className="bg-orange-400 text-gray-900 px-3 py-4 rounded-lg text-center font-medium text-sm hover:bg-orange-500 transition-colors">
                  Slide 7<br/>
                  <span className="text-xs">ROI</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 섹션 4: 문서 뷰어 */}
      <Card className="bg-purple-50 border-2 border-purple-300">
        <CardHeader>
          <CardTitle className="text-xl flex items-center gap-2">
            <span className="text-2xl">📖</span>
            <span>문서 뷰어</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="bg-slate-700 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-slate-800 transition-colors">
              설계 문서 가이드
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              서비스 개요
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              프로세스 플로우
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              기술 분석
            </div>
            <div className="bg-orange-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-orange-600 transition-colors">
              웹 앱 가이드
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Mermaid 다이어그램 컴포넌트 - 확대/축소 및 전체 보기 기능 포함
function MermaidDiagram({ diagram }: { diagram: string }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const fullscreenContainerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);
  const fullscreenSvgRef = useRef<SVGSVGElement | null>(null);
  const [svgContent, setSvgContent] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [isRendering, setIsRendering] = useState(false);
  const [zoom, setZoom] = useState(1.0); // 기본 100% 줌으로 설정
  const [fullscreenZoom, setFullscreenZoom] = useState(1);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [originalViewBox, setOriginalViewBox] = useState<string>("");
  const [zoomInput, setZoomInput] = useState<string>("100"); // 줌 입력 필드 값
  const [fullscreenZoomInput, setFullscreenZoomInput] = useState<string>("100"); // 전체화면 줌 입력 필드 값
  // 줌 값이 변경될 때 입력 필드 업데이트
  useEffect(() => {
    setZoomInput(Math.round(zoom * 100).toString());
  }, [zoom]);
  
  useEffect(() => {
    setFullscreenZoomInput(Math.round(fullscreenZoom * 100).toString());
  }, [fullscreenZoom]);
  
  // 드래그 상태
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [fullscreenPosition, setFullscreenPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStateRef = useRef({
    isDragging: false,
    isFullscreen: false,
    startClientX: 0,
    startClientY: 0,
    startPosX: 0,
    startPosY: 0,
  });

  useEffect(() => {
    if (!diagram) return;
    
    setIsRendering(true);
    setError("");
    setSvgContent("");
    setZoom(1.0); // 기본 100% 줌으로 설정
    setFullscreenZoom(1);
    setIsFullscreenOpen(false);
    setPosition({ x: 0, y: 0 });
    setFullscreenPosition({ x: 0, y: 0 });
    
    const diagramCode = diagram.trim();
    const uniqueId = `mermaid-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    // "프로젝트 구성" 다이어그램 감지
    const isProjectStructure = diagramCode.includes("프로젝트 구성") || diagramCode.includes("프로젝트구성");

    // Mermaid render API 사용 - 더 안정적
    const renderDiagram = async () => {
      try {
        // Mermaid 초기화 확인
        if (typeof mermaid === 'undefined' || !mermaid.render) {
          throw new Error("Mermaid 라이브러리가 로드되지 않았습니다.");
        }

        // 큰 흐름 다이어그램인지 확인
        const isLargeFlow = diagram.trim().includes("큰 흐름") || 
                           diagram.trim().includes("End-to-End") ||
                           diagram.trim().includes("end-to-end") ||
                           diagram.trim().includes("전체 설계 흐름");

        // 모든 다이어그램에 반응형 설정 적용
        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
          flowchart: {
            useMaxWidth: true,
            htmlLabels: true,
            curve: "basis",
            // 큰 흐름 다이어그램은 크기를 줄임
            nodeSpacing: isLargeFlow ? 30 : (isProjectStructure ? 80 : 50),
            rankSpacing: isLargeFlow ? 50 : (isProjectStructure ? 100 : 80),
            padding: isLargeFlow ? 10 : (isProjectStructure ? 40 : 20),
            defaultRenderer: "dagre-wrapper",
            diagramPadding: isLargeFlow ? 5 : (isProjectStructure ? 30 : 10),
          },
          themeVariables: {
            // 배경·서브그래프 (알록달록 기초)
            mainBkg: "#ffffff",
            secondBkg: "#e9d5ff",
            tertiaryBkg: "#fce7f3",
            // 텍스트
            primaryTextColor: "#1e293b",
            secondaryTextColor: "#334155",
            textColor: "#1e293b",
            // 노드 채우기 (명분별 다양하게)
            primaryColor: "#dbeafe",
            secondaryColor: "#dcfce7",
            tertiaryColor: "#ffedd5",
            // 노드 테두리 (도형 경계 선명)
            primaryBorderColor: "#3b82f6",
            secondaryBorderColor: "#22c55e",
            tertiaryBorderColor: "#f97316",
            // 화살표/연결선
            lineColor: "#475569",
            arrowheadColor: "#475569",
            noteBorderColor: "#64748b",
            actorBorder: "#475569",
            actorLineColor: "#475569",
            labelBoxBorderColor: "#64748b",
            activationBorderColor: "#3b82f6",
            doneBorderColor: "#22c55e",
            activeBorderColor: "#f97316",
            activeTaskBorderColor: "#f97316",
            doneTaskBorderColor: "#22c55e",
            critBorderColor: "#dc2626",
            todayLineColor: "#475569",
            gridColor: "#cbd5e1",
          },
        });

        // render API 사용
        const result = await mermaid.render(uniqueId, diagramCode);
        
        if (!result || !result.svg) {
          throw new Error("SVG 생성 실패");
        }

        // SVG 파싱
        const parser = new DOMParser();
        const svgDoc = parser.parseFromString(result.svg, "image/svg+xml");
        const svgElement = svgDoc.documentElement;
        
        if (!svgElement || svgElement.tagName !== 'svg') {
          throw new Error("SVG 파싱 실패");
        }
        
        // 즉시 모든 rect 요소를 확인하고 배경을 흰색으로 변경
        const immediateRects = svgElement.querySelectorAll('rect');
        immediateRects.forEach((rect: Element) => {
          const r = rect as SVGRectElement;
          const fill = r.getAttribute('fill');
          const style = r.getAttribute('style');
          
          // fill 속성이 있으면 무조건 확인
          if (fill && fill !== 'none' && fill !== 'transparent') {
            // 파란색 계열이거나 어두운 색이면 흰색으로 변경
            const fillLower = fill.toLowerCase();
            if (fillLower.includes('#00') || fillLower.includes('rgb(0') || fillLower.includes('rgb(')) {
              // RGB 값 확인
              let isDark = false;
              if (fillLower.startsWith('#')) {
                const hex = fillLower.replace('#', '');
                if (hex.length === 6) {
                  const r = parseInt(hex.substr(0, 2), 16);
                  const g = parseInt(hex.substr(2, 2), 16);
                  const b = parseInt(hex.substr(4, 2), 16);
                  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                  isDark = brightness < 120;
                }
              } else {
                const rgbMatch = fillLower.match(/rgb\((\d+),\s*(\d+),\s*(\d+)/);
                if (rgbMatch) {
                  const r = parseInt(rgbMatch[1]);
                  const g = parseInt(rgbMatch[2]);
                  const b = parseInt(rgbMatch[3]);
                  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
                  isDark = brightness < 120;
                }
              }
              
              if (isDark) {
                r.setAttribute('fill', '#ffffff');
              }
            }
          }
          
          // style 속성도 확인
          if (style && style.includes('fill')) {
            const fillMatch = style.match(/fill:\s*([^;]+)/i);
            if (fillMatch) {
              const fillValue = fillMatch[1].trim().toLowerCase();
              if (fillValue.includes('#00') || fillValue.includes('rgb(0')) {
                let newStyle = style.replace(/fill:\s*[^;]+/gi, 'fill:#ffffff');
                r.setAttribute('style', newStyle);
                r.setAttribute('fill', '#ffffff');
              }
            }
          }
        });
        
        // 좌우폭 넓은 다이어그램: SVG에도 최대 1200px 적용 (전체 파이프라인 등)
        const isWideFromContent = diagramCode.includes("AWS 클라우드") ||
          diagramCode.includes("전체 데이터 파이프라인") || diagramCode.includes("전체 파이프라인 구성도") ||
          diagramCode.includes("전체 파이프라인") ||
          (diagramCode.includes("기존시스템") && diagramCode.includes("게이트웨이"));

        // viewBox 저장 (원본 크기 보존)
        const viewBox = svgElement.getAttribute("viewBox");
        if (viewBox) {
          setOriginalViewBox(viewBox);
          const parts = viewBox.split(" ");
          if (parts.length >= 4) {
            const width = parseFloat(parts[2]);
            const height = parseFloat(parts[3]);
            
            if (width && height && width > 0) {
              if (isProjectStructure) {
                // "프로젝트 구성" 다이어그램: SVG 구조 완전 재구성
                
                // 1. 모든 그래프 요소 찾기 (노드, 엣지 등)
                const allGroups = svgElement.querySelectorAll('g');
                const nodeGroups: Array<{ element: Element; bbox: DOMRect | null }> = [];
                
                allGroups.forEach((group) => {
                  // Mermaid의 노드는 보통 rect나 polygon을 포함
                  const hasShape = group.querySelector('rect, polygon, ellipse, circle');
                  if (hasShape) {
                    const bbox = (group as SVGGElement).getBBox();
                    if (bbox.width > 0 && bbox.height > 0) {
                      nodeGroups.push({ element: group, bbox });
                    }
                  }
                });
                
                // 2. 가로로 길게 배치된 경우 세로로 재구성
                if (width > height * 1.3 && nodeGroups.length > 0) {
                  // 노드들을 Y 좌표 기준으로 정렬
                  nodeGroups.sort((a, b) => {
                    if (!a.bbox || !b.bbox) return 0;
                    return a.bbox.y - b.bbox.y;
                  });
                  
                  // 세로 배치를 위한 새로운 레이아웃
                  const centerX = 400; // 고정된 중심 X 좌표
                  const verticalSpacing = 100;
                  let currentY = 80;
                  
                  // 각 노드를 세로로 재배치
                  nodeGroups.forEach((nodeGroup) => {
                    const gElement = nodeGroup.element as SVGGElement;
                    const currentTransform = gElement.getAttribute('transform') || '';
                    
                    // 기존 transform에서 translate 값 추출
                    let translateX = 0;
                    let translateY = 0;
                    const translateMatch = currentTransform.match(/translate\(([^,]+),([^)]+)\)/);
                    if (translateMatch) {
                      translateX = parseFloat(translateMatch[1]) || 0;
                      translateY = parseFloat(translateMatch[2]) || 0;
                    }
                    
                    // 새로운 위치로 재배치
                    const newTransform = `translate(${centerX - (nodeGroup.bbox?.width || 0) / 2}, ${currentY})`;
                    gElement.setAttribute('transform', newTransform);
                    
                    if (nodeGroup.bbox) {
                      currentY += nodeGroup.bbox.height + verticalSpacing;
                    }
                  });
                  
                  // 엣지(연결선)도 재배치 필요 - 간단하게는 viewBox만 조정
                  const newHeight = currentY + 100;
                  const newViewBox = `0 0 800 ${newHeight}`;
                  svgElement.setAttribute("viewBox", newViewBox);
                  
                  // 최종 크기 설정
                  const maxWidth = 600;
                  svgElement.setAttribute("width", String(maxWidth));
                  svgElement.setAttribute("height", String((newHeight / 800) * maxWidth));
                } else {
                  // 이미 세로 배치인 경우 크기만 조정
                  const maxWidth = 600;
                  let scale = 1.0;
                  if (width > maxWidth) {
                    scale = maxWidth / width;
                  }
                  
                  svgElement.setAttribute("width", String(width * scale));
                  svgElement.setAttribute("height", String(height * scale));
                }
                
                // 스타일 설정
                svgElement.style.width = "100%";
                svgElement.style.height = "auto";
                svgElement.style.maxWidth = "600px";
                svgElement.style.margin = "0 auto";
              } else {
                // 일반 다이어그램: 좌우폭 넓으면 1200px, 아니면 800px
                const isWideByRatio = width > height * 1.2;
                const maxWidth = (isWideFromContent || isWideByRatio) ? 1200 : 800;
                const baseScale = 1.2;
                
                let scale = baseScale;
                if (width * baseScale > maxWidth) {
                  scale = maxWidth / width;
                }
                
                const targetWidth = width * scale;
                const targetHeight = height * scale;
                
                svgElement.setAttribute("width", String(targetWidth));
                svgElement.setAttribute("height", String(targetHeight));
                svgElement.style.width = "100%";
                svgElement.style.height = "auto";
                svgElement.style.maxWidth = `${maxWidth}px`;
                svgElement.style.margin = "0 auto";
              }
            }
          }
        } else {
          // viewBox가 없으면 기본 크기 설정
          if (isProjectStructure) {
            svgElement.style.width = "100%";
            svgElement.style.height = "auto";
            svgElement.style.maxWidth = "600px";
            svgElement.style.margin = "0 auto";
          } else {
            const maxWidth = isWideFromContent ? 1200 : 800;
            svgElement.style.width = "100%";
            svgElement.style.height = "auto";
            svgElement.style.maxWidth = `${maxWidth}px`;
            svgElement.style.margin = "0 auto";
          }
        }
        
        // SVG 배경을 흰색으로 강제 설정
        svgElement.style.backgroundColor = "#ffffff";
        svgElement.style.background = "#ffffff";
        svgElement.setAttribute('style', `${svgElement.getAttribute('style') || ''}; background-color: #ffffff; background: #ffffff;`);
        
        // 어두운 색상을 감지하는 함수 (검은색, 어두운 파란색 등 모든 어두운 색상)
        const isDarkColor = (color: string): boolean => {
          if (!color || color === 'none' || color === 'transparent') return false;
          const normalized = color.toLowerCase().trim();
          
          // 명시적인 검은색/어두운 색상
          if (normalized === 'black' || normalized === '#000' || normalized === '#000000' || 
              normalized === 'rgb(0,0,0)' || normalized === 'rgb(0, 0, 0)') {
            return true;
          }
          
          // 어두운 파란색 계열 (#001xxx ~ #004xxx, #00a ~ #00f 등)
          if (normalized.startsWith('#') && normalized.length >= 4) {
            // #001234 형태
            if (normalized.length === 7) {
              const r = parseInt(normalized.substr(1, 2), 16);
              const g = parseInt(normalized.substr(3, 2), 16);
              const b = parseInt(normalized.substr(5, 2), 16);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              return brightness < 90; // 밝기 90 미만만 어두운 색(테두리 등 명확한 색 보존)
            }
            // #001 형태 (짧은 형식)
            if (normalized.length === 4) {
              const first = normalized[1];
              if (first === '0' || first === '1' || first === '2' || first === '3' || first === '4') {
                return true;
              }
            }
          }
          
          // rgb/rgba 값 파싱
          const rgbMatch = normalized.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness < 90;
          }
          
          return false;
        };
        
        // SVG 내부의 모든 어두운 배경 요소만 흰색으로 변경 (화살표는 제외)
        const allElements = svgElement.querySelectorAll('*');
        allElements.forEach((element: Element) => {
          const svgEl = element as SVGElement;
          const tagName = svgEl.tagName.toLowerCase();
          const fill = svgEl.getAttribute('fill');
          const stroke = svgEl.getAttribute('stroke');
          const strokeWidth = svgEl.getAttribute('stroke-width');
          const style = svgEl.getAttribute('style');
          
          // 화살표/선 요소는 제외 (path, line, polyline, polygon 등)
          const isArrowOrLine = tagName === 'path' || tagName === 'line' || 
                                 tagName === 'polyline' || tagName === 'polygon' ||
                                 svgEl.classList.contains('edge') || 
                                 svgEl.classList.contains('edgePath') ||
                                 svgEl.getAttribute('class')?.includes('edge');
          
          // fill 속성이 어두운 색상인 경우 흰색으로 변경 (배경만)
          if (fill && isDarkColor(fill) && !isArrowOrLine) {
            // rect 요소이거나 배경으로 사용되는 경우만
            if (tagName === 'rect' || tagName === 'circle' || tagName === 'ellipse') {
              svgEl.setAttribute('fill', '#ffffff');
            }
          }
          
          // stroke는 화살표/선이 아닌 경우에만 처리
          if (stroke && isDarkColor(stroke) && !isArrowOrLine) {
            // 노드 테두리는 회색으로 변경
            if (tagName === 'rect' || tagName === 'circle' || tagName === 'ellipse' || tagName === 'polygon') {
              svgEl.setAttribute('stroke', '#dee2e6');
            }
          }
          
          // stroke-width가 너무 두꺼운 경우 줄이기 (4 이상이면 1 또는 0.5로)
          if (strokeWidth) {
            const width = parseFloat(strokeWidth);
            if (width > 3) {
              svgEl.setAttribute('stroke-width', '1');
            } else if (width > 1) {
              svgEl.setAttribute('stroke-width', '0.5');
            }
          }
          
          // style 속성에 어두운 fill/stroke가 있는 경우 흰색으로 변경
          if (style) {
            let newStyle = style;
            
            // fill 속성 추출 및 변경
            const fillMatch = style.match(/fill:\s*([^;]+)/gi);
            if (fillMatch) {
              fillMatch.forEach(match => {
                const colorValue = match.replace(/fill:\s*/i, '').trim();
                if (isDarkColor(colorValue)) {
                  newStyle = newStyle.replace(match, 'fill:#ffffff');
                }
              });
            }
            
            // stroke 속성 추출 및 변경
            const strokeMatch = style.match(/stroke:\s*([^;]+)/gi);
            if (strokeMatch) {
              strokeMatch.forEach(match => {
                const colorValue = match.replace(/stroke:\s*/i, '').trim();
                if (isDarkColor(colorValue)) {
                  newStyle = newStyle.replace(match, 'stroke:#ffffff');
                }
              });
            }
            
            // stroke-width 속성 조정
            newStyle = newStyle.replace(/stroke-width:\s*(\d+\.?\d*)/gi, (match, width) => {
              const w = parseFloat(width);
              if (w > 3) {
                return 'stroke-width:1';
              } else if (w > 1) {
                return 'stroke-width:0.5';
              }
              return match;
            });
            
            // 일반적인 검은색 패턴도 변경
            newStyle = newStyle
              .replace(/fill:\s*black/gi, 'fill:#ffffff')
              .replace(/fill:\s*#000(?!\d)/gi, 'fill:#ffffff')
              .replace(/fill:\s*#000000/gi, 'fill:#ffffff')
              .replace(/fill:\s*rgb\(0,\s*0,\s*0\)/gi, 'fill:#ffffff')
              .replace(/fill:\s*rgb\(0,0,0\)/gi, 'fill:#ffffff')
              .replace(/stroke:\s*black/gi, 'stroke:#ffffff')
              .replace(/stroke:\s*#000(?!\d)/gi, 'stroke:#ffffff')
              .replace(/stroke:\s*#000000/gi, 'stroke:#ffffff')
              .replace(/stroke:\s*rgb\(0,\s*0,\s*0\)/gi, 'stroke:#ffffff')
              .replace(/stroke:\s*rgb\(0,0,0\)/gi, 'stroke:#ffffff');
            
            if (newStyle !== style) {
              svgEl.setAttribute('style', newStyle);
            }
          }
        });
        
        // 큰 배경 rect 요소 찾아서 흰색으로 변경 (Mermaid가 생성하는 배경 레이어)
        const allRects = svgElement.querySelectorAll('rect');
        const rectViewBoxStr = svgElement.getAttribute('viewBox');
        let vbWidth = 0, vbHeight = 0;
        
        if (rectViewBoxStr) {
          const parts = rectViewBoxStr.split(' ').map(Number);
          if (parts.length >= 4) {
            vbWidth = parts[2];
            vbHeight = parts[3];
          }
        }
        
        allRects.forEach((rect: Element) => {
          const r = rect as SVGRectElement;
          const rectWidth = parseFloat(r.getAttribute('width') || '0');
          const rectHeight = parseFloat(r.getAttribute('height') || '0');
          const fill = r.getAttribute('fill');
          const x = parseFloat(r.getAttribute('x') || '0');
          const y = parseFloat(r.getAttribute('y') || '0');
          
          // 배경으로 간주하는 조건:
          // 1. 전체 크기의 80% 이상인 매우 큰 rect (명확한 배경)
          // 2. x=0, y=0이고 크기가 매우 큰 rect
          // 3. fill이 어두운 색상이고 전체 크기의 70% 이상인 rect
          const isLargeBackground = vbWidth > 0 && vbHeight > 0 && 
                                   (rectWidth >= vbWidth * 0.8 && rectHeight >= vbHeight * 0.8);
          const isCornerBackground = x <= 5 && y <= 5 && rectWidth >= vbWidth * 0.7 && rectHeight >= vbHeight * 0.7;
          const hasDarkFillAndLarge = fill && isDarkColor(fill) && vbWidth > 0 && vbHeight > 0 &&
                                     (rectWidth >= vbWidth * 0.75 && rectHeight >= vbHeight * 0.75);
          
          // 배경으로 판단되는 경우만 흰색으로 변경
          if (isLargeBackground || isCornerBackground || hasDarkFillAndLarge) {
            // 배경 rect를 강제로 흰색으로 변경
            r.setAttribute('fill', '#ffffff');
            const style = r.getAttribute('style') || '';
            let newStyle = style.replace(/fill:\s*[^;]+/gi, 'fill:#ffffff');
            if (!newStyle.includes('fill')) {
              newStyle = newStyle ? `${newStyle}; fill:#ffffff` : 'fill:#ffffff';
            }
            r.setAttribute('style', newStyle);
          }
        });
        
        // 추가: 모든 rect 중에서 fill이 없는 경우에도 어두운 색상이 style에 있을 수 있음
        allRects.forEach((rect: Element) => {
          const r = rect as SVGRectElement;
          const style = r.getAttribute('style');
          if (style) {
            const fillMatch = style.match(/fill:\s*([^;]+)/i);
            if (fillMatch) {
              const fillColor = fillMatch[1].trim();
              if (isDarkColor(fillColor)) {
                let newStyle = style.replace(/fill:\s*[^;]+/gi, 'fill:#ffffff');
                r.setAttribute('style', newStyle);
                r.setAttribute('fill', '#ffffff');
              }
            }
          }
        });
        
        // SVG 루트에 흰색 배경 rect를 맨 앞에 추가 (모든 요소 위에)
        const svgViewBox = svgElement.getAttribute('viewBox');
        if (svgViewBox) {
          const [, , svgWidth, svgHeight] = svgViewBox.split(' ').map(Number);
          if (svgWidth && svgHeight) {
            // 기존 배경 rect 제거
            const existingBg = svgElement.querySelector('rect[data-background]');
            if (existingBg) {
              existingBg.remove();
            }
            
            // 새로운 흰색 배경 rect 추가
            const bgRect = svgDoc.createElementNS('http://www.w3.org/2000/svg', 'rect');
            bgRect.setAttribute('x', '0');
            bgRect.setAttribute('y', '0');
            bgRect.setAttribute('width', String(svgWidth));
            bgRect.setAttribute('height', String(svgHeight));
            bgRect.setAttribute('fill', '#ffffff');
            bgRect.setAttribute('data-background', 'true');
            bgRect.setAttribute('style', 'fill:#ffffff;');
            // 맨 앞에 삽입
            if (svgElement.firstChild) {
              svgElement.insertBefore(bgRect, svgElement.firstChild);
            } else {
              svgElement.appendChild(bgRect);
            }
          }
        }
        
        // 명분에 맞게 노드 도형 알록달록 색상 적용 (수집=파랑, 저장=초록, 처리=보라, 알람=노랑, 제어=청록, 분석=핑크 등)
        const vbStr = svgElement.getAttribute('viewBox');
        let vbW = 1e9, vbH = 1e9;
        if (vbStr) {
          const p = vbStr.trim().split(/\s+/).map(Number);
          if (p.length >= 4) { vbW = p[2]; vbH = p[3]; }
        }
        const purposeColors: [RegExp, string][] = [
          [/\b(수집|ingest|수신|gateway|게이트웨이|vpn|터널|kinesis|스트리밍|어댑터|tcp|mqtt|rest|ecs|iot\s*core)\b/gi, '#dbeafe'],
          [/\b(저장|storage|documentdb|s3|aurora|raw|warm|cold|layer|iceberg|athena|firehose)\b/gi, '#dcfce7'],
          [/\b(처리|process|lambda|변환|분류|convert|classify|컨버트|aggregate|집계)\b/gi, '#e9d5ff'],
          [/\b(알람|alarm|alert|룰|rule|rules|에스컬레이션|sns)\b/gi, '#fef3c7'],
          [/\b(제어|control|shadow|ota|fota|펌웨어|원격)\b/gi, '#ccfbf1'],
          [/\b(분석|analysis|ai|bedrock|sagemaker|이상|rca|예측|predictive)\b/gi, '#fce7f3'],
          [/\b(모니터링|monitor|대시보드|cloudwatch)\b/gi, '#e0e7ff'],
          [/\b(기초|마스터|master|기초정보|조인|site|고객)\b/gi, '#f1f5f9'],
          [/\b(기사|as\s|출동|field\s*service)\b/gi, '#ffedd5'],
          [/\b(eventbridge|이벤트|event)\b/gi, '#f3e8ff'],
          [/\b(플랫폼|platform|통합|integrat)\b/gi, '#fef9c3'],
          [/\b(온프레미스|onprem|legacy|기존)\b/gi, '#e0f2fe'],
          [/\b(보안|security|cognito|secrets)\b/gi, '#fef2f2'],
        ];
        svgElement.querySelectorAll('g').forEach((g) => {
          const cls = (g.getAttribute('class') || '') + (g.getAttribute('id') || '');
          if (/edge|edgePath|link|cluster/i.test(cls)) return;
          const shape = g.querySelector('rect, polygon, ellipse');
          if (!shape) return;
          const r = shape as SVGGraphicsElement;
          const w = parseFloat(r.getAttribute('width') || '0') || (r.getBBox?.()?.width ?? 0);
          const h = parseFloat(r.getAttribute('height') || '0') || (r.getBBox?.()?.height ?? 0);
          if (vbW < 1e8 && vbH < 1e8 && w >= vbW * 0.7 && h >= vbH * 0.7) return;
          const text = (g.textContent || '').replace(/\s+/g, ' ').trim();
          let color = '#fef3c7';
          for (const [re, c] of purposeColors) {
            if (re.test(text)) { color = c; break; }
          }
          r.setAttribute('fill', color);
          const st = r.getAttribute('style') || '';
          if (st.includes('fill:')) r.setAttribute('style', st.replace(/fill:\s*[^;]+/gi, `fill:${color}`));
          else if (st) r.setAttribute('style', st + `; fill:${color}`);
          else r.setAttribute('style', `fill:${color}`);
        });

        // SVG에 id 추가 (참조용)
        svgElement.setAttribute("data-mermaid-diagram", "true");
        
        setSvgContent(svgElement.outerHTML);
        setIsRendering(false);
      } catch (err: any) {
        const errorMsg = err?.message || String(err) || "다이어그램 렌더링 실패";
        setError(errorMsg);
        console.error("Mermaid render error:", err);
        console.error("Diagram code (first 500 chars):", diagramCode.substring(0, 500));
        setIsRendering(false);
      }
    };

    // DOM이 준비된 후 렌더링
    const timer = setTimeout(() => {
      renderDiagram();
    }, 50);

    return () => {
      clearTimeout(timer);
    };
  }, [diagram]);

  // SVG 렌더링 후 참조 설정 및 배경 흰색 강제 적용
  useEffect(() => {
    if (svgContent) {
      const applyWhiteBackground = (svgElement: SVGSVGElement | null) => {
        if (!svgElement) return;
        
        // SVG 배경 흰색으로 강제 설정
        svgElement.style.backgroundColor = "#ffffff";
        svgElement.style.background = "#ffffff";
        
        // SVG 내부의 어두운 배경 요소 찾아서 흰색으로 변경 (화살표는 제외)
        const isDarkColor = (color: string): boolean => {
          if (!color || color === 'none' || color === 'transparent') return false;
          const normalized = color.toLowerCase().trim();
          
          // 명시적인 검은색/어두운 색상
          if (normalized === 'black' || normalized === '#000' || normalized === '#000000' || 
              normalized === 'rgb(0,0,0)' || normalized === 'rgb(0, 0, 0)') {
            return true;
          }
          
          // 어두운 파란색 계열 (#001xxx ~ #004xxx 등)
          if (normalized.startsWith('#') && normalized.length >= 4) {
            if (normalized.length === 7) {
              const r = parseInt(normalized.substr(1, 2), 16);
              const g = parseInt(normalized.substr(3, 2), 16);
              const b = parseInt(normalized.substr(5, 2), 16);
              const brightness = (r * 299 + g * 587 + b * 114) / 1000;
              return brightness < 90; // 밝기 90 미만만 어두운 색(테두리 등 명확한 색 보존)
            }
            if (normalized.length === 4) {
              const first = normalized[1];
              if (first === '0' || first === '1' || first === '2' || first === '3' || first === '4') {
                return true;
              }
            }
          }
          
          // rgb/rgba 값 파싱
          const rgbMatch = normalized.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*[\d.]+)?\)/);
          if (rgbMatch) {
            const r = parseInt(rgbMatch[1]);
            const g = parseInt(rgbMatch[2]);
            const b = parseInt(rgbMatch[3]);
            const brightness = (r * 299 + g * 587 + b * 114) / 1000;
            return brightness < 90; // 밝기 90 미만만 어두운 색(테두리 등 명확한 색 보존)
          }
          
          return false;
        };
        
        // 모든 SVG 요소 확인 (rect, path, line, polygon 등)
        const allElements = svgElement.querySelectorAll('*');
        allElements.forEach((element: Element) => {
          const svgEl = element as SVGElement;
          const tagName = svgEl.tagName.toLowerCase();
          const fill = svgEl.getAttribute('fill');
          const stroke = svgEl.getAttribute('stroke');
          const strokeWidth = svgEl.getAttribute('stroke-width');
          const style = svgEl.getAttribute('style');
          const className = svgEl.getAttribute('class') || '';
          
          // 화살표/선 요소인지 확인
          const isArrowOrLine = tagName === 'path' || tagName === 'line' || 
                               tagName === 'polyline' || 
                               className.includes('edge') || 
                               className.includes('edgePath') ||
                               className.includes('flowchart-link') ||
                               className.includes('arrowheadPath');
          
          // fill 속성 처리 (배경만)
          if (fill && isDarkColor(fill) && !isArrowOrLine) {
            // rect, circle, ellipse 등 배경 요소만
            if (tagName === 'rect' || tagName === 'circle' || tagName === 'ellipse' || tagName === 'polygon') {
              svgEl.setAttribute('fill', '#ffffff');
            }
          }
          
          // stroke 속성 처리 (화살표는 보존, 노드 테두리는 회색)
          if (stroke && !isArrowOrLine) {
            if (tagName === 'rect' || tagName === 'circle' || tagName === 'ellipse' || tagName === 'polygon') {
              // 노드 테두리는 연한 회색
              if (isDarkColor(stroke)) {
                svgEl.setAttribute('stroke', '#dee2e6');
              }
            }
          }
          
          // stroke-width 조정 (화살표는 제외)
          if (strokeWidth && !isArrowOrLine) {
            const width = parseFloat(strokeWidth);
            if (width > 3) {
              svgEl.setAttribute('stroke-width', '1');
            } else if (width > 1) {
              svgEl.setAttribute('stroke-width', '0.5');
            }
          }
          
          // style 속성 처리
          if (style) {
            let newStyle = style;
            
            // fill 속성 추출 및 변경 (배경만)
            const fillMatch = style.match(/fill:\s*([^;]+)/gi);
            if (fillMatch && !isArrowOrLine) {
              fillMatch.forEach(match => {
                const colorValue = match.replace(/fill:\s*/i, '').trim();
                if (isDarkColor(colorValue)) {
                  if (tagName === 'rect' || tagName === 'circle' || tagName === 'ellipse' || tagName === 'polygon') {
                    newStyle = newStyle.replace(match, 'fill:#ffffff');
                  }
                }
              });
            }
            
            // stroke 속성 추출 및 변경 (화살표는 제외)
            if (!isArrowOrLine) {
              const strokeMatch = style.match(/stroke:\s*([^;]+)/gi);
              if (strokeMatch) {
                strokeMatch.forEach(match => {
                  const colorValue = match.replace(/stroke:\s*/i, '').trim();
                  if (isDarkColor(colorValue)) {
                    if (tagName === 'rect' || tagName === 'circle' || tagName === 'ellipse' || tagName === 'polygon') {
                      newStyle = newStyle.replace(match, 'stroke:#dee2e6');
                    } else {
                      newStyle = newStyle.replace(match, 'stroke:#495057');
                    }
                  }
                });
              }
            }
            
            // stroke-width 속성 조정 (화살표는 제외)
            if (!isArrowOrLine) {
              newStyle = newStyle.replace(/stroke-width:\s*(\d+\.?\d*)/gi, (match, width) => {
                const w = parseFloat(width);
                if (w > 3) {
                  return 'stroke-width:1';
                } else if (w > 1) {
                  return 'stroke-width:0.5';
                }
                return match;
              });
            }
            
            // 일반적인 검은색 패턴도 변경 (화살표는 제외)
            if (!isArrowOrLine) {
              newStyle = newStyle
                .replace(/fill:\s*black/gi, 'fill:#ffffff')
                .replace(/fill:\s*#000(?!\d)/gi, 'fill:#ffffff')
                .replace(/fill:\s*#000000/gi, 'fill:#ffffff')
                .replace(/fill:\s*rgb\(0,\s*0,\s*0\)/gi, 'fill:#ffffff')
                .replace(/fill:\s*rgb\(0,0,0\)/gi, 'fill:#ffffff');
              
              // 노드 테두리는 회색으로
              if (tagName === 'rect' || tagName === 'circle' || tagName === 'ellipse' || tagName === 'polygon') {
                newStyle = newStyle
                  .replace(/stroke:\s*black/gi, 'stroke:#dee2e6')
                  .replace(/stroke:\s*#000(?!\d)/gi, 'stroke:#dee2e6')
                  .replace(/stroke:\s*#000000/gi, 'stroke:#dee2e6')
                  .replace(/stroke:\s*rgb\(0,\s*0,\s*0\)/gi, 'stroke:#dee2e6')
                  .replace(/stroke:\s*rgb\(0,0,0\)/gi, 'stroke:#dee2e6');
              }
            }
            
            if (newStyle !== style) {
              svgEl.setAttribute('style', newStyle);
            }
          }
          
          // 화살표/선 요소의 stroke를 명시적으로 설정 (보이도록)
          if (isArrowOrLine) {
            // stroke가 없거나 투명한 경우 회색으로 설정
            if (!stroke || stroke === 'none' || stroke === 'transparent') {
              svgEl.setAttribute('stroke', '#495057');
            }
            // stroke-width가 없는 경우 기본값 설정
            if (!strokeWidth || parseFloat(strokeWidth) < 1) {
              svgEl.setAttribute('stroke-width', '2');
            }
            // style에도 stroke 추가
            if (style) {
              let arrowStyle = style;
              if (!arrowStyle.includes('stroke:')) {
                arrowStyle = `${arrowStyle}; stroke:#495057`;
              }
              if (!arrowStyle.includes('stroke-width:')) {
                arrowStyle = `${arrowStyle}; stroke-width:2`;
              }
              svgEl.setAttribute('style', arrowStyle);
            } else {
              svgEl.setAttribute('style', 'stroke:#495057; stroke-width:2');
            }
          }
        });
        
        // 화살표 path 요소를 명시적으로 찾아서 색상 설정
        // Mermaid의 화살표는 보통 path 요소로 그려지며, 특정 클래스나 구조를 가짐
        const allPaths = svgElement.querySelectorAll('path');
        allPaths.forEach((path: Element) => {
          const p = path as SVGPathElement;
          const className = p.getAttribute('class') || '';
          const d = p.getAttribute('d') || '';
          const stroke = p.getAttribute('stroke');
          const style = p.getAttribute('style') || '';
          
          // 화살표로 판단하는 조건: edge 관련 클래스 또는 특정 path 패턴
          const isArrow = className.includes('edge') || 
                         className.includes('flowchart') ||
                         className.includes('link') ||
                         d.includes('M') && d.includes('L') && !d.includes('Z'); // 직선 또는 곡선 path
          
          if (isArrow) {
            // stroke가 없거나 흰색이거나 투명한 경우 회색으로 설정
            if (!stroke || stroke === 'none' || stroke === 'transparent' || stroke === '#ffffff' || stroke === 'white') {
              p.setAttribute('stroke', '#495057');
            }
            // stroke-width가 없는 경우 기본값 설정
            const currentWidth = p.getAttribute('stroke-width');
            if (!currentWidth || parseFloat(currentWidth) < 1) {
              p.setAttribute('stroke-width', '2');
            }
            // style에도 stroke 추가/수정
            let arrowStyle = style;
            if (!arrowStyle.includes('stroke:') || arrowStyle.includes('stroke:#ffffff') || arrowStyle.includes('stroke:white')) {
              arrowStyle = arrowStyle.replace(/stroke:\s*[^;]+/gi, '');
              arrowStyle = arrowStyle ? `${arrowStyle}; stroke:#495057` : 'stroke:#495057';
            }
            if (!arrowStyle.includes('stroke-width:') || parseFloat(arrowStyle.match(/stroke-width:\s*([^;]+)/i)?.[1] || '0') < 1) {
              arrowStyle = arrowStyle.replace(/stroke-width:\s*[^;]+/gi, '');
              arrowStyle = arrowStyle ? `${arrowStyle}; stroke-width:2` : 'stroke-width:2';
            }
            p.setAttribute('style', arrowStyle);
          }
        });
        
        // line, polyline 요소도 화살표로 처리
        const allLines = svgElement.querySelectorAll('line, polyline');
        allLines.forEach((line: Element) => {
          const l = line as SVGLineElement | SVGPolylineElement;
          const stroke = l.getAttribute('stroke');
          if (!stroke || stroke === 'none' || stroke === 'transparent' || stroke === '#ffffff' || stroke === 'white') {
            l.setAttribute('stroke', '#495057');
          }
          const currentWidth = l.getAttribute('stroke-width');
          if (!currentWidth || parseFloat(currentWidth) < 1) {
            l.setAttribute('stroke-width', '2');
          }
        });
        
        // rect 요소 특별 처리 (배경으로 사용되는 큰 rect)
        const allRects = svgElement.querySelectorAll('rect');
        const rectViewBoxStr = svgElement.getAttribute('viewBox');
        let vbWidth = 0, vbHeight = 0;
        
        if (rectViewBoxStr) {
          const parts = rectViewBoxStr.split(' ').map(Number);
          if (parts.length >= 4) {
            vbWidth = parts[2];
            vbHeight = parts[3];
          }
        }
        
        allRects.forEach((rect: Element) => {
          const r = rect as SVGRectElement;
          const rectWidth = parseFloat(r.getAttribute('width') || '0');
          const rectHeight = parseFloat(r.getAttribute('height') || '0');
          const fill = r.getAttribute('fill');
          const x = parseFloat(r.getAttribute('x') || '0');
          const y = parseFloat(r.getAttribute('y') || '0');
          const style = r.getAttribute('style');
          
          // 배경으로 간주하는 조건
          const isLargeBackground = vbWidth > 0 && vbHeight > 0 && 
                                   (rectWidth >= vbWidth * 0.7 && rectHeight >= vbHeight * 0.7);
          const isCornerBackground = x <= 10 && y <= 10 && rectWidth > 100 && rectHeight > 100;
          const hasDarkFill = fill && isDarkColor(fill);
          
          // style에서 fill 추출
          let styleFill = null;
          if (style) {
            const fillMatch = style.match(/fill:\s*([^;]+)/i);
            if (fillMatch) {
              styleFill = fillMatch[1].trim();
            }
          }
          const hasDarkStyleFill = styleFill && isDarkColor(styleFill);
          
          if (isLargeBackground || isCornerBackground || hasDarkFill || hasDarkStyleFill) {
            // 배경 rect를 강제로 흰색으로 변경
            r.setAttribute('fill', '#ffffff');
            let newStyle = style || '';
            newStyle = newStyle.replace(/fill:\s*[^;]+/gi, 'fill:#ffffff');
            if (!newStyle.includes('fill')) {
              newStyle = newStyle ? `${newStyle}; fill:#ffffff` : 'fill:#ffffff';
            }
            r.setAttribute('style', newStyle);
          }
        });
      };
      
      if (containerRef.current) {
        const svg = containerRef.current.querySelector('svg[data-mermaid-diagram]') as SVGSVGElement;
        if (svg) {
          svgRef.current = svg;
          applyWhiteBackground(svg);
          
        }
      }
      
      if (fullscreenContainerRef.current) {
        const svg = fullscreenContainerRef.current.querySelector('svg[data-mermaid-diagram]') as SVGSVGElement;
        if (svg) {
          fullscreenSvgRef.current = svg;
          applyWhiteBackground(svg);
        }
      }
    }
  }, [svgContent, isFullscreenOpen]);

  // 드래그 핸들러: 클릭 = 드래그 상태, 마우스 이동할 때만 패닝
  const handleMouseDown = (e: React.MouseEvent, isFullscreen = false) => {
    if (e.button !== 0) return;
    e.preventDefault();
    e.stopPropagation();
    const startPos = isFullscreen ? fullscreenPosition : position;
    dragStateRef.current = {
      isDragging: true,
      isFullscreen,
      startClientX: e.clientX,
      startClientY: e.clientY,
      startPosX: startPos.x,
      startPosY: startPos.y,
    };
    setIsDragging(true);
  };

  const handleMouseMove = useCallback((e: MouseEvent) => {
    const dragState = dragStateRef.current;
    if (!dragState.isDragging) return;
    e.preventDefault();
    const dx = e.clientX - dragState.startClientX;
    const dy = e.clientY - dragState.startClientY;
    if (dragState.isFullscreen) {
      setFullscreenPosition({
        x: dragState.startPosX + dx,
        y: dragState.startPosY + dy,
      });
    } else {
      setPosition({
        x: dragState.startPosX + dx,
        y: dragState.startPosY + dy,
      });
    }
  }, []);

  const handleMouseUp = useCallback(() => {
    if (!dragStateRef.current.isDragging) return;
    dragStateRef.current.isDragging = false;
    setIsDragging(false);
  }, []);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      window.addEventListener('mouseleave', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', handleMouseMove);
        window.removeEventListener('mouseup', handleMouseUp);
        window.removeEventListener('mouseleave', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove, handleMouseUp]);

  // 확대/축소 함수
  const handleZoomIn = (isFullscreen = false) => {
    if (isFullscreen) {
      setFullscreenZoom(prev => Math.min(prev + 0.25, 5));
    } else {
      setZoom(prev => Math.min(prev + 0.25, 3));
    }
  };

  const handleZoomOut = (isFullscreen = false) => {
    if (isFullscreen) {
      setFullscreenZoom(prev => {
        const newZoom = Math.max(prev - 0.25, 0.3);
        if (newZoom <= 1) {
          setFullscreenPosition({ x: 0, y: 0 });
        }
        return newZoom;
      });
    } else {
      setZoom(prev => {
        const newZoom = Math.max(prev - 0.25, 0.3);
        if (newZoom <= 1.0) {
          setPosition({ x: 0, y: 0 });
        }
        return newZoom;
      });
    }
  };

  const handleReset = (isFullscreen = false) => {
    if (isFullscreen) {
      setFullscreenZoom(1);
      setFullscreenPosition({ x: 0, y: 0 });
    } else {
      setZoom(1.0); // 기본 100% 줌으로 리셋
      setPosition({ x: 0, y: 0 });
    }
  };

  // 줌 입력 필드 핸들러
  const handleZoomInputChange = (value: string, isFullscreen = false) => {
    const numValue = parseInt(value, 10);
    if (!isNaN(numValue) && numValue >= 30 && numValue <= (isFullscreen ? 500 : 300)) {
      const newZoom = numValue / 100;
      if (isFullscreen) {
        setFullscreenZoom(newZoom);
        if (newZoom <= 1) {
          setFullscreenPosition({ x: 0, y: 0 });
        }
      } else {
        setZoom(newZoom);
        if (newZoom <= 1.0) {
          setPosition({ x: 0, y: 0 });
        }
      }
    }
  };

  const handleZoomInputBlur = (isFullscreen = false) => {
    const currentZoom = isFullscreen ? fullscreenZoom : zoom;
    const inputValue = isFullscreen ? fullscreenZoomInput : zoomInput;
    const numValue = parseInt(inputValue, 10);
    
    if (isNaN(numValue) || numValue < 30 || numValue > (isFullscreen ? 500 : 300)) {
      // 유효하지 않은 값이면 현재 줌 값으로 복원
      if (isFullscreen) {
        setFullscreenZoomInput(Math.round(fullscreenZoom * 100).toString());
      } else {
        setZoomInput(Math.round(zoom * 100).toString());
      }
    }
  };

  // 키보드 이벤트 처리 (방향키로 확대/축소)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // 컨테이너가 포커스를 받았거나 다이어그램이 표시된 상태에서만 작동
      if (!svgContent) return;
      
      // Ctrl/Cmd + 방향키로 확대/축소
      if (e.ctrlKey || e.metaKey) {
        if (e.key === 'ArrowUp' || e.key === '+' || e.key === '=') {
          e.preventDefault();
          handleZoomIn(isFullscreenOpen);
        } else if (e.key === 'ArrowDown' || e.key === '-') {
          e.preventDefault();
          handleZoomOut(isFullscreenOpen);
        } else if (e.key === '0') {
          e.preventDefault();
          handleReset(isFullscreenOpen);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [svgContent, isFullscreenOpen]);

  const handleFitToScreen = (isFullscreen = false) => {
    const container = isFullscreen ? fullscreenContainerRef.current : containerRef.current;
    const svg = isFullscreen ? fullscreenSvgRef.current : svgRef.current;
    
    if (container && svg) {
      const containerWidth = container.clientWidth;
      const containerHeight = container.clientHeight;
      
      const viewBox = svg.getAttribute("viewBox");
      if (viewBox) {
        const [, , width, height] = viewBox.split(" ").map(Number);
        if (width && height) {
          const scaleX = containerWidth / width;
          const scaleY = containerHeight / height;
          const scale = Math.min(scaleX, scaleY, 1); // 화면에 맞추되 확대는 안 함
          if (isFullscreen) {
            setFullscreenZoom(scale);
          } else {
            setZoom(scale);
          }
        }
      }
    }
  };

  const handleFullscreen = () => {
    setIsFullscreenOpen(true);
    // 전체 화면 진입 시 기본적으로 1.5배 확대하여 글자가 명확하게 보이도록 설정
    const initialZoom = Math.max(zoom, 1.5);
    setFullscreenZoom(initialZoom);
    setFullscreenPosition({ x: 0, y: 0 });
  };

  // Hooks는 항상 최상단에서 호출되어야 함
  const currentZoom = isFullscreenOpen ? fullscreenZoom : zoom;
  const isProjectStructure = diagram.trim().includes("프로젝트 구성") || diagram.trim().includes("프로젝트구성");
  // 전체 파이프라인 구성도인지 확인 (최대 폭 제한 제외)
  const isFullPipelineDiagram = diagram.trim().includes("전체 데이터 파이프라인 구성도") || 
                                diagram.trim().includes("전체 파이프라인 구성도") ||
                                diagram.trim().includes("전체 파이프라인");
  // 좌우폭 넓은 다이어그램(전체 파이프라인 등): 가로 최대 1200px (글씨 잘 보이게)
  const isWideDiagram = diagram.trim().includes("AWS 클라우드") ||
                        diagram.trim().includes("전체 데이터 파이프라인") ||
                        diagram.trim().includes("전체 파이프라인 구성도") ||
                        diagram.trim().includes("전체 파이프라인") ||
                        (diagram.includes("기존시스템") && diagram.includes("게이트웨이"));
  // 큰 흐름 (End-to-End) 다이어그램인지 확인 (크기 조정 필요)
  const isLargeFlowDiagram = diagram.trim().includes("큰 흐름") || 
                             diagram.trim().includes("End-to-End") ||
                             diagram.trim().includes("end-to-end") ||
                             diagram.trim().includes("전체 설계 흐름");
  const diagramStats = useMemo(() => {
    const lines = diagram
      .split("\n")
      .map(line => line.trim())
      .filter(Boolean);
    const edgeCount = (diagram.match(/-->|==>|---|-->|\.\.>/g) || []).length;
    return {
      lineCount: lines.length,
      edgeCount,
    };
  }, [diagram]);
  // 모든 다이어그램에 확대/축소/드래그 기능 제공
  const isSimpleDiagram = false;

  if (isRendering) {
    return (
      <div className="my-4 sm:my-6 flex justify-center items-center bg-gray-50 rounded-lg p-8 min-h-[200px]">
        <div className="text-gray-500 text-sm">다이어그램 렌더링 중...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 my-4">
        <div className="flex items-center gap-2 mb-2">
          <Code2 className="h-4 w-4 text-yellow-600" />
          <span className="text-sm font-medium text-yellow-900">Mermaid 다이어그램 렌더링 오류</span>
        </div>
        <p className="text-yellow-800 text-sm mb-2">{error}</p>
        <details className="mt-2">
          <summary className="text-xs text-yellow-700 cursor-pointer">원본 코드 보기</summary>
          <pre className="mt-2 text-xs bg-yellow-100 p-2 rounded overflow-auto max-h-40">
            {diagram.substring(0, 500)}
          </pre>
        </details>
      </div>
    );
  }

  if (!svgContent) {
    return null;
  }

  return (
    <>
      <div className="my-4 sm:my-6 pb-2 relative">
        {/* 기본 화면: 다이어그램 + 전체 보기 버튼만 (확대/축소/초기화/맞추기는 전체화면에만) */}
        <div 
          ref={containerRef}
          className={`mermaid-container relative mx-auto ${isProjectStructure ? 'flex flex-col items-center' : ''}`}
          style={{ 
            minHeight: 80,
            cursor: 'default',
            width: "100%",
            maxWidth: (isWideDiagram || isFullPipelineDiagram) ? "1200px" : "600px",
            overflow: 'visible',
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'center',
            position: 'relative',
          }}
        >
          <div
            className={`w-full ${isProjectStructure ? "flex flex-col items-center" : "flex justify-center"}`}
            style={{ maxWidth: '100%' }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: svgContent }}
              className="w-full mx-auto [&_svg]:max-w-full [&_svg]:h-auto [&_svg]:block"
              style={{
                maxWidth: (isWideDiagram || isFullPipelineDiagram) ? "1200px" : "560px",
                pointerEvents: 'auto',
                userSelect: 'none',
              }}
            />
          </div>
        </div>

        {/* 전체 보기 버튼 - 분리 배치 (아래쪽, 다이어그램을 가리지 않음 / 전체 보기에서 크기 조절·드래그 가능) */}
        <div className="flex justify-end pt-2 mt-1">
          <Button
            onClick={handleFullscreen}
            variant="default"
            size="sm"
            className="h-9 px-4 flex items-center gap-2 !bg-indigo-600 hover:!bg-indigo-700 !text-white shadow-lg border-2 border-indigo-500"
            title="전체 보기 (크기 조절·드래그 가능)"
          >
            <Expand className="h-4 w-4" />
            <span className="text-xs font-semibold">전체 보기</span>
          </Button>
        </div>
      </div>

      {/* 전체화면 모달 */}
      <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
          <DialogContent overlayClassName="!bg-transparent" className="!max-w-none !w-screen !h-screen !m-0 !p-4 !rounded-none !translate-x-0 !translate-y-0 !top-0 !left-0 flex flex-col !border-0 !shadow-none">
            <DialogHeader className="flex-shrink-0 pb-2">
              <DialogTitle className="flex items-center justify-between">
                <span className="text-lg font-semibold">다이어그램 전체 보기</span>
                <div className="flex items-center gap-3">
                  {/* 확대/축소·크기 조절 - 버튼 + 슬라이더 (드래그로 이동 가능) */}
                  <div className="flex flex-wrap items-center gap-2 bg-blue-50 rounded-lg px-3 py-2 border-2 border-blue-200">
                    <div className="flex items-center gap-2">
                      <Button
                        onClick={() => handleZoomOut(true)}
                        variant="ghost"
                        size="lg"
                        className="h-12 w-12 p-0 !text-blue-700 hover:!bg-blue-200 hover:!text-blue-900 !font-bold shadow-md"
                        title="축소 (Ctrl + 휠)"
                      >
                        <ZoomOut className="h-6 w-6" />
                      </Button>
                      <Input
                        type="number"
                        min="30"
                        max="500"
                        value={fullscreenZoomInput}
                        onChange={(e) => setFullscreenZoomInput(e.target.value)}
                        onBlur={() => handleZoomInputBlur(true)}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter') {
                            handleZoomInputChange(fullscreenZoomInput, true);
                            e.currentTarget.blur();
                          }
                        }}
                        className="h-10 w-20 text-xl font-bold text-blue-900 text-center bg-white px-2 py-1 rounded border border-blue-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
                        style={{ textAlign: 'center' }}
                      />
                      <span className="text-xl font-bold text-blue-900">%</span>
                      <Button
                        onClick={() => handleZoomIn(true)}
                        variant="ghost"
                        size="lg"
                        className="h-12 w-12 p-0 !text-blue-700 hover:!bg-blue-200 hover:!text-blue-900 !font-bold shadow-md"
                        title="확대 (Ctrl + 휠)"
                      >
                        <ZoomIn className="h-6 w-6" />
                      </Button>
                    </div>
                    <input
                      type="range"
                      min={30}
                      max={500}
                      value={Math.round(fullscreenZoom * 100)}
                      onChange={(e) => {
                        const v = parseInt(e.target.value, 10) / 100;
                        setFullscreenZoom(v);
                        setFullscreenZoomInput(e.target.value);
                        if (v <= 1) setFullscreenPosition({ x: 0, y: 0 });
                      }}
                      className="w-28 h-2 accent-blue-600 cursor-pointer"
                      title="크기 조절 (30%~500%)"
                    />
                  </div>
                  {/* 기타 버튼 */}
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => handleFitToScreen(true)}
                      variant="ghost"
                      size="lg"
                      className="h-12 px-4 !text-gray-700 hover:!bg-green-100 hover:!text-green-700 border border-gray-300 shadow-md"
                      title="화면에 맞추기"
                    >
                      <Maximize2 className="h-5 w-5 mr-2" />
                      <span className="text-sm font-semibold">맞추기</span>
                    </Button>
                    <Button
                      onClick={() => handleReset(true)}
                      variant="ghost"
                      size="lg"
                      className="h-12 px-4 !text-gray-700 hover:!bg-orange-100 hover:!text-orange-700 border border-gray-300 shadow-md"
                      title="초기화 (Ctrl + 0)"
                    >
                      <RotateCcw className="h-5 w-5 mr-2" />
                      <span className="text-sm font-semibold">초기화</span>
                    </Button>
                  </div>
                </div>
              </DialogTitle>
            </DialogHeader>
            <div 
              ref={fullscreenContainerRef}
              className="flex-1 overflow-hidden bg-white rounded-lg p-4 relative"
              style={{
                cursor: isDragging ? 'grabbing' : 'grab',
                backgroundColor: '#ffffff',
                touchAction: 'none',
              }}
              onMouseDown={(e) => handleMouseDown(e, true)}
              onWheel={(e) => {
                if (e.ctrlKey || e.metaKey) {
                  e.preventDefault();
                  const delta = e.deltaY > 0 ? -0.1 : 0.1;
                  const newZoom = Math.max(0.3, Math.min(5, fullscreenZoom + delta));
                  setFullscreenZoom(newZoom);
                  if (newZoom <= 1) {
                    setFullscreenPosition({ x: 0, y: 0 });
                  }
                }
              }}
            >
            <div
              className="flex justify-center items-center"
              style={{
                transform: `translate(${fullscreenPosition.x}px, ${fullscreenPosition.y}px) scale(${fullscreenZoom})`,
                transformOrigin: "center center",
                transition: isDragging ? 'none' : 'transform 0.2s ease-in-out',
                width: "100%",
                height: "100%",
              }}
            >
              <div
                dangerouslySetInnerHTML={{ __html: svgContent }}
                style={{
                  width: "100%",
                  maxWidth: isFullPipelineDiagram ? "100%" : "1200px",
                  pointerEvents: 'none',
                  backgroundColor: '#ffffff',
                }}
              />
            </div>
            </div>
          </DialogContent>
        </Dialog>
    </>
  );
}

// 기술 스택별 카테고리 정의
const techCategories = [
  {
    id: "overview",
    title: "📋 개요 및 프로젝트 구성",
    keywords: ["문서 개요", "프로젝트 구성", "문서 구조", "애플리케이션 역할", "로드맵", "기술 스택"],
    color: "text-blue-600"
  },
  {
    id: "data-collection",
    title: "📥 데이터 수집 및 통합",
    keywords: ["데이터 수집", "프로토콜", "Kinesis", "TCP", "MQTT", "API", "게이트웨이", "VPN", "터널링"],
    color: "text-green-600"
  },
  {
    id: "data-processing",
    title: "⚙️ 데이터 처리 및 변환",
    keywords: ["컨버트", "변환", "표준화", "스키마", "YAML", "분류", "배치", "Lambda", "파일"],
    color: "text-purple-600"
  },
  {
    id: "data-storage",
    title: "💾 데이터 저장소",
    keywords: ["S3", "RDS", "DynamoDB", "OpenSearch", "Iceberg", "Athena", "저장", "레이어", "Hot", "Warm", "Cold", "생명주기"],
    color: "text-orange-600"
  },
  {
    id: "monitoring",
    title: "📊 모니터링 및 알람",
    keywords: ["모니터링", "알람", "EventBridge", "SNS", "CloudWatch", "룰셋", "이상 탐지", "배치 체크"],
    color: "text-red-600"
  },
  {
    id: "control",
    title: "🎮 제어 및 OTA",
    keywords: ["제어", "원격", "OTA", "Shadow", "디바이스", "펌웨어", "업데이트"],
    color: "text-indigo-600"
  },
  {
    id: "ai-ml",
    title: "🤖 AI/ML 분석",
    keywords: ["AI", "ML", "분석", "SageMaker", "Bedrock", "예측", "진단", "자동 대응", "지능형"],
    color: "text-pink-600"
  },
  {
    id: "infrastructure",
    title: "🏗️ 인프라 및 배포",
    keywords: ["인프라", "배포", "설치", "연동", "VPN", "VPC", "리소스", "Terraform", "CI/CD", "기존 시스템"],
    color: "text-cyan-600"
  },
  {
    id: "architecture",
    title: "🏛️ 시스템 아키텍처",
    keywords: ["아키텍처", "시스템", "전체", "맞춤 서비스", "운영 사이클"],
    color: "text-teal-600"
  },
  {
    id: "mapping",
    title: "🔗 문서 매핑",
    keywords: ["매핑", "솔루션 상세", "프레젠테이션", "사용 방법"],
    color: "text-gray-600"
  }
];

function categorizeSection(sectionTitle: string): string {
  const titleLower = sectionTitle.toLowerCase();
  
  for (const category of techCategories) {
    if (category.keywords.some(keyword => titleLower.includes(keyword.toLowerCase()))) {
      return category.id;
    }
  }
  
  return "other";
}

// 마크다운 섹션 파싱 함수
function parseMarkdownSections(content: string) {
  const sections: Array<{ title: string; level: number; content: string; id: string; category?: string }> = [];
  const lines = content.split('\n');
  
  let currentSection: { title: string; level: number; content: string; id: string } | null = null;
  let currentContent: string[] = [];
  let sectionIndex = 0; // 전체 섹션 인덱스

  let inCodeBlock = false;

  for (const line of lines) {
    const trimmedLine = line.trim();
    if (trimmedLine.startsWith("```")) {
      inCodeBlock = !inCodeBlock;
      currentContent.push(line);
      continue;
    }

    // 코드 블록 내부는 헤딩으로 파싱하지 않음
    if (inCodeBlock) {
      currentContent.push(line);
      continue;
    }

    // 헤딩 매칭 (## 제목 형태)
    const headingMatch = line.match(/^(#{1,6})\s+(.+)$/);
    
    if (headingMatch) {
      // 이전 섹션 저장
      if (currentSection) {
        currentSection.content = currentContent.join('\n').trim();
        const category = categorizeSection(currentSection.title);
        sections.push({ ...currentSection, category });
      }
      
      // 새 섹션 시작
      const level = headingMatch[1].length;
      const title = headingMatch[2].trim();
      const baseId = title.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-').replace(/^-|-$/g, '');
      
      // 중복 방지를 위해 섹션 인덱스와 함께 고유 ID 생성
      sectionIndex++;
      let id = `${baseId}-${sectionIndex}`;
      
      // 여전히 중복이면 추가 카운터 사용
      let counter = 1;
      while (sections.some(s => s.id === id)) {
        id = `${baseId}-${sectionIndex}-${counter}`;
        counter++;
      }
      
      currentSection = { title, level, content: '', id };
      currentContent = [];
    } else {
      currentContent.push(line);
    }
  }
  
  // 마지막 섹션 저장
  if (currentSection) {
    currentSection.content = currentContent.join('\n').trim();
    const category = categorizeSection(currentSection.title);
    sections.push({ ...currentSection, category });
  }
  
  return sections;
}

export function DocsApp() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [docContent, setDocContent] = useState<string>("");
  const [loading, setLoading] = useState(false);
  const [sections, setSections] = useState<Array<{ title: string; level: number; content: string; id: string; category?: string }>>([]);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const currentDocIndex = useMemo(() => docFiles.findIndex(doc => doc.file === selectedDoc), [selectedDoc]);
  const prevDoc = currentDocIndex > 0 ? docFiles[currentDocIndex - 1] : null;
  const nextDoc = currentDocIndex >= 0 && currentDocIndex < docFiles.length - 1 ? docFiles[currentDocIndex + 1] : null;
  const activeSectionIndex = useMemo(
    () => (activeSection ? sections.findIndex(s => s.id === activeSection) : -1),
    [activeSection, sections]
  );
  const sectionProgress = useMemo(() => {
    if (!sections.length || activeSectionIndex < 0) return 0;
    return Math.round(((activeSectionIndex + 1) / sections.length) * 100);
  }, [sections.length, activeSectionIndex]);

  const goToSection = useCallback((sectionId: string) => {
    const docId = docFiles.find(d => d.file === selectedDoc)?.id;
    if (docId) {
      // window.location.hash를 사용하면 자동으로 hashchange 이벤트 발생 및 히스토리 추가
      window.location.hash = `#docs/${docId}/${sectionId}`;
      setActiveSection(sectionId);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedDoc]);

  // 해시 변경 감지 및 처리
  useEffect(() => {
    const handleHashChange = () => {
      if (loading) return; // 로딩 중이면 무시
      
      const hash = window.location.hash.slice(1);
      
      if (hash.startsWith("docs/")) {
        const parts = hash.replace("docs/", "").split("/");
        const docId = parts[0];
        const sectionId = parts[1];
        
        // 문서 ID를 파일명으로 변환
        const docFile = docFiles.find(d => d.id === docId);
        if (docFile && selectedDoc !== docFile.file) {
          loadDoc(docFile.file);
        } else if (sectionId && sections.length > 0) {
          // 문서는 이미 로드되어 있고 섹션만 변경
          const section = sections.find(s => s.id === sectionId);
          if (section && activeSection !== sectionId) {
            setActiveSection(sectionId);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }
        } else if (!sectionId && docFile) {
          // 섹션이 없으면 첫 번째 섹션으로
          if (sections.length > 0) {
            const firstSectionId = sections[0].id;
            window.location.hash = `#docs/${docId}/${firstSectionId}`;
          }
        }
      } else if (hash === "docs") {
        // 기본 문서 로드
        if (!selectedDoc && docFiles.length > 0 && !loading) {
          loadDoc(docFiles[0].file);
        }
      }
    };

    // 초기 로드
    handleHashChange();
    
    // 해시 변경 이벤트 리스너 (뒤로가기/앞으로가기도 hashchange로 처리됨)
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, [sections, selectedDoc, loading]);

  // Mermaid 초기화
  useEffect(() => {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      flowchart: {
        useMaxWidth: true,
        htmlLabels: true,
        curve: "basis",
        nodeSpacing: 36,
        rankSpacing: 56,
        padding: 12,
        defaultRenderer: "dagre-wrapper",
        diagramPadding: 8,
      },
      gantt: {
        useMaxWidth: false,
      },
      themeVariables: {
        fontSize: "16px",
        fontFamily: "Inter, Arial, sans-serif",
        // 주요 색상 - 명확한 파란색 계열
        primaryColor: "#2196F3",
        primaryTextColor: "#ffffff",
        primaryBorderColor: "#1565C0",
        // 선 색상 - 회색으로 명확하게 표시
        lineColor: "#666666",
        secondaryColor: "#4CAF50",
        tertiaryColor: "#FF9800",
        fontSize2: "15px",
        fontSize3: "14px",
        // 노트 색상
        noteBkgColor: "#fff9c4",
        noteTextColor: "#333",
        noteBorderColor: "#f57f17",
        // Actor (Sequence Diagram)
        actorBorder: "#1565C0",
        actorBkg: "#e3f2fd",
        actorTextColor: "#1565C0",
        actorLineColor: "#666666",
        signalColor: "#333",
        signalTextColor: "#333",
        // 라벨 박스
        labelBoxBkgColor: "#f5f5f5",
        labelBoxBorderColor: "#999999",
        labelTextColor: "#333",
        loopTextColor: "#333",
        // Activation (Sequence Diagram)
        activationBorderColor: "#1565C0",
        activationBkgColor: "#e3f2fd",
        sequenceNumberColor: "#ffffff",
        // 섹션 색상
        sectionBkgColor: "#f3e5f5",
        altBkgColor: "#fff3e0",
        doneBkgColor: "#e8f5e9",
        // 색상 스케일
        cScale0: "#e3f2fd",
        cScale1: "#bbdefb",
        cScale2: "#90caf9",
        // 메인 배경 - 흰색 유지
        mainBkg: "#ffffff",
        secondBkg: "#f5f5f5",
        tertiaryBkg: "#fafafa",
        // Done/Task 색상
        doneBorderColor: "#4CAF50",
        activeBkgColor: "#fff3e0",
        activeBorderColor: "#FF9800",
        taskBkgColor: "#e3f2fd",
        taskTextColor: "#1565C0",
        taskTextLightColor: "#666666",
        taskTextOutsideColor: "#333",
        taskTextClickableColor: "#0d47a1",
        activeTaskBorderColor: "#FF9800",
        activeTaskBkgColor: "#fff3e0",
        gridColor: "#e0e0e0",
        doneTaskBkgColor: "#e8f5e9",
        doneTaskBorderColor: "#4CAF50",
        // Critical 색상
        critBorderColor: "#f44336",
        critBkgColor: "#ffebee",
        todayLineColor: "#f44336",
      },
    });
  }, []);

  const loadDoc = async (fileName: string, opts?: { activateLastSection?: boolean }): Promise<void> => {
    setLoading(true);
    try {
      const response = await fetch(`/00.doc/${fileName}`);
      if (response.ok) {
        const content = await response.text();
        setDocContent(content);
        setSelectedDoc(fileName);
        
        // 섹션 파싱
        const parsedSections = parseMarkdownSections(content);
        setSections(parsedSections);
        
        // 문서 ID 찾기
        const docId = docFiles.find(d => d.file === fileName)?.id;
        
        // 해시에서 섹션 ID 확인 (이미 해시가 있으면 유지)
        const hash = window.location.hash.slice(1);
        const hashSectionId = hash.startsWith(`docs/${docId}/`) ? hash.replace(`docs/${docId}/`, "") : null;
        
        // 첫·마지막 섹션 활성화 (해시에 섹션이 없으면; 이전 문서로 갈 땐 마지막 섹션)
        if (parsedSections.length > 0) {
          const sectionId = hashSectionId && parsedSections.find(s => s.id === hashSectionId) 
            ? hashSectionId 
            : (opts?.activateLastSection ? parsedSections[parsedSections.length - 1].id : parsedSections[0].id);
          setActiveSection(sectionId);
          
          // 해시 업데이트 (현재 해시와 다를 때만) - 히스토리에 추가하지 않음 (로딩 중이므로)
          if (docId && hash !== `docs/${docId}/${sectionId}`) {
            // replaceState 사용하여 히스토리에 추가하지 않음 (로딩 완료 시점이므로)
            window.history.replaceState(null, '', `#docs/${docId}/${sectionId}`);
          }
        } else if (docId && hash !== `docs/${docId}`) {
          window.history.replaceState(null, '', `#docs/${docId}`);
        }
      } else {
        setDocContent(`문서를 불러올 수 없습니다: ${fileName}`);
      }
    } catch (error) {
      setDocContent("문서를 불러오는 중 오류가 발생했습니다.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const goToDoc = (doc: (typeof docFiles)[number], goOpts?: { toLastSection?: boolean }) => {
    window.location.hash = `#docs/${doc.id}`;
    loadDoc(doc.file, { activateLastSection: goOpts?.toLastSection });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // 방향키·화살표: 섹션 단위 이동, 마지막/첫 섹션에서 다음/이전 문서로
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      if (target?.closest("input, textarea, select, [contenteditable='true']")) return;
      if (!activeSection || sections.length === 0) return;

      const currentIndex = sections.findIndex(s => s.id === activeSection);
      if (currentIndex === -1) return;

      if (event.key === "ArrowLeft") {
        if (currentIndex > 0) {
          event.preventDefault();
          goToSection(sections[currentIndex - 1].id);
        } else if (prevDoc) {
          event.preventDefault();
          goToDoc(prevDoc, { toLastSection: true });
        }
      } else if (event.key === "ArrowRight") {
        if (currentIndex < sections.length - 1) {
          event.preventDefault();
          goToSection(sections[currentIndex + 1].id);
        } else if (nextDoc) {
          event.preventDefault();
          goToDoc(nextDoc);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeSection, sections, goToSection, nextDoc, prevDoc, goToDoc]);

  // Mermaid 코드 블록 렌더링
  const components = {
    code({ node, inline, className, children, ...props }: any) {
      const match = /language-(\w+)/.exec(className || "");
      const codeString = String(children).replace(/\n$/, "");

      if (!inline && match && match[1] === "mermaid") {
        // "프로젝트 구성" 다이어그램은 커스텀 컴포넌트로 렌더링
        // 현재 활성 섹션이 "프로젝트 구성"인지 확인
        const currentSection = sections.find(s => s.id === activeSection);
        const isProjectStructureSection = 
          activeSection?.includes("프로젝트-구성") || 
          activeSection?.includes("프로젝트구성") ||
          currentSection?.title?.includes("프로젝트 구성");
        
        // 코드 블록 내용에서도 확인
        const hasProjectStructureContent = 
          codeString.includes("프로젝트 구성") || 
          codeString.includes("프로젝트구성") ||
          codeString.includes("Start([프로젝트 구성])") ||
          (codeString.includes("graph") && codeString.includes("프로젝트") && codeString.includes("구성"));
        
        if (isProjectStructureSection || hasProjectStructureContent) {
          console.log("프로젝트 구성 다이어그램 감지 - 커스텀 컴포넌트 렌더링", {
            activeSection,
            sectionTitle: currentSection?.title,
            hasContent: hasProjectStructureContent
          });
          return <ProjectStructureDiagram />;
        }
        return <MermaidDiagram diagram={codeString} />;
      }

      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    },
  };

  const activeSectionData = sections.find(s => s.id === activeSection);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 p-3 sm:p-4 md:p-6">
      <div className="max-w-[1920px] mx-auto">
        <div className="mb-4 sm:mb-6 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">설계 문서</h1>
            <p className="text-sm sm:text-base text-gray-600">프로젝트의 전체 설계 문서를 단계별로 확인할 수 있습니다.</p>
          </div>
          <Button variant="outline" size="sm" className="lg:hidden shrink-0" onClick={() => setMobileMenuOpen(true)}>
            <Menu className="h-4 w-4 mr-2" />
            메뉴 보기
          </Button>
        </div>

        {/* 모바일 메뉴 열림 시 백드롭 */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setMobileMenuOpen(false)} aria-hidden="true" />
        )}

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 sm:gap-6">
          {/* 문서 목록 및 섹션 목록 — 모바일: 숨김, 메뉴 보기로 토글; lg 이상: 항상 표시 */}
          <div
            className={`space-y-4 lg:col-span-1 ${
              !mobileMenuOpen ? "hidden" : "fixed inset-y-0 left-0 z-50 w-80 max-w-[85vw] bg-white shadow-2xl overflow-y-auto p-4"
            } lg:!block lg:!relative lg:!inset-auto lg:!z-0 lg:!w-auto lg:!max-w-none lg:bg-transparent lg:shadow-none lg:overflow-visible lg:!p-0`}
          >
            <Card className="mb-4">
              <CardHeader className="pb-3 flex flex-row items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-base sm:text-lg">문서 목록</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">
                    설계 문서를 선택하세요 {docFiles.length > 0 && ` (${docFiles.length}개)`}
                  </CardDescription>
                </div>
                <Button variant="ghost" size="icon" className="lg:hidden shrink-0" onClick={() => setMobileMenuOpen(false)} aria-label="메뉴 닫기">
                  <X className="h-4 w-4" />
                </Button>
              </CardHeader>
              <CardContent className="space-y-2">
                {docFiles.map((doc) => {
                    const Icon = doc.icon;
                    const isActive = selectedDoc === doc.file;
                    return (
                      <Button
                        key={doc.id}
                        variant={isActive ? "default" : "outline"}
                        className={`w-full justify-start text-xs sm:text-sm ${
                          isActive 
                            ? "!bg-blue-600 !text-white hover:!bg-blue-700 hover:!text-white [&_svg]:!text-white [&_span]:!text-white hover:[&_svg]:!text-white hover:[&_span]:!text-white" 
                            : "!text-gray-900 hover:!bg-gray-100 hover:!text-gray-900 [&_svg]:!text-current [&_span]:!text-current hover:[&_svg]:!text-gray-900 hover:[&_span]:!text-gray-900"
                        }`}
                        onClick={() => {
                          loadDoc(doc.file);
                          window.location.hash = `#docs/${doc.id}`;
                          setMobileMenuOpen(false);
                        }}
                        disabled={loading}
                      >
                        <Icon className={`h-3 w-3 sm:h-4 sm:w-4 mr-2 ${isActive ? "" : doc.color}`} />
                        <span className="truncate">{doc.title}</span>
                      </Button>
                    );
                })}
              </CardContent>
            </Card>

            {/* 모든 섹션 목록 (순서대로) */}
            {selectedDoc && sections.length > 0 && (
              <Card className="mb-4">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">모든 섹션</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{sections.length}개 섹션 (순서대로)</CardDescription>
                </CardHeader>
                <CardContent className="space-y-1">
                  {sections.map((section) => {
                    const isActive = activeSection === section.id;
                    const indentLevel = section.level > 2 ? (section.level - 2) * 8 : 0;
                    const sectionIndex = sections.findIndex(s => s.id === section.id) + 1;
                    
                    return (
                      <Button
                        key={section.id}
                        variant={isActive ? "default" : "ghost"}
                        className={`w-full justify-start text-left h-auto py-1.5 px-2 text-xs ${
                          isActive 
                            ? "!bg-blue-600 !text-white hover:!bg-blue-700 hover:!text-white" 
                            : "!text-gray-700 hover:!bg-gray-100 hover:!text-gray-900"
                        }`}
                        style={{ paddingLeft: `${8 + indentLevel}px` }}
                        onClick={() => {
                          goToSection(section.id);
                          setMobileMenuOpen(false);
                        }}
                      >
                        <span className="font-normal text-[10px] sm:text-xs text-gray-400 mr-1">{sectionIndex}.</span>
                        <span className="font-normal flex-1 truncate text-left">{section.title}</span>
                      </Button>
                    );
                  })}
                </CardContent>
              </Card>
            )}

          </div>

          {/* 문서 내용 */}
          <div className="lg:col-span-4 min-w-0">
            <Card>
              <CardHeader className="pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex-1 min-w-0">
                    <CardTitle className="text-xl sm:text-2xl md:text-3xl break-words">
                      {selectedDoc ? (
                        docFiles.find((d) => d.file === selectedDoc)?.title || selectedDoc
                      ) : (
                        "문서를 선택하세요"
                      )}
                    </CardTitle>
                    <CardDescription className="mt-2 text-sm sm:text-base break-words">
                      {activeSectionData ? activeSectionData.title : "왼쪽에서 섹션을 선택하세요"}
                    </CardDescription>
                  </div>
                  {activeSectionData && (
                    <div className="flex items-center gap-2 shrink-0">
                      <Badge variant="outline" className="text-xs sm:text-sm">
                        {activeSectionIndex + 1} / {sections.length}
                      </Badge>
                      <Badge variant="secondary" className="text-xs sm:text-sm">
                        진행률 {sectionProgress}%
                      </Badge>
                    </div>
                  )}
                </div>
                {activeSectionData && (
                  <div className="mt-3 sm:mt-4">
                    <div className="flex items-center justify-between text-xs text-gray-500 mb-1">
                      <span>읽기 진행</span>
                      <span>{sectionProgress}%</span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-gray-200 overflow-hidden">
                      <div
                        className="h-full bg-blue-600 transition-all"
                        style={{ width: `${sectionProgress}%` }}
                      />
                    </div>
                  </div>
                )}
                
                {/* 모바일 섹션 선택 드롭다운 */}
                {selectedDoc && sections.length > 0 && (
                  <div className="xl:hidden mt-4">
                    <select
                      value={activeSection || ""}
                      onChange={(e) => {
                        const sectionId = e.target.value;
                        if (sectionId) {
                          goToSection(sectionId);
                        }
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      {sections.map((section) => (
                        <option key={section.id} value={section.id}>
                          {section.title}
                        </option>
                      ))}
                    </select>
                  </div>
                )}
              </CardHeader>
              <CardContent className="p-4 sm:p-6">
                {loading ? (
                  <div className="flex items-center justify-center py-12">
                    <div className="text-gray-500">문서를 불러오는 중...</div>
                  </div>
                ) : activeSectionData ? (
                  <div className="space-y-4 sm:space-y-6">
                    <div className="prose prose-slate max-w-none 
                      prose-headings:font-bold prose-headings:text-gray-900
                      prose-p:text-gray-700 prose-p:leading-relaxed prose-p:text-sm sm:prose-p:text-base
                      prose-strong:text-gray-900 prose-strong:font-semibold
                      prose-code:text-gray-800 prose-code:bg-gray-100 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-xs sm:prose-code:text-sm prose-code:font-mono
                      prose-pre:bg-slate-100 prose-pre:text-slate-800 prose-pre:border prose-pre:border-slate-200 prose-pre:overflow-x-auto prose-pre:text-xs sm:prose-pre:text-sm
                      prose-a:text-blue-600 prose-a:no-underline hover:prose-a:underline
                      prose-li:text-gray-700 prose-li:text-sm sm:prose-li:text-base prose-ul:text-gray-700 prose-ol:text-gray-700
                      prose-blockquote:text-gray-600 prose-blockquote:border-l-gray-400
                      prose-h1:text-2xl sm:prose-h1:text-3xl prose-h1:mb-3 sm:prose-h1:mb-4 prose-h1:mt-0 prose-h1:pb-2 prose-h1:border-b prose-h1:border-gray-200
                      prose-h2:text-xl sm:prose-h2:text-2xl prose-h2:mb-2 sm:prose-h2:mb-3 prose-h2:mt-0 prose-h2:text-gray-900
                      prose-h3:text-lg sm:prose-h3:text-xl prose-h3:mb-2 prose-h3:mt-0 prose-h3:text-gray-800
                      prose-h4:text-base sm:prose-h4:text-lg prose-h4:mb-2 prose-h4:mt-0
                      prose-table:text-gray-700 prose-table:text-sm sm:prose-table:text-base prose-th:text-gray-900 prose-td:text-gray-700 prose-table:w-full prose-table:overflow-x-auto
                      prose-img:rounded-lg prose-img:shadow-md prose-img:my-4 prose-img:max-w-full prose-img:h-auto">
                      <ReactMarkdown
                        remarkPlugins={[remarkGfm]}
                        rehypePlugins={[rehypeSlug]}
                        components={components}
                      >
                        {`# ${activeSectionData.title}\n\n${activeSectionData.content}`}
                      </ReactMarkdown>
                    </div>
                    
                    {/* 네비게이션 버튼 */}
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pt-4 sm:pt-6 border-t gap-4">
                      {(() => {
                        const currentIndex = sections.findIndex(s => s.id === activeSection);
                        const prevSection = currentIndex > 0 ? sections[currentIndex - 1] : null;
                        const nextSection = currentIndex < sections.length - 1 ? sections[currentIndex + 1] : null;

                        return (
                          <>
                            <div className="flex-1">
                              {prevSection ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full sm:w-auto text-xs sm:text-sm justify-start"
                                  onClick={() => goToSection(prevSection.id)}
                                >
                                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 rotate-180" />
                                  이전: {prevSection.title}
                                </Button>
                              ) : prevDoc ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full sm:w-auto text-xs sm:text-sm justify-start"
                                  onClick={() => goToDoc(prevDoc, { toLastSection: true })}
                                >
                                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 rotate-180" />
                                  이전 문서: {prevDoc.title}
                                </Button>
                              ) : (
                                <div />
                              )}
                            </div>
                            <div className="flex-1 text-right">
                              {nextSection ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full sm:w-auto text-xs sm:text-sm justify-end"
                                  onClick={() => goToSection(nextSection.id)}
                                >
                                  다음: {nextSection.title}
                                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                                </Button>
                              ) : nextDoc ? (
                                <Button
                                  variant="outline"
                                  size="sm"
                                  className="w-full sm:w-auto text-xs sm:text-sm justify-end"
                                  onClick={() => goToDoc(nextDoc)}
                                >
                                  다음 문서: {nextDoc.title}
                                  <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                                </Button>
                              ) : (
                                <div />
                              )}
                            </div>
                          </>
                        );
                      })()}
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center py-12 text-gray-500">
                    {selectedDoc ? "섹션을 선택하세요" : "문서를 선택하세요"}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}