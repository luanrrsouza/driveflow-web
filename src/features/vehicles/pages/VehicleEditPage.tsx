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
      toast.error(
        'Identificador do veículo inválido.',
      )

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
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Veículo inválido
          </h1>

          <p className="text-sm text-muted-foreground">
            Não foi possível identificar o veículo solicitado.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
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
        <div className="mb-6 space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-40" />
            <Skeleton className="h-4 w-96 max-w-full" />
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
                <Skeleton className="h-4 w-28" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-4 w-72 max-w-full" />
            </div>

            <div className="space-y-3">
              <div className="space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-80 max-w-full" />
              </div>

              <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3">
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
                <Skeleton className="h-6 w-24" />
              </div>
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-28" />
              <Skeleton className="h-9 w-full" />
              <Skeleton className="h-4 w-80 max-w-full" />
            </div>

            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
              <Skeleton className="h-9 w-full sm:w-24" />
              <Skeleton className="h-9 w-full sm:w-36" />
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (isVehicleError || !vehicle) {
    return (
      <main className="mx-auto w-full max-w-3xl p-6">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Veículo não encontrado
          </h1>

          <p className="text-sm text-muted-foreground">
            Não foi possível encontrar os dados do veículo
            solicitado.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Não foi possível carregar o veículo
            </CardTitle>

            <CardDescription>
              O registro pode não existir mais ou ocorreu
              uma falha durante a consulta.
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
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Editar veículo
        </h1>

        <p className="text-sm text-muted-foreground">
          Atualize as informações do veículo e mantenha
          os dados do catálogo sempre atualizados.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Dados do veículo
          </CardTitle>

          <CardDescription>
            Altere as características do veículo, os tipos
            de combustível ou a concessionária responsável.
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