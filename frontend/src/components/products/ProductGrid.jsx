import React, { useState, useEffect } from 'react';
import ProductCard from './ProductCard';
import Button from '../common/Button';
import productStore from '../../store/productStore';

// Products now loaded from shared store
const mockProducts = [
  {
    id: '1',
    name: 'Ocean Breeze',
    category: 'perfume',
    description: 'A fresh, aquatic fragrance perfect for summer days',
    price: 89.99,
    originalPrice: 120.00,
    discount: 25,
    image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=500&q=80',
    fragranceNotes: ['Citrus', 'Marine', 'Woody'],
    stock: 15,
    isNew: true,
  },
  {
    id: '2',
    name: 'Midnight Oud',
    category: 'perfume',
    description: 'Rich and mysterious with oriental notes',
    price: 149.99,
    image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?w=500&q=80',
    fragranceNotes: ['Oud', 'Amber', 'Vanilla'],
    stock: 8,
    isNew: false,
  },
  {
    id: '3',
    name: 'Rose Garden',
    category: 'perfume',
    description: 'Elegant floral bouquet with timeless appeal',
    price: 110.00,
    image: 'https://images.unsplash.com/photo-1547887538-047f814bfb64?w=500&q=80',
    fragranceNotes: ['Rose', 'Jasmine', 'Musk'],
    stock: 20,
    isNew: true,
  },
  {
    id: '4',
    name: 'Cotton Polo Shirt',
    category: 'clothing',
    description: 'Premium 100% cotton polo in classic fit',
    price: 59.99,
    image: 'https://images.unsplash.com/photo-1586790170083-2f9ceadc732d?w=500&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 35,
    isNew: false,
  },
  {
    id: '5',
    name: 'Silk Evening Dress',
    category: 'clothing',
    description: 'Luxurious silk dress for elegant occasions',
    price: 249.99,
    originalPrice: 350.00,
    discount: 29,
    image: 'https://images.unsplash.com/photo-1595777457583-95e059d581b8?w=500&q=80',
    sizes: ['XS', 'S', 'M', 'L'],
    stock: 12,
    isNew: true,
  },
  {
    id: '6',
    name: 'Linen Summer Shirt',
    category: 'clothing',
    description: 'Breathable linen shirt perfect for warm weather',
    price: 79.99,
    image: 'https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?w=500&q=80',
    sizes: ['M', 'L', 'XL', 'XXL'],
    stock: 28,
    isNew: false,
  },
  {
    id: '7',
    name: 'Citrus Spark',
    category: 'perfume',
    description: 'Vibrant citrus burst with energizing notes',
    price: 75.00,
    image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59d75?w=500&q=80',
    fragranceNotes: ['Lemon', 'Bergamot', 'Ginger'],
    stock: 18,
    isNew: false,
  },
  {
    id: '8',
    name: 'Wool Blazer',
    category: 'clothing',
    description: 'Tailored wool blazer for sophisticated style',
    price: 189.99,
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=500&q=80',
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 10,
    isNew: true,
  },
];

const ProductGrid = ({ title = 'Our Products', limit = null, showFilters = true }) => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [view, setView] = useState('grid');
  const [products, setProducts] = useState([]);

  // Load products from store and subscribe to changes
  useEffect(() => {
    setProducts(productStore.getPublishedProducts());
    const unsubscribe = productStore.subscribe(() => {
      setProducts(productStore.getPublishedProducts());
    });
    return unsubscribe;
  }, []);

  // Filter products by category
  const filteredProducts = products.filter((product) => {
    if (selectedCategory === 'all') return true;
    return product.category === selectedCategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low':
        return a.price - b.price;
      case 'price-high':
        return b.price - a.price;
      case 'name':
        return a.name.localeCompare(b.name);
      default:
        return 0;
    }
  });

  // Apply limit if specified
  const displayProducts = limit ? sortedProducts.slice(0, limit) : sortedProducts;

  return (
    <section className="py-16 bg-dark-main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-serif font-bold text-white mb-4">{title}</h2>
          <p className="text-text-secondary max-w-2xl mx-auto">
            Explore our curated collection of premium perfumes and timeless clothing pieces
          </p>
        </div>

        {/* Filters and View Toggle */}
        {showFilters && (
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
            {/* Category Filter */}
            <div className="flex gap-2 flex-wrap justify-center">
              <Button
                variant={selectedCategory === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('all')}
              >
                All Products
              </Button>
              <Button
                variant={selectedCategory === 'perfume' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('perfume')}
              >
                Perfumes
              </Button>
              <Button
                variant={selectedCategory === 'clothing' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setSelectedCategory('clothing')}
              >
                Clothing
              </Button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-3">
              <label htmlFor="sort" className="text-sm text-text-secondary font-medium">
                Sort by:
              </label>
              <select
                id="sort"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="border border-white/30 bg-dark-card text-white rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-white/50"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="name">Name: A to Z</option>
              </select>
              <div className="ml-4 flex items-center gap-2">
                <button onClick={() => setView('grid')} className={`px-3 py-2 rounded-md ${view === 'grid' ? 'bg-white text-black' : 'bg-dark-card text-white border border-white/20'}`}>
                  Grid
                </button>
                <button onClick={() => setView('list')} className={`px-3 py-2 rounded-md ${view === 'list' ? 'bg-white text-black' : 'bg-dark-card text-white border border-white/20'}`}>
                  List
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Product Grid / List */}
        {displayProducts.length > 0 ? (
          <div>
            {view === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {displayProducts.map((product, idx) => (
                  <div key={product.id} style={{ animationDelay: `${idx * 80}ms` }} className="animate-fade-in-up">
                    <ProductCard key={product.id} product={product} view="grid" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="md:flex md:gap-6">
                {/* Sidebar Filters */}
                <aside className="hidden md:block w-72">
                  <div className="bg-dark-card border border-white/20 rounded-md p-4 sticky top-24">
                    <h4 className="text-lg font-semibold text-white mb-3">Filters</h4>
                    <div className="flex flex-col gap-2">
                      <button className={`text-left px-3 py-2 rounded ${selectedCategory === 'all' ? 'bg-white text-black' : 'bg-transparent text-white border border-white/20'}`} onClick={() => setSelectedCategory('all')}>All Products</button>
                      <button className={`text-left px-3 py-2 rounded ${selectedCategory === 'perfume' ? 'bg-white text-black' : 'bg-transparent text-white border border-white/20'}`} onClick={() => setSelectedCategory('perfume')}>Perfumes</button>
                      <button className={`text-left px-3 py-2 rounded ${selectedCategory === 'clothing' ? 'bg-white text-black' : 'bg-transparent text-white border border-white/20'}`} onClick={() => setSelectedCategory('clothing')}>Clothing</button>
                    </div>
                  </div>
                </aside>

                <main className="flex-1">
                  <div className="flex flex-col gap-4">
                    {displayProducts.map((product, idx) => (
                      <div key={product.id} style={{ animationDelay: `${idx * 60}ms` }} className="animate-fade-in-up">
                        <ProductCard key={product.id} product={product} view="list" />
                      </div>
                    ))}
                  </div>
                </main>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-text-secondary text-lg">No products found</p>
          </div>
        )}

        {/* View All Button (if limit is applied) */}
        {limit && filteredProducts.length > limit && (
          <div className="text-center mt-12">
            <Button variant="secondary" size="lg">
              View All Products ({filteredProducts.length})
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ProductGrid;
