import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'yellow'
}

const colorClasses = {
  blue: 'border-blue-300/60 bg-blue-50/80',
  purple: 'border-purple-300/60 bg-purple-50/80',
  pink: 'border-pink-300/60 bg-pink-50/80',
  green: 'border-green-300/60 bg-green-50/80',
  yellow: 'border-yellow-300/60 bg-yellow-50/80',
}

export default function Card({ children, className = '', color = 'blue' }: CardProps) {
  return (
    <div className={`rounded-xl border-2 p-4 sm:p-6 shadow-md card-hover ${colorClasses[color]} ${className}`}>
      {children}
    </div>
  )
}

