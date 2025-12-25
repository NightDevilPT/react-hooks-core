/**
 * Battery status information
 */
export interface BatteryStatus {
  /**
   * Battery level from 0 to 1
   */
  level: number
  
  /**
   * Whether the device is charging
   */
  charging: boolean
  
  /**
   * Time until fully charged in seconds (Infinity if not charging)
   */
  chargingTime: number
  
  /**
   * Time until fully discharged in seconds (Infinity if charging)
   */
  dischargingTime: number
  
  /**
   * Whether battery API is supported
   */
  supported: boolean
}

/**
 * Options for useBattery hook
 */
export interface UseBatteryOptions {
  /**
   * Callback when battery status changes
   */
  onChange?: (status: BatteryStatus) => void
}

