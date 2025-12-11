import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'
import VisualBox from '../components/VisualBox'

export default function EventLoop() {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-3 sm:mb-4">Event Loop</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
          The event loop is the mechanism that enables JavaScript's asynchronous, non-blocking
          behavior. It's the secret behind how JavaScript can handle concurrent operations
          on a single thread.
        </p>
      </div>

      <StepCard
        step={1}
        title="The Problem: Single-Threaded Language"
        description={
          <p>
            JavaScript is <strong>single-threaded</strong>, meaning it can only execute one
            operation at a time on the main thread. Without the event loop, long-running operations
            would freeze the entire application. The event loop solves this by offloading work to
            Web APIs and queueing callbacks.
          </p>
        }
        color="blue"
      >
        <CodeBlock>
{`// Without event loop (blocking):
function fetchData() {
  // This would freeze the browser for 3 seconds
  const start = Date.now();
  while (Date.now() - start < 3000) {}
  return "Data";
}

// With event loop (non-blocking):
function fetchDataAsync() {
  setTimeout(() => {
    return "Data"; // Returns after 3 seconds, doesn't block
  }, 3000);
}

// The event loop allows other code to run while waiting`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={2}
        title="How the Event Loop Works"
        description={
          <p>
            The event loop continuously checks if the call stack is empty. When it is, it takes
            the first task from the callback queue and pushes it onto the call stack for execution.
            This process repeats indefinitely, creating the illusion of concurrent execution.
          </p>
        }
        color="purple"
      >
        <VisualBox title="Event Loop Architecture" color="bg-purple-500">
          <div className="grid grid-cols-3 gap-4 font-mono text-xs">
            <div className="space-y-2">
              <div className="bg-blue-100 p-2 rounded border-2 border-blue-400">
                <div className="font-bold mb-1">Call Stack</div>
                <div className="bg-white p-1 rounded">main()</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-green-100 p-2 rounded border-2 border-green-400">
                <div className="font-bold mb-1">Web APIs</div>
                <div className="bg-white p-1 rounded mb-1">setTimeout</div>
                <div className="bg-white p-1 rounded mb-1">DOM Events</div>
                <div className="bg-white p-1 rounded">fetch</div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="bg-yellow-100 p-2 rounded border-2 border-yellow-400">
                <div className="font-bold mb-1">Callback Queue</div>
                <div className="bg-white p-1 rounded">cb1()</div>
                <div className="bg-white p-1 rounded">cb2()</div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <div className="inline-block bg-purple-200 px-4 py-2 rounded font-bold">
              Event Loop: "Is stack empty? → Move callback to stack"
            </div>
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={3}
        title="Event Loop Algorithm"
        description={
          <p>
            The event loop follows a specific algorithm: First, it executes all synchronous code
            and empties the call stack. Then it processes microtasks (Promise callbacks) before
            macrotasks (setTimeout, setInterval). This ensures promises resolve before other callbacks.
          </p>
        }
        color="pink"
      >
        <CodeBlock>
{`console.log("1");

setTimeout(() => console.log("2"), 0); // Macrotask

Promise.resolve().then(() => console.log("3")); // Microtask

console.log("4");

// Execution Order:
// 1. "1" - synchronous
// 2. setTimeout queued (macrotask)
// 3. Promise queued (microtask)
// 4. "4" - synchronous
// 5. Call stack empty → Process microtasks first
// 6. "3" - microtask (Promise)
// 7. Process macrotasks
// 8. "2" - macrotask (setTimeout)

// Output: "1", "4", "3", "2"`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={4}
        title="Event Loop Phases (Node.js)"
        description={
          <p>
            In Node.js, the event loop has distinct phases: Timers (setTimeout/setInterval),
            Pending callbacks, Idle/Prepare, Poll (fetch new I/O events), Check (setImmediate),
            and Close callbacks. Each phase processes its own queue before moving to the next.
          </p>
        }
        color="green"
      >
        <VisualBox title="Node.js Event Loop Phases" color="bg-green-500">
          <div className="space-y-2 font-mono text-xs">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center text-white font-bold">1</div>
              <div className="flex-1 bg-green-50 p-2 rounded">Timers: setTimeout, setInterval</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center text-white font-bold">2</div>
              <div className="flex-1 bg-blue-50 p-2 rounded">Pending Callbacks: Deferred callbacks</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center text-white font-bold">3</div>
              <div className="flex-1 bg-purple-50 p-2 rounded">Idle/Prepare: Internal use</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-pink-500 rounded-full flex items-center justify-center text-white font-bold">4</div>
              <div className="flex-1 bg-pink-50 p-2 rounded">Poll: Fetch new I/O events</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">5</div>
              <div className="flex-1 bg-yellow-50 p-2 rounded">Check: setImmediate callbacks</div>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white font-bold">6</div>
              <div className="flex-1 bg-red-50 p-2 rounded">Close: Close event callbacks</div>
            </div>
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={5}
        title="Rendering and the Event Loop"
        description={
          <p>
            In browsers, the event loop coordinates with the rendering pipeline. After processing
            microtasks, the browser may render updates (repaint/reflow) before processing more
            macrotasks. This ensures smooth 60fps rendering.
          </p>
        }
        color="yellow"
      >
        <CodeBlock>
{`// Browser Event Loop with Rendering:

// 1. Execute synchronous code
console.log("Sync code");

// 2. Execute microtasks (Promises)
Promise.resolve().then(() => console.log("Microtask"));

// 3. Render update (if needed)
// Browser may render here for 60fps

// 4. Execute macrotasks (setTimeout, etc.)
setTimeout(() => console.log("Macrotask"), 0);

// Rendering happens between microtasks and macrotasks
// This ensures UI stays responsive`}
        </CodeBlock>
      </StepCard>

      <Card color="purple" className="mt-8">
        <h3 className="text-xl font-bold mb-3">Event Loop Rules</h3>
        <ol className="space-y-2 text-gray-700 list-decimal list-inside">
          <li>Execute all synchronous code first (until call stack is empty)</li>
          <li>Process all microtasks before any macrotasks</li>
          <li>Process one macrotask at a time</li>
          <li>After each macrotask, check for microtasks again</li>
          <li>Rendering (browser) happens after microtasks, before next macrotask</li>
          <li>Repeat indefinitely</li>
        </ol>
      </Card>
    </div>
  )
}

