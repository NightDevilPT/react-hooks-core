# useGeolocation

Accesses the user's geolocation with permission handling, error management, and support for both one-time and continuous position tracking. This hook provides a React-friendly interface to the browser's Geolocation API.

## Description & Use Cases

**Problem it solves**: Many applications need to access the user's location for features like maps, location-based services, weather, nearby places, or tracking. The browser's Geolocation API requires permission handling, error management, and proper cleanup, which can be complex to implement correctly.

**Use cases**:
- Display user location on maps
- Find nearby places or services
- Location-based weather or news
- Navigation and routing applications
- Location tracking and monitoring
- Geofencing and location-based notifications
- Location-based analytics

**Benefits**:
- Automatic permission handling
- Comprehensive error management
- Support for one-time and continuous tracking
- Configurable accuracy and timeout
- SSR-compatible
- Automatic cleanup on unmount

**When to use**: Use this hook when you need to access the user's geographic location. Always request location only when necessary and handle permissions gracefully.

## Quick Example

```typescript
import { useGeolocation } from 'react-hookify/browser'
import { useState } from 'react'

function App() {
  const [enabled, setEnabled] = useState(false)
  const { loading, error, coordinates } = useGeolocation({ enabled })
  
  if (loading) return <div>Getting location...</div>
  if (error) return <div>Error: {error.message}</div>
  if (!coordinates) {
    return (
      <button onClick={() => setEnabled(true)}>
        Get Location
      </button>
    )
  }
  
  return (
    <div>
      <p>Lat: {coordinates.latitude}</p>
      <p>Lng: {coordinates.longitude}</p>
    </div>
  )
}
```

## Signature

```typescript
function useGeolocation(options?: UseGeolocationOptions): GeolocationState
```

## Parameters

### options (optional)

An object extending `PositionOptions` with the following properties:

#### `enabled` (boolean, optional)

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When `true`, enables geolocation requests. When `false` (default), the hook will not request location automatically. This prevents automatic location requests on component mount, which can cause permission prompts and network errors.
- **When to use**: 
  - Set to `false` (default) to prevent automatic location requests
  - Set to `true` when you want to request location (e.g., when user clicks a button)
  - Use with state to control when location is requested: `const [enabled, setEnabled] = useState(false)`
- **Best Practice**: Always use `enabled: false` by default and only enable when the user explicitly requests location to avoid unexpected permission prompts and network location provider errors.

#### `watch` (boolean, optional)

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When `true`, continuously watches the user's position and updates whenever it changes. When `false`, retrieves the position once and stops.
- **When to use**: 
  - Set to `true` for tracking applications, navigation, or real-time location updates
  - Set to `false` (default) for one-time location requests like "find nearby stores" or "get current location"
- **Performance**: Watching consumes more battery and resources. Only enable when continuous updates are necessary.

#### `enableHighAccuracy` (boolean, optional)

- **Type**: `boolean`
- **Default**: `false`
- **Description**: Requests high-accuracy positioning using GPS when available. When `false`, uses faster but less accurate methods (WiFi, cell towers).
- **When to use**: 
  - Set to `true` for applications requiring precise location (navigation, geocaching, surveying)
  - Set to `false` for general location needs (weather, nearby places) where speed is more important than precision
- **Trade-off**: High accuracy takes longer and uses more battery, but provides better precision (often within 10-20 meters vs 50-100 meters).

#### `timeout` (number, optional)

- **Type**: `number` (milliseconds)
- **Default**: `5000` (5 seconds)
- **Description**: Maximum time to wait for a position response before timing out. If exceeded, the error callback is called with a timeout error.
- **Range**: Positive number (recommended: 1000-30000 ms)
- **When to use**: 
  - Increase (10000-30000) for high-accuracy requests that may take longer
  - Decrease (1000-3000) for quick responses when accuracy isn't critical
  - Default (5000) works well for most use cases

#### `maximumAge` (number, optional)

- **Type**: `number` (milliseconds)
- **Default**: `0` (no cache)
- **Description**: Maximum age of a cached position that can be returned. If a cached position is older than this, a new position will be requested.
- **Range**: `0` (always fresh) to positive numbers
- **When to use**: 
  - Set to `0` (default) when you need the most current position
  - Set to a value like `60000` (1 minute) or `300000` (5 minutes) to allow using cached positions, which is faster and uses less battery
  - Useful for applications that don't need real-time updates but want to avoid unnecessary requests

#### `onSuccess` (function, optional)

- **Type**: `(coordinates: GeolocationCoordinates) => void`
- **Description**: Callback function invoked when the position is successfully retrieved. Receives the coordinates object.
- **When to use**: Use this to perform side effects when location is obtained, such as updating maps, sending to analytics, saving to state, or triggering other actions.
- **Example**: 
  ```typescript
  onSuccess: (coords) => {
    updateMapCenter([coords.latitude, coords.longitude])
    analytics.track('location_obtained', coords)
  }
  ```

