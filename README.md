# 🛹 Urban Gliding Hyderabad

**Hyderabad's premier inline skating & skateboarding community.**  
IOC Certified coaching · 160+ active gliders · Society camps across Hyderabad

🌐 **Live site:** [wwleela.github.io](https://wwleela.github.io)

---

## About

Urban Gliding Hyderabad (UGH) brings structured, certified skate coaching directly to residential communities across Hyderabad. Founded by Coach Leela Madhav, UGH offers everything from free Phase 1 exposure workshops to ongoing Phase 2 subscription coaching — inline skating, skateboarding, and urban mobility skills for ages 5 and up.

---

## Tech Stack

| Layer | Technology | Cost |
|---|---|---|
| Hosting | GitHub Pages | Free |
| Frontend | HTML · Tailwind CSS · GSAP | Free |
| Auth | Clerk (10K MAU) | Free |
| Payments | Seedhape (UPI) | % fee only |
| Webhook backend | Render (Node.js) | Free tier |
| Email | Resend (3K/month) | Free |
| Database / counter | Supabase | Free tier |
| Analytics | Google Analytics 4 | Free |
| Heatmaps | Microsoft Clarity | Free |

**Total infrastructure cost: ₹0/month**

---

## Features

- **Payment flow** — Seedhape UPI → Render webhook → confirmation email (Resend) + community counter increment (Supabase)
- **Live community counter** — reads `registered_count` from Supabase in real time, increments on every verified payment
- **Login / Logout** — Clerk authentication, member zone unlocks on sign-in
- **FAQ Chatbot** — static keyword-matching widget, covers 8 most common WhatsApp queries, WhatsApp fallback
- **Google Review popup** — fires after 60% scroll depth + 10s on page, once per visitor
- **Phase 1 Update Grid** — 6 embedded summer camp workshop photos with lightbox
- **GSAP motion** — page entrance sequence, scroll reveals, magnetic CTAs, smooth anchor scroll
- **Analytics** — GA4 conversion tracking + Clarity heatmaps/session recordings
- **Security** — SRI hashes on CDN scripts, `rel="noopener noreferrer"` on all external links, XSS sanitization in chatbot, no secrets in frontend

---

## Repository Structure

```
wwleela.github.io/
├── index.html          # Full site (single file, self-contained)
└── README.md           # This file
```

The backend lives in a separate repository deployed to Render:

```
ugh-webhook/
├── webhook.js          # Node.js Express webhook handler
└── package.json        # Dependencies: express, express-rate-limit
```

---

## Environment Variables (Render)

Set these in your Render service → Environment:

| Variable | Description |
|---|---|
| `SEEDHAPE_WEBHOOK_SECRET` | Webhook signing secret from Seedhape dashboard |
| `RESEND_API_KEY` | API key from resend.com |
| `OWNER_EMAIL` | Your email for sale + dispute notifications |
| `SUPABASE_URL` | `https://tatepjlilnfsvxnqxlud.supabase.co` |
| `SUPABASE_SERVICE_KEY` | `service_role` key from Supabase project settings |

---

## Supabase Setup (one-time SQL)

Run in Supabase SQL Editor:

```sql
CREATE TABLE IF NOT EXISTS community_stats (
  id                INTEGER PRIMARY KEY DEFAULT 1,
  registered_count  INTEGER NOT NULL DEFAULT 0,
  updated_at        TIMESTAMPTZ DEFAULT NOW()
);

INSERT INTO community_stats (id, registered_count)
VALUES (1, 160)
ON CONFLICT (id) DO UPDATE SET registered_count = 160;

CREATE OR REPLACE FUNCTION increment_count()
RETURNS void LANGUAGE plpgsql AS $$
BEGIN
  UPDATE community_stats
  SET registered_count = registered_count + 1, updated_at = NOW()
  WHERE id = 1;
END;
$$;

ALTER TABLE community_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public_read" ON community_stats FOR SELECT USING (true);
```

---

## Updating Content

**Change community counter:** Update the seed value in Supabase SQL Editor.

**Add/update FAQ answers:** Edit the `FAQS` array in `index.html` (search for `var FAQS`).

**Add workshop photos:** Replace the base64 values in the photo data block (search for `var photos = [`).

**Update programs/pricing:** Edit the Programs section in `index.html`.

---

## Deployment

```bash
# 1. Edit index.html on GitHub directly (pencil icon)
# 2. Commit changes
# 3. GitHub Pages auto-deploys in ~60 seconds

# Or clone and push:
git clone https://github.com/wwleela/wwleela.github.io
# edit index.html
git add index.html
git commit -m "update: [description]"
git push
```

---

## Contact

**Coach Leela Madhav**  
📱 WhatsApp: [+91 63048 95686](https://wa.me/916304895686)  
🌐 [wwleela.github.io](https://wwleela.github.io)  
📍 Hyderabad, Telangana  
💳 UPI: `worldwide.leelamadhav@oksbi`

---

*Built with care. Every rupee goes directly to the skate community.*
