-- cal_today.sql
CREATE or replace function cal_today(cal text)
RETURNS date
LANGUAGE sql STABLE
AS $$
  SELECT (current_timestamp AT TIME ZONE r.time_zone)::date
  FROM calendars c
  JOIN regions r USING (region)
  WHERE c.calendar = cal
$$;

-- mod.sql
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

