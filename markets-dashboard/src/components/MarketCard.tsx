import type { Market } from '../types/market'

interface MarketCardProps {
  market: Market
  onClick?: () => void
}

export function MarketCard({ market, onClick }: MarketCardProps) {
  const probabilityColor =
    market.probability >= 70 ? 'text-green-600' :
    market.probability >= 40 ? 'text-yellow-600' :
    'text-red-600'

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(2)}M`
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`
    return `$${volume.toFixed(0)}`
  }

  const sourceColor = market.source === 'polymarket' ? 'bg-purple-100 text-purple-800' : 'bg-blue-100 text-blue-800'

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow cursor-pointer border border-gray-200"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-2 flex-1">
          {market.question}
        </h3>
        <span className={`ml-2 px-2 py-1 rounded text-xs font-medium ${sourceColor}`}>
          {market.source}
        </span>
      </div>

      {market.description && (
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {market.description}
        </p>
      )}

      <div className="flex justify-between items-center">
        <div>
          <div className={`text-2xl font-bold ${probabilityColor}`}>
            {market.probability.toFixed(1)}%
          </div>
          <div className="text-xs text-gray-500">Probability</div>
        </div>

        <div className="text-right">
          <div className="text-lg font-semibold text-gray-900">
            {formatVolume(market.volume)}
          </div>
          <div className="text-xs text-gray-500">Volume</div>
        </div>
      </div>

      {market.category && (
        <div className="mt-3 pt-3 border-t border-gray-100">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {market.category}
          </span>
        </div>
      )}
    </div>
  )
}
