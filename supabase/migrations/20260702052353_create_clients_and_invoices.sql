-- Module 6: clients & invoices, owned per-user, protected by RLS.

-- Clients ------------------------------------------------------------------
create table public.clients (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  name text not null,
  email text not null,
  created_at timestamptz not null default now()
);

-- Invoices -----------------------------------------------------------------
create table public.invoices (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  client_id uuid not null references public.clients (id) on delete cascade,
  amount integer not null check (amount > 0),
  status text not null default 'draft'
    check (status in ('draft', 'sent', 'paid', 'overdue')),
  due_date date not null,
  created_at timestamptz not null default now()
);

create index clients_user_id_idx on public.clients (user_id);
create index invoices_user_id_idx on public.invoices (user_id);
create index invoices_client_id_idx on public.invoices (client_id);

-- Row Level Security: default-deny, then per-user access ---------------------
alter table public.clients enable row level security;
alter table public.invoices enable row level security;

-- Clients policies
create policy "clients_select_own" on public.clients
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "clients_insert_own" on public.clients
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "clients_update_own" on public.clients
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "clients_delete_own" on public.clients
  for delete to authenticated
  using ((select auth.uid()) = user_id);

-- Invoices policies
create policy "invoices_select_own" on public.invoices
  for select to authenticated
  using ((select auth.uid()) = user_id);

create policy "invoices_insert_own" on public.invoices
  for insert to authenticated
  with check ((select auth.uid()) = user_id);

create policy "invoices_update_own" on public.invoices
  for update to authenticated
  using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);

create policy "invoices_delete_own" on public.invoices
  for delete to authenticated
  using ((select auth.uid()) = user_id);
