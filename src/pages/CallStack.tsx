import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'
import VisualBox from '../components/VisualBox'

export default function CallStack() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-4">Call Stack</h1>
        <p className="text-xl text-gray-600">
          The call stack is a fundamental data structure that tracks function calls
          and manages the execution context of running code.
        </p>
      </div>

      <StepCard
        step={1}
        title="What is the Call Stack?"
        description={
          <p>
            The <strong>Call Stack</strong> is a LIFO (Last In, First Out) data structure that
            keeps track of function calls. When a function is invoked, it's pushed onto the stack.
            When it returns, it's popped off. This manages which execution context is currently active.
          </p>
        }
        color="blue"
      >
        <VisualBox title="Call Stack Visualization" color="bg-blue-500">
          <div className="space-y-2 font-mono text-sm">
            <div className="bg-green-100 border-2 border-green-500 p-2 rounded text-center">
              functionC() ← Top of Stack (Currently Executing)
            </div>
            <div className="bg-gray-100 border-2 border-gray-400 p-2 rounded text-center">
              functionB()
            </div>
            <div className="bg-gray-100 border-2 border-gray-400 p-2 rounded text-center">
              functionA()
            </div>
            <div className="bg-blue-100 border-2 border-blue-400 p-2 rounded text-center">
              Global Execution Context ← Bottom of Stack
            </div>
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={2}
        title="How the Call Stack Works"
        description={
          <p>
            Each function call creates a new execution context that is pushed onto the call stack.
            The JavaScript engine executes code from the context at the top of the stack. When a
            function completes, its context is popped, and execution continues from the previous context.
          </p>
        }
        color="purple"
      >
        <CodeBlock>
{`function first() {
  console.log("First function starts");
  second();
  console.log("First function ends");
}

function second() {
  console.log("Second function starts");
  third();
  console.log("Second function ends");
}

function third() {
  console.log("Third function starts");
  console.log("Third function ends");
}

first();

// Call Stack Evolution:
// Step 1: [Global]
// Step 2: [Global, first()]
// Step 3: [Global, first(), second()]
// Step 4: [Global, first(), second(), third()]
// Step 5: [Global, first(), second()] (third returns)
// Step 6: [Global, first()] (second returns)
// Step 7: [Global] (first returns)

// Output:
// "First function starts"
// "Second function starts"
// "Third function starts"
// "Third function ends"
// "Second function ends"
// "First function ends"`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={3}
        title="Stack Overflow"
        description={
          <p>
            A <strong>Stack Overflow</strong> occurs when the call stack exceeds its maximum size,
            typically due to infinite recursion or deeply nested function calls. JavaScript engines
            have a maximum stack size limit (usually around 10,000-50,000 frames).
          </p>
        }
        color="pink"
      >
        <CodeBlock>
{`// This will cause a stack overflow:
function infiniteRecursion() {
  infiniteRecursion(); // Calls itself infinitely
}

// infiniteRecursion(); // ❌ RangeError: Maximum call stack size exceeded

// Safe recursion with base case:
function countdown(n) {
  if (n <= 0) {
    return; // Base case - stops recursion
  }
  console.log(n);
  countdown(n - 1); // Recursive call
}

countdown(5); // ✓ Works fine: 5, 4, 3, 2, 1`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={4}
        title="Synchronous Execution"
        description={
          <p>
            The call stack handles synchronous code execution. Only one thing happens at a time
            on a single thread. When a function is executing, nothing else can run until it completes.
            This is why long-running synchronous operations can "block" the main thread.
          </p>
        }
        color="green"
      >
        <CodeBlock>
{`console.log("1"); // Executes immediately

function blockingFunction() {
  // This blocks the stack for 2 seconds
  const start = Date.now();
  while (Date.now() - start < 2000) {
    // Blocking loop
  }
}

console.log("2"); // Executes immediately
blockingFunction(); // Blocks for 2 seconds
console.log("3"); // Waits until blockingFunction completes

// Output:
// "1" (immediately)
// "2" (immediately)
// ... 2 second pause ...
// "3" (after 2 seconds)

// This demonstrates that the call stack is blocking - 
// nothing else can execute while blockingFunction is running`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={5}
        title="Call Stack and Asynchronous Code"
        description={
          <p>
            Asynchronous operations like callbacks, promises, and async/await don't directly
            execute on the call stack. Instead, they're handled by the event loop, which moves
            them back to the call stack when ready. This is what makes JavaScript non-blocking.
          </p>
        }
        color="yellow"
      >
        <CodeBlock>
{`console.log("1"); // Call Stack: [Global]

setTimeout(() => {
  console.log("2"); // Doesn't execute immediately!
}, 0);

console.log("3"); // Call Stack: [Global]

// Output:
// "1"
// "3"
// "2" (executes later, even with 0ms delay!)

// Why?
// 1. setTimeout is a Web API, not handled by call stack
// 2. The callback goes to the Callback Queue
// 3. Event loop moves it to call stack only after stack is empty
// 4. So "3" always prints before "2", even with 0ms delay`}
        </CodeBlock>
      </StepCard>

      <Card color="blue" className="mt-8">
        <h3 className="text-xl font-bold mb-3">Key Characteristics</h3>
        <div className="grid md:grid-cols-2 gap-4 text-gray-700">
          <div>
            <strong className="text-blue-700">✓ Single Threaded</strong>
            <p className="text-sm mt-1">Only one function executes at a time</p>
          </div>
          <div>
            <strong className="text-blue-700">✓ LIFO Structure</strong>
            <p className="text-sm mt-1">Last function in is first function out</p>
          </div>
          <div>
            <strong className="text-blue-700">✓ Synchronous</strong>
            <p className="text-sm mt-1">Executes code in order, one at a time</p>
          </div>
          <div>
            <strong className="text-blue-700">✓ Limited Size</strong>
            <p className="text-sm mt-1">Has maximum depth (stack overflow protection)</p>
          </div>
        </div>
      </Card>
    </div>
  )
}

