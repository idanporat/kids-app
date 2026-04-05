-- הרץ ב-Supabase SQL Editor (Dashboard → SQL → New query)
-- לאחר מכן: Authentication → Providers → Email: כבה "Confirm email" לפיתוח או אשר מיילים

-- פרופיל משתמש (הורה / ילד)
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null,
  full_name text,
  role text not null check (role in ('parent', 'child')),
  parent_id uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  constraint profiles_parent_role check (
    (role = 'parent' and parent_id is null)
    or (role = 'child' and parent_id is not null)
  )
);

create index if not exists profiles_parent_id_idx on public.profiles (parent_id);
create index if not exists profiles_email_lower_idx on public.profiles (lower(trim(email)));

-- חשבון חיסכון לילד
create table if not exists public.child_accounts (
  id uuid primary key default gen_random_uuid(),
  child_user_id uuid not null references public.profiles (id) on delete cascade,
  parent_id uuid not null references public.profiles (id) on delete cascade,
  balance numeric(15, 2) not null default 0 check (balance >= 0),
  annual_interest_percent numeric(8, 4) not null default 0 check (annual_interest_percent >= 0),
  created_at timestamptz not null default now(),
  constraint child_accounts_one_per_child unique (child_user_id)
);

create index if not exists child_accounts_parent_idx on public.child_accounts (parent_id);

-- הפקדות
create table if not exists public.deposits (
  id uuid primary key default gen_random_uuid(),
  child_account_id uuid not null references public.child_accounts (id) on delete cascade,
  amount numeric(15, 2) not null check (amount > 0),
  note text,
  created_by uuid references public.profiles (id),
  created_at timestamptz not null default now()
);

create index if not exists deposits_account_created_idx on public.deposits (child_account_id, created_at desc);

-- עדכון יתרה אחרי הפקדה
create or replace function public.apply_deposit_to_balance()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  update public.child_accounts
  set balance = balance + new.amount
  where id = new.child_account_id;
  return new;
end;
$$;

drop trigger if exists trg_deposits_apply_balance on public.deposits;
create trigger trg_deposits_apply_balance
  after insert on public.deposits
  for each row execute function public.apply_deposit_to_balance();

-- השלמת רישום ילד (אחרי signUp עם session)
create or replace function public.finalize_child_registration(
  p_parent_email text,
  p_full_name text,
  p_annual_percent numeric default 0
)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_parent_id uuid;
  v_email text;
begin
  select id into v_parent_id
  from public.profiles
  where lower(trim(email)) = lower(trim(p_parent_email))
    and role = 'parent';

  if v_parent_id is null then
    raise exception 'PARENT_NOT_FOUND' using errcode = 'P0001';
  end if;

  select email into v_email from auth.users where id = auth.uid();

  insert into public.profiles (id, email, full_name, role, parent_id)
  values (auth.uid(), v_email, p_full_name, 'child', v_parent_id);

  insert into public.child_accounts (child_user_id, parent_id, annual_interest_percent)
  values (auth.uid(), v_parent_id, greatest(0, p_annual_percent));
end;
$$;

grant execute on function public.finalize_child_registration(text, text, numeric) to authenticated;

-- Invite tokens for children to join a parent
create table if not exists public.child_invites (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid not null references public.profiles (id) on delete cascade,
  token text not null unique default encode(gen_random_bytes(24), 'hex'),
  child_name text not null,
  annual_interest_percent numeric(8, 4) not null default 0 check (annual_interest_percent >= 0),
  used_by uuid references public.profiles (id) on delete set null,
  created_at timestamptz not null default now()
);

create index if not exists child_invites_token_idx on public.child_invites (token);
create index if not exists child_invites_parent_idx on public.child_invites (parent_id);

-- Function to consume an invite
create or replace function public.consume_child_invite(p_token text)
returns void
language plpgsql
security definer
set search_path = public
as $$
declare
  v_invite record;
  v_email text;
begin
  select * into v_invite
  from public.child_invites
  where token = p_token and used_by is null;

  if v_invite is null then
    raise exception 'INVITE_NOT_FOUND' using errcode = 'P0001';
  end if;

  if exists (select 1 from public.profiles where id = auth.uid()) then
    raise exception 'PROFILE_EXISTS' using errcode = 'P0001';
  end if;

  select email into v_email from auth.users where id = auth.uid();

  insert into public.profiles (id, email, full_name, role, parent_id)
  values (auth.uid(), v_email, v_invite.child_name, 'child', v_invite.parent_id);

  insert into public.child_accounts (child_user_id, parent_id, annual_interest_percent)
  values (auth.uid(), v_invite.parent_id, greatest(0, v_invite.annual_interest_percent));

  update public.child_invites set used_by = auth.uid() where id = v_invite.id;
end;
$$;

grant execute on function public.consume_child_invite(text) to authenticated;

-- RLS
alter table public.profiles enable row level security;
alter table public.child_accounts enable row level security;
alter table public.deposits enable row level security;

drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select using (
    auth.uid() = id
    or parent_id = auth.uid()
  );

drop policy if exists "profiles_insert_self" on public.profiles;
create policy "profiles_insert_self" on public.profiles
  for insert with check (auth.uid() = id);

drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self" on public.profiles
  for update using (auth.uid() = id);

drop policy if exists "child_accounts_select" on public.child_accounts;
create policy "child_accounts_select" on public.child_accounts
  for select using (child_user_id = auth.uid() or parent_id = auth.uid());

drop policy if exists "child_accounts_update_parent" on public.child_accounts;
create policy "child_accounts_update_parent" on public.child_accounts
  for update using (parent_id = auth.uid());

drop policy if exists "deposits_select" on public.deposits;
create policy "deposits_select" on public.deposits
  for select using (
    exists (
      select 1 from public.child_accounts ca
      where ca.id = deposits.child_account_id
        and (ca.child_user_id = auth.uid() or ca.parent_id = auth.uid())
    )
  );

drop policy if exists "deposits_insert_parent" on public.deposits;
create policy "deposits_insert_parent" on public.deposits
  for insert with check (
    exists (
      select 1 from public.child_accounts ca
      where ca.id = child_account_id
        and ca.parent_id = auth.uid()
    )
  );

-- child_invites RLS
alter table public.child_invites enable row level security;

drop policy if exists "child_invites_select" on public.child_invites;
create policy "child_invites_select" on public.child_invites
  for select using (true);

drop policy if exists "child_invites_insert_parent" on public.child_invites;
create policy "child_invites_insert_parent" on public.child_invites
  for insert with check (parent_id = auth.uid());
