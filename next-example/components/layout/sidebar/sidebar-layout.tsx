'use client'

import {
  SidebarProvider,
  SidebarInset,
  SidebarContent,
  Sidebar,
  SidebarRail,
} from '@/components/ui/sidebar'
import { navigationRoutes } from '@/routes'
import { NavMain } from './_components/nav-main'
import { NavFooter } from './_components/nav-footer'
import { Separator } from '@/components/ui/separator'
import { NavHeader } from './_components/nav-header'
import { ScrollArea } from '@/components/ui/scroll-area'
import { MainHeader } from './_components/sidebar-header'

interface AppLayoutProps {
  children: React.ReactNode
}

export function SidebarLayout({ children }: AppLayoutProps) {
  return (
    <SidebarProvider>
      <Sidebar collapsible="icon">
        <NavHeader />
        <Separator />
        <SidebarContent>
          <ScrollArea>
            <NavMain items={navigationRoutes} />
          </ScrollArea>
        </SidebarContent>
        <Separator />
        <NavFooter />
        <SidebarRail />
      </Sidebar>
      <SidebarInset>
        <div className="w-full h-screen overflow-hidden grid grid-rows-[64px_1fr]">
          <MainHeader />
          <ScrollArea className="flex flex-1 flex-col gap-4 p-4 overflow-auto">
            {children}
          </ScrollArea>
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
