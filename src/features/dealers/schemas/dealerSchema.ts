import { z } from 'zod'

export const dealerSchema = z.object({
  corporateName: z
    .string()
    .min(1, 'Corporate name is required'),

  cnpj: z
    .string()
    .min(1, 'CNPJ is required')
    .length(14, 'CNPJ must contain 14 digits'),

  zipCode: z
    .string()
    .min(1, 'Zip code is required')
    .regex(/^\d{8}$/, 'Zip code must contain 8 digits'),

  number: z
    .string()
    .min(1, 'Address number is required'),
})

export type DealerFormData = z.infer<typeof dealerSchema>