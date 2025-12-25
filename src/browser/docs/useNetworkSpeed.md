# useNetworkSpeed

Monitors network connection speed and type using the Network Information API. This hook provides real-time information about connection quality, bandwidth, latency, and data saver preferences to help you optimize content delivery and user experience.

## Description & Use Cases

**Problem it solves**: Different users have different network conditions. To provide the best experience, you need to adapt your application based on connection speed - loading lower quality images on slow connections, disabling auto-play videos, or reducing data usage when the user has data saver enabled.

**Use cases**:
- Adaptive content loading (video quality, image resolution)
- Conditional feature enabling based on connection speed
- Data saver mode detection and optimization
- Network-aware UI adjustments
- Analytics and performance monitoring
- Bandwidth-based preloading decisions

**Benefits**:
- Real-time network monitoring
- Connection type categorization
- Data saver detection
- SSR-compatible with safe defaults
- Automatic updates on network changes

**When to use**: Use this hook when you need to adapt your application's behavior based on network conditions, optimize data usage, or provide different experiences for users with varying connection speeds.

## Quick Example

```typescript
import { useNetworkSpeed } from 'react-hookify/browser'

function VideoPlayer() {
  const { effectiveType, downlink } = useNetworkSpeed()
  
  const quality = effectiveType === '4g' && downlink > 5 ? 'high' : 'low'
  
  return <video src={`video-${quality}.mp4`} />
}
```

## Signature

```typescript
function useNetworkSpeed(options?: UseNetworkSpeedOptions): NetworkSpeedInfo
```

## Parameters

### options (optional)

An object with the following properties:

#### `onChange` (function, optional)

- **Type**: `(info: NetworkSpeedInfo) => void`
- **Description**: Callback function that is invoked whenever the network connection speed or type changes. This is useful for logging, analytics, or triggering side effects when network conditions change.
- **Parameter**: 
  - `info`: The complete `NetworkSpeedInfo` object with current network status
- **When to use**: Use this when you need to react to network changes in real-time, such as:
  - Adjusting video quality when connection changes
  - Showing network warnings
  - Sending analytics events
  - Triggering content reloads
- **Example**: 
  ```typescript
  onChange: (info) => {
    if (info.effectiveType === 'slow-2g') {
      showLowBandwidthWarning()
      reduceContentQuality()
    } else if (info.effectiveType === '4g') {
      enableHighQualityContent()
    }
  }
  ```

## Return Value

Returns a `NetworkSpeedInfo` object with the following properties:

#### `effectiveType` (ConnectionType)

- **Type**: `'slow-2g' | '2g' | '3g' | '4g' | 'unknown'`
- **Description**: The effective connection type based on the Network Information API. This represents the network quality category rather than the exact connection technology.
- **Values**:
  - `'slow-2g'`: Very slow connection (< 50 Kbps)
  - `'2g'`: Slow connection (50-70 Kbps)
  - `'3g'`: Medium connection (70-700 Kbps)
  - `'4g'`: Fast connection (> 700 Kbps)
  - `'unknown'`: Connection type cannot be determined (API not supported or unavailable)
- **Default**: `'unknown'` when API is unavailable
- **When to use**: Use this to categorize network quality and make high-level decisions about content quality, feature availability, or user experience adjustments.

#### `downlink` (number)

- **Type**: `number`
- **Description**: The maximum downlink speed in megabits per second (Mbps) that the device can receive. This is an estimate provided by the browser based on recent network performance.
- **Range**: `0` to positive numbers (typically 0-100+ Mbps)
- **Default**: `0` when API is unavailable
- **When to use**: Use this for precise bandwidth calculations, such as determining video bitrate, image quality, or deciding how much data to preload. Higher values indicate better download speeds.

#### `rtt` (number)

- **Type**: `number`
- **Description**: Round-trip time (RTT) in milliseconds. This measures the time it takes for a packet to travel from the device to the server and back. Lower values indicate lower latency.
- **Range**: `0` to positive numbers (typically 0-1000+ ms)
- **Default**: `0` when API is unavailable
- **When to use**: Use this to determine if the connection has high latency, which affects real-time features like video calls, gaming, or live updates. Values below 100ms are excellent, 100-300ms are good, and above 300ms may cause noticeable delays.

#### `saveData` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the user has enabled data saver mode in their browser or device settings. When `true`, the user prefers to reduce data usage.
- **Values**: 
  - `true`: Data saver mode is enabled
  - `false`: Data saver mode is disabled or not supported
