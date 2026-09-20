import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router'
import { toast } from 'sonner'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Skeleton } from '@/components/ui/skeleton'
import { Button } from '@/components/ui/button'

import { DealerForm } from '../components/DealerForm'
import { useDealer } from '../hooks/useDealer'
import { useUpdateDealer } from '../hooks/useUpdateDealer'
import type { DealerFormData } from '../schemas/dealerSchema'

export function DealerEditPage() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()

  const dealerId = id ?? ''

  const {
    data: dealer,
    isPending: isLoadingDealer,
    isError: isDealerError,
  } = useDealer(dealerId)

  const updateDealer = useUpdateDealer()

  useEffect(() => {
    if (isDealerError) {
      toast.error(
        'Não foi possível carregar os dados da concessionária.',
        {
          id: 'dealer-load-error',
        },
      )
    }
  }, [isDealerError])

  function handleSubmit(data: DealerFormData) {
    if (!dealerId) {
      toast.error(
        'Identificador da concessionária inválido.',
      )

      return
    }

    updateDealer.mutate(
      {
        id: dealerId,
        data,
      },
      {
        onSuccess: () => {
          toast.success(
            'Concessionária atualizada com sucesso.',
          )

          navigate('/dealers')
        },

        onError: () => {
          toast.error(
            'Não foi possível atualizar a concessionária. Tente novamente.',
          )
        },
      },
    )
  }

  function handleCancel() {
    navigate('/dealers')
  }

  if (!dealerId) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Concessionária inválida
            </CardTitle>

            <CardDescription>
              Não foi possível identificar a concessionária
              informada.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Voltar para concessionárias
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (isLoadingDealer) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-52" />
            <Skeleton className="h-4 w-80" />
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Skeleton className="h-4 w-24" />
              <Skeleton className="h-9 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-14" />
              <Skeleton className="h-9 w-full" />
            </div>

            <div className="space-y-2">
              <Skeleton className="h-4 w-10" />
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

  if (isDealerError || !dealer) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Concessionária não encontrada
            </CardTitle>

            <CardDescription>
              Não foi possível carregar os dados solicitados.
              Verifique se a concessionária ainda existe.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
            >
              Voltar para concessionárias
            </Button>
          </CardContent>
        </Card>
      </main>
    )
  }

  const initialValues: DealerFormData = {
    corporateName: dealer.corporateName,
    cnpj: dealer.cnpj,
    zipCode: dealer.zipCode.replace(/\D/g, ''),
  }

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <Card>
        <CardHeader>
          <CardTitle>
            Editar concessionária
          </CardTitle>

          <CardDescription>
            Atualize as informações da concessionária.
            O endereço será atualizado automaticamente
            através do CEP informado.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <DealerForm
            initialValues={initialValues}
            onSubmit={handleSubmit}
            onCancel={handleCancel}
            isSubmitting={updateDealer.isPending}
            submitLabel="Salvar alterações"
          />
        </CardContent>
      </Card>
    </main>
  )
}