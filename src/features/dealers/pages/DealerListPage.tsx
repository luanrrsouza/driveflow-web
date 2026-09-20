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
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-48" />
            <Skeleton className="h-4 w-72" />
          </CardHeader>

          <CardContent className="space-y-3">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-10 w-full" />
          </CardContent>
        </Card>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="mx-auto w-full max-w-6xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Não foi possível carregar as concessionárias
            </CardTitle>

            <CardDescription>
              Ocorreu uma falha ao consultar os dados.
              Tente novamente mais tarde.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-6xl p-6">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between gap-4">
          <div>
            <CardTitle>
              Concessionárias
            </CardTitle>

            <CardDescription>
              Gerencie as concessionárias cadastradas
              no DriveFlow.
            </CardDescription>
          </div>

          <Button onClick={handleCreate}>
            Nova concessionária
          </Button>
        </CardHeader>

        <CardContent>
          {!dealers || dealers.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center gap-4 text-center">
              <div>
                <p className="font-medium text-foreground">
                  Nenhuma concessionária cadastrada
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  Cadastre a primeira concessionária
                  para começar.
                </p>
              </div>

              <Button onClick={handleCreate}>
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

                    <TableCell>
                      {dealer.cnpj}
                    </TableCell>

                    <TableCell>
                      {dealer.zipCode}
                    </TableCell>

                    <TableCell>
                      {dealer.address}
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
                                Esta ação excluirá a
                                concessionária{' '}
                                <strong>
                                  {dealer.corporateName}
                                </strong>
                                .
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
                                Excluir
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