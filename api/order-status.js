export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { orderId } = req.query

  if (!orderId) {
    return res.status(400).json({ error: 'Missing orderId' })
  }

  const fetchRes = await fetch(
    `${process.env.SUPABASE_URL}/rest/v1/orders?id=eq.${orderId}&select=id,status,membership_tier,first_name,last_name,email`,
    {
      headers: {
        apikey: process.env.SUPABASE_SERVICE_KEY,
        Authorization: `Bearer ${process.env.SUPABASE_SERVICE_KEY}`,
      },
    }
  )

  if (!fetchRes.ok) {
    return res.status(500).json({ error: 'Failed to fetch order' })
  }

  const rows = await fetchRes.json()

  if (!rows.length) {
    return res.status(404).json({ error: 'Order not found' })
  }

  return res.status(200).json(rows[0])
}
