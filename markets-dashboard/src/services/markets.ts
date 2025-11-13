import type { Market } from '../types/market'
import { fetchPolymarketMarkets } from './polymarket'
import { fetchManifoldMarkets } from './manifold'

export async function fetchAllMarkets(limit = 20): Promise<Market[]> {
  const [polymarkets, manifoldMarkets] = await Promise.all([
    fetchPolymarketMarkets(limit),
    fetchManifoldMarkets(limit),
  ])

  // Combine and sort by volume
  const allMarkets = [...polymarkets, ...manifoldMarkets]
  return allMarkets.sort((a, b) => b.volume - a.volume)
}

export async function fetchTrendingMarkets(limit = 10): Promise<Market[]> {
  const markets = await fetchAllMarkets(limit * 2)

  // Sort by 24hr volume (already sorted in fetchAllMarkets)
  return markets.slice(0, limit)
}

export function filterMarkets(
  markets: Market[],
  filters: {
    category?: string
    minProbability?: number
    maxProbability?: number
    searchQuery?: string
  }
): Market[] {
  return markets.filter((market) => {
    if (filters.category && market.category !== filters.category) {
      return false
    }

    if (
      filters.minProbability !== undefined &&
      market.probability < filters.minProbability
    ) {
      return false
    }

    if (
      filters.maxProbability !== undefined &&
      market.probability > filters.maxProbability
    ) {
      return false
    }

    if (filters.searchQuery) {
      const query = filters.searchQuery.toLowerCase()
      return (
        market.question.toLowerCase().includes(query) ||
        market.description?.toLowerCase().includes(query)
      )
    }

    return true
  })
}
