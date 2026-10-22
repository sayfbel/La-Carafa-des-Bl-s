# Project Task List — La Carafa des Blés

Persistent project task list tracking all milestones, deliverables, verification criteria, and statuses.

---

## Summary of Milestones

| Milestone | Title | Status |
| :--- | :--- | :--- |
| **M0** | Repository Inspection & Engineering Plan | `DONE` |
| **M1** | Project Architecture & Development Environment | `IN_PROGRESS` |
| **M2** | Design System, Typography & Shared UI Components | `TODO` |
| **M3** | Public Website Pages & Client Routing | `TODO` |
| **M4** | Backend API & Express Architecture | `TODO` |
| **M5** | MySQL Schema, Migrations & Seed Data | `TODO` |
| **M6** | Protected Admin Authentication & Dashboard | `TODO` |
| **M7** | Security Hardening & Input Defense | `TODO` |
| **M8** | Automated Testing (Unit, Integration, E2E) | `TODO` |
| **M9** | SEO, Accessibility (a11y) & Performance | `TODO` |
| **M10** | Documentation & Production Deployment Readiness | `TODO` |
| **M11** | Final Verification, Audit & Delivery | `TODO` |

---

## Milestone 0: Repository Inspection & Planning (M0)

- [x] **M0-T1** — Inspect remote repository `https://github.com/sayfbel/La-Carafa-des-Bl-s`, verify branches, commit history, and write permissions.
  - **Priority**: P0
  - **Status**: `DONE`
  - **Subsystem**: Git / DevOps
  - **Acceptance Criteria**: Repository cloned, default branch identified (`main`), working branch created (`feat/bakery-platform`), remote dry-run push verified.
  - **Verification**: `git ls-remote`, `git push --dry-run` passed.

- [x] **M0-T2** — Inspect local development environment (Node.js LTS, npm, XAMPP MySQL, Python, browser runtime).
  - **Priority**: P0
  - **Status**: `DONE`
  - **Subsystem**: Environment
  - **Acceptance Criteria**: Node v26.4.0, npm 11.17.0, XAMPP MariaDB 10.4.32 verified running on 3306, Python 3.11 with Pillow available.
  - **Verification**: `mysqld.exe` launched and active, connection tested with `mysql.exe`.

- [x] **M0-T3** — Establish persistent tracking documentation (`TODO.md`, `CHANGELOG.md`, `README.md`, `docs/PROJECT_STATUS.md`, `docs/ARCHITECTURE.md`, `docs/TESTING.md`, `docs/DEPLOYMENT.md`, `docs/SECURITY.md`).
  - **Priority**: P0
  - **Status**: `DONE`
  - **Subsystem**: Documentation
  - **Acceptance Criteria**: All 8 tracking documents exist with comprehensive, accurate content.
  - **Verification**: Files present and validated in git status.

---

## Milestone 1: Project Architecture & Development Environment (M1)

- [ ] **M1-T1** — Initialize root monorepo / workspace configuration (`package.json`, `.gitignore`, `.env.example`, npm scripts).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Build / Config
  - **Acceptance Criteria**: Clean `.gitignore` strictly excluding secrets and node_modules; coordinated `npm run dev`, `npm run build`, `npm test` scripts.
  - **Verification**: `npm install` and root scripts execute without errors.

- [ ] **M1-T2** — Setup React + Vite frontend in `client/` with React Router, Lucide icons, and modern tooling.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Client / Core
  - **Acceptance Criteria**: Client starts on Vite dev server, router configured, alias imports functioning.
  - **Verification**: `npm --prefix client run build` succeeds cleanly.

- [ ] **M1-T3** — Setup Express + Node.js backend in `server/` with layered architecture (routes, controllers, services, repositories).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Server / Core
  - **Acceptance Criteria**: Clean modular structure, centralized error handling, structured logging, environment validation via schema.
  - **Verification**: Health endpoint `/api/health` returns status without exposing internals.

- [ ] **M1-T4** — Configure local MySQL databases (`la_carafa_db` and `la_carafa_test`) and `mysql2/promise` connection pool.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Database
  - **Acceptance Criteria**: Connection pool established with error trapping and graceful teardown.
  - **Verification**: Node test connects to MySQL and executes `SELECT 1`.

