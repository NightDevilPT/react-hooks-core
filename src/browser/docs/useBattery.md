# useBattery

Monitors device battery status including level, charging state, and time estimates using the Battery Status API. This hook provides real-time battery information to help you optimize your application's behavior based on battery conditions.

## Description & Use Cases

**Problem it solves**: Mobile and laptop users have limited battery life. To provide the best experience and conserve battery, you need to adapt your application based on battery level - reducing animations on low battery, disabling resource-intensive features, or showing battery warnings.

**Use cases**:
- Battery level indicators
- Low battery warnings
- Battery-aware feature toggling
- Optimize performance based on battery level
- Show charging status and time estimates
- Conditional feature loading based on battery
- Analytics and battery usage tracking

**Benefits**:
- Real-time battery monitoring
- Charging status detection
- Time estimates (charging/discharging)
- SSR-compatible with safe defaults
- Automatic updates on battery changes

**When to use**: Use this hook when you need to adapt your application's behavior based on battery conditions, show battery status, or optimize performance for battery life. Particularly useful for mobile web applications.

## Quick Example

```typescript
import { useBattery } from 'react-hookify/browser'

function App() {
  const battery = useBattery()
  
  if (!battery.supported) {
    return <div>Battery API not supported</div>
  }
  
  return (
    <div>
      <p>Battery: {Math.round(battery.level * 100)}%</p>
      <p>Status: {battery.charging ? 'Charging' : 'Discharging'}</p>
    </div>
  )
}
```

## Signature

```typescript
function useBattery(options?: UseBatteryOptions): BatteryStatus
```

## Parameters

### options (optional)

An object with the following properties:

#### `onChange` (function, optional)

- **Type**: `(status: BatteryStatus) => void`
- **Description**: Callback function that is invoked whenever any battery property changes (level, charging status, time estimates). This fires in real-time as battery conditions change.
- **Parameter**: 
  - `status`: The complete `BatteryStatus` object with current battery information
- **When to use**: Use this to react to battery changes immediately, such as sending analytics, adjusting app behavior, or showing warnings. Useful for tracking battery usage patterns or triggering optimizations.
- **Example**: 
  ```typescript
  onChange: (status) => {
    if (status.level < 0.1 && !status.charging) {
      showCriticalBatteryWarning()
      reduceAppFeatures()
    } else if (status.level > 0.5 && status.charging) {
      enableFullFeatures()
    }
  }
  ```

## Return Value

Returns a `BatteryStatus` object with the following properties:

#### `level` (number)

- **Type**: `number`
- **Description**: Battery charge level as a decimal value between 0 and 1, where 0 represents completely empty and 1 represents fully charged.
- **Range**: `0` to `1`
- **Default**: `1` when API is unavailable (safe default for SSR)
- **Conversion**: Multiply by `100` to get percentage (e.g., `0.75` = 75%)
- **When to use**: Use this to display battery percentage, determine if battery is low, or make decisions about feature availability. Values below `0.2` (20%) typically indicate low battery.

#### `charging` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the device is currently connected to a power source and charging.
- **Values**: 
  - `true`: Device is plugged in and charging
  - `false`: Device is running on battery power
- **Default**: `false` when API is unavailable
- **When to use**: Use this to determine if the device is on battery power, which affects decisions about resource-intensive features, background tasks, or data usage. When `true`, you can enable more features without battery concerns.

#### `chargingTime` (number)

- **Type**: `number` (seconds)
- **Description**: Estimated time in seconds until the battery is fully charged. Returns `Infinity` if the device is not charging, already fully charged, or the time cannot be determined.
- **Range**: `0` to positive numbers, or `Infinity`
- **Default**: `Infinity` when API is unavailable or not charging
- **Conversion**: Divide by `3600` to get hours, or by `60` to get minutes
- **When to use**: Use this to display charging progress, estimate when device will be fully charged, or show "Charging..." messages. Always check for `Infinity` before displaying time estimates.

#### `dischargingTime` (number)

- **Type**: `number` (seconds)
- **Description**: Estimated time in seconds until the battery is fully discharged. Returns `Infinity` if the device is charging, the time cannot be determined, or the battery is already empty.
- **Range**: `0` to positive numbers, or `Infinity`
- **Default**: `Infinity` when API is unavailable or charging
- **Conversion**: Divide by `3600` to get hours, or by `60` to get minutes
- **When to use**: Use this to estimate remaining battery life, show "X hours remaining" messages, or warn users about low battery time. Always check for `Infinity` before displaying time estimates. Note: This is an estimate and may not be accurate depending on usage patterns.

#### `supported` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the Battery Status API is supported and available in the current browser/environment.
- **Values**: 
  - `true`: Battery API is available and values are real-time
  - `false`: Battery API is not supported (returns default values)
- **Browser Support**: Currently supported in Chrome, Edge, and Opera. Not available in Firefox or Safari.
- **When to use**: Always check this property before relying on battery data. When `false`, all other values are defaults and not real-time. Use this to gracefully handle unsupported browsers or show alternative UI.

