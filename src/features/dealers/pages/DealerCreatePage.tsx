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
      <Card>
        <CardHeader>
          <CardTitle>
            Cadastrar concessionária
          </CardTitle>

          <CardDescription>
            Informe os dados da nova concessionária.
            O endereço será obtido automaticamente
            através do CEP informado.
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