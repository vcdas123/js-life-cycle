import { ReactNode } from 'react'
import { motion } from 'framer-motion'
import Card from './Card'

interface StepCardProps {
  step: number
  title: string
  description: ReactNode
  children?: ReactNode
  color?: 'blue' | 'purple' | 'pink' | 'green' | 'yellow'
  index?: number
}

const colorGradients = {
  blue: 'bg-gradient-to-br from-blue-400 to-blue-600',
  purple: 'bg-gradient-to-br from-purple-400 to-purple-600',
  pink: 'bg-gradient-to-br from-pink-400 to-pink-600',
  green: 'bg-gradient-to-br from-green-400 to-green-600',
  yellow: 'bg-gradient-to-br from-yellow-400 to-yellow-600',
}

export default function StepCard({ step, title, description, children, color = 'blue', index = 0 }: StepCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card color={color} className="mb-6" index={index}>
        <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-4">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 + 0.2, type: 'spring' }}
            className={`flex-shrink-0 w-10 h-10 sm:w-12 sm:h-12 rounded-full ${colorGradients[color]} text-white font-bold text-lg sm:text-xl flex items-center justify-center shadow-lg`}
          >
            {step}
          </motion.div>
          <div className="flex-1 w-full">
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.3 }}
              className="text-xl sm:text-2xl font-bold text-gray-800 mb-2"
            >
              {title}
            </motion.h3>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 + 0.4 }}
              className="text-sm sm:text-base text-gray-700 leading-relaxed"
            >
              {description}
            </motion.div>
            {children && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 + 0.5 }}
                className="mt-3 sm:mt-4"
              >
                {children}
              </motion.div>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

