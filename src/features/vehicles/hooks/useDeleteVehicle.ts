import { useMutation, useQueryClient } from '@tanstack/react-query'

import { vehicleService } from '../services/vehicleService'

export function useDeleteVehicle() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) =>
      vehicleService.delete(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['vehicles'],
      })
    },
  })
}