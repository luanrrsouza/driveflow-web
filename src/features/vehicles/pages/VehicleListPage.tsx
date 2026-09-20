import { useState } from 'react'
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

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'

import { Skeleton } from '@/components/ui/skeleton'

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

import { useDealers } from '../../dealers/hooks/useDealers'
import { useDeleteVehicle } from '../hooks/useDeleteVehicle'
import { useVehicles } from '../hooks/useVehicles'
import { useVehiclesByDealer } from '../hooks/useVehiclesByDealer'
import type { FuelType } from '../types/fuelType'

const ALL_DEALERS = 'all'

const fuelTypeLabels: Record<FuelType, string> = {
  GASOLINE: 'Gasolina',
  ETHANOL: 'Etanol',
  FLEX: 'Flex',
  DIESEL: 'Diesel',
  ELECTRIC: 'Elétrico',
  HYBRID: 'Híbrido',
}

export function VehicleListPage() {
  const navigate = useNavigate()

  const [dealerId, setDealerId] =
    useState<string>(ALL_DEALERS)

  const {
    data: dealers,
    isPending: isLoadingDealers,
  } = useDealers()

  const allVehiclesQuery = useVehicles()

  const vehiclesByDealerQuery = useVehiclesByDealer(
    dealerId === ALL_DEALERS
      ? ''
      : dealerId,
  )

  const deleteVehicle = useDeleteVehicle()

  const isFiltering =
    dealerId !== ALL_DEALERS

  const vehicles = isFiltering
    ? vehiclesByDealerQuery.data
    : allVehiclesQuery.data

  const isPending = isFiltering
    ? vehiclesByDealerQuery.isPending
    : allVehiclesQuery.isPending

  const isError = isFiltering
    ? vehiclesByDealerQuery.isError
    : allVehiclesQuery.isError

  function handleCreate() {
    navigate('/vehicles/new')
  }

  function handleEdit(id: string) {
    navigate(`/vehicles/${id}/edit`)
  }

  function handleDelete(id: string) {
    deleteVehicle.mutate(id, {
      onSuccess: () => {
        toast.success(
          'Veículo excluído com sucesso.',
        )
      },

      onError: () => {
        toast.error(
          'Não foi possível excluir o veículo.',
        )
      },
    })
  }

  if (isPending) {
    return (
      <main className="mx-auto w-full max-w-7xl p-6">
        <Card>
          <CardHeader>
            <Skeleton className="h-7 w-40" />
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
      <main className="mx-auto w-full max-w-7xl p-6">
        <Card>
          <CardHeader>
            <CardTitle>
              Não foi possível carregar os veículos
            </CardTitle>

            <CardDescription>
              Ocorreu uma falha durante a consulta.
              Tente novamente.
            </CardDescription>
          </CardHeader>
        </Card>
      </main>
    )
  }

  return (
    <main className="mx-auto w-full max-w-7xl p-6">
      <Card>
        <CardHeader>
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div>
              <CardTitle>
                Veículos
              </CardTitle>

              <CardDescription>
                Gerencie os veículos cadastrados
                no DriveFlow.
              </CardDescription>
            </div>

            <Button onClick={handleCreate}>
              Novo veículo
            </Button>
          </div>

          <div className="mt-4 max-w-sm">
            <Select
              value={dealerId}
              onValueChange={(value) => {
                setDealerId(
                  value ?? ALL_DEALERS,
                )
              }}
              disabled={isLoadingDealers}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Filtrar por concessionária" />
              </SelectTrigger>

              <SelectContent>
                <SelectItem value={ALL_DEALERS}>
                  Todas as concessionárias
                </SelectItem>

                {dealers?.map((dealer) => (
                  <SelectItem
                    key={dealer.id}
                    value={dealer.id}
                  >
                    {dealer.corporateName}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>

        <CardContent>
          {!vehicles || vehicles.length === 0 ? (
            <div className="flex min-h-48 flex-col items-center justify-center gap-4 text-center">
              <div>
                <p className="font-medium text-foreground">
                  Nenhum veículo encontrado
                </p>

                <p className="mt-1 text-sm text-muted-foreground">
                  {isFiltering
                    ? 'Não existem veículos cadastrados para a concessionária selecionada.'
                    : 'Cadastre o primeiro veículo para começar.'}
                </p>
              </div>

              {!isFiltering && (
                <Button onClick={handleCreate}>
                  Cadastrar veículo
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>
                    Marca
                  </TableHead>

                  <TableHead>
                    Modelo
                  </TableHead>

                  <TableHead>
                    Combustível
                  </TableHead>

                  <TableHead>
                    Cor
                  </TableHead>

                  <TableHead>
                    Ano
                  </TableHead>

                  <TableHead>
                    Preço
                  </TableHead>

                  <TableHead>
                    Concessionária
                  </TableHead>

                  <TableHead className="text-right">
                    Ações
                  </TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {vehicles.map((vehicle) => (
                  <TableRow key={vehicle.id}>
                    <TableCell className="font-medium">
                      {vehicle.brand}
                    </TableCell>

                    <TableCell>
                      {vehicle.model}
                    </TableCell>

                    <TableCell>
                      <div className="flex flex-wrap gap-1">
                        {vehicle.fuelTypes.map(
                          (fuelType) => (
                            <Badge
                              key={fuelType}
                              variant="secondary"
                            >
                              {
                                fuelTypeLabels[
                                  fuelType
                                ]
                              }
                            </Badge>
                          ),
                        )}
                      </div>
                    </TableCell>

                    <TableCell>
                      {vehicle.color}
                    </TableCell>

                    <TableCell>
                      {vehicle.year ?? '-'}
                    </TableCell>

                    <TableCell>
                      {vehicle.price !== null
                        ? vehicle.price.toLocaleString(
                            'pt-BR',
                            {
                              style: 'currency',
                              currency: 'BRL',
                            },
                          )
                        : '-'}
                    </TableCell>

                    <TableCell>
                      {vehicle.dealerName}
                    </TableCell>

                    <TableCell>
                      <div className="flex justify-end gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() =>
                            handleEdit(
                              vehicle.id,
                            )
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
                                Excluir veículo?
                              </AlertDialogTitle>

                              <AlertDialogDescription>
                                Esta ação excluirá
                                permanentemente o veículo{' '}
                                <strong>
                                  {vehicle.brand}{' '}
                                  {vehicle.model}
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
                                  handleDelete(
                                    vehicle.id,
                                  )
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