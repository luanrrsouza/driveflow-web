import { useQuery } from '@tanstack/react-query'

import { vehicleService } from '../services/vehicleService'

export function useVehiclesByDealer(dealerId: string) {
  return useQuery({
    queryKey: ['vehicles', 'dealer', dealerId],
    queryFn: () => vehicleService.findByDealerId(dealerId),
    enabled: Boolean(dealerId),
  })
}