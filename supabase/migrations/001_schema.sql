-- Enable pgcrypto for encryption
create extension if not exists pgcrypto;

-- Profiles (extends auth.users)
create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'patient' check (role in ('patient', 'provider')),
  full_name text,
  date_of_birth date,
  state text,
  created_at timestamptz default now()
);

-- Peptides catalog
create table public.peptides (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  category text not null check (category in ('weight_loss', 'recovery', 'longevity', 'cognitive', 'other')),
  description text,
  mechanism text,
  dosage_range text,
  price_monthly integer not null, -- cents
  stripe_price_id text,
  image_url text,
  fda_status text,
  is_available boolean default true,
  created_at timestamptz default now()
);

-- Intake submissions (quiz answers)
create table public.intake_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles(id) on delete cascade,
  goals text[] default '{}',
  medical_history jsonb default '{}', -- encrypted at app layer
  contraindications text[] default '{}',
  experience_level text check (experience_level in ('beginner', 'intermediate', 'expert')),
  recommended_protocols uuid[] default '{}',
  status text not null default 'pending' check (status in ('pending', 'reviewed')),
  created_at timestamptz default now()
);

-- Prescriptions
create table public.prescriptions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.profiles(id) on delete cascade,
  provider_id uuid references public.profiles(id),
  peptide_id uuid not null references public.peptides(id),
  intake_submission_id uuid references public.intake_submissions(id),
  dosage text,
  frequency text,
  duration_weeks integer,
  status text not null default 'pending' check (status in ('pending', 'approved', 'denied', 'active', 'cancelled')),
  notes text,
  approved_at timestamptz,
  created_at timestamptz default now()
);

-- Subscriptions (linked to Stripe)
create table public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  patient_id uuid not null references public.profiles(id) on delete cascade,
  prescription_id uuid references public.prescriptions(id),
  stripe_subscription_id text unique,
  stripe_customer_id text,
  status text not null default 'active',
  current_period_end timestamptz,
  created_at timestamptz default now()
);

-- Messages
create table public.messages (
  id uuid primary key default gen_random_uuid(),
  prescription_id uuid not null references public.prescriptions(id) on delete cascade,
  sender_id uuid not null references public.profiles(id),
  body text not null,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- Order status (simulates pharmacy fulfillment)
create table public.order_status (
  id uuid primary key default gen_random_uuid(),
  prescription_id uuid not null references public.prescriptions(id) on delete cascade unique,
  status text not null default 'processing' check (status in ('processing', 'compounding', 'shipped', 'delivered')),
  tracking_number text,
  updated_at timestamptz default now()
);

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data->>'full_name');
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- RLS
alter table public.profiles enable row level security;
alter table public.peptides enable row level security;
alter table public.intake_submissions enable row level security;
alter table public.prescriptions enable row level security;
alter table public.subscriptions enable row level security;
alter table public.messages enable row level security;
alter table public.order_status enable row level security;

-- Profiles: users see their own; providers see all
create policy "Own profile" on public.profiles for all using (auth.uid() = id);
create policy "Providers see all profiles" on public.profiles for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'provider'));

-- Peptides: public read
create policy "Public read peptides" on public.peptides for select using (true);

-- Intake submissions: patients own; providers see all
create policy "Own intake" on public.intake_submissions for all using (auth.uid() = user_id);
create policy "Providers see intake" on public.intake_submissions for select
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'provider'));
create policy "Providers update intake" on public.intake_submissions for update
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'provider'));

-- Prescriptions: patients read own; providers read+write all
create policy "Own prescriptions" on public.prescriptions for select using (auth.uid() = patient_id);
create policy "Providers manage prescriptions" on public.prescriptions for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'provider'));

-- Subscriptions: patients read own; providers cannot modify
create policy "Own subscriptions" on public.subscriptions for select using (auth.uid() = patient_id);

-- Messages: sender or prescription patient/provider
create policy "Message participants" on public.messages for all
  using (
    auth.uid() = sender_id or
    exists (
      select 1 from public.prescriptions pr
      where pr.id = prescription_id
      and (pr.patient_id = auth.uid() or pr.provider_id = auth.uid())
    )
  );

-- Order status: patients read own; providers manage
create policy "Own order status" on public.order_status for select
  using (exists (select 1 from public.prescriptions pr where pr.id = prescription_id and pr.patient_id = auth.uid()));
create policy "Providers manage orders" on public.order_status for all
  using (exists (select 1 from public.profiles p where p.id = auth.uid() and p.role = 'provider'));
