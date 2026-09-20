import React from 'react'
import {
  Building2,
  CarFront,
  House,
} from 'lucide-react'
import {
  NavLink,
  useLocation,
} from 'react-router'

import dSidebar from '@/assets/d-sidebar.png'
import logoSidebar from '@/assets/logo-sidebar.png'
import { SidebarTrigger } from '@/components/ui/sidebar'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar'


const navigationItems = [
  {
    title: 'Início',
    url: '/',
    icon: House,
  },
  {
    title: 'Veículos',
    url: '/vehicles',
    icon: CarFront,
  },
  {
    title: 'Concessionárias',
    url: '/dealers',
    icon: Building2,
  },
]

export function AppSidebar() {
  const location = useLocation()

  function isActive(url: string) {
    if (url === '/') {
      return location.pathname === '/'
    }

    return location.pathname.startsWith(url)
  }

  return (
    <Sidebar
      variant="sidebar"
      collapsible="icon"
    >
      <SidebarHeader className="border-b border-sidebar-border">
  <div className="flex h-16 items-center justify-between gap-2 px-3 group-data-[collapsible=icon]:flex-col group-data-[collapsible=icon]:justify-center group-data-[collapsible=icon]:px-1">
    <div className="min-w-0 flex-1 group-data-[collapsible=icon]:hidden">
      {React.createElement('img', {
        src: logoSidebar,
        alt: 'DriveFlow',
        className: 'h-14 w-auto object-contain',
      })}
    </div>

    <div className="hidden group-data-[collapsible=icon]:block">
      {React.createElement('img', {
        src: dSidebar,
        alt: 'DriveFlow',
        className: 'size-10 object-contain',
      })}
    </div>

    <SidebarTrigger className="shrink-0 text-sidebar-foreground" />
  </div>
</SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>
            Navegação
          </SidebarGroupLabel>

          <SidebarGroupContent>
            <SidebarMenu>
              {navigationItems.map((item) => {
                const Icon = item.icon
                const active = isActive(item.url)

                return (
                  <SidebarMenuItem key={item.url}>
                    <SidebarMenuButton
                      render={
                        <NavLink to={item.url} />
                      }
                      isActive={active}
                      tooltip={item.title}
                    >
                      <Icon aria-hidden="true" />

                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}