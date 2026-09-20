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
      <Card>
        <CardHeader>
          <CardTitle>
            Cadastrar veículo
          </CardTitle>

          <CardDescription>
            Informe os dados do veículo e selecione
            a concessionária responsável.
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
