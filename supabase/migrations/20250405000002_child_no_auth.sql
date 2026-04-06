-- Children don't register. The invite link IS the child's access.
-- 1. Add child_name to child_accounts (no profile for children)
-- 2. Make child_user_id nullable
-- 3. Link child_invites to child_account_id

-- Add child_name column to child_accounts
alter table public.child_accounts add column if not exists child_name text;

-- Make child_user_id nullable
alter table public.child_accounts alter column child_user_id drop not null;

-- Drop the unique constraint on child_user_id (children may not have a user)
alter table public.child_accounts drop constraint if exists child_accounts_one_per_child;

-- Add child_account_id to child_invites
alter table public.child_invites add column if not exists child_account_id uuid references public.child_accounts (id) on delete cascade;

-- Remove used_by column (no child auth)
alter table public.child_invites drop column if exists used_by;

-- Update RLS: allow anonymous select on child_accounts via invite token
-- (done via security definer function, no direct anonymous access needed)

-- Update child_accounts select policy: also allow parent
drop policy if exists "child_accounts_select" on public.child_accounts;
create policy "child_accounts_select" on public.child_accounts
  for select using (parent_id = auth.uid());

-- Update child_accounts insert policy: parent can insert
drop policy if exists "child_accounts_insert_parent" on public.child_accounts;
create policy "child_accounts_insert_parent" on public.child_accounts
  for insert with check (parent_id = auth.uid());

-- Update deposits select: parent only (children view via public page)
drop policy if exists "deposits_select" on public.deposits;
create policy "deposits_select" on public.deposits
  for select using (
    exists (
      select 1 from public.child_accounts ca
      where ca.id = deposits.child_account_id
        and ca.parent_id = auth.uid()
    )
  );

-- Function to get child account data by token (no auth needed, called from server)
-- DROP first: Postgres cannot change OUT params with CREATE OR REPLACE (e.g. after a later migration adds columns).
drop function if exists public.get_child_account_by_token(text);

create or replace function public.get_child_account_by_token(p_token text)
returns table (
  account_id uuid,
  child_name text,
  balance numeric,
  annual_interest_percent numeric,
  parent_name text
)
language plpgsql
security definer
set search_path = public
as $$
begin
  return query
    select
      ca.id as account_id,
      ca.child_name,
      ca.balance,
      ca.annual_interest_percent,
      p.full_name as parent_name
    from public.child_invites ci
    join public.child_accounts ca on ca.id = ci.child_account_id
    join public.profiles p on p.id = ca.parent_id
    where ci.token = p_token;
end;
$$;

grant execute on function public.get_child_account_by_token(text) to anon, authenticated;

-- Function to get deposits by token (no auth needed)
create or replace function public.get_deposits_by_token(p_token text, p_limit int default 30)
returns table (
  id uuid,
  amount numeric,
  note text,
  created_at timestamptz
)
language plpgsql
security definer
set search_path = public
as $$
declare
  v_account_id uuid;
begin
  select ci.child_account_id into v_account_id
  from public.child_invites ci
  where ci.token = p_token;

  if v_account_id is null then
    return;
  end if;

  return query
    select d.id, d.amount, d.note, d.created_at
    from public.deposits d
    where d.child_account_id = v_account_id
    order by d.created_at desc
    limit p_limit;
end;
$$;

grant execute on function public.get_deposits_by_token(text, int) to anon, authenticated;
