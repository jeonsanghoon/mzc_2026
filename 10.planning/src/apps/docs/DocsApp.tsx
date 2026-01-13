import { useState, useEffect, useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../../components/ui/card";
import { Button } from "../../components/ui/button";
import { Badge } from "../../components/ui/badge";
import { FileText, BookOpen, GitBranch, ChevronRight, Play, Code2, ZoomIn, ZoomOut, Maximize2, RotateCcw, X } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "../../components/ui/dialog";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import mermaid from "mermaid";

const docFiles = [
  {
    id: "process-flow",
    title: "프로세스 플로우",
    description: "전체 시스템 프로세스를 Mermaid 다이어그램으로 정리한 문서",
    icon: GitBranch,
    color: "text-blue-600",
    file: "PROCESS_FLOW.md",
  },
  {
    id: "project-analysis",
    title: "프로젝트 분석",
    description: "프로젝트 상세 분석 및 기술 스택 문서",
    icon: BookOpen,
    color: "text-purple-600",
    file: "PROJECT_ANALYSIS.md",
  },
  {
    id: "readme",
    title: "프로젝트 개요",
    description: "프로젝트 개요 및 빠른 시작 가이드",
    icon: FileText,
    color: "text-green-600",
    file: "README.md",
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              PROCESS_FLOW.md
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              PROJECT_ANALYSIS.md
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              README.md
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
              대시보드 모드
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

      {/* 섹션 3: 대시보드 Frame 및 프레젠테이션 Slide */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 대시보드 Frame */}
        <Card className="bg-green-50 border-2 border-green-300">
          <CardHeader>
            <CardTitle className="text-lg">대시보드 모드 - 7개 Frame</CardTitle>
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              PROCESS_FLOW.md
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              PROJECT_ANALYSIS.md
            </div>
            <div className="bg-blue-500 text-white px-6 py-4 rounded-lg text-center font-semibold hover:bg-blue-600 transition-colors">
              README.md
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
  const [zoom, setZoom] = useState(1);
  const [fullscreenZoom, setFullscreenZoom] = useState(1);
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false);
  const [originalViewBox, setOriginalViewBox] = useState<string>("");
  
  // 드래그 상태
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [fullscreenPosition, setFullscreenPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });

  useEffect(() => {
    if (!diagram) return;
    
    setIsRendering(true);
    setError("");
    setSvgContent("");
    setZoom(1);
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

        // "프로젝트 구성" 다이어그램의 경우 특별한 설정 적용
        if (isProjectStructure) {
          // 세로 배치를 위한 설정
          mermaid.initialize({
            startOnLoad: false,
            theme: "default",
            securityLevel: "loose",
            flowchart: {
              useMaxWidth: false,
              htmlLabels: true,
              curve: "basis",
              nodeSpacing: 100,
              rankSpacing: 150,
              padding: 60,
              defaultRenderer: "dagre-wrapper",
              diagramPadding: 40,
            },
          });
        }

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
                // 일반 다이어그램: 기존 설정 유지
                const maxWidth = 800;
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
            svgElement.style.width = "100%";
            svgElement.style.height = "auto";
            svgElement.style.maxWidth = "800px";
            svgElement.style.margin = "0 auto";
          }
        }
        
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

  // SVG 렌더링 후 참조 설정
  useEffect(() => {
    if (svgContent) {
      if (containerRef.current) {
        const svg = containerRef.current.querySelector('svg[data-mermaid-diagram]') as SVGSVGElement;
        if (svg) {
          svgRef.current = svg;
        }
      }
      if (fullscreenContainerRef.current) {
        const svg = fullscreenContainerRef.current.querySelector('svg[data-mermaid-diagram]') as SVGSVGElement;
        if (svg) {
          fullscreenSvgRef.current = svg;
        }
      }
    }
  }, [svgContent, isFullscreenOpen]);

  // 드래그 핸들러
  const handleMouseDown = (e: React.MouseEvent, isFullscreen = false) => {
    if (e.button !== 0) return; // 왼쪽 버튼만
    setIsDragging(true);
    const startPos = isFullscreen ? fullscreenPosition : position;
    setDragStart({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y,
    });
  };

  const handleMouseMove = (e: MouseEvent, isFullscreen = false) => {
    if (!isDragging) return;
    
    const newX = e.clientX - dragStart.x;
    const newY = e.clientY - dragStart.y;
    
    if (isFullscreen) {
      setFullscreenPosition({ x: newX, y: newY });
    } else {
      setPosition({ x: newX, y: newY });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', (e) => handleMouseMove(e, isFullscreenOpen));
      window.addEventListener('mouseup', handleMouseUp);
      return () => {
        window.removeEventListener('mousemove', (e) => handleMouseMove(e, isFullscreenOpen));
        window.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, dragStart, isFullscreenOpen]);

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
        const newZoom = Math.max(prev - 0.25, 0.5);
        if (newZoom <= 1) {
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
      setZoom(1);
      setPosition({ x: 0, y: 0 });
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
    setFullscreenZoom(zoom); // 현재 줌 레벨 유지
  };

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

  const currentZoom = isFullscreenOpen ? fullscreenZoom : zoom;
  const isProjectStructure = diagram.trim().includes("프로젝트 구성") || diagram.trim().includes("프로젝트구성");

  return (
    <>
      <div className={`my-4 sm:my-6 bg-gray-50 rounded-lg p-4 relative ${isProjectStructure ? 'project-structure-diagram' : ''}`}>
        {/* 컨트롤 버튼 */}
        <div className="absolute top-2 right-2 z-10 flex flex-col gap-1 bg-white/95 backdrop-blur-sm rounded-lg p-1.5 shadow-xl border-2 border-gray-300">
          <Button
            onClick={handleFitToScreen}
            variant="ghost"
            size="sm"
            className="h-9 px-3 flex items-center gap-1.5 !text-gray-900 hover:!bg-green-100 hover:!text-green-700 hover:[&_svg]:!text-green-700 hover:[&_span]:!text-green-700 !font-semibold border border-gray-200 [&_svg]:!text-gray-900 [&_span]:!text-gray-900"
            title="화면에 맞추기"
          >
            <Maximize2 className="h-4 w-4" />
            <span className="text-xs">맞추기</span>
          </Button>
          <Button
            onClick={handleReset}
            variant="ghost"
            size="sm"
            className="h-9 px-3 flex items-center gap-1.5 !text-gray-900 hover:!bg-orange-100 hover:!text-orange-700 hover:[&_svg]:!text-orange-700 hover:[&_span]:!text-orange-700 !font-semibold border border-gray-200 [&_svg]:!text-gray-900 [&_span]:!text-gray-900"
            title="초기화 (Ctrl/Cmd + 0)"
          >
            <RotateCcw className="h-4 w-4" />
            <span className="text-xs">초기화</span>
          </Button>
          <Button
            onClick={handleFullscreen}
            variant="ghost"
            size="sm"
            className="h-9 px-3 flex items-center gap-1.5 !text-gray-900 hover:!bg-purple-100 hover:!text-purple-700 hover:[&_svg]:!text-purple-700 hover:[&_span]:!text-purple-700 !font-semibold border border-gray-200 [&_svg]:!text-gray-900 [&_span]:!text-gray-900"
            title="전체 화면"
          >
            <Maximize2 className="h-4 w-4" />
            <span className="text-xs">전체화면</span>
          </Button>
        </div>

        {/* 줌 레벨 표시 및 컨트롤 */}
        <div className="absolute top-2 left-2 z-10 flex items-center gap-2 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1.5 shadow-xl border-2 border-gray-300">
          <Button
            onClick={() => handleZoomOut(false)}
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 !text-gray-900 hover:!bg-blue-100 hover:!text-blue-700 !font-bold"
            title="축소"
          >
            <span className="text-sm">-</span>
          </Button>
          <div className="text-sm font-bold text-gray-900 min-w-[50px] text-center">
            {Math.round(zoom * 100)}%
          </div>
          <Button
            onClick={() => handleZoomIn(false)}
            variant="ghost"
            size="sm"
            className="h-7 w-7 p-0 !text-gray-900 hover:!bg-blue-100 hover:!text-blue-700 !font-bold"
            title="확대"
          >
            <span className="text-sm">+</span>
          </Button>
        </div>
        
        {/* 키보드 단축키 안내 */}
        <div className="absolute bottom-2 left-2 z-10 bg-blue-50/95 backdrop-blur-sm rounded-lg px-2 py-1 text-xs font-medium text-blue-900 shadow-lg border border-blue-200">
          <span className="font-semibold">단축키:</span> Ctrl/Cmd + ↑↓ (확대/축소), 0 (초기화)
          {zoom > 1 && <span className="ml-2">| 드래그로 이동</span>}
        </div>

        {/* 다이어그램 컨테이너 */}
        <div 
          ref={containerRef}
          className={`mermaid-container overflow-auto relative ${isProjectStructure ? 'flex flex-col items-center' : ''}`}
          style={{ 
            maxHeight: "90vh",
            minHeight: isProjectStructure ? "400px" : "600px",
            cursor: zoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            width: isProjectStructure ? "100%" : "auto",
            maxWidth: isProjectStructure ? "600px" : "none",
            margin: isProjectStructure ? "0 auto" : "0",
          }}
          onMouseDown={(e) => zoom > 1 && handleMouseDown(e, false)}
        >
          <div
            className={isProjectStructure ? "flex flex-col items-center w-full" : "flex justify-center items-start"}
            style={{
              transform: `translate(${position.x}px, ${position.y}px) scale(${zoom})`,
              transformOrigin: "center center",
              transition: isDragging ? 'none' : 'transform 0.2s ease-in-out',
              width: "100%",
              height: "100%",
            }}
          >
            <div
              dangerouslySetInnerHTML={{ __html: svgContent }}
              className={isProjectStructure ? "w-full max-w-[600px] mx-auto" : ""}
              style={{
                width: isProjectStructure ? "100%" : "100%",
                maxWidth: isProjectStructure ? "600px" : "800px",
                pointerEvents: zoom > 1 ? 'none' : 'auto',
              }}
            />
          </div>
        </div>
      </div>

      {/* 전체화면 모달 */}
      <Dialog open={isFullscreenOpen} onOpenChange={setIsFullscreenOpen}>
        <DialogContent className="!max-w-none !w-screen !h-screen !m-0 !p-4 !rounded-none !translate-x-0 !translate-y-0 !top-0 !left-0 flex flex-col">
          <DialogHeader className="flex-shrink-0 pb-2">
            <DialogTitle className="flex items-center justify-between">
              <span>다이어그램 전체 보기</span>
              <div className="flex items-center gap-2">
                <Button
                  onClick={() => handleZoomOut(true)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 !text-gray-900 hover:!bg-blue-100 hover:!text-blue-700 !font-bold"
                  title="축소"
                >
                  <span className="text-lg">-</span>
                </Button>
                <div className="text-base font-bold text-gray-900 min-w-[60px] text-center">
                  {Math.round(fullscreenZoom * 100)}%
                </div>
                <Button
                  onClick={() => handleZoomIn(true)}
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 !text-gray-900 hover:!bg-blue-100 hover:!text-blue-700 !font-bold"
                  title="확대"
                >
                  <span className="text-lg">+</span>
                </Button>
                <Button
                  onClick={() => handleFitToScreen(true)}
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 !text-gray-900 hover:!bg-green-100 hover:!text-green-700"
                  title="화면에 맞추기"
                >
                  <Maximize2 className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => handleReset(true)}
                  variant="ghost"
                  size="sm"
                  className="h-8 px-3 !text-gray-900 hover:!bg-orange-100 hover:!text-orange-700"
                  title="초기화"
                >
                  <RotateCcw className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div 
            ref={fullscreenContainerRef}
            className="flex-1 overflow-hidden bg-gray-50 rounded-lg p-4 relative"
            style={{
              cursor: fullscreenZoom > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default',
            }}
            onMouseDown={(e) => fullscreenZoom > 1 && handleMouseDown(e, true)}
          >
            <div
              className="flex justify-center items-start"
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
                maxWidth: "800px",
                  pointerEvents: fullscreenZoom > 1 ? 'none' : 'auto',
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
    keywords: ["매핑", "대시보드", "프레젠테이션", "사용 방법"],
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

  for (const line of lines) {
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
      const id = title.toLowerCase().replace(/[^a-z0-9가-힣]+/g, '-').replace(/^-|-$/g, '');
      
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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(techCategories.map(c => c.id)));
  const [activeSection, setActiveSection] = useState<string | null>(null);

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
          loadDoc(docFile.file).then(() => {
            // 문서 로드 후 섹션 설정
            if (sectionId) {
              setTimeout(() => {
                const section = sections.find(s => s.id === sectionId);
                if (section) {
                  setActiveSection(sectionId);
                }
              }, 100);
            }
          });
        } else if (sectionId && sections.length > 0) {
          // 문서는 이미 로드되어 있고 섹션만 변경
          const section = sections.find(s => s.id === sectionId);
          if (section) {
            setActiveSection(sectionId);
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
    
    // 해시 변경 이벤트 리스너
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
        useMaxWidth: false,
        htmlLabels: true,
        curve: "basis",
        nodeSpacing: 80,
        rankSpacing: 120,
        padding: 50,
        defaultRenderer: "dagre-wrapper",
        diagramPadding: 30,
      },
      gantt: {
        useMaxWidth: false,
      },
      themeVariables: {
        fontSize: "22px",
        fontFamily: "Arial, sans-serif",
        primaryColor: "#2196F3",
        primaryTextColor: "#fff",
        primaryBorderColor: "#1976D2",
        lineColor: "#333",
        secondaryColor: "#4CAF50",
        tertiaryColor: "#FF9800",
        fontSize2: "20px",
        fontSize3: "18px",
        primaryBorderColor: "#1976D2",
        primaryTextColor: "#fff",
        noteBkgColor: "#fff5ad",
        noteTextColor: "#333",
        noteBorderColor: "#aaa",
        actorBorder: "#666",
        actorBkg: "#e1f5ff",
        actorTextColor: "#333",
        actorLineColor: "#666",
        signalColor: "#333",
        signalTextColor: "#333",
        labelBoxBkgColor: "#e1f5ff",
        labelBoxBorderColor: "#32638a",
        labelTextColor: "#333",
        loopTextColor: "#333",
        activationBorderColor: "#666",
        activationBkgColor: "#f4f4f4",
        sequenceNumberColor: "#fff",
        sectionBkgColor: "rgba(255, 255, 0, 0.1)",
        altBkgColor: "rgba(255, 255, 0, 0.1)",
        critBkgColor: "rgba(255, 0, 0, 0.1)",
        doneBkgColor: "rgba(0, 255, 0, 0.1)",
        doneBorderColor: "rgba(0, 255, 0, 0.5)",
        activeBkgColor: "rgba(0, 255, 0, 0.2)",
        activeBorderColor: "rgba(0, 255, 0, 0.5)",
        taskBkgColor: "#e1f5ff",
        taskTextColor: "#333",
        taskTextLightColor: "#333",
        taskTextOutsideColor: "#333",
        taskTextClickableColor: "#003163",
        activeTaskBorderColor: "#534fbc",
        activeTaskBkgColor: "#f4f4f4",
        gridColor: "#e0e0e0",
        doneTaskBkgColor: "rgba(0, 255, 0, 0.1)",
        doneTaskBorderColor: "rgba(0, 255, 0, 0.5)",
        critBorderColor: "#ff8888",
        critBkgColor: "#ff0000",
        taskTextColor: "#333",
        taskTextOutsideColor: "#333",
        taskTextLightColor: "#333",
        taskTextClickableColor: "#003163",
        activeTaskBorderColor: "#534fbc",
        activeTaskBkgColor: "#f4f4f4",
        gridColor: "#e0e0e0",
        doneTaskBkgColor: "rgba(0, 255, 0, 0.1)",
        doneTaskBorderColor: "rgba(0, 255, 0, 0.5)",
        critBorderColor: "#ff8888",
        critBkgColor: "#ff0000",
        todayLineColor: "#ff0000",
      },
    });
  }, []);

  const loadDoc = async (fileName: string): Promise<void> => {
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
        
        // 첫 번째 섹션을 활성화 (해시에 섹션이 없으면)
        if (parsedSections.length > 0) {
          const sectionId = hashSectionId && parsedSections.find(s => s.id === hashSectionId) 
            ? hashSectionId 
            : parsedSections[0].id;
          setActiveSection(sectionId);
          
          // 해시 업데이트 (현재 해시와 다를 때만)
          if (docId && hash !== `docs/${docId}/${sectionId}`) {
            window.location.hash = `#docs/${docId}/${sectionId}`;
          }
        } else if (docId && hash !== `docs/${docId}`) {
          window.location.hash = `#docs/${docId}`;
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
          loadDoc(docFile.file).then(() => {
            // 문서 로드 후 섹션 설정
            if (sectionId) {
              setTimeout(() => {
                const section = sections.find(s => s.id === sectionId);
                if (section) {
                  setActiveSection(sectionId);
                }
              }, 100);
            }
          });
        } else if (sectionId && sections.length > 0) {
          // 문서는 이미 로드되어 있고 섹션만 변경
          const section = sections.find(s => s.id === sectionId);
          if (section) {
            setActiveSection(sectionId);
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
    
    // 해시 변경 이벤트 리스너
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sections, selectedDoc, loading]);

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
        <div className="mb-4 sm:mb-6">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2">설계 문서</h1>
          <p className="text-sm sm:text-base text-gray-600">프로젝트의 전체 설계 문서를 단계별로 확인할 수 있습니다.</p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-5 gap-4 sm:gap-6">
          {/* 문서 목록 및 섹션 목록 */}
          <div className="xl:col-span-1 space-y-4">
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">문서 목록</CardTitle>
                <CardDescription className="text-xs sm:text-sm">설계 문서를 선택하세요</CardDescription>
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

            {/* 섹션 목록 - 기술 스택별 그룹화 */}
            {selectedDoc && sections.length > 0 && (
              <Card className="hidden xl:block">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base sm:text-lg">기술 스택별 섹션</CardTitle>
                  <CardDescription className="text-xs sm:text-sm">{sections.length}개 섹션</CardDescription>
                </CardHeader>
                <CardContent className="space-y-2 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {techCategories.map((category) => {
                    const categorySections = sections.filter(s => s.category === category.id);
                    
                    if (categorySections.length === 0) return null;
                    
                    const isExpanded = expandedCategories.has(category.id);
                    
                    return (
                      <div key={category.id} className="space-y-1">
                        <Button
                          variant="ghost"
                          className={`w-full justify-between text-left h-auto py-2 px-2 text-xs sm:text-sm font-semibold ${category.color} hover:bg-gray-100`}
                          onClick={() => {
                            const newExpanded = new Set(expandedCategories);
                            if (isExpanded) {
                              newExpanded.delete(category.id);
                            } else {
                              newExpanded.add(category.id);
                            }
                            setExpandedCategories(newExpanded);
                          }}
                        >
                          <span className="flex items-center gap-2">
                            <ChevronRight 
                              className={`h-3 w-3 flex-shrink-0 transition-transform ${isExpanded ? 'rotate-90' : ''}`} 
                            />
                            <span>{category.title}</span>
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {categorySections.length}
                          </Badge>
                        </Button>
                        
                        {isExpanded && (
                          <div className="ml-4 space-y-1">
                            {categorySections.map((section) => {
                              const isActive = activeSection === section.id;
                              const indentLevel = section.level > 2 ? (section.level - 2) * 4 : 0;
                              
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
                                    setActiveSection(section.id);
                                    const docId = docFiles.find(d => d.file === selectedDoc)?.id;
                                    if (docId) {
                                      window.location.hash = `#docs/${docId}/${section.id}`;
                                    }
                                    window.scrollTo({ top: 0, behavior: 'smooth' });
                                  }}
                                >
                                  <span className="font-normal flex-1 truncate text-left">{section.title}</span>
                                </Button>
                              );
                            })}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  
                  {/* 카테고리에 속하지 않은 섹션 */}
                  {(() => {
                    const uncategorizedSections = sections.filter(s => !s.category || !techCategories.find(c => c.id === s.category));
                    if (uncategorizedSections.length === 0) return null;
                    
                    return (
                      <div className="space-y-1 mt-4 pt-4 border-t">
                        <div className="text-xs font-semibold text-gray-500 px-2 mb-1">기타</div>
                        {uncategorizedSections.map((section) => {
                          const isActive = activeSection === section.id;
                          return (
                            <Button
                              key={section.id}
                              variant={isActive ? "default" : "ghost"}
                              className={`w-full justify-start text-left h-auto py-1.5 px-2 text-xs ${
                                isActive 
                                  ? "!bg-blue-600 !text-white hover:!bg-blue-700" 
                                  : "!text-gray-700 hover:!bg-gray-100"
                              }`}
                              onClick={() => {
                                setActiveSection(section.id);
                                const docId = docFiles.find(d => d.file === selectedDoc)?.id;
                                if (docId) {
                                  window.location.hash = `#docs/${docId}/${section.id}`;
                                }
                                window.scrollTo({ top: 0, behavior: 'smooth' });
                              }}
                            >
                              <span className="font-normal flex-1 truncate text-left">{section.title}</span>
                            </Button>
                          );
                        })}
                      </div>
                    );
                  })()}
                </CardContent>
              </Card>
            )}
          </div>

          {/* 문서 내용 */}
          <div className="xl:col-span-4 min-w-0">
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
                    <Badge variant="outline" className="text-xs sm:text-sm shrink-0">
                      {sections.findIndex(s => s.id === activeSection) + 1} / {sections.length}
                    </Badge>
                  )}
                </div>
                
                {/* 모바일 섹션 선택 드롭다운 */}
                {selectedDoc && sections.length > 0 && (
                  <div className="xl:hidden mt-4">
                    <select
                      value={activeSection || ""}
                      onChange={(e) => {
                        const sectionId = e.target.value;
                        setActiveSection(sectionId);
                        const docId = docFiles.find(d => d.file === selectedDoc)?.id;
                        if (docId) {
                          window.location.hash = `#docs/${docId}/${sectionId}`;
                        }
                        window.scrollTo({ top: 0, behavior: 'smooth' });
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
                      prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:border prose-pre:border-gray-300 prose-pre:overflow-x-auto prose-pre:text-xs sm:prose-pre:text-sm
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
                        components={components}
                      >
                        {`# ${activeSectionData.title}\n\n${activeSectionData.content}`}
                      </ReactMarkdown>
                    </div>
                    
                    {/* 네비게이션 버튼 */}
                    <div className="flex items-center justify-between pt-4 sm:pt-6 border-t gap-4">
                      {sections.findIndex(s => s.id === activeSection) > 0 ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs sm:text-sm"
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === activeSection);
                            const prevSectionId = sections[currentIndex - 1].id;
                            setActiveSection(prevSectionId);
                            const docId = docFiles.find(d => d.file === selectedDoc)?.id;
                            if (docId) {
                              window.location.hash = `#docs/${docId}/${prevSectionId}`;
                            }
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2 rotate-180" />
                          이전
                        </Button>
                      ) : (
                        <div />
                      )}
                      {sections.findIndex(s => s.id === activeSection) < sections.length - 1 ? (
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-xs sm:text-sm"
                          onClick={() => {
                            const currentIndex = sections.findIndex(s => s.id === activeSection);
                            const nextSectionId = sections[currentIndex + 1].id;
                            setActiveSection(nextSectionId);
                            const docId = docFiles.find(d => d.file === selectedDoc)?.id;
                            if (docId) {
                              window.location.hash = `#docs/${docId}/${nextSectionId}`;
                            }
                            window.scrollTo({ top: 0, behavior: 'smooth' });
                          }}
                        >
                          다음
                          <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 ml-1 sm:ml-2" />
                        </Button>
                      ) : (
                        <div />
                      )}
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