import {
  ArrowRight,
  Building2,
  CarFront,
} from 'lucide-react'
import { useNavigate } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

export function HomePage() {
  const navigate = useNavigate()

  function handleVehicles() {
    navigate('/vehicles')
  }

  function handleDealers() {
    navigate('/dealers')
  }

  return (
    <main className="mx-auto w-full max-w-7xl p-6 lg:p-8">
      <section className="mb-10">
        <div className="max-w-3xl space-y-4">
            <div className="space-y-3">
            <h1 className="text-3xl font-semibold tracking-tight text-foreground sm:text-4xl">
              Gerencie seu catálogo de veículos
              em um só lugar.
            </h1>

            <p className="max-w-2xl text-base leading-7 text-muted-foreground">
              Organize veículos e concessionárias em uma
              experiência centralizada, simples e eficiente.
            </p>
          </div>

          <div className="flex flex-col gap-3 pt-2 sm:flex-row">
            <Button
              type="button"
              onClick={handleVehicles}
            >
              Explorar veículos

              <ArrowRight
                className="size-4"
                aria-hidden="true"
              />
            </Button>

            <Button
              type="button"
              variant="outline"
              onClick={handleDealers}
            >
              Ver concessionárias
            </Button>
          </div>
        </div>
      </section>

      <section className="grid gap-6 md:grid-cols-2">
        <Card className="group transition-colors hover:border-primary/30">
          <CardHeader>
            <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <CarFront
                className="size-5"
                aria-hidden="true"
              />
            </div>

            <CardTitle>
              Veículos
            </CardTitle>

            <CardDescription>
              Explore os veículos disponíveis no catálogo,
              consulte suas características e filtre por
              concessionária.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              type="button"
              variant="ghost"
              className="-ml-3"
              onClick={handleVehicles}
            >
              Ver catálogo

              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          </CardContent>
        </Card>

        <Card className="group transition-colors hover:border-primary/30">
          <CardHeader>
            <div className="mb-3 flex size-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
              <Building2
                className="size-5"
                aria-hidden="true"
              />
            </div>

            <CardTitle>
              Concessionárias
            </CardTitle>

            <CardDescription>
              Consulte e gerencie as concessionárias
              responsáveis pelos veículos disponíveis
              no catálogo.
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Button
              type="button"
              variant="ghost"
              className="-ml-3"
              onClick={handleDealers}
            >
              Ver concessionárias

              <ArrowRight
                className="size-4 transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </Button>
          </CardContent>
        </Card>
      </section>
    </main>
  )
}