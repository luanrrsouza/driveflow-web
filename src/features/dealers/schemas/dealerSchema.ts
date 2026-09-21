import { z } from 'zod'

import { isValidCnpj } from '@/lib/validators/isValidCnpj'

export const dealerSchema = z.object({
  corporateName: z
    .string()
    .min(1, 'Razão social é obrigatória'),

  cnpj: z
    .string()
    .min(1, 'CNPJ é obrigatório')
    .length(14, 'CNPJ deve conter 14 dígitos')
    .refine(
      isValidCnpj,
      'Informe um CNPJ válido',
    ),

  zipCode: z
    .string()
    .min(1, 'CEP é obrigatório')
    .regex(
      /^\d{8}$/,
      'CEP deve conter 8 dígitos',
    ),

  number: z
    .string()
    .min(1, 'Número é obrigatório'),
})

export type DealerFormData =
  z.infer<typeof dealerSchema>