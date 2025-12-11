import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'
import VisualBox from '../components/VisualBox'
import { Link } from 'react-router-dom'

export default function CompleteJourney() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-4">Complete Journey</h1>
        <p className="text-xl text-gray-600">
          The end-to-end journey of JavaScript code execution, from writing code
          to final execution, combining all concepts together.
        </p>
      </div>

      <StepCard
        step={1}
        title="Writing Code"
        description={
          <p>
            You write JavaScript code in a text editor. This is plain text - just characters
            in a file. The browser or Node.js environment hasn't seen it yet.
          </p>
        }
        color="blue"
      >
        <CodeBlock>
{`// app.js - Your source code
console.log("Hello");
function greet(name) {
  return \`Hi, \${name}!\`;
}
const message = greet("World");
console.log(message);`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={2}
        title="Loading & Parsing"
        description={
          <p>
            When the script is loaded (via &lt;script&gt; tag, import, or require), the JavaScript
            engine begins parsing. It performs tokenization, builds an AST, and checks for syntax errors.
            During this phase, function and variable declarations are hoisted.
          </p>
        }
        color="purple"
      >
        <VisualBox title="Parsing Process" color="bg-purple-500">
          <div className="space-y-2 text-sm font-mono">
            <div>Source Code → Tokens → AST → Bytecode</div>
            <div className="text-gray-600 text-xs">
              • Syntax validation<br/>
              • Hoisting analysis<br/>
              • Scope analysis
            </div>
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={3}
        title="Global Execution Context Creation"
        description={
          <p>
            Before any code executes, the JavaScript engine creates the <strong>Global Execution
            Context</strong>. This includes creating the global object (window in browsers), setting
            up 'this', and creating the outer scope. Variable and function declarations are hoisted
            during this phase.
          </p>
        }
        color="pink"
      >
        <CodeBlock>
{`// Before execution, Global EC is created with:

// Global Object: window (browser) or global (Node.js)
// this: window (in strict mode: undefined in functions)
// Outer Environment: null (global has no outer scope)

// Hoisted declarations:
var globalVar;  // hoisted as undefined
function myFunction() {}  // fully hoisted

// Then execution begins...`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={4}
        title="Code Execution Begins"
        description={
          <p>
            Execution starts from the top of your code. The Global Execution Context is pushed
            onto the <strong>Call Stack</strong>. Code runs line by line, synchronously. Function
            calls create new execution contexts that are pushed onto the stack.
          </p>
        }
        color="green"
      >
        <CodeBlock>
{`console.log("1"); // Executes immediately

function processData(data) {
  console.log("Processing:", data);
  return data.toUpperCase();
}

const result = processData("hello");
// 1. processData() called
// 2. New Function EC created for processData
// 3. Function EC pushed onto Call Stack
// 4. Function executes
// 5. Function EC popped from stack
// 6. Execution continues

console.log("Result:", result);`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={5}
        title="Asynchronous Operations"
        description={
          <p>
            When asynchronous operations are encountered (setTimeout, fetch, promises, etc.),
            they're handed off to <strong>Web APIs</strong> (browser) or the underlying system
            (Node.js). The callback or promise handler is queued, not executed immediately.
            The main thread continues executing synchronous code.
          </p>
        }
        color="yellow"
      >
        <CodeBlock>
{`console.log("Start");

// Synchronous
const data = "synchronous data";
console.log(data);

// Asynchronous - Web API
setTimeout(() => {
  console.log("Timeout callback");
}, 0); // Macrotask

// Asynchronous - Promise
Promise.resolve().then(() => {
  console.log("Promise callback");
}); // Microtask

console.log("End");

// Execution Flow:
// 1. "Start" - Call Stack: [Global]
// 2. "synchronous data" - Call Stack: [Global]
// 3. setTimeout → Web API (timer starts, callback queued to Macrotask Queue)
// 4. Promise → Callback queued to Microtask Queue
// 5. "End" - Call Stack: [Global]
// 6. Call Stack empty → Event Loop takes over
// 7. Process ALL microtasks: "Promise callback"
// 8. Process macrotasks: "Timeout callback"`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={6}
        title="Event Loop in Action"
        description={
          <p>
            The <strong>Event Loop</strong> continuously monitors the call stack. When the stack
            is empty, it first processes all microtasks (Promise callbacks, queueMicrotask),
            then processes one macrotask (setTimeout, DOM events). After each macrotask, it
            checks for microtasks again. This continues indefinitely.
          </p>
        }
        color="blue"
      >
        <VisualBox title="Event Loop Cycle" color="bg-blue-500">
          <div className="space-y-2 text-xs font-mono">
            <div className="border-2 border-blue-400 rounded p-2 bg-blue-50">
              <strong>1.</strong> Execute synchronous code (until stack empty)
            </div>
            <div className="border-2 border-green-400 rounded p-2 bg-green-50">
              <strong>2.</strong> Process ALL microtasks (Promises, queueMicrotask)
            </div>
            <div className="border-2 border-yellow-400 rounded p-2 bg-yellow-50">
              <strong>3.</strong> Process ONE macrotask (setTimeout, events)
            </div>
            <div className="border-2 border-purple-400 rounded p-2 bg-purple-50">
              <strong>4.</strong> Check for microtasks again
            </div>
            <div className="text-center">↻ Repeat</div>
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={7}
        title="Memory Management During Execution"
        description={
          <p>
            As code executes, memory is allocated for variables, objects, and function contexts.
            The <strong>Garbage Collector</strong> periodically runs to free memory that's no
            longer referenced. Modern engines use generational GC to minimize performance impact.
          </p>
        }
        color="purple"
      >
        <CodeBlock>
{`function createData() {
  const data = new Array(1000).fill(0);
  return data;
}

let result = createData(); // Memory allocated

// ... use result ...

result = null; // Reference removed

// Eventually, garbage collector will:
// 1. Mark all reachable objects
// 2. Sweep unreachable objects (like the array)
// 3. Free the memory

// This happens automatically in the background`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={8}
        title="Complete Example"
        description={
          <p>
            Here's a complete example showing the full journey from parsing to execution,
            demonstrating all concepts working together.
          </p>
        }
        color="pink"
      >
        <CodeBlock>
{`// ========== PHASE 1: PARSING ==========
// Engine parses code, creates AST, hoists declarations

// ========== PHASE 2: GLOBAL EC CREATION ==========
// Global EC created, hoisted items initialized
// function fetchUser is hoisted
// var userId is hoisted as undefined

var userId = 123; // Assignment happens during execution

async function fetchUser(id) {
  // New Function EC created when called
  console.log("Fetching user", id);
  
  // fetch() is Web API - network request on separate thread
  const response = await fetch(\`/api/users/\${id}\`);
  
  // await yields control, queues continuation as microtask
  // Event loop can process other tasks while waiting
  
  const user = await response.json();
  return user;
}

console.log("Starting fetch");

// fetchUser() called - creates async function execution
fetchUser(userId)
  .then(user => {
    // .then() callback queued as microtask
    console.log("User received:", user);
  })
  .catch(error => {
    // .catch() callback also microtask
    console.error("Error:", error);
  });

// setTimeout callback queued as macrotask
setTimeout(() => {
  console.log("Timeout finished");
}, 1000);

console.log("Code continues");

// ========== EXECUTION ORDER ==========
// 1. Parsing: Code parsed, functions hoisted
// 2. Global EC: Created
// 3. Execution:
//    - "Starting fetch" (synchronous)
//    - fetchUser() called, creates Function EC
//    - "Fetching user 123" (synchronous in function)
//    - await fetch() - yields, network request starts (Web API)
//    - Function EC paused, returns Promise
//    - "Code continues" (synchronous, main thread continues)
//    - Call Stack empty
// 4. Event Loop:
//    - Network response arrives
//    - Promise resolves, continuation queued as microtask
//    - await response.json() - yields again
//    - JSON parsed, continuation queued
//    - .then() callback queued as microtask
// 5. Microtasks processed:
//    - Continuation: await response.json()
//    - Continuation: return user
//    - .then() callback: "User received: ..."
// 6. Macrotasks processed:
//    - setTimeout callback: "Timeout finished" (after 1s)

// Final output:
// "Starting fetch"
// "Fetching user 123"
// "Code continues"
// "User received: {...}"
// "Timeout finished" (after 1 second)`}
        </CodeBlock>
      </StepCard>

      <Card color="green" className="mt-8">
        <h3 className="text-xl font-bold mb-4">Complete Journey Summary</h3>
        <ol className="space-y-3 text-gray-700 list-decimal list-inside">
          <li><strong>Writing:</strong> Developer writes JavaScript code</li>
          <li><strong>Loading:</strong> Script loaded by browser/Node.js</li>
          <li><strong>Parsing:</strong> Tokenization, AST generation, syntax checking</li>
          <li><strong>Compilation:</strong> AST → Bytecode → Optimized code (JIT)</li>
          <li><strong>Global EC:</strong> Global execution context created</li>
          <li><strong>Execution:</strong> Code runs line by line on call stack</li>
          <li><strong>Function Calls:</strong> New execution contexts created and pushed to stack</li>
          <li><strong>Async Operations:</strong> Handed to Web APIs, callbacks queued</li>
          <li><strong>Event Loop:</strong> Processes microtasks, then macrotasks</li>
          <li><strong>Memory Management:</strong> Garbage collector frees unused memory</li>
        </ol>
      </Card>

      <Card color="purple" className="mt-6">
        <h3 className="text-xl font-bold mb-3">Key Takeaways</h3>
        <p className="text-gray-700 mb-4">
          Understanding the complete JavaScript execution model helps you write better code,
          debug more effectively, and optimize performance. Each concept interconnects:
        </p>
        <ul className="space-y-2 text-gray-700">
          <li>• Parsing happens before execution (hoisting, syntax errors)</li>
          <li>• Execution contexts manage scope and variable access</li>
          <li>• Call stack manages function execution (synchronous)</li>
          <li>• Event loop enables asynchronous behavior (non-blocking)</li>
          <li>• Microtasks execute before macrotasks (promise priority)</li>
          <li>• Web APIs offload work from main thread</li>
          <li>• Memory is managed automatically (garbage collection)</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-purple-300">
          <p className="text-gray-600 text-sm mb-3">
            Explore each topic in detail using the navigation menu above!
          </p>
          <div className="flex gap-2 flex-wrap">
            <Link to="/parsing" className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200">
              Parsing Phase
            </Link>
            <Link to="/event-loop" className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200">
              Event Loop
            </Link>
            <Link to="/task-queues" className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200">
              Task Queues
            </Link>
            <Link to="/promises-async" className="px-3 py-1 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200">
              Promises & Async
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

