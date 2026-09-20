import { apiRequest } from '../../../services/api'

import type { Address } from '../types/address'

const BASE_PATH = '/address'

export const addressService = {
  findByZipCode(zipCode: string): Promise<Address> {
    return apiRequest<Address>(
      `${BASE_PATH}/${zipCode}`,
    )
  },
}