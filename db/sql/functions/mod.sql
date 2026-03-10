create or replace function public.is_moderator()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from permissions
    where moderator_id = auth.uid()
  );
$$;