-- Allow parents to update their children's profiles (e.g. name)
drop policy if exists "profiles_update_self" on public.profiles;
create policy "profiles_update_self" on public.profiles
  for update using (auth.uid() = id or parent_id = auth.uid());
