import { useQuery } from '@tanstack/react-query'
import { fetchAllMarkets, fetchTrendingMarkets } from '../services/markets'

export function useMarkets(limit = 20) {
  return useQuery({
    queryKey: ['markets', limit],
    queryFn: () => fetchAllMarkets(limit),
    refetchInterval: 60000, // Refetch every 60 seconds
  })
}

export function useTrendingMarkets(limit = 10) {
  return useQuery({
    queryKey: ['trending-markets', limit],
    queryFn: () => fetchTrendingMarkets(limit),
    refetchInterval: 60000, // Refetch every 60 seconds
  })
}
