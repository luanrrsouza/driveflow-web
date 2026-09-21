import { Menu } from 'lucide-react'
import { Outlet } from 'react-router'

import { Button } from '@/components/ui/button'
import {
  SidebarInset,
  SidebarProvider,
  useSidebar,
} from '@/components/ui/sidebar'

import { AppSidebar } from './AppSidebar'

function MobileHeader() {
  const { toggleSidebar } = useSidebar()

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center border-b bg-background px-4 md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={toggleSidebar}
        aria-label="Abrir menu de navegação"
      >
        <Menu className="size-5" />
      </Button>
    </header>
  )
}

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <MobileHeader />

        <main className="min-h-screen flex-1 bg-background">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}