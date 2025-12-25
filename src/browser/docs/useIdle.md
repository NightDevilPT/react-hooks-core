# useIdle

Detects when the user has been inactive (idle) for a specified period of time by monitoring DOM events. This hook is useful for implementing auto-logout, pausing animations, stopping data polling, or showing idle warnings.

## Description & Use Cases

**Problem it solves**: Many applications need to detect user inactivity to implement security features (auto-logout), optimize performance (pause animations), or improve user experience (show "are you still there?" prompts). Manually tracking all user interactions is complex and error-prone.

**Use cases**:
- Auto-logout after inactivity (security)
- Pause animations or videos when idle
- Stop data polling to save resources
- Show idle warnings or prompts
- Save application state when user becomes idle
- Resume operations when user returns

**Benefits**:
- Configurable timeout period
- Customizable event tracking
- Automatic cleanup on unmount
- SSR-compatible
- Callback support for idle/active transitions

**When to use**: Use this hook when you need to detect user inactivity for security, performance optimization, or UX improvements. Perfect for SaaS applications, dashboards, or any app that needs to react to user activity.

## Quick Example

```typescript
import { useIdle } from 'react-hookify/browser'

function App() {
  const isIdle = useIdle(300000) // 5 minutes
  
  if (isIdle) {
    return <div>You seem idle. Still there?</div>
  }
  
  return <MainApp />
}
```

## Signature

```typescript
function useIdle(timeout: number, options?: UseIdleOptions): boolean
```

## Parameters

### timeout (required)

- **Type**: `number`
- **Description**: Idle timeout in milliseconds. The user is considered idle if no tracked events occur within this time period.
- **Range**: Positive number (recommended: 1000-3600000 ms)
- **Example**: `300000` for 5 minutes, `600000` for 10 minutes
- **When to use**: 
  - Short timeouts (1-5 minutes) for security-sensitive applications
  - Medium timeouts (5-15 minutes) for general inactivity detection
  - Long timeouts (15-60 minutes) for less aggressive detection

### options (optional)

An object with the following properties:

#### `events` (string[], optional)

- **Type**: `string[]`
- **Default**: `['mousemove', 'mousedown', 'keydown', 'touchstart', 'scroll']`
- **Description**: Array of DOM event names to monitor for user activity. Any of these events will reset the idle timer.
- **Common events**: 
  - Mouse: `'mousemove'`, `'mousedown'`, `'mouseup'`, `'click'`
  - Keyboard: `'keydown'`, `'keyup'`, `'keypress'`
  - Touch: `'touchstart'`, `'touchmove'`, `'touchend'`
  - Scroll: `'scroll'`, `'wheel'`
  - Focus: `'focus'`, `'blur'`
- **When to use**: 
  - Add more events if you want to track additional user interactions
  - Remove events if you want to ignore certain interactions (e.g., ignore scroll for video players)
  - Use minimal events for better performance if you only care about specific interactions
- **Example**: 
  ```typescript
  events: ['click', 'keydown', 'touchstart'] // Only track clicks, keys, and touches
  ```

#### `initialState` (boolean, optional)

- **Type**: `boolean`
- **Default**: `false`
- **Description**: The initial idle state when the hook first mounts. When `true`, the user is considered idle immediately. When `false`, the user is considered active until the timeout period passes with no activity.
- **Values**: 
  - `true`: Start in idle state (user considered idle immediately)
  - `false`: Start in active state (default, user considered active)
- **When to use**: 
  - Set to `true` if you want to show idle UI immediately on mount
  - Keep as `false` (default) for most use cases where you want to detect actual inactivity
- **Note**: The timer still runs regardless of initial state, so if the user is active, it will switch to active state immediately.

#### `onIdle` (function, optional)

- **Type**: `() => void`
- **Description**: Callback function invoked when the user becomes idle (no activity detected for the specified timeout period). This fires once when the idle threshold is crossed.
- **When to use**: Use this to perform actions when the user becomes idle, such as:
  - Pausing animations or videos
  - Stopping data polling
  - Saving application state
  - Showing idle warnings
  - Logging out users (for security)
- **Example**: 
  ```typescript
  onIdle: () => {
    pauseVideo()
    stopPolling()
    saveDraft()
  }
  ```

#### `onActive` (function, optional)

- **Type**: `() => void`
- **Description**: Callback function invoked when the user becomes active again after being idle. This fires when any tracked event occurs after the user was idle.
- **When to use**: Use this to resume operations when the user returns, such as:
  - Resuming animations or videos
  - Restarting data polling
  - Hiding idle warnings
  - Refreshing data
