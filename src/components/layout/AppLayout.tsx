import { Outlet } from 'react-router'

import {
  SidebarInset,
  SidebarProvider,
} from '@/components/ui/sidebar'

import { AppSidebar } from './AppSidebar'

export function AppLayout() {
  return (
    <SidebarProvider>
      <AppSidebar />

      <SidebarInset>
        <main className="min-h-screen flex-1 bg-background">
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  )
}