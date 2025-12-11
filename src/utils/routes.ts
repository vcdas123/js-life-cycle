export interface Route {
  path: string
  label: string
  description: string
}

export const routes: Route[] = [
  { path: '/', label: 'Home', description: 'Overview of JavaScript execution' },
  { path: '/parsing', label: 'Parsing Phase', description: 'How JavaScript code is parsed' },
  { path: '/execution-context', label: 'Execution Context', description: 'Understanding execution contexts' },
  { path: '/call-stack', label: 'Call Stack', description: 'Function call stack mechanics' },
  { path: '/event-loop', label: 'Event Loop', description: 'The heart of asynchronous JavaScript' },
  { path: '/task-queues', label: 'Task Queues', description: 'Microtasks and macrotasks' },
  { path: '/promises-async', label: 'Promises & Async', description: 'Promise resolution and async/await' },
  { path: '/web-apis', label: 'Web APIs', description: 'Browser APIs and their interaction' },
  { path: '/memory-management', label: 'Memory Management', description: 'Memory allocation and garbage collection' },
  { path: '/complete-journey', label: 'Complete Journey', description: 'End-to-end code execution flow' },
]

