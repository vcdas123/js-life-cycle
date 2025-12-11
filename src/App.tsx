import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Layout from './components/Layout'
import AnimatedPage from './components/AnimatedPage'
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

function AppRoutes() {
  const location = useLocation()

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<AnimatedPage><Home /></AnimatedPage>} />
        <Route path="/parsing" element={<AnimatedPage><ParsingPhase /></AnimatedPage>} />
        <Route path="/execution-context" element={<AnimatedPage><ExecutionContext /></AnimatedPage>} />
        <Route path="/call-stack" element={<AnimatedPage><CallStack /></AnimatedPage>} />
        <Route path="/event-loop" element={<AnimatedPage><EventLoop /></AnimatedPage>} />
        <Route path="/task-queues" element={<AnimatedPage><TaskQueues /></AnimatedPage>} />
        <Route path="/promises-async" element={<AnimatedPage><PromisesAsync /></AnimatedPage>} />
        <Route path="/web-apis" element={<AnimatedPage><WebAPIs /></AnimatedPage>} />
        <Route path="/memory-management" element={<AnimatedPage><MemoryManagement /></AnimatedPage>} />
        <Route path="/complete-journey" element={<AnimatedPage><CompleteJourney /></AnimatedPage>} />
      </Routes>
    </AnimatePresence>
  )
}

function App() {
  return (
    <Layout>
      <AppRoutes />
    </Layout>
  )
}

export default App

