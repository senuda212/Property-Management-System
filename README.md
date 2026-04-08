# Property Management System

A full-stack real estate platform for **Ceylon Roots**, consisting of two Next.js applications: a **public-facing property website** and an internal **admin panel** for staff to manage listings, inquiries, and users.

---

## Project Structure

```
Property-Management-System/
├── public-website/     # Customer-facing website (port 4000)
└── admin-panel/        # Internal admin dashboard (port 5000)
```

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| Language | TypeScript / React 19 |
| Database | PostgreSQL via Prisma ORM |
| Authentication | NextAuth v5 (beta) |
| Image Hosting | Cloudinary |
| Maps | Leaflet / React Leaflet |
| Animations | Framer Motion |
| Icons | Lucide React |
| Styling | Tailwind CSS + inline styles |
| Security | bcryptjs, DOMPurify, custom rate limiter |

---

## Public Website (`/public-website`)

The customer-facing site for browsing and enquiring about properties.

### Pages

| Route | Description |
|---|---|
| `/` | Home page with hero, featured properties, services, stats, testimonials, blog preview, and CTA |
| `/properties` | Full property listing with advanced filtering and pagination |
| `/properties/[id]` | Individual property detail page with gallery and enquiry form |
| `/blog` | Blog landing page with featured article, search, and category filtering |
| `/blog/[slug]` | Individual blog article page |
| `/compare` | Side-by-side comparison view for shortlisted properties |
| `/about` | About the company |
| `/contact` | Contact page |

### Features

- **Property search & filtering** — filter by city, type (Apartment/House/Land/Villa/Commercial), status (For Sale / For Rent), price range, and bedroom count
- **Pagination** — client-side pagination (9 properties per page)
- **Property gallery** — image gallery on detail pages
- **Enquiry form** — submit enquiries directly from a property detail page
- **Responsive design** — mobile-friendly layout with collapsible filter bar
- **Skeleton loading states** — smooth UX while data loads
- **Interactive map** — Leaflet map integration on property detail pages
- **Blog system** — searchable articles with categories and featured content
- **Property comparison** — compare selected properties using a persistent compare bar
- **External marketplace CTA** — quick access to the official Ikman.lk shop profile from the header

### API Routes

| Endpoint | Method | Description |
|---|---|---|
| `/api/properties` | `GET` | Fetch properties with optional filters (`city`, `type`, `status`, `bedrooms`, `minPrice`, `maxPrice`) |
| `/api/inquiries` | `POST` | Submit a property enquiry |

---

## Admin Panel (`/admin-panel`)

The internal dashboard for managing the platform. Protected by role-based authentication.

Note: Admin login accepts **username or email** plus password.

### Pages

| Route | Description |
|---|---|
| `/login` | Admin login page |
| `/dashboard` | Overview with stats cards, recent properties, and recent inquiries |
| `/properties` | Table of all properties with search and management actions |
| `/properties/new` | Add a new property listing |
| `/properties/[id]` | Edit an existing property |
| `/inquiries` | View and manage all customer inquiries |
| `/users` | Manage admin panel users (admin only) |
| `/activity-logs` | Audit log of all staff actions (admin only) |
| `/settings` | Platform settings (admin/manager) |

### Role-Based Access Control

Three roles are supported with granular permissions:

| Permission | Admin | Manager | Employee |
|---|:---:|:---:|:---:|
| View properties / inquiries | ✅ | ✅ | ✅ |
| Add / edit properties | ✅ | ✅ | ❌ |
| Delete properties | ✅ | ❌ | ❌ |
| Toggle featured / active | ✅ | ✅ | ❌ |
| Update inquiry status | ✅ | ✅ | ✅ |
| Delete / export inquiries | ✅ | ✅ | ❌ |
| Manage users | ✅ | ❌ | ❌ |
| View activity logs | ✅ | ❌ | ❌ |
| View / edit settings | ✅ | View only | ❌ |

### API Routes

| Endpoint | Description |
|---|---|
| `/api/admin/properties` | CRUD operations for property listings |
| `/api/admin/inquiries` | View and update inquiry status |
| `/api/admin/users` | Create, edit, and deactivate users |
| `/api/admin/stats` | Dashboard summary statistics |
| `/api/admin/activity-logs` | Retrieve audit logs |
| `/api/admin/upload` | Handle image uploads |
| `/api/cloudinary` | Cloudinary signed upload integration |
| `/api/auth` | NextAuth authentication endpoints |

---

## Database Schema

Managed with **Prisma** against a **PostgreSQL** database.

| Model | Description |
|---|---|
| `Property` | Listings with title, type, status, price, location, images, features, geo-coordinates, and featured/active flags |
| `Inquiry` | Customer enquiries linked optionally to a property, with status tracking |
| `User` | Admin panel users with roles, account lockout, and login tracking |
| `UserSession` | Active session tokens |
| `ActivityLog` | Audit trail of all staff actions |
| `LoginAttempt` | Record of login attempts (success/failure) for security monitoring |

---

## Security

- **Authentication** — NextAuth v5 with hashed passwords (bcryptjs)
- **Account lockout** — automatic lockout after repeated failed login attempts
- **Rate limiting** — custom rate limiter on sensitive endpoints
- **Input sanitization** — DOMPurify (isomorphic) to prevent XSS
- **Password validation** — enforced complexity rules
- **Role-based guards** — server-side permission checks on every admin API route
- **Activity logging** — full audit trail of login, logout, and all CRUD operations

---

## Getting Started

See [SETUP_NEW_DEVICE.md](SETUP_NEW_DEVICE.md) for full setup instructions.

### Quick Start

```bash
# Public website (http://localhost:4000)
cd public-website
npm install
npm run dev

# Admin panel (http://localhost:5000)
cd admin-panel
npm install
npm run seed   # creates initial admin account
npm run dev
```

### Environment Variables

**`public-website/.env`**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
```

**`admin-panel/.env`**
```env
DATABASE_URL="postgresql://user:password@localhost:5432/dbname"
NEXTAUTH_SECRET="your-secret-key"
NEXTAUTH_URL="http://localhost:5000"
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

---

## Current Status (April 2026)

### Completed
- [x] Public website — all pages (home, properties, property detail, about, contact)
- [x] Property filtering and pagination on public listing page
- [x] Admin panel — full CRUD for properties with Cloudinary image uploads
- [x] Admin panel — inquiry management with status tracking
- [x] Admin panel — user management with role assignment
- [x] Role-based access control (admin / manager / employee)
- [x] Activity audit logging
- [x] Account lockout and login attempt tracking
- [x] Rate limiting and input sanitization
- [x] Migration from SQLite to PostgreSQL
- [x] Responsive design on public website
- [x] Blog/news section with article pages and filtering
- [x] Property detail page map integration (Leaflet)
- [x] Property comparison workflow (`/compare` + compare bar)
- [x] Ikman.lk profile CTA integration in website header

### In Progress / Planned
- [ ] Email notifications for new inquiries
- [ ] Advanced analytics on admin dashboard
