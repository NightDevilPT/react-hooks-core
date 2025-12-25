import { ReactElement } from 'react'
import { LucideIcon } from 'lucide-react'

export interface IRoute {
  href?: string
  title: string
  description?: string
  icon?: ReactElement | LucideIcon
  children?: IRoute[]
}
