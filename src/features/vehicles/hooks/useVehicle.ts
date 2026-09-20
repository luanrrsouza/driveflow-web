import { useQuery } from '@tanstack/react-query'

import { vehicleService } from '../services/vehicleService'

export function useVehicle(id: string) {
  return useQuery({
    queryKey: ['vehicles', id],
    queryFn: () => vehicleService.findById(id),
    enabled: Boolean(id),
  })
}