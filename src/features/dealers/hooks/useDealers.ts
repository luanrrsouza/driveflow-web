import { useQuery } from '@tanstack/react-query'

import { dealerService } from '../services/dealerService'

export function useDealers() {
  return useQuery({
    queryKey: ['dealers'],
    queryFn: dealerService.findAll,
  })
}