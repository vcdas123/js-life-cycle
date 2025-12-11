import { ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'yellow'
}

const colorClasses = {
  blue: 'border-blue-300 bg-blue-50',
  purple: 'border-purple-300 bg-purple-50',
  pink: 'border-pink-300 bg-pink-50',
  green: 'border-green-300 bg-green-50',
  yellow: 'border-yellow-300 bg-yellow-50',
}

export default function Card({ children, className = '', color = 'blue' }: CardProps) {
  return (
    <div className={`rounded-xl border-2 p-4 sm:p-6 shadow-lg card-hover ${colorClasses[color]} ${className}`}>
      {children}
    </div>
  )
}

