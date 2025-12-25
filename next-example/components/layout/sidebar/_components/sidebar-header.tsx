'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb'
import { ModeToggle } from '@/components/shared/theme-toggle'
import { Button } from '@/components/ui/button'
import { Github } from 'lucide-react'

export function MainHeader() {
  const pathname = usePathname()

  // Generate breadcrumb from pathname
  const pathSegments = pathname.split('/').filter(Boolean)
  const isHome = pathname === '/'

  return (
    <header className="flex h-16 shrink-0 items-center justify-between gap-4 border-b px-4">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              {isHome ? (
                <BreadcrumbPage>Home</BreadcrumbPage>
              ) : (
                <BreadcrumbLink asChild>
                  <Link href="/">Home</Link>
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {pathSegments.map((segment, index) => {
              const href = '/' + pathSegments.slice(0, index + 1).join('/')
              const isLast = index === pathSegments.length - 1
              const formattedSegment = segment
                .split('-')
                .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')

              return (
                <div key={`${segment}-${index}`} className="flex items-center gap-3">
                  <BreadcrumbSeparator />
                  <BreadcrumbItem>
                    {isLast ? (
                      <BreadcrumbPage>{formattedSegment}</BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link href={href}>{formattedSegment}</Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>
                </div>
              )
            })}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="link" size="icon" asChild className="h-9 w-9">
          <Link
            href="https://github.com/NightDevilPT/react-hooks-core"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="View on GitHub"
          >
            <Github className="size-4" />
          </Link>
        </Button>
        <ModeToggle />
      </div>
    </header>
  )
}
