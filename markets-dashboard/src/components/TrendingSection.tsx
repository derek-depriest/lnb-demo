import { useTrendingMarkets } from '../hooks/useMarkets'
import type { Market } from '../types/market'
import { MarketCard } from './MarketCard'

interface TrendingSectionProps {
  onMarketClick?: (market: Market) => void
}

export function TrendingSection({ onMarketClick }: TrendingSectionProps) {
  const { data: markets, isLoading, error } = useTrendingMarkets(6)

  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Trending Markets</h2>
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-900">Trending Markets</h2>
        <div className="text-red-600 text-center py-4">
          Error loading trending markets
        </div>
      </div>
    )
  }

  if (!markets || markets.length === 0) {
    return null
  }

  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-900">Trending Markets</h2>
        <span className="ml-3 text-sm text-gray-500">
          Highest 24h volume
        </span>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {markets.map((market) => (
          <MarketCard
            key={market.id}
            market={market}
            onClick={() => onMarketClick?.(market)}
          />
        ))}
      </div>
    </div>
  )
}
