# useMediaQuery

Listens to CSS media queries and returns the current match status in real-time. This hook provides a reactive way to respond to viewport changes, system preferences, and device capabilities using the browser's native `matchMedia` API.

## Description & Use Cases

**Problem it solves**: While CSS media queries are great for styling, you often need to conditionally render components, load different data, or adjust JavaScript behavior based on viewport size, system preferences, or device capabilities. This hook bridges the gap between CSS and JavaScript.

**Use cases**:
- Responsive component rendering (mobile/tablet/desktop)
- Dark mode detection and theme switching
- Orientation-based layouts
- Accessibility feature detection (reduced motion, high contrast)
- Conditional feature loading based on viewport
- Print mode detection

**Benefits**:
- Real-time updates on viewport changes
- Supports all CSS media query features
- SSR-compatible with configurable defaults
- Event-driven (no polling)
- TypeScript support

**When to use**: Use this hook when you need JavaScript logic to respond to media query changes. For pure styling, use CSS media queries. For device type detection, consider `useDeviceDetect`.

## Quick Example

```typescript
import { useMediaQuery } from 'react-hookify/browser'

function Navigation() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  
  return (
    <>
      {isMobile ? <HamburgerMenu /> : <FullNavigation />}
    </>
  )
}
```

## Signature

```typescript
function useMediaQuery(query: string, options?: UseMediaQueryOptions): boolean
```

## Parameters

### query (required)

- **Type**: `string`
- **Description**: CSS media query string to match against. Must be a valid CSS media query.
- **Examples**: 
  - `'(max-width: 768px)'` - Viewport width
  - `'(prefers-color-scheme: dark)'` - System theme preference
  - `'(orientation: landscape)'` - Device orientation
  - `'(hover: hover)'` - Input capability
- **When to use**: Use standard CSS media query syntax. The query is passed directly to `window.matchMedia()`.
- **Note**: Include parentheses in the query string as shown in examples.

### options (optional)

An object with the following properties:

#### `defaultValue` (boolean, optional)

- **Type**: `boolean`
- **Default**: `false`
- **Description**: The value to return during server-side rendering (SSR) or when `window.matchMedia` is not available. This prevents hydration mismatches in Next.js and provides a safe fallback.
- **Values**: 
  - `true`: Assume the media query matches during SSR
  - `false`: Assume the media query does not match during SSR (default)
- **When to use**: 
  - Set to `true` if you want to assume mobile/tablet during SSR (prevents layout shift from desktop to mobile)
  - Set to `false` (default) if you want to assume desktop during SSR (common pattern)
  - Choose based on your most common user device to minimize layout shifts
- **Note**: This only affects the initial render. Once the component hydrates on the client, the actual media query result takes over.

#### `onChange` (function, optional)

- **Type**: `(matches: boolean) => void`
- **Description**: Callback function invoked whenever the media query match state changes (e.g., when window is resized, orientation changes, or system preferences change).
- **Parameter**: 
  - `matches`: `true` if the media query now matches, `false` if it no longer matches
- **When to use**: Use this to react to media query changes in real-time, such as:
  - Sending analytics when breakpoints change
  - Adjusting layout or features dynamically
  - Logging responsive design changes
  - Triggering side effects based on viewport changes
- **Example**: 
  ```typescript
  onChange: (matches) => {
    if (matches) {
      console.log('Now in mobile view')
      analytics.track('view_mobile')
    } else {
      console.log('Now in desktop view')
      analytics.track('view_desktop')
    }
  }
  ```

## Return Value

Returns a `boolean` value:

- **Type**: `boolean`
- **Description**: Indicates whether the specified CSS media query currently matches the viewport/device state.
- **Values**: 
  - `true`: Media query matches (e.g., viewport is below 768px for `(max-width: 768px)`)
  - `false`: Media query does not match (e.g., viewport is above 768px)
- **Default**: `defaultValue` (default: `false`) during SSR or when API is unavailable
- **Updates**: Changes automatically when:
  - Window is resized
  - Device orientation changes
  - System preferences change (e.g., dark mode, reduced motion)
  - Any condition the media query monitors changes
