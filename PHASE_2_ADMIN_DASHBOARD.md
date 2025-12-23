// Admin Dashboard Documentation & Usage Guide

/*
================================================================================
ADMIN DASHBOARD - PHASE 2 COMPLETE
================================================================================

The Admin Dashboard provides a complete product management system with:
- Add new products (Perfumes or Clothing)
- Edit existing products
- Delete products
- Search and filter products
- View inventory levels
- Publish/Draft status management
- Category-specific fields

================================================================================
FRONTEND IMPLEMENTATION
================================================================================

1. AdminDashboard.jsx (/src/pages/AdminDashboard.jsx)
   - Main dashboard page with stats overview
   - Product table with all CRUD operations
   - Search and filter functionality
   - Integrated ProductForm for add/edit

   FEATURES:
   ✓ Stats Cards (Total, Published, Perfumes, Clothing)
   ✓ Product Table with sortable columns
   ✓ Search bar (searches product names)
   ✓ Category filter dropdown
   ✓ Product status toggle (Published/Draft)
   ✓ Edit and Delete buttons
   ✓ Inline product form

2. ProductForm Component (within AdminDashboard.jsx)
   - Dynamic form that adapts based on category
   - Validation with error display
   - Image preview
   - Category-specific fields

   PERFUME FIELDS:
   - Product Name (required)
   - Category: Perfume (fixed)
   - Sub-Category: Men/Women/Unisex
   - Price (required)
   - Stock Quantity (required)
   - Image URL (required, with preview)
   - Description
   - Scent Notes (e.g., Bergamot, Rose, Musk)
   - Concentration (Eau de Toilette, Eau de Parfum, Parfum)
   - Volume (ml)
   - Tags (comma-separated)

   CLOTHING FIELDS:
   - Product Name (required)
   - Category: Clothing (fixed)
   - Sub-Category: Men/Women/Kids/Unisex
   - Price (required)
   - Stock Quantity (required)
   - Image URL (required, with preview)
   - Description
   - Material (e.g., 100% Cotton, Wool Blend)
   - Available Sizes (comma-separated: XS, S, M, L, XL, XXL)
   - Tags (comma-separated)

3. Authentication Services
   - authService.js: Login, signup, token management, admin check
   - AdminRoute.jsx: Protected route wrapper that checks admin role

   USAGE:
   ```javascript
   import { isAdmin, login } from '../services/authService';
   
   // Check if user is admin
   if (isAdmin()) {
     // Show admin content
   }
   
   // Login user
   const response = await login(email, password);
   const token = response.data.token;
   ```

4. Product Services
   - productService.js: All product API calls
   
   EXPORTED FUNCTIONS:
   - getProducts() - Get all products with filters
   - getProductById(id) - Get single product
   - getProductsByCategory(category) - Filter by category
   - createProduct(data) - Create new product
   - updateProduct(id, data) - Update product
   - deleteProduct(id) - Delete product
   - searchProducts(query) - Search products
   - bulkDeleteProducts(ids) - Delete multiple

================================================================================
BACKEND IMPLEMENTATION
================================================================================

1. Routes & Controllers

   AUTH ROUTES (/api/auth)
   POST   /signup          - Register new user
   POST   /login           - Login user
   POST   /refresh         - Refresh JWT token (requires auth)
   GET    /me              - Get current user info (requires auth)

   PRODUCT ROUTES (/api/products)
   GET    /                - Get all products (paginated, filterable)
   GET    /?category=X     - Filter by category
   GET    /?search=X       - Search products
   GET    /category/:cat   - Get products by category
   GET    /:id             - Get single product with details
   POST   /                - Create product (admin only)
   PUT    /:id             - Update product (admin only)
   DELETE /:id             - Delete product (admin only)

2. Controllers

   authController.js
   - signup(email, password, first_name, last_name)
     Creates new user, returns token
   
   - login(email, password)
     Validates credentials, returns token
   
   - refreshToken()
     Issues new token for authenticated user
   
   - getCurrentUser()
     Returns current user data

   productController.js
   - getAllProducts()
     Returns paginated products, supports filters & sorting
   
   - getProductById(id)
     Returns product with category-specific details
   
   - getProductsByCategory(category)
     Returns all products in category
   
   - searchProducts(query)
     Full-text search on name & description
   
   - createProduct(data)
     Creates product + category-specific details in transaction
     Requires: name, category, price, image_url
     Optional: description, stock, tags, category-specific fields
   
   - updateProduct(id, data)
     Updates product and details, null values are ignored
   
   - deleteProduct(id)
     Deletes product (cascades to product_details)

3. Middleware

   auth.js
   - protect: Validates JWT token, attaches user to request
   - adminOnly: Checks if user.role === 'admin'
   - optionalAuth: Attaches user if token exists, otherwise continues

   USAGE:
   ```javascript
   router.post('/products', protect, adminOnly, createProduct);
   ```

4. Database Schema (Already created in migrations/init.sql)
   - users: id, email, password_hash, first_name, last_name, role
   - products: id, name, category, price, description, image_url, etc.
   - product_details: product_id, category_type, + category-specific fields

================================================================================
HOW TO USE THE ADMIN DASHBOARD
================================================================================

1. ACCESS DASHBOARD
   - Navigate to /admin/dashboard
   - If not admin, redirected to login
   - Admin account will be created in Phase 4

2. ADD PRODUCT
   - Click "Add New Product" button
   - Select category (Perfume or Clothing)
   - Fill in required fields (Name, Price, Stock, Image URL)
   - Add category-specific details
   - Click "Add Product"
   - Product appears in table and on homepage

3. EDIT PRODUCT
   - Click Edit icon (pencil) in table row
   - Form populates with current data
   - Update fields as needed
   - Click "Update Product"

4. DELETE PRODUCT
   - Click Delete icon (trash) in table row
   - Confirm deletion
   - Product removed from database

5. SEARCH/FILTER
   - Type in search box to find by name
   - Use category dropdown to filter
   - Results update in real-time

6. VIEW STATS
   - Cards at top show: Total, Published, Perfumes, Clothing
   - Stock levels show as progress bars in table

================================================================================
API INTEGRATION FLOW
================================================================================

CREATING A PRODUCT (Example):
1. User fills form in AdminDashboard
2. Click "Add Product"
3. ProductForm validates data
4. Calls productService.createProduct(formData)
5. API interceptor adds JWT token to request
6. Backend receives POST /api/products
7. Auth middleware verifies admin role
8. productController.createProduct() processes:
   - Validates required fields
   - Creates product record
   - Creates product_details record
   - Returns product ID
9. Frontend updates local state
10. Product appears in table immediately

BACKEND VALIDATION:
- Required: name, category, price, image_url
- Price validation: positive number
- Category: 'perfume' or 'clothing'
- Stock: defaults to 0
- Sub-category: required for all products
- Perfume: concentration & volume_ml
- Clothing: material & available_sizes

================================================================================
ERROR HANDLING
================================================================================

FRONTEND:
- Form validation with error messages
- API error handling via axios interceptors
- User-friendly error notifications

BACKEND:
- Custom error classes: ValidationError, AuthenticationError, etc.
- All errors caught and logged
- Response format: { success: false, error: "message" }

COMMON ERRORS:
- 400: Validation error (missing fields)
- 401: Authentication error (no token)
- 403: Authorization error (not admin)
- 404: Resource not found
- 409: Conflict (email exists, etc.)
- 500: Server error

================================================================================
TESTING THE DASHBOARD
================================================================================

1. Start Backend:
   cd backend
   npm install
   npm run dev

2. Start Frontend:
   cd frontend
   npm install
   npm run dev

3. Create Admin User:
   - POST to /api/auth/signup with role: 'admin'
   - (This will be automated in Phase 4)

4. Login as Admin:
   - Navigate to /login
   - Use admin credentials
   - Redirected to admin dashboard

5. Test CRUD:
   - Add product with all details
   - Edit product information
   - Delete product
   - Verify changes on homepage

================================================================================
NEXT PHASES
================================================================================

Phase 3: AI Chatbot
- Chat component with knowledge base integration
- OpenAI API for intelligent responses
- Real-time chat interface

Phase 4: Auth & Cart
- Full authentication system (signup/login pages)
- Cart functionality with Redux
- Checkout process with payment integration

================================================================================
*/
