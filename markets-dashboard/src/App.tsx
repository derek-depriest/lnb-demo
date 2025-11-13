import { useState, useMemo } from 'react'
import { useMarkets } from './hooks/useMarkets'
import { TrendingSection } from './components/TrendingSection'
import { MarketGrid } from './components/MarketGrid'
import { MarketDetail } from './components/MarketDetail'
import { Filters } from './components/Filters'
import type { Market } from './types/market'
import { filterMarkets } from './services/markets'

function App() {
  const [selectedMarket, setSelectedMarket] = useState<Market | null>(null)
  const [filters, setFilters] = useState({
    searchQuery: '',
    minProbability: 0,
    maxProbability: 100,
  })

  const { data: markets, isLoading, error } = useMarkets(30)

  const filteredMarkets = useMemo(() => {
    if (!markets) return []
    return filterMarkets(markets, filters)
  }, [markets, filters])

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Prediction Markets Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            Real-time data from Polymarket and Manifold Markets
          </p>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <TrendingSection onMarketClick={setSelectedMarket} />

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-4 text-gray-900">All Markets</h2>
          <Filters onFilterChange={setFilters} />
        </div>

        {isLoading && (
          <div className="flex justify-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600"></div>
          </div>
        )}

        {error && (
          <div className="text-red-600 text-center py-8">
            <p className="text-lg">Error loading markets</p>
            <p className="text-sm mt-2">Please try again later</p>
          </div>
        )}

        {!isLoading && !error && (
          <div>
            <p className="text-sm text-gray-600 mb-4">
              Showing {filteredMarkets.length} markets
            </p>
            <MarketGrid
              markets={filteredMarkets}
              onMarketClick={setSelectedMarket}
            />
          </div>
        )}
      </main>

      <MarketDetail
        market={selectedMarket}
        onClose={() => setSelectedMarket(null)}
      />

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            Data refreshes every 60 seconds • Built with React + TypeScript + TailwindCSS
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
