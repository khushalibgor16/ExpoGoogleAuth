# Expo Auth Example

A minimal [Expo](https://expo.dev) app demonstrating **Google Sign-In** using `expo-auth-session` and file-based routing with [Expo Router](https://docs.expo.dev/router/introduction).

## Features

- **Google OAuth** sign-in (Web, Android, iOS client IDs)
- **Auth context** – `AuthProviderWithGoogle` wraps the app and exposes `signIn`, `signOut`, and `user`
- **File-based routing** – index redirects to `/login`; login screen with “Sign in with Google”
- **User profile** – after sign-in, user `email`, `name`, and `picture` are fetched from Google’s userinfo API

## Project structure

```
expo-auth-example/
├── app/
│   ├── _layout.tsx      # Root layout; wraps app with AuthProviderWithGoogle
│   ├── index.tsx        # Redirects to /login
│   └── login.tsx        # Login screen with Google sign-in button
├── src/
│   ├── auth/
│   │   ├── AuthContext.tsx           # Auth context types (optional/reference)
│   │   └── AuthProviderWithGoogle.tsx # Google OAuth provider + useAuth hook
│   ├── components/
│   │   └── GoogleButton.tsx          # (placeholder)
│   └── hooks/
│       └── useAuth.ts                # (placeholder)
├── .env                # Google OAuth client IDs (see below)
├── app.json
└── package.json
```

## Prerequisites

- Node.js (LTS)
- npm or yarn
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (or use `npx expo`)
- For native builds: Xcode (iOS) and/or Android Studio (Android)

## Google Cloud / OAuth setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/).
2. Create or select a project.
3. Enable **Google+ API** (or **Google Identity**) and ensure **OAuth consent** is configured.
4. Under **APIs & Services → Credentials**, create OAuth 2.0 Client IDs:
   - **Web client** – for Expo web and development (e.g. “Web application”).
   - **Android client** – package name: `com.khushali.expoauth` (or match `app.json`).
   - **iOS client** – bundle ID: `com.khushali.expoauth` (or match `app.json`).
5. Copy each Client ID into your `.env` (see below).

## Environment variables

Create a `.env` file in the project root (do **not** commit real production secrets; use `.env.example` for a template):

```env
EXPO_PUBLIC_GOOGLE_WEB_CLIENT_ID=your-web-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_ANDROID_CLIENT_ID=your-android-client-id.apps.googleusercontent.com
EXPO_PUBLIC_GOOGLE_IOS_CLIENT_ID=your-ios-client-id.apps.googleusercontent.com
```

- Names must start with `EXPO_PUBLIC_` to be available in the app.
- Restart the dev server after changing `.env`.

## Get started

1. **Install dependencies**

   ```bash
   npm install
   ```

2. **Configure environment**

   - Copy or create `.env` with your Google OAuth client IDs (see above).

3. **Start the app**

   ```bash
   npx expo start
   ```

   Then choose:

   - [Development build](https://docs.expo.dev/develop/development-builds/introduction/) (recommended for full native modules)
   - [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
   - [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
   - [Expo Go](https://expo.dev/go) (may have limitations with custom native auth flows)

## Scripts

| Command | Description |
|--------|-------------|
| `npm start` | Start Expo dev server |
| `npm run android` | Run on Android (`expo run:android`) |
| `npm run ios` | Run on iOS (`expo run:ios`) |
| `npm run web` | Start for web (`expo start --web`) |
| `npm run lint` | Run ESLint |
| `npm run reset-project` | Move starter code to `app-example` and create blank `app/` |

## Key implementation details

- **Auth provider** (`src/auth/AuthProviderWithGoogle.tsx`): Uses `expo-auth-session/providers/google` with `useAuthRequest`; on success, exchanges the access token for user info via `https://www.googleapis.com/userinfo/v2/me`.
- **`useAuth()`**: Returns `{ user, signIn, signOut, isLoading }`; must be used inside `AuthProviderWithGoogle`.
- **Routing**: Root layout wraps the app in `AuthProviderWithGoogle`; index redirects to `/login`. You can add protected routes that check `user` and redirect to `/login` when null.

## App config (app.json)

- **Scheme**: `expoauthexample` (used for OAuth redirects).
- **Bundle ID (iOS)**: `com.khushali.expoauth`.
- **Package (Android)**: `com.khushali.expoauth`.
- **Plugins**: `expo-router`, `expo-splash-screen`, `expo-web-browser`.

Ensure these match the client IDs configured in Google Cloud and in `.env`.

## Learn more

- [Expo documentation](https://docs.expo.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction)
- [expo-auth-session](https://docs.expo.dev/versions/latest/sdk/auth-session/)
- [Expo community](https://chat.expo.dev)
