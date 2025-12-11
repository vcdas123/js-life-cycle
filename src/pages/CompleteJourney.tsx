import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'
import VisualBox from '../components/VisualBox'
import { Link } from 'react-router-dom'

export default function CompleteJourney() {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-3 sm:mb-4">Complete Journey</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
          The end-to-end journey of JavaScript code execution, from writing code
          to final execution, combining all concepts together.
        </p>
      </div>

      <StepCard
        step={1}
        title="Writing Code"
        description={
          <div>
            <p className="mb-3">
              You write JavaScript code in a text editor (VS Code, Sublime, Vim, etc.). This is
              plain text - just characters in a file. At this stage, it's merely source code that
              hasn't been processed by any JavaScript engine yet. The browser or Node.js environment
              hasn't seen it yet.
            </p>
            <p className="mb-3">
              Your code can be in various formats:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li><strong>.js files:</strong> Plain JavaScript (ES5, ES6+, or newer)</li>
              <li><strong>.mjs files:</strong> ES modules</li>
              <li><strong>.ts/.tsx files:</strong> TypeScript (transpiled to JS first)</li>
              <li><strong>Inline scripts:</strong> Embedded in HTML via &lt;script&gt; tags</li>
              <li><strong>Dynamic scripts:</strong> Created via document.createElement('script')</li>
            </ul>
            <p>
              The format and delivery method don't matter - once it reaches the JavaScript engine,
              it all goes through the same processing pipeline.
            </p>
          </div>
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
console.log(message);

// This is just text at this point
// No parsing, no execution, no compilation yet
// It's waiting to be loaded and processed`}
        </CodeBlock>
        <Card color="blue" className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Modern development often involves build tools (Webpack, Vite, Rollup)
            that may transform your code before it reaches the browser, but the final JavaScript still
            goes through the same parsing and execution pipeline.
          </p>
        </Card>
      </StepCard>

      <StepCard
        step={2}
        title="Script Loading"
        description={
          <div>
            <p className="mb-3">
              The script must be loaded into the JavaScript engine. In browsers, this happens via:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1 mb-3">
              <li><strong>&lt;script&gt; tags:</strong> Synchronous or async loading</li>
              <li><strong>ES6 modules:</strong> import/export statements, loaded asynchronously</li>
              <li><strong>Dynamic imports:</strong> import() function for code splitting</li>
              <li><strong>Web Workers:</strong> Separate JavaScript contexts</li>
            </ul>
            <p className="mb-3">
              In Node.js, scripts are loaded via:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1">
              <li><strong>require():</strong> CommonJS module loading</li>
              <li><strong>import:</strong> ES6 modules (with .mjs or "type": "module")</li>
              <li><strong>Command line:</strong> node script.js</li>
            </ul>
            <p>
              Loading may be blocked by network requests, but once the source code is available,
              parsing begins immediately.
            </p>
          </div>
        }
        color="purple"
      >
        <CodeBlock>
{`// Browser loading examples:

// Synchronous loading (blocks HTML parsing):
<script src="app.js"></script>

// Async loading (doesn't block):
<script src="app.js" async></script>

// Deferred loading (waits for HTML parsing):
<script src="app.js" defer></script>

// ES6 module (always async):
<script type="module" src="app.js"></script>

// Dynamic import:
import('./module.js').then(module => {
  // Module loaded and parsed
});

// Node.js loading:
require('./module.js'); // CommonJS
import './module.js';   // ES6 (with "type": "module" in package.json)`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={3}
        title="Lexical Analysis (Tokenization)"
        description={
          <div>
            <p className="mb-3">
              Once loaded, the JavaScript engine begins <strong>lexical analysis</strong> (tokenization).
              The lexer reads the source code character by character and groups them into <strong>tokens</strong>
              - the smallest meaningful units of JavaScript code.
            </p>
            <p className="mb-3">
              The lexer recognizes:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1 mb-3">
              <li><strong>Keywords:</strong> const, let, var, function, if, return, etc.</li>
              <li><strong>Identifiers:</strong> Variable names, function names</li>
              <li><strong>Literals:</strong> Numbers, strings, booleans, null, undefined</li>
              <li><strong>Operators:</strong> +, -, *, /, ===, &&, ||, etc.</li>
              <li><strong>Punctuators:</strong> {'{'}, {'}'}, [, ], (, ), ;, ,, ., etc.</li>
            </ul>
            <p>
              This phase ignores whitespace (except in strings) and comments. The output is a stream
              of tokens that the parser will use to build the Abstract Syntax Tree.
            </p>
          </div>
        }
        color="blue"
      >
        <CodeBlock>
{`// Input source code:
const x = 10 + 5;

// Lexical analysis produces tokens:
[
  { type: 'KEYWORD', value: 'const', line: 1, column: 1 },
  { type: 'IDENTIFIER', value: 'x', line: 1, column: 7 },
  { type: 'PUNCTUATOR', value: '=', line: 1, column: 9 },
  { type: 'NUMBER', value: '10', line: 1, column: 11 },
  { type: 'PUNCTUATOR', value: '+', line: 1, column: 14 },
  { type: 'NUMBER', value: '5', line: 1, column: 16 },
  { type: 'PUNCTUATOR', value: ';', line: 1, column: 17 }
]

// Each token contains:
// - Type: What kind of token it is
// - Value: The actual text/value
// - Position: Line and column (for error reporting)`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={4}
        title="Syntax Analysis (AST Generation)"
        description={
          <div>
            <p className="mb-3">
              The parser takes the token stream and builds an <strong>Abstract Syntax Tree (AST)</strong>.
              This is a tree data structure that represents the hierarchical structure of your code.
              The AST captures relationships, operator precedence, and nesting structure.
            </p>
            <p className="mb-3">
              During this phase:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1 mb-3">
              <li><strong>Syntax validation:</strong> Checks if tokens form valid JavaScript</li>
              <li><strong>Error detection:</strong> Throws SyntaxError for invalid code</li>
              <li><strong>Structure building:</strong> Creates nodes for declarations, expressions, statements</li>
              <li><strong>Scope identification:</strong> Identifies function/block boundaries</li>
            </ul>
            <p>
              If any syntax errors are found, parsing stops and execution never begins. The AST is
              then used for bytecode generation or direct interpretation.
            </p>
          </div>
        }
        color="purple"
      >
        <VisualBox title="Parsing Process" color="bg-purple-500">
          <div className="space-y-2 text-xs sm:text-sm font-mono">
            <div className="border-l-4 border-purple-500 pl-2">Source Code</div>
            <div className="border-l-4 border-blue-500 pl-2">↓ Tokenization</div>
            <div className="border-l-4 border-blue-500 pl-2">Token Stream</div>
            <div className="border-l-4 border-green-500 pl-2">↓ Syntax Analysis</div>
            <div className="border-l-4 border-green-500 pl-2">Abstract Syntax Tree (AST)</div>
            <div className="border-l-4 border-yellow-500 pl-2">↓ Code Generation</div>
            <div className="border-l-4 border-yellow-500 pl-2">Bytecode / Machine Code</div>
            <div className="text-gray-600 text-xs mt-2 space-y-1">
              • Syntax validation<br/>
              • Hoisting analysis<br/>
              • Scope chain building<br/>
              • Error detection
            </div>
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={5}
        title="Hoisting Phase"
        description={
          <div>
            <p className="mb-3">
              During parsing, the engine performs <strong>hoisting</strong> - it scans the entire
              scope and registers all declarations before execution begins. This happens during the
              creation phase of execution contexts.
            </p>
            <p className="mb-3">
              <strong>Hoisting rules:</strong>
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1 mb-3">
              <li><strong>Function declarations:</strong> Fully hoisted (name and body available)</li>
              <li><strong>var declarations:</strong> Hoisted, initialized to undefined</li>
              <li><strong>let/const declarations:</strong> Hoisted but in Temporal Dead Zone</li>
              <li><strong>Class declarations:</strong> Hoisted but in TDZ (unlike functions)</li>
            </ul>
            <p>
              This is why you can call functions before they're declared, and why var variables
              return undefined instead of throwing ReferenceError.
            </p>
          </div>
        }
        color="pink"
      >
        <CodeBlock>
{`// During parsing, hoisting happens:

// Your code:
console.log(x); // undefined (not error!)
var x = 5;

sayHello(); // Works!
function sayHello() {
  console.log("Hello");
}

// What actually happens:
// 1. Parser scans entire scope
// 2. Registers: var x (as undefined)
// 3. Registers: function sayHello (fully)
// 4. Then execution begins with these already registered

// Equivalent to:
var x; // hoisted
function sayHello() { // hoisted
  console.log("Hello");
}
console.log(x); // undefined
x = 5; // assignment stays in place
sayHello(); // works!`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={6}
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
        step={7}
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
        step={8}
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
        step={9}
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
        step={10}
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
        step={11}
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
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Complete Journey Summary</h3>
        <ol className="space-y-3 text-gray-700 text-sm sm:text-base list-decimal list-inside">
          <li><strong>Writing:</strong> Developer writes JavaScript code in text editor</li>
          <li><strong>Loading:</strong> Script loaded by browser/Node.js (via script tag, import, require)</li>
          <li><strong>Tokenization:</strong> Source code broken into tokens (lexical analysis)</li>
          <li><strong>Parsing:</strong> Tokens converted to Abstract Syntax Tree (AST)</li>
          <li><strong>Hoisting:</strong> Declarations registered before execution</li>
          <li><strong>Compilation:</strong> AST → Bytecode (Ignition) → Optimized code (TurboFan, JIT)</li>
          <li><strong>Global EC Creation:</strong> Global execution context created with global object, 'this', scope</li>
          <li><strong>Execution Phase:</strong> Code runs line by line on call stack (synchronously)</li>
          <li><strong>Function Calls:</strong> New execution contexts created and pushed to call stack</li>
          <li><strong>Scope Resolution:</strong> Variables resolved via scope chain lookup</li>
          <li><strong>Async Operations:</strong> Handed to Web APIs, callbacks queued (not executed immediately)</li>
          <li><strong>Event Loop:</strong> Continuously processes microtasks, then macrotasks when stack is empty</li>
          <li><strong>Closure Formation:</strong> Functions maintain references to outer scope variables</li>
          <li><strong>Memory Management:</strong> Garbage collector periodically frees unreachable memory</li>
          <li><strong>Optimization:</strong> Hot code paths optimized for better performance</li>
        </ol>
      </Card>

      <Card color="purple" className="mt-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Key Takeaways</h3>
        <p className="text-gray-700 mb-4 text-sm sm:text-base">
          Understanding the complete JavaScript execution model helps you write better code,
          debug more effectively, and optimize performance. Each concept interconnects in a
          complex but elegant system:
        </p>
        <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
          <li>• <strong>Parsing is separate:</strong> Happens completely before execution (enables hoisting, catches syntax errors early)</li>
          <li>• <strong>Tokenization:</strong> Code is broken into smallest meaningful units (tokens) first</li>
          <li>• <strong>AST representation:</strong> Tree structure captures code hierarchy and relationships</li>
          <li>• <strong>Hoisting:</strong> Declarations processed during parsing, not execution</li>
          <li>• <strong>Execution contexts:</strong> Each function gets its own context with variable environment and scope chain</li>
          <li>• <strong>Call stack:</strong> LIFO structure managing synchronous function execution</li>
          <li>• <strong>Scope chain:</strong> Links nested scopes for variable resolution</li>
          <li>• <strong>Closures:</strong> Functions maintain access to outer scope even after outer function returns</li>
          <li>• <strong>Event loop:</strong> Enables asynchronous behavior on single-threaded JavaScript</li>
          <li>• <strong>Microtasks vs Macrotasks:</strong> Priority system ensures promises execute before setTimeout</li>
          <li>• <strong>Web APIs:</strong> Browser APIs run on separate threads, communicate via callbacks</li>
          <li>• <strong>Memory management:</strong> Automatic garbage collection frees unreachable objects</li>
          <li>• <strong>JIT compilation:</strong> Hot code optimized at runtime for better performance</li>
          <li>• <strong>Single-threaded:</strong> Only one operation executes at a time on call stack</li>
          <li>• <strong>Non-blocking:</strong> Async operations don't freeze the application</li>
        </ul>
        <div className="mt-4 pt-4 border-t border-purple-300">
          <p className="text-gray-600 text-sm mb-3">
            Explore each topic in detail using the navigation menu above!
          </p>
          <div className="flex gap-2 flex-wrap">
            <Link to="/parsing" className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors">
              Parsing Phase
            </Link>
            <Link to="/execution-context" className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors">
              Execution Context
            </Link>
            <Link to="/call-stack" className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors">
              Call Stack
            </Link>
            <Link to="/event-loop" className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors">
              Event Loop
            </Link>
            <Link to="/task-queues" className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors">
              Task Queues
            </Link>
            <Link to="/promises-async" className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors">
              Promises & Async
            </Link>
            <Link to="/web-apis" className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors">
              Web APIs
            </Link>
            <Link to="/memory-management" className="px-3 py-1.5 bg-purple-100 text-purple-700 rounded text-sm hover:bg-purple-200 transition-colors">
              Memory Management
            </Link>
          </div>
        </div>
      </Card>
    </div>
  )
}

