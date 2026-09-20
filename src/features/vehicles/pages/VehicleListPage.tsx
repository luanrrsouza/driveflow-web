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

  const dealerOptions = [
    {
      label: 'Todas as concessionárias',
      value: ALL_DEALERS,
    },
    ...(dealers?.map((dealer) => ({
      label: dealer.corporateName,
      value: dealer.id,
    })) ?? []),
  ]

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
        <div className="mb-6 space-y-2">
          <Skeleton className="h-8 w-40" />
          <Skeleton className="h-4 w-96 max-w-full" />
        </div>

        <Card>
          <CardHeader>
            <Skeleton className="h-6 w-44" />
            <Skeleton className="h-4 w-80 max-w-full" />
          </CardHeader>

          <CardContent className="space-y-3">
            <Skeleton className="h-9 w-full max-w-sm" />

            <div className="space-y-2 pt-3">
              <Skeleton className="h-10 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-12 w-full" />
            </div>
          </CardContent>
        </Card>
      </main>
    )
  }

  if (isError) {
    return (
      <main className="mx-auto w-full max-w-7xl p-6">
        <div className="mb-6 space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Veículos
          </h1>

          <p className="text-sm text-muted-foreground">
            Explore e gerencie os veículos disponíveis
            no catálogo.
          </p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>
              Não foi possível carregar os veículos
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
    <main className="mx-auto w-full max-w-7xl p-6">
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <h1 className="text-2xl font-semibold tracking-tight text-foreground">
            Veículos
          </h1>

          <p className="text-sm text-muted-foreground">
            Explore e gerencie os veículos disponíveis
            no catálogo do DriveFlow.
          </p>
        </div>

        <Button
          type="button"
          onClick={handleCreate}
          className="w-full sm:w-auto"
        >
          Novo veículo
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>
            Catálogo de veículos
          </CardTitle>

          <CardDescription>
            Consulte os veículos cadastrados e filtre
            o catálogo por concessionária.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <div className="mb-6 max-w-sm space-y-2">
            <p className="text-sm font-medium text-foreground">
              Concessionária
            </p>

            <Select
              items={dealerOptions}
              value={dealerId}
              onValueChange={(value) => {
                setDealerId(
                  value ?? ALL_DEALERS,
                )
              }}
              disabled={isLoadingDealers}
            >
              <SelectTrigger className="w-full">
                <SelectValue
                  placeholder={
                    isLoadingDealers
                      ? 'Carregando concessionárias...'
                      : 'Todas as concessionárias'
                  }
                />
              </SelectTrigger>

              <SelectContent>
                {dealerOptions.map((dealer) => (
                  <SelectItem
                    key={dealer.value}
                    value={dealer.value}
                  >
                    {dealer.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {!vehicles || vehicles.length === 0 ? (
            <div className="flex min-h-56 flex-col items-center justify-center gap-5 text-center">
              <div className="max-w-md space-y-1">
                <p className="font-medium text-foreground">
                  Nenhum veículo encontrado
                </p>

                <p className="text-sm text-muted-foreground">
                  {isFiltering
                    ? 'Não existem veículos cadastrados para a concessionária selecionada.'
                    : 'Cadastre o primeiro veículo para começar a construir o catálogo.'}
                </p>
              </div>

              {!isFiltering && (
                <Button
                  type="button"
                  onClick={handleCreate}
                >
                  Cadastrar veículo
                </Button>
              )}
            </div>
          ) : (
            <div className="overflow-x-auto">
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
                      <TableCell className="font-medium text-foreground">
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

                      <TableCell className="text-muted-foreground">
                        {vehicle.color}
                      </TableCell>

                      <TableCell className="text-muted-foreground">
                        {vehicle.year ?? '-'}
                      </TableCell>

                      <TableCell className="whitespace-nowrap font-medium">
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

                      <TableCell className="text-muted-foreground">
                        {vehicle.dealerName}
                      </TableCell>

                      <TableCell>
                        <div className="flex justify-end gap-2">
                          <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              handleEdit(vehicle.id)
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
                                  O veículo{' '}
                                  <strong>
                                    {vehicle.brand}{' '}
                                    {vehicle.model}
                                  </strong>{' '}
                                  será excluído permanentemente.
                                  Esta ação não poderá ser desfeita.
                                </AlertDialogDescription>
                              </AlertDialogHeader>

                              <AlertDialogFooter>
                                <AlertDialogCancel>
                                  Cancelar
                                </AlertDialogCancel>

                                <AlertDialogAction
                                  onClick={() =>
                                    handleDelete(vehicle.id)
                                  }
                                >
                                  Excluir veículo
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
            </div>
          )}
        </CardContent>
      </Card>
    </main>
  )
}