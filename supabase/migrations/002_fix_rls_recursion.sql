-- Fix infinite recursion in RLS policies
-- The "Providers see all profiles" policy was causing recursion

-- Drop the problematic policies
drop policy if exists "Providers see all profiles" on public.profiles;
drop policy if exists "Providers see intake" on public.intake_submissions;
drop policy if exists "Providers update intake" on public.intake_submissions;
drop policy if exists "Providers manage prescriptions" on public.prescriptions;
drop policy if exists "Providers manage orders" on public.order_status;

-- Fixed: Check role via a function instead of self-referencing
create or replace function public.is_provider(user_id uuid)
returns boolean as $$
  select exists (select 1 from public.profiles where id = user_id and role = 'provider');
$$ language sql security definer;

-- Profiles: users see their own; providers see all
create policy "Own profile" on public.profiles for all using (auth.uid() = id);
create policy "Providers see all profiles" on public.profiles for select
  using (public.is_provider(auth.uid()));

-- Intake submissions: patients own; providers see all
create policy "Own intake" on public.intake_submissions for all using (auth.uid() = user_id);
create policy "Providers see intake" on public.intake_submissions for select
  using (public.is_provider(auth.uid()));
create policy "Providers update intake" on public.intake_submissions for update
  using (public.is_provider(auth.uid()));

-- Prescriptions: patients read own; providers read+write all
create policy "Own prescriptions" on public.prescriptions for select using (auth.uid() = patient_id);
create policy "Providers manage prescriptions" on public.prescriptions for all
  using (public.is_provider(auth.uid()));

-- Order status: patients read own; providers manage
create policy "Own order status" on public.order_status for select
  using (exists (select 1 from public.prescriptions pr where pr.id = prescription_id and pr.patient_id = auth.uid()));
create policy "Providers manage orders" on public.order_status for all
  using (public.is_provider(auth.uid()));

-- Grant execute permission on the function
grant execute on function public.is_provider(uuid) to anon, authenticated;
