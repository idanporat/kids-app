-- Idempotent fix: signature changes require DROP before CREATE (see 42P13).
-- Safe if 20250405000004 already ran — replaces with same 6-column shape.

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

grant execute on function public.get_child_account_by_token(text) to anon, authenticated;