---

## Milestone 2: Design System, Typography & Shared UI (M2)

- [ ] **M2-T1** — Build brand tokens and styling foundation (`client/src/styles/tokens.css` and `main.css`).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: UI / Design System
  - **Acceptance Criteria**: Warm ivory `#F8F3E8`, cream `#EFE4D1`, deep burgundy `#590B16`, dark burgundy `#38070E`, antique gold `#B78A3D`, text `#29221E`.
  - **Verification**: Visual alignment with user's reference mockup.

- [ ] **M2-T2** — Configure luxury French typography (Cormorant Garamond editorial serif + Inter/DM Sans body).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Typography
  - **Acceptance Criteria**: Fonts load efficiently with robust web-safe fallbacks; zero layout shift.
  - **Verification**: Inspected in DOM with font-family computed styles.

- [ ] **M2-T3** — Create brand SVG motifs (refined wheat logo, "Fait Maison • Avec Passion" seal, flour sack emblem).
  - **Priority**: P1
  - **Status**: `TODO`
  - **Subsystem**: Branding / Assets
  - **Acceptance Criteria**: Crisp vector SVGs matching the reference image.
  - **Verification**: Rendered crisply across standard and high-DPI viewports.

- [ ] **M2-T4** — Build shared UI component library (Button, Card, Badge, Modal, FormInput, Select, Alert, LoadingSpinner).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: UI Components
  - **Acceptance Criteria**: Accessible, keyboard operable, visible focus rings, responsive.
  - **Verification**: Component unit tests pass.

---

## Milestone 3: Public Website Pages & Client Routing (M3)

- [ ] **M3-T1** — Implement responsive Header with brand logo, navigation links, and "Nous trouver" quick-link.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Navigation
  - **Acceptance Criteria**: Mobile hamburger menu, smooth drawer animation, accessible ARIA attributes.
  - **Verification**: Tested at 320px, 768px, 1024px, 1440px widths.

- [ ] **M3-T2** — Implement Homepage (`/`) matching reference layout pixel-for-pixel.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Pages / Home
  - **Acceptance Criteria**: Hero with gold kicker, editorial heading, description, CTA, crusty baguette photography, 3 category cards, "Notre histoire" editorial block with real storefront photo, and address/contact footer strip.
  - **Verification**: Visual comparison matches reference image.

- [ ] **M3-T3** — Implement Product Catalog (`/produits`) with category filter and search.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Pages / Products
  - **Acceptance Criteria**: Filter by category (Pains, Viennoiseries, Pâtisseries), search input, responsive cards, availability tags.
  - **Verification**: Filtering updates list instantly; empty search state handled.

- [ ] **M3-T4** — Implement Product Detail page (`/produits/:slug`).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Pages / ProductDetail
  - **Acceptance Criteria**: Rich product photography, full description, allergens warning, availability, back button, related items.
  - **Verification**: Slug routing loads correct product from API; 404 for invalid slug.

- [ ] **M3-T5** — Implement Brand Story page (`/notre-histoire`).
  - **Priority**: P1
  - **Status**: `TODO`
  - **Subsystem**: Pages / Story
  - **Acceptance Criteria**: Editorial narrative of the bakery in Épinay-sur-Orge, artisanal values, ingredients sourcing.
  - **Verification**: Renders cleanly on all screen sizes.

- [ ] **M3-T6** — Implement Contact page (`/contact`) with validated interactive form.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Pages / Contact
  - **Acceptance Criteria**: Address: 15 Rue Pasteur, 91360 Épinay-sur-Orge; Google Maps direction link; validated submission form persisting in MySQL.
  - **Verification**: Form submission creates record in database; shows real success alert.

- [ ] **M3-T7** — Implement Legal & Compliance pages (`/mentions-legales`, `/politique-de-confidentialite`, `/gestion-des-cookies`).
  - **Priority**: P1
  - **Status**: `TODO`
  - **Subsystem**: Pages / Legal
  - **Acceptance Criteria**: RGPD-compliant privacy policy, clear notice of unverified fields, working cookie consent preference modal.
  - **Verification**: Cookie banner allows accepting/declining non-essential cookies; persists choice.

