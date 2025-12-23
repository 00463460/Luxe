# Luxe E-Commerce Deployment Guide

## Backend Deployment (Railway)

### Step 1: Create Railway Project
1. Go to [railway.app](https://railway.app) and sign in with GitHub
2. Click "New Project"
3. Select "Deploy from GitHub repo"
4. Choose your `Luxe` repository
5. Railway will auto-detect it as a Node.js project

### Step 2: Add PostgreSQL Database
1. In your Railway project, click "New" → "Database" → "Add PostgreSQL"
2. Railway will automatically set these environment variables:
   - `DATABASE_URL`
   - `PGHOST`
   - `PGPORT`
   - `PGDATABASE`
   - `PGUSER`
   - `PGPASSWORD`

### Step 3: Add Redis Database
1. In your Railway project, click "New" → "Database" → "Add Redis"
2. Railway will automatically set:
   - `REDIS_URL`
   - `REDIS_HOST`
   - `REDIS_PORT`

### Step 4: Configure Backend Environment Variables
Go to your backend service settings → Variables, and add:

```
NODE_ENV=production
PORT=5000
JWT_SECRET=<generate-a-strong-random-string>
JWT_EXPIRY=7d
OPENAI_API_KEY=<your-openai-api-key>
STRIPE_SECRET_KEY=<your-stripe-secret-key>
STRIPE_PUBLIC_KEY=<your-stripe-public-key>
FRONTEND_URL=https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app
```

**Generate JWT Secret:**
You can generate a secure JWT secret using this command:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 5: Update Database Connection
The backend needs to be updated to use Railway's `DATABASE_URL` instead of individual connection params. I'll handle this update.

### Step 6: Run Database Migrations
After deployment, go to Railway project → Backend service → Settings → Deploy and run:
```bash
npm run migrate
```
Or connect to the database directly and run the SQL from `backend/migrations/init.sql`

### Step 7: Get Backend URL
Once deployed, Railway will provide a URL like:
```
https://luxe-backend-production.up.railway.app
```

---

## Frontend Configuration (Vercel)

### Step 1: Update Environment Variables
Go to [Vercel Dashboard](https://vercel.com/kashans-projects-70aa2ca8/frontend/settings/environment-variables)

Add these variables:
```
VITE_API_URL=<your-railway-backend-url>/api
VITE_STRIPE_PUBLIC_KEY=<your-stripe-public-key>
VITE_OPENAI_API_KEY=<your-openai-api-key>
```

### Step 2: Redeploy Frontend
After adding environment variables:
1. Go to Deployments tab
2. Click the three dots on the latest deployment
3. Click "Redeploy"

Or from command line:
```bash
cd frontend
vercel --prod
```

---

## API Keys You Need

### 1. OpenAI API Key
- Go to [platform.openai.com](https://platform.openai.com)
- Sign up / Log in
- Go to API Keys section
- Create new secret key
- Copy the key (starts with `sk-`)

### 2. Stripe Keys
- Go to [dashboard.stripe.com](https://dashboard.stripe.com)
- Sign up / Log in
- Go to Developers → API Keys
- Copy both:
  - **Publishable key** (starts with `pk_`)
  - **Secret key** (starts with `sk_`)

### 3. JWT Secret
Generate a secure random string:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

---

## Verification Steps

### 1. Check Backend is Running
Visit your Railway backend URL:
```
https://<your-backend-url>/api/health
```

### 2. Check Frontend is Running
Visit your Vercel URL:
```
https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app
```

### 3. Test Features
- User registration
- Login
- Product browsing
- Cart functionality
- Chatbot

---

## Troubleshooting

### Backend Issues
- Check Railway logs: Project → Service → Deployments → View Logs
- Verify all environment variables are set
- Check database connection

### Frontend Issues
- Check Vercel logs: Project → Deployments → Function Logs
- Verify environment variables are set
- Check CORS settings in backend

### Database Issues
- Verify migrations have run
- Check PostgreSQL connection string
- Verify seed data is loaded

---

## Post-Deployment Tasks

1. **Run Database Seeds** (optional):
   ```bash
   npm run seed
   ```

2. **Set up Custom Domain** (optional):
   - Railway: Project → Settings → Domains
   - Vercel: Project → Settings → Domains

3. **Enable CORS** - Make sure your backend allows requests from Vercel frontend URL

4. **Monitor Logs** - Check both Railway and Vercel logs for any errors

---

## URLs Reference

- **Frontend (Vercel):** https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app
- **Backend (Railway):** Will be provided after deployment
- **GitHub Repo:** https://github.com/00463460/Luxe

---

## Cost Estimate

- **Vercel:** Free tier (sufficient for hobby projects)
- **Railway:**
  - $5/month free credit
  - PostgreSQL: ~$5/month after free credit
  - Redis: ~$1/month after free credit
  - Backend: Pay per usage
- **Stripe:** Free (transaction fees apply)
- **OpenAI:** Pay per usage (~$0.002 per 1K tokens)

---

## Need Help?

If you encounter any issues:
1. Check the logs in Railway/Vercel dashboards
2. Verify all environment variables are correctly set
3. Ensure databases are running and accessible
4. Check CORS configuration in backend
