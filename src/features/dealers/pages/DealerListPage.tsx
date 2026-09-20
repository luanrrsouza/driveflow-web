import { useNavigate } from 'react-router'
import { toast } from 'sonner'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useDealers } from '../hooks/useDealers'
import { useDeleteDealer } from '../hooks/useDeleteDealer'
import { formatCnpj } from '@/lib/formatters/formatCnpj'
import { formatAddress } from '@/lib/formatters/formatAddress'

export function DealerListPage() {
  const navigate = useNavigate()

  const {
    data: dealers,
    isPending,
    isError,
  } = useDealers()

  const deleteDealer = useDeleteDealer()

  function handleCreate() {
    navigate('/dealers/new')
  }

  function handleEdit(id: string) {
    navigate(`/dealers/${id}/edit`)
  }

  function handleDelete(id: string) {
    deleteDealer.mutate(id, {
      onSuccess: () => {
        toast.success(
          'Concessionária excluída com sucesso.',
        )
      },

      onError: () => {
        toast.error(
          'Não foi possível excluir a concessionária.',
        )
      },
    })
  }

  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-6xl p-6">
        <div className="mb-6 space-y-2">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-48" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </CardHeader>

          <CardContent className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
            <Skeleton className="h-12 w-full" />
          </CardContent>
        </Card>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="mx-auto w-full max-w-6xl p-6">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Concessionárias
          </h1>

          <p className="text-sm text-muted-foreground">
            Gerencie as concessionárias vinculadas ao catálogo.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Não foi possível carregar as concessionárias
            </CardTitle>

            <CardDescription>
              Ocorreu uma falha durante a consulta dos dados.
              Verifique a conexão e tente novamente.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-6xl p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Concessionárias
          </h1>

          <p className="text-sm text-muted-foreground">
            Gerencie as concessionárias vinculadas ao catálogo
            de veículos.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleCreate}
          className="w-full sm:w-auto"
        >
          Nova concessionária
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Concessionárias cadastradas
          </CardTitle>

          <CardDescription>
            Consulte e gerencie os pontos responsáveis pelos
            veículos disponíveis no DriveFlow.
          </CardDescription>
        </CardHeader>

        <CardContent>
          {!dealers || dealers.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center gap-5 text-center">
              <div className="max-w-md space-y-1">
                <p className="font-medium text-foreground">
                  Nenhuma concessionária cadastrada
                </p>

                <p className="text-sm text-muted-foreground">
                  Cadastre a primeira concessionária para
                  começar a organizar os veículos do catálogo.
                </p>
              </div>

              <Button
                type="button"
                onClick={handleCreate}
              >
                Cadastrar concessionária
              </Button>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Razão social
                  </TableHead>

                  <TableHead>
                    CNPJ
                  </TableHead>

                  <TableHead>
                    CEP
                  </TableHead>

                  <TableHead>
                    Endereço
                  </TableHead>

                  <TableHead className="text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {dealers.map((dealer) => (
                  <TableRow key={dealer.id}>
                    <TableCell className="font-medium">
                      {dealer.corporateName}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {formatCnpj(dealer.cnpj)}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {dealer.zipCode}
                    </TableCell>

                    <TableCell className="max-w-xs text-muted-foreground">
                      {formatAddress(
                          dealer.address,
                          dealer.number,
                        )}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEdit(dealer.id)
                          }
                        >
                          Editar
                        </Button>

                        <AlertDialog>
                          <AlertDialogTrigger
                            render={
                              <Button
                                type="button"
                                variant="destructive"
                                size="sm"
                              />
                            }
                          >
                            Excluir
                          </AlertDialogTrigger>

                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>
                                Excluir concessionária?
                              </AlertDialogTitle>

                              <AlertDialogDescription>
                                A concessionária{' '}
                                <strong>
                                  {dealer.corporateName}
                                </strong>{' '}
                                será excluída permanentemente.
                                Esta ação não poderá ser desfeita.
                              </AlertDialogDescription>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                              <AlertDialogCancel>
                                Cancelar
                              </AlertDialogCancel>

                              <AlertDialogAction
                                onClick={() =>
                                  handleDelete(dealer.id)
                                }
                              >
                                Excluir concessionária
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </main>
  )
}