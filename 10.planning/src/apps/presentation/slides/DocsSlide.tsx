import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../components/ui/card';
import { Button } from '../../../components/ui/button';
import { FileText, BookOpen, GitBranch } from 'lucide-react';
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { motion } from 'motion/react';

const docFiles = [
  {
    id: "process-flow",
    title: "PROCESS_FLOW.md",
    description: "전체 시스템 프로세스를 Mermaid 다이어그램으로 정리한 문서",
    icon: GitBranch,
    color: "text-blue-400",
    file: "PROCESS_FLOW.md",
  },
  {
    id: "project-analysis",
    title: "PROJECT_ANALYSIS.md",
    description: "프로젝트 상세 분석 및 기술 스택 문서",
    icon: BookOpen,
    color: "text-purple-400",
    file: "PROJECT_ANALYSIS.md",
  },
  {
    id: "readme",
    title: "README.md",
    description: "프로젝트 개요 및 빠른 시작 가이드",
    icon: FileText,
    color: "text-green-400",
    file: "README.md",
  },
];

export function DocsSlide() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);
  const [docContent, setDocContent] = useState<string>("");
  const [loading, setLoading] = useState(false);

  const loadDoc = async (fileName: string) => {
    setLoading(true);
    try {
      const response = await fetch(`/00.doc/${fileName}`);
      if (response.ok) {
        const content = await response.text();
        setDocContent(content);
        setSelectedDoc(fileName);
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

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-4 sm:space-y-6 md:space-y-8 h-full flex flex-col text-white"
    >
      <div className="text-center mb-4 sm:mb-6">
        <h2 className="text-2xl sm:text-3xl md:text-4xl mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-green-400 bg-clip-text text-transparent font-bold">
          설계 문서
        </h2>
        <p className="text-base sm:text-lg text-slate-200 max-w-3xl mx-auto">
          프로젝트의 전체 설계 문서를 확인할 수 있습니다
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 flex-1 overflow-auto">
        {/* 문서 목록 */}
        <div className="lg:col-span-1">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20">
            <CardHeader>
              <CardTitle className="text-white">문서 목록</CardTitle>
              <CardDescription className="text-slate-300">설계 문서를 선택하세요</CardDescription>
            </CardHeader>
            <CardContent className="space-y-2">
              {docFiles.map((doc) => {
                const Icon = doc.icon;
                const isActive = selectedDoc === doc.file;
                return (
                  <Button
                    key={doc.id}
                    variant={isActive ? "default" : "outline"}
                    className={`w-full justify-start ${
                      isActive 
                        ? "bg-white/20 text-white border-white/30" 
                        : "bg-white/5 text-slate-200 border-white/10 hover:bg-white/10"
                    }`}
                    onClick={() => loadDoc(doc.file)}
                    disabled={loading}
                  >
                    <Icon className={`h-4 w-4 mr-2 ${doc.color}`} />
                    {doc.title}
                  </Button>
                );
              })}
            </CardContent>
          </Card>
        </div>

        {/* 문서 내용 */}
        <div className="lg:col-span-2">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 h-full">
            <CardHeader>
              <CardTitle className="text-white">
                {selectedDoc ? (
                  docFiles.find((d) => d.file === selectedDoc)?.title || selectedDoc
                ) : (
                  "문서를 선택하세요"
                )}
              </CardTitle>
              <CardDescription className="text-slate-300">
                {selectedDoc
                  ? docFiles.find((d) => d.file === selectedDoc)?.description
                  : "왼쪽에서 문서를 선택하여 내용을 확인하세요"}
              </CardDescription>
            </CardHeader>
            <CardContent className="overflow-auto max-h-[60vh]">
              {loading ? (
                <div className="flex items-center justify-center py-12">
                  <div className="text-slate-300">문서를 불러오는 중...</div>
                </div>
              ) : docContent ? (
                <div className="prose prose-invert prose-slate max-w-none 
                  prose-headings:text-white prose-headings:font-bold
                  prose-p:text-slate-200 prose-p:leading-relaxed
                  prose-strong:text-white prose-strong:font-semibold
                  prose-code:text-green-300 prose-code:bg-slate-800/50 prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded prose-code:text-sm
                  prose-pre:bg-slate-900/80 prose-pre:text-slate-100 prose-pre:border prose-pre:border-white/20
                  prose-a:text-blue-300 prose-a:no-underline hover:prose-a:underline
                  prose-li:text-slate-200 prose-ul:text-slate-200 prose-ol:text-slate-200
                  prose-blockquote:text-slate-300 prose-blockquote:border-l-white/30
                  prose-h1:text-white prose-h2:text-white prose-h3:text-white prose-h4:text-white
                  prose-table:text-slate-200 prose-th:text-white prose-td:text-slate-200">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {docContent}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="flex items-center justify-center py-12 text-slate-400">
                  문서를 선택하세요
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