- [ ] **M3-T8** — Implement custom 404 and error boundary fallbacks.
  - **Priority**: P1
  - **Status**: `TODO`
  - **Subsystem**: Pages / Error
  - **Acceptance Criteria**: Elegant branded 404 page with return-home button.
  - **Verification**: Visiting unknown route displays 404.

---

## Milestone 4: Backend API & Express Architecture (M4)

- [ ] **M4-T1** — Build structured Express server with security middleware (Helmet, CORS, rate limiting, request size limits).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Server / Security
  - **Acceptance Criteria**: Restrictive CORS configured to client origin, CSP headers, rate-limiting active on sensitive endpoints.
  - **Verification**: Automated header verification via Supertest.

- [ ] **M4-T2** — Implement Public API endpoints:
  - `GET /api/products` (with category and search query filters)
  - `GET /api/products/:slug`
  - `GET /api/categories`
  - `GET /api/content/homepage`
  - `POST /api/contact` (with validation and rate-limiting)
  - `GET /api/settings/public`
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Server / Public API
  - **Acceptance Criteria**: Input validation via Zod / validator, parameterized SQL queries, clean JSON envelope.
  - **Verification**: Supertest integration tests pass for each endpoint.

- [ ] **M4-T3** — Implement Protected Admin API endpoints:
  - `POST /api/admin/auth/login`
  - `POST /api/admin/auth/logout`
  - `GET /api/admin/auth/me`
  - `GET /api/admin/stats`
  - CRUD `/api/admin/products`
  - CRUD `/api/admin/categories`
  - CRUD `/api/admin/messages` (list, mark read/unread, delete)
  - `PUT /api/admin/content/:section`
  - `GET/PUT /api/admin/settings`
  - `GET /api/admin/audit-logs`
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Server / Admin API
  - **Acceptance Criteria**: Strict session authentication required on every endpoint; audit logs automatically recorded.
  - **Verification**: Unauthorized requests return 401; authorized requests succeed.

---

## Milestone 5: MySQL Schema, Migrations & Seed Data (M5)

- [ ] **M5-T1** — Create robust database migration runner with `schema_migrations` tracking.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Database / Migrations
  - **Acceptance Criteria**: Versioned SQL migrations run sequentially, record timestamp, idempotent.
  - **Verification**: Running `npm run db:migrate` applies all migrations cleanly.

- [ ] **M5-T2** — Implement SQL schema migration files:
  - `001_create_schema_migrations.sql`
  - `002_create_admins_table.sql`
  - `003_create_categories_table.sql`
  - `004_create_products_table.sql`
  - `005_create_site_settings_table.sql`
  - `006_create_contact_messages_table.sql`
  - `007_create_admin_audit_logs_table.sql`
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Database / Schema
  - **Acceptance Criteria**: InnoDB, utf8mb4_unicode_ci, foreign keys, non-destructive cascade constraints, proper indices.
  - **Verification**: Verified against MySQL table status and constraints.

- [ ] **M5-T3** — Implement safe, idempotent development seed script (`npm run db:seed`).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Database / Seeds
  - **Acceptance Criteria**: Seeds categories (Pains, Viennoiseries, Pâtisseries), sample products, initial homepage content, default settings.
  - **Verification**: Seed script runs twice without duplicate key errors or data destruction.

- [ ] **M5-T4** — Implement secure initial administrator CLI provisioning script (`npm run admin:create`).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Security / CLI
  - **Acceptance Criteria**: Generates or prompts for admin credentials with bcrypt/Argon2id hashing; never commits passwords.
  - **Verification**: Command creates active administrator in `admins` table with verified password hash.

---

## Milestone 6: Admin Authentication & Dashboard (M6)

- [ ] **M6-T1** — Implement Admin Login page (`/admin/login`) with session management.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Admin / Auth
  - **Acceptance Criteria**: Secure HTTP-only cookie session, CSRF protection, brute-force rate-limiting, generic error messages.
  - **Verification**: Verified session cookie issued; invalid logins blocked after threshold.

- [ ] **M6-T2** — Implement Admin Layout with sidebar navigation, user badge, and logout trigger.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Admin / UI
  - **Acceptance Criteria**: Responsive admin drawer, active route indicators, session status checker.
  - **Verification**: Renders cleanly on desktop and tablet.

