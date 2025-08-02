import React from 'react'
import AppHeader from '@/components/AppHeader'
import AppSidebar from '@/components/AppSidebar'

async function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="full-height main">
      <AppHeader />
      <div className="flex-row">
        <AppSidebar />
        <div className="main-layout">
          <div className="max-content-width">{children}</div>
        </div>
      </div>
    </div>
  )
}

export default Layout
