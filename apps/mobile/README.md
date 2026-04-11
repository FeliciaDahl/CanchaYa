# CanchaYa Mobile App

React Native + Expo mobile application for discovering and booking padel courts in Argentina.

## Phase 5 - Mobile App (In Progress)

### Current Status: Phase 5.1 - Project Setup ✅ Complete

The mobile app infrastructure is now fully set up with:

✅ **Project Structure**
- Expo + React Native configured
- TypeScript support
- Redux state management
- Navigation (React Navigation)
- Dark theme UI
- Service layer for API calls
- WebSocket integration ready

✅ **Core Infrastructure**
- Authentication service
- API client with interceptors
- Geolocation service
- Courts discovery service
- Bookings management service
- Real-time WebSocket service

✅ **Utilities & Helpers**
- Form validators
- Format utilities (dates, prices, distances)
- Theme configuration (dark mode)
- Constants and configuration

### Directory Structure

```
src/
├── screens/           # UI Screens (organized by feature)
│   ├── auth/         # Login, Register, ForgotPassword
│   ├── discovery/    # Court discovery and search
│   ├── booking/      # Booking flow screens
│   └── bookings/     # My bookings management
├── components/       # Reusable components
├── services/         # API & business logic
│   ├── api.ts
│   ├── auth.service.ts
│   ├── courts.service.ts
│   ├── bookings.service.ts
│   ├── geolocation.service.ts
│   └── websocket.service.ts
├── redux/           # State management
│   ├── slices/
│   │   ├── authSlice.ts
│   │   ├── courtsSlice.ts
│   │   └── bookingsSlice.ts
│   └── store.ts
├── navigation/      # Navigation configuration
├── theme/          # Dark theme
├── utils/          # Utilities and helpers
├── types/          # TypeScript types
├── hooks/          # Custom React hooks
└── App.tsx         # Main app component
```

## Getting Started

### 1. Install Dependencies

```bash
cd C:\Projects\CanchaYa
yarn install
```

### 2. Set up Environment

```bash
cp apps/mobile/.env.example apps/mobile/.env
# Edit .env with your API configuration
```

### 3. Start Development Server

```bash
yarn workspace @canchaya/mobile dev
```

This will open Expo CLI. You can then:
- Press `i` to open iOS simulator
- Press `a` to open Android emulator
- Scan QR code with Expo Go app on your phone

### 4. Available Commands

```bash
# Start development
yarn workspace @canchaya/mobile dev

# Build for specific platform
yarn workspace @canchaya/mobile build:android
yarn workspace @canchaya/mobile build:ios

# Run tests
yarn workspace @canchaya/mobile test

# Type check
yarn workspace @canchaya/mobile type-check

# Lint
yarn workspace @canchaya/mobile lint
```

## Next Phases

### Phase 5.2: Authentication & Onboarding
- Login screen
- Registration screen
- Password reset
- JWT token management
- Profile setup onboarding

### Phase 5.3: Discovery & Search
- Nearby courts search
- Facility listing
- Facility details
- Favorites management

### Phase 5.4: Booking Flow
- Time slot selection
- Booking review
- Booking confirmation
- Receipt display

### Phase 5.5: My Bookings
- Upcoming bookings
- Past bookings
- Booking details
- Cancellation

### Phase 5.6-5.10: Real-time, UI/UX, Notifications, Testing, Deployment

## Architecture

### API Integration
- Axios HTTP client with JWT interceptors
- Automatic token refresh on 401
- Request/response interceptors

### State Management
- Redux Toolkit for global state
- Slices: Auth, Courts, Bookings
- Async thunk actions for API calls

### Real-Time Updates
- Socket.IO WebSocket client
- Room-based subscriptions
- Event listeners for availability and bookings

### Services Layer
- `auth.service.ts` - Authentication endpoints
- `courts.service.ts` - Courts/facilities discovery
- `bookings.service.ts` - Booking management
- `geolocation.service.ts` - Location tracking
- `websocket.service.ts` - Real-time updates

## Notes

- Dark mode is the default theme
- Accessibility is built in from the start
- All screens follow Material Design 3 principles
- TypeScript strict mode enabled
- Shared types from `@canchaya/types` package