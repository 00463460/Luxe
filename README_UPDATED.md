# E-Commerce Platform: Luxury Perfumes & Clothing

A professional, full-stack e-commerce website featuring modern product catalogs, user authentication, shopping cart, admin panel, and AI-powered customer support chatbot.

## 🏗️ Architecture Overview

- **Frontend:** React 18 + Vite + Tailwind CSS
- **Backend:** Node.js + Express.js
- **Database:** PostgreSQL (Primary) + Redis (Caching)
- **Authentication:** JWT-based
- **AI Chatbot:** Knowledge base integration with semantic matching
- **Payment Processing:** Stripe integration (Phase 4)

## 📁 Project Structure

```
ecom-web/
├── frontend/                  # React + Vite application
│   ├── public/
│   │   └── knowledge-base/    # Chatbot KB files
│   ├── src/
│   │   ├── components/        # Reusable components
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── store/             # Redux store
│   │   ├── hooks/             # Custom hooks
│   │   ├── utils/             # Utilities
│   │   └── styles/            # Global styles
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
│
├── backend/                   # Node.js + Express server
│   ├── src/
│   │   ├── config/            # Database, Redis, env config
│   │   ├── middleware/        # Auth, error handling
│   │   ├── routes/            # API routes
│   │   ├── controllers/       # Business logic
│   │   ├── models/            # Database models
│   │   ├── services/          # Services
│   │   ├── utils/             # Utilities
│   │   ├── seeds/             # Database seeders
│   │   └── server.js          # Express app
│   ├── migrations/
│   │   └── init.sql           # Database schema
│   ├── package.json
│   └── .env.example
│
├── knowledge-base/            # Chatbot knowledge base
│   ├── perfume-kb.txt         # Perfume Q&As
│   ├── clothing-kb.txt        # Clothing Q&As
│   └── general-faq.txt        # General FAQs
│
└── docker-compose.yml         # Local development setup
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
psql -U postgres -d ecom_db -f migrations/init.sql

# Seed sample data (optional)
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

### Backend Key Variables
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ecom_db
DB_USER=postgres
DB_PASSWORD=your_password
REDIS_HOST=localhost
REDIS_PORT=6379
JWT_SECRET=your_super_secret_key
FRONTEND_URL=http://localhost:5173
```

### Frontend Key Variables
```
VITE_API_URL=http://localhost:5000/api
```

## 📋 Development Phases

### ✅ Phase 1: Frontend Layout (COMPLETE)
- Navigation Bar with cart icon
- Hero section with CTA
- Product Card component with wishlisting
- Product Grid with sorting/filtering
- Footer with company info
- Home page integration
- **Status:** UI-only, no backend integration yet

### ✅ Phase 2: Admin Dashboard (COMPLETE)
- Admin product management
- Add/Edit/Delete products
- Category-specific forms (Perfume/Clothing)
- Product inventory tracking
- Search and filter
- Authentication routes
- Form validation
- **Status:** Fully functional with mock data, ready for API integration

### ✅ Phase 3: AI Chatbot (COMPLETE)
- Floating chat widget
- Knowledge base integration
- Semantic question matching
- Confidence scoring
- Multi-category support (Perfume, Clothing, General)
- Chatbot management routes
- Error handling & fallbacks
- **Status:** Fully functional with local KB parsing, backend ready

### 🔜 Phase 4: Authentication & Cart (COMING SOON)
- Signup/Login pages
- Form validation
- JWT token management
- Protected routes
- Redux state management
- Add to Cart functionality
- Cart modal
- Checkout process
- Payment integration (Stripe)

## 🛣️ API Endpoints

### Authentication
- `POST /api/auth/signup` - Register user
- `POST /api/auth/login` - Login & get JWT
- `POST /api/auth/refresh` - Refresh token (protected)
- `GET /api/auth/me` - Get current user (protected)

### Products
- `GET /api/products` - List all products
- `GET /api/products?category=perfume` - Filter by category
- `GET /api/products/search?q=query` - Search products
- `GET /api/products/:id` - Get single product
- `POST /api/products` - Create product (admin only)
- `PUT /api/products/:id` - Update product (admin only)
- `DELETE /api/products/:id` - Delete product (admin only)

### Cart (Protected)
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/items/:itemId` - Update quantity
- `DELETE /api/cart/items/:itemId` - Remove item
- `DELETE /api/cart` - Clear cart

### Chatbot
- `POST /api/chatbot/ask` - Ask a question
- `GET /api/chatbot/kb` - Get knowledge base
- `POST /api/chatbot/kb/add` - Add KB entry (admin only)
- `PUT /api/chatbot/kb/:id` - Update KB entry (admin only)
- `DELETE /api/chatbot/kb/:id` - Delete KB entry (admin only)

## 🎨 Design System

**Luxury & Minimal Aesthetic**
- Primary Color: Gold (`#a68567`)
- Secondary: Beige/Taupe (`#e8ddd2`)
- Neutral: Gray/White
- Fonts: Playfair Display (serif) + Inter (sans-serif)
- Spacing: Generous padding, white space
- Shadows: Subtle, refined
- Animations: Smooth, professional

## 🤖 Chatbot Features

The AI chatbot reads from knowledge base files to answer questions:

**Knowledge Base Files:**
- `perfume-kb.txt` - 10 Q&As about perfumes
- `clothing-kb.txt` - 10 Q&As about clothing
- `general-faq.txt` - 10 general FAQs

**Features:**
- Semantic similarity matching
- Confidence scoring (0-1)
- Fallback responses
- Admin KB management
- Real-time updates

## 🛡️ Security Features

- JWT-based authentication
- Password hashing (bcryptjs)
- Rate limiting on API endpoints
- CORS protection
- SQL injection prevention
- Protected admin routes
- Environment variable protection
- Transaction support for data integrity

## 📦 Key Dependencies

### Frontend
- **react** & **react-dom** - UI framework
- **react-router-dom** - Client-side routing
- **@reduxjs/toolkit** & **react-redux** - State management
- **axios** - HTTP client
- **tailwindcss** - Utility-first CSS
- **lucide-react** - Icon library

### Backend
- **express** - Web framework
- **pg** - PostgreSQL driver
- **bcryptjs** - Password hashing
- **jsonwebtoken** - JWT tokens
- **uuid** - ID generation
- **joi** - Data validation
- **cors** - CORS middleware
- **dotenv** - Environment variables

## 🧪 Testing Checklist

- [ ] Homepage loads with hero and products
- [ ] Products display with images and details
- [ ] Search/filter works correctly
- [ ] Admin dashboard accessible
- [ ] Can add new product
- [ ] Can edit product
- [ ] Can delete product
- [ ] Chatbot opens/closes
- [ ] Chatbot answers questions from KB
- [ ] Fallback response on unknown question
- [ ] Auth routes protected
- [ ] Admin routes protected

## 📝 Notes

- **Mock Data:** Admin dashboard includes 2 sample products for testing
- **KB Files:** Located in `knowledge-base/` folder, parsed on app startup
- **Backend:** Ready to connect to PostgreSQL, uses local mock data if DB unavailable
- **Scalability:** Database schema optimized with indexes for performance

## 📄 License

MIT License - Feel free to use for your project

## 🤝 Support

For questions or issues, check the phase documentation:
- `PHASE_2_ADMIN_DASHBOARD.md` - Admin setup guide
- `PHASE_3_AI_CHATBOT.md` - Chatbot implementation details
- `README.md` - This file

---

**Status:** 3 of 4 phases complete. Ready for Phase 4 (Auth & Cart).
