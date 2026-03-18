# Deploying Next.js (Standalone) on cPanel Shared Hosting
## The Witches BD — Step by Step Guide

---

## ⚠️ Important Warning First

Most **cheap shared cPanel hosts** (Hostinger, Namecheap shared, etc.) do **NOT** support
running Node.js servers persistently. You need a host that offers:

✅ **Node.js App Manager** in cPanel (look for "Setup Node.js App" in your cPanel dashboard)
✅ Persistent process management (PM2 or Phusion Passenger)
✅ SSH access

**Recommended hosts that work:**
- Hostinger Business/Cloud plan
- A2 Hosting (Turbo plans)
- SiteGround (Growth/GoGeek)
- Namecheap EasyWP (not shared — use their VPS)
- **Easiest alternative: Railway.app or Render.com (free tier, zero config)**

---

## STEP 1 — Prepare Your Local Build

### 1.1 Make sure next.config.ts is correct

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',   // ← must be standalone
  reactStrictMode: true,
  // ... rest of your config
};
```

### 1.2 Build the app locally

```bash
npm run build
```

After build succeeds, you'll have a `.next/standalone` folder.

### 1.3 Copy static assets into standalone (REQUIRED — Next.js doesn't do this automatically)

```bash
# Copy public folder
cp -r public .next/standalone/public

# Copy static assets
cp -r .next/static .next/standalone/.next/static
```

### 1.4 Test the standalone build locally before uploading

```bash
node .next/standalone/server.js
# Visit http://localhost:3000 — should work perfectly
```

If it works locally, you're ready to upload.

---

## STEP 2 — Prepare the Upload Package

### 2.1 Create a clean deployment folder

```bash
mkdir witches-bd-deploy
cp -r .next/standalone/* witches-bd-deploy/
```

Your `witches-bd-deploy` folder should contain:
```
witches-bd-deploy/
├── server.js          ← the Node.js server entry point
├── package.json
├── node_modules/      ← only production deps (much smaller)
├── .next/
│   └── static/
└── public/
```

### 2.2 Zip it up

```bash
cd witches-bd-deploy
zip -r ../witches-bd-deploy.zip .
```

---

## STEP 3 — cPanel Setup

### 3.1 Log into cPanel → File Manager

1. Go to `yourdomain.com/cpanel` or your host's cPanel URL
2. Open **File Manager**
3. Navigate to your domain's root — usually `public_html` or a subdomain folder
4. Create a new folder **outside** `public_html` for the app files:
   - Navigate to `/home/yourusername/`
   - Create folder: `witches-bd`

> ⚠️ Keep app files OUTSIDE public_html for security.
> Only the reverse proxy config lives in public_html.

### 3.2 Upload and extract

1. Enter `/home/yourusername/witches-bd/`
2. Click **Upload** → upload `witches-bd-deploy.zip`
3. Once uploaded, right-click the zip → **Extract**
4. Delete the zip after extracting

### 3.3 Set up Node.js App in cPanel

1. In cPanel dashboard, find **"Setup Node.js App"** (or "Node.js Selector")
2. Click **"Create Application"**
3. Fill in:
   - **Node.js version**: Select 18.x or 20.x (latest LTS)
   - **Application mode**: Production
   - **Application root**: `/home/yourusername/witches-bd`
   - **Application URL**: your domain or subdomain
   - **Application startup file**: `server.js`
4. Click **Create**

### 3.4 Set environment variables

In the Node.js App settings, add these environment variables:
```
NODE_ENV=production
PORT=3000
HOSTNAME=0.0.0.0
```

Add any other env vars your app needs (database URLs, API keys, etc.)

### 3.5 Install dependencies (if node_modules missing)

In the Node.js App panel, click **"Run NPM Install"**
Or via SSH:
```bash
cd /home/yourusername/witches-bd
npm install --production
```

---

## STEP 4 — Domain / Subdomain Configuration

### 4.1 If deploying to a subdomain (e.g. shop.yourdomain.com)

1. cPanel → **Subdomains**
2. Create subdomain: `shop`
3. Document root: `/home/yourusername/public_html/shop` (this is just for the proxy)

### 4.2 Set up reverse proxy via .htaccess

Go to `public_html` (or your subdomain's document root) and create/edit `.htaccess`:

```apache
RewriteEngine On

# Handle HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Proxy everything to Next.js Node server on port 3000
RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]

# Required for mod_proxy
ProxyPassReverse / http://127.0.0.1:3000/
```

> ⚠️ This requires `mod_proxy` and `mod_rewrite` to be enabled on your host.
> Most modern cPanel hosts have these. If not, contact support.

---

## STEP 5 — Start the App

### 5.1 Via cPanel Node.js App Manager

Click **"Run"** or **"Restart"** in the Node.js App panel.

### 5.2 Via SSH (more reliable)

```bash
ssh yourusername@yourdomain.com

cd /home/yourusername/witches-bd

# Install PM2 globally if not available
npm install -g pm2

# Start the app with PM2
pm2 start server.js --name "witches-bd" --env production

# Save PM2 process list so it restarts on server reboot
pm2 save
pm2 startup
```

### 5.3 Verify it's running

```bash
pm2 status
# Should show: witches-bd | online

curl http://localhost:3000
# Should return your HTML
```

---

## STEP 6 — SSL Certificate

1. cPanel → **SSL/TLS** → **Let's Encrypt SSL** (free)
2. Select your domain → **Install**
3. Done — your site is now HTTPS

---

## STEP 7 — Test Everything

Visit your domain and check:
- [ ] Home page loads
- [ ] Images load (check browser console for 404s)
- [ ] Shop page loads and filters work
- [ ] Mobile layout looks correct
- [ ] Cart works
- [ ] No console errors

---

## STEP 8 — Updating the App (Redeployment)

Every time you make changes:

```bash
# 1. Build locally
npm run build

# 2. Copy static assets
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# 3. Zip
cd .next/standalone && zip -r ../../new-deploy.zip .

# 4. Upload to cPanel File Manager → extract → overwrite files

# 5. Restart via SSH
pm2 restart witches-bd
```

---

## Troubleshooting

| Problem | Fix |
|---|---|
| 502 Bad Gateway | Node app isn't running — check `pm2 status` |
| Images not loading | Make sure you copied `public/` and `.next/static/` into standalone |
| 404 on all pages | `.htaccess` proxy not configured or `mod_proxy` disabled |
| App crashes on start | Check logs: `pm2 logs witches-bd` |
| "Cannot find module" | Run `npm install` inside the standalone folder |
| Port already in use | `pm2 delete witches-bd` then `pm2 start server.js` |
| Changes not showing | Hard refresh (Ctrl+Shift+R) or `pm2 restart witches-bd` |

---

## Easier Alternatives (if cPanel gives you trouble)

If your host doesn't support Node.js apps properly, these are **zero-config** options:

| Platform | Free Tier | Steps |
|---|---|---|
| **Railway.app** | $5/mo credit | Connect GitHub → auto deploys |
| **Render.com** | Free (spins down) | Connect GitHub → done |
| **Vercel** | Free | `npx vercel` in your project folder |
| **Fly.io** | Free allowance | `flyctl launch` |

Vercel is made by the Next.js team — it's the easiest and most optimized option.

---

*Guide written for The Witches BD — Next.js 15 Standalone deployment*