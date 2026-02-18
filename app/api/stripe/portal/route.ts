import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const stripeKey = process.env.STRIPE_SECRET_KEY

  if (!stripeKey) {
    return NextResponse.json({ demo: true, message: 'Billing portal unavailable in demo mode.' }, { status: 200 })
  }

  try {
    const { customerId } = await req.json() as { customerId: string }
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeKey, { apiVersion: '2026-01-28.clover' })

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? (req.headers.get('origin') || 'http://localhost:3000')

    const session = await stripe.billingPortal.sessions.create({
      customer: customerId,
      return_url: `${appUrl}/dashboard/subscription`,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Stripe error.'
    console.error('[stripe/portal]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