- **Default**: `false` when API is unavailable
- **When to use**: Use this to automatically reduce data consumption by disabling auto-play videos, reducing image quality, or limiting background sync. Always respect this setting to provide a better user experience.

## SSR / Next.js Compatibility

The hook is fully compatible with Next.js and server-side rendering:

- **Server-side**: Returns safe default values (`effectiveType: 'unknown'`, `downlink: 0`, `rtt: 0`, `saveData: false`)
- **Client-side**: Automatically detects actual network status on hydration
- **Hydration**: No hydration mismatches occur because the hook uses safe defaults on the server
- **No configuration needed**: Works out of the box with Next.js App Router and Pages Router

The hook automatically sets up event listeners only in the browser and cleans them up on unmount.

## Common Patterns

### Adaptive Content Loading

```typescript
function VideoPlayer() {
  const { effectiveType, downlink } = useNetworkSpeed()
  
  // Load lower quality on slow connections
  const videoQuality = effectiveType === '4g' && downlink > 5 
    ? 'high' 
    : 'low'
  
  return <video src={`video-${videoQuality}.mp4`} />
}
```

### Network-Aware Features

```typescript
function App() {
  const { effectiveType, saveData } = useNetworkSpeed()
  
  // Disable auto-play videos on slow connections
  const shouldAutoPlay = effectiveType !== 'slow-2g' && !saveData
  
  return (
    <VideoPlayer autoPlay={shouldAutoPlay} />
  )
}
```

### Data Saver Detection

```typescript
function OptimizedApp() {
  const { saveData, effectiveType } = useNetworkSpeed()
  
  // Reduce data usage when data saver is enabled
  const useLowQuality = saveData || effectiveType === 'slow-2g'
  
  return (
    <>
      {useLowQuality && <LowQualityMode />}
      {!useLowQuality && <HighQualityMode />}
    </>
  )
}
```

### Real-time Network Monitoring

```typescript
function NetworkMonitor() {
  const network = useNetworkSpeed({
    onChange: (info) => {
      console.log('Network changed:', info.effectiveType)
      // Send analytics or adjust app behavior
      analytics.track('network_change', info)
    }
  })
  
  return (
    <div>
      <p>Current: {network.effectiveType}</p>
      <p>Speed: {network.downlink} Mbps</p>
      <p>Latency: {network.rtt}ms</p>
    </div>
  )
}
```

## Browser Compatibility

The Network Information API has limited browser support:

- **Supported**: Chrome 61+, Edge 79+, Opera 48+
- **Not supported**: Firefox, Safari (as of 2024)
- **Fallback**: Returns `'unknown'` connection type and default values when API is unavailable
- **HTTPS required**: The API requires a secure context (HTTPS) in production

The hook gracefully handles unsupported browsers by returning safe default values. Always check `effectiveType !== 'unknown'` before relying on network data.

## Performance Notes

- **Event-driven**: Uses native Network Information API events (no polling)
- **Automatic cleanup**: Event listeners are automatically removed on unmount
- **No memory leaks**: Proper cleanup ensures no lingering listeners
- **Efficient**: Only updates when network conditions actually change
- **Lightweight**: Minimal overhead when API is unavailable

The hook is designed to be performant and only sets up event listeners when the Network Information API is available.

## Troubleshooting

### Issue: Always shows 'unknown' connection type

**Solution**: The Network Information API is not supported in all browsers. Check browser compatibility. The hook gracefully falls back to `'unknown'` when the API is unavailable. Consider using feature detection or providing fallback logic.

### Issue: Values not updating

**Solution**: Ensure you're using a browser that supports the Network Information API (Chrome, Edge, Opera). The hook automatically listens for network changes. Also verify that you're testing on HTTPS (required in production).

### Issue: saveData always false

**Solution**: Data saver mode detection depends on browser and OS settings. Not all browsers support this feature. Check that data saver is actually enabled in browser/OS settings and that you're using a supported browser.

### Issue: Works in development but not production

**Solution**: Ensure your production environment has HTTPS enabled, as the Network Information API requires secure contexts. Some network APIs may not work over HTTP.

### Issue: RTT or downlink values seem inaccurate

**Solution**: These values are estimates provided by the browser based on recent network performance. They may not reflect the exact current conditions but provide a good approximation for optimization decisions.
