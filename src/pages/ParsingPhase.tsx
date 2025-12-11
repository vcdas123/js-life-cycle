import StepCard from '../components/StepCard'
import CodeBlock from '../components/CodeBlock'
import Card from '../components/Card'

export default function ParsingPhase() {
  return (
    <div>
      <div className="mb-6 sm:mb-8">
        <h1 className="text-3xl sm:text-4xl font-bold text-gradient mb-3 sm:mb-4">Parsing Phase</h1>
        <p className="text-base sm:text-lg lg:text-xl text-gray-600">
          The first step in JavaScript execution - understanding how your code is transformed
          from text into an executable structure.
        </p>
      </div>

      <StepCard
        step={1}
        title="Tokenization (Lexical Analysis)"
        description={
          <div>
            <p className="mb-3">
              The JavaScript engine breaks down your source code into <strong>tokens</strong> - 
              the smallest meaningful units like keywords, identifiers, operators, and literals.
              This process is called <em>lexical analysis</em> and happens character by character.
            </p>
            <p className="mb-3">
              The lexer (tokenizer) reads the source code as a stream of characters and groups them
              into tokens based on JavaScript grammar rules. It recognizes patterns like:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1 mb-3">
              <li><strong>Keywords:</strong> const, let, var, function, if, else, return, etc.</li>
              <li><strong>Identifiers:</strong> Variable names, function names (must start with letter, $, or _)</li>
              <li><strong>Literals:</strong> Numbers, strings, booleans, null, undefined</li>
              <li><strong>Operators:</strong> +, -, *, /, ===, !==, &&, ||, etc.</li>
              <li><strong>Punctuators:</strong> {'{'}, {'}'}, [, ], (, ), ;, ,, ., etc.</li>
            </ul>
            <p>
              This phase ignores whitespace (except when significant, like in strings) and comments.
              Tokenization is the foundation for all subsequent parsing steps.
            </p>
          </div>
        }
        color="blue"
      >
        <CodeBlock>
{`// Input source code:
const x = 10 + 5;
let name = "JavaScript";

// Tokenization output (simplified):
[
  { type: 'KEYWORD', value: 'const' },
  { type: 'IDENTIFIER', value: 'x' },
  { type: 'PUNCTUATOR', value: '=' },
  { type: 'NUMBER', value: '10' },
  { type: 'PUNCTUATOR', value: '+' },
  { type: 'NUMBER', value: '5' },
  { type: 'PUNCTUATOR', value: ';' },
  { type: 'KEYWORD', value: 'let' },
  { type: 'IDENTIFIER', value: 'name' },
  { type: 'PUNCTUATOR', value: '=' },
  { type: 'STRING', value: 'JavaScript' },
  { type: 'PUNCTUATOR', value: ';' }
]

// Each token has:
// - Type: What kind of token it is
// - Value: The actual text/value
// - Position: Line and column number (for error reporting)`}
        </CodeBlock>
        <Card color="blue" className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Note:</strong> Tokenization is a deterministic process - the same code always produces
            the same tokens. This is why formatting tools can safely rearrange whitespace without affecting
            tokenization results.
          </p>
        </Card>
      </StepCard>

      <StepCard
        step={2}
        title="Abstract Syntax Tree (AST)"
        description={
          <div>
            <p className="mb-3">
              After tokenization, the parser builds an <strong>Abstract Syntax Tree (AST)</strong>.
              This tree structure represents the syntactic structure of your code hierarchically,
              making it easier for the engine to understand relationships between tokens and validate
              syntax correctness.
            </p>
            <p className="mb-3">
              The AST is "abstract" because it omits syntax details that don't affect meaning
              (like semicolons, parentheses placement, etc.) while preserving the logical structure.
              Each node in the tree represents a construct occurring in the source code.
            </p>
            <p className="mb-3">
              The parser uses a grammar (based on ECMAScript specification) to build the AST. If
              the tokens don't match valid JavaScript syntax, a syntax error is thrown at this stage.
            </p>
            <p>
              Common AST node types include: Program, FunctionDeclaration, VariableDeclaration,
              ExpressionStatement, BinaryExpression, CallExpression, Identifier, Literal, and many more.
            </p>
          </div>
        }
        color="purple"
      >
        <CodeBlock>
{`// Source code:
function greet(name) {
  return "Hello " + name;
}
const message = greet("World");

// AST Structure (simplified representation):
Program {
  body: [
    FunctionDeclaration {
      id: Identifier { name: "greet" },
      params: [
        Identifier { name: "name" }
      ],
      body: BlockStatement {
        body: [
          ReturnStatement {
            argument: BinaryExpression {
              operator: "+",
              left: StringLiteral { value: "Hello " },
              right: Identifier { name: "name" }
            }
          }
        ]
      }
    },
    VariableDeclaration {
      kind: "const",
      declarations: [
        VariableDeclarator {
          id: Identifier { name: "message" },
          init: CallExpression {
            callee: Identifier { name: "greet" },
            arguments: [
              StringLiteral { value: "World" }
            ]
          }
        }
      ]
    }
  ]
}

// The AST captures:
// - Hierarchical structure (nested expressions)
// - Operator precedence (implicit in tree structure)
// - Scope boundaries (function/block scopes)
// - Declaration relationships`}
        </CodeBlock>
        <Card color="purple" className="mt-4">
          <p className="text-sm text-gray-700 mb-2">
            <strong>Real-world use:</strong> Tools like Babel, ESLint, Prettier, and TypeScript
            all use ASTs to transform, analyze, and format JavaScript code. You can explore ASTs
            using tools like <a href="https://astexplorer.net" target="_blank" rel="noopener noreferrer" className="text-purple-600 underline">AST Explorer</a>.
          </p>
        </Card>
      </StepCard>

      <StepCard
        step={3}
        title="Semantic Analysis & Hoisting"
        description={
          <div>
            <p className="mb-3">
              During parsing, the engine performs <strong>semantic analysis</strong> to validate
              syntax correctness, resolve identifiers, and build scope chains. A crucial part of
              this is <strong>hoisting</strong> - a JavaScript behavior where declarations are
              conceptually moved to the top of their scope before code execution.
            </p>
            <p className="mb-3">
              <strong>Hoisting rules:</strong>
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1 mb-3">
              <li><strong>Function declarations:</strong> Fully hoisted (both declaration and body)</li>
              <li><strong>var declarations:</strong> Declaration hoisted, initialized to undefined</li>
              <li><strong>let/const declarations:</strong> Hoisted but in "Temporal Dead Zone" until declaration line</li>
              <li><strong>Function expressions:</strong> Not hoisted (they're assignments, not declarations)</li>
            </ul>
            <p>
              This happens during the parsing/compilation phase, not at runtime. The engine scans
              the entire scope and registers all declarations before execution begins.
            </p>
          </div>
        }
        color="pink"
      >
        <CodeBlock>
{`// ===== VAR HOISTING =====
console.log(x); // undefined (not ReferenceError!)
var x = 5;
console.log(x); // 5

// This is what actually happens during parsing:
var x;  // Declaration hoisted, initialized to undefined
console.log(x); // undefined
x = 5;  // Assignment stays in place
console.log(x); // 5

// ===== FUNCTION DECLARATION HOISTING =====
sayHello(); // Works! "Hello" (fully hoisted)

function sayHello() {
  console.log("Hello");
}

// Equivalent to:
function sayHello() {  // Entire function hoisted
  console.log("Hello");
}
sayHello();

// ===== LET/CONST HOISTING (Temporal Dead Zone) =====
console.log(y); // ❌ ReferenceError: Cannot access 'y' before initialization
let y = 10;

// let/const are hoisted but NOT initialized
// They're in "Temporal Dead Zone" until the declaration line

// ===== FUNCTION EXPRESSIONS =====
greet(); // ❌ TypeError: greet is not a function

var greet = function() {
  console.log("Hello");
};

// Only 'var greet' is hoisted (as undefined), not the function assignment
// This is why function expressions can't be called before declaration

// ===== HOISTING ORDER =====
console.log(typeof func1); // "function" (function declarations first)
console.log(typeof func2); // "undefined" (var hoisted, but function expression not)

function func1() {}
var func2 = function() {};

// Function declarations are hoisted above variable declarations`}
        </CodeBlock>
        <Card color="pink" className="mt-4">
          <p className="text-sm text-gray-700">
            <strong>Temporal Dead Zone (TDZ):</strong> The time between entering scope and declaration
            where let/const variables exist but cannot be accessed. This prevents the confusing behavior
            of var (returning undefined) and makes code more predictable.
          </p>
        </Card>
      </StepCard>

      <StepCard
        step={4}
        title="Bytecode Generation (V8 Engine)"
        description={
          <div>
            <p className="mb-3">
              Modern JavaScript engines like V8 use a <strong>tiered compilation</strong> strategy.
              The AST is first converted into <strong>bytecode</strong> by Ignition (the interpreter),
              which is then executed. Hot code (frequently executed) is optimized by TurboFan into
              native machine code for better performance.
            </p>
            <p className="mb-3">
              This approach balances startup time (bytecode is fast to generate) with execution speed
              (optimized machine code runs faster). V8 monitors function execution and "hot" functions
              get recompiled with optimizations.
            </p>
            <p>
              Other engines use similar strategies: SpiderMonkey (Firefox) uses IonMonkey, JavaScriptCore
              (Safari) uses DFG and FTL, and Chakra (old Edge) used a similar tiered approach.
            </p>
          </div>
        }
        color="green"
      >
        <Card color="green">
          <h4 className="font-semibold mb-3">V8 Compilation Pipeline:</h4>
          <ol className="list-decimal list-inside space-y-2 text-gray-700 mb-4">
            <li><strong>Source Code</strong> → Text written by developer</li>
            <li><strong>Tokens</strong> → Lexical analysis output (Parser)</li>
            <li><strong>AST</strong> → Syntax tree representation (Parser)</li>
            <li><strong>Bytecode</strong> → Intermediate representation (Ignition interpreter)
              <ul className="list-disc list-inside ml-6 mt-1 text-sm">
                <li>Fast to generate (~1ms for most scripts)</li>
                <li>Portable across platforms</li>
                <li>Executes directly by Ignition</li>
              </ul>
            </li>
            <li><strong>Optimized Machine Code</strong> → Final execution (TurboFan compiler)
              <ul className="list-disc list-inside ml-6 mt-1 text-sm">
                <li>Only for "hot" functions (executed many times)</li>
                <li>Platform-specific optimized code</li>
                <li>Can be 10-100x faster than bytecode</li>
                <li>Includes type speculation and inline caching</li>
              </ul>
            </li>
          </ol>
        </Card>
        <CodeBlock>
{`// Example: How V8 compiles a function

// Source code:
function add(a, b) {
  return a + b;
}

// 1. AST generated during parsing
// 2. Ignition generates bytecode (simplified):
//    LdaZero          // Load 0
//    Add a, b         // Add a and b
//    Return           // Return result

// 3. After many executions, TurboFan optimizes:
//    - Assumes a and b are numbers
//    - Generates optimized machine code
//    - If assumption fails, deoptimizes back to bytecode

// This is why first execution is slower, subsequent calls are faster!`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={5}
        title="Scope Resolution"
        description={
          <div>
            <p className="mb-3">
              During parsing, the engine performs <strong>scope resolution</strong> to determine
              where each variable and function is declared. It builds scope chains that link nested
              scopes together, allowing inner scopes to access outer scope variables.
            </p>
            <p className="mb-3">
              JavaScript has function scope (with var) and block scope (with let/const). The parser
              creates scope objects for each function and block, and links them in a chain. When
              an identifier is referenced, the engine searches up the scope chain until it finds
              the declaration.
            </p>
            <p>
              This scope information is crucial for closure formation and determines which variables
              are accessible at runtime.
            </p>
          </div>
        }
        color="yellow"
      >
        <CodeBlock>
{`// Scope resolution during parsing:

var globalVar = "global";

function outer() {
  var outerVar = "outer";
  
  function inner() {
    var innerVar = "inner";
    
    // Parser builds scope chain:
    // inner scope → outer scope → global scope
    
    console.log(innerVar);  // Found in inner scope
    console.log(outerVar);  // Found in outer scope
    console.log(globalVar); // Found in global scope
  }
  
  inner();
}

outer();

// The parser creates:
// Global Scope: { globalVar }
//   └─ Outer Function Scope: { outerVar }
//       └─ Inner Function Scope: { innerVar }

// When inner() references 'outerVar':
// 1. Check inner scope → not found
// 2. Check outer scope → found! ✓
// 3. Stop searching

// This chain is used at runtime for variable lookup`}
        </CodeBlock>
      </StepCard>

      <StepCard
        step={6}
        title="Error Detection"
        description={
          <div>
            <p className="mb-3">
              The parsing phase catches <strong>syntax errors</strong> before code execution begins.
              These are structural errors in the code that violate JavaScript's grammar rules.
            </p>
            <p className="mb-3">
              Types of errors caught during parsing:
            </p>
            <ul className="list-disc list-inside ml-2 space-y-1 mb-3">
              <li><strong>Syntax errors:</strong> Missing brackets, parentheses, invalid token sequences</li>
              <li><strong>Missing semicolons:</strong> In strict mode or certain contexts</li>
              <li><strong>Invalid identifiers:</strong> Reserved words used incorrectly</li>
              <li><strong>Unclosed strings/templates:</strong> String literals that don't close</li>
              <li><strong>Duplicate parameters:</strong> In strict mode functions</li>
            </ul>
            <p>
              Runtime errors (like undefined variables, type errors) occur during execution, not parsing.
              If parsing succeeds, you have valid JavaScript syntax.
            </p>
          </div>
        }
        color="blue"
      >
        <CodeBlock>
{`// ===== SYNTAX ERRORS (caught during parsing) =====

// Missing closing brace:
function test() {
  console.log("test");
// ❌ SyntaxError: Unexpected end of input

// Invalid token sequence:
const x = 10 20; // ❌ SyntaxError: Unexpected number

// Missing parentheses:
if condition { // ❌ SyntaxError: Unexpected identifier
  // ...
}

// Unclosed string:
const str = "Hello; // ❌ SyntaxError: Unterminated string literal

// Duplicate parameters (strict mode):
function test(a, a) { // ❌ SyntaxError: Duplicate parameter name not allowed
  "use strict";
}

// ===== NOT SYNTAX ERRORS (runtime errors) =====
// These are valid syntax, but fail at runtime:

const x = undefinedVar; // ✅ Valid syntax, ❌ Runtime: ReferenceError
const y = null.toString(); // ✅ Valid syntax, ❌ Runtime: TypeError
const z = JSON.parse("{invalid}"); // ✅ Valid syntax, ❌ Runtime: SyntaxError (from JSON parser)`}
        </CodeBlock>
      </StepCard>

      <Card color="yellow" className="mt-8">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Key Takeaways</h3>
        <ul className="space-y-2 text-gray-700 text-sm sm:text-base">
          <li>• <strong>Parsing is a separate phase</strong> that happens completely before code execution begins</li>
          <li>• <strong>Tokenization</strong> breaks code into atomic units (tokens) based on grammar rules</li>
          <li>• <strong>AST generation</strong> creates a tree structure representing code hierarchy and relationships</li>
          <li>• <strong>Syntax errors</strong> are detected during parsing - invalid code never executes</li>
          <li>• <strong>Hoisting</strong> occurs during parsing - declarations are processed before execution</li>
          <li>• <strong>Scope resolution</strong> builds scope chains during parsing, determining variable accessibility</li>
          <li>• <strong>Modern engines</strong> use tiered compilation (bytecode → optimized machine code)</li>
          <li>• <strong>AST is powerful</strong> - used by Babel, ESLint, Prettier, TypeScript, and other tools</li>
          <li>• <strong>Parsing is deterministic</strong> - same code always produces the same AST structure</li>
          <li>• <strong>Performance matters</strong> - engines optimize parsing speed (parallel parsing, lazy parsing)</li>
        </ul>
      </Card>

      <Card color="purple" className="mt-6">
        <h3 className="text-xl sm:text-2xl font-bold mb-4">Performance Optimizations</h3>
        <div className="space-y-3 text-sm sm:text-base text-gray-700">
          <div>
            <strong className="text-purple-700">Lazy Parsing:</strong>
            <p className="ml-4 mt-1">
              Functions are initially parsed with minimal work. Full parsing happens only when
              the function is actually called, saving time on unused code.
            </p>
          </div>
          <div>
            <strong className="text-purple-700">Pre-parsing:</strong>
            <p className="ml-4 mt-1">
              Quick scan for syntax errors and to identify function boundaries without building
              full AST, enabling faster initial script load.
            </p>
          </div>
          <div>
            <strong className="text-purple-700">Caching:</strong>
            <p className="ml-4 mt-1">
              Parsed bytecode can be cached (e.g., in service workers) to skip parsing on
              subsequent loads.
            </p>
          </div>
        </div>
      </Card>
    </div>
  )
}

