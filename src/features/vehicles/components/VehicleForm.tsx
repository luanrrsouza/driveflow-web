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
            placeholder="Ex.: 2026"
            disabled={isSubmitting}
            aria-invalid={Boolean(errors.year)}
            {...register('year', {
              setValueAs: (value) =>
                value === '' ? null : Number(value),
            })}
          />

          {errors.year && (
            <p className="text-sm text-destructive">
              {errors.year.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="price">
          Preço
        </Label>

        <Input
          id="price"
          type="number"
          step="0.01"
          min="0"
          placeholder="Ex.: 189990.00"
          disabled={isSubmitting}
          aria-invalid={Boolean(errors.price)}
          {...register('price', {
            setValueAs: (value) =>
              value === '' ? null : Number(value),
          })}
        />

        {errors.price && (
          <p className="text-sm text-destructive">
            {errors.price.message}
          </p>
        )}
      </div>

      <div className="space-y-3">
        <Label>
          Tipos de combustível
        </Label>

        <Controller
          name="fuelTypes"
          control={control}
          render={({ field }) => (
            <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
              {fuelTypeOptions.map((fuelType) => {
                const checked = field.value.includes(
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
                      onCheckedChange={(isChecked) => {
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
                              value !== fuelType.value,
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
              value={field.value}
              onValueChange={field.onChange}
              disabled={
                isSubmitting ||
                isLoadingDealers ||
                isDealersError
              }
            >
              <SelectTrigger
                className="w-full"
                aria-invalid={Boolean(errors.dealerId)}
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
                {dealers?.map((dealer) => (
                  <SelectItem
                    key={dealer.id}
                    value={dealer.id}
                  >
                    {dealer.corporateName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          )}
        />

        {isDealersError && (
          <p className="text-sm text-destructive">
            Não foi possível carregar as concessionárias.
          </p>
        )}

        {errors.dealerId && (
          <p className="text-sm text-destructive">
            {errors.dealerId.message}
          </p>
        )}
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