import { useEffect } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'

import {
  dealerSchema,
  type DealerFormData,
} from '../schemas/dealerSchema'

interface DealerFormProps {
  initialValues?: DealerFormData
  isSubmitting?: boolean
  submitLabel?: string
  onSubmit: (data: DealerFormData) => void | Promise<void>
  onCancel?: () => void
}

const emptyValues: DealerFormData = {
  corporateName: '',
  cnpj: '',
  zipCode: '',
}

export function DealerForm({
  initialValues,
  isSubmitting = false,
  submitLabel = 'Salvar',
  onSubmit,
  onCancel,
}: DealerFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: {
      errors,
      isDirty,
    },
  } = useForm<DealerFormData>({
    resolver: zodResolver(dealerSchema),
    defaultValues: initialValues ?? emptyValues,
    mode: 'onBlur',
  })

  useEffect(() => {
    reset(initialValues ?? emptyValues)
  }, [initialValues, reset])

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <div className="space-y-2">
        <Label htmlFor="corporateName">
          Razão social
        </Label>

        <Input
          id="corporateName"
          type="text"
          placeholder="Ex.: DriveFlow Motors"
          aria-invalid={Boolean(errors.corporateName)}
          disabled={isSubmitting}
          {...register('corporateName')}
        />

        {errors.corporateName && (
          <p className="text-sm text-destructive">
            {errors.corporateName.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="cnpj">
          CNPJ
        </Label>

        <Input
          id="cnpj"
          type="text"
          inputMode="numeric"
          maxLength={14}
          placeholder="Ex.: 12345678000195"
          aria-invalid={Boolean(errors.cnpj)}
          disabled={isSubmitting}
          {...register('cnpj')}
        />

        {errors.cnpj && (
          <p className="text-sm text-destructive">
            {errors.cnpj.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="zipCode">
          CEP
        </Label>

        <Input
          id="zipCode"
          type="text"
          inputMode="numeric"
          maxLength={8}
          placeholder="Ex.: 01001000"
          aria-invalid={Boolean(errors.zipCode)}
          disabled={isSubmitting}
          {...register('zipCode')}
        />

        {errors.zipCode && (
          <p className="text-sm text-destructive">
            {errors.zipCode.message}
          </p>
        )}

        <p className="text-sm text-muted-foreground">
          O endereço será preenchido automaticamente a partir do CEP.
        </p>
      </div>

      <div className="flex justify-end gap-3">
        {onCancel && (
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Cancelar
          </Button>
        )}

        <Button
          type="submit"
          disabled={isSubmitting || !isDirty}
        >
          {isSubmitting && (
            <Spinner data-icon="inline-start" />
          )}

          {isSubmitting
            ? 'Salvando...'
            : submitLabel}
        </Button>
      </div>
    </form>
  )
}