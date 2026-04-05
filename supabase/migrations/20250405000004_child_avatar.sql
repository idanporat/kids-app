-- Add avatar_url to child_accounts
alter table public.child_accounts add column if not exists avatar_url text;

-- Allow parent to update child_accounts (for avatar_url and child_name)
drop policy if exists "child_accounts_update_parent" on public.child_accounts;
create policy "child_accounts_update_parent" on public.child_accounts
  for update using (parent_id = auth.uid())
  with check (parent_id = auth.uid());

-- Create storage bucket for child avatars
insert into storage.buckets (id, name, public)
values ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Allow authenticated users to upload to avatars bucket
create policy "avatars_insert" on storage.objects
  for insert to authenticated
  with check (bucket_id = 'avatars');

-- Allow authenticated users to update their uploads
create policy "avatars_update" on storage.objects
  for update to authenticated
  using (bucket_id = 'avatars');

-- Allow public read access to avatars
create policy "avatars_select" on storage.objects
  for select to anon, authenticated
  using (bucket_id = 'avatars');

-- Update get_child_account_by_token to include avatar_url
drop function if exists public.get_child_account_by_token(text);
create or replace function public.get_child_account_by_token(p_token text)
returns table (
  account_id uuid,
  child_name text,
  balance numeric,
  annual_interest_percent numeric,
  parent_name text,
  avatar_url text
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
      p.full_name as parent_name,
      ca.avatar_url
    from public.child_invites ci
    join public.child_accounts ca on ca.id = ci.child_account_id
    join public.profiles p on p.id = ca.parent_id
    where ci.token = p_token;
end;
$$;