- **When to use**: Use this boolean directly in conditional rendering, to enable/disable features, or to apply different styles based on viewport/device conditions. The value updates in real-time as conditions change.

## SSR / Next.js Compatibility

The hook is fully compatible with Next.js and server-side rendering:

- **Server-side**: Returns `defaultValue` (default: `false`) during SSR
- **Client-side**: Automatically syncs with actual viewport on hydration
- **Hydration**: No hydration mismatches occur when using appropriate `defaultValue`
- **No configuration needed**: Works out of the box with Next.js App Router and Pages Router

The hook uses the `defaultValue` option to provide consistent server/client rendering and prevent layout shifts.

## Common Patterns

### Responsive Component Rendering

```typescript
function ResponsiveLayout() {
  const isMobile = useMediaQuery('(max-width: 640px)')
  const isTablet = useMediaQuery('(min-width: 641px) and (max-width: 1024px)')
  const isDesktop = useMediaQuery('(min-width: 1025px)')
  
  if (isMobile) return <MobileLayout />
  if (isTablet) return <TabletLayout />
  return <DesktopLayout />
}
```

### Dark Mode Detection

```typescript
function App() {
  const prefersDark = useMediaQuery('(prefers-color-scheme: dark)')
  
  return (
    <div className={prefersDark ? 'dark' : 'light'}>
      <Content />
    </div>
  )
}
```

### Accessibility - Reduced Motion

```typescript
function AnimatedComponent() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)')
  
  return (
    <div 
      className={prefersReducedMotion ? 'no-animation' : 'animated'}
    >
      <Content />
    </div>
  )
}
```

### Orientation Detection

```typescript
function VideoPlayer() {
  const isLandscape = useMediaQuery('(orientation: landscape)')
  
  return (
    <video 
      className={isLandscape ? 'fullscreen' : 'portrait'}
    />
  )
}
```

### Conditional Data Loading

```typescript
function ImageGallery() {
  const isMobile = useMediaQuery('(max-width: 768px)')
  const isLowBandwidth = useMediaQuery('(prefers-reduced-data: reduce)')
  
  const imageQuality = isMobile || isLowBandwidth ? 'low' : 'high'
  const imageCount = isMobile ? 6 : 20
  
  return <Gallery quality={imageQuality} limit={imageCount} />
}
```

## Browser Compatibility

Uses the standard `window.matchMedia()` API with fallback support for older browsers:

- **Modern browsers**: Full support (Chrome, Firefox, Safari, Edge)
- **Legacy browsers**: Full support with fallback (IE10+)
- **Mobile browsers**: Full support
- **Event listeners**: Uses `addEventListener`/`removeEventListener` in modern browsers, falls back to `addListener`/`removeListener` in legacy browsers

The hook automatically handles browser differences and provides consistent behavior across all supported browsers.

## Performance Notes

- **Event-driven**: Uses native browser API (very efficient)
- **No polling**: Updates only when media query state actually changes
- **Automatic cleanup**: Event listeners are automatically removed on unmount
- **Multiple queries**: Each query creates a separate listener (no performance penalty)
- **Lightweight**: Minimal overhead, uses native browser capabilities

The hook is designed to be performant even with multiple media queries. Each query instance manages its own event listener independently.

## Troubleshooting

### Issue: Always returns defaultValue

**Solution**: Ensure you're testing in a browser environment. The hook returns `defaultValue` during SSR or when `window.matchMedia` is unavailable. Check that the media query syntax is correct and that you're testing in a real browser.

### Issue: Not updating on resize

**Solution**: Verify that your media query is correct and that the viewport is actually changing. Some media queries (like `prefers-color-scheme`) don't change on resize but change when system preferences change.

### Issue: Hydration mismatch

**Solution**: Adjust the `defaultValue` option to match your most common user device. If most users are on mobile, set `defaultValue: true` for mobile queries. This prevents layout shifts during hydration.

### Issue: Query not matching when it should

**Solution**: Check your media query syntax. Ensure parentheses are included and the query is valid CSS. Test the query directly in browser DevTools to verify it works.
