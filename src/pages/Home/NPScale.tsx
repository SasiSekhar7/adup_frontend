import React from 'react'

interface NPSScaleProps {
  value: number
  onChange: (value: number) => void
}

export function NPSScale({ value, onChange }: NPSScaleProps) {
  return (
    <div className="flex flex-col items-center space-y-2">
      <div className="flex justify-center space-x-2">
        {[0, 1, 2, 3, 4, 5].map((num) => (
          <button
            key={num}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              value === num
                ? 'bg-indigo-500 text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-purple-400 hover:text-white'
            }`}
            onClick={() => onChange(num)}
          >
            {num}
          </button>
        ))}
      </div>
      <div className="flex justify-center space-x-2">
        {[6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
              value === num
              ? 'bg-indigo-500 text-white'
              : 'bg-gray-200 text-gray-700 hover:bg-purple-400 hover:text-white'
          }`}
            onClick={() => onChange(num)}
          >
            {num}
          </button>
        ))}
      </div>
    </div>
  )
}