- [ ] **M6-T3** — Implement Admin Overview (`/admin`) with live MySQL statistics.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Admin / Overview
  - **Acceptance Criteria**: Total products, published vs draft, unread contact messages count, recent audit activity.
  - **Verification**: Reflects exact counts from database tables.

- [ ] **M6-T4** — Implement Product Management (`/admin/produits`).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Admin / Products
  - **Acceptance Criteria**: List with search and category filters, create modal/form, edit modal/form, toggle availability, delete with confirmation modal.
  - **Verification**: CRUD operations verified in database and reflected on public site.

- [ ] **M6-T5** — Implement Category Management (`/admin/categories`).
  - **Priority**: P1
  - **Status**: `TODO`
  - **Subsystem**: Admin / Categories
  - **Acceptance Criteria**: Add/edit categories, reorder, prevent deletion if active products are linked.
  - **Verification**: Attempting to delete category with linked products is safely prevented with clear warning.

- [ ] **M6-T6** — Implement Content Management (`/admin/contenu`).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Admin / Content
  - **Acceptance Criteria**: Edit homepage hero kicker, main headline, description, brand story text, contact details, map link.
  - **Verification**: Saved changes update public homepage immediately.

- [ ] **M6-T7** — Implement Contact Messages Inbox (`/admin/messages`).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Admin / Messages
  - **Acceptance Criteria**: View submitted messages, mark as read/unread, delete message with confirmation.
  - **Verification**: Message status toggles update MySQL database.

- [ ] **M6-T8** — Implement Settings & Audit Logs (`/admin/parametres`, `/admin/securite`).
  - **Priority**: P1
  - **Status**: `TODO`
  - **Subsystem**: Admin / Settings
  - **Acceptance Criteria**: View business operational settings, inspect tamper-resistant audit logs.
  - **Verification**: Actions recorded with admin ID, timestamp, entity type, and action description.

---

## Milestone 7: Security Hardening & Input Defense (M7)

- [ ] **M7-T1** — Configure HTTP security headers (Helmet: CSP, X-Content-Type-Options, Referrer-Policy, Frameguard).
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Security
  - **Acceptance Criteria**: Headers present on all HTTP responses.
  - **Verification**: Tested with Supertest and curl.

- [ ] **M7-T2** — Enforce parameterized SQL across all database queries to prevent SQL injection.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Security
  - **Acceptance Criteria**: Zero string concatenation in SQL queries; prepared statements used everywhere.
  - **Verification**: SQL injection penetration tests in test suite pass.

- [ ] **M7-T3** — Enforce strict input validation and HTML entity escaping to prevent XSS.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Security
  - **Acceptance Criteria**: DOMPurify or server-side escaping applied; client React safe binding verified.
  - **Verification**: XSS payload strings rendered harmlessly as plain text.

- [ ] **M7-T4** — Audit dependencies and exclude all secrets from Git tracking.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Security
  - **Acceptance Criteria**: `.env` and sensitive files in `.gitignore`; `npm audit` shows 0 high/critical vulnerabilities.
  - **Verification**: `git status` verifies no `.env` or credentials staged.

---

## Milestone 8: Automated Testing (M8)

- [ ] **M8-T1** — Configure Vitest test runner for server and client.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Testing
  - **Acceptance Criteria**: `npm test` runs all backend and frontend unit/integration tests.
  - **Verification**: Test runner executes and outputs pass/fail counts.

- [ ] **M8-T2** — Implement Backend API integration test suite (`server/tests/`):
  - Database connection & migration idempotency
  - Public products & filtering
  - Contact form persistence & validation errors
  - Admin login & invalid password rejection
  - Protected endpoints 401 unauthorized checks
  - Session expiration & logout invalidation
  - SQL injection input defense
  - Rate limiting behavior
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Testing / Backend
  - **Acceptance Criteria**: All backend test suites pass against dedicated `la_carafa_test` database.
  - **Verification**: 100% of integration test suites green.

