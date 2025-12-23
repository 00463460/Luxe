import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { ChevronDown } from 'lucide-react';

export default function ProductGrid({ category = null, title = 'Featured Products' }) {
  // Mock data - will be replaced with API calls in Phase 2
  const mockProducts = [
    {
      id: 1,
      name: 'Midnight Essence',
      category: 'perfume',
      subCategory: 'Men',
      price: 129.99,
      image: 'https://images.unsplash.com/photo-1615634260174-dea6755fcb30?w=400&h=400&fit=crop',
      description: 'Sophisticated blend of woody and musky notes',
      rating: 5,
      reviews: 128,
      tags: ['woody', 'musky', 'luxury'],
      discount: null
    },
    {
      id: 2,
      name: 'Floral Paradise',
      category: 'perfume',
      subCategory: 'Women',
      price: 119.99,
      originalPrice: 149.99,
      image: 'https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=400&fit=crop',
      description: 'Elegant floral fragrance with fresh citrus top notes',
      rating: 4,
      reviews: 95,
      tags: ['floral', 'fresh', 'feminine'],
      discount: 20
    },
    {
      id: 3,
      name: 'Premium Cotton T-Shirt',
      category: 'clothing',
      subCategory: 'Men',
      price: 49.99,
      image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop',
      description: '100% organic cotton, ultra-soft and breathable',
      rating: 5,
      reviews: 256,
      tags: ['cotton', 'casual', 'eco-friendly'],
      discount: null
    },
    {
      id: 4,
      name: 'Silk Evening Dress',
      category: 'clothing',
      subCategory: 'Women',
      price: 189.99,
      originalPrice: 229.99,
      image: 'https://images.unsplash.com/photo-1595777707802-51b39fb018d3?w=400&h=400&fit=crop',
      description: 'Luxurious silk dress perfect for special occasions',
      rating: 5,
      reviews: 87,
      tags: ['silk', 'elegant', 'luxury'],
      discount: 15
    },
    {
      id: 5,
      name: 'Ocean Breeze Essence',
      category: 'perfume',
      subCategory: 'Unisex',
      price: 109.99,
      image: 'https://images.unsplash.com/photo-1610963010437-e3a68c10aed5?w=400&h=400&fit=crop',
      description: 'Aquatic fragrance with coconut and citrus notes',
      rating: 4,
      reviews: 134,
      tags: ['aquatic', 'fresh', 'unisex'],
      discount: null
    },
    {
      id: 6,
      name: 'Minimalist Blazer',
      category: 'clothing',
      subCategory: 'Men',
      price: 179.99,
      image: 'https://images.unsplash.com/photo-1591047990159-ef006328e5e5?w=400&h=400&fit=crop',
      description: 'Tailored blazer in premium wool blend',
      rating: 5,
      reviews: 76,
      tags: ['wool', 'formal', 'versatile'],
      discount: null
    },
    {
      id: 7,
      name: 'Tropical Paradise',
      category: 'perfume',
      subCategory: 'Women',
      price: 124.99,
      image: 'https://images.unsplash.com/photo-1612198188060-c7c2a3b66eae?w=400&h=400&fit=crop',
      description: 'Floral and fruity fragrance reminiscent of tropical islands',
      rating: 4,
      reviews: 102,
      tags: ['floral', 'fruity', 'summer'],
      discount: null
    },
    {
      id: 8,
      name: 'Luxury Cashmere Sweater',
      category: 'clothing',
      subCategory: 'Women',
      price: 199.99,
      image: 'https://images.unsplash.com/photo-1516826957519-f6d0d3b0b78d?w=400&h=400&fit=crop',
      description: 'Premium cashmere knit for ultimate comfort',
      rating: 5,
      reviews: 143,
      tags: ['cashmere', 'luxury', 'warm'],
      discount: null
    }
  ];

  const [sortBy, setSortBy] = useState('featured');
  const [filteredProducts, setFilteredProducts] = useState(
    category ? mockProducts.filter(p => p.category === category) : mockProducts
  );

  const handleSort = (value) => {
    setSortBy(value);
    let sorted = [...filteredProducts];
    
    switch(value) {
      case 'price-low':
        sorted.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        sorted.sort((a, b) => b.price - a.price);
        break;
      case 'newest':
        sorted.reverse();
        break;
      case 'rating':
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        break;
    }
    
    setFilteredProducts(sorted);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12">
          <div>
            <h2 className="text-4xl font-serif font-bold text-gray-900 mb-2">
              {title}
            </h2>
            <p className="text-gray-600">
              {filteredProducts.length} products found
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="mt-6 md:mt-0 relative">
            <select
              value={sortBy}
              onChange={(e) => handleSort(e.target.value)}
              className="appearance-none px-4 py-2 pr-10 bg-white border border-luxury-200 rounded-lg text-gray-700 focus:outline-none focus:border-luxury-600 focus:ring-2 focus:ring-luxury-100"
            >
              <option value="featured">Featured</option>
              <option value="newest">Newest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
              <option value="rating">Top Rated</option>
            </select>
            <ChevronDown
              size={16}
              className="absolute right-3 top-3 text-gray-700 pointer-events-none"
            />
          </div>
        </div>

        {/* Product Grid */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No products found</p>
          </div>
        )}

        {/* Load More Button */}
        <div className="mt-12 text-center">
          <button className="px-8 py-3 border-2 border-luxury-600 text-luxury-600 font-semibold rounded-lg hover:bg-luxury-50 transition">
            Load More
          </button>
        </div>
      </div>
    </section>
  );
}
