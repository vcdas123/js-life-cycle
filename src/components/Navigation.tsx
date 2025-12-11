import { Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { routes } from '../utils/routes'

export default function Navigation() {
  const location = useLocation()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
      className="lg:hidden bg-white/90 backdrop-blur-lg shadow-md sticky top-0 z-50 border-b border-purple-100"
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6 py-2 sm:py-2.5">
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link 
              to="/" 
              className="text-sm sm:text-base font-bold text-gradient hover:opacity-80 transition-opacity"
            >
              JS Life Cycle
            </Link>
          </motion.div>

          {/* Mobile/Tablet Menu Button */}
          <motion.button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
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
          </motion.button>
        </div>

        {/* Mobile Dropdown Menu */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden mt-3 pb-3 border-t border-purple-100 overflow-hidden"
            >
              <motion.div
                initial={{ y: -10 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col gap-1.5 pt-3"
              >
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
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.nav>
  )
}

