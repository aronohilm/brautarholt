import crypto from 'crypto'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  // Verify the webhook came from Straumur and not someone else
  const signature = req.headers['straumur-signature']
  const rawBody = JSON.stringify(req.body)
  const expected = crypto
    .createHmac('sha256', process.env.STRAUMUR_WEBHOOK_SECRET)
    .update(rawBody)
    .digest('hex')

  if (signature !== expected) {
    console.error('Webhook signature mismatch')
    return res.status(401).json({ error: 'Invalid signature' })
  }

  const { event, order_id, status } = req.body

  // Only act on payment events
  if (event !== 'payment.completed' && event !== 'payment.failed') {
    return res.status(200).json({ received: true })
  }

  const newStatus = status === 'paid' ? 'paid' : 'failed'

  const updateRes = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/orders?id=eq.${order_id}`,
    {
      method: 'PATCH',
      headers: {
        apikey: process.env.SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        status: newStatus,
        paid_at: newStatus === 'paid' ? new Date().toISOString() : null,
      }),
    }
  )

  if (!updateRes.ok) {
    const err = await updateRes.text()
    console.error('Supabase update failed:', err)
    return res.status(500).json({ error: 'Failed to update order' })
  }

  return res.status(200).json({ received: true })
}
