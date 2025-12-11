import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { routes } from '../utils/routes'

export default function Navigation() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-xl sm:text-2xl font-bold text-gradient">
            JS Life Cycle
          </Link>
          
          {/* Desktop Navigation */}
          <div className="hidden lg:flex gap-4 xl:gap-6 items-center flex-wrap">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`px-2 xl:px-3 py-1.5 xl:py-2 rounded-lg text-sm xl:text-base font-medium transition-all duration-200 whitespace-nowrap ${
                  location.pathname === route.path
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>

          {/* Tablet Navigation */}
          <div className="hidden md:flex lg:hidden">
            <select
              value={location.pathname}
              onChange={(e) => {
                window.location.href = e.target.value
              }}
              className="px-3 py-2 rounded-lg border border-purple-300 bg-white text-gray-700 text-sm"
            >
              {routes.map((route) => (
                <option key={route.path} value={route.path}>
                  {route.label}
                </option>
              ))}
            </select>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-purple-100 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6"
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
          <div className="md:hidden mt-4 pb-4 border-t border-purple-200">
            <div className="flex flex-col gap-2 pt-4">
              {routes.map((route) => (
                <Link
                  key={route.path}
                  to={route.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-2 rounded-lg text-base font-medium transition-all duration-200 ${
                    location.pathname === route.path
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                      : 'text-gray-700 hover:bg-purple-100 hover:text-purple-600'
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

