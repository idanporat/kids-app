-- Game progress synced from child's device (invite token) for parent dashboard

create table if not exists public.child_game_progress (
  child_account_id uuid primary key references public.child_accounts (id) on delete cascade,
  data jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

create index if not exists child_game_progress_updated_idx
  on public.child_game_progress (updated_at desc);

alter table public.child_game_progress enable row level security;

drop policy if exists "child_game_progress_parent_select" on public.child_game_progress;
create policy "child_game_progress_parent_select" on public.child_game_progress
  for select using (
    exists (
      select 1 from public.child_accounts ca
      where ca.id = child_account_id
        and ca.parent_id = auth.uid()
    )
  );

-- Upsert from child's browser using invite token (anon / no child auth)
create or replace function public.sync_game_progress_by_token(p_token text, p_data jsonb)
returns void
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
    raise exception 'INVALID_TOKEN' using errcode = 'P0001';
  end if;

  insert into public.child_game_progress (child_account_id, data, updated_at)
  values (v_account_id, p_data, now())
  on conflict (child_account_id) do update
  set data = excluded.data,
      updated_at = excluded.updated_at;
end;
$$;

grant execute on function public.sync_game_progress_by_token(text, jsonb) to anon, authenticated;
