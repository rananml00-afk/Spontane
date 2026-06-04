-- ============================================================
-- SPONTANE — Run this entire script in your Supabase SQL Editor
-- Dashboard → SQL Editor → New query → Paste → Run
-- ============================================================

-- 1. PROFILES TABLE
create table if not exists public.profiles (
  id          uuid primary key references auth.users(id) on delete cascade,
  full_name   text,
  city        text,
  bio         text,
  languages   jsonb    default '[]'::jsonb,
  interests   text[]   default '{}',
  updated_at  timestamptz default now()
);

-- 2. EVENTS TABLE
create table if not exists public.events (
  id              uuid primary key default gen_random_uuid(),
  user_id         uuid references auth.users(id) on delete cascade,
  title           text not null,
  description     text,
  date            date,
  time            text,
  city            text,
  location        text,
  language        text,
  category        text,
  image_url       text,
  created_at      timestamptz default now()
);

-- 3. ENABLE ROW-LEVEL SECURITY
alter table public.profiles enable row level security;
alter table public.events   enable row level security;

-- 4. PROFILES POLICIES
create policy "Users can read own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can insert own profile"
  on public.profiles for insert
  with check (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

-- 5. EVENTS POLICIES
create policy "Anyone can view events"
  on public.events for select
  using (true);

create policy "Authenticated users can create events"
  on public.events for insert
  with check (auth.uid() = user_id);

create policy "Users can update own events"
  on public.events for update
  using (auth.uid() = user_id);

create policy "Users can delete own events"
  on public.events for delete
  using (auth.uid() = user_id);

-- 6. STORAGE BUCKET for event images
-- (Run separately if the bucket doesn't exist yet)
insert into storage.buckets (id, name, public)
  values ('event-images', 'event-images', true)
  on conflict (id) do nothing;

create policy "Anyone can view event images"
  on storage.objects for select
  using (bucket_id = 'event-images');

create policy "Authenticated users can upload event images"
  on storage.objects for insert
  with check (bucket_id = 'event-images' and auth.uid() is not null);

create policy "Users can delete own event images"
  on storage.objects for delete
  using (bucket_id = 'event-images' and auth.uid() is not null);

-- ============================================================
-- Done! All tables, RLS policies and storage are configured.
-- ============================================================
