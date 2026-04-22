# Brautarholt — Setup Guide

This guide walks you through getting the website live and accepting payments. No technical experience needed — just follow each step in order.

---

## What you'll need accounts for

- **GitHub** — stores the website code (free)
- **Vercel** — runs the website online (free)
- **Supabase** — stores your membership orders (free)
- **Straumur** — processes card payments (your existing merchant account)

---

## Step 1 — Create a Supabase account

1. Go to [supabase.com](https://supabase.com) and click **Start your project**
2. Sign up with your email
3. Click **New project**, give it any name (e.g. `brautarholt`), pick a region close to Iceland, set a strong password, click **Create new project**
4. Wait about 1 minute for it to finish setting up

**Create the orders table:**

5. In the left sidebar, click **SQL Editor**
6. Click **New query**
7. Copy and paste the entire block below into the editor, then click **Run**:

```sql
create table orders (
  id                text primary key,
  status            text not null default 'pending',
  membership_tier   text,
  membership_tag    text,
  amount_isk        integer,
  first_name        text,
  last_name         text,
  email             text,
  phone             text,
  kennitala         text,
  address           text,
  city              text,
  postal_code       text,
  country           text,
  company           text,
  paid_at           timestamptz,
  created_at        timestamptz not null default now()
);
```

**Get your API keys:**

8. In the left sidebar, click **Project Settings** (gear icon at the bottom)
9. Click **API**
10. Copy the **Project URL** — you'll need this in Step 4
11. Under **Project API keys**, copy the **service_role** key (the long one that says "secret") — you'll need this in Step 4

> **Note:** Never share your service_role key with anyone.

---

## Step 2 — Get your Straumur API keys

1. Log in to your Straumur merchant dashboard
2. Find your **API credentials** (usually under Settings → Developers or API)
3. Copy your **Secret key** (starts with `sk_live_`)
4. Copy your **Webhook secret** (starts with `whsec_`)
5. Note your **API base URL** (something like `https://api.straumur.is`)

If you can't find these, contact Straumur support — they'll send them to you.

---

## Step 3 — Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and click **Sign Up**
2. Sign up with your email (or with GitHub if you have an account)
3. Click **Add New → Project**
4. Click **Import Git Repository** and connect to where the code is stored
5. Leave all build settings as they are — Vercel will detect everything automatically
6. Click **Deploy** and wait about 1 minute

Once deployed, Vercel gives you a URL like `https://brautarholt.vercel.app`. Copy this.

---

## Step 4 — Set your environment variables

These are the secret keys that connect the website to Supabase and Straumur. They are stored privately inside Vercel — nobody can see them from the website.

1. In your Vercel project, click **Settings** → **Environment Variables**
2. Add each of the following, one at a time (Name → Value → Save):

| Name | Value |
|---|---|
| `SUPABASE_URL` | Your Supabase Project URL from Step 1 |
| `SUPABASE_SERVICE_KEY` | Your Supabase service_role key from Step 1 |
| `STRAUMUR_API_URL` | Your Straumur API base URL from Step 2 |
| `STRAUMUR_SECRET_KEY` | Your Straumur secret key from Step 2 |
| `STRAUMUR_WEBHOOK_SECRET` | Your Straumur webhook secret from Step 2 |
| `SITE_URL` | Your Vercel URL from Step 3 (e.g. `https://brautarholt.vercel.app`) |

3. After adding all six, go to **Deployments**, click the three dots next to the latest deployment, and click **Redeploy**

---

## Step 5 — Set up the Straumur webhook

This tells Straumur where to send payment confirmations.

1. In your Straumur dashboard, find **Webhooks** (usually under Settings → Developers)
2. Click **Add endpoint** or **Create webhook**
3. Set the URL to: `https://YOUR-VERCEL-URL/api/webhook`
   (Replace `YOUR-VERCEL-URL` with your actual Vercel URL from Step 3)
4. Select the events: **payment.completed** and **payment.failed**
5. Save

---

## Viewing your members

All membership orders are stored in Supabase.

1. Go to [supabase.com](https://supabase.com) and open your project
2. Click **Table Editor** in the left sidebar
3. Click the **orders** table

You'll see every person who has signed up, what membership they chose, whether they've paid, and their contact details. You can sort, filter, and export to CSV from here.

---

## That's it

The website is live, payments go through Straumur, and every paid member appears in your Supabase orders table.

If something isn't working, check **Vercel → Functions → Logs** to see error messages.
