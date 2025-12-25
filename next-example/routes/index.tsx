'use client'

import {
  Home,
  BookOpen,
  Code2,
  Package,
  Smartphone,
  Globe,
  Database,
  Clock,
  Layers,
  Monitor,
  Smartphone as SmartphoneIcon,
  Wifi,
  Moon,
  Maximize2,
  MapPin,
  Battery,
  Gauge,
} from 'lucide-react'
import type { IRoute } from '@/interface/route.interface'

export const navigationRoutes: IRoute[] = [
  {
    title: 'Home',
    href: '/',
    icon: Home,
    description: 'Welcome to React Hookify - Production Ready React Hooks',
  },
  {
    title: 'Getting Started',
    href: '/getting-started',
    icon: BookOpen,
    description: 'Learn how to install and use React Hookify in your projects',
  },
  {
    title: 'Hooks',
    icon: Code2,
    description: 'Explore all available hooks organized by category',
    children: [
      {
        title: 'Browser',
        href: '/hooks/browser',
        icon: Globe,
        description: 'Browser APIs, device detection, network, and geolocation hooks',
        children: [
          {
            title: 'useDeviceDetect',
            href: '/hooks/browser/device-detect',
            icon: Monitor,
            description: 'Detect device type, OS, and browser information',
          },
          {
            title: 'useOnline',
            href: '/hooks/browser/online',
            icon: Wifi,
            description: 'Monitor online/offline network status',
          },
          {
            title: 'useIdle',
            href: '/hooks/browser/idle',
            icon: Moon,
            description: 'Track user idle state and activity',
          },
          {
            title: 'useMediaQuery',
            href: '/hooks/browser/media-query',
            icon: Maximize2,
            description: 'Reactively match CSS media queries',
          },
          {
            title: 'useNetworkSpeed',
            href: '/hooks/browser/network-speed',
            icon: Gauge,
            description: 'Monitor network connection speed and type',
          },
          {
            title: 'useGeolocation',
            href: '/hooks/browser/geolocation',
            icon: MapPin,
            description: "Access user's geolocation with watch support",
          },
          {
            title: 'useBattery',
            href: '/hooks/browser/battery',
            icon: Battery,
            description: 'Monitor device battery level and charging status',
          },
        ],
      },
    ],
  },
]
