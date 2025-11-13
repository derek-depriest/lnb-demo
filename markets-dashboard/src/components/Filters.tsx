import { useState } from 'react'

interface FiltersProps {
  onFilterChange: (filters: {
    searchQuery: string
    minProbability: number
    maxProbability: number
  }) => void
}

export function Filters({ onFilterChange }: FiltersProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [minProbability, setMinProbability] = useState(0)
  const [maxProbability, setMaxProbability] = useState(100)

  const handleFilterChange = () => {
    onFilterChange({
      searchQuery,
      minProbability,
      maxProbability,
    })
  }

  const handleReset = () => {
    setSearchQuery('')
    setMinProbability(0)
    setMaxProbability(100)
    onFilterChange({
      searchQuery: '',
      minProbability: 0,
      maxProbability: 100,
    })
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-6">
      <div className="flex flex-wrap gap-4 items-end">
        <div className="flex-1 min-w-[200px]">
          <label htmlFor="search" className="block text-sm font-medium text-gray-700 mb-1">
            Search Markets
          </label>
          <input
            id="search"
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              handleFilterChange()
            }}
            placeholder="Search by question or description..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="w-40">
          <label htmlFor="minProb" className="block text-sm font-medium text-gray-700 mb-1">
            Min Probability
          </label>
          <div className="flex items-center">
            <input
              id="minProb"
              type="number"
              min="0"
              max="100"
              value={minProbability}
              onChange={(e) => {
                const value = Math.max(0, Math.min(100, Number(e.target.value)))
                setMinProbability(value)
                handleFilterChange()
              }}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-1 text-gray-600">%</span>
          </div>
        </div>

        <div className="w-40">
          <label htmlFor="maxProb" className="block text-sm font-medium text-gray-700 mb-1">
            Max Probability
          </label>
          <div className="flex items-center">
            <input
              id="maxProb"
              type="number"
              min="0"
              max="100"
              value={maxProbability}
              onChange={(e) => {
                const value = Math.max(0, Math.min(100, Number(e.target.value)))
                setMaxProbability(value)
                handleFilterChange()
              }}
              className="w-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <span className="ml-1 text-gray-600">%</span>
          </div>
        </div>

        <button
          onClick={handleReset}
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors"
        >
          Reset
        </button>
      </div>
    </div>
  )
}
