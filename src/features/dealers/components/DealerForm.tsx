import {
  useEffect,
  useRef,
} from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Controller,
  useForm,
  useWatch,
} from 'react-hook-form'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Spinner } from '@/components/ui/spinner'
import { formatCep } from '@/lib/formatters/formatCep'
import { formatCnpj } from '@/lib/formatters/formatCnpj'

import { useAddressByZipCode } from '../hooks/useAddressByZipCode'
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
  number: '',
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
    control,
    handleSubmit,
    reset,
    setValue,
    formState: {
      errors,
      isDirty,
    },
  } = useForm<DealerFormData>({
    resolver: zodResolver(dealerSchema),
    defaultValues: initialValues ?? emptyValues,
    mode: 'onBlur',
  })

  const zipCode =
    useWatch({
      control,
      name: 'zipCode',
    }) ?? ''

  const normalizedZipCode =
    zipCode.replace(/\D/g, '')

  const previousZipCode = useRef(
    normalizedZipCode,
  )

  const {
    data: address,
    isPending: isLoadingAddress,
    isFetching: isFetchingAddress,
    isError: isAddressError,
  } = useAddressByZipCode(normalizedZipCode)

  const isCompleteZipCode =
    normalizedZipCode.length === 8

  const isSearchingAddress =
    isCompleteZipCode &&
    (isLoadingAddress || isFetchingAddress)

  const hasValidAddress =
    isCompleteZipCode &&
    Boolean(address) &&
    !isAddressError

  useEffect(() => {
    reset(initialValues ?? emptyValues)

    previousZipCode.current =
      initialValues?.zipCode.replace(/\D/g, '') ?? ''
  }, [initialValues, reset])

  useEffect(() => {
    if (
      previousZipCode.current &&
      previousZipCode.current !== normalizedZipCode
    ) {
      setValue('number', '', {
        shouldDirty: true,
        shouldValidate: false,
      })
    }

    previousZipCode.current = normalizedZipCode
  }, [normalizedZipCode, setValue])

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
          autoComplete="organization"
          disabled={isSubmitting}
          aria-invalid={Boolean(
            errors.corporateName,
          )}
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

        <Controller
          name="cnpj"
          control={control}
          render={({ field }) => (
            <Input
              id="cnpj"
              type="text"
              inputMode="numeric"
              placeholder="00.000.000/0000-00"
              disabled={isSubmitting}
              aria-invalid={Boolean(errors.cnpj)}
              value={formatCnpj(
                field.value ?? '',
              )}
              onBlur={field.onBlur}
              onChange={(event) => {
                const value =
                  event.target.value
                    .replace(/\D/g, '')
                    .slice(0, 14)

                field.onChange(value)
              }}
            />
          )}
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

        <Controller
          name="zipCode"
          control={control}
          render={({ field }) => (
            <Input
              id="zipCode"
              type="text"
              inputMode="numeric"
              placeholder="00000-000"
              autoComplete="postal-code"
              disabled={isSubmitting}
              aria-invalid={Boolean(
                errors.zipCode ||
                isAddressError,
              )}
              value={formatCep(
                field.value ?? '',
              )}
              onBlur={field.onBlur}
              onChange={(event) => {
                const value =
                  event.target.value
                    .replace(/\D/g, '')
                    .slice(0, 8)

                field.onChange(value)
              }}
            />
          )}
        />

        {errors.zipCode ? (
          <p className="text-sm text-destructive">
            {errors.zipCode.message}
          </p>
        ) : isAddressError &&
          isCompleteZipCode ? (
          <p className="text-sm text-destructive">
            Não foi possível localizar esse CEP.
          </p>
        ) : !isCompleteZipCode ? (
          <p className="text-sm text-muted-foreground">
            Informe o CEP para localizar o endereço
            automaticamente.
          </p>
        ) : null}
      </div>

      {isSearchingAddress && (
        <div className="flex items-center gap-2 rounded-md border bg-muted/40 p-4">
          <Spinner />

          <p className="text-sm text-muted-foreground">
            Buscando endereço...
          </p>
        </div>
      )}

      {hasValidAddress && address && (
        <>
          <div className="rounded-md border border-border bg-muted/40 p-4">
            <div className="space-y-1">
              <p className="text-sm font-medium text-foreground">
                Endereço encontrado
              </p>

              <p className="text-sm text-muted-foreground">
                {address.address}
              </p>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="number">
              Número
            </Label>

            <Input
              id="number"
              type="text"
              inputMode="text"
              placeholder="Ex.: 123"
              autoComplete="address-line2"
              disabled={isSubmitting}
              aria-invalid={Boolean(
                errors.number,
              )}
              {...register('number')}
            />

            {errors.number ? (
              <p className="text-sm text-destructive">
                {errors.number.message}
              </p>
            ) : (
              <p className="text-sm text-muted-foreground">
                Informe o número do endereço.
              </p>
            )}
          </div>
        </>
      )}

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
            !isDirty ||
            !hasValidAddress ||
            isSearchingAddress
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