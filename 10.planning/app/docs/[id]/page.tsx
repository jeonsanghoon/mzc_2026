import { notFound } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowLeft, FileText } from 'lucide-react'
import fs from 'fs'
import path from 'path'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const docFiles: Record<string, string> = {
  'process-flow': 'PROCESS_FLOW.md',
  'project-analysis': 'PROJECT_ANALYSIS.md',
  'readme': 'README.md',
}

export default async function DocPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const fileName = docFiles[id]

  if (!fileName) {
    notFound()
  }

  const filePath = path.join(process.cwd(), '00.doc', fileName)
  
  let content = ''
  try {
    content = fs.readFileSync(filePath, 'utf-8')
  } catch (error) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              문서 목록으로
            </Button>
          </Link>
          <div className="flex items-center gap-2 mb-2">
            <FileText className="h-5 w-5 text-gray-600" />
            <h1 className="text-3xl font-bold text-gray-900">{fileName}</h1>
          </div>
        </div>

        <Card className="bg-white">
          <CardContent className="p-8">
            <div className="prose prose-slate max-w-none">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
