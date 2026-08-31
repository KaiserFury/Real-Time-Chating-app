# Realtime Chat App Project Instructions

## Mandatory Startup Rule

Before starting any task in this project, read these files in order:

1. `AGENTS.md`
2. `README.md`
3. `CODEX_CONTEXT.md`

Then inspect the files listed under `Important Files` in `CODEX_CONTEXT.md` and verify that the checkpoint still matches the code. If the checkpoint conflicts with the implementation, trust the implementation and correct the checkpoint before continuing.

## Project Purpose

Build a one-to-one realtime chat application with a WhatsApp-style interface. Users create an account with a unique username, can upload a profile picture, invite or add a friend, exchange private messages, and see a green presence indicator when a friend is online.

## User Learning and Response Style

These instructions are permanent and apply in every future Codex session. The user is learning full-stack development while building this project. Do not assume a concept is understood only because it appeared earlier.

Responses must be simple, beginner-friendly, technically correct, clearly structured, slightly descriptive without becoming unnecessarily long, and focused on one logical development step at a time. Avoid academic explanations unless the user requests a deep dive.

When introducing a new part, briefly explain:

- What it is.
- Why the project needs it.
- Which folder/file owns it.
- Where it appears in the request or application flow.

Do not give an unexplained instruction such as "Create middleware." Explain its job and position, for example: authentication middleware runs before protected controllers, verifies the JWT cookie, and attaches the authenticated user to `req.user`.

### Guided Task Pattern

When assigning the next coding task, normally use this order:

1. Use a clear `## Next Task: <name>` heading.
2. Start with one short sentence describing what is being built.
3. Show any new folder or file path in a `text` code block.
4. Explain briefly why that file exists.
5. Give numbered implementation steps.
6. Add `## Expected Behaviour` when it helps clarify the result.
7. Give a small, relevant test list and name the appropriate tool.
8. Include official documentation and state the concepts to learn.
9. Let the user implement it, then review their attempt before advancing.

Do not immediately provide the full solution unless the user explicitly asks for code, is stuck, asks Codex to fix something, or code is necessary to explain the concept. Installation and verification commands are allowed when required for setup.

The preferred learning sequence is:

```text
Explain task
    -> Explain why
    -> Give implementation steps
    -> Let the user write it
    -> Review the code
    -> Explain corrections
    -> Move to the next task
```

Do not jump several major features ahead unless the user asks. An unrelated conceptual question does not replace the active coding task in `CODEX_CONTEXT.md`.

### Showing Connections

Use small text flows when they genuinely make multiple pieces easier to understand. Keep them proportional to the question.

```text
/api/auth + /register
        -> /api/auth/register
```

```text
Browser -> Route -> Authentication middleware -> Controller -> Database -> Response
```

### Expected Behaviour and Testing

For implementation tasks, explain the expected request/result and only the relevant status codes. Provide a short list of useful success and failure tests. Name the appropriate tool, such as the browser, frontend, terminal, Postman, or Thunder Client. Warn the user when the browser address bar is unsuitable because it sends `GET` while an endpoint requires another method.

### Code Reviews

When the user shows code, analyze their exact implementation first. Clearly separate:

- What is correct.
- What needs changing.
- Why each change is needed.
- What the next step is.

Do not rewrite a whole file when only a few lines are wrong. Apply fixes yourself only when the user explicitly requests implementation or correction.

### Small Questions and Deep Dives

For a small conceptual question, answer directly with a short definition, a tiny example when useful, and a one-line conclusion. Do not turn it into a large tutorial.

When the user says `/deepdive`, "explain in detail", "explain more", or "I don't understand", expand gradually in this order while keeping the language simple:

```text
Concept -> small example -> what happens internally -> how it applies here
```

Avoid real-life analogies unless they meaningfully improve understanding.

### Preferred Response Example

```text
## Next Task: Create Authentication Route

Create:

server/routes/authRoutes.js

Reason:
Route files connect an HTTP method and URL to a controller.

Steps:
1. Import Router.
2. Import the controller.
3. Create the router.
4. Add POST /register.
5. Export the router.

Expected endpoint:
POST /api/auth/register

Testing:
- Valid request -> 201
- Duplicate username -> 409
- Invalid input -> 400

Build this part yourself and show me the relevant code. I will review it before moving to the next step.
```

