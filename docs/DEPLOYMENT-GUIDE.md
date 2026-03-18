# Deploying Next.js (Standalone) on cPanel Shared Hosting
## The Witches BD — Complete Deployment Guide

---

## 📋 Prerequisites Checklist

Before starting, make sure your cPanel hosting supports:

- [ ] **Node.js App Manager** (look for "Setup Node.js App" in cPanel)
- [ ] **SSH Access** (optional but recommended)
- [ ] **Apache with mod_proxy** (for reverse proxy)
- [ ] **Node.js 18+ or 20+** available

> ⚠️ **If your host doesn't have Node.js App Manager**, you cannot run this app on shared hosting. Use Vercel, Railway, or Render instead (see bottom of this guide).

---

## STEP 1 — Build the Project Locally

### 1.1 Verify next.config.ts

Your `next.config.ts` should already have `output: 'standalone'`:

```typescript
const nextConfig: NextConfig = {
  output: 'standalone',   // ← Required for self-hosting
  reactStrictMode: true,
  images: {
    unoptimized: true,    // ← Recommended for shared hosting (no image API needed)
  },
};
```

> **Note:** Adding `images.unoptimized: true` prevents issues with Next.js image optimization on shared hosting.

### 1.2 Run the production build

```bash
npm run build
```

Wait for the build to complete. You should see:
```
✓ Compiled successfully
✓ Generating static pages
✓ Collecting build traces
```

### 1.3 Copy static assets (CRITICAL)

Next.js standalone build does NOT include static files automatically. You must copy them:

```bash
# Copy public folder (images, favicons, etc.)
cp -r public .next/standalone/public

# Copy static assets (CSS, JS chunks)
cp -r .next/static .next/standalone/.next/static
```

### 1.4 Test locally before uploading

```bash
node .next/standalone/server.js
```

Open http://localhost:3000 in your browser. Verify:
- [ ] Homepage loads with images
- [ ] Shop page works
- [ ] Category icons display correctly
- [ ] No console errors

If everything works, your build is ready for deployment.

---

## STEP 2 — Create Deployment Package

### 2.1 Create a clean deployment folder

```bash
# From your project root
mkdir -p ../witches-bd-deploy
cp -r .next/standalone/* ../witches-bd-deploy/
```

### 2.2 Verify the deployment folder structure

Your `witches-bd-deploy` folder should contain:

```
witches-bd-deploy/
├── server.js              ← Entry point (DO NOT RENAME)
├── package.json           ← Production dependencies only
├── node_modules/          ← Pre-built, smaller than dev
├── .next/
│   └── static/            ← CSS, JS chunks
└── public/
    ├── products/          ← Product images
    ├── favicons/          ← Favicon files
    └── logo.webp          ← Logo
```

### 2.3 Create the ZIP archive

```bash
cd ../witches-bd-deploy
zip -r ../witches-bd-deploy.zip .
cd ..
```

You now have `witches-bd-deploy.zip` ready to upload.

---

## STEP 3 — Upload to cPanel

### 3.1 Access cPanel File Manager

1. Log into cPanel: `https://yourdomain.com:2083` or via your hosting dashboard
2. Open **File Manager**
3. Navigate to your home directory: `/home/yourusername/`

### 3.2 Create app directory (outside public_html)

1. Click **+ Folder** to create a new folder
2. Name it `witches-bd` (or your preferred name)
3. This folder will be at: `/home/yourusername/witches-bd/`

> 🔒 **Security:** Keep app files OUTSIDE `public_html`. Only the proxy configuration goes in `public_html`.

### 3.3 Upload and extract

1. Enter the `witches-bd` folder you created
2. Click **Upload**
3. Select `witches-bd-deploy.zip` from your computer
4. Wait for upload to complete
5. Right-click the ZIP file → **Extract**
6. Delete the ZIP file after extraction

### 3.4 Verify uploaded files

Your cPanel folder should now contain:
```
/home/yourusername/witches-bd/
├── server.js
├── package.json
├── node_modules/
├── .next/
└── public/
```

