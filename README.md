# E-Commerce Platform: Luxury Perfumes & Clothing

A professional, full-stack e-commerce website featuring modern product catalogs, user authentication, shopping cart, admin panel, and AI-powered customer support chatbot.

## 🏗️ Architecture Overview

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL (Primary) + Redis (Caching)
- **Authentication:** JWT-based
- **AI Chatbot:** OpenAI API with knowledge base integration
- **Payment Processing:** Stripe integration

## 📁 Project Structure

```
ecom-web/
├── frontend/          # React + Vite application
├── backend/           # Node.js + Express server
├── knowledge-base/    # Chatbot KB files
└── docker-compose.yml # Local development setup
```

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- PostgreSQL 14+
- Redis 7+
- npm or yarn

### Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Runs on http://localhost:5173

### Backend Setup
```bash
cd backend
npm install
npm run dev
```
Runs on http://localhost:5000

### Database Setup
```bash
# Create database and tables
psql -U postgres -d ecom_db -f ../migrations/init.sql

# Seed sample data (coming in Phase 1)
npm run seed
```

### Docker Setup (Alternative)
```bash
docker-compose up -d
```

## 📊 Database Schema

See `backend/migrations/init.sql` for complete schema including:
- Users (Authentication)
- Products (Perfumes & Clothing)
- Product Details (Category-specific info)
- Cart & Cart Items
- Orders & Order Items
- Chatbot Knowledge Base

## 🔐 Environment Variables

See `.env.example` files in `frontend/` and `backend/` folders.

Key variables:
- `DATABASE_URL` - PostgreSQL connection string
- `JWT_SECRET` - Secret key for JWT tokens
- `OPENAI_API_KEY` - For chatbot intelligence
- `STRIPE_SECRET_KEY` - Payment processing

## 📋 Development Phases

**Phase 1:** Frontend UI (Navigation, Hero, Product Cards)
**Phase 2:** Admin Dashboard (Add/Edit/Delete Products)
**Phase 3:** AI Chatbot (Knowledge Base + Chat Widget)
**Phase 4:** Authentication & Cart (Signup, Login, Cart Logic)

## 🛡️ Security Features

- JWT-based authentication
- Password hashing with bcryptjs
- Rate limiting on API endpoints
- CORS protection
- SQL injection prevention via parameterized queries
- Environment variable protection

## 📦 Key Dependencies

### Frontend
- React Router for navigation
- Redux Toolkit for state management
- TanStack Query for server state
- Axios for API calls
- Tailwind CSS for styling

### Backend
- Express.js for REST API
- PostgreSQL driver (pg)
- Redis for caching
- JWT for authentication
- Stripe SDK for payments
- Joi for validation

## 🤖 Chatbot Knowledge Base

Located in `knowledge-base/`:
- `perfume-kb.txt` - Perfume Q&A
- `clothing-kb.txt` - Clothing Q&A
- `general-faq.txt` - General FAQs

The chatbot reads these files to provide intelligent answers about products.

## 📝 API Endpoints

### Authentication
- `POST /api/auth/signup`
- `POST /api/auth/login`
- `POST /api/auth/refresh`

### Products
- `GET /api/products`
- `GET /api/products/:id`
- `GET /api/products/category/:category`

### Admin (Protected)
- `POST /api/admin/products`
- `PUT /api/admin/products/:id`
- `DELETE /api/admin/products/:id`

### Cart
- `GET /api/cart`
- `POST /api/cart/add`
- `PUT /api/cart/items/:itemId`
- `DELETE /api/cart/items/:itemId`

### Chatbot
- `POST /api/chatbot/ask`

## 🎨 Design System

Luxury & Minimal aesthetic with custom color palette:
- Primary: Warm luxury gold tones
- Secondary: Neutral beiges and taupes
- Fonts: Playfair Display (serif) + Inter (sans-serif)

## 📄 License

MIT License - Feel free to use for your project

## 🤝 Support

For questions or issues, create an issue in the repository.

---

**Status:** Project setup complete. Ready for Phase 1 development.
