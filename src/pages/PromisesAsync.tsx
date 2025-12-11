import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'
import VisualBox from '../components/VisualBox'

export default function PromisesAsync() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-4">Promises & Async/Await</h1>
        <p className="text-xl text-gray-600">
          How Promises and async/await interact with the event loop, microtask queue,
          and JavaScript execution model.
        </p>
      </div>

      <StepCard
        step={1}
        title="Promise Execution Model"
        description={
          <p>
            Promises are executed asynchronously but are <strong>synchronous objects</strong>.
            The executor function runs immediately, but promise resolution callbacks (.then, .catch)
            are queued as <strong>microtasks</strong>.
          </p>
        }
        color="blue"
      >
        <CodeBlock>
{`console.log("1");

const promise = new Promise((resolve, reject) => {
  console.log("2"); // Executes synchronously!
  resolve("Resolved");
  console.log("3"); // Executes synchronously!
});

console.log("4");

promise.then(value => {
  console.log("5", value); // Queued as microtask
});

console.log("6");

// Execution:
// 1. "1" - synchronous
// 2. Promise executor runs synchronously
//    - "2" - synchronous
//    - resolve() called (queues .then callback as microtask)
//    - "3" - synchronous
// 3. "4" - synchronous
// 4. .then() callback queued as microtask
// 5. "6" - synchronous
// 6. Stack empty → Process microtasks
// 7. "5 Resolved" - microtask

// Output: "1", "2", "3", "4", "6", "5 Resolved"`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={2}
        title="Promise State Machine"
        description={
          <p>
            A Promise has three states: <strong>pending</strong>, <strong>fulfilled</strong>,
            or <strong>rejected</strong>. Once settled (fulfilled or rejected), it cannot change
            state. All .then() callbacks are queued as microtasks and execute after the current
            synchronous code completes.
          </p>
        }
        color="purple"
      >
        <VisualBox title="Promise States" color="bg-purple-500">
          <div className="space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-20 h-12 bg-yellow-200 border-2 border-yellow-500 rounded flex items-center justify-center font-bold">
                PENDING
              </div>
              <div className="text-sm text-gray-600">Initial state, executor running</div>
            </div>
            <div className="text-center">↓ resolve(value) or reject(reason)</div>
            <div className="flex gap-3">
              <div className="flex-1">
                <div className="w-full h-12 bg-green-200 border-2 border-green-500 rounded flex items-center justify-center font-bold mb-2">
                  FULFILLED
                </div>
                <div className="text-xs text-gray-600 text-center">Value available</div>
              </div>
              <div className="flex-1">
                <div className="w-full h-12 bg-red-200 border-2 border-red-500 rounded flex items-center justify-center font-bold mb-2">
                  REJECTED
                </div>
                <div className="text-xs text-gray-600 text-center">Error reason</div>
              </div>
            </div>
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={3}
        title="Promise Chaining"
        description={
          <p>
            Promise.then() returns a new Promise, allowing chaining. Each .then() callback
            is queued as a microtask. If a .then() returns a value or promise, the next
            .then() receives it. All chained promises execute in microtask queue order.
          </p>
        }
        color="pink"
      >
        <CodeBlock>
{`Promise.resolve(1)
  .then(value => {
    console.log("Step 1:", value);
    return value + 1; // Returns 2
  })
  .then(value => {
    console.log("Step 2:", value);
    return Promise.resolve(value + 1); // Returns promise with 3
  })
  .then(value => {
    console.log("Step 3:", value);
    return value + 1; // Returns 4
  })
  .then(value => {
    console.log("Final:", value);
  });

console.log("Synchronous");

// Execution:
// 1. Promise.resolve(1) - immediately resolved
// 2. All .then() callbacks queued as microtasks
// 3. "Synchronous" - executes first
// 4. Stack empty → Process microtasks in order:
//    - "Step 1: 1"
//    - "Step 2: 2"
//    - "Step 3: 3"
//    - "Final: 4"

// Output: "Synchronous", "Step 1: 1", "Step 2: 2", "Step 3: 3", "Final: 4"`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={4}
        title="Async/Await Syntax"
        description={
          <p>
            <strong>async/await</strong> is syntactic sugar over Promises. An async function
            always returns a Promise. The <code className="bg-gray-200 px-1 rounded">await</code>
            keyword pauses execution (but doesn't block the thread) until the Promise resolves,
            then continues. Under the hood, it uses generators and yields control back to the event loop.
          </p>
        }
        color="green"
      >
        <CodeBlock>
{`// Async/await version:
async function fetchData() {
  console.log("1. Start");
  
  const data = await fetch('/api/data'); // Pauses here, yields to event loop
  console.log("2. Got data", data);
  
  const json = await data.json(); // Pauses again
  console.log("3. Parsed JSON", json);
  
  return json;
}

// Equivalent Promise version:
function fetchDataPromise() {
  console.log("1. Start");
  
  return fetch('/api/data')
    .then(data => {
      console.log("2. Got data", data);
      return data.json();
    })
    .then(json => {
      console.log("3. Parsed JSON", json);
      return json;
    });
}

// Both queue their callbacks as microtasks`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={5}
        title="Async Function Execution Flow"
        description={
          <p>
            When an async function is called, it executes synchronously until it hits an
            <code className="bg-gray-200 px-1 rounded">await</code>. At that point, it returns
            a pending Promise and yields control. The awaited Promise's .then() is queued as a
            microtask. When resolved, execution resumes from after the await.
          </p>
        }
        color="yellow"
      >
        <CodeBlock>
{`console.log("1");

async function asyncFunc() {
  console.log("2");
  
  await Promise.resolve(); // Yields here, queues continuation as microtask
  
  console.log("3");
}

asyncFunc();

console.log("4");

Promise.resolve().then(() => console.log("5"));

console.log("6");

// Execution:
// 1. "1" - synchronous
// 2. asyncFunc() called - executes synchronously until await
// 3. "2" - synchronous (inside async function)
// 4. await encountered - returns Promise, queues continuation as microtask
// 5. "4" - synchronous (back to main code)
// 6. Promise.resolve().then() queued as microtask
// 7. "6" - synchronous
// 8. Stack empty → Process microtasks:
//    - asyncFunc continuation: "3"
//    - Promise.then: "5"

// Output: "1", "2", "4", "6", "3", "5"`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={6}
        title="Error Handling"
        description={
          <p>
            Promise rejections can be caught with .catch() or try/catch with async/await.
            Unhandled rejections trigger the unhandledrejection event. Error handlers are
            also queued as microtasks.
          </p>
        }
        color="blue"
      >
        <CodeBlock>
{`// Promise error handling:
Promise.reject("Error!")
  .catch(error => {
    console.log("Caught:", error); // Microtask
  });

// Async/await error handling:
async function mayFail() {
  try {
    await Promise.reject("Error!");
  } catch (error) {
    console.log("Caught:", error); // Microtask
  }
}

// Unhandled rejection:
Promise.reject("Unhandled!")
  .then(() => console.log("Success"));

// This will trigger 'unhandledrejection' event
// Always handle promise rejections!`}
        </CodeBlock>
      </StepCard>

      <Card color="purple" className="mt-8">
        <h3 className="text-xl font-bold mb-3">Key Points</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Promise executors run <strong>synchronously</strong></li>
          <li>• Promise callbacks (.then, .catch) are <strong>microtasks</strong></li>
          <li>• Async functions return Promises immediately</li>
          <li>• Await yields control but doesn't block the thread</li>
          <li>• All promise-related callbacks execute before macrotasks</li>
          <li>• Promise chaining creates a sequence of microtasks</li>
          <li>• Unhandled rejections should always be caught</li>
        </ul>
      </Card>
    </div>
  )
}

