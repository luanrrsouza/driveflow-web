import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'

import { VehicleForm } from '../components/VehicleForm'
import { useUpdateVehicle } from '../hooks/useUpdateVehicle'
import { useVehicle } from '../hooks/useVehicle'
import type { VehicleFormData } from '../schemas/vehicleSchema'

export function VehicleEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const vehicleId = id ?? ''

  const {
    data: vehicle,
    isPending: isLoadingVehicle,
    isError: isVehicleError,
  } = useVehicle(vehicleId)

  const updateVehicle = useUpdateVehicle()

  useEffect(() => {
    if (isVehicleError) {
      toast.error(
        'Não foi possível carregar os dados do veículo.',
        {
          id: 'vehicle-load-error',
        },
      )
    }
  }, [isVehicleError])

  function handleSubmit(data: VehicleFormData) {
    if (!vehicleId) {
      toast.error('Identificador do veículo inválido.')
      return
    }

    updateVehicle.mutate(
      {
        id: vehicleId,
        data,
      },
      {
        onSuccess: () => {
          toast.success(
            'Veículo atualizado com sucesso.',
          )

          navigate('/vehicles')
        },

        onError: () => {
          toast.error(
            'Não foi possível atualizar o veículo. Verifique os dados e tente novamente.',
          )
        },
      },
    )
  }

  function handleCancel() {
    navigate('/vehicles')
  }

  if (!vehicleId) {
    return (
      <main className="mx-auto w-full max-w-3xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Veículo inválido
            </CardTitle>

            <CardDescription>
              Não foi possível identificar o veículo informado.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Voltar para veículos
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (isLoadingVehicle) {
    return (
      <main className="mx-auto w-full max-w-3xl p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-16" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-9 w-full" />
              </div>

              <div className="space-y-2">
                <Skeleton className="h-4 w-12" />
                <Skeleton className="h-9 w-full" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-16" />
              <Skeleton className="h-9 w-full" />
            </div>

            <div className="space-y-3">
              <Skeleton className="h-4 w-36" />

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-full" />
            </div>

            <div className="flex justify-end gap-3">
              <Skeleton className="h-9 w-24" />
              <Skeleton className="h-9 w-36" />
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (isVehicleError || !vehicle) {
    return (
      <main className="mx-auto w-full max-w-3xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Veículo não encontrado
            </CardTitle>

            <CardDescription>
              Não foi possível carregar os dados solicitados.
              Verifique se o veículo ainda existe.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Voltar para veículos
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  const initialValues: VehicleFormData = {
    brand: vehicle.brand,
    model: vehicle.model,
    fuelTypes: vehicle.fuelTypes,
    color: vehicle.color,
    year: vehicle.year,
    price: vehicle.price,
    dealerId: vehicle.dealerId,
  }

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Editar veículo
          </CardTitle>

          <CardDescription>
            Atualize as informações do veículo e sua
            concessionária responsável.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <VehicleForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={updateVehicle.isPending}
            submitLabel="Salvar alterações"
          />
        </CardContent>
      </Card>
    </main>
  )
}