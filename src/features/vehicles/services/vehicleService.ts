import { apiRequest } from '../../../services/api'

import type {
  CreateVehicleRequest,
  UpdateVehicleRequest,
  Vehicle,
} from '../types/vehicle'

const BASE_PATH = '/vehicles'

export const vehicleService = {

  findAll(): Promise<Vehicle[]> {
    return apiRequest<Vehicle[]>(BASE_PATH)
  },

  findById(id: string): Promise<Vehicle> {
    return apiRequest<Vehicle>(`${BASE_PATH}/${id}`)
  },

  findByDealerId(dealerId: string): Promise<Vehicle[]> {
    return apiRequest<Vehicle[]>(
      `${BASE_PATH}?dealerId=${dealerId}`
    )
  },

  create(data: CreateVehicleRequest): Promise<Vehicle> {
    return apiRequest<Vehicle>(BASE_PATH, {
      method: 'POST',
      body: JSON.stringify(data),
    })
  },

  update(
    id: string,
    data: UpdateVehicleRequest,
  ): Promise<Vehicle> {
    return apiRequest<Vehicle>(`${BASE_PATH}/${id}`, {
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