# Codex Context Checkpoint

## Current Goal

Build a secure one-to-one realtime chat application in learning-sized steps. Authentication, credentialed CORS, and Vite initialization are complete; the immediate objective is to build the client API layer and authentication interface before later friend/message backend phases.

## Current Task

Display auth state in `App.jsx`: read `user` and `loading` from `AuthContext` and conditionally show loading, logged-in, or logged-out screen.

## Completed Tasks

- [x] Created the root Express server and JSON middleware.
- [x] Connected the server to local MongoDB through Mongoose.
- [x] Created the User schema with name, unique normalized username, hidden password hash, profile picture, last seen, and timestamps.
- [x] Implemented `POST /api/auth/register` with type/empty checks, password limits, username conflict handling, bcrypt hashing, and a public user response.
- [x] Implemented `GET /api/auth/check-username` with normalization, format validation, and availability response.
- [x] Implemented `POST /api/auth/login` with normalized lookup, explicit password-hash selection, bcrypt comparison, and generic invalid-credential errors.
- [x] Manually tested the registration sample data, username availability, and login flow successfully.
- [x] Installed `jsonwebtoken` and `cookie-parser` for the next authentication milestone.
- [x] Configured `cookie-parser` in `server/server.js` before the authentication routes.
- [x] Created the persistent project-memory files: `AGENTS.md`, `README.md`, and `CODEX_CONTEXT.md`.
- [x] Generate and verify JWTs.
- [x] Establish persistent HTTP-only cookie sessions during registration and login.
- [x] Add JWT cookie authentication middleware.
- [x] Add protected current-user endpoint.
- [x] Add logout endpoint and cookie-clearing helper.
- [x] Runtime-test login, `/me`, logout, and post-logout rejection.
- [x] Initialize and verify the Vite React client.
- [x] Configure and runtime-verify exact-origin credentialed CORS.
- [x] Implement the reusable client API helper with endpoint/options support, credentialed requests, JSON/FormData handling, safe response parsing, and structured HTTP errors.
- [x] Created `AuthContext`, `AuthProvider`, and wrapped `<App />` with the provider in `main.jsx`.
- [x] Added `useEffect` session restoration inside `AuthProvider` using `apiClient("/api/auth/me")`, with success, `401`, error, and `finally` loading handling.
- [x] Runtime-tested browser session restoration: login created the `token` cookie, and refresh produced `GET /api/auth/me` with `200`.
- [x] Added meaningful comments across auth flow; removed debug lines.

## Current Position

- Current folder: `client/src/`.
- Current setup: CORS runtime verification passed for a normal request and login preflight. The reusable client API helper is integrated into `AuthProvider`, and browser session restoration has been confirmed with a `200` response after login.
- The Vite React client is initialized. Its default starter screen remains in `client/src/App.jsx`; this is the next file to replace with authentication UI.
- `jsonwebtoken` and `cookie-parser` are installed, and `server/.env` contains the authentication configuration keys.
- Completed helper: `generateToken(userId)` returns a JWT containing the string form of the MongoDB user ID, signed with `JWT_SECRET` and expiring according to `JWT_EXPIRES_IN`.
- Completed and committed: registration and login generate tokens from the correct user IDs and set the one-day HTTP-only `token` cookie through a reusable helper.
- Completed middleware: `authenticate` rejects missing/invalid/expired tokens, loads the public user, attaches it to `req.user`, and calls `next()`.
- Authentication backend is complete and lifecycle-tested.
- Client position: Vite React is installed and verified. `client/src/context/AuthContext.js` and `client/src/context/AuthProvider.jsx` exist, `main.jsx` wraps `<App />` in `AuthProvider`, and `AuthProvider` now restores the session with an inner async function in `useEffect`.

## Last Completed Step

## Last Completed Step

Browser runtime verification complete: after login, the token cookie persists; after refresh, `GET /api/auth/me` returns `200`; `AuthProvider` loads the user into React state. Added meaningful comments and removed debug lines.

## Next Step

Build `App.jsx` to read `user` and `loading` from `AuthContext` and display a loading message, the logged-in user's name and username, or a simple logged-out screen.

## Pending Tasks

1. Create an auth-aware React screen that displays loading, logged-in, and logged-out states.
2. Create registration/login forms.
3. Add validated profile-picture upload.
4. Add friend request/invitation models and protected endpoints.
5. Add one-to-one conversation and message models plus authorized REST endpoints and pagination.
6. Add Socket.IO authentication and realtime stored-message delivery.
7. Add multi-tab online presence, green-dot updates, and final-disconnect `lastSeen` handling.
8. Build the responsive WhatsApp-style chat interface.
9. Add automated tests, security hardening, and deployment configuration.

## Important Files

