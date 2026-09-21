import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Spinner } from '@/components/ui/spinner'
import { formatCurrency } from '@/lib/formatters/formatCurrency'

import { useDealers } from '../../dealers/hooks/useDealers'
import {
  vehicleSchema,
  type VehicleFormData,
} from '../schemas/vehicleSchema'
import type { FuelType } from '../types/fuelType'

interface VehicleFormProps {
  initialValues?: VehicleFormData
  isSubmitting?: boolean
  submitLabel?: string
  onSubmit: (data: VehicleFormData) => void | Promise<void>
  onCancel?: () => void
}

const fuelTypeOptions: Array<{
  value: FuelType
  label: string
}> = [
  {
    value: 'GASOLINE',
    label: 'Gasolina',
  },
  {
    value: 'ETHANOL',
    label: 'Etanol',
  },
  {
    value: 'FLEX',
    label: 'Flex',
  },
  {
    value: 'DIESEL',
    label: 'Diesel',
  },
  {
    value: 'ELECTRIC',
    label: 'Elétrico',
  },
  {
    value: 'HYBRID',
    label: 'Híbrido',
  },
]

const emptyValues: VehicleFormData = {
  brand: '',
  model: '',
  fuelTypes: [],
  color: '',
  year: null,
  price: null,
  dealerId: '',
}

export function VehicleForm({
  initialValues,
  isSubmitting = false,
  submitLabel = 'Salvar',
  onSubmit,
  onCancel,
}: VehicleFormProps) {
  const {
    data: dealers,
    isPending: isLoadingDealers,
    isError: isDealersError,
  } = useDealers()

  const dealerOptions =
    dealers?.map((dealer) => ({
      label: dealer.corporateName,
      value: dealer.id,
    })) ?? []

  const {
    register,
    control,
    handleSubmit,
    formState: {
      errors,
      isDirty,
    },
  } = useForm<VehicleFormData>({
    resolver: zodResolver(vehicleSchema),
    defaultValues: initialValues ?? emptyValues,
    mode: 'onBlur',
  })

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-6"
      noValidate
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="brand">
            Marca
          </Label>

          <Input
            id="brand"
            type="text"
            placeholder="Ex.: Jeep"
            autoComplete="off"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.brand)}
            {...register('brand')}
          />

          {errors.brand && (
            <p className="text-sm text-destructive">
              {errors.brand.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="model">
            Modelo
          </Label>

          <Input
            id="model"
            type="text"
            placeholder="Ex.: Compass"
            autoComplete="off"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.model)}
            {...register('model')}
          />

          {errors.model && (
            <p className="text-sm text-destructive">
              {errors.model.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="color">
            Cor
          </Label>

          <Input
            id="color"
            type="text"
            placeholder="Ex.: Preto"
            autoComplete="off"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.color)}
            {...register('color')}
          />

          {errors.color && (
            <p className="text-sm text-destructive">
              {errors.color.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="year">
            Ano
          </Label>

          <Input
            id="year"
            type="number"
            min="1"
            step="1"
            placeholder="Ex.: 2026"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.year)}
            {...register('year', {
              setValueAs: (value) =>
                value === ''
                  ? null
                  : Number(value),
            })}
          />

          {errors.year ? (
            <p className="text-sm text-destructive">
              {errors.year.message}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              Campo opcional.
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">
          Preço
        </Label>

        <Controller
          name="price"
          control={control}
          render={({ field }) => (
            <Input
              id="price"
              type="text"
              inputMode="numeric"
              placeholder="R$ 0,00"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.price)}
              value={
                field.value === null
                  ? ''
                  : formatCurrency(field.value)
              }
              onBlur={field.onBlur}
              onChange={(event) => {
                const digits =
                  event.target.value.replace(
                    /\D/g,
                    '',
                  )

                if (!digits) {
                  field.onChange(null)
                  return
                }

                field.onChange(
                  Number(digits) / 100,
                )
              }}
            />
          )}
        />

        {errors.price ? (
          <p className="text-sm text-destructive">
            {errors.price.message}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Campo opcional. Informe o valor do veículo em reais.
          </p>
        )}
      </div>

      <div className="space-y-3">
        <div className="space-y-1">
          <Label>
            Tipos de combustível
          </Label>

          <p className="text-sm text-muted-foreground">
            Selecione um ou mais tipos compatíveis com o veículo.
          </p>
        </div>

        <Controller
          name="fuelTypes"
          control={control}
          render={({ field }) => (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {fuelTypeOptions.map((fuelType) => {
                const checked =
                  field.value.includes(
                    fuelType.value,
                  )

                return (
                  <div
                    key={fuelType.value}
                    className="flex items-center gap-2"
                  >
                    <Checkbox
                      id={`fuel-${fuelType.value}`}
                      checked={checked}
                      disabled={isSubmitting}
                      aria-invalid={Boolean(
                        errors.fuelTypes,
                      )}
                      onCheckedChange={(
                        isChecked,
                      ) => {
                        if (isChecked) {
                          field.onChange([
                            ...field.value,
                            fuelType.value,
                          ])

                          return
                        }

                        field.onChange(
                          field.value.filter(
                            (value) =>
                              value !==
                              fuelType.value,
                          ),
                        )
                      }}
                    />

                    <Label
                      htmlFor={`fuel-${fuelType.value}`}
                      className="cursor-pointer font-normal"
                    >
                      {fuelType.label}
                    </Label>
                  </div>
                )
              })}
            </div>
          )}
        />

        {errors.fuelTypes && (
          <p className="text-sm text-destructive">
            {errors.fuelTypes.message}
          </p>
        )}
      </div>

      <div className="space-y-2">
        <Label>
          Concessionária
        </Label>

        <Controller
          name="dealerId"
          control={control}
          render={({ field }) => (
            <Select
              items={dealerOptions}
              value={field.value}
              onValueChange={(value) => {
                field.onChange(value ?? '')
              }}
              disabled={
                isSubmitting ||
                isLoadingDealers ||
                isDealersError
              }
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={Boolean(
                  errors.dealerId,
                )}
              >
                <SelectValue
                  placeholder={
                    isLoadingDealers
                      ? 'Carregando concessionárias...'
                      : 'Selecione uma concessionária'
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {dealerOptions.map((dealer) => (
                  <SelectItem
                    key={dealer.value}
                    value={dealer.value}
                  >
                    {dealer.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {isDealersError ? (
          <p className="text-sm text-destructive">
            Não foi possível carregar as concessionárias.
          </p>
        ) : errors.dealerId ? (
          <p className="text-sm text-destructive">
            {errors.dealerId.message}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Selecione a concessionária responsável por este veículo.
          </p>
        )}
      </div>

      <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
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
          disabled={
            isSubmitting ||
            isLoadingDealers ||
            isDealersError ||
            !isDirty
          }
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