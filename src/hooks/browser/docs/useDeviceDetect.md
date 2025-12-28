# useDeviceDetect

Detects device type (mobile, tablet, desktop) and operating system (iOS, Android, Windows, macOS, Linux) from the user agent string. This hook provides a simple way to conditionally render components or adjust features based on the user's device without relying on CSS media queries.

## Description & Use Cases

**Problem it solves**: When building responsive applications, you often need to know the device type and operating system to provide device-specific features, optimize layouts, or show platform-specific download buttons. While CSS media queries can detect screen size, they cannot determine the actual device type or OS.

**Use cases**:
- Responsive component rendering (mobile vs desktop layouts)
- Platform-specific features (iOS vs Android app download buttons)
- Device-optimized UI components
- Analytics and tracking device types
- Conditional feature availability based on device capabilities

**Benefits**:
- Simple API for device detection
- SSR-compatible with safe defaults
- No external dependencies
- Works in all browsers
- TypeScript support with full type inference

**When to use**: Use this hook when you need to detect device type or OS for conditional rendering, feature flags, or analytics. For viewport-based responsive design, prefer CSS media queries or `useMediaQuery`.

## Quick Example

```typescript
import { useDeviceDetect } from 'react-hookify/browser'

function App() {
  const { isMobile, isDesktop, isIOS } = useDeviceDetect()
  
  if (isMobile) return <MobileLayout />
  if (isIOS) return <IOSDownloadButton />
  return <DesktopLayout />
}
```

## Signature

```typescript
function useDeviceDetect(options?: UseDeviceDetectOptions): DeviceDetectResult
```

## Parameters

### options (optional)

An object with the following properties:

#### `userAgent` (string, optional)

- **Type**: `string`
- **Default**: `window.navigator.userAgent` (automatically detected)
- **Description**: Custom user agent string for testing or when you need to detect a specific user agent. Useful for unit testing or server-side detection.
- **When to use**: 
  - Testing with specific user agents
  - Server-side detection when you have access to request headers
  - Overriding default detection for specific scenarios
- **Example**: 
  ```typescript
  useDeviceDetect({ userAgent: 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)' })
  ```

#### `ssrMode` (boolean, optional)

- **Type**: `boolean`
- **Default**: `false`
- **Description**: When `true`, forces the hook to return default values (desktop, no OS flags) regardless of the actual environment. This is useful for consistent SSR rendering.
- **Values**: 
  - `true`: Force SSR mode, return default values
  - `false`: Normal detection mode (default)
- **When to use**: 
  - When you want consistent server-side rendering
  - When you need to prevent hydration mismatches
  - Testing SSR behavior
- **Note**: The hook automatically detects SSR environments, so you typically don't need to set this manually.

## Return Value

Returns a `DeviceDetectResult` object with the following properties:

#### `isMobile` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the device is a mobile phone (iPhone, Android phone, etc.).
- **Values**: 
  - `true`: Device is a mobile phone
  - `false`: Device is not a mobile phone
- **Default**: `false` during SSR
- **When to use**: Use this to conditionally render mobile-specific components or layouts.

#### `isTablet` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the device is a tablet (iPad, Android tablet, etc.).
- **Values**: 
  - `true`: Device is a tablet
  - `false`: Device is not a tablet
- **Default**: `false` during SSR
- **When to use**: Use this to provide tablet-specific layouts or features.

#### `isDesktop` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the device is a desktop or laptop computer.
- **Values**: 
  - `true`: Device is a desktop/laptop
  - `false`: Device is not a desktop/laptop
- **Default**: `true` during SSR (safe default)
- **When to use**: Use this to render desktop-specific components or full-featured layouts.

#### `isIOS` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the device is running iOS (iPhone, iPad, iPod).
- **Values**: 
  - `true`: Device is iOS
  - `false`: Device is not iOS
- **Default**: `false` during SSR
- **When to use**: Use this to show iOS-specific download buttons, features, or handle iOS-specific behaviors.

#### `isAndroid` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the device is running Android.
- **Values**: 
  - `true`: Device is Android
  - `false`: Device is not Android
- **Default**: `false` during SSR
- **When to use**: Use this to show Android-specific download buttons or features.

#### `isWindows` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the device is running Windows OS.
- **Values**: 
  - `true`: Device is Windows
  - `false`: Device is not Windows