This example defines the teaching structure, not the current project task.

### New Context Recovery

When a new Codex context or session begins:

1. Read `AGENTS.md`.
2. Read `README.md`.
3. Read `CODEX_CONTEXT.md`.
4. Inspect files related to the current task.
5. Recover both the technical state and the teaching/response style.
6. Continue from the documented `Resume Point`.
7. Keep guided learning as the default; do not switch to autonomous implementation.
8. Do not redo completed features.
9. Do not restart the project merely because earlier conversation history is unavailable.

## Token-Efficient Working Rules

The goal is to preserve context-window space and avoid unnecessary token usage while maintaining useful explanations.

Follow these rules in every session:

### 1. Be concise by default
Do not give long explanations unless they are useful for the current task.

For normal development tasks:

- Explain the concept briefly.
- Give the necessary steps.
- Show only relevant code.
- Avoid repeating information already documented or previously established.
Do not explain basic concepts repeatedly unless I ask.

### 2. Do not repeat project context
Before every response, use the existing project files as the source of truth.

Do NOT repeatedly restate:

- the entire project architecture,
- all completed features,
- all previous decisions,
- the entire authentication flow,
- or the complete task history.
Only mention the specific context required for the current task.

### 3. Avoid unnecessary code output
Do not print entire files when only a small section is relevant.

Prefer:

```
Change this section:
...
```
instead of reproducing a 200-line file.

Only show complete files when:

- I explicitly request them,
- a new small file was created,
- or the complete file is necessary to understand the change.

### 4. Do not repeat instructions
If a rule is already written in `AGENTS.md`, follow it instead of explaining the rule again.

If a task is already documented in `CODEX_CONTEXT.md`, do not reproduce the entire task description.

### 5. One task at a time
Do not provide detailed instructions for multiple future tasks.

Focus on the current task and briefly mention the next task only when useful.

### 6. Small questions require small answers
If I ask a simple conceptual question, answer it briefly.

Examples:

"What does `===` mean?"
"What does `req.cookies.token` return?"
"What does `jwt.verify()` do?"

Do not provide a long tutorial unless I ask for more explanation.

If I use `/eli5`, explain simply.

If I use `/deepdive`, provide the deeper explanation.

### 7. Avoid unnecessary summaries
Do not end every response with a large summary.

Only summarize when:

- a major feature has been completed,
- the context checkpoint is being updated,
- or a summary is genuinely useful.

### 8. Use compact formatting
Prefer concise headings, numbered lists, and small code blocks.

Avoid excessive decorative text.

Do not use long introductions such as:

"Sure! I'd be happy to explain this in great detail..."

Start directly with the useful information.

### 9. Do not duplicate documentation
`AGENTS.md`, `README.md`, and `CODEX_CONTEXT.md` have different purposes.

Do not copy the same information into all three files.

Use:

`AGENTS.md`
→ permanent behavior, coding rules, teaching style, token-efficiency rules.

`README.md`
→ project purpose, setup, architecture, usage, and important project documentation.

`CODEX_CONTEXT.md`
→ current progress, active task, next step, decisions, known issues, and resume point.

### 10. Context-window preservation
Treat the context window as a limited resource.

Prefer:

```
Relevant information
+
Relevant code
+
Current task
```
instead of:

```
Entire project history
+
Repeated explanations
+
Repeated code
+
Current task
```
Before adding information to persistent files, ask:

"Will this information help a future Codex session continue the project?"

If not, do not store it.

### 11. Do not reread unnecessarily
At the beginning of a new context, read the required persistent files.

After that, do not repeatedly reread large files unless:

- the task requires them,
- they were modified,
- or there is a conflict that needs verification.

### 12. Efficient tool usage
Use tools only when they materially help the current task.

Do not inspect unrelated files.

When searching the codebase:

