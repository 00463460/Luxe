import React, { useState } from 'react';
import { Heart, ShoppingCart, Star } from 'lucide-react';

export default function ProductCard({ product }) {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isAdded, setIsAdded] = useState(false);

  const handleAddToCart = () => {
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 2000);
    // TODO: Dispatch Redux action to add to cart
  };

  const handleWishlist = () => {
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 group h-full flex flex-col">
      
      {/* Image Container */}
      <div className="relative h-64 bg-luxury-50 overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />

        {/* Category Badge */}
        <div className="absolute top-4 left-4">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold text-white ${
            product.category === 'perfume' 
              ? 'bg-luxury-600' 
              : 'bg-blue-600'
          }`}>
            {product.category === 'perfume' ? '🌸 Perfume' : '👕 Clothing'}
          </span>
        </div>

        {/* Wishlist Button */}
        <button
          onClick={handleWishlist}
          className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-md hover:bg-luxury-50 transition"
        >
          <Heart
            size={20}
            className={isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-600'}
          />
        </button>

        {/* Discount Badge (if applicable) */}
        {product.discount && (
          <div className="absolute bottom-4 left-4">
            <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
              -{product.discount}%
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-grow p-4 flex flex-col">
        
        {/* Sub Category */}
        <p className="text-xs text-gray-500 uppercase tracking-wide mb-2">
          {product.subCategory}
        </p>

        {/* Name */}
        <h3 className="text-lg font-serif font-bold text-gray-900 mb-2 line-clamp-2">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 flex-grow line-clamp-2">
          {product.description}
        </p>

        {/* Rating */}
        <div className="flex items-center gap-2 mb-4">
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                size={16}
                className={i < Math.floor(product.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews || 0})</span>
        </div>

        {/* Special Tags */}
        {product.tags && (
          <div className="flex gap-2 mb-4 flex-wrap">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span
                key={index}
                className="text-xs bg-luxury-50 text-luxury-700 px-2 py-1 rounded"
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-luxury-100">
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-serif font-bold text-luxury-600">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`p-2 rounded-full transition-all ${
              isAdded
                ? 'bg-green-500 text-white'
                : 'bg-luxury-600 text-white hover:bg-luxury-700'
            }`}
          >
            <ShoppingCart size={20} />
          </button>
        </div>

        {/* Feedback Message */}
        {isAdded && (
          <p className="text-xs text-green-600 mt-2 text-center font-semibold">
            ✓ Added to cart!
          </p>
        )}
      </div>
    </div>
  );
}
