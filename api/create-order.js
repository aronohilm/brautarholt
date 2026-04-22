export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { form, tier } = req.body

  if (!form || !tier) {
    return res.status(400).json({ error: 'Missing form data or tier' })
  }

  const orderId = `BH-${Date.now()}-${Math.random().toString(36).slice(2, 7).toUpperCase()}`
  const amountISK = parseInt(tier.price.replace('.', ''), 10)

  // Save order to Supabase with status 'pending'
  const insertRes = await fetch(`${process.env.SUPABASE_URL}/rest/v1/orders`, {
    method: 'POST',
    headers: {
      apikey: process.env.SUPABASE_SERVICE_KEY,
      Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      'Content-Type': 'application/json',
      Prefer: 'return=representation',
    },
    body: JSON.stringify({
      id: orderId,
      status: 'pending',
      membership_tier: tier.name,
      membership_tag: tier.tag,
      amount_isk: amountISK,
      first_name: form.fornafn,
      last_name: form.eftirnafn,
      email: form.netfang,
      phone: form.simanumer,
      kennitala: form.kennitala,
      address: form.heimilisfang,
      city: form.baejarfelag,
      postal_code: form.postnumer,
      country: form.land,
      company: form.fyrirtaeki || null,
    }),
  })

  if (!insertRes.ok) {
    const err = await insertRes.text()
    console.error('Supabase insert failed:', err)
    return res.status(500).json({ error: 'Failed to create order' })
  }

  const siteUrl = process.env.SITE_URL || `https://${req.headers.host}`

  // Create Straumur Hosted Checkout session
  // See: https://docs.straumur.is (fill in your actual API endpoint + auth)
  const straumurRes = await fetch(`${process.env.STRAUMUR_API_URL}/v1/checkout/sessions`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${process.env.STRAUMUR_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      amount: amountISK,
      currency: 'ISK',
      order_id: orderId,
      description: `Brautarholt ${tier.name} Membership`,
      success_url: `${siteUrl}?payment=success&orderId=${orderId}`,
      cancel_url: `${siteUrl}?payment=cancelled&orderId=${orderId}`,
      customer: {
        name: `${form.fornafn} ${form.eftirnafn}`,
        email: form.netfang,
        phone: form.simanumer,
      },
    }),
  })

  if (!straumurRes.ok) {
    const err = await straumurRes.text()
    console.error('Straumur session creation failed:', err)
    return res.status(500).json({ error: 'Failed to create payment session' })
  }

  const session = await straumurRes.json()

  return res.status(200).json({ checkoutUrl: session.url, orderId })
}