---

## STEP 4 — Configure Node.js App in cPanel

### 4.1 Open Node.js App Manager

1. In cPanel dashboard, find **"Setup Node.js App"** or **"Node.js Selector"**
2. Click **"Create Application"**

### 4.2 Fill in application settings

| Setting | Value |
|---------|-------|
| **Node.js version** | 18.x or 20.x (LTS recommended) |
| **Application mode** | Production |
| **Application root** | `/home/yourusername/witches-bd` |
| **Application URL** | Your domain (e.g., `yourdomain.com`) |
| **Application startup file** | `server.js` |
| **Port** | Leave empty (auto-assigned) |

Click **Create** when done.

### 4.3 Set environment variables

In the Node.js App panel, scroll to **Environment variables** and add:

```
NODE_ENV=production
HOSTNAME=0.0.0.0
```

> **Note:** The port is usually auto-assigned by cPanel. Check the "Port" field in the app details.

### 4.4 Start the application

Click **"Run"** or **"Restart"** in the Node.js App panel.

The status should change to **"Running"**.

---

## STEP 5 — Configure Reverse Proxy (Apache)

### 5.1 Determine your Node.js port

In the Node.js App panel, look for the assigned port (usually something like `3000`, `8080`, or a random number like `12345`).

Write it down: **Your Port: __________**

### 5.2 Create .htaccess in public_html

1. Go to **File Manager**
2. Navigate to `public_html` (or your subdomain folder)
3. Create or edit `.htaccess`
4. Add the following (replace `3000` with YOUR port):

```apache
RewriteEngine On

# Force HTTPS
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# Proxy all requests to Node.js
RewriteRule ^$ http://127.0.0.1:3000/ [P,L]
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule ^(.*)$ http://127.0.0.1:3000/$1 [P,L]

# Required for proxy responses
ProxyPassReverse / http://127.0.0.1:3000/
```

> **Important:** Replace `3000` with the actual port from Step 5.1.

### 5.3 Alternative: Using Passenger (some hosts)

If your host uses Phusion Passenger instead of Apache proxy:

1. Create `app.js` in your app root:
```javascript
// app.js - Passenger entry point
const server = require('./server.js');
```

2. Passenger will automatically detect and run this file.

---

## STEP 6 — SSL Certificate (HTTPS)

### 6.1 Install Let's Encrypt SSL

1. In cPanel, go to **SSL/TLS** → **Let's Encrypt SSL**
2. Select your domain
3. Click **Issue** or **Install**
4. Wait for installation to complete

### 6.2 Force HTTPS

The `.htaccess` from Step 5.2 already includes HTTPS redirect. Verify it works:

- Visit `http://yourdomain.com` → should redirect to `https://`
- Browser should show 🔒 padlock icon

---

## STEP 7 — Verify Everything Works

### 7.1 Test your website

Visit your domain and check:

- [ ] **Homepage** loads with hero image and category icons
- [ ] **Images** load correctly (check browser DevTools → Network tab)
- [ ] **Shop page** displays products
- [ ] **Category filtering** works
- [ ] **Cart** functions properly
- [ ] **Mobile layout** looks correct
- [ ] **Dark mode** toggle works
- [ ] **Favicons** appear in browser tab

### 7.2 Check for errors

Open browser DevTools (F12) → Console tab:

- ❌ **404 errors:** Static files not copied correctly
- ❌ **500 errors:** Server-side issue, check Node.js logs
- ❌ **Mixed content:** Some resources loading over HTTP

---

## STEP 8 — Using SSH (Recommended for Management)

If you have SSH access, managing the app is easier:

### 8.1 Connect via SSH

```bash
ssh yourusername@yourdomain.com
```

### 8.2 Navigate to app folder

```bash
cd /home/yourusername/witches-bd
```

### 8.3 Use PM2 for process management

```bash
# Install PM2 if not available
npm install -g pm2

# Start the app
pm2 start server.js --name "witches-bd"

# View status
pm2 status

# View logs
pm2 logs witches-bd

# Restart after updates
pm2 restart witches-bd

# Save process list (auto-start on reboot)
pm2 save
pm2 startup
```

