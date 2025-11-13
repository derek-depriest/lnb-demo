export interface Market {
  id: string
  question: string
  description?: string
  probability: number // 0-1 or 0-100 depending on source
  volume: number
  liquidity?: number
  createdTime: number
  closeTime?: number
  resolvedTime?: number
  resolution?: string
  category?: string
  source: 'polymarket' | 'manifold'
  url?: string
  outcomes?: string[]
  tags?: string[]
}

export interface PolymarketMarket {
  condition_id: string
  question: string
  description: string
  end_date_iso: string
  game_start_time: string
  question_id: string
  market_slug: string
  min_incentive_size: number
  max_incentive_size: number
  volume: string
  volume_24hr: string
  liquidity: string
  outcome_prices: string[]
  outcomes: string[]
  active: boolean
  closed: boolean
  archived: boolean
  accepting_orders: boolean
  category?: string
  tags?: string[]
}

export interface ManifoldMarket {
  id: string
  creatorId: string
  creatorUsername: string
  creatorName: string
  createdTime: number
  question: string
  url: string
  pool: { [outcome: string]: number }
  probability: number
  p?: number
  totalLiquidity?: number
  volume: number
  volume24Hours: number
  isResolved: boolean
  resolution?: string
  resolutionTime?: number
  closeTime?: number
  outcomeType: string
  mechanism: string
  description?: string
  textDescription?: string
}

export interface MarketFilters {
  category?: string
  minProbability?: number
  maxProbability?: number
  dateRange?: {
    start: Date
    end: Date
  }
  searchQuery?: string
}

export interface PriceHistory {
  timestamp: number
  probability: number
}
