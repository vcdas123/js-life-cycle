import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { routes } from '../utils/routes'
import Card from '../components/Card'

export default function Home() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-8 sm:mb-12"
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient mb-3 sm:mb-4 px-2">
          JavaScript Life Cycle Journey
        </h1>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto px-4"
        >
          A comprehensive guide to understanding how JavaScript code flows from writing to execution,
          covering parsing, compilation, execution context, call stack, event loop, and more.
        </motion.p>
      </motion.div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-8 sm:mb-12">
        {routes.filter(route => route.path !== '/').map((route, index) => (
          <Link key={route.path} to={route.path}>
            <Card color={['blue', 'purple', 'pink', 'green', 'yellow'][index % 5] as any} index={index}>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{route.label}</h3>
              <p className="text-gray-600">{route.description}</p>
            </Card>
          </Link>
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card color="purple" className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Overview</h2>
          <p className="text-gray-700 leading-relaxed mb-4">
            This interactive guide takes you through the complete journey of JavaScript code execution,
            from the moment you write code to its final execution. Understanding these concepts is crucial
            for writing efficient, performant, and bug-free JavaScript applications.
          </p>
          <div className="space-y-2">
            <h3 className="font-semibold text-gray-800">Topics Covered:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1 ml-4">
              <li>Code Parsing and Tokenization</li>
              <li>AST (Abstract Syntax Tree) Generation</li>
              <li>Execution Context Creation</li>
              <li>Call Stack Management</li>
              <li>Event Loop Mechanism</li>
              <li>Task Queues (Microtasks and Macrotasks)</li>
              <li>Promise Resolution and Async/Await</li>
              <li>Web APIs Integration</li>
              <li>Memory Management and Garbage Collection</li>
            </ul>
          </div>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.6 }}
        className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 sm:p-8 text-white shadow-2xl"
      >
        <h2 className="text-2xl sm:text-3xl font-bold mb-3 sm:mb-4">Ready to Start?</h2>
        <p className="text-base sm:text-lg mb-4 sm:mb-6 opacity-90">
          Begin your journey by clicking on any topic above, or start with the Parsing Phase
          to understand how JavaScript processes your code from the beginning.
        </p>
        <Link to="/parsing">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block bg-white text-purple-600 px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
          >
            Start Learning →
          </motion.div>
        </Link>
      </motion.div>
    </div>
  )
}

