# Mobile Testing - Playwright Emulation

## Overview
Mobile testing menggunakan **Playwright Device Emulation** untuk simulasi berbagai device mobile tanpa emulator berat.

## Devices Tested

| Device | Viewport | Type |
|--------|----------|------|
| iPhone 13 | 390x844 | iOS Mobile |
| Pixel 5 | 915x823 | Android Mobile |
| iPad Air | 820x1180 | iOS Tablet |

## Responsive Breakpoints

| Breakpoint | Width | Test Coverage |
|------------|-------|---------------|
| Mobile Small | 320px | ✅ |
| Mobile Medium | 375px | ✅ |
| Mobile Large | 414px | ✅ |
| Tablet | 768px | ✅ |
| Desktop Small | 1024px | ✅ |
| Desktop Large | 1920px | ✅ |

## Test Scenarios

| # | Test Case | Status |
|---|-----------|--------|
| 1 | Mobile Login (per device) | ✅ |
| 2 | Mobile Navigation (per device) | ✅ |
| 3 | Mobile Touch Interaction (per device) | ✅ |
| 4 | Mobile Viewport Validation (per device) | ✅ |
| 5 | Responsive Breakpoint Tests (6 viewports) | ✅ |

## How to Run

```bash
# Run mobile tests
npx playwright test 04-Mobile-Testing/tests/

# Run specific device
npx playwright test --grep "iPhone 13"

# Run responsive tests
npx playwright test --grep "Responsive"
```

## Why Playwright Emulation?

| Aspect | Benefit |
|--------|---------|
| Performance | Zero overhead, no emulator RAM usage |
| Speed | Tests run in seconds |
| CI/CD | Works in any CI environment |
| Coverage | Supports 100+ device profiles |
| Touch | Simulates tap, swipe, pinch gestures |

## Notes
- Touch events diaktifkan via `hasTouch: true` dalam device config
- Viewport otomatis sesuai device profile
- User agent otomatis ter-set sesuai device
