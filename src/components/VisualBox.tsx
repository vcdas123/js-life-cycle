import { ReactNode } from 'react'

interface VisualBoxProps {
  title: string
  children: ReactNode
  color?: string
}

export default function VisualBox({ title, children, color = 'bg-purple-500' }: VisualBoxProps) {
  return (
    <div className="border-2 border-gray-300 rounded-lg overflow-hidden shadow-xl">
      <div className={`${color} text-white px-4 py-2 font-bold text-sm`}>
        {title}
      </div>
      <div className="bg-white p-4 min-h-[100px]">
        {children}
      </div>
    </div>
  )
}

