import { ReactNode } from 'react'

interface CodeBlockProps {
  children: ReactNode
  title?: string
  language?: string
}

export default function CodeBlock({ children, title, language = 'javascript' }: CodeBlockProps) {
  return (
    <div className="my-4 sm:my-6">
      {title && (
        <div className="bg-slate-800 text-gray-300 px-3 sm:px-4 py-2 rounded-t-lg text-xs sm:text-sm font-semibold">
          {title}
        </div>
      )}
      <pre className={`code-block ${!title ? 'rounded-lg' : 'rounded-b-lg rounded-t-none'} text-xs sm:text-sm`}>
        <code className={`language-${language}`}>{children}</code>
      </pre>
    </div>
  )
}

