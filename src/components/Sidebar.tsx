import { Link, useLocation } from 'react-router-dom'
import { routes } from '../utils/routes'

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-white/95 backdrop-blur-lg border-r border-purple-100 sticky top-0 h-screen overflow-y-auto shadow-sm">
      <div className="p-5 border-b border-purple-100">
        <Link to="/" className="text-sm font-bold text-gradient hover:opacity-80 transition-opacity inline-block">
          JS Life Cycle
        </Link>
        <p className="text-xs text-gray-500 mt-1">JavaScript Execution Journey</p>
      </div>
      <nav className="flex-1 p-4">
        <ul className="space-y-1.5">
          {routes.map((route) => (
            <li key={route.path}>
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
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  )
}

