import { useMutation, useQueryClient } from '@tanstack/react-query'

import { dealerService } from '../services/dealerService'

export function useCreateDealer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: dealerService.create,

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['dealers'],
      })
    },
  })
}