import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'
import VisualBox from '../components/VisualBox'

export default function TaskQueues() {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-3 sm:mb-4">Task Queues</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
          Understanding microtasks and macrotasks - the two types of task queues
          that determine the order of asynchronous code execution.
        </p>
      </div>

      <StepCard
        step={1}
        title="Two Types of Queues"
        description={
          <p>
            JavaScript has <strong>two types of task queues</strong>: <strong>Microtask Queue</strong>
            (high priority) and <strong>Macrotask Queue</strong> (also called Callback Queue,
            lower priority). The event loop processes all microtasks before any macrotasks.
          </p>
        }
        color="blue"
      >
        <VisualBox title="Task Queue Hierarchy" color="bg-blue-500">
          <div className="space-y-4">
            <div className="border-2 border-green-400 bg-green-50 rounded-lg p-4">
              <div className="font-bold text-green-800 mb-2">Microtask Queue (Priority 1)</div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>• Promise.then() / .catch() / .finally()</div>
                <div>• queueMicrotask()</div>
                <div>• MutationObserver callbacks</div>
              </div>
            </div>
            <div className="text-center font-bold">↓ Processes all microtasks first</div>
            <div className="border-2 border-orange-400 bg-orange-50 rounded-lg p-4">
              <div className="font-bold text-orange-800 mb-2">Macrotask Queue (Priority 2)</div>
              <div className="text-sm text-gray-700 space-y-1">
                <div>• setTimeout() / setInterval()</div>
                <div>• setImmediate() (Node.js)</div>
                <div>• I/O operations</div>
                <div>• UI rendering</div>
              </div>
            </div>
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={2}
        title="Microtask Queue"
        description={
          <p>
            The <strong>Microtask Queue</strong> has the highest priority. After the call stack
            is empty, ALL microtasks are processed before the event loop moves to macrotasks.
            Microtasks can queue more microtasks, which will all execute before any macrotask runs.
          </p>
        }
        color="purple"
      >
        <CodeBlock>
{`console.log("1");

Promise.resolve().then(() => {
  console.log("2");
  return Promise.resolve();
}).then(() => {
  console.log("3");
});

Promise.resolve().then(() => {
  console.log("4");
});

queueMicrotask(() => {
  console.log("5");
});

console.log("6");

// Execution order:
// 1. "1" - synchronous
// 2. Promises queued as microtasks
// 3. queueMicrotask queued
// 4. "6" - synchronous
// 5. Call stack empty → Process ALL microtasks
// 6. "2", "4", "5" - microtasks (order may vary)
// 7. "3" - chained promise microtask

// Output: "1", "6", "2", "4", "5", "3"`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={3}
        title="Macrotask Queue"
        description={
          <p>
            The <strong>Macrotask Queue</strong> (also called Callback Queue) handles callbacks
            from Web APIs like setTimeout, setInterval, and I/O operations. Only after ALL
            microtasks are processed does the event loop process ONE macrotask, then checks
            for microtasks again.
          </p>
        }
        color="pink"
      >
        <CodeBlock>
{`console.log("1");

setTimeout(() => console.log("2"), 0); // Macrotask
setTimeout(() => console.log("3"), 0); // Macrotask

Promise.resolve().then(() => console.log("4")); // Microtask

console.log("5");

// Execution flow:
// 1. "1" - synchronous
// 2. setTimeout callbacks queued (macrotasks)
// 3. Promise queued (microtask)
// 4. "5" - synchronous
// 5. Stack empty → Process microtasks
// 6. "4" - microtask (ALL microtasks processed)
// 7. Process ONE macrotask
// 8. "2" - first macrotask
// 9. Check for microtasks (none)
// 10. Process next macrotask
// 11. "3" - second macrotask

// Output: "1", "5", "4", "2", "3"`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={4}
        title="Priority: Microtasks vs Macrotasks"
        description={
          <p>
            Microtasks always execute before macrotasks. This is why Promise callbacks execute
            before setTimeout callbacks, even if setTimeout has a 0ms delay. This priority
            ensures that promise-based code runs as soon as possible.
          </p>
        }
        color="green"
      >
        <CodeBlock>
{`console.log("Start");

// Macrotask (setTimeout)
setTimeout(() => {
  console.log("Macrotask 1");
}, 0);

// Microtask (Promise)
Promise.resolve().then(() => {
  console.log("Microtask 1");
  
  // Another microtask queued inside microtask
  Promise.resolve().then(() => {
    console.log("Microtask 2");
  });
});

// Another macrotask
setTimeout(() => {
  console.log("Macrotask 2");
}, 0);

console.log("End");

// Execution order:
// 1. "Start" - synchronous
// 2. setTimeout callbacks queued (macrotasks)
// 3. Promise queued (microtask)
// 4. "End" - synchronous
// 5. Process ALL microtasks:
//    - "Microtask 1"
//    - "Microtask 2" (queued during microtask execution)
// 6. Process ONE macrotask:
//    - "Macrotask 1"
// 7. Check microtasks (none)
// 8. Process next macrotask:
//    - "Macrotask 2"

// Output: "Start", "End", "Microtask 1", "Microtask 2", "Macrotask 1", "Macrotask 2"`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={5}
        title="Real-World Example"
        description={
          <p>
            Understanding task queues is crucial for debugging asynchronous code. The order of
            execution can be surprising if you don't understand microtask vs macrotask priorities.
          </p>
        }
        color="yellow"
      >
        <CodeBlock>
{`// Button click handler
button.addEventListener('click', () => {
  console.log("1. Click handler");
  
  Promise.resolve().then(() => {
    console.log("2. Promise (microtask)");
  });
  
  setTimeout(() => {
    console.log("3. setTimeout (macrotask)");
  }, 0);
  
  console.log("4. End of handler");
});

// If button is clicked:
// Output: "1. Click handler", "4. End of handler", "2. Promise (microtask)", "3. setTimeout (macrotask)"

// Why?
// 1. Click handler executes (synchronous)
// 2. Promise queued as microtask
// 3. setTimeout queued as macrotask
// 4. Handler ends, stack empty
// 5. ALL microtasks processed first ("2. Promise")
// 6. Then macrotasks processed ("3. setTimeout")`}
        </CodeBlock>
      </StepCard>

      <Card color="purple" className="mt-8">
        <h3 className="text-xl font-bold mb-3">Task Queue Summary</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-bold text-green-700 mb-2">Microtasks</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ Promise.then/.catch/.finally</li>
              <li>✓ queueMicrotask()</li>
              <li>✓ MutationObserver</li>
              <li>✓ Processed ALL at once</li>
              <li>✓ Higher priority</li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-orange-700 mb-2">Macrotasks</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✓ setTimeout/setInterval</li>
              <li>✓ setImmediate (Node.js)</li>
              <li>✓ I/O callbacks</li>
              <li>✓ Processed ONE at a time</li>
              <li>✓ Lower priority</li>
            </ul>
          </div>
        </div>
        <div className="mt-4 p-4 bg-purple-100 rounded-lg">
          <strong>Key Rule:</strong> After the call stack is empty, process ALL microtasks,
          then ONE macrotask, then check for microtasks again, repeat.
        </div>
      </Card>
    </div>
  )
}

