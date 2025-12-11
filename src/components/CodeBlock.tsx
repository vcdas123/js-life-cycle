import { ReactNode, useState } from 'react'

interface CodeBlockProps {
  children: ReactNode
  title?: string
  language?: string
}

export default function CodeBlock({ children, title, language = 'javascript' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)

  const getCodeText = (): string => {
    if (typeof children === 'string') return children
    // Handle React elements and other cases
    const element = children as any
    if (element?.props?.children) {
      return String(element.props.children)
    }
    return String(children)
  }

  const handleCopy = async () => {
    const codeText = getCodeText()
    
    try {
      await navigator.clipboard.writeText(codeText)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch (err) {
      console.error('Failed to copy:', err)
    }
  }

  return (
    <div className="my-4 sm:my-6 relative group">
      {/* Header with title and copy button */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-900 text-gray-200 px-3 sm:px-4 py-2.5 rounded-t-lg flex items-center justify-between border-b border-slate-700">
        <div className="flex items-center gap-2">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
            <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
          </div>
          {title && (
            <span className="text-xs sm:text-sm font-medium ml-2">{title}</span>
          )}
          {!title && (
            <span className="text-xs font-mono text-gray-400">{language}</span>
          )}
        </div>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium text-gray-300 hover:text-white hover:bg-slate-700 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-purple-400"
          aria-label="Copy code"
        >
          {copied ? (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Copied!</span>
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
              <span className="hidden sm:inline">Copy</span>
            </>
          )}
        </button>
      </div>
      
      {/* Code block */}
      <div className="code-block-enhanced rounded-b-lg text-xs sm:text-sm overflow-x-auto">
        <pre className="m-0 p-0">
          <code className={`language-${language} block`}>{children}</code>
        </pre>
      </div>
    </div>
  )
}

