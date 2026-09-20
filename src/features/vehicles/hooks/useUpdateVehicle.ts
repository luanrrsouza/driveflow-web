import { useMutation, useQueryClient } from '@tanstack/react-query'

import { vehicleService } from '../services/vehicleService'
import type { UpdateVehicleRequest } from '../types/vehicle'

interface UpdateVehicleVariables {
  id: string
  data: UpdateVehicleRequest
}

export function useUpdateVehicle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: UpdateVehicleVariables) =>
      vehicleService.update(id, data),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['vehicles'],
        }),

        queryClient.invalidateQueries({
          queryKey: ['vehicles', variables.id],
        }),
      ])
    },
  })
}