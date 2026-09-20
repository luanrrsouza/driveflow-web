import { useMutation, useQueryClient } from '@tanstack/react-query'

import { dealerService } from '../services/dealerService'

export function useDeleteDealer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (id: string) => dealerService.delete(id),

    onSuccess: async () => {
      await queryClient.invalidateQueries({
        queryKey: ['dealers'],
      })
    },
  })
}