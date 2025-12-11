import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'
import VisualBox from '../components/VisualBox'

export default function WebAPIs() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-4">Web APIs</h1>
        <p className="text-xl text-gray-600">
          How browser Web APIs interact with JavaScript execution, offloading work
          from the main thread and integrating with the event loop.
        </p>
      </div>

      <StepCard
        step={1}
        title="What are Web APIs?"
        description={
          <p>
            <strong>Web APIs</strong> are browser-provided interfaces that extend JavaScript's
            capabilities beyond the core language. They run outside the JavaScript engine,
            often on separate threads, and communicate back via callbacks. Examples include
            DOM, Fetch, setTimeout, setInterval, and many others.
          </p>
        }
        color="blue"
      >
        <VisualBox title="Web API Architecture" color="bg-blue-500">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="border-2 border-blue-400 rounded p-3 bg-blue-50">
              <div className="font-bold mb-2">JavaScript Engine</div>
              <div className="text-xs text-gray-600">Single-threaded</div>
              <div className="text-xs text-gray-600">Call Stack</div>
              <div className="text-xs text-gray-600">Event Loop</div>
            </div>
            <div className="border-2 border-green-400 rounded p-3 bg-green-50">
              <div className="font-bold mb-2">Web APIs (Browser)</div>
              <div className="text-xs text-gray-600">setTimeout</div>
              <div className="text-xs text-gray-600">fetch/XHR</div>
              <div className="text-xs text-gray-600">DOM Events</div>
              <div className="text-xs text-gray-600">Geolocation</div>
              <div className="text-xs text-gray-600">Web Workers</div>
            </div>
          </div>
          <div className="mt-3 text-center text-xs text-gray-600">
            Web APIs run in separate threads/processes, communicate via callbacks
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={2}
        title="setTimeout and setInterval"
        description={
          <p>
            <code className="bg-gray-200 px-1 rounded">setTimeout</code> and 
            <code className="bg-gray-200 px-1 rounded">setInterval</code> are Web APIs, not
            part of JavaScript itself. They use the browser's timer system. When the timer
            expires, the callback is added to the <strong>macrotask queue</strong>.
          </p>
        }
        color="purple"
      >
        <CodeBlock>
{`console.log("1");

// setTimeout is a Web API call
// Browser starts a timer (not JavaScript!)
const timerId = setTimeout(() => {
  console.log("2"); // This callback will be queued as MACROTASK
}, 1000);

console.log("3");

// Execution:
// 1. "1" - synchronous
// 2. setTimeout() called - Web API (browser timer starts, JS continues)
// 3. "3" - synchronous (doesn't wait for timer)
// 4. After 1000ms, browser queues callback to macrotask queue
// 5. Event loop processes it: "2"

// Output: "1", "3", ... (1 second) ... "2"

// Note: setTimeout(0) doesn't mean "execute immediately"
// It means "queue as soon as possible" (next macrotask cycle)`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={3}
        title="Fetch API"
        description={
          <p>
            The <code className="bg-gray-200 px-1 rounded">fetch()</code> API handles HTTP
            requests asynchronously. The network request happens on a separate thread. When
            the response arrives, the Promise callbacks are queued as <strong>microtasks</strong>.
          </p>
        }
        color="pink"
      >
        <CodeBlock>
{`console.log("1");

// fetch() is a Web API - network request happens on separate thread
fetch('https://api.example.com/data')
  .then(response => {
    console.log("2. Response received");
    return response.json();
  })
  .then(data => {
    console.log("3. Data parsed", data);
  })
  .catch(error => {
    console.log("Error:", error);
  });

console.log("4");

// Execution:
// 1. "1" - synchronous
// 2. fetch() called - Web API starts network request (non-blocking)
// 3. "4" - synchronous (doesn't wait for network)
// 4. Promise.then() callbacks queued as MICROTASKS
// 5. When response arrives:
//    - Promise resolves
//    - .then() callbacks execute as microtasks: "2", "3"

// Output: "1", "4", ... (network delay) ... "2", "3"`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={4}
        title="DOM Events"
        description={
          <p>
            DOM events (clicks, keypresses, etc.) are handled by the browser's event system.
            When an event occurs, the browser queues the event handler callback to the
            <strong>macrotask queue</strong>. Multiple events are processed one at a time.
          </p>
        }
        color="green"
      >
        <CodeBlock>
{`console.log("1");

// Event listener registration
button.addEventListener('click', () => {
  console.log("2. Clicked!"); // Queued as MACROTASK when event fires
});

console.log("3");

// If button is clicked:
// Execution:
// 1. "1" - synchronous
// 2. addEventListener() registers handler (no execution yet)
// 3. "3" - synchronous
// 4. User clicks button (browser detects event)
// 5. Browser queues click handler to macrotask queue
// 6. Event loop processes it: "2. Clicked!"

// Multiple rapid clicks:
// - Each click queues a separate macrotask
// - Processed one at a time
// - Ensures handlers don't interfere with each other`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={5}
        title="Web Workers"
        description={
          <p>
            <strong>Web Workers</strong> allow JavaScript to run in background threads,
            separate from the main thread. They communicate via message passing. Workers
            cannot access the DOM but can perform CPU-intensive tasks without blocking
            the UI thread.
          </p>
        }
        color="yellow"
      >
        <CodeBlock>
{`// main.js (Main Thread)
console.log("1. Main thread");

// Create a worker (runs in separate thread)
const worker = new Worker('worker.js');

// Send message to worker
worker.postMessage({ data: "Hello from main!" });

// Listen for messages from worker
worker.onmessage = (event) => {
  console.log("2. Received:", event.data); // MACROTASK
};

console.log("3. Main thread continues");

// worker.js (Worker Thread)
// Runs in completely separate thread
self.onmessage = (event) => {
  console.log("Worker received:", event.data);
  
  // Heavy computation (doesn't block main thread!)
  const result = heavyComputation(event.data);
  
  // Send result back to main thread
  self.postMessage(result);
};

// Execution:
// 1. "1. Main thread" - synchronous
// 2. Worker created (separate thread)
// 3. "3. Main thread continues" - synchronous (not blocked!)
// 4. Worker processes message (in background)
// 5. Worker sends result back
// 6. onmessage callback queued as macrotask: "2. Received: ..."`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={6}
        title="Web API Callback Queue Priority"
        description={
          <p>
            Different Web APIs queue callbacks differently: Promise-based APIs (fetch) use
            the <strong>microtask queue</strong>, while callback-based APIs (setTimeout,
            DOM events) use the <strong>macrotask queue</strong>. This affects execution order.
          </p>
        }
        color="blue"
      >
        <CodeBlock>
{`console.log("1");

// Macrotask (setTimeout)
setTimeout(() => console.log("2"), 0);

// Microtask (Promise from fetch)
fetch('/api/data')
  .then(() => console.log("3"));

// Macrotask (DOM event - if triggered)
button.addEventListener('click', () => {
  console.log("4");
});

// Microtask (queueMicrotask)
queueMicrotask(() => console.log("5"));

console.log("6");

// Execution order:
// 1. "1" - synchronous
// 2. setTimeout callback queued (macrotask)
// 3. fetch Promise queued (microtask)
// 4. queueMicrotask queued (microtask)
// 5. "6" - synchronous
// 6. Stack empty → Process ALL microtasks:
//    - "3" (if fetch resolved)
//    - "5"
// 7. Process macrotasks:
//    - "2" (setTimeout)
//    - "4" (if button clicked)

// Output: "1", "6", "5", "3", "2", "4"`}
        </CodeBlock>
      </StepCard>

      <Card color="purple" className="mt-8">
        <h3 className="text-xl font-bold mb-3">Common Web APIs</h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <strong className="text-purple-700">Timers:</strong>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>setTimeout - Macrotask</li>
              <li>setInterval - Macrotask</li>
              <li>requestAnimationFrame - Special timing</li>
            </ul>
          </div>
          <div>
            <strong className="text-purple-700">Network:</strong>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>fetch - Microtask (Promise)</li>
              <li>XMLHttpRequest - Macrotask</li>
              <li>WebSocket - Macrotask</li>
            </ul>
          </div>
          <div>
            <strong className="text-purple-700">DOM:</strong>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>Event listeners - Macrotask</li>
              <li>MutationObserver - Microtask</li>
            </ul>
          </div>
          <div>
            <strong className="text-purple-700">Storage:</strong>
            <ul className="list-disc list-inside ml-4 text-gray-700">
              <li>localStorage - Synchronous</li>
              <li>IndexedDB - Macrotask</li>
            </ul>
          </div>
        </div>
      </Card>
    </div>
  )
}

