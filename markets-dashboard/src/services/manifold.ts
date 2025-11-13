import type { Market, ManifoldMarket } from '../types/market'

const MANIFOLD_API_BASE = 'https://api.manifold.markets/v0'

export async function fetchManifoldMarkets(limit = 20, sort = '24-hour-volume'): Promise<Market[]> {
  try {
    const response = await fetch(
      `${MANIFOLD_API_BASE}/markets?limit=${limit}&sort=${sort}`
    )

    if (!response.ok) {
      throw new Error(`Manifold API error: ${response.statusText}`)
    }

    const data: ManifoldMarket[] = await response.json()

    return data.map(transformManifoldToMarket)
  } catch (error) {
    console.error('Error fetching Manifold markets:', error)
    return []
  }
}

export function transformManifoldToMarket(mm: ManifoldMarket): Market {
  return {
    id: `manifold-${mm.id}`,
    question: mm.question,
    description: mm.textDescription || mm.description,
    probability: mm.probability * 100, // Convert to percentage
    volume: mm.volume24Hours || mm.volume,
    liquidity: mm.totalLiquidity,
    createdTime: mm.createdTime,
    closeTime: mm.closeTime,
    resolvedTime: mm.resolutionTime,
    resolution: mm.resolution,
    source: 'manifold',
    url: mm.url,
  }
}
