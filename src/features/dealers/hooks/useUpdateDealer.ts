import { useMutation, useQueryClient } from '@tanstack/react-query'

import { dealerService } from '../services/dealerService'
import type { UpdateDealerRequest } from '../types/dealer'

interface UpdateDealerVariables {
  id: string
  data: UpdateDealerRequest
}

export function useUpdateDealer() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: ({ id, data }: UpdateDealerVariables) =>
      dealerService.update(id, data),

    onSuccess: async (_, variables) => {
      await Promise.all([
        queryClient.invalidateQueries({
          queryKey: ['dealers'],
        }),

        queryClient.invalidateQueries({
          queryKey: ['dealers', variables.id],
        }),
      ])
    },
  })
}