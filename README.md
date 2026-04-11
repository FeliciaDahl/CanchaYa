# 🎾 CanchaYa | Padel Platform
> **The ultimate padel booking engine for the Argentinian market.** > Built for speed, dark mode aesthetics, and 10-second bookings.

---

## Overview
CanchaYa is a high-performance ecosystem designed to bridge the gap between players and padel clubs. By utilizing a **Single Codebase** approach, we deliver a seamless experience across all devices.

* **Mobile:** High-intensity booking app for players on the go.
* **Web:** Powerful management dashboard for facility owners and desktop users.
* **Core Goal:** Go from discovery to "Smash" (booking) in under 10 seconds.

---

## Tech Stack
| Layer | Tech |
| :--- | :--- |
| **Frontend** | React Native, React Native Web, TypeScript |
| **Backend** | NestJS (Node.js framework), TypeScript |
| **Database** | PostgreSQL + **PostGIS** (for location-based search) |
| **DevOps** | Docker, GitHub Actions |

---

##  Project Structure (Monorepo)
```bash
├── apps/
│   ├── mobile       # React Native mobile app (iOS/Android)
│   ├── web          # Web application (React Native Web)
│   └── api          # NestJS backend service
├── packages/
│   └── types        # Shared TypeScript interfaces & DTOs
├── docs/            # UX Manifests, API specs & Architecture
└── docker/          # Containerization & Environment config

---

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- Yarn >= 3.0.0
- Docker & Docker Compose
- Git

### Installation

1. **Install dependencies:**
   ```bash
   yarn install
   ```

2. **Set up environment variables:**
   ```bash
   cp apps/api/.env.example apps/api/.env
   # Edit .env with your configuration
   ```

3. **Start PostgreSQL:**
   ```bash
   docker-compose up -d
   ```

4. **Build the project:**
   ```bash
   yarn build
   ```

### Development

- **Start API in watch mode:**
  ```bash
  yarn workspace @canchaya/api dev
  ```

- **Start mobile app:**
  ```bash
  yarn workspace @canchaya/mobile dev
  ```

- **Start web app:**
  ```bash
  yarn workspace @canchaya/web dev
  ```

### Project Commands

- `yarn build` - Build all workspaces
- `yarn test` - Run tests across all workspaces
- `yarn lint` - Lint all workspaces
- `yarn dev` - Start development servers

---

## Git Workflow

1. Create feature branch: `git checkout -b feature/your-feature-name`
2. Make small, logical commits with clear messages
3. Push to branch: `git push origin feature/your-feature-name`
4. Create Pull Request for review and approval
5. Merge to main after approval

---

## Documentation

- `/docs/architecture.md` - System architecture overview
- `/docs/product.md` - Product requirements
- `/docs/rules.md` - Development rules
- `/docs/ux.md` - UX principles & guidelines