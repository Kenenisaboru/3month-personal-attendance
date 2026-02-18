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
