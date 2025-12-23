# API Keys & Environment Variables Template

## Quick Setup Checklist

### 1. Generate JWT Secret
Run this command to generate a secure JWT secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```
Copy the output - you'll need it for both Railway and your local `.env` file.

---

## Railway Backend Environment Variables

Go to: **Railway Project → Backend Service → Variables**

Copy and paste these, then fill in your actual values:

```bash
# Node Configuration
NODE_ENV=production
PORT=5000

# JWT Authentication
JWT_SECRET=<paste-generated-jwt-secret-here>
JWT_EXPIRY=7d

# API Keys
OPENAI_API_KEY=sk-<your-openai-api-key>
STRIPE_SECRET_KEY=sk_test_<your-stripe-secret-key>
STRIPE_PUBLIC_KEY=pk_test_<your-stripe-public-key>

# Frontend URL (for CORS)
FRONTEND_URL=https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app
```

**Note:** Database and Redis URLs are automatically set by Railway when you add those services.

---

## Vercel Frontend Environment Variables

Go to: **Vercel Dashboard → frontend project → Settings → Environment Variables**

Add these three variables:

### Variable 1:
- **Name:** `VITE_API_URL`
- **Value:** `https://<your-railway-backend-url>/api`
- **Environments:** Production, Preview, Development

### Variable 2:
- **Name:** `VITE_STRIPE_PUBLIC_KEY`
- **Value:** `pk_test_<your-stripe-public-key>`
- **Environments:** Production, Preview, Development

### Variable 3:
- **Name:** `VITE_OPENAI_API_KEY`
- **Value:** `sk-<your-openai-api-key>`
- **Environments:** Production, Preview, Development

---

## Where to Get API Keys

### OpenAI API Key
1. Go to: https://platform.openai.com/api-keys
2. Sign in or create account
3. Click "Create new secret key"
4. Name it "Luxe-Ecommerce"
5. Copy the key (starts with `sk-proj-...` or `sk-...`)
6. **IMPORTANT:** Save it somewhere safe - you can't see it again!

**Pricing:** Pay as you go
- GPT-3.5-turbo: ~$0.002 per 1K tokens
- First $5 credit for new accounts

---

### Stripe API Keys
1. Go to: https://dashboard.stripe.com/register
2. Sign up or log in
3. Click "Developers" → "API keys"
4. You'll see two keys:
   - **Publishable key** (starts with `pk_test_...`) - for frontend
   - **Secret key** (starts with `sk_test_...`) - for backend
5. Copy both keys

**For Production:**
- Toggle "Test mode" OFF to get live keys: `pk_live_...` and `sk_live_...`

**Pricing:** Free to use
- Transaction fees: 2.9% + $0.30 per successful charge

---

## Local Development .env Files

### Backend (.env)
Create `backend/.env` file:
```bash
# Server
PORT=5000
NODE_ENV=development

# Database (local)
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecom_db
DB_USER=postgres
DB_PASSWORD=your_local_postgres_password

# Redis (local)
REDIS_HOST=localhost
REDIS_PORT=6379

# JWT
JWT_SECRET=<paste-generated-jwt-secret-here>
JWT_EXPIRY=7d

# API Keys
OPENAI_API_KEY=sk-<your-openai-api-key>
STRIPE_SECRET_KEY=sk_test_<your-stripe-secret-key>
STRIPE_PUBLIC_KEY=pk_test_<your-stripe-public-key>

# Frontend URL
FRONTEND_URL=http://localhost:5173
```

### Frontend (.env)
Create `frontend/.env` file:
```bash
VITE_API_URL=http://localhost:5000/api
VITE_STRIPE_PUBLIC_KEY=pk_test_<your-stripe-public-key>
VITE_OPENAI_API_KEY=sk-<your-openai-api-key>
```

---

## Deployment URLs

- **Frontend (Vercel):** https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app
- **Backend (Railway):** [Will be available after deployment]
- **GitHub Repository:** https://github.com/00463460/Luxe

---

## Security Notes

⚠️ **NEVER commit `.env` files to git!**
- They are already in `.gitignore`
- Only commit `.env.example` files with placeholder values

⚠️ **Keep your secret keys safe:**
- Don't share them in public channels
- Rotate them if accidentally exposed
- Use test keys for development, live keys for production

---

## Testing Your Setup

### Test Backend:
```bash
curl https://<your-railway-backend-url>/api/health
```
Should return: `{"status": "ok"}`

### Test Frontend:
Visit: https://frontend-o07pbklyt-kashans-projects-70aa2ca8.vercel.app

### Test Full Flow:
1. Sign up for an account
2. Browse products
3. Add items to cart
4. Test the chatbot
5. (Optional) Test checkout with Stripe test card: 4242 4242 4242 4242

---

## Common Issues

### "API key not valid" error:
- Double-check you copied the entire key
- Make sure there are no extra spaces
- Verify the key is active in the provider dashboard

### CORS errors:
- Verify `FRONTEND_URL` in Railway matches your Vercel URL
- Check backend logs for CORS errors

### Database connection errors:
- Verify PostgreSQL service is running on Railway
- Check database environment variables are set
- Run migrations: `npm run migrate`

---

## Cost Summary

| Service | Free Tier | Estimated Monthly Cost |
|---------|-----------|----------------------|
| Vercel | Unlimited | $0 (hobby projects) |
| Railway | $5 credit/month | ~$6-10 after free credit |
| OpenAI | $5 initial credit | ~$1-5 (low traffic) |
| Stripe | Free | $0 (2.9% + $0.30 per transaction) |
| **Total** | | **~$7-15/month** |

---

## Next Steps After Setup

1. ✅ Deploy backend to Railway
2. ✅ Add PostgreSQL database
3. ✅ Add Redis database
4. ✅ Configure all environment variables
5. ✅ Run database migrations
6. ✅ Update Vercel frontend env vars
7. ✅ Test the live application
8. 🎉 Share your live URL!
