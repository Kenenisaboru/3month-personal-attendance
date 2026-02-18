# DevTrack Implementation Plan

## 1. Project Initialization
- [ ] Create project root directory `DevTrack`
- [ ] Initialize `backend` (Node.js/Express)
- [ ] Initialize `frontend` (React + Vite)
- [ ] Create `README.md` with setup instructions

## 2. Database Design (Supabase)
- [ ] Create `supabase_schema.sql` containing:
    - User profiles (handled by Supabase Auth, but maybe a public profile table if needed)
    - `attendance` table: `id`, `user_id`, `date`, `status`, `check_in`, `check_out`
    - `activities` table: `id`, `user_id`, `date`, `title`, `description`, `hours`, `category`
    - RLS (Row Level Security) policies

## 3. Backend Development
- [ ] Install dependencies: `express`, `cors`, `dotenv`, `@supabase/supabase-js`, `nodemon`
- [ ] Set up `server.js` or `index.js`
- [ ] Create Supabase client helper
- [ ] Create Routes/Controllers:
    - `attendance.routes.js` (GET, POST, PUT, DELETE)
    - `activities.routes.js` (GET, POST, PUT, DELETE)
    - `dashboard.routes.js` (Aggregation queries)

## 4. Frontend Development
- [ ] Install dependencies: `react-router-dom`, `@supabase/supabase-js`, `lucide-react`, `chart.js` (or `recharts`), `axios`
- [ ] Setup `Move` directory structure: `components`, `pages`, `context`, `services`
- [ ] **Authentication**:
    - Setup `AuthContext` using Supabase Auth
    - Create `Login` and `Register` pages
    - Create `ProtectedRoute` component
- [ ] **Layout**:
    - Sidebar/Navbar navigation
    - Responsive layout wrapper
- [ ] **Pages**:
    - `Dashboard`: Stats cards + Charts
    - `Attendance`: Calendar view or List view + Check-in/out form
    - `Activity Log`: List view + Add/Edit Activity form

## 5. Integration & Polish
- [ ] Connect Frontend to Backend APIs (or directly to Supabase if preferred for simple CRUD, but user asked for Backend API as option/requirement)
    - *Decision*: We will use the Node.js backend as a proxy/API layer as requested, although direct Supabase is easier. The user asked for "6. Backend Requirements... proper folder structure". We will implement this.
- [ ] Styling improvements (CSS/Tailwind if requested? User said "Styling: Modern, clean, responsive UI", "Vanilla CSS" or "Tailwind if requested". User didn't explicitly request Tailwind, so we will use **Vanilla CSS** with CSS Modules or just scoped CSS).
    - *Correction*: The user mentioned "Avoid using TailwindCSS unless the USER explicitly requests it". I will stick to standard CSS or CSS Modules for clean separation.
- [ ] Testing & Debugging

## 6. Final Deliverables
- [ ] Verify file structure
- [ ] Include run instructions
