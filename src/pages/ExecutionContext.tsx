import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'
import VisualBox from '../components/VisualBox'

export default function ExecutionContext() {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-3 sm:mb-4">Execution Context</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
          Understanding the environment where JavaScript code is executed, including
          variable scoping, this binding, and closure formation.
        </p>
      </div>

      <StepCard
        step={1}
        title="What is an Execution Context?"
        description={
          <p>
            An <strong>Execution Context</strong> is an abstract concept that holds information
            about the environment where JavaScript code is evaluated and executed. Each context
            has its own variable environment, scope chain, and this binding.
          </p>
        }
        color="blue"
      >
        <VisualBox title="Execution Context Structure" color="bg-blue-500">
          <div className="space-y-3 font-mono text-sm">
            <div className="border-l-4 border-blue-500 pl-3">
              <div className="font-bold">Variable Environment</div>
              <div className="text-gray-600 ml-4">• Variable declarations (var, let, const)</div>
              <div className="text-gray-600 ml-4">• Function declarations</div>
            </div>
            <div className="border-l-4 border-purple-500 pl-3">
              <div className="font-bold">Lexical Environment</div>
              <div className="text-gray-600 ml-4">• Scope chain</div>
              <div className="text-gray-600 ml-4">• Outer environment references</div>
            </div>
            <div className="border-l-4 border-pink-500 pl-3">
              <div className="font-bold">This Binding</div>
              <div className="text-gray-600 ml-4">• Determined by how function is called</div>
            </div>
          </div>
        </VisualBox>
      </StepCard>

      <StepCard
        step={2}
        title="Global Execution Context"
        description={
          <p>
            The <strong>Global Execution Context</strong> is created when JavaScript code first runs.
            It's the base context that contains all global variables and functions. In browsers,
            the global object is <code className="bg-gray-200 px-1 rounded">window</code>.
          </p>
        }
        color="purple"
      >
        <CodeBlock>
{`// Global Execution Context

var globalVar = "I'm global";
let globalLet = "I'm also global";

function globalFunction() {
  console.log("Global function");
}

// All of these are part of the Global Execution Context
// Accessible from anywhere in your code`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={3}
        title="Function Execution Context"
        description={
          <p>
            A new <strong>Function Execution Context</strong> is created every time a function is invoked.
            Each function call gets its own context with its own variable environment and scope chain.
          </p>
        }
        color="pink"
      >
        <CodeBlock>
{`function outerFunction(x) {
  // Function Execution Context for outerFunction
  const outerVar = "outer";
  
  function innerFunction(y) {
    // New Function Execution Context for innerFunction
    const innerVar = "inner";
    console.log(x, outerVar, innerVar, y);
    // Can access: x (parameter), outerVar (closure), innerVar, y
  }
  
  innerFunction(42);
}

outerFunction(10);

// Execution Context Creation Order:
// 1. Global EC
// 2. outerFunction EC (when called)
// 3. innerFunction EC (when called)
// 4. innerFunction EC destroyed
// 5. outerFunction EC destroyed`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={4}
        title="Scope Chain"
        description={
          <p>
            The <strong>Scope Chain</strong> is created during context creation. It's a chain of
            all variable objects that the current context has access to. JavaScript looks up variables
            through this chain, starting from the current context up to the global context.
          </p>
        }
        color="green"
      >
        <CodeBlock>
{`const global = "global scope";

function level1() {
  const level1Var = "level 1";
  
  function level2() {
    const level2Var = "level 2";
    
    function level3() {
      const level3Var = "level 3";
      // Scope chain lookup order:
      console.log(level3Var);  // 1. Current scope ✓
      console.log(level2Var);  // 2. level2 scope ✓
      console.log(level1Var);  // 3. level1 scope ✓
      console.log(global);     // 4. Global scope ✓
    }
    
    level3();
  }
  
  level2();
}

level1();`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={5}
        title="Closures"
        description={
          <p>
            A <strong>Closure</strong> is formed when a function has access to variables from an
            outer (enclosing) scope even after the outer function has returned. This is possible
            because the inner function maintains a reference to its outer lexical environment.
          </p>
        }
        color="yellow"
      >
        <CodeBlock>
{`function createCounter() {
  let count = 0; // Private variable (closure)
  
  return function() {
    count++;  // Accesses count from outer scope
    return count;
  };
}

const counter1 = createCounter();
const counter2 = createCounter();

console.log(counter1()); // 1
console.log(counter1()); // 2
console.log(counter2()); // 1 (separate closure!)
console.log(counter1()); // 3

// Each returned function maintains its own closure
// over the count variable in its own execution context`}
        </CodeBlock>
      </StepCard>

      <Card color="purple" className="mt-8">
        <h3 className="text-xl font-bold mb-3">Execution Context Lifecycle</h3>
        <div className="space-y-3">
          <div className="flex items-start gap-3">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">1</div>
            <div>
              <strong>Creation Phase:</strong>
              <ul className="list-disc list-inside ml-4 text-gray-700">
                <li>Create Variable Object (VO) / Activation Object (AO)</li>
                <li>Create scope chain</li>
                <li>Determine 'this' value</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">2</div>
            <div>
              <strong>Hoisting Phase:</strong>
              <ul className="list-disc list-inside ml-4 text-gray-700">
                <li>Variable declarations (var) hoisted with undefined</li>
                <li>Function declarations fully hoisted</li>
                <li>let/const hoisted but in Temporal Dead Zone</li>
              </ul>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <div className="bg-purple-500 text-white rounded-full w-8 h-8 flex items-center justify-center font-bold flex-shrink-0">3</div>
            <div>
              <strong>Execution Phase:</strong>
              <ul className="list-disc list-inside ml-4 text-gray-700">
                <li>Code is executed line by line</li>
                <li>Variable assignments happen</li>
                <li>Function calls create new execution contexts</li>
              </ul>
            </div>
          </div>
        </div>
      </Card>
    </div>
  )
}