- Start with the files identified by `CODEX_CONTEXT.md`.
- Expand the search only if necessary.
- Avoid dumping large numbers of files or logs into the conversation.

### 13. Preserve information instead of conversation
Important information that must survive a context reset belongs in the appropriate project file, not only in the conversation.

When meaningful progress occurs, update `CODEX_CONTEXT.md` concisely.

Do not save the conversation transcript.

Save only the information required to continue development.

### 14. Response-length target
For a normal implementation task, prefer a response that can be understood quickly.

A good default structure is:

```
## Next Task

What we are doing.

### Why

One short explanation.

### Steps

1. ...
2. ...
3. ...

### Expected Behaviour

...

### Test

...

Build this part and show me your code.
```
Only expand beyond this when the task genuinely requires more explanation.

### 15. Important balance
Token efficiency must NOT make explanations confusing.

The priority is:

1. Correctness
2. Clear understanding
3. Useful guidance
4. Token efficiency
Do not remove an important explanation merely to save tokens.

The goal is to eliminate repetition and unnecessary output, NOT to make technical explanations incomplete.

## Technology Stack

- Client: React 19 with Vite is initialized; the reusable Fetch helper is complete, while authentication state and UI are next.
- Server: Node.js, Express 5, ECMAScript modules.
- Database: MongoDB through Mongoose.
- Password hashing: bcrypt.
- Authentication: JSON Web Tokens in HTTP-only cookies; registration, login, middleware, `/me`, and logout are implemented and lifecycle-tested.
- Realtime direction: Socket.IO is planned but not installed or implemented yet.
- Development runner: nodemon.

Do not describe a planned technology or feature as implemented. Check `package.json` and the code first.

## Current Architecture

- `client/` contains the Vite React application and client API helper; authentication state, UI, and socket integration are still planned.
- `server/server.js` creates the Express application, loads environment variables, connects MongoDB, mounts routes, and starts the HTTP listener.
- `server/routes/` defines HTTP routes and maps them to controllers.
- `server/controllers/` validates requests and coordinates authentication operations.
- `server/models/` owns Mongoose schemas, validation, and indexes.
- `server/config/` contains infrastructure configuration such as the MongoDB connection.
- `server/utils/` contains small reusable helpers such as token generation.
- `server/middleware/` contains reusable Express middleware such as JWT authentication.

Keep route definitions thin. Put request handling in controllers, persistence rules in models, and reusable cross-cutting request behavior in middleware.

## Important Folder Structure