#### `onError` (function, optional)

- **Type**: `(error: GeolocationPositionError) => void`
- **Description**: Callback function invoked when geolocation fails. Receives an error object with `code` and `message` properties.
- **Error codes**:
  - `1` (PERMISSION_DENIED): User denied location permission
  - `2` (POSITION_UNAVAILABLE): Location unavailable (GPS off, no signal)
  - `3` (TIMEOUT): Request timed out
- **When to use**: Use this to handle errors gracefully, show user-friendly messages, request permissions again, or provide fallback options.
- **Example**: 
  ```typescript
  onError: (error) => {
    if (error.code === 1) {
      showPermissionRequestDialog()
    } else {
      showErrorMessage('Unable to get location')
    }
  }
  ```

## Return Value

Returns a `GeolocationState` object with the following properties:

#### `loading` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether a geolocation request is currently in progress. Useful for showing loading indicators or disabling actions during location retrieval.
- **Values**: 
  - `true`: Location request is in progress
  - `false`: Location request has completed (successfully or with error)
- **Default**: `false` during SSR or when `enabled` is `false`
- **When to use**: Use this to show loading spinners, disable buttons, or prevent duplicate requests while location is being fetched.

#### `error` (GeolocationPositionError | null)

- **Type**: `GeolocationPositionError | null`
- **Description**: Error object if the geolocation request failed, or `null` if successful or still loading.
- **Properties**:
  - `code`: Error code (1 = permission denied, 2 = unavailable, 3 = timeout)
  - `message`: Human-readable error message
  - `PERMISSION_DENIED`: Constant value `1`
  - `POSITION_UNAVAILABLE`: Constant value `2`
  - `TIMEOUT`: Constant value `3`
- **Default**: `null` when no error has occurred
- **When to use**: Check this to determine why location failed and provide appropriate user feedback or fallback behavior.

#### `coordinates` (GeolocationCoordinates | null)

- **Type**: `GeolocationCoordinates | null`
- **Description**: Location coordinates object when available, or `null` if not yet retrieved, loading, or if an error occurred.
- **Default**: `null` when location is not available
- **When to use**: Check if this is not `null` before accessing location data. Use the coordinates to display on maps, calculate distances, or send to APIs.

### GeolocationCoordinates Object

When `coordinates` is not `null`, it contains:

#### `latitude` (number)

- **Type**: `number`
- **Description**: Latitude in decimal degrees (WGS84 coordinate system).
- **Range**: `-90` to `90` (negative = south, positive = north)
- **Precision**: Typically 6-7 decimal places (about 10cm accuracy)
- **Example**: `40.7128` (New York City)

#### `longitude` (number)

- **Type**: `number`
- **Description**: Longitude in decimal degrees (WGS84 coordinate system).
- **Range**: `-180` to `180` (negative = west, positive = east)
- **Precision**: Typically 6-7 decimal places (about 10cm accuracy)
- **Example**: `-74.0060` (New York City)

#### `accuracy` (number)

- **Type**: `number`
- **Description**: Accuracy radius in meters. The actual position is within this radius 95% of the time.
- **Range**: Positive number (typically 10-100+ meters)
- **When to use**: Use this to determine location quality. Lower values (10-20m) indicate high accuracy (GPS), higher values (50-100m) indicate lower accuracy (WiFi/cell towers).

#### `altitude` (number | null)

- **Type**: `number | null`
- **Description**: Altitude in meters above sea level. `null` if not available.
- **Range**: Can be negative (below sea level) or positive
- **Availability**: Only available when GPS is used and device supports it
- **When to use**: Use for elevation-based features, hiking apps, or 3D mapping. Always check for `null` before using.

#### `altitudeAccuracy` (number | null)

- **Type**: `number | null`
- **Description**: Accuracy of the altitude measurement in meters. `null` if altitude is not available.
- **Range**: Positive number (typically 5-50 meters)
- **When to use**: Use to determine if altitude data is reliable enough for your use case.

#### `heading` (number | null)

- **Type**: `number | null`
- **Description**: Direction of travel in degrees clockwise from north. `null` if not available.
- **Range**: `0` to `360` (0 = north, 90 = east, 180 = south, 270 = west)
- **Availability**: Only available when device is moving and GPS is used
- **When to use**: Use for navigation, compass features, or determining travel direction. Always check for `null` before using.

#### `speed` (number | null)