## SSR / Next.js Compatibility

The hook is fully compatible with Next.js and server-side rendering:

- **Server-side**: Returns safe default values (`level: 1`, `charging: false`, `chargingTime: Infinity`, `dischargingTime: Infinity`, `supported: false`)
- **Client-side**: Automatically detects battery API availability on hydration
- **Hydration**: No hydration mismatches occur because the hook uses safe defaults on the server
- **No configuration needed**: Works out of the box with Next.js App Router and Pages Router

The hook automatically sets up event listeners only in the browser and cleans them up on unmount.

## Common Patterns

### Battery Level Indicator

```typescript
function BatteryIndicator() {
  const { level, charging, supported } = useBattery()
  
  if (!supported) return null
  
  const percentage = Math.round(level * 100)
  const color = level > 0.5 ? 'green' : level > 0.2 ? 'yellow' : 'red'
  
  return (
    <div>
      <div style={{ width: `${percentage}%`, backgroundColor: color }}>
        {percentage}%
      </div>
      {charging && <span>⚡ Charging</span>}
    </div>
  )
}
```

### Low Battery Warning

```typescript
function LowBatteryWarning() {
  const { level, charging, supported } = useBattery()
  
  if (!supported || charging || level > 0.2) return null
  
  return (
    <div className="warning">
      ⚠️ Low battery: {Math.round(level * 100)}% remaining
    </div>
  )
}
```

### Battery-Aware Features

```typescript
function OptimizedApp() {
  const { level, charging, supported } = useBattery()
  
  // Reduce animations and background tasks on low battery
  const lowBattery = supported && level < 0.2 && !charging
  
  return (
    <>
      {lowBattery && <BatterySaverMode />}
      <VideoPlayer autoPlay={!lowBattery} />
    </>
  )
}
```

### Charging Time Display

```typescript
function ChargingStatus() {
  const { charging, chargingTime, supported } = useBattery()
  
  if (!supported || !charging) return null
  
  if (chargingTime === Infinity) {
    return <div>Charging...</div>
  }
  
  const hours = Math.floor(chargingTime / 3600)
  const minutes = Math.floor((chargingTime % 3600) / 60)
  
  return (
    <div>
      ⚡ {hours}h {minutes}m until fully charged
    </div>
  )
}
```

### Discharging Time Estimate

```typescript
function BatteryLife() {
  const { dischargingTime, charging, supported } = useBattery()
  
  if (!supported || charging || dischargingTime === Infinity) {
    return null
  }
  
  const hours = Math.floor(dischargingTime / 3600)
  const minutes = Math.floor((dischargingTime % 3600) / 60)
  
  return (
    <div>
      Estimated battery life: {hours}h {minutes}m
    </div>
  )
}
```

## Browser Compatibility

The Battery Status API has limited browser support:

- **Supported**: Chrome 61+, Edge 79+, Opera 48+
- **Not supported**: Firefox, Safari (as of 2024)
- **Fallback**: Returns `supported: false` and default values when API is unavailable
- **HTTPS required**: The API requires a secure context (HTTPS) in production

The hook gracefully handles unsupported browsers by returning `supported: false` and safe default values. Always check `supported` before relying on battery data.

## Performance Notes

- **Event-driven**: Uses native Battery Status API events (no polling)
- **Automatic cleanup**: Event listeners are automatically removed on unmount
- **No memory leaks**: Proper cleanup ensures no lingering listeners
- **Efficient**: Only updates when battery conditions actually change
- **Lightweight**: Minimal overhead when API is unavailable

The hook is designed to be performant and only sets up event listeners when the Battery Status API is available.

## Troubleshooting

### Issue: supported is always false

**Solution**: The Battery Status API is only supported in Chrome, Edge, and Opera. It's not available in Firefox or Safari. The hook gracefully handles this by returning `supported: false`. Consider providing alternative UI or feature detection for unsupported browsers.

### Issue: Values not updating

**Solution**: Ensure you're using a supported browser. The hook automatically listens for battery events and updates in real-time. Also verify that you're testing on HTTPS (required in production).

### Issue: chargingTime is always Infinity

**Solution**: This is normal when the device is not charging or when the battery is already fully charged. Check the `charging` property to determine if the device is plugged in. Also verify that the Battery API is supported (`supported: true`).

### Issue: Works in development but not production

**Solution**: The Battery API requires HTTPS in production. Ensure your production environment uses HTTPS. Some hosting environments may not properly expose the Battery API.

### Issue: Level shows 1.0 initially

**Solution**: On server-side rendering or when the API is unavailable, the hook defaults to `level: 1`. Check `supported` to verify if the API is actually available. The level will update to the actual value once the API is detected in the browser.

### Issue: Time estimates seem inaccurate

**Solution**: Battery time estimates are approximations provided by the browser based on current usage patterns. They may not be perfectly accurate, especially if usage patterns change. Use them as rough estimates rather than precise values.
