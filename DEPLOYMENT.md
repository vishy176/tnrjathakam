# Deployment Guide

## ⭐ NEW: GitHub Pages (RECOMMENDED - FREE & EASY!)

**The app is now configured for automatic deployment to GitHub Pages!**

📖 **See `GITHUB_PAGES_DEPLOYMENT.md` for complete step-by-step instructions**

### Quick Overview:
1. Create free GitHub account
2. Use existing repository "tnrjathakam" 
3. Push your code (simple git commands)
4. Enable GitHub Pages in settings
5. Access at: `https://YOUR-USERNAME.github.io/tnrjathakam/`

**Benefits:**
- ✅ FREE forever
- ✅ No computer needed after deployment
- ✅ Access from any device, anywhere
- ✅ Automatic updates on git push
- ✅ Works offline after first load
- ✅ Can be private or public

**Time to deploy:** 10-15 minutes

---

## For Local/Personal Use (Alternative)

If you prefer running it locally on your network:

### Method 1: Run on Your Computer (Recommended)

1. **Start the server on your computer:**
```bash
cd jathakam-app
npm run dev -- --host
```

2. **Access from your phone:**
   - Terminal will show a network URL like: `http://192.168.1.5:3000`
   - Open this URL on your phone's browser
   - Add to home screen for app-like experience

3. **Keep it running:**
   - Leave the terminal open while using
   - Or run in background using `screen` or `tmux`

**Pros:**
- ✅ Free
- ✅ Private
- ✅ Easy to update
- ✅ No hosting needed

**Cons:**
- ❌ Computer must be on
- ❌ Must be on same WiFi

---

### Method 2: Use on Same Device

1. **On your phone, install Termux** (Android) or a-Shell (iOS)

2. **Install Node.js in Termux:**
```bash
pkg install nodejs
```

3. **Clone/Transfer the app to your phone**

4. **Run locally:**
```bash
cd jathakam-app
npm install
npm run dev
```

5. **Open in browser:** `http://localhost:3000`

**Pros:**
- ✅ Works anywhere
- ✅ No WiFi needed
- ✅ Completely private

**Cons:**
- ❌ More setup required
- ❌ Phone must have storage

---

## For Shared Use (Optional)

If you want to access from anywhere or share with family members:

### Method 3: Deploy to Free Hosting

#### Option A: Netlify (Easiest)

1. **Build the app:**
```bash
npm run build
```

2. **Install Netlify CLI:**
```bash
npm install -g netlify-cli
```

3. **Deploy:**
```bash
netlify deploy --prod --dir=dist
```

4. **Follow prompts to create account and deploy**

**Result:** You'll get a URL like `https://your-app.netlify.app`

#### Option B: Vercel

1. **Install Vercel CLI:**
```bash
npm install -g vercel
```

2. **Deploy:**
```bash
vercel --prod
```

3. **Follow prompts**

**Result:** You'll get a URL like `https://your-app.vercel.app`

#### Option C: GitHub Pages

1. **Update `vite.config.js`:**
```javascript
export default defineConfig({
  plugins: [react()],
  base: '/jathakam-app/',
  // ... rest of config
})
```

2. **Build:**
```bash
npm run build
```

3. **Install gh-pages:**
```bash
npm install -g gh-pages
```

4. **Deploy:**
```bash
gh-pages -d dist
```

---

## Security Considerations

### For Private Use:

1. **Don't deploy publicly**: Keep it local for privacy
2. **No sensitive data storage**: App doesn't save data (by design)
3. **PDFs are local**: Generated PDFs stay on your device
4. **No analytics**: No tracking or data collection

### If You Must Deploy Online:

1. **Add password protection** (use Netlify/Vercel features)
2. **Use environment variables** for any sensitive config
3. **Add HTTPS** (automatic with Netlify/Vercel)
4. **Don't share the URL publicly**

---

## Updating the App

### To Update Locally:

1. **Edit the files** in `src/` folder
2. **Save** (Vite will auto-reload)
3. **Test** on your phone
4. **Done!**

### To Update Deployed Version:

1. **Make changes locally**
2. **Build:**
```bash
npm run build
```
3. **Redeploy:**
```bash
netlify deploy --prod --dir=dist
# or
vercel --prod
```

---

## Performance Optimization

### For Production Build:

The production build is already optimized with:
- ✅ Minification
- ✅ Tree shaking
- ✅ Code splitting
- ✅ Asset optimization

### For Faster Loading:

1. **Enable gzip compression** (automatic on most hosts)
2. **Use CDN** (automatic with Netlify/Vercel)
3. **Cache static assets** (configured in build)

---

## Backup Strategy

### Backup Your Work:

1. **Source Code:**
```bash
git init
git add .
git commit -m "Initial commit"
```

2. **Push to GitHub (private repo):**
```bash
gh repo create jathakam-app --private
git push origin main
```

3. **Generated PDFs:**
   - Automatically saved to Downloads
   - Backup to cloud storage if needed

---

## Monitoring and Maintenance

### Check App Health:

```bash
npm run build
# Should complete without errors
```

### Update Dependencies:

```bash
npm update
```

### Security Audit:

```bash
npm audit
npm audit fix
```

---

## Recommended Setup for Regular Use

**Best setup for daily use:**

1. **On Computer:**
   ```bash
   cd jathakam-app
   npm run dev -- --host
   ```

2. **Create Desktop Shortcut** (Mac):
   - Open Automator
   - Create new "Application"
   - Add "Run Shell Script"
   - Paste:
   ```bash
   cd ~/jathakam-app && npm run dev -- --host
   ```
   - Save as "Start Jathakam App"

3. **On Phone:**
   - Add to Home Screen
   - Use like native app

4. **When Done:**
   - Close browser tab
   - Stop server (Ctrl+C in terminal)

---

## Cost Analysis

**Local Use:** FREE ✅
- No hosting costs
- No domain costs
- No maintenance fees

**Deployed (if needed):**
- Netlify: FREE (100GB bandwidth/month)
- Vercel: FREE (100GB bandwidth/month)
- GitHub Pages: FREE (1GB storage)

**Recommended:** Stick with local use for privacy and zero cost!

---

## Quick Reference

**Start App:**
```bash
cd jathakam-app && npm run dev -- --host
```

**Build for Production:**
```bash
npm run build
```

**Preview Production Build:**
```bash
npm run preview
```

**Stop Server:**
Press `Ctrl + C` in terminal

---

## Support and Documentation

- **Setup Guide:** See `SETUP.md`
- **User Guide:** See `HOW_TO_USE.md`
- **Technical Details:** See `README.md`
- **This File:** Deployment options

---

*Choose the deployment method that best fits your needs. For private use, local deployment is recommended!*

