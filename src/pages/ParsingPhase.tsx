import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'

export default function ParsingPhase() {
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gradient mb-4">Parsing Phase</h1>
        <p className="text-xl text-gray-600">
          The first step in JavaScript execution - understanding how your code is transformed
          from text into an executable structure.
        </p>
      </div>

      <StepCard
        step={1}
        title="Tokenization (Lexical Analysis)"
        description={
          <p>
            The JavaScript engine breaks down your source code into <strong>tokens</strong> - 
            the smallest meaningful units like keywords, identifiers, operators, and literals.
            This process is called <em>lexical analysis</em>.
          </p>
        }
        color="blue"
      >
        <CodeBlock>
{`// Your code:
const x = 10 + 5;

// Tokens generated:
// [const] [x] [=] [10] [+] [5] [;]
//  KEYWORD IDENT OPERATOR NUMBER OPERATOR NUMBER SEPARATOR`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={2}
        title="Abstract Syntax Tree (AST)"
        description={
          <p>
            After tokenization, the parser builds an <strong>Abstract Syntax Tree (AST)</strong>.
            This tree structure represents the syntactic structure of your code, making it easier
            for the engine to understand relationships between tokens.
          </p>
        }
        color="purple"
      >
        <CodeBlock>
{`// Code:
function greet(name) {
  return "Hello " + name;
}

// AST Structure (simplified):
// Program
//   └─ FunctionDeclaration (greet)
//       ├─ Identifier (name) - parameter
//       └─ BlockStatement
//           └─ ReturnStatement
//               └─ BinaryExpression (+)
//                   ├─ StringLiteral ("Hello ")
//                   └─ Identifier (name)`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={3}
        title="Semantic Analysis"
        description={
          <p>
            During parsing, the engine also performs <strong>semantic analysis</strong> to catch
            syntax errors, validate identifier usage, and perform scope analysis. This includes
            hoisting variable and function declarations.
          </p>
        }
        color="pink"
      >
        <CodeBlock>
{`// Example of hoisting:
console.log(x); // undefined (not ReferenceError!)
var x = 5;

// This is equivalent to:
var x;  // Declaration hoisted
console.log(x);
x = 5;  // Assignment stays in place

// Function declarations are fully hoisted:
sayHello(); // Works! "Hello"

function sayHello() {
  console.log("Hello");
}`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={4}
        title="Bytecode Generation (V8 Engine)"
        description={
          <p>
            Modern JavaScript engines like V8 convert the AST into <strong>bytecode</strong>
            or machine code. V8 uses Ignition (bytecode interpreter) and TurboFan (optimizing compiler)
            in a tiered compilation approach.
          </p>
        }
        color="green"
      >
        <Card color="green">
          <h4 className="font-semibold mb-2">Compilation Timeline:</h4>
          <ol className="list-decimal list-inside space-y-1 text-gray-700">
            <li><strong>Source Code</strong> → Text written by developer</li>
            <li><strong>Tokens</strong> → Lexical analysis output</li>
            <li><strong>AST</strong> → Syntax tree representation</li>
            <li><strong>Bytecode</strong> → Intermediate representation (Ignition)</li>
            <li><strong>Optimized Machine Code</strong> → Final execution (TurboFan)</li>
          </ol>
        </Card>
      </StepCard>

      <Card color="yellow" className="mt-8">
        <h3 className="text-xl font-bold mb-3">Key Takeaways</h3>
        <ul className="space-y-2 text-gray-700">
          <li>• Parsing happens <strong>before</strong> code execution</li>
          <li>• Syntax errors are caught during parsing</li>
          <li>• Variable and function declarations are hoisted during parsing</li>
          <li>• Modern engines use just-in-time (JIT) compilation</li>
          <li>• AST is used by tools like Babel, ESLint, and Prettier</li>
        </ul>
      </Card>
    </div>
  )
}