- `server/server.js` - Express setup, JSON and cookie parsing middleware, MongoDB startup, `/api/auth` mount, and HTTP listener.
- `server/controllers/authController.js` - contains registration, username availability, login, current-user, and logout handlers.
- `server/models/User.js` - owns the User schema, unique username rule, exported username regex, hidden password hash, profile picture, and last seen.
- `server/routes/authRoutes.js` - maps the five existing authentication endpoints to their controllers and authentication middleware where required.
- `server/utils/generateToken.js` - completed JWT-signing helper; returns a token containing the string user ID and configured expiry.
- `server/utils/setAuthCookie.js` - creates and clears the HTTP-only authentication cookie using matching options.
- `server/middleware/authenticate.js` - verifies the JWT cookie, loads the public user, and attaches it to `req.user`.
- `server/config/database.js` - connects Mongoose using `MONGODB_URL`.
- `server/package.json` - ES-module configuration, scripts, and installed dependencies.
- `server/.env` - ignored local environment values. Known keys: `PORT`, `MONGODB_URL`, `JWT_SECRET`, and `JWT_EXPIRES_IN`; never copy values into documentation or commits.
- `testing.js` - ignored manual fetch script used for authentication lifecycle checks.
- `client/src/api/apiClient.js` - completed reusable Fetch helper; the next task will integrate it with React authentication state.
- `client/src/context/AuthContext.js` - creates the shared authentication context.
- `client/src/context/AuthProvider.jsx` - owns `user` and `loading` state and restores the session through `/api/auth/me`.
- `client/src/main.jsx` - wraps `<App />` in `AuthProvider`.
- `client/src/App.jsx` - Vite starter interface; next task is replacing it with an auth-aware screen.
- `client/package.json` - Vite/React scripts and dependencies.
- `AGENTS.md` - durable project and collaboration rules.
- `README.md` - stable project setup, API, and architecture documentation.

## Important Decisions

- `AGENTS.md`, `README.md`, and `CODEX_CONTEXT.md` are private local memory/documentation files. Keep them in `.gitignore`; never commit, force-add, or push them.
- The repository contains both `client` and `server` under one Git root.
- The server uses Node.js ECMAScript modules.
- MongoDB/Mongoose is the database layer, currently using a local MongoDB connection.
- Password hashes stay on the User document and use `select: false`; bcrypt uses 12 rounds.
- Registration rejects passwords longer than 72 UTF-8 bytes because of bcrypt's input limit.
- Usernames are trimmed, lowercased, limited to 3-20 characters, and match `^[a-z0-9._]+$`.
- Username availability is checked for user feedback and again during registration; the unique database index remains authoritative.
- JWT cookie authentication is implemented and lifecycle-tested across registration, login, `/me`, and logout.
- The user generally implements code for learning. Codex gives approach/documentation and reviews attempts unless explicitly asked to modify the code.
- Every development step must include relevant official documentation and learning topics. Do not provide implementation code before the user attempts it; provide code only when explicitly requested after difficulty or when asked to fix/implement.

## Known Issues

- There is no automated test script or test suite; `testing.js` is a manual ignored script.
- The working tree contains the Vite migration (`client/App.jsx` removed and `client/src/` plus client configuration untracked) and modifications to `server/package.json`, `server/package-lock.json`, and `server/server.js`. Preserve these user changes.
- `nodemon` is currently under regular `dependencies` rather than `devDependencies`. This does not block the next task.
- Session restoration has been verified in a running browser after login.

## Commands / Testing

Run from the project root unless noted:

```powershell
cd server
npm run dev
```

With the server and local MongoDB running, the ignored manual login request can be run from the project root:

```powershell
node .\testing.js
```

Useful inspection commands:

```powershell
git status --short
node --check .\server\server.js
node --check .\server\controllers\authController.js
```

No automated test suite currently exists. Do not claim automated tests passed.

## Task Queue

### Active

- [ ] Build a simple auth-aware screen in `client/src/App.jsx`.

### Next

- [ ] Build React registration/login forms after session restoration works.

### Completed

- [x] User schema and validation.
- [x] Registration endpoint.
- [x] Username availability endpoint.
- [x] Credential login endpoint.
- [x] JWT generation helper and sign/verify check.
- [x] Cookie-parser middleware configuration.
- [x] Registration/login JWT cookie creation (commit `70f8970`).
- [x] JWT cookie authentication middleware.
- [x] Protected current-user endpoint.
- [x] Logout and full authentication lifecycle test.
- [x] Vite React scaffold, installation, lint, build, and default-page verification.
- [x] Credentialed CORS static configuration and live preflight/header verification.
- [x] Reusable client API request helper (lint/build verified; runtime integration pending).
- [x] React authentication context/provider setup and provider wrapping.
- [x] `AuthProvider` `/api/auth/me` session-restoration effect (lint/build verified; browser runtime pending).
- [x] Browser runtime test for `/api/auth/me` session restoration after login.
- [x] Persistent project-memory documentation system.
- [x] Permanent teaching/response-style recovery rules and concise learning-position checkpoint.

## Learning Context

Current learning area:
Reading shared auth context from React UI and rendering different screens from `loading` and `user`.

Already covered:

- Why the frontend needs one reusable API helper instead of repeating Fetch configuration.
- Backend base URL plus endpoint construction.
- Fetch request options, default `GET`, and `credentials: "include"`.
- JSON request serialization, `FormData`, response content types, `response.ok`, and structured HTTP errors.
- The user initially found the API-helper contract unclear and explicitly asked Codex to implement it; review the completed helper when explaining how it is called.

Current implementation:
`AuthContext`, provider wrapping, and `AuthProvider` session restoration are complete and browser runtime-tested. The app UI does not yet display auth state.

Next concept to explain:
How `useContext(AuthContext)` lets `App.jsx` read `loading` and `user`, and how conditional rendering chooses what the user sees.

## Resume Point

Resume by reading the three private local memory files, recovering the permanent `User Learning and Response Style` rules, and guiding the user to replace the Vite starter UI in `client/src/App.jsx` with a simple auth-aware screen. It should read `loading` and `user` from `AuthContext`, show a loading state while session restoration runs, show the logged-in user's name/username when authenticated, and show a logged-out/auth placeholder when unauthenticated. Include official React `useContext` and conditional rendering docs. Let the user write it unless they explicitly ask for code.
