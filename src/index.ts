// Export browser feature
export { 
  useDeviceDetect, 
  useOnline, 
  useIdle, 
  useMediaQuery,
  useNetworkSpeed,
  useGeolocation,
  useBattery
} from './browser'

export type { 
  DeviceDetectResult, 
  UseDeviceDetectOptions, 
  UseOnlineOptions, 
  UseIdleOptions, 
  UseMediaQueryOptions,
  ConnectionType,
  NetworkSpeedInfo,
  UseNetworkSpeedOptions,
  GeolocationCoordinates,
  GeolocationState,
  UseGeolocationOptions,
  BatteryStatus,
  UseBatteryOptions
} from './browser'


