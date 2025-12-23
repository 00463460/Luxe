# 🚀 Quick Start - Deploy Luxe E-Commerce

Your code is ready to deploy! Follow these steps in order:

## ✅ What's Already Done

- ✅ Frontend deployed to Vercel: https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app
- ✅ Code pushed to GitHub: https://github.com/00463460/Luxe
- ✅ Railway configuration files created
- ✅ Database configs updated for production

## 🎯 What You Need To Do

### Step 1: Deploy Backend to Railway (5 minutes)

1. **Go to Railway:** https://railway.app
2. **Sign in with GitHub**
3. **Create New Project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose `00463460/Luxe` repository
   - Railway will auto-detect Node.js

4. **Add PostgreSQL Database:**
   - In your project, click "+ New"
   - Select "Database" → "Add PostgreSQL"
   - Railway auto-configures the connection

5. **Add Redis Database:**
   - Click "+ New" again
   - Select "Database" → "Add Redis"
   - Railway auto-configures the connection

6. **Configure Environment Variables:**
   - Click on your backend service
   - Go to "Variables" tab
   - Click "Raw Editor"
   - Paste this (fill in your values):

```bash
NODE_ENV=production
PORT=5000
JWT_SECRET=<run: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
JWT_EXPIRY=7d
OPENAI_API_KEY=<get from https://platform.openai.com/api-keys>
STRIPE_SECRET_KEY=<get from https://dashboard.stripe.com>
STRIPE_PUBLIC_KEY=<get from https://dashboard.stripe.com>
FRONTEND_URL=https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app
```

7. **Deploy:**
   - Railway will automatically deploy
   - Wait for deployment to complete (~2-3 minutes)
   - Copy your backend URL (looks like: `https://luxe-production-xxxx.up.railway.app`)

8. **Run Database Migrations:**
   - In Railway, go to your backend service
   - Click on "Settings" → "Service"
   - Under "Start Command", temporarily change to: `node -e "console.log('Setup complete')"`
   - Or connect to PostgreSQL and run SQL from `backend/migrations/init.sql`

---

### Step 2: Configure Frontend on Vercel (2 minutes)

**Option A: Using Vercel Dashboard (Easier)**

1. Go to: https://vercel.com/kashans-projects-70aa2ca8/frontend/settings/environment-variables
2. Add these three variables:

| Name | Value |
|------|-------|
| `VITE_API_URL` | `https://<your-railway-url>/api` |
| `VITE_STRIPE_PUBLIC_KEY` | `pk_test_...` (from Stripe) |
| `VITE_OPENAI_API_KEY` | `sk-...` (from OpenAI) |

3. Click "Save"
4. Go to "Deployments" tab → Click latest deployment → "Redeploy"

**Option B: Using Automated Script (Windows)**

1. Open PowerShell in your project directory
2. Run: `.\setup-vercel-env.bat`
3. Follow the prompts

---

### Step 3: Get Your API Keys (10 minutes)

#### 🔑 OpenAI API Key
1. Go to: https://platform.openai.com/api-keys
2. Sign in / Create account
3. Click "Create new secret key"
4. Name it "Luxe-Ecommerce"
5. Copy the key (starts with `sk-`)
6. **Save it!** You won't see it again

#### 🔑 Stripe API Keys
1. Go to: https://dashboard.stripe.com/register
2. Sign up / Log in
3. Make sure you're in **Test Mode** (toggle at top)
4. Go to "Developers" → "API keys"
5. Copy both keys:
   - **Publishable key:** `pk_test_...`
   - **Secret key:** `sk_test_...`

#### 🔑 JWT Secret
Run this in your terminal:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output.

---

## 🧪 Testing Your Deployment

### 1. Test Backend Health
Open in browser:
```
https://<your-railway-url>/api/health
```
Should see: `{"status": "ok"}` or similar

### 2. Test Frontend
Visit: https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app

### 3. Test Full Features
- [ ] Sign up for an account
- [ ] Log in
- [ ] Browse products
- [ ] Add items to cart
- [ ] Chat with the AI assistant
- [ ] Test checkout (use test card: 4242 4242 4242 4242)

---

## 📚 Detailed Documentation

For more detailed instructions, see:
- **[DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)** - Complete deployment guide
- **[API_KEYS_TEMPLATE.md](API_KEYS_TEMPLATE.md)** - API keys and environment variables reference

---

## 🆘 Troubleshooting

### Frontend shows "Cannot connect to backend"
- ✅ Check `VITE_API_URL` is set correctly in Vercel
- ✅ Verify Railway backend is running
- ✅ Check Railway logs for errors

### Backend won't start
- ✅ Verify all environment variables are set
- ✅ Check PostgreSQL and Redis are running
- ✅ Look at Railway deployment logs

### Database errors
- ✅ Make sure PostgreSQL service is added in Railway
- ✅ Run migrations (see Step 1.8)
- ✅ Check `DATABASE_URL` is automatically set

### CORS errors
- ✅ Verify `FRONTEND_URL` in Railway matches your Vercel URL exactly
- ✅ No trailing slash in the URL

---

## 💰 Estimated Costs

| Service | Cost |
|---------|------|
| Vercel (Frontend) | **Free** |
| Railway (Backend + DBs) | **$5 free/month**, then ~$6-10/month |
| OpenAI API | **$5 free credit**, then ~$1-5/month (low traffic) |
| Stripe | **Free** (2.9% + $0.30 per transaction) |
| **Total** | **~$7-15/month** after free credits |

---

## 🎉 You're Done!

Once everything is set up, your e-commerce platform will be live at:

**🌐 Frontend:** https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app
**⚙️ Backend:** https://your-backend-url.up.railway.app
**📦 GitHub:** https://github.com/00463460/Luxe

---

## Next Steps

- [ ] Add custom domain (optional)
- [ ] Set up email notifications (SMTP configured in backend)
- [ ] Add more products via admin dashboard
- [ ] Monitor usage and costs
- [ ] Switch to Stripe live mode when ready for production
- [ ] Add analytics (Google Analytics, Mixpanel, etc.)

---

**Need help?** Check the detailed guides in [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md)

**Questions?** Open an issue on GitHub: https://github.com/00463460/Luxe/issues
