import type { FuelType } from "./fuelType"

export interface Vehicle {
    id: string
    brand: string
    model: string
    fuelTypes: FuelType[]
    color: string
    year: number | null
    price: number | null
    dealerId: string
    dealerName: string
}

export interface CreateVehicleRequest {
    brand: string
    model: string
    fuelTypes: FuelType[]
    color: string
    year: number | null
    price: number | null
    dealerId: string
}

export interface UpdateVehicleRequest {
    brand: string
    model: string
    fuelTypes: FuelType[]
    color: string
    year: number | null
    price: number | null
    dealerId: string
}