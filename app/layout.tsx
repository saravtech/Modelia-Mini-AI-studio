import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Modelia – Mini AI Studio',
  description: 'Simplified AI studio mock built with Next.js',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
