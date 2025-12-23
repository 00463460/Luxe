-- Create Users Table
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  first_name VARCHAR(100),
  last_name VARCHAR(100),
  phone VARCHAR(20),
  role VARCHAR(20) DEFAULT 'customer' CHECK (role IN ('customer', 'admin')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  is_active BOOLEAN DEFAULT true
);

-- Create Products Table
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  category VARCHAR(50) NOT NULL CHECK (category IN ('perfume', 'clothing')),
  sub_category VARCHAR(100),
  price DECIMAL(10, 2) NOT NULL,
  description TEXT,
  image_url VARCHAR(500),
  stock_quantity INTEGER DEFAULT 0,
  rating DECIMAL(3, 2) DEFAULT 0,
  tags JSONB,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  created_by UUID REFERENCES users(id)
);

-- Create Product Details Table
CREATE TABLE IF NOT EXISTS product_details (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  product_id UUID UNIQUE NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  category_type VARCHAR(50) NOT NULL CHECK (category_type IN ('perfume', 'clothing')),
  -- Perfume Fields
  scent_family VARCHAR(100),
  notes TEXT,
  concentration VARCHAR(50),
  volume_ml INTEGER,
  -- Clothing Fields
  size_chart JSONB,
  material VARCHAR(100),
  care_instructions TEXT,
  available_sizes TEXT ARRAY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Cart Table
CREATE TABLE IF NOT EXISTS cart (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Cart Items Table
CREATE TABLE IF NOT EXISTS cart_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  cart_id UUID NOT NULL REFERENCES cart(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  size_selected VARCHAR(10),
  added_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Orders Table
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  total_amount DECIMAL(12, 2) NOT NULL,
  status VARCHAR(50) DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'shipped', 'cancelled')),
  payment_method VARCHAR(50),
  shipping_address TEXT,
  order_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Order Items Table
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  quantity INTEGER NOT NULL,
  price_at_purchase DECIMAL(10, 2) NOT NULL,
  size_selected VARCHAR(10),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Chatbot Knowledge Base Table
CREATE TABLE IF NOT EXISTS chatbot_kb (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  category VARCHAR(50) CHECK (category IN ('perfume', 'clothing', 'general')),
  question TEXT NOT NULL,
  answer TEXT NOT NULL,
  keywords TEXT ARRAY,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Indexes for Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_created_by ON products(created_by);
CREATE INDEX idx_cart_user_id ON cart(user_id);
CREATE INDEX idx_cart_items_cart_id ON cart_items(cart_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_chatbot_kb_category ON chatbot_kb(category);
CREATE INDEX idx_chatbot_kb_keywords ON chatbot_kb USING GIN(keywords);
