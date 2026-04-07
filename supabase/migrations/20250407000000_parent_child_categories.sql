-- הגדרות הורה: אילו קטגוריות הילד רואה (חיסכון, משחקים, והרחבות עתידיות)
create table if not exists public.parent_settings (
  parent_id uuid primary key references public.profiles (id) on delete cascade,
  enabled_child_categories text[] not null default array['savings', 'games']::text[]
);

insert into public.parent_settings (parent_id, enabled_child_categories)
select id, array['savings', 'games']::text[]
from public.profiles
where role = 'parent'
on conflict (parent_id) do nothing;

create or replace function public.ensure_parent_settings_row()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.role = 'parent' then
    insert into public.parent_settings (parent_id)
    values (new.id)
    on conflict (parent_id) do nothing;
  end if;
  return new;
end;
$$;

drop trigger if exists trg_profiles_parent_settings on public.profiles;
create trigger trg_profiles_parent_settings
  after insert on public.profiles
  for each row execute function public.ensure_parent_settings_row();

alter table public.parent_settings enable row level security;

drop policy if exists "parent_settings_select_own" on public.parent_settings;
create policy "parent_settings_select_own" on public.parent_settings
  for select using (parent_id = auth.uid());

drop policy if exists "parent_settings_insert_own" on public.parent_settings;
create policy "parent_settings_insert_own" on public.parent_settings
  for insert with check (parent_id = auth.uid());

drop policy if exists "parent_settings_update_own" on public.parent_settings;
create policy "parent_settings_update_own" on public.parent_settings
  for update using (parent_id = auth.uid()) with check (parent_id = auth.uid());

-- ילדים רואים את הגדרות ההורה שלהם (לקריאה בלבד מהאפליקציה כשמחוברים)
drop policy if exists "parent_settings_select_by_child" on public.parent_settings;
create policy "parent_settings_select_by_child" on public.parent_settings
  for select using (
    exists (
      select 1 from public.profiles c
      where c.id = auth.uid()
        and c.role = 'child'
        and c.parent_id = parent_settings.parent_id
    )
  );

-- הרחבת get_child_account_by_token לקטגוריות (נגיש עם טוקן — security definer)
drop function if exists public.get_child_account_by_token(text);

create or replace function public.get_child_account_by_token(p_token text)
returns table (
  account_id uuid,
  child_name text,
  balance numeric,
  annual_interest_percent numeric,
  parent_name text,
  avatar_url text,
  enabled_child_categories text[]
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
      ca.avatar_url,
      coalesce(
        ps.enabled_child_categories,
        array['savings', 'games']::text[]
      ) as enabled_child_categories
    from public.child_invites ci
    join public.child_accounts ca on ca.id = ci.child_account_id
    join public.profiles p on p.id = ca.parent_id
    left join public.parent_settings ps on ps.parent_id = ca.parent_id
    where ci.token = p_token;
end;
$$;

grant execute on function public.get_child_account_by_token(text) to anon, authenticated;
