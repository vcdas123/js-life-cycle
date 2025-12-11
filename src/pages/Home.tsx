import { Link } from 'react-router-dom'
import { routes } from '../utils/routes'
import Card from '../components/Card'

export default function Home() {
  return (
    <div>
      <div className="text-center mb-12">
        <h1 className="text-5xl font-bold text-gradient mb-4">
          JavaScript Life Cycle Journey
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          A comprehensive guide to understanding how JavaScript code flows from writing to execution,
          covering parsing, compilation, execution context, call stack, event loop, and more.
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        {routes.filter(route => route.path !== '/').map((route, index) => (
          <Link key={route.path} to={route.path}>
            <Card color={['blue', 'purple', 'pink', 'green', 'yellow'][index % 5] as any}>
              <h3 className="text-xl font-bold text-gray-800 mb-2">{route.label}</h3>
              <p className="text-gray-600">{route.description}</p>
            </Card>
          </Link>
        ))}
      </div>

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

      <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-8 text-white shadow-2xl">
        <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
        <p className="text-lg mb-6 opacity-90">
          Begin your journey by clicking on any topic above, or start with the Parsing Phase
          to understand how JavaScript processes your code from the beginning.
        </p>
        <Link
          to="/parsing"
          className="inline-block bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
        >
          Start Learning →
        </Link>
      </div>
    </div>
  )
}

