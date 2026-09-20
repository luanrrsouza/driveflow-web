import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { VehicleForm } from '../components/VehicleForm'
import { useCreateVehicle } from '../hooks/useCreateVehicle'
import type { VehicleFormData } from '../schemas/vehicleSchema'

export function VehicleCreatePage() {
  const navigate = useNavigate()
  const createVehicle = useCreateVehicle()

  function handleSubmit(data: VehicleFormData) {
    createVehicle.mutate(data, {
      onSuccess: () => {
        toast.success(
          'Veículo cadastrado com sucesso.',
        )

        navigate('/vehicles')
      },

      onError: () => {
        toast.error(
          'Não foi possível cadastrar o veículo. Verifique os dados e tente novamente.',
        )
      },
    })
  }

  function handleCancel() {
    navigate('/vehicles')
  }

  return (
    <main className="mx-auto w-full max-w-3xl p-6">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Novo veículo
        </h1>

        <p className="text-sm text-muted-foreground">
          Adicione um novo veículo ao catálogo e vincule-o
          à concessionária responsável.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Dados do veículo
          </CardTitle>

          <CardDescription>
            Informe as características do veículo, os tipos
            de combustível e a concessionária responsável.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <VehicleForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={createVehicle.isPending}
            submitLabel="Cadastrar veículo"
          />
        </CardContent>
      </Card>
    </main>
  )
}