- **Type**: `number | null`
- **Description**: Current speed in meters per second. `null` if not available.
- **Range**: Positive number (0 = stationary, higher = faster)
- **Availability**: Only available when device is moving and GPS is used
- **Conversion**: Multiply by `3.6` to get km/h, or `2.237` to get mph
- **When to use**: Use for speed tracking, fitness apps, or determining if user is stationary. Always check for `null` before using.

## SSR / Next.js Compatibility

The hook is fully compatible with Next.js and server-side rendering:

- **Server-side**: Returns safe default values (`loading: false`, `error: { message: 'not supported' }`, `coordinates: null`)
- **Client-side**: Automatically detects geolocation API availability on hydration
- **Hydration**: No hydration mismatches occur because the hook uses safe defaults on the server
- **No configuration needed**: Works out of the box with Next.js App Router and Pages Router

The hook only requests location when `enabled` is `true` and only in the browser environment.

## Common Patterns

### Get Location Once (Manual Trigger)

```typescript
function LocationDisplay() {
  const [enabled, setEnabled] = useState(false)
  const { loading, error, coordinates } = useGeolocation({ enabled })
  
  if (loading) return <Spinner />
  if (error) return <ErrorMessage error={error} />
  if (!coordinates) {
    return (
      <button onClick={() => setEnabled(true)}>
        Get My Location
      </button>
    )
  }
  
  return (
    <div>
      <p>You are at:</p>
      <p>{coordinates.latitude}, {coordinates.longitude}</p>
    </div>
  )
}
```

### Watch Position Continuously

```typescript
function LiveTracking() {
  const { coordinates, error } = useGeolocation({
    enabled: true,
    watch: true,
    enableHighAccuracy: true
  })
  
  // Updates automatically as user moves
  return (
    <Map center={coordinates ? [coordinates.latitude, coordinates.longitude] : null} />
  )
}
```

### High Accuracy Location

```typescript
function PreciseLocation() {
  const { coordinates } = useGeolocation({
    enabled: true,
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 0
  })
  
  // Uses GPS for maximum accuracy
  return <div>Precise: {coordinates?.latitude}</div>
}
```

### Error Handling

```typescript
function LocationWithErrorHandling() {
  const { loading, error, coordinates } = useGeolocation({
    enabled: true,
    onError: (err) => {
      if (err.code === err.PERMISSION_DENIED) {
        console.log('User denied location permission')
      } else if (err.code === err.POSITION_UNAVAILABLE) {
        console.log('Position unavailable')
      } else if (err.code === err.TIMEOUT) {
        console.log('Location request timed out')
      }
    }
  })
  
  if (error?.code === error.PERMISSION_DENIED) {
    return <button>Enable Location</button>
  }
  
  return <div>Location: {coordinates?.latitude}</div>
}
```

## Browser Compatibility

Uses the standard Geolocation API which is supported in all modern browsers:

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Legacy browsers**: Full support (IE9+)
- **Mobile browsers**: Full support
- **HTTPS required**: Geolocation requires HTTPS in production (works on localhost for development)
- **Permissions**: Requires user permission to access location

The hook gracefully handles unsupported environments by returning appropriate error states.

## Performance Notes

- **Event-driven**: Uses native Geolocation API (no polling)
- **Automatic cleanup**: Watch mode automatically stops when component unmounts
- **Battery efficient**: Only requests location when `enabled` is `true`
- **Caching support**: Use `maximumAge` to reduce battery usage
- **High accuracy trade-off**: `enableHighAccuracy: true` uses more battery but provides better precision

The hook is designed to be efficient and only requests location when explicitly enabled.

## Troubleshooting

### Issue: Permission denied error

**Solution**: The user must grant location permission. Handle the error gracefully and provide UI to request permission again. Consider explaining why location is needed before requesting.

### Issue: Position unavailable

**Solution**: The device may not have GPS or location services disabled. Check device settings and provide fallback options. Ensure location services are enabled on the device.

### Issue: Timeout errors

**Solution**: Increase the `timeout` value or reduce `enableHighAccuracy` for faster results. Consider using cached positions with `maximumAge` to avoid repeated requests.

### Issue: Not working in development

**Solution**: Geolocation requires HTTPS in production. For local development, use `localhost` or enable HTTPS in your dev server. Some browsers may block geolocation on non-secure origins.

### Issue: High accuracy is slow

**Solution**: High accuracy uses GPS which takes longer. Use `enableHighAccuracy: false` for faster results with less precision. Consider using `maximumAge` to cache recent positions.

### Issue: Watch mode not updating

**Solution**: Ensure the component stays mounted. The watch automatically stops when the component unmounts. Check that `watch: true` and `enabled: true` are both set.

### Issue: Network location provider error (403)

**Solution**: This occurs when automatic location requests are made. Always use `enabled: false` by default and only enable when the user explicitly requests location. This prevents automatic requests that can trigger network location provider errors.
