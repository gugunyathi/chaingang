# Mobile swipe navigation

## Build

- Turn the mobile experience into four full-width horizontal screens: Timeline, Live Activity, Hash Order, and Settings.
- Support right/left touch swipes with snap-to-page behavior and keep vertical scrolling inside each screen.
- Add a fixed vertical icon rail on the right for Timeline, Activity, Queue, Wallet, and Settings, with clear active states and accessible labels.
- Keep the current desktop multi-column layout unchanged.
- Add a useful Settings screen containing notification, autoplay, sound, payment, and wallet controls using the existing visual style.

## Interaction details

- Tapping a rail icon moves directly to its screen; Wallet opens the wallet area in Settings.
- Swipe gestures ignore mostly vertical movement and only switch screens after a deliberate horizontal gesture.
- Mobile content reserves space for the icon rail and safe areas so controls are not covered.

## Verification

- Check the mobile layout at the current viewport and confirm swipe navigation, icon navigation, settings controls, and page indicators work.
- Confirm the desktop layout remains intact and review build/runtime diagnostics.
