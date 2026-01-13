import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, FileText, BookOpen, GitBranch } from 'lucide-react'

export default function DocsPage() {
  const docs = [
    {
      id: 'process-flow',
      title: 'PROCESS_FLOW.md',
      description: '전체 시스템 프로세스를 Mermaid 다이어그램으로 정리한 문서',
      icon: GitBranch,
      color: 'blue',
    },
    {
      id: 'project-analysis',
      title: 'PROJECT_ANALYSIS.md',
      description: '프로젝트 상세 분석 및 기술 스택 문서',
      icon: BookOpen,
      color: 'purple',
    },
    {
      id: 'readme',
      title: 'README.md',
      description: '프로젝트 개요 및 빠른 시작 가이드',
      icon: FileText,
      color: 'green',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              홈으로
            </Button>
          </Link>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            설계 문서
          </h1>
          <p className="text-lg text-gray-600">
            프로젝트의 전체 설계 문서를 확인할 수 있습니다.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {docs.map((doc) => {
            const Icon = doc.icon
            const colorClasses = {
              blue: 'bg-blue-100 text-blue-600',
              purple: 'bg-purple-100 text-purple-600',
              green: 'bg-green-100 text-green-600',
            }
            
            return (
              <Card key={doc.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className={`h-12 w-12 rounded-lg ${colorClasses[doc.color as keyof typeof colorClasses]} flex items-center justify-center mb-4`}>
                    <Icon className="h-6 w-6" />
                  </div>
                  <CardTitle>{doc.title}</CardTitle>
                  <CardDescription>{doc.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Link href={`/docs/${doc.id}`}>
                    <Button variant="outline" className="w-full">
                      문서 보기
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            )
          })}
        </div>

        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2">
          <CardHeader>
            <CardTitle>문서 위치</CardTitle>
            <CardDescription>
              모든 설계 문서는 <code className="bg-white px-2 py-1 rounded">00.doc/</code> 디렉토리에 있습니다.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>• <code>00.doc/PROCESS_FLOW.md</code> - 프로세스 플로우 다이어그램</li>
              <li>• <code>00.doc/PROJECT_ANALYSIS.md</code> - 프로젝트 분석 문서</li>
              <li>• <code>00.doc/README.md</code> - 프로젝트 개요</li>
            </ul>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
