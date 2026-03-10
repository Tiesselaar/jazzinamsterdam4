create
or
replace view test_view
with
  (security_invoker = on) as
select
  *
from
  view_gigs_with_time