- **Default**: `false` during SSR
- **When to use**: Use this to provide Windows-specific features or download links.

#### `isMacOS` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the device is running macOS.
- **Values**: 
  - `true`: Device is macOS
  - `false`: Device is not macOS
- **Default**: `false` during SSR
- **When to use**: Use this to provide macOS-specific features or download links.

#### `isLinux` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the device is running Linux (excluding Android).
- **Values**: 
  - `true`: Device is Linux
  - `false`: Device is not Linux
- **Default**: `false` during SSR
- **When to use**: Use this to provide Linux-specific features or download links.

#### `isBrowser` (boolean)

- **Type**: `boolean`
- **Description**: Indicates whether the code is running in a browser environment (as opposed to server-side).
- **Values**: 
  - `true`: Running in browser
  - `false`: Running on server (SSR)
- **Default**: `false` during SSR
- **When to use**: Use this to check if you're in a browser before accessing browser APIs.

#### `userAgent` (string)

- **Type**: `string`
- **Description**: The raw user agent string used for detection.
- **Default**: `''` during SSR
- **When to use**: Use this for debugging, logging, or custom detection logic.

## SSR / Next.js Compatibility

The hook is fully compatible with Next.js and server-side rendering:

- **Server-side**: Returns safe default values (`isDesktop: true`, all OS flags `false`, `isBrowser: false`)
- **Client-side**: Automatically detects the actual device and OS on hydration
- **Hydration**: No hydration mismatches occur because the hook uses safe defaults on the server
- **No configuration needed**: Works out of the box with Next.js App Router and Pages Router

The hook automatically detects SSR environments and returns appropriate defaults without requiring any configuration.

## Common Patterns

### Responsive Component Rendering

```typescript
function ResponsiveApp() {
  const { isMobile, isTablet, isDesktop } = useDeviceDetect()
  
  if (isMobile) return <MobileApp />
  if (isTablet) return <TabletApp />
  return <DesktopApp />
}
```

### Platform-Specific Download Buttons

```typescript
function DownloadButton() {
  const { isIOS, isAndroid, isWindows, isMacOS } = useDeviceDetect()
  
  if (isIOS) return <AppStoreButton />
  if (isAndroid) return <PlayStoreButton />
  if (isWindows) return <WindowsDownloadButton />
  if (isMacOS) return <MacDownloadButton />
  return <GenericDownloadButton />
}
```

### Device-Aware Feature Flags

```typescript
function App() {
  const { isMobile, isDesktop } = useDeviceDetect()
  
  return (
    <>
      {isDesktop && <AdvancedFeatures />}
      {isMobile && <SimplifiedUI />}
    </>
  )
}
```

## Browser Compatibility

Works in all modern browsers that support JavaScript. The hook uses the standard `navigator.userAgent` property which is available in all browsers.

- **Modern browsers**: Full support
- **Legacy browsers**: Full support (user agent detection has been available since early browsers)
- **Mobile browsers**: Full support
- **No polyfills required**: Uses native browser APIs only

## Performance Notes

- **Memoized**: The hook uses `useMemo` to prevent unnecessary recalculations
- **No event listeners**: Detection happens once on mount, no ongoing performance impact
- **Lightweight**: Minimal bundle size, no external dependencies
- **Fast**: User agent parsing is extremely fast (microseconds)

The hook only recalculates when the `userAgent` or `ssrMode` options change, making it very efficient for conditional rendering.

## Troubleshooting

### Issue: Always shows desktop on server

**Solution**: This is expected behavior. The hook returns `isDesktop: true` as a safe default during SSR to prevent hydration mismatches. The actual device is detected on the client after hydration.

### Issue: Detection not working

**Solution**: Ensure you're in a browser environment. Check `isBrowser` to verify. The hook requires `window` and `navigator` objects which are only available in the browser.

### Issue: Wrong device detected

**Solution**: Some devices may have unusual user agent strings. You can override detection by providing a custom `userAgent` option. For more accurate detection, consider using feature detection or CSS media queries in combination with this hook.

### Issue: Hydration mismatch warnings

**Solution**: The hook is designed to prevent hydration mismatches by using safe defaults on the server. If you're still seeing warnings, ensure you're not manually overriding the detection logic or using the hook in a way that causes different server/client behavior.
