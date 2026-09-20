import { z } from 'zod'

import type { FuelType } from '../types/fuelType'

const fuelTypes = [
  'GASOLINE',
  'ETHANOL',
  'FLEX',
  'DIESEL',
  'ELECTRIC',
  'HYBRID',
] as const satisfies readonly FuelType[]

export const vehicleSchema = z.object({
  brand: z
    .string()
    .min(1, 'A marca é obrigatória'),

  model: z
    .string()
    .min(1, 'O modelo é obrigatório'),

  fuelTypes: z
    .array(z.enum(fuelTypes))
    .min(1, 'Selecione pelo menos um tipo de combustível'),

  color: z
    .string()
    .min(1, 'A cor é obrigatória'),

  year: z
    .number()
    .int('O ano deve ser um número inteiro')
    .positive('O ano deve ser maior que zero')
    .nullable(),

  price: z
    .number()
    .nonnegative('O preço não pode ser negativo')
    .nullable(),

  dealerId: z
    .string()
    .min(1, 'Selecione uma concessionária'),
})

export type VehicleFormData = z.infer<typeof vehicleSchema>
