import type { Market } from '../types/market'

interface MarketDetailProps {
  market: Market | null
  onClose: () => void
}

export function MarketDetail({ market, onClose }: MarketDetailProps) {
  if (!market) return null

  const probabilityColor =
    market.probability >= 70 ? 'text-green-600' :
    market.probability >= 40 ? 'text-yellow-600' :
    'text-red-600'

  const formatVolume = (volume: number) => {
    if (volume >= 1000000) return `$${(volume / 1000000).toFixed(2)}M`
    if (volume >= 1000) return `$${(volume / 1000).toFixed(1)}K`
    return `$${volume.toFixed(0)}`
  }

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex justify-between items-start">
          <h2 className="text-2xl font-bold text-gray-900 flex-1 pr-4">
            {market.question}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        <div className="p-6">
          {market.description && (
            <p className="text-gray-700 mb-6">{market.description}</p>
          )}

          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className={`text-4xl font-bold ${probabilityColor} mb-1`}>
                {market.probability.toFixed(1)}%
              </div>
              <div className="text-sm text-gray-600">Current Probability</div>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-4xl font-bold text-gray-900 mb-1">
                {formatVolume(market.volume)}
              </div>
              <div className="text-sm text-gray-600">Total Volume</div>
            </div>

            {market.liquidity && (
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="text-2xl font-bold text-gray-900 mb-1">
                  {formatVolume(market.liquidity)}
                </div>
                <div className="text-sm text-gray-600">Liquidity</div>
              </div>
            )}

            <div className="bg-gray-50 rounded-lg p-4">
              <div className="text-lg font-semibold text-gray-900 mb-1 capitalize">
                {market.source}
              </div>
              <div className="text-sm text-gray-600">Source</div>
            </div>
          </div>

          {market.outcomes && market.outcomes.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Outcomes</h3>
              <div className="flex flex-wrap gap-2">
                {market.outcomes.map((outcome, index) => (
                  <span
                    key={index}
                    className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm"
                  >
                    {outcome}
                  </span>
                ))}
              </div>
            </div>
          )}

          {market.category && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold mb-2 text-gray-900">Category</h3>
              <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded text-sm">
                {market.category}
              </span>
            </div>
          )}

          <div className="space-y-2 text-sm text-gray-600">
            <div>
              <span className="font-semibold">Created:</span>{' '}
              {formatDate(market.createdTime)}
            </div>
            {market.closeTime && (
              <div>
                <span className="font-semibold">Closes:</span>{' '}
                {formatDate(market.closeTime)}
              </div>
            )}
            {market.resolution && (
              <div>
                <span className="font-semibold">Resolution:</span>{' '}
                {market.resolution}
              </div>
            )}
          </div>

          {market.url && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <a
                href={market.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                View on {market.source === 'polymarket' ? 'Polymarket' : 'Manifold'}
              </a>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