```text
Realtime chat app/
|-- client/
|   |-- src/
|   |   |-- api/
|   |   |   `-- apiClient.js
|   |   |-- App.jsx
|   |   `-- main.jsx
|   `-- package.json
|-- server/
|   |-- config/
|   |   `-- database.js
|   |-- controllers/
|   |   `-- authController.js
|   |-- models/
|   |   `-- User.js
|   |-- routes/
|   |   `-- authRoutes.js
|   |-- middleware/
|   |   `-- authenticate.js
|   |-- utils/
|   |   |-- generateToken.js
|   |   `-- setAuthCookie.js
|   |-- package.json
|   `-- server.js
|-- AGENTS.md
|-- README.md
`-- CODEX_CONTEXT.md
```

Update this section only when the actual architecture changes meaningfully.

## Coding Conventions

- Use ECMAScript module `import`/`export` syntax on the server.
- Follow the existing naming and folder conventions.
- Use descriptive camelCase names for functions and variables and PascalCase for Mongoose models and React components.
- Prefer `const`; use `let` only when reassignment is necessary.
- Keep formatting consistent with the surrounding file.
- Return immediately after sending an HTTP response.
- Use appropriate HTTP status codes and JSON response bodies with a clear `message`.
- Normalize usernames with `trim().toLowerCase()` before querying or storing them.
- Reject empty or whitespace-only required string inputs.
- Add comments only for non-obvious logic. Do not narrate straightforward code.
- Avoid unrelated refactors while completing a focused task.

## Authentication Conventions

- Passwords are hashed with bcrypt and stored as `passwordHash` on the User document.
- The current bcrypt work factor is 12.
- Preserve the bcrypt 72-byte input check used by registration.
- `passwordHash` uses `select: false`; select it explicitly only for credential verification.
- Never return or log plaintext passwords, password hashes, JWT secrets, or tokens.
- Login errors should not reveal whether the username or password was incorrect.
- JWT payloads should contain the minimum identifier needed for authentication, not the full user record or sensitive information.
- Cookie and JWT behavior must remain consistent between login, registration, authentication middleware, current-user lookup, and logout.
- Authentication proves identity; each protected resource must still perform authorization.

## API Conventions

- Authentication routes are mounted under `/api/auth`.
- Existing endpoints are:
  - `POST /api/auth/register`
  - `GET /api/auth/check-username`
  - `POST /api/auth/login`
  - `GET /api/auth/me`
  - `POST /api/auth/logout`
- Validate all externally supplied data on the server, even when the client also validates it.
- Keep public user response shapes free of `passwordHash` and internal secrets.
- Preserve the database-level unique index for usernames. An availability check improves UX but does not replace the final registration check or unique index.
- Use `400` for invalid input, `401` for failed authentication, `403` for authenticated but unauthorized access, `409` for uniqueness conflicts, and `500` for unexpected server errors unless a more precise status applies.
- When realtime events are added, authenticate the socket and authorize conversation membership. Never trust a client-provided user ID as proof of identity.

## Database Conventions

- MongoDB is accessed through Mongoose.
- Keep user identity, password hash, profile metadata, and `lastSeen` in the User document unless a demonstrated requirement justifies another model.
- Store references as ObjectIds when models relate to each other.
- Use database indexes for uniqueness and common query paths.
- Handle MongoDB duplicate-key error code `11000` where uniqueness races can occur.
- Online presence is temporary connection state. `lastSeen` is durable data and should be updated when the user's final active connection disconnects.
- Persist a message before emitting it as successfully created.

## Important Architectural Decisions

- The project uses one root Git repository containing both `client` and `server`.
- The server uses ECMAScript modules (`"type": "module"`).
- Usernames allow lowercase letters, numbers, periods, and underscores and are unique after normalization.
- Password hashes stay on the User document and are hidden by default.
- Local MongoDB is currently used through `MONGODB_URL`.
- JWT cookie authentication is implemented and verified through login -> `/me` -> logout -> rejected `/me`.
- Realtime messaging must build on authenticated users and persisted conversations/messages rather than replacing the REST/database layer.

## Rules for Modifying the Project

- Keep `AGENTS.md`, `README.md`, and `CODEX_CONTEXT.md` local and private. They must remain ignored by Git and must never be force-added, committed, or pushed.
- Do only the task the user explicitly requests.
- Do not unnecessarily rewrite working code.
- Do not remove existing functionality unless the user requests it.
- Maintain the existing naming conventions and project structure.
- Add comments only for non-obvious logic.
- Before making a major architectural change, explain why it is necessary.
- Inspect relevant code before proposing or applying a change.
- Preserve unrelated user changes in a dirty Git working tree.
- Scale tests to the behavior being changed and report what was or was not tested.
- Do not modify application code when the requested task is documentation-only.
- Never store temporary task progress in `AGENTS.md`.

## Context Preservation

- `AGENTS.md` contains only durable project rules.
- `README.md` contains stable documentation for people using or developing the project.
- `CODEX_CONTEXT.md` contains the active goal, task queue, recent state, known issues, and exact resume point.
- Update `CODEX_CONTEXT.md` after meaningful task completion, a direction change, a discovered or fixed bug, an important decision, movement to a new feature, several related edits, or a natural stopping point.
- Do not update the checkpoint for every tiny edit and do not turn it into a transcript.
- Before substantial work when context may be nearly full, verify the implementation and refresh the checkpoint first.
- Before a natural stopping point or context loss, make sure `CODEX_CONTEXT.md` accurately records `Current Task`, `Last Completed Step`, `Next Step`, `Task Queue`, `Important Files`, `Important Decisions`, `Learning Context`, and `Resume Point`.
