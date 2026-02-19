# Supabase Setup Guide for DevTrack

Follow these steps to set up your free database.

## Step 1: Create Account & Project
1. Go to [https://supabase.com/](https://supabase.com/).
2. Click **"Start your project"** and sign in with GitHub (or create an account).
3. Click **"New Project"**.
4. Choose your Organization (or create one).
5. **Name**: `DevTrack`
6. **Database Password**: Create a strong password (and save it somewhere safe!).
7. **Region**: Choose a region close to you (e.g., East US).
8. Click **"Create new project"**.
   * *Wait a minute or two for the project to be created.*

## Step 2: Get Your Credentials
1. Once the project is ready, look at the dashboard sidebar.
2. Go to **Settings** (gear icon at the bottom of the sidebar) -> **API**.
3. Find the **Project URL** and copy it.
4. Find the **Project API keys** section and copy the `anon` `public` key.

## Step 3: Configure DevTrack
1. Open the file `DevTrack/frontend/.env` on your computer.
   * Paste your URL as `VITE_SUPABASE_URL=...`
   * Paste your Key as `VITE_SUPABASE_ANON_KEY=...`
2. Open the file `DevTrack/backend/.env` on your computer.
   * Paste your URL as `SUPABASE_URL=...`
   * Paste your Key as `SUPABASE_ANON_KEY=...`

## Step 4: Create Database Tables
1. In the Supabase Dashboard sidebar, click on **SQL Editor** (icon looks like a terminal `>_`).
2. Click **"New query"** (top left).
3. Copy the code below and paste it into the editor:

```sql
-- USERS are handled by Supabase Auth (auth.users)

-- Attendance Table
create table public.attendance (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  date date not null,
  status text check (status in ('Present', 'Absent', 'Leave')) not null,
  check_in time,
  check_out time,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique (user_id, date)
);

-- Row Level Security (RLS) for Attendance
alter table public.attendance enable row level security;

create policy "Users can view their own attendance"
  on public.attendance for select
  using (auth.uid() = user_id);

create policy "Users can insert their own attendance"
  on public.attendance for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own attendance"
  on public.attendance for update
  using (auth.uid() = user_id);

-- Activities Table
create table public.activities (
  id uuid default uuid_generate_v4() primary key,
  user_id uuid references auth.users(id) not null,
  date date not null,
  title text not null,
  description text,
  hours numeric not null,
  category text check (category in ('Freelance', 'Study', 'Personal Project')) not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Row Level Security (RLS) for Activities
alter table public.activities enable row level security;

create policy "Users can view their own activities"
  on public.activities for select
  using (auth.uid() = user_id);

create policy "Users can insert their own activities"
  on public.activities for insert
  with check (auth.uid() = user_id);

create policy "Users can update their own activities"
  on public.activities for update
  using (auth.uid() = user_id);

create policy "Users can delete their own activities"
  on public.activities for delete
  using (auth.uid() = user_id);
```

4. Click **"Run"** (bottom right of the editor).
   * You should see "Success. No rows returned."

## Step 5: Create a User
1. Go to the **Authentication** tab in the sidebar (icon looks like two people).
2. Click **"Add user"** (top right).
3. Select **"Send invitation"** or just **"Create new user"**.
4. Enter an email (e.g., `test@example.com`) and a password.
5. Click **"Create user"**.
   * *Note: You might need to confirm your email if you used a real one, or you can turn off "Confirm email" in Auth Settings.*

## Step 6: Restart & Run
1. Go to your terminal running the project.
2. Stop the servers (Ctrl+C).
3. Run `npm run dev` in both the `frontend` and `backend` folders again.
4. Login with the user you just created!
