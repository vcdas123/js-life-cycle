import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { routes } from '../utils/routes'

export default function Navigation() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white/90 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-purple-100">
      <div className="container mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-2 sm:py-2.5 max-w-7xl">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <Link 
            to="/" 
            className="text-base sm:text-lg font-bold text-gradient hover:opacity-80 transition-opacity"
          >
            JS Life Cycle
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-2 xl:gap-3 items-center">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`px-2.5 xl:px-3 py-1.5 xl:py-1.5 rounded-md text-xs xl:text-sm font-medium transition-all duration-200 whitespace-nowrap ${
                  location.pathname === route.path
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md scale-105'
                    : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>

          {/* Mobile/Tablet Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden p-1.5 sm:p-2 rounded-md text-gray-700 hover:bg-purple-50 hover:text-purple-600 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-300"
            aria-label="Toggle menu"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {mobileMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-3 pb-3 border-t border-purple-100">
            <div className="flex flex-col gap-1.5 pt-3 animate-fade-in">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-3 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
                    location.pathname === route.path
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  {route.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

