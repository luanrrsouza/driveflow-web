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
            'Não foi possível atualizar a concessionária. Verifique os dados e tente novamente.',
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
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Concessionária inválida
          </h1>

          <p className="text-sm text-muted-foreground">
            Não foi possível identificar a concessionária
            solicitada.
          </p>
        </div>

        <Card>
          <CardContent className="pt-6">
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
        <div className="mb-6 space-y-2">
          <Skeleton className="h-8 w-64" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-80 max-w-full" />
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
              <Skeleton className="h-4 w-72 max-w-full" />
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

  if (isDealerError || !dealer) {
    return (
      <main className="mx-auto w-full max-w-2xl p-6">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Concessionária não encontrada
          </h1>

          <p className="text-sm text-muted-foreground">
            Não foi possível encontrar os dados da
            concessionária solicitada.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Não foi possível carregar a concessionária
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
  number: dealer.number,
}

  return (
    <main className="mx-auto w-full max-w-2xl p-6">
      <div className="mb-6 space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight text-foreground">
          Editar concessionária
        </h1>

        <p className="text-sm text-muted-foreground">
          Atualize os dados da concessionária e mantenha
          as informações do catálogo sempre atualizadas.
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Dados da concessionária
          </CardTitle>

          <CardDescription>
            Altere as informações necessárias. Caso o CEP
            seja modificado, o endereço será atualizado
            automaticamente.
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