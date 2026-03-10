CREATE or replace function cal_today(cal text)
RETURNS date
LANGUAGE sql STABLE
AS $$
  SELECT (current_timestamp AT TIME ZONE r.time_zone)::date
  FROM calendars c
  JOIN regions r USING (region)
  WHERE c.calendar = cal
$$;