import { Link, useLocation } from 'react-router-dom'
import { routes } from '../utils/routes'

export default function Navigation() {
  const location = useLocation()

  return (
    <nav className="bg-white/80 backdrop-blur-md shadow-lg sticky top-0 z-50 border-b border-purple-200">
      <div className="container mx-auto px-4 py-4 max-w-7xl">
        <div className="flex items-center justify-between">
          <Link to="/" className="text-2xl font-bold text-gradient">
            JS Life Cycle
          </Link>
          <div className="hidden md:flex gap-6 items-center">
            {routes.map((route) => (
              <Link
                key={route.path}
                to={route.path}
                className={`px-3 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === route.path
                    ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg'
                    : 'text-gray-700 hover:bg-purple-100 hover:text-purple-600'
                }`}
              >
                {route.label}
              </Link>
            ))}
          </div>
          <div className="md:hidden">
            <select
              value={location.pathname}
              onChange={(e) => (window.location.href = e.target.value)}
              className="px-3 py-2 rounded-lg border border-purple-300 bg-white text-gray-700"
            >
              {routes.map((route) => (
                <option key={route.path} value={route.path}>
                  {route.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>
    </nav>
  )
}

