import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import ParsingPhase from './pages/ParsingPhase'
import ExecutionContext from './pages/ExecutionContext'
import CallStack from './pages/CallStack'
import EventLoop from './pages/EventLoop'
import TaskQueues from './pages/TaskQueues'
import PromisesAsync from './pages/PromisesAsync'
import MemoryManagement from './pages/MemoryManagement'
import WebAPIs from './pages/WebAPIs'
import CompleteJourney from './pages/CompleteJourney'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/parsing" element={<ParsingPhase />} />
        <Route path="/execution-context" element={<ExecutionContext />} />
        <Route path="/call-stack" element={<CallStack />} />
        <Route path="/event-loop" element={<EventLoop />} />
        <Route path="/task-queues" element={<TaskQueues />} />
        <Route path="/promises-async" element={<PromisesAsync />} />
        <Route path="/web-apis" element={<WebAPIs />} />
        <Route path="/memory-management" element={<MemoryManagement />} />
        <Route path="/complete-journey" element={<CompleteJourney />} />
      </Routes>
    </Layout>
  )
}

export default App

