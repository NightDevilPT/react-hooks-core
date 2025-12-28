# useOnline

Detects and monitors the user's online/offline network status in real-time using the browser's `navigator.onLine` API and network events. This hook provides a simple boolean value that updates automatically when the network connection is lost or restored.

## Description & Use Cases

**Problem it solves**: Modern web applications need to handle network connectivity changes gracefully. Users may lose internet connection while using your app, and you need to detect this to show offline indicators, save drafts, pause data syncing, or provide offline functionality.

**Use cases**:
- Show offline/online status indicators
- Auto-save drafts when going offline
- Pause/resume data polling based on connectivity
- Disable/enable features that require network
- Sync data when connection is restored
- Show appropriate error messages for network issues

**Benefits**:
- Real-time network status updates
- Simple boolean API
- SSR-compatible with safe defaults
- Automatic event listener management
- No memory leaks

**When to use**: Use this hook whenever you need to react to network connectivity changes, show offline indicators, or conditionally enable/disable network-dependent features.

## Quick Example

```typescript
import { useOnline } from 'react-hookify/browser'

function App() {
  const isOnline = useOnline()
  
  if (!isOnline) {
    return <OfflineBanner />
  }
  
  return <MainApp />
}
```

## Signature

```typescript
function useOnline(options?: UseOnlineOptions): boolean
```

## Parameters

### options (optional)

An object with the following properties:

#### `onChange` (function, optional)

- **Type**: `(isOnline: boolean) => void`
- **Description**: Callback function that is invoked whenever the online/offline status changes. This fires immediately when the network connection is lost or restored.
- **Parameter**: 
  - `isOnline`: `true` when connection is restored, `false` when connection is lost
- **When to use**: Use this to react to network changes in real-time, such as:
  - Saving drafts when going offline
  - Syncing data when coming back online
  - Showing/hiding offline indicators
  - Pausing/resuming background tasks
  - Sending analytics events
- **Example**: 
  ```typescript
  onChange: (isOnline) => {
    if (!isOnline) {
      saveDraft()
      showOfflineBanner()
    } else {
      syncData()
      hideOfflineBanner()
    }
  }
  ```

## Return Value

Returns a `boolean` value:

- **Type**: `boolean`
- **Description**: Indicates the current network connectivity status of the device.
- **Values**: 
  - `true`: Device is online and has network connectivity
  - `false`: Device is offline or has lost network connectivity
- **Default**: `true` during SSR (safe default for server-side rendering)
- **Updates**: Changes automatically when:
  - Network connection is lost (switches to `false`)
  - Network connection is restored (switches to `true`)
  - Browser's `navigator.onLine` property changes
- **When to use**: Use this boolean directly in conditional rendering, to enable/disable features, or to determine if network-dependent operations should proceed. The value updates automatically when connectivity changes.

## SSR / Next.js Compatibility

The hook is fully compatible with Next.js and server-side rendering:

- **Server-side**: Returns `true` as a safe default (assumes online)
- **Client-side**: Automatically detects actual network status on hydration
- **Hydration**: No hydration mismatches occur because the hook uses a safe default on the server
- **No configuration needed**: Works out of the box with Next.js App Router and Pages Router

The hook automatically sets up event listeners only in the browser and cleans them up on unmount.

## Common Patterns

### Offline Indicator

```typescript
function NetworkStatus() {
  const isOnline = useOnline()
  
  return (
    <div>
      {!isOnline && (
        <div className="offline-banner">
          You're offline. Some features may be unavailable.
        </div>
      )}
    </div>
  )
}
```

### Auto-Save on Offline

```typescript
function Editor() {
  const isOnline = useOnline({
    onChange: (online) => {
      if (!online) {
        // Auto-save draft when going offline
        saveDraftToLocalStorage()
      }
    }
  })
  
  return <TextEditor />
}
```

### Conditional Data Fetching

```typescript
function DataComponent() {
  const isOnline = useOnline()
  
  useEffect(() => {
    if (isOnline) {
      fetchData()
    }
  }, [isOnline])
  
  if (!isOnline) {
    return <div>Waiting for connection...</div>
  }
  
  return <DataDisplay />
}
```

### Sync on Reconnect

```typescript
function App() {
  const isOnline = useOnline({
    onChange: (online) => {
      if (online) {
        // Sync data when back online
        syncPendingChanges()
      }
    }
  })
  
  return <MainApp />
}
```

## Browser Compatibility

Uses the standard `navigator.onLine` API and `online`/`offline` events, which are supported in all modern browsers:

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Legacy browsers**: Full support (IE9+)
- **Mobile browsers**: Full support
- **No polyfills required**: Uses native browser APIs

**Note**: The `navigator.onLine` property may not always accurately reflect the actual network connectivity (e.g., connected to WiFi but no internet). However, it's the best available API for detecting network status.

## Performance Notes

- **Event-driven**: Uses native browser events (`online`/`offline`), not polling
- **Automatic cleanup**: Event listeners are automatically removed on unmount
- **No memory leaks**: Properly cleans up all event listeners
- **Minimal overhead**: Single event listener per hook instance
- **Fast updates**: Status changes are detected immediately via browser events

The hook only sets up event listeners when running in the browser, ensuring zero overhead during SSR.

## Troubleshooting

### Issue: Always shows online even when offline

**Solution**: The `navigator.onLine` property may not always be accurate. It only detects if the device is connected to a network, not if there's actual internet connectivity. For more accurate detection, you may need to implement a ping-based check.

### Issue: onChange not firing

**Solution**: Ensure the component stays mounted. The event listeners are only active while the component is mounted. Also verify that you're testing in a browser environment (not SSR).

### Issue: Works in development but not production

**Solution**: Ensure your production environment properly handles the `online`/`offline` events. Some hosting environments or service workers may interfere with these events.

### Issue: SSR returns true but should be false

**Solution**: This is expected behavior. The hook returns `true` during SSR as a safe default. The actual network status is detected on the client after hydration. If you need different SSR behavior, you can check `typeof window !== 'undefined'` before using the hook.
