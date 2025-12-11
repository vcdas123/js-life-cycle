import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <motion.footer
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white/90 backdrop-blur-lg border-t border-purple-100 mt-auto"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          {/* Left Section - Made by */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <p className="text-sm text-gray-600">
              Made with <span className="text-red-500">♥</span> by{' '}
              <span className="font-semibold text-gray-800">Vaskar Chandra Das</span>
            </p>
            <div className="flex gap-4">
              {/* LinkedIn Icon */}
              <motion.a
                href="https://www.linkedin.com/in/vcdas/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-blue-600 transition-colors"
                aria-label="LinkedIn Profile"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </motion.a>
              
              {/* GitHub Icon */}
              <motion.a
                href="https://github.com/vcdas123/js-life-cycle"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="text-gray-600 hover:text-gray-900 transition-colors"
                aria-label="GitHub Repository"
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
              </motion.a>
            </div>
          </div>

          {/* Right Section - Tech Stack */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col items-center md:items-end gap-3"
          >
            <p className="text-xs text-gray-500 uppercase tracking-wide font-medium">
              Built with
            </p>
            <div className="flex flex-wrap justify-center md:justify-end gap-4">
              {/* JavaScript */}
              <motion.a
                href="https://developer.mozilla.org/en-US/docs/Web/JavaScript"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-gray-600 hover:text-yellow-500 transition-colors group"
                title="JavaScript"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3,3H21V21H3V3M7.73,18.04C8.13,18.89 8.92,19.59 10.27,19.59C11.77,19.59 12.8,18.79 12.8,17.04V11.26H11.1V17C11.1,17.86 10.75,18.26 10.2,18.26C9.62,18.26 9.38,17.9 9.11,17.5L7.73,18.04M13.71,17.86C14.21,18.84 15.22,19.59 16.8,19.59C18.4,19.59 19.6,18.76 19.6,17.23C19.6,15.82 18.79,15.19 17.35,14.57L16.93,14.39C16.2,14.08 15.89,13.87 15.89,13.37C15.89,12.96 16.2,12.64 16.7,12.64C17.18,12.64 17.5,12.85 17.79,13.37L19.1,12.5C18.55,11.54 17.77,11.17 16.7,11.17C15.19,11.17 14.22,12.13 14.22,13.4C14.22,14.78 15.03,15.43 16.25,15.95L16.67,16.13C17.45,16.47 17.91,16.68 17.91,17.26C17.91,17.74 17.46,18.09 16.76,18.09C15.93,18.09 15.45,17.66 15.09,17.06L13.71,17.86Z" />
                </svg>
                <span className="text-xs font-medium hidden sm:inline group-hover:underline">JS</span>
              </motion.a>

              {/* HTML */}
              <motion.a
                href="https://developer.mozilla.org/en-US/docs/Web/HTML"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition-colors group"
                title="HTML"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 18l-1.67-1.67L12 14.67l1.67 1.66L12 18zm-6-6l-1.67-1.67L6 10.67l1.67 1.66L6 12zm12 0l-1.67-1.67L18 10.67l1.67 1.66L18 12zm-6-6l-1.67-1.67L12 4.67l1.67 1.66L12 6zM3 3h18v18H3V3zm16 16V5H5v14h14z"/>
                </svg>
                <span className="text-xs font-medium hidden sm:inline group-hover:underline">HTML</span>
              </motion.a>

              {/* CSS */}
              <motion.a
                href="https://developer.mozilla.org/en-US/docs/Web/CSS"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors group"
                title="CSS"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M5 3l-.65 3.34h13.59L17.5 8.5H3.92l-.66 3.33h13.59l-.76 3.81-5.48 1.81-4.75-1.81.33-1.64H2.85l-.79 4 7.85 3 9.05-3 1.2-6.03.24-1.21L21.94 3H5z"/>
                </svg>
                <span className="text-xs font-medium hidden sm:inline group-hover:underline">CSS</span>
              </motion.a>

              {/* Tailwind CSS */}
              <motion.a
                href="https://tailwindcss.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-gray-600 hover:text-cyan-500 transition-colors group"
                title="Tailwind CSS"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6C9.33 6 7.67 7.33 7 10C8 8.33 9.17 7.83 10.5 8.5C11.26 8.87 11.81 9.46 12.58 10.17C13.85 11.34 15.47 12.67 18 12.67C20.67 12.67 22.33 11.34 23 8.67C22 10.34 20.83 10.84 19.5 10.17C18.74 9.8 18.19 9.21 17.42 8.5C16.15 7.33 14.53 6 12 6ZM7 12.67C4.33 12.67 2.67 14 2 16.67C3 15 4.17 14.5 5.5 15.17C6.26 15.54 6.81 16.13 7.58 16.84C8.85 18 10.47 19.34 13 19.34C15.67 19.34 17.33 18 18 15.33C17 17 15.83 17.5 14.5 16.83C13.74 16.46 13.19 15.87 12.42 15.16C11.15 14 9.53 12.67 7 12.67Z" />
                </svg>
                <span className="text-xs font-medium hidden sm:inline group-hover:underline">Tailwind</span>
              </motion.a>

              {/* React */}
              <motion.a
                href="https://react.dev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-400 transition-colors group"
                title="React"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <circle cx="12" cy="12" r="2" fill="currentColor"/>
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" fill="none" stroke="currentColor" strokeWidth="1.5"/>
                  <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(60 12 12)"/>
                  <ellipse cx="12" cy="12" rx="10" ry="3.5" fill="none" stroke="currentColor" strokeWidth="1" transform="rotate(-60 12 12)"/>
                </svg>
                <span className="text-xs font-medium hidden sm:inline group-hover:underline">React</span>
              </motion.a>

              {/* Vite */}
              <motion.a
                href="https://vitejs.dev"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-gray-600 hover:text-purple-500 transition-colors group"
                title="Vite"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12.089 3.634L2.175 19.027h2.299l1.925-3.862 10.213.002-1.927 3.86h8.444L12.089 3.634zm.826 13.239l-3.215-6.53 6.43-1.338-3.215 7.868z"/>
                </svg>
                <span className="text-xs font-medium hidden sm:inline group-hover:underline">Vite</span>
              </motion.a>

              {/* TypeScript */}
              <motion.a
                href="https://www.typescriptlang.org"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -2 }}
                whileTap={{ scale: 0.9 }}
                className="flex items-center gap-2 text-gray-600 hover:text-blue-600 transition-colors group"
                title="TypeScript"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="0" y="0" width="24" height="24" rx="2" fill="#3178C6"/>
                  <path d="M13.904 10.596h2.03v1.068h-2.03v5.396h-1.122v-7.464h3.152v-1.068h-4.274v1.068h1.122zm7.04 0v1.068h-1.887v6.328h-1.122v-6.328h-1.887v-1.068h4.896z" fill="white"/>
                </svg>
                <span className="text-xs font-medium hidden sm:inline group-hover:underline">TS</span>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </div>
    </motion.footer>
  )
}

