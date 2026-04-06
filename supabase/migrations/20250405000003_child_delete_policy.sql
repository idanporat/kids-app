-- Allow parent to delete their own child accounts
drop policy if exists "child_accounts_delete_parent" on public.child_accounts;

create policy "child_accounts_delete_parent" on public.child_accounts
  for delete using (parent_id = auth.uid());
