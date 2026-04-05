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

-- Function to consume an invite: called by an authenticated user opening the link
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

  -- Check user doesn't already have a profile
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
