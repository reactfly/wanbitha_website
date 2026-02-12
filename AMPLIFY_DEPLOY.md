# ═══════════════════════════════════════════════════════════════════════════

# WanBitha — AWS Amplify Deployment Guide

# ═══════════════════════════════════════════════════════════════════════════

## Quick Summary

| Item             | Value                          |
| ---------------- | ------------------------------ |
| Framework        | React 19 + Vite 7 (SWC)        |
| Rendering        | SPA (Single Page Application)  |
| Package Manager  | npm (with package-lock.json)   |
| Output Directory | `dist/`                        |
| Node.js Required | 18.x or 20.x (recommended: 20) |
| Build Command    | `npm run build`                |
| Deploy Target    | AWS Amplify Gen 2 Hosting      |

---

## 📁 Files Created for Amplify

```
wanessa/
├── amplify.yml              # Build spec (phases, artifacts, cache)
├── customHttp.yml           # Custom HTTP headers (security + cache)
├── public/_redirects        # SPA rewrite rules
└── vite.config.js           # Updated with code-splitting + optimizations
```

---

## 🚀 Deploy Steps

### Option A — GitHub Integration (Recommended)

1. **Push to GitHub**

   ```bash
   git add -A
   git commit -m "feat: Amplify deploy configuration"
   git push origin main
   ```

2. **Connect Amplify**
   - Open [AWS Amplify Console](https://console.aws.amazon.com/amplify/)
   - Click **"Create new app"** → **"Host web app"**
   - Select **GitHub** → Authorize → Select your repository
   - Branch: `main`

3. **Configure Build Settings**
   Amplify will auto-detect `amplify.yml`. Verify:
   - **Build command**: `npm run build`
   - **Base directory**: (leave empty — root)
   - **Output directory**: `dist`
   - **Node.js version**: `20` (set in Build Image settings)

4. **Set Node.js version** (IMPORTANT!)
   In Amplify Console → App Settings → Build Settings → Build image:

   ```
   Node.js version: 20
   ```

   Or add to `amplify.yml` preBuild:

   ```yaml
   - nvm use 20
   ```

5. **Apply Custom Headers**
   In Amplify Console → App Settings → Custom Headers:
   - Copy the content of `customHttp.yml`
   - Or Amplify auto-reads from root `customHttp.yml`

6. **Deploy** → Amplify will build and deploy automatically.

### Option B — Amplify CLI (Manual Deploy)

```bash
# Install Amplify CLI
npm install -g @aws-amplify/cli

# Configure AWS credentials
amplify configure

# Initialize Amplify in the project
amplify init

# Add hosting
amplify add hosting
# Select: Hosting with Amplify Console
# Select: Manual deployment

# Build locally
npm run build

# Publish
amplify publish
```

### Option C — Direct Upload (No Git)

```bash
# Build locally
npm run build

# Zip the dist folder
# Upload via Amplify Console → Deploy without Git provider → Drag & drop
```

---

## 🔧 Environment Variables

This project currently has **no environment variables**. If you add them later:

1. **Client-side vars** (exposed in bundle): Must be prefixed with `VITE_`

   ```
   VITE_API_URL=https://api.wanbitha.com
   VITE_GA_ID=G-XXXXXXXXXX
   ```

2. **Add in Amplify Console**:
   App Settings → Environment Variables → Add variable

3. **Never commit** `.env` files with secrets to git.

---

## ⚡ Performance Optimizations Applied

### Code Splitting (via Rollup manualChunks)

```
vendor-react.js      ~140 KB   (React + ReactDOM)
vendor-router.js     ~40 KB    (React Router)
vendor-three.js      ~700 KB   (Three.js + R3F + Drei — heavy but cached)
vendor-animation.js  ~200 KB   (GSAP + Framer Motion)
vendor-ui.js         ~50 KB    (Lucide + clsx + twMerge)
index.js             ~50 KB    (App code)
index.css            ~30 KB    (Tailwind purged CSS)
```

### Cache Strategy

| Asset Type      | Cache-Control                 | Reason                        |
| --------------- | ----------------------------- | ----------------------------- |
| HTML            | `no-cache, must-revalidate`   | Always fetch latest version   |
| JS/CSS (hashed) | `max-age=31536000, immutable` | Hash changes = new URL = safe |
| Images (local)  | `max-age=2592000` (30d)       | Rarely changes                |
| Service Worker  | `no-cache, must-revalidate`   | Must always be fresh          |
| PWA Manifest    | `max-age=3600` (1h)           | Allow manifest updates        |
| Google Fonts    | SW CacheFirst, 365d           | Never changes once loaded     |
| Unsplash Images | SW CacheFirst, 7d             | Gallery images                |

### SPA Routing

All routes (`/`, `/tunnel`, `/admin/*`) are handled client-side by
react-router-dom. The `_redirects` file ensures ALL paths resolve to
`index.html` with a 200 rewrite (not 301/302), preserving the URL.

---

## 🔒 Security Headers Applied

| Header                  | Value                           | Purpose                 |
| ----------------------- | ------------------------------- | ----------------------- |
| X-Content-Type-Options  | nosniff                         | Prevent MIME sniffing   |
| X-Frame-Options         | DENY                            | Prevent clickjacking    |
| X-XSS-Protection        | 1; mode=block                   | Legacy XSS protection   |
| Referrer-Policy         | strict-origin-when-cross-origin | Privacy                 |
| Permissions-Policy      | camera=(), microphone=(), etc.  | Disable unused APIs     |
| Content-Security-Policy | (see customHttp.yml)            | XSS + injection prevent |

---

## 🌐 Custom Domain (Optional)

1. In Amplify Console → Domain Management → Add domain
2. Enter your domain: `wanbitha.com`
3. Amplify will provision an ACM SSL certificate (free, auto-renew)
4. Point your DNS:
   ```
   Type   Name    Value
   CNAME  www     <amplify-provided-url>.amplifyapp.com
   ALIAS  @       <amplify-provided-url>.amplifyapp.com
   ```
5. Enable `www` → root redirect (or vice versa)

---

## 📊 Monitoring

1. **Build Logs**: Amplify Console → App → Build history
2. **Access Logs**: App Settings → Access Logs → Enable
3. **CloudWatch**: Metrics available in AWS CloudWatch → Amplify
4. **Alerts**: Set up SNS notifications for build failures

---

## 🧪 Pre-Deploy Checklist

- [ ] `npm run build` succeeds locally without errors
- [ ] `dist/index.html` exists after build
- [ ] `package-lock.json` is committed to git
- [ ] No secrets in client-side code (search for API keys)
- [ ] `_redirects` file is in `public/` (copies to `dist/` on build)
- [ ] Test all routes: `/`, `/tunnel`, `/admin/login`, `/admin`
- [ ] Test on mobile (responsive layout)
- [ ] Verify PWA install prompt works
- [ ] Run Lighthouse audit → target 90+ scores

---

## 🐛 Troubleshooting

### Build fails with "Cannot find module"

→ Delete `node_modules` and `package-lock.json`, run `npm install`, commit the new lock file.

### Routes show 404 on direct access

→ Ensure `public/_redirects` contains `/*  /index.html  200`

### Blank page after deploy

→ Check if `base` path in `vite.config.js` is set correctly (should be `/` for Amplify root domain).

### Service Worker caching old content

→ Clear browser cache, or add version parameter to SW registration.

### 3D scene not rendering

→ Check browser compatibility. WebGL is required. Add a fallback for unsupported browsers.

### Build timeout (>15 min)

→ Amplify default timeout is 15 min. For large Three.js builds, increase in Build Settings → Build timeout.
