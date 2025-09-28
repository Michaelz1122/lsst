'use client'

import { ReactNode } from 'react'
import PublicNavigation from './PublicNavigation'

interface PublicLayoutProps {
  children: ReactNode
  currentPath?: string
}

export default function PublicLayout({ children, currentPath }: PublicLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <PublicNavigation currentPath={currentPath} />
      <main className="pt-20"> {/* Add padding top to account for fixed navbar */}
        {children}
      </main>
    </div>
  )
}