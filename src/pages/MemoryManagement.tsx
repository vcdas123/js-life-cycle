import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'
import VisualBox from '../components/VisualBox'

export default function MemoryManagement() {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-3 sm:mb-4">Memory Management</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
          How JavaScript manages memory allocation, garbage collection, and prevents
          memory leaks in your applications.
        </p>
      </div>

      <StepCard
        step={1}
        title="Memory Allocation"
        description={
          <p>
            JavaScript automatically allocates memory when you create variables, objects,
            functions, and arrays. Memory is allocated on the <strong>heap</strong> (for objects)
            and <strong>stack</strong> (for primitive values and function calls). JavaScript uses
            automatic memory management, so you don't manually allocate or free memory.
          </p>
        }
        color="blue"
      >
        <CodeBlock>
{`// Stack allocation (primitive values, function calls)
let num = 42;           // Number stored on stack
let str = "Hello";      // String stored on stack
let bool = true;        // Boolean stored on stack

// Heap allocation (objects, arrays, functions)
let obj = { name: "John" };  // Object allocated on heap
let arr = [1, 2, 3];         // Array allocated on heap
function fn() {}             // Function allocated on heap

// Variables hold references (pointers) to heap objects
let obj2 = obj;  // obj2 points to same object on heap
obj2.name = "Jane";
console.log(obj.name); // "Jane" - same object!

// Primitive copies:
let num2 = num;  // Copy of value
num2 = 100;
console.log(num); // 42 - original unchanged`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={2}
        title="Garbage Collection"
        description={
          <p>
            JavaScript uses <strong>automatic garbage collection (GC)</strong> to free memory
            that is no longer referenced. The most common algorithm is <strong>mark-and-sweep</strong>:
            the GC marks all reachable objects, then sweeps away unreachable ones. Objects are
            considered reachable if they're referenced from root (global scope, call stack, etc.).
          </p>
        }
        color="purple"
      >
        <VisualBox title="Garbage Collection Process" color="bg-purple-500">
          <div className="space-y-3 text-sm">
            <div className="border-2 border-green-400 rounded p-3 bg-green-50">
              <div className="font-bold mb-2">1. Mark Phase</div>
              <div className="text-gray-700">
                • Start from root objects (global scope, stack)<br/>
                • Mark all reachable objects<br/>
                • Follow all references recursively
              </div>
            </div>
            <div className="border-2 border-red-400 rounded p-3 bg-red-50">
              <div className="font-bold mb-2">2. Sweep Phase</div>
              <div className="text-gray-700">
                • Remove all unmarked objects<br/>
                • Free their memory<br/>
                • Objects become eligible for collection
              </div>
            </div>
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={3}
        title="Reference Counting (Old Method)"
        description={
          <p>
            Early JavaScript engines used <strong>reference counting</strong>: count how many
            references point to an object. When count reaches zero, object is freed. This fails
            with circular references, which is why modern engines use mark-and-sweep.
          </p>
        }
        color="pink"
      >
        <CodeBlock>
{`// Reference counting problem - circular references:

function createCircular() {
  let obj1 = {};
  let obj2 = {};
  
  obj1.ref = obj2;  // obj1 references obj2
  obj2.ref = obj1;  // obj2 references obj1 (circular!)
  
  return obj1;
}

let myObj = createCircular();
myObj = null;  // Remove reference

// With reference counting:
// - obj1 has 1 ref (from obj2)
// - obj2 has 1 ref (from obj1)
// - Neither can be freed! (Memory leak)

// With mark-and-sweep:
// - Starting from root, neither obj1 nor obj2 is reachable
// - Both are marked unreachable and freed
// - Circular references handled correctly ✓`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={4}
        title="Memory Leaks"
        description={
          <p>
            Memory leaks occur when memory is allocated but never freed, causing memory usage
            to grow over time. Common causes: global variables, forgotten timers/listeners,
            closures holding large objects, and detached DOM nodes.
          </p>
        }
        color="green"
      >
        <CodeBlock>
{`// 1. Global variables (never garbage collected)
window.myData = new Array(1000000).fill(0); // ❌ Leak

// 2. Forgotten timers
function startTimer() {
  setInterval(() => {
    // Do something
  }, 1000);
  // Timer never cleared! ❌ Leak
}

// 3. Event listeners not removed
function attachListener() {
  button.addEventListener('click', handler);
  // Listener never removed! ❌ Leak
}

// 4. Closures holding large objects
function outer() {
  const largeData = new Array(1000000).fill(0);
  
  return function inner() {
    // inner doesn't use largeData, but it's still in closure
    console.log("Inner");
  };
}

// 5. Detached DOM nodes
let parent = document.getElementById('parent');
let child = document.createElement('div');
parent.appendChild(child);
parent = null;  // parent removed, but child still referenced
// child is "detached" - can't be accessed, but not garbage collected ❌

// Solutions:
// - Use local variables instead of globals
// - Clear timers with clearInterval/clearTimeout
// - Remove event listeners with removeEventListener
// - Break circular references
// - Remove DOM nodes properly`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={5}
        title="WeakMap and WeakSet"
        description={
          <p>
            <code className="bg-gray-200 px-1 rounded">WeakMap</code> and 
            <code className="bg-gray-200 px-1 rounded">WeakSet</code> allow objects to be
            garbage collected even when used as keys/values, as they hold "weak" references
            that don't prevent garbage collection. Useful for metadata storage.
          </p>
        }
        color="yellow"
      >
        <CodeBlock>
{`// Regular Map - prevents garbage collection
let obj1 = { data: "important" };
let regularMap = new Map();
regularMap.set(obj1, "metadata");

obj1 = null;  // obj1 still can't be garbage collected
// because regularMap holds a reference to it

// WeakMap - allows garbage collection
let obj2 = { data: "important" };
let weakMap = new WeakMap();
weakMap.set(obj2, "metadata");

obj2 = null;  // obj2 can be garbage collected!
// WeakMap doesn't prevent GC of keys

// Use cases:
// 1. Storing private data for objects
const privateData = new WeakMap();

class MyClass {
  constructor(value) {
    privateData.set(this, value); // Private storage
  }
  
  getValue() {
    return privateData.get(this);
  }
}

// 2. Caching without preventing GC
const cache = new WeakMap();

function getCachedData(obj) {
  if (!cache.has(obj)) {
    cache.set(obj, expensiveComputation(obj));
  }
  return cache.get(obj);
}`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={6}
        title="Garbage Collection Performance"
        description={
          <p>
            Garbage collection is <strong>stop-the-world</strong>: execution pauses while GC runs.
            Modern engines use <strong>generational GC</strong> and <strong>incremental GC</strong>
            to minimize pauses. V8 divides heap into young (short-lived) and old (long-lived) generations.
          </p>
        }
        color="blue"
      >
        <VisualBox title="Generational Garbage Collection" color="bg-blue-500">
          <div className="space-y-3 text-sm">
            <div className="border-2 border-green-400 rounded p-3 bg-green-50">
              <div className="font-bold mb-2">Young Generation (Nursery)</div>
              <div className="text-gray-700">
                • New objects allocated here<br/>
                • Frequent, fast GC (Minor GC)<br/>
                • Surviving objects promoted to old generation
              </div>
            </div>
            <div className="border-2 border-orange-400 rounded p-3 bg-orange-50">
              <div className="font-bold mb-2">Old Generation</div>
              <div className="text-gray-700">
                • Long-lived objects stored here<br/>
                • Less frequent, slower GC (Major GC)<br/>
                • More expensive but less frequent
              </div>
            </div>
          </div>
        </VisualBox>
      </StepCard>

      <Card color="purple" className="mt-8">
        <h3 className="text-xl font-bold mb-3">Memory Management Best Practices</h3>
        <ul className="space-y-2 text-gray-700">
          <li>✓ Avoid global variables - use local scope</li>
          <li>✓ Clear timers and intervals when done</li>
          <li>✓ Remove event listeners (especially in SPA frameworks)</li>
          <li>✓ Be careful with closures - don't hold unnecessary references</li>
          <li>✓ Remove DOM nodes properly before losing references</li>
          <li>✓ Use WeakMap/WeakSet for metadata that shouldn't prevent GC</li>
          <li>✓ Profile memory usage with DevTools Memory Profiler</li>
          <li>✓ Use Object.freeze() for immutable data if needed</li>
        </ul>
      </Card>
    </div>
  )
}

