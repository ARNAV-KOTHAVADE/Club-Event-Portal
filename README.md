# Club Event Portal

A full-stack web app for discovering and registering for club events, built with React (Vite) and Firebase.

**Live app:** https://club-event-portal-sooty.vercel.app
**Repository:** https://github.com/ARNAV-KOTHAVADE/Club-Event-Portal

## Tech Stack Deviation

> **Note:** The original brief specified Next.js + Supabase. With confirmed flexibility from the task owner, this project uses **React (Vite) + Firebase** instead, since that stack was a better fit for my current skill level. All functional requirements (auth, event listing, gated registration, protected admin panel) are implemented equivalently:
>
> | Supabase concept | Firebase equivalent used here |
> |---|---|
> | Supabase Auth | Firebase Authentication (Email/Password) |
> | Postgres + Row Level Security | Firestore + Security Rules |
> | Next.js Server Actions / API routes | Client SDK calls guarded by Firestore Security Rules |
> | Next.js middleware for route protection | React Router + custom `AuthContext` / `ProtectedRoute` |

## Tech Stack

- **Frontend:** React 19 (Vite), React Router v7
- **Backend / Database:** Firebase (Authentication, Cloud Firestore)
- **Hosting:** Vercel
- **Styling:** Custom CSS

## Features Implemented

- Email/password signup and login (Firebase Authentication)
- Forgot Password flow (Firebase password reset email)
- Public event listing page — anyone can browse events without logging in
- Event detail page with a Register button
- **Access control:** unauthenticated users are redirected to login when attempting to register; this is enforced both in the UI and at the database level via Firestore Security Rules (a bypass attempt is rejected server-side, not just hidden client-side)
- Duplicate-registration prevention (deterministic `eventId_userId` document ID)
- Protected `/admin` route, restricted to accounts with `isAdmin: true`, showing all registrations across all events
- Role-based redirects: logged-out users → `/login`, logged-in non-admins → `/home`

## Database / Schema Overview

Firestore is a NoSQL document database; the schema below describes the collections and fields used.

**`users/{uid}`**
| Field | Type | Description |
|---|---|---|
| `email` | string | User's email |
| `isAdmin` | boolean | Grants access to `/admin` when `true` |
| `createdAt` | string (ISO) | Account creation timestamp |

**`events/{eventId}`**
| Field | Type | Description |
|---|---|---|
| `title` | string | Event name |
| `description` | string | Event details |
| `eventDate` | string | Date of the event |
| `location` | string | Venue |

**`registrations/{eventId_userId}`**
| Field | Type | Description |
|---|---|---|
| `eventId` | string | Reference to the event |
| `userId` | string | Reference to the registered user |
| `userEmail` | string | Denormalized for easy admin display |
| `registeredAt` | string (ISO) | Registration timestamp |

Registration documents use a deterministic ID (`{eventId}_{userId}`) so a user can't accidentally create duplicate registrations for the same event — writing again simply overwrites the same document.

### Security Rules (summary)

- `events`: publicly readable; writable only by admins.
- `registrations`: a user can only read their own registrations (admins can read all); a user can only create a registration where `userId` matches their own authenticated UID.
- `users`: readable by any logged-in user; a user can update their own profile but cannot self-promote `isAdmin` to `true` through the app.

Full rules are in the Firebase Console under Firestore → Rules for this project.

## Setup Instructions

1. Clone the repo:
   ```
   git clone https://github.com/ARNAV-KOTHAVADE/Club-Event-Portal.git
   cd Club-Event-Portal
   ```
2. Install dependencies:
   ```
   npm install
   ```
3. Create a `.env` file in the project root with your own Firebase project config:
   ```
   VITE_FIREBASE_API_KEY=your_key
   VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your_project_id
   VITE_FIREBASE_STORAGE_BUCKET=your_project.firebasestorage.app
   VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
   VITE_FIREBASE_APP_ID=your_app_id
   ```
4. In the Firebase Console for your project, enable **Authentication → Email/Password** and create a **Firestore Database**.
5. Run the dev server:
   ```
   npm run dev
   ```

## Deployment Notes

Deployed on Vercel with the same environment variables set under Project Settings → Environment Variables. A `vercel.json` rewrite rule routes all paths to `index.html` so client-side routing (React Router) works correctly on direct navigation and page refresh.

## Test Account

**Admin account** (view `/admin` to see all registrations):
```
Email: arnav1@gmail.com
Password: arnav2
```

Regular signup is also open — create any new account to test the standard user flow (browse events, register).

## External References

No external UI templates or component libraries were used; styling is custom CSS.