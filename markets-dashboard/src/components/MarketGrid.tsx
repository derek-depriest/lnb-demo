import type { Market } from '../types/market'
import { MarketCard } from './MarketCard'

interface MarketGridProps {
  markets: Market[]
  onMarketClick?: (market: Market) => void
}

export function MarketGrid({ markets, onMarketClick }: MarketGridProps) {
  if (markets.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-500 text-lg">No markets found</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {markets.map((market) => (
        <MarketCard
          key={market.id}
          market={market}
          onClick={() => onMarketClick?.(market)}
        />
      ))}
    </div>
  )
}
