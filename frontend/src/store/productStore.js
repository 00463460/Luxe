// Simple product store using localStorage and events
// This allows products to be shared between Admin and Frontend

const STORAGE_KEY = 'luxe_products';

// Initial sample products
const initialProducts = [
  {
    id: '1',
    name: 'Ocean Breeze',
    category: 'perfume',
    subCategory: 'Unisex',
    description: 'A fresh, aquatic fragrance perfect for summer days',
    price: 89.99,
    originalPrice: 120.00,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80',
    fragranceNotes: ['Citrus', 'Marine', 'Woody'],
    stock: 15,
    isNew: true,
    status: 'published',
    notes: 'Citrus, Marine, Woody',
    concentration: 'Eau de Parfum',
    volume: '100'
  },
  {
    id: '2',
    name: 'Midnight Oud',
    category: 'perfume',
    subCategory: 'Men',
    description: 'Rich and mysterious with oriental notes',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80',
    fragranceNotes: ['Oud', 'Amber', 'Vanilla'],
    stock: 8,
    isNew: false,
    status: 'published',
    notes: 'Oud, Amber, Vanilla',
    concentration: 'Parfum',
    volume: '50'
  },
  {
    id: '3',
    name: 'Rose Garden',
    category: 'perfume',
    subCategory: 'Women',
    description: 'Elegant floral bouquet with timeless appeal',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1547887538-047f814bfb64?w=500&q=80',
    fragranceNotes: ['Rose', 'Jasmine', 'Musk'],
    stock: 20,
    isNew: true,
    status: 'published',
    notes: 'Rose, Jasmine, Musk',
    concentration: 'Eau de Parfum',
    volume: '75'
  },
  {
    id: '4',
    name: 'Cotton Polo Shirt',
    category: 'clothing',
    subCategory: 'Men',
    description: 'Premium 100% cotton polo in classic fit',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 35,
    isNew: false,
    status: 'published',
    material: '100% Cotton',
    tags: 'casual, comfortable'
  },
  {
    id: '5',
    name: 'Silk Evening Dress',
    category: 'clothing',
    subCategory: 'Women',
    description: 'Luxurious silk dress for elegant occasions',
    price: 249.99,
    originalPrice: 350.00,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 12,
    isNew: true,
    status: 'published',
    material: 'Pure Silk',
    tags: 'formal, luxury'
  },
  {
    id: '6',
    name: 'Linen Summer Shirt',
    category: 'clothing',
    subCategory: 'Unisex',
    description: 'Breathable linen shirt perfect for warm weather',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80',
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 28,
    isNew: false,
    status: 'published',
    material: '100% Linen',
    tags: 'summer, breathable'
  },
  {
    id: '7',
    name: 'Citrus Spark',
    category: 'perfume',
    subCategory: 'Unisex',
    description: 'Vibrant citrus burst with energizing notes',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500&q=80',
    fragranceNotes: ['Lemon', 'Bergamot', 'Ginger'],
    stock: 18,
    isNew: false,
    status: 'published',
    notes: 'Lemon, Bergamot, Ginger',
    concentration: 'Eau de Toilette',
    volume: '100'
  },
  {
    id: '8',
    name: 'Wool Blazer',
    category: 'clothing',
    subCategory: 'Men',
    description: 'Tailored wool blazer for sophisticated style',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 10,
    isNew: true,
    status: 'published',
    material: 'Wool Blend',
    tags: 'formal, tailored'
  },
];

class ProductStore {
  constructor() {
    this.listeners = [];
    this.init();
  }

  init() {
    // Check if products exist in localStorage, if not, use initial products
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    }
  }

  // Get all products
  getProducts() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : initialProducts;
  }

  // Get published products only (for frontend)
  getPublishedProducts() {
    return this.getProducts().filter(p => p.status === 'published');
  }

  // Get single product by ID
  getProductById(id) {
    return this.getProducts().find(p => p.id === id);
  }

  // Add new product
  addProduct(product) {
    const products = this.getProducts();
    const newProduct = {
      ...product,
      id: Date.now().toString(),
      status: product.status || 'published',
      isNew: true
    };
    products.push(newProduct);
    this.saveProducts(products);
    return newProduct;
  }

  // Update product
  updateProduct(id, updates) {
    const products = this.getProducts();
    const index = products.findIndex(p => p.id === id);
    if (index !== -1) {
      products[index] = { ...products[index], ...updates };
      this.saveProducts(products);
      return products[index];
    }
    return null;
  }

  // Delete product
  deleteProduct(id) {
    const products = this.getProducts();
    const filtered = products.filter(p => p.id !== id);
    this.saveProducts(filtered);
    return filtered.length < products.length;
  }

  // Save products and notify listeners
  saveProducts(products) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(products));
    this.notifyListeners();
  }

  // Subscribe to product changes
  subscribe(listener) {
    this.listeners.push(listener);
    return () => {
      this.listeners = this.listeners.filter(l => l !== listener);
    };
  }

  // Notify all listeners of changes
  notifyListeners() {
    this.listeners.forEach(listener => listener(this.getProducts()));
  }

  // Reset to initial products (for testing)
  reset() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
    this.notifyListeners();
  }
}

// Create singleton instance
const productStore = new ProductStore();

export default productStore;
