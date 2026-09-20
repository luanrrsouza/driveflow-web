import { useQuery } from '@tanstack/react-query'

import { addressService } from '../services/addressService'

export function useAddressByZipCode(
  zipCode: string,
) {
  const normalizedZipCode = zipCode.replace(/\D/g, '')

  return useQuery({
    queryKey: ['address', normalizedZipCode],
    queryFn: () =>
      addressService.findByZipCode(normalizedZipCode),
    enabled: normalizedZipCode.length === 8,
    retry: false,
  })
}
