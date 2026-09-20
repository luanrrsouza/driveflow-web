import { apiRequest } from '../../../services/api'
import type {
  CreateDealerRequest,
  Dealer,
  UpdateDealerRequest,
} from '../types/dealer'

const BASE_PATH = '/dealer'

export const dealerService = {

  findAll(): Promise<Dealer[]> {
    return apiRequest<Dealer[]>(BASE_PATH)
  },

  findById(id: string): Promise<Dealer> {
    return apiRequest<Dealer>(`${BASE_PATH}/${id}`)
  },

  create(data: CreateDealerRequest): Promise<Dealer> {
    return apiRequest<Dealer>(BASE_PATH, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update(
    id: string,
    data: UpdateDealerRequest,
  ): Promise<Dealer> {
    return apiRequest<Dealer>(`${BASE_PATH}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(data),
    })
  },

  delete(id: string): Promise<void> {
    return apiRequest<void>(`${BASE_PATH}/${id}`, {
      method: 'DELETE',
    })
  },
}