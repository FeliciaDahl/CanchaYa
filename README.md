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