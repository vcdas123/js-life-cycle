import { ReactNode } from 'react'
import Navigation from './Navigation'
import Sidebar from './Sidebar'
import Footer from './Footer'

interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex flex-1">
        {/* Sidebar for Desktop */}
        <Sidebar />
        
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* Top Navigation for Mobile/Tablet */}
          <Navigation />
          
          {/* Page Content */}
          <main className="flex-1 container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
            {children}
          </main>
        </div>
      </div>
      
      {/* Footer */}
      <Footer />
    </div>
  )
}

