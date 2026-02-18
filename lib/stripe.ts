import Stripe from 'stripe'

// Lazy getter — safe at build time when STRIPE_SECRET_KEY is not set
export function getStripe(): Stripe {
  const key = process.env.STRIPE_SECRET_KEY
  if (!key) throw new Error('STRIPE_SECRET_KEY is not configured')
  return new Stripe(key, { apiVersion: '2026-01-28.clover' })
}

export const isStripeConfigured = !!process.env.STRIPE_SECRET_KEY
