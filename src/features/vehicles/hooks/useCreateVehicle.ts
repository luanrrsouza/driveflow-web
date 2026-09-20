import { useMutation, useQueryClient } from '@tanstack/react-query'

import { vehicleService } from '../services/vehicleService'

export function useCreateVehicle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: vehicleService.create,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['vehicles'],
      })
    },
  })
}