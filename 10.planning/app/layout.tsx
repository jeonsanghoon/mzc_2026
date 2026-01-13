import type { Metadata } from 'next'
import '../src/styles/globals.css'

export const metadata: Metadata = {
  title: '설계 문서 뷰어 - MZC 2025',
  description: '데이터 통합 플랫폼 기반 지능형 IoT 관리 솔루션 설계 문서',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ko">
      <body>{children}</body>
    </html>
  )
}
