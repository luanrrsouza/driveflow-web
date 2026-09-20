import { useQuery } from '@tanstack/react-query'

import { dealerService } from '../services/dealerService'

export function useDealer(id: string) {
  return useQuery({
    queryKey: ['dealers', id],
    queryFn: () => dealerService.findById(id),
    enabled: Boolean(id),
  })
}