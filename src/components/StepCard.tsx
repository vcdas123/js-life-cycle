import { ReactNode } from 'react'
import Card from './Card'

interface StepCardProps {
  step: number
  title: string
  description: ReactNode
  children?: ReactNode
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'yellow'
}

const colorGradients = {
  blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
  purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
  pink: 'bg-gradient-to-br from-pink-400 to-pink-600',
  green: 'bg-gradient-to-br from-green-400 to-green-600',
  yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
}

export default function StepCard({ step, title, description, children, color = 'blue' }: StepCardProps) {
  return (
    <Card color={color} className="mb-6">
      <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
        <div className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full ${colorGradients[color]} text-white font-bold text-lg sm:text-xl flex items-center justify-center shadow-lg`}>
          {step}
        </div>
        <div className="flex-1 w-full">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-800 mb-2">{title}</h3>
          <div className="text-sm sm:text-base text-gray-700 leading-relaxed">{description}</div>
          {children && <div className="mt-3 sm:mt-4">{children}</div>}
        </div>
      </div>
    </Card>
  )
}

