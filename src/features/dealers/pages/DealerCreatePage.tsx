import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { DealerForm } from '../components/DealerForm'
import { useCreateDealer } from '../hooks/useCreateDealer'
import type { DealerFormData } from '../schemas/dealerSchema'

export function DealerCreatePage() {
  const navigate = useNavigate()
  const createDealer = useCreateDealer()

  function handleSubmit(data: DealerFormData) {
    createDealer.mutate(data, {
      onSuccess: () => {
        toast.success(
          'Concessionária cadastrada com sucesso.',
        )

        navigate('/dealers')
      },

      onError: () => {
        toast.error(
          'Não foi possível cadastrar a concessionária. Verifique os dados e tente novamente.',
        )
      },
    })
  }

  function handleCancel() {
    navigate('/dealers')
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Nova concessionária
        </h1>

        <p className="text-sm text-muted-foreground">
          Cadastre uma concessionária para vinculá-la
          aos veículos do catálogo.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Dados da concessionária
          </CardTitle>

          <CardDescription>
            Informe os dados cadastrais. O endereço
            será localizado automaticamente pelo CEP.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <DealerForm
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={createDealer.isPending}
            submitLabel="Cadastrar concessionária"
          />
        </CardContent>
      </Card>
    </main>
  )
}