---

## STEP 9 — Updating Your Website

When you make changes and need to redeploy:

### 9.1 Build and package locally

```bash
# Build
npm run build

# Copy static files
cp -r public .next/standalone/public
cp -r .next/static .next/standalone/.next/static

# Create deployment ZIP
cd .next/standalone && zip -r ../../../deploy-update.zip . && cd ../../..
```

### 9.2 Upload and restart

1. Upload `deploy-update.zip` to cPanel
2. Extract into `/home/yourusername/witches-bd/` (overwrite existing)
3. Restart via cPanel Node.js panel OR via SSH:

```bash
pm2 restart witches-bd
```

---

## 🛠️ Troubleshooting

| Problem | Cause | Solution |
|---------|-------|----------|
| **502 Bad Gateway** | Node app not running | Check Node.js App status in cPanel, or `pm2 status` via SSH |
| **Blank page / White screen** | Static files missing | Re-copy `public/` and `.next/static/` into standalone |
| **Images not loading** | Files not uploaded | Verify `public/products/` exists in deployment folder |
| **404 on all pages** | Proxy not configured | Check `.htaccess` exists in `public_html` |
| **CSS not loading** | Static folder missing | Copy `.next/static/` to standalone |
| **App crashes immediately** | Missing dependencies | Run `npm install --production` in app folder |
| **"Cannot find module"** | node_modules incomplete | Re-upload with `node_modules/` included |
| **Port already in use** | Old process still running | `pm2 delete witches-bd` then `pm2 start server.js` |
| **Changes not showing** | Browser cache | Hard refresh (Ctrl+Shift+R) or `pm2 restart witches-bd` |
| **Environment variables not working** | Not set in cPanel | Add in Node.js App → Environment variables section |

### Viewing Error Logs

**Via cPanel:**
1. Go to **Terminal** or **Error Log** in cPanel
2. Check for Node.js errors

**Via SSH:**
```bash
pm2 logs witches-bd
# or
cat /home/yourusername/.pm2/logs/witches-bd-error.log
```

---

## 🚀 Easier Alternatives (If cPanel Doesn't Work)

If your host doesn't properly support Node.js or you encounter persistent issues:

### Option 1: Vercel (Recommended - Made for Next.js)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy in one command
vercel
```

- Free tier available
- Zero configuration needed
- Automatic HTTPS
- Automatic builds from GitHub

### Option 2: Railway.app

1. Go to railway.app
2. Connect your GitHub repository
3. Click **Deploy**
4. Done!

- $5/month free credit
- Automatic deployments on push

### Option 3: Render.com

1. Go to render.com
2. Create new **Web Service**
3. Connect GitHub repo
4. Build command: `npm run build && cp -r public .next/standalone/public && cp -r .next/static .next/standalone/.next/static`
5. Start command: `node .next/standalone/server.js`

- Free tier (spins down after inactivity)
- Automatic SSL

---

## 📁 Quick Reference - File Locations

| File | Location | Purpose |
|------|----------|---------|
| `server.js` | `/home/user/witches-bd/` | Node.js entry point |
| `.htaccess` | `/home/user/public_html/` | Apache proxy config |
| `public/` | `/home/user/witches-bd/public/` | Static assets |
| `.next/static/` | `/home/user/witches-bd/.next/static/` | CSS/JS chunks |

---

## ✅ Deployment Checklist

Before going live:

- [ ] Build completed successfully
- [ ] `public/` copied to standalone
- [ ] `.next/static/` copied to standalone
- [ ] ZIP created and uploaded to cPanel
- [ ] Node.js App created in cPanel
- [ ] Environment variables set
- [ ] `.htaccess` configured with correct port
- [ ] SSL certificate installed
- [ ] Website loads without errors
- [ ] All images display correctly
- [ ] Mobile layout works

---

*Guide written for The Witches BD — Next.js 15 Standalone deployment*