- [ ] **M8-T3** — Implement Frontend component & routing test suite (`client/src/tests/`):
  - Homepage visual structure & hero
  - Navigation links & mobile menu toggle
  - Product catalog category filtering
  - Contact form validation & submission flow
  - Admin login form validation
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Testing / Frontend
  - **Acceptance Criteria**: React Testing Library tests render and verify interactions.
  - **Verification**: Test assertions succeed.

- [ ] **M8-T4** — Implement End-to-End verification script covering complete user & admin journeys.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Testing / E2E
  - **Acceptance Criteria**: Verifies visitor browsing -> contact submission -> admin login -> product update -> public persistence.
  - **Verification**: E2E test script exits code 0 with detailed log.

---

## Milestone 9: SEO, Accessibility (a11y) & Performance (M9)

- [ ] **M9-T1** — Configure SEO metadata, OpenGraph tags, JSON-LD Schema (Bakery), and semantic HTML hierarchy.
  - **Priority**: P1
  - **Status**: `TODO`
  - **Subsystem**: SEO
  - **Acceptance Criteria**: Single `<h1>` per page, descriptive title tags, meta descriptions, sitemap.xml, robots.txt.
  - **Verification**: Metadata validated via DOM inspection.

- [ ] **M9-T2** — Implement accessibility standards (WCAG 2.1 AA): color contrast, aria labels, keyboard navigation, focus management.
  - **Priority**: P1
  - **Status**: `TODO`
  - **Subsystem**: Accessibility
  - **Acceptance Criteria**: Contrast ratio >= 4.5:1 for normal text; all interactive elements reachable via Tab key.
  - **Verification**: Automated a11y checks pass.

- [ ] **M9-T3** — Optimize images (WebP/AVIF formats, lazy loading, responsive srcset, zero cumulative layout shift).
  - **Priority**: P1
  - **Status**: `TODO`
  - **Subsystem**: Performance
  - **Acceptance Criteria**: Fast asset load times, lightweight bundle.
  - **Verification**: Vite build reports optimized bundle chunks.

---

## Milestone 10: Documentation & Deployment Readiness (M10)

- [ ] **M10-T1** — Create comprehensive `README.md` with overview, screenshots, tech stack, and quickstart.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Documentation
  - **Acceptance Criteria**: Clear step-by-step instructions for local setup and production run.
  - **Verification**: Followed from scratch on clean machine.

- [ ] **M10-T2** — Complete technical documentation suite:
  - `docs/ARCHITECTURE.md` (full system architecture, data flow, ERD)
  - `docs/TESTING.md` (test strategy, running suites, mocking vs integration)
  - `docs/DEPLOYMENT.md` (XAMPP local dev vs production Linux/Nginx/Node)
  - `docs/SECURITY.md` (threat model, authentication, session hardening, audit)
  - `docs/PROJECT_STATUS.md` (milestone tracker, verified commits, blockers)
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Documentation
  - **Acceptance Criteria**: All documents detailed, professional, and cross-linked.
  - **Verification**: Inspected and verified.

- [ ] **M10-T3** — Setup GitHub Actions CI workflow (`.github/workflows/ci.yml`).
  - **Priority**: P1
  - **Status**: `TODO`
  - **Subsystem**: CI / CD
  - **Acceptance Criteria**: Automated lint, test, and build pipeline defined cleanly.
  - **Verification**: Workflow file validated.

---

## Milestone 11: Final Verification & Delivery (M11)

- [ ] **M11-T1** — Run full verification gate: lint, unit tests, integration tests, E2E tests, production build.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: QA
  - **Acceptance Criteria**: All suites pass with zero errors.
  - **Verification**: Test outputs logged.

- [ ] **M11-T2** — Final git hygiene check: ensure clean working tree, no committed secrets or logs, changelog reconciled.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Git
  - **Acceptance Criteria**: `git status` clean, all commits follow conventional commits.
  - **Verification**: Log inspection.

- [ ] **M11-T3** — Push verified feature branch and open/verify status on GitHub remote repository.
  - **Priority**: P0
  - **Status**: `TODO`
  - **Subsystem**: Delivery
  - **Acceptance Criteria**: Commits pushed to `https://github.com/sayfbel/La-Carafa-des-Bl-s`.
  - **Verification**: Remote branch verification confirmed.
