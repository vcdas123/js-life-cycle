import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { routes } from '../utils/routes'

export default function Sidebar() {
  const location = useLocation()

  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
      className="hidden lg:flex flex-col w-64 bg-white/95 backdrop-blur-lg border-r border-purple-100 sticky top-0 h-screen overflow-y-auto shadow-sm"
    >
      <div className="p-5 border-b border-purple-100">
        <Link to="/" className="text-sm font-bold text-gradient hover:opacity-80 transition-opacity inline-block">
          JS Life Cycle
        </Link>
        <p className="text-xs text-gray-500 mt-1">JavaScript Execution Journey</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1.5">
          {routes.map((route, index) => (
            <motion.li
              key={route.path}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <motion.div
                whileHover={{ x: 4 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to={route.path}
                  className={`block px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ${
                    location.pathname === route.path
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md'
                      : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                  }`}
                >
                  {route.label}
                </Link>
              </motion.div>
            </motion.li>
          ))}
        </ul>
      </nav>
    </motion.aside>
  )
}

