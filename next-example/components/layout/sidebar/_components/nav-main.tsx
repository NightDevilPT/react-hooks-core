'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ChevronRight, type LucideIcon } from 'lucide-react'
import type { IRoute } from '@/interface/route.interface'

import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@radix-ui/react-collapsible'
import {
  SidebarGroup,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from '@/components/ui/sidebar'

interface NavMainProps {
  items: IRoute[]
}

export function NavMain({ items }: NavMainProps) {
  const pathname = usePathname()

  return (
    <SidebarGroup className="px-2">
      <SidebarMenu className="space-y-1">
        {items.map((item) => {
          const Icon = item.icon as LucideIcon | undefined
          const isActive = item.href === pathname
          const hasChildren = item.children && item.children.length > 0

          if (!hasChildren) {
            return (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton
                  asChild
                  tooltip={item.description || item.title}
                  isActive={isActive}
                  className="h-auto py-2.5 px-3"
                >
                  <Link href={item.href || '#'} className="flex items-center gap-3 w-full">
                    {Icon && (
                      <Icon className="size-3 min-w-3 max-h-3 shrink-0 text-sidebar-foreground/70" />
                    )}
                    <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0">
                      <span className="text-sm font-medium leading-none">{item.title}</span>
                      {item.description && (
                        <span className="text-xs text-muted-foreground line-clamp-1 leading-tight">
                          {item.description}
                        </span>
                      )}
                    </div>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            )
          }

          return (
            <Collapsible
              key={item.title}
              asChild
              defaultOpen={isActive}
              className="group/collapsible"
            >
              <SidebarMenuItem>
                <CollapsibleTrigger asChild>
                  <SidebarMenuButton
                    tooltip={item.description || item.title}
                    isActive={isActive}
                    className="h-auto py-2.5 px-3 w-full"
                  >
                    <div className="flex items-center gap-3 w-full">
                      {Icon && (
                        <Icon className="size-3 min-w-3 max-h-3 shrink-0 text-sidebar-foreground/70" />
                      )}
                      <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0">
                        <span className="text-sm font-medium leading-none">{item.title}</span>
                        {item.description && (
                          <span className="text-xs text-muted-foreground line-clamp-1 leading-tight">
                            {item.description}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="ml-auto size-3 shrink-0 text-muted-foreground transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                    </div>
                  </SidebarMenuButton>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <div className="ml-3 mt-1.5 space-y-0.5 border-l-2 border-sidebar-border/40 pl-3">
                    {item.children?.map((subItem) => {
                      const SubIcon = subItem.icon as LucideIcon | undefined
                      const isSubActive =
                        subItem.href === pathname || pathname.startsWith(subItem.href || '')
                      const hasSubChildren = subItem.children && subItem.children.length > 0

                      if (hasSubChildren) {
                        return (
                          <Collapsible
                            key={subItem.title}
                            asChild
                            defaultOpen={isSubActive}
                            className="group/sub-collapsible"
                          >
                            <div className="space-y-0.5">
                              <CollapsibleTrigger asChild>
                                <button
                                  className={`w-full flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-150 ${
                                    isSubActive
                                      ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                                      : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                                  }`}
                                >
                                  {SubIcon && (
                                    <SubIcon className="size-3 min-w-3 max-h-3 shrink-0" />
                                  )}
                                  <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0 text-left">
                                    <span className="text-sm leading-tight">{subItem.title}</span>
                                    {subItem.description && (
                                      <span className="text-xs text-muted-foreground line-clamp-1 leading-tight">
                                        {subItem.description}
                                      </span>
                                    )}
                                  </div>
                                  <ChevronRight className="ml-auto size-3 shrink-0 text-muted-foreground/60 transition-transform duration-200 group-data-[state=open]/sub-collapsible:rotate-90" />
                                </button>
                              </CollapsibleTrigger>
                              <CollapsibleContent>
                                <div className="ml-4 mt-1 space-y-0.5 border-l border-sidebar-border/30 pl-2.5">
                                  {subItem.children?.map((subSubItem) => {
                                    const SubSubIcon = subSubItem.icon as LucideIcon | undefined
                                    const isSubSubActive = subSubItem.href === pathname
                                    return (
                                      <Link
                                        key={subSubItem.title}
                                        href={subSubItem.href || '#'}
                                        className={`flex items-center gap-2.5 px-2.5 py-1.5 rounded-md text-sm transition-all duration-150 ${
                                          isSubSubActive
                                            ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                                            : 'text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                                        }`}
                                      >
                                        {SubSubIcon && (
                                          <SubSubIcon className="size-3 min-w-3 max-h-3 shrink-0" />
                                        )}
                                        <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0">
                                          <span className="text-sm leading-tight">
                                            {subSubItem.title}
                                          </span>
                                          {subSubItem.description && (
                                            <span className="text-xs text-muted-foreground line-clamp-1 leading-tight">
                                              {subSubItem.description}
                                            </span>
                                          )}
                                        </div>
                                      </Link>
                                    )
                                  })}
                                </div>
                              </CollapsibleContent>
                            </div>
                          </Collapsible>
                        )
                      }

                      return (
                        <Link
                          key={subItem.title}
                          href={subItem.href || '#'}
                          className={`flex items-center gap-2.5 px-2.5 py-2 rounded-md text-sm transition-all duration-150 ${
                            isSubActive
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground font-medium'
                              : 'text-sidebar-foreground/80 hover:bg-sidebar-accent/50 hover:text-sidebar-accent-foreground'
                          }`}
                        >
                          {SubIcon && <SubIcon className="size-3 min-w-3 max-h-3 shrink-0" />}
                          <div className="flex flex-col items-start gap-0.5 flex-1 min-w-0">
                            <span className="text-sm leading-tight">{subItem.title}</span>
                            {subItem.description && (
                              <span className="text-xs text-muted-foreground line-clamp-1 leading-tight">
                                {subItem.description}
                              </span>
                            )}
                          </div>
                        </Link>
                      )
                    })}
                  </div>
                </CollapsibleContent>
              </SidebarMenuItem>
            </Collapsible>
          )
        })}
      </SidebarMenu>
    </SidebarGroup>
  )
}
