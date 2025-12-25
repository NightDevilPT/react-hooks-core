'use client'

import { useDeviceDetect, useOnline, useIdle, useMediaQuery, useNetworkSpeed, useGeolocation, useBattery } from 'react-hookify'
import { useState, useEffect } from 'react'
import {
  Smartphone,
  Monitor,
  Tablet,
  Apple,
  Chrome,
  Zap,
  CheckCircle2,
  XCircle,
  Info,
  PartyPopper,
  RefreshCw,
  Laptop,
  Globe,
  Wifi,
  WifiOff,
  Activity,
  Moon,
  AlertCircle,
  Maximize2,
  Minimize2,
  Signal,
  MapPin,
  Battery,
  BatteryLow,
  BatteryMedium,
  BatteryFull,
  BatteryCharging,
  Gauge,
  Clock,
  Navigation,
} from 'lucide-react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import type { LucideIcon } from 'lucide-react'

export default function Page() {
  const device = useDeviceDetect()
  const isOnline = useOnline({
    onChange: (status) => {
      console.log('Network status changed:', status ? 'Online' : 'Offline')
    }
  })
  const isIdle = useIdle(10000, {
    onIdle: () => console.log('User went idle'),
    onActive: () => console.log('User is active')
  })
  
  // Media Query Hooks
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isTabletRange = useMediaQuery('(min-width: 769px) and (max-width: 1024px)')
  const isLaptopRange = useMediaQuery('(min-width: 1025px) and (max-width: 1439px)')
  const isDesktopRange = useMediaQuery('(min-width: 1440px)')
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  
  // Network Speed Hook
  const networkSpeed = useNetworkSpeed({
    onChange: (info) => {
      console.log('Network speed changed:', info.effectiveType)
    }
  })
  
  // Geolocation Hook - Manual trigger
  const [geolocationEnabled, setGeolocationEnabled] = useState(false)
  const geolocation = useGeolocation({
    enabled: geolocationEnabled,
    watch: false,
    enableHighAccuracy: false,
    timeout: 10000,
    maximumAge: 60000, // Use cached position if less than 1 minute old
    onSuccess: (coords) => {
      console.log('Location obtained:', coords)
    },
    onError: (error) => {
      console.log('Geolocation error:', error.message)
    }
  })
  
  // Battery Hook
  const battery = useBattery({
    onChange: (status) => {
      console.log('Battery status changed:', status.level)
    }
  })
  
  const [idleTime, setIdleTime] = useState(0)
  
  useEffect(() => {
    if (!isIdle) {
      setIdleTime(0)
      return
    }
    
    const interval = setInterval(() => {
      setIdleTime(prev => prev + 1)
    }, 1000)
    
    return () => clearInterval(interval)
  }, [isIdle])

  const StatusBadge = ({
    condition,
    label,
    icon: Icon,
  }: {
    condition: boolean
    label: string
    icon: LucideIcon
  }) => (
    <div className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
      <Label className="flex items-center gap-2 cursor-pointer">
        <Icon className="w-4 h-4 text-muted-foreground" />
        {label}
      </Label>
      <div className="flex items-center gap-2">
        {condition ? (
          <>
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span className="text-sm font-medium text-green-600">Yes</span>
          </>
        ) : (
          <>
            <XCircle className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">No</span>
          </>
        )}
      </div>
    </div>
  )

  return (
    <div className="container mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-primary/10">
            <Zap className="w-8 h-8 text-primary" />
          </div>
          <div>
            <h1 className="text-3xl font-bold">React Hookify</h1>
            <p className="text-muted-foreground">Production-Ready React Hooks Demo</p>
          </div>
        </div>
        <Button variant="outline" size="icon" onClick={() => window.location.reload()}>
          <RefreshCw className="w-4 h-4" />
        </Button>
      </div>

      {/* Success Banner */}
      <Card className="border-green-200 bg-green-50/50 dark:border-green-900 dark:bg-green-950/50">
        <CardContent className="pt-6">
          <div className="flex items-start gap-4">
            <PartyPopper className="w-8 h-8 text-green-600 dark:text-green-400 shrink-0" />
            <div className="space-y-2">
              <h3 className="font-semibold text-green-900 dark:text-green-100">
                Package Working Successfully!
              </h3>
              <p className="text-sm text-green-700 dark:text-green-300">
                The{' '}
                <code className="px-1.5 py-0.5 rounded bg-green-100 dark:bg-green-900 font-mono text-xs">
                  react-hookify
                </code>{' '}
                package is linked and working. Try the demos below!
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Hooks Demo Accordion */}
      <Accordion type="single" defaultValue="mediaquery" className="space-y-4 border rounded-md p-5">
        {/* Device Detection Hook */}
        <AccordionItem value="device">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-950">
                <Monitor className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">useDeviceDetect</h3>
                <p className="text-sm text-muted-foreground">
                  Detect device type, OS, and browser
                </p>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4">
            <div className="grid grid-cols-2 gap-4 pb-4">
              {/* Device Type Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Monitor className="w-4 h-4" />
                    Device Type
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <StatusBadge condition={device.isMobile} label="Mobile" icon={Smartphone} />
                  <StatusBadge condition={device.isDesktop} label="Desktop" icon={Laptop} />
                  <StatusBadge condition={device.isTablet} label="Tablet" icon={Tablet} />
                </CardContent>
              </Card>

              {/* Operating System Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Apple className="w-4 h-4" />
                    Operating System
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <StatusBadge condition={device.isIOS} label="iOS" icon={Apple} />
                  <StatusBadge condition={device.isAndroid} label="Android" icon={Chrome} />
                  <StatusBadge condition={device.isWindows} label="Windows" icon={Monitor} />
                  <StatusBadge condition={device.isMacOS} label="macOS" icon={Apple} />
                  <StatusBadge condition={device.isLinux} label="Linux" icon={Monitor} />
                </CardContent>
              </Card>
            </div>

            {/* Browser Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base">
                  <Info className="w-4 h-4" />
                  Browser Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <StatusBadge condition={device.isBrowser} label="Running in Browser" icon={Globe} />
                <div className="space-y-2">
                  <Label className="text-sm font-medium">User Agent:</Label>
                  <div className="p-3 rounded-lg bg-muted border">
                    <p className="text-xs break-all font-mono text-muted-foreground">
                      {device.userAgent || 'Not available'}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Online Hook */}
        <AccordionItem value="online">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isOnline ? 'bg-green-100 dark:bg-green-950' : 'bg-red-100 dark:bg-red-950'}`}>
                {isOnline ? (
                  <Wifi className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : (
                  <WifiOff className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div className="text-left">
                <h3 className="font-semibold">useOnline</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor network connectivity status
                </p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isOnline 
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                }`}>
                  {isOnline ? 'Online' : 'Offline'}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
                  {isOnline ? (
                    <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 shrink-0" />
                  ) : (
                    <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 shrink-0" />
                  )}
                  <div>
                    <h4 className="font-semibold">
                      {isOnline ? 'Connected to Internet' : 'No Internet Connection'}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isOnline 
                        ? 'All features are available and data will sync automatically.'
                        : 'You are currently offline. Some features may be limited.'}
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <Label className="text-sm font-medium">Try it out:</Label>
                  <p className="text-sm text-muted-foreground">
                    Toggle your network connection or enable airplane mode to see the status change in real-time.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`} />
                    <span className="text-xs text-muted-foreground">
                      Status updates automatically
                    </span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Idle Hook */}
        <AccordionItem value="idle">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${isIdle ? 'bg-orange-100 dark:bg-orange-950' : 'bg-blue-100 dark:bg-blue-950'}`}>
                {isIdle ? (
                  <Moon className="w-5 h-5 text-orange-600 dark:text-orange-400" />
                ) : (
                  <Activity className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                )}
              </div>
              <div className="text-left">
                <h3 className="font-semibold">useIdle</h3>
                <p className="text-sm text-muted-foreground">
                  Detect user inactivity (10s timeout)
                </p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isIdle 
                    ? 'bg-orange-100 text-orange-700 dark:bg-orange-950 dark:text-orange-300'
                    : 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                }`}>
                  {isIdle ? 'Idle' : 'Active'}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
                  {isIdle ? (
                    <Moon className="w-8 h-8 text-orange-600 dark:text-orange-400 shrink-0" />
                  ) : (
                    <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0" />
                  )}
                  <div className="flex-1">
                    <h4 className="font-semibold">
                      {isIdle ? 'User is Idle' : 'User is Active'}
                    </h4>
                    <p className="text-sm text-muted-foreground mt-1">
                      {isIdle 
                        ? `No activity detected for ${idleTime} seconds. Operations paused.`
                        : 'Monitoring mouse, keyboard, touch, and scroll events.'}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 rounded-lg border bg-card">
                    <Label className="text-sm font-medium">Idle Timeout</Label>
                    <p className="text-2xl font-bold mt-2">10 seconds</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Configurable duration
                    </p>
                  </div>
                  <div className="p-4 rounded-lg border bg-card">
                    <Label className="text-sm font-medium">Time Idle</Label>
                    <p className="text-2xl font-bold mt-2">
                      {isIdle ? `${idleTime}s` : '0s'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      Since last activity
                    </p>
                  </div>
                </div>

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <Label className="text-sm font-medium">Try it out:</Label>
                  <p className="text-sm text-muted-foreground">
                    Stop moving your mouse or interacting with the page for 10 seconds to see the idle state.
                  </p>
                  <div className="flex items-center gap-2 mt-3">
                    <div className={`w-2 h-2 rounded-full ${isIdle ? 'bg-orange-500' : 'bg-blue-500 animate-pulse'}`} />
                    <span className="text-xs text-muted-foreground">
                      Tracking: mousemove, keydown, scroll, touch
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-lg border-l-4 border-blue-500 bg-blue-50/50 dark:bg-blue-950/20">
                  <p className="text-sm text-blue-900 dark:text-blue-100">
                    <strong>Use Case:</strong> Perfect for auto-logout, pausing expensive operations, 
                    or showing "Are you still there?" prompts in SaaS applications.
                  </p>
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Media Query Hook */}
        <AccordionItem value="mediaquery">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                isMobile 
                  ? 'bg-purple-100 dark:bg-purple-950' 
                  : isTabletRange 
                  ? 'bg-indigo-100 dark:bg-indigo-950'
                  : isLaptopRange
                  ? 'bg-blue-100 dark:bg-blue-950'
                  : 'bg-cyan-100 dark:bg-cyan-950'
              }`}>
                {isMobile ? (
                  <Smartphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                ) : isTabletRange ? (
                  <Tablet className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
                ) : isLaptopRange ? (
                  <Laptop className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                ) : (
                  <Monitor className="w-5 h-5 text-cyan-600 dark:text-cyan-400" />
                )}
              </div>
              <div className="text-left">
                <h3 className="font-semibold">useMediaQuery</h3>
                <p className="text-sm text-muted-foreground">
                  CSS media query listener for responsive design
                </p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  isMobile 
                    ? 'bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300'
                    : isTabletRange
                    ? 'bg-indigo-100 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300'
                    : isLaptopRange
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    : 'bg-cyan-100 text-cyan-700 dark:bg-cyan-950 dark:text-cyan-300'
                }`}>
                  {isMobile ? 'Mobile' : isTabletRange ? 'Tablet' : isLaptopRange ? 'Laptop' : 'Desktop'}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-4">
            <div className="space-y-4">
              {/* Viewport Size Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Monitor className="w-4 h-4" />
                    Viewport Size Detection
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className={`p-4 rounded-lg border-2 text-center transition-all ${
                      isMobile 
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30' 
                        : 'border-muted bg-muted/20'
                    }`}>
                      <Smartphone className={`w-6 h-6 mx-auto mb-2 ${isMobile ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`} />
                      <p className="text-sm font-medium">Mobile</p>
                      <p className="text-xs text-muted-foreground mt-1">≤768px</p>
                      {isMobile && (
                        <CheckCircle2 className="w-4 h-4 mx-auto mt-2 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    
                    <div className={`p-4 rounded-lg border-2 text-center transition-all ${
                      isTabletRange 
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30' 
                        : 'border-muted bg-muted/20'
                    }`}>
                      <Tablet className={`w-6 h-6 mx-auto mb-2 ${isTabletRange ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`} />
                      <p className="text-sm font-medium">Tablet</p>
                      <p className="text-xs text-muted-foreground mt-1">769-1024px</p>
                      {isTabletRange && (
                        <CheckCircle2 className="w-4 h-4 mx-auto mt-2 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    
                    <div className={`p-4 rounded-lg border-2 text-center transition-all ${
                      isLaptopRange 
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30' 
                        : 'border-muted bg-muted/20'
                    }`}>
                      <Laptop className={`w-6 h-6 mx-auto mb-2 ${isLaptopRange ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`} />
                      <p className="text-sm font-medium">Laptop</p>
                      <p className="text-xs text-muted-foreground mt-1">1025-1439px</p>
                      {isLaptopRange && (
                        <CheckCircle2 className="w-4 h-4 mx-auto mt-2 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                    
                    <div className={`p-4 rounded-lg border-2 text-center transition-all ${
                      isDesktopRange 
                        ? 'border-purple-500 bg-purple-50 dark:bg-purple-950/30' 
                        : 'border-muted bg-muted/20'
                    }`}>
                      <Monitor className={`w-6 h-6 mx-auto mb-2 ${isDesktopRange ? 'text-purple-600 dark:text-purple-400' : 'text-muted-foreground'}`} />
                      <p className="text-sm font-medium">Desktop</p>
                      <p className="text-xs text-muted-foreground mt-1">≥1440px</p>
                      {isDesktopRange && (
                        <CheckCircle2 className="w-4 h-4 mx-auto mt-2 text-purple-600 dark:text-purple-400" />
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* System Preferences Card */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Info className="w-4 h-4" />
                    System Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <Label className="flex items-center gap-2">
                      <Moon className="w-4 h-4 text-muted-foreground" />
                      Prefers Dark Mode
                    </Label>
                    <div className="flex items-center gap-2">
                      {prefersDark ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">Yes</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">No</span>
                        </>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-lg border bg-card hover:bg-accent/50 transition-colors">
                    <Label className="flex items-center gap-2">
                      <Activity className="w-4 h-4 text-muted-foreground" />
                      Prefers Reduced Motion
                    </Label>
                    <div className="flex items-center gap-2">
                      {prefersReducedMotion ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-green-600" />
                          <span className="text-sm font-medium text-green-600">Yes</span>
                        </>
                      ) : (
                        <>
                          <XCircle className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm text-muted-foreground">No</span>
                        </>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Try it out Card */}
              <Card>
                <CardContent className="pt-6 space-y-3">
                  <Label className="text-sm font-medium">Try it out:</Label>
                  <ul className="text-sm text-muted-foreground space-y-2 ml-4 list-disc">
                    <li>Resize your browser window to see viewport breakpoint changes</li>
                    <li>Change your OS theme settings to see dark mode detection</li>
                    <li>Enable "Reduce Motion" in accessibility settings to test motion preferences</li>
                  </ul>
                  <div className="flex items-center gap-2 mt-3 p-3 bg-muted/50 rounded-lg">
                    <div className="w-2 h-2 rounded-full bg-purple-500 animate-pulse" />
                    <span className="text-xs text-muted-foreground">
                      Real-time monitoring with native matchMedia API
                    </span>
                  </div>
                </CardContent>
              </Card>

              {/* Use Case Info */}
              <div className="p-4 rounded-lg border-l-4 border-purple-500 bg-purple-50/50 dark:bg-purple-950/20">
                <p className="text-sm text-purple-900 dark:text-purple-100">
                  <strong>Use Case:</strong> Perfect for responsive design, conditional rendering based on screen size, 
                  dark mode detection, and respecting user accessibility preferences.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Network Speed Hook */}
        <AccordionItem value="networkspeed">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                networkSpeed.effectiveType === '4g' 
                  ? 'bg-green-100 dark:bg-green-950'
                  : networkSpeed.effectiveType === '3g'
                  ? 'bg-yellow-100 dark:bg-yellow-950'
                  : networkSpeed.effectiveType === '2g' || networkSpeed.effectiveType === 'slow-2g'
                  ? 'bg-red-100 dark:bg-red-950'
                  : 'bg-gray-100 dark:bg-gray-950'
              }`}>
                <Signal className={`w-5 h-5 ${
                  networkSpeed.effectiveType === '4g' 
                    ? 'text-green-600 dark:text-green-400'
                    : networkSpeed.effectiveType === '3g'
                    ? 'text-yellow-600 dark:text-yellow-400'
                    : networkSpeed.effectiveType === '2g' || networkSpeed.effectiveType === 'slow-2g'
                    ? 'text-red-600 dark:text-red-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">useNetworkSpeed</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor network connection speed and type
                </p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  networkSpeed.effectiveType === '4g'
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                    : networkSpeed.effectiveType === '3g'
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                    : networkSpeed.effectiveType === '2g' || networkSpeed.effectiveType === 'slow-2g'
                    ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300'
                }`}>
                  {networkSpeed.effectiveType.toUpperCase()}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-4">
            <div className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2 text-base">
                    <Signal className="w-4 h-4" />
                    Network Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-lg border bg-card">
                      <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Gauge className="w-4 h-4" />
                        Connection Type
                      </Label>
                      <p className="text-2xl font-bold mt-2">
                        {networkSpeed.effectiveType === 'unknown' ? 'N/A' : networkSpeed.effectiveType.toUpperCase()}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {networkSpeed.effectiveType !== 'unknown' ? 'Real-time' : 'Not supported'}
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border bg-card">
                      <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Zap className="w-4 h-4" />
                        Downlink Speed
                      </Label>
                      <p className="text-2xl font-bold mt-2">
                        {networkSpeed.downlink > 0 ? `${networkSpeed.downlink.toFixed(1)} Mbps` : 'N/A'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Maximum download speed
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border bg-card">
                      <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4" />
                        Round-Trip Time
                      </Label>
                      <p className="text-2xl font-bold mt-2">
                        {networkSpeed.rtt > 0 ? `${networkSpeed.rtt}ms` : 'N/A'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Network latency
                      </p>
                    </div>
                    
                    <div className="p-4 rounded-lg border bg-card">
                      <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                        <Info className="w-4 h-4" />
                        Data Saver
                      </Label>
                      <p className="text-2xl font-bold mt-2">
                        {networkSpeed.saveData ? 'On' : 'Off'}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        Browser data saver mode
                      </p>
                    </div>
                  </div>
                  
                  {networkSpeed.effectiveType === 'unknown' && (
                    <div className="p-4 rounded-lg border-l-4 border-yellow-500 bg-yellow-50/50 dark:bg-yellow-950/20">
                      <p className="text-sm text-yellow-900 dark:text-yellow-100">
                        <strong>Note:</strong> Network Information API is not supported in this browser. 
                        Supported in Chrome, Edge, and Opera.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Geolocation Hook */}
        <AccordionItem value="geolocation">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                geolocation.loading
                  ? 'bg-blue-100 dark:bg-blue-950'
                  : geolocation.error
                  ? 'bg-red-100 dark:bg-red-950'
                  : geolocation.coordinates
                  ? 'bg-green-100 dark:bg-green-950'
                  : 'bg-gray-100 dark:bg-gray-950'
              }`}>
                <MapPin className={`w-5 h-5 ${
                  geolocation.loading
                    ? 'text-blue-600 dark:text-blue-400'
                    : geolocation.error
                    ? 'text-red-600 dark:text-red-400'
                    : geolocation.coordinates
                    ? 'text-green-600 dark:text-green-400'
                    : 'text-gray-600 dark:text-gray-400'
                }`} />
              </div>
              <div className="text-left">
                <h3 className="font-semibold">useGeolocation</h3>
                <p className="text-sm text-muted-foreground">
                  Access user location with permission handling
                </p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  geolocation.loading
                    ? 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300'
                    : geolocation.error
                    ? 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                    : geolocation.coordinates
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                    : 'bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300'
                }`}>
                  {geolocation.loading ? 'Loading...' : geolocation.error ? 'Error' : geolocation.coordinates ? 'Located' : 'Not Available'}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                {!geolocationEnabled && !geolocation.loading && !geolocation.coordinates && !geolocation.error && (
                  <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
                    <MapPin className="w-8 h-8 text-gray-600 dark:text-gray-400 shrink-0" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Location Not Requested</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Click the button below to request your location. Location is only requested when you explicitly enable it.
                      </p>
                    </div>
                    <Button 
                      onClick={() => setGeolocationEnabled(true)}
                      className="shrink-0"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Get Location
                    </Button>
                  </div>
                )}

                {geolocation.loading && (
                  <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
                    <Activity className="w-8 h-8 text-blue-600 dark:text-blue-400 shrink-0 animate-spin" />
                    <div className="flex-1">
                      <h4 className="font-semibold">Requesting Location...</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        Please allow location access when prompted by your browser
                      </p>
                    </div>
                  </div>
                )}

                {geolocation.error && (
                  <div className="space-y-3">
                    <div className="flex items-center gap-4 p-4 rounded-lg border bg-red-50/50 dark:bg-red-950/20">
                      <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400 shrink-0" />
                      <div className="flex-1">
                        <h4 className="font-semibold text-red-900 dark:text-red-100">
                          Location Error
                        </h4>
                        <p className="text-sm text-red-700 dark:text-red-300 mt-1">
                          {geolocation.error.message}
                        </p>
                      </div>
                    </div>
                    <Button 
                      onClick={() => {
                        setGeolocationEnabled(false)
                        setTimeout(() => setGeolocationEnabled(true), 100)
                      }}
                      variant="outline"
                      className="w-full"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                  </div>
                )}

                {geolocation.coordinates && (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg border bg-green-50/50 dark:bg-green-950/20">
                      <CheckCircle2 className="w-8 h-8 text-green-600 dark:text-green-400 shrink-0" />
                      <div>
                        <h4 className="font-semibold text-green-900 dark:text-green-100">
                          Location Retrieved
                        </h4>
                        <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                          Coordinates obtained successfully
                        </p>
                      </div>
                    </div>

                    {/* Primary Coordinates */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Navigation className="w-4 h-4" />
                          Coordinates
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg border bg-card">
                            <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                              <Navigation className="w-4 h-4" />
                              Latitude
                            </Label>
                            <p className="text-xl font-bold mt-2">
                              {geolocation.coordinates.latitude.toFixed(6)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Decimal degrees (WGS84)
                            </p>
                          </div>
                          
                          <div className="p-4 rounded-lg border bg-card">
                            <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                              <Navigation className="w-4 h-4" />
                              Longitude
                            </Label>
                            <p className="text-xl font-bold mt-2">
                              {geolocation.coordinates.longitude.toFixed(6)}
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Decimal degrees (WGS84)
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>

                    {/* Accuracy Information */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Gauge className="w-4 h-4" />
                          Accuracy Information
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-lg border bg-card">
                            <Label className="text-sm font-medium mb-2">Horizontal Accuracy</Label>
                            <p className="text-2xl font-bold mt-2">
                              {geolocation.coordinates.accuracy.toFixed(0)}m
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              ±{geolocation.coordinates.accuracy.toFixed(0)} meters radius
                            </p>
                            <p className="text-xs text-muted-foreground mt-1">
                              95% confidence level
                            </p>
                          </div>
                          
                          {geolocation.coordinates.altitudeAccuracy !== null && (
                            <div className="p-4 rounded-lg border bg-card">
                              <Label className="text-sm font-medium mb-2">Altitude Accuracy</Label>
                              <p className="text-2xl font-bold mt-2">
                                {geolocation.coordinates.altitudeAccuracy.toFixed(0)}m
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                ±{geolocation.coordinates.altitudeAccuracy.toFixed(0)} meters
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* Elevation & Movement */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Activity className="w-4 h-4" />
                          Elevation & Movement
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-2 gap-4">
                          {geolocation.coordinates.altitude !== null ? (
                            <div className="p-4 rounded-lg border bg-card">
                              <Label className="text-sm font-medium mb-2">Altitude</Label>
                              <p className="text-2xl font-bold mt-2">
                                {geolocation.coordinates.altitude.toFixed(1)}m
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Above sea level
                              </p>
                            </div>
                          ) : (
                            <div className="p-4 rounded-lg border bg-muted/50">
                              <Label className="text-sm font-medium mb-2 text-muted-foreground">Altitude</Label>
                              <p className="text-sm text-muted-foreground mt-2">
                                Not available
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Requires GPS
                              </p>
                            </div>
                          )}
                          
                          {geolocation.coordinates.heading !== null ? (
                            <div className="p-4 rounded-lg border bg-card">
                              <Label className="text-sm font-medium mb-2">Heading</Label>
                              <p className="text-2xl font-bold mt-2">
                                {geolocation.coordinates.heading.toFixed(0)}°
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {geolocation.coordinates.heading >= 0 && geolocation.coordinates.heading < 45 && 'North'}
                                {geolocation.coordinates.heading >= 45 && geolocation.coordinates.heading < 135 && 'East'}
                                {geolocation.coordinates.heading >= 135 && geolocation.coordinates.heading < 225 && 'South'}
                                {geolocation.coordinates.heading >= 225 && geolocation.coordinates.heading < 315 && 'West'}
                                {geolocation.coordinates.heading >= 315 && geolocation.coordinates.heading < 360 && 'North'}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Direction of travel
                              </p>
                            </div>
                          ) : (
                            <div className="p-4 rounded-lg border bg-muted/50">
                              <Label className="text-sm font-medium mb-2 text-muted-foreground">Heading</Label>
                              <p className="text-sm text-muted-foreground mt-2">
                                Not available
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Device must be moving
                              </p>
                            </div>
                          )}
                          
                          {geolocation.coordinates.speed !== null ? (
                            <div className="p-4 rounded-lg border bg-card">
                              <Label className="text-sm font-medium mb-2">Speed</Label>
                              <p className="text-2xl font-bold mt-2">
                                {geolocation.coordinates.speed.toFixed(1)} m/s
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {(geolocation.coordinates.speed * 3.6).toFixed(1)} km/h
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {(geolocation.coordinates.speed * 2.237).toFixed(1)} mph
                              </p>
                            </div>
                          ) : (
                            <div className="p-4 rounded-lg border bg-muted/50">
                              <Label className="text-sm font-medium mb-2 text-muted-foreground">Speed</Label>
                              <p className="text-sm text-muted-foreground mt-2">
                                Not available
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Device must be moving
                              </p>
                            </div>
                          )}
                        </div>
                      </CardContent>
                    </Card>

                    {/* All Data Summary */}
                    <Card>
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-base">
                          <Info className="w-4 h-4" />
                          Complete Data Object
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="p-4 rounded-lg bg-muted border">
                          <pre className="text-xs font-mono text-muted-foreground overflow-x-auto">
                            {JSON.stringify(geolocation.coordinates, null, 2)}
                          </pre>
                        </div>
                        <p className="text-xs text-muted-foreground mt-2">
                          All available geolocation data in JSON format
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                )}

                <div className="p-4 rounded-lg border bg-card space-y-2">
                  <Label className="text-sm font-medium">Try it out:</Label>
                  <p className="text-sm text-muted-foreground">
                    Click "Get Location" to request your current location. The browser will prompt for permission. 
                    Location is only requested when you explicitly enable it to avoid automatic requests.
                  </p>
                  {geolocation.coordinates && (
                    <Button 
                      onClick={() => {
                        setGeolocationEnabled(false)
                        setTimeout(() => setGeolocationEnabled(true), 100)
                      }}
                      variant="outline"
                      size="sm"
                      className="mt-2"
                    >
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Location
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>

        {/* Battery Hook */}
        <AccordionItem value="battery">
          <AccordionTrigger className="hover:no-underline">
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg ${
                !battery.supported
                  ? 'bg-gray-100 dark:bg-gray-950'
                  : battery.level > 0.5
                  ? 'bg-green-100 dark:bg-green-950'
                  : battery.level > 0.2
                  ? 'bg-yellow-100 dark:bg-yellow-950'
                  : 'bg-red-100 dark:bg-red-950'
              }`}>
                {!battery.supported ? (
                  <Battery className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                ) : battery.charging ? (
                  <BatteryCharging className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : battery.level > 0.5 ? (
                  <BatteryFull className="w-5 h-5 text-green-600 dark:text-green-400" />
                ) : battery.level > 0.2 ? (
                  <BatteryMedium className="w-5 h-5 text-yellow-600 dark:text-yellow-400" />
                ) : (
                  <BatteryLow className="w-5 h-5 text-red-600 dark:text-red-400" />
                )}
              </div>
              <div className="text-left">
                <h3 className="font-semibold">useBattery</h3>
                <p className="text-sm text-muted-foreground">
                  Monitor device battery status
                </p>
              </div>
              <div className="ml-auto">
                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                  !battery.supported
                    ? 'bg-gray-100 text-gray-700 dark:bg-gray-950 dark:text-gray-300'
                    : battery.level > 0.5
                    ? 'bg-green-100 text-green-700 dark:bg-green-950 dark:text-green-300'
                    : battery.level > 0.2
                    ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-950 dark:text-yellow-300'
                    : 'bg-red-100 text-red-700 dark:bg-red-950 dark:text-red-300'
                }`}>
                  {!battery.supported ? 'N/A' : `${Math.round(battery.level * 100)}%`}
                </span>
              </div>
            </div>
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-4">
            <Card>
              <CardContent className="pt-6 space-y-4">
                {!battery.supported ? (
                  <div className="flex items-center gap-4 p-4 rounded-lg border bg-yellow-50/50 dark:bg-yellow-950/20">
                    <AlertCircle className="w-8 h-8 text-yellow-600 dark:text-yellow-400 shrink-0" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 dark:text-yellow-100">
                        Battery API Not Supported
                      </h4>
                      <p className="text-sm text-yellow-700 dark:text-yellow-300 mt-1">
                        The Battery Status API is only available in Chrome, Edge, and Opera browsers.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 p-4 rounded-lg border bg-muted/50">
                      {battery.charging ? (
                        <BatteryCharging className="w-8 h-8 text-green-600 dark:text-green-400 shrink-0" />
                      ) : battery.level > 0.5 ? (
                        <BatteryFull className="w-8 h-8 text-green-600 dark:text-green-400 shrink-0" />
                      ) : battery.level > 0.2 ? (
                        <BatteryMedium className="w-8 h-8 text-yellow-600 dark:text-yellow-400 shrink-0" />
                      ) : (
                        <BatteryLow className="w-8 h-8 text-red-600 dark:text-red-400 shrink-0" />
                      )}
                      <div className="flex-1">
                        <h4 className="font-semibold">
                          Battery Level: {Math.round(battery.level * 100)}%
                        </h4>
                        <p className="text-sm text-muted-foreground mt-1">
                          {battery.charging 
                            ? 'Device is charging' 
                            : 'Running on battery power'}
                        </p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div className="p-4 rounded-lg border bg-card">
                        <Label className="text-sm font-medium mb-2">Battery Level</Label>
                        <div className="mt-3">
                          <div className="w-full bg-muted rounded-full h-3">
                            <div 
                              className={`h-3 rounded-full transition-all ${
                                battery.level > 0.5 
                                  ? 'bg-green-500' 
                                  : battery.level > 0.2 
                                  ? 'bg-yellow-500' 
                                  : 'bg-red-500'
                              }`}
                              style={{ width: `${battery.level * 100}%` }}
                            />
                          </div>
                          <p className="text-2xl font-bold mt-2">
                            {Math.round(battery.level * 100)}%
                          </p>
                        </div>
                      </div>
                      
                      <div className="p-4 rounded-lg border bg-card">
                        <Label className="text-sm font-medium mb-2">Charging Status</Label>
                        <p className="text-2xl font-bold mt-2">
                          {battery.charging ? 'Yes' : 'No'}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {battery.charging ? 'Plugged in' : 'On battery'}
                        </p>
                      </div>
                      
                      {battery.charging && battery.chargingTime !== Infinity && (
                        <div className="p-4 rounded-lg border bg-card">
                          <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4" />
                            Time to Full
                          </Label>
                          <p className="text-2xl font-bold mt-2">
                            {Math.floor(battery.chargingTime / 3600)}h {Math.floor((battery.chargingTime % 3600) / 60)}m
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Until fully charged
                          </p>
                        </div>
                      )}
                      
                      {!battery.charging && battery.dischargingTime !== Infinity && (
                        <div className="p-4 rounded-lg border bg-card">
                          <Label className="text-sm font-medium flex items-center gap-2 mb-2">
                            <Clock className="w-4 h-4" />
                            Battery Life
                          </Label>
                          <p className="text-2xl font-bold mt-2">
                            {Math.floor(battery.dischargingTime / 3600)}h {Math.floor((battery.dischargingTime % 3600) / 60)}m
                          </p>
                          <p className="text-xs text-muted-foreground mt-1">
                            Estimated remaining
                          </p>
                        </div>
                      )}
                    </div>

                    <div className="p-4 rounded-lg border bg-card space-y-2">
                      <Label className="text-sm font-medium">Try it out:</Label>
                      <p className="text-sm text-muted-foreground">
                        Battery status updates in real-time. Try plugging/unplugging your device or changing battery level to see updates.
                      </p>
                      <div className="flex items-center gap-2 mt-3">
                        <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                        <span className="text-xs text-muted-foreground">
                          Real-time monitoring active
                        </span>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  )
}