- **Example**: 
  ```typescript
  onActive: () => {
    resumeVideo()
    startPolling()
    refreshData()
  }
  ```

## Return Value

Returns a `boolean` value:

- **Type**: `boolean`
- **Description**: Indicates whether the user is currently idle (no activity detected for the specified timeout period).
- **Values**: 
  - `true`: User is idle (no activity for the timeout duration)
  - `false`: User is active (activity detected within the timeout period)
- **Default**: `false` during SSR (user considered active on server)
- **Updates**: Changes automatically when:
  - User becomes idle: switches to `true` after timeout with no activity
  - User becomes active: switches to `false` immediately when any tracked event occurs
- **When to use**: Use this boolean directly in conditional rendering, to enable/disable features, or to trigger side effects when idle state changes. The value updates in real-time as user activity is detected or times out.

## SSR / Next.js Compatibility

The hook is fully compatible with Next.js and server-side rendering:

- **Server-side**: Returns `false` (user considered active) as a safe default
- **Client-side**: Automatically sets up event listeners on hydration
- **Hydration**: No hydration mismatches occur because the hook uses a safe default on the server
- **No configuration needed**: Works out of the box with Next.js App Router and Pages Router

Event listeners are only set up in the browser and are automatically cleaned up on unmount.

## Common Patterns

### Auto-Logout After Inactivity

```typescript
function SecureApp() {
  const isIdle = useIdle(600000, { // 10 minutes
    onIdle: () => {
      logout()
      router.push('/login')
    }
  })
  
  return <Dashboard />
}
```

### Pause Operations When Idle

```typescript
function DataPolling() {
  const isIdle = useIdle(120000) // 2 minutes
  
  useEffect(() => {
    if (isIdle) {
      stopPolling()
    } else {
      startPolling()
    }
  }, [isIdle])
  
  return <LiveData />
}
```

### Show Idle Warning Modal

```typescript
function SessionManager() {
  const isIdle = useIdle(240000) // 4 minutes
  const [showWarning, setShowWarning] = useState(false)
  
  useEffect(() => {
    if (isIdle) {
      setShowWarning(true)
    }
  }, [isIdle])
  
  if (showWarning) {
    return (
      <Modal>
        <p>You'll be logged out due to inactivity</p>
        <button onClick={() => setShowWarning(false)}>
          I'm still here
        </button>
      </Modal>
    )
  }
  
  return <App />
}
```

### Custom Event Tracking

```typescript
function CustomTracking() {
  const isIdle = useIdle(60000, {
    events: ['click', 'touchstart', 'keypress']
  })
  
  return (
    <div>
      Status: {isIdle ? 'Idle' : 'Active'}
    </div>
  )
}
```

## Browser Compatibility

Works in all modern browsers that support DOM events:

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Legacy browsers**: Full support (IE9+)
- **Mobile browsers**: Full support
- **No polyfills required**: Uses standard DOM event APIs

The hook uses standard event listeners (`addEventListener`/`removeEventListener`) which are available in all browsers.

## Performance Notes

- **Event-driven**: Uses throttled event listeners for optimal performance
- **Automatic cleanup**: Timers and event listeners are automatically cleaned up on unmount
- **No memory leaks**: Proper cleanup ensures no lingering listeners or timers
- **Efficient**: Only tracks events you specify, minimizing overhead
- **Throttled**: Event handlers are throttled to prevent excessive timer resets

The hook is designed to be lightweight and performant, even with frequent user activity. Event listeners are only active in the browser, ensuring zero overhead during SSR.

## Troubleshooting

### Issue: Timer not resetting on activity

**Solution**: Ensure the events you're tracking are actually firing. Check that the events array includes the events you expect. Some events may not fire in certain contexts (e.g., scroll events in iframes).

### Issue: Always shows idle immediately

**Solution**: Check your `initialState` option. If set to `true`, the hook starts in idle state. Also verify that your timeout value is reasonable (not too short).

### Issue: Not detecting activity

**Solution**: Verify that the events you're tracking are actually occurring. You can add more events to the `events` array or check the browser console for any errors.

### Issue: Memory leaks or performance issues

**Solution**: The hook automatically cleans up all event listeners and timers on unmount. If you're experiencing issues, ensure the component using the hook is properly unmounting and not being recreated unnecessarily.
