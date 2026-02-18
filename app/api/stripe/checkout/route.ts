import { NextRequest, NextResponse } from 'next/server'

interface CheckoutBody {
  priceId: string
  userId: string
  intakeSubmissionId: string
}

export async function POST(req: NextRequest) {
  const stripeSecretKey = process.env.STRIPE_SECRET_KEY

  // Demo mode — Stripe not configured
  if (!stripeSecretKey) {
    return NextResponse.json(
      { demo: true, error: 'Checkout unavailable in demo mode.' },
      { status: 200 },
    )
  }

  let body: CheckoutBody
  try {
    body = (await req.json()) as CheckoutBody
  } catch {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 })
  }

  const { priceId, userId, intakeSubmissionId } = body

  if (!priceId || !userId) {
    return NextResponse.json({ error: 'Missing required fields.' }, { status: 400 })
  }

  try {
    // Dynamic import: stripe is an optional peer dep — won't crash at build if not installed
    const Stripe = (await import('stripe')).default
    const stripe = new Stripe(stripeSecretKey, { apiVersion: '2026-01-28.clover' })

    const appUrl =
      process.env.NEXT_PUBLIC_APP_URL ??
      (req.headers.get('origin') || 'http://localhost:3000')

    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${appUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/quiz`,
      metadata: { userId, intakeSubmissionId },
      allow_promotion_codes: true,
    })

    return NextResponse.json({ url: session.url })
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Stripe error.'
    console.error('[stripe/checkout]', message)
    return NextResponse.json({ error: message }, { status: 500 })
  }
}
