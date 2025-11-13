import type { Market, PolymarketMarket } from '../types/market'

const POLYMARKET_API_BASE = 'https://gamma-api.polymarket.com'

export async function fetchPolymarketMarkets(limit = 20): Promise<Market[]> {
  try {
    const response = await fetch(`${POLYMARKET_API_BASE}/markets?limit=${limit}&active=true`)

    if (!response.ok) {
      throw new Error(`Polymarket API error: ${response.statusText}`)
    }

    const data: PolymarketMarket[] = await response.json()

    return data.map(transformPolymarketToMarket)
  } catch (error) {
    console.error('Error fetching Polymarket markets:', error)
    return []
  }
}

export function transformPolymarketToMarket(pm: PolymarketMarket): Market {
  // Polymarket has binary outcomes, get the "Yes" probability
  const yesPrice = pm.outcome_prices && pm.outcome_prices.length > 0
    ? parseFloat(pm.outcome_prices[0])
    : 0.5

  return {
    id: `poly-${pm.condition_id}`,
    question: pm.question,
    description: pm.description,
    probability: yesPrice * 100, // Convert to percentage
    volume: parseFloat(pm.volume || '0'),
    liquidity: parseFloat(pm.liquidity || '0'),
    createdTime: new Date(pm.game_start_time || pm.end_date_iso).getTime(),
    closeTime: pm.end_date_iso ? new Date(pm.end_date_iso).getTime() : undefined,
    category: pm.category,
    source: 'polymarket',
    url: pm.market_slug ? `https://polymarket.com/event/${pm.market_slug}` : undefined,
    outcomes: pm.outcomes,
    tags: pm.tags,
  }
}
