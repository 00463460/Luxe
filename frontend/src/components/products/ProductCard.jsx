import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { ShoppingCart, Heart, Eye } from 'lucide-react';
import { addToCart } from '../../store/cartSlice';

const ProductCard = ({ product, view = 'grid' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [addedFeedback, setAddedFeedback] = useState(false);
  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    // perform fly-to-cart animation then dispatch
    try {
      const root = e.currentTarget.closest('.product-card');
      const img = root ? root.querySelector('img') : null;
      const cart = document.getElementById('global-cart-icon');
      if (img && cart) {
        const imgRect = img.getBoundingClientRect();
        const cartRect = cart.getBoundingClientRect();
        const clone = img.cloneNode(true);
        clone.style.position = 'fixed';
        clone.style.left = `${imgRect.left}px`;
        clone.style.top = `${imgRect.top}px`;
        clone.style.width = `${imgRect.width}px`;
        clone.style.height = `${imgRect.height}px`;
        clone.style.transition = 'transform 700ms cubic-bezier(.2,.9,.3,1), opacity 700ms';
        clone.style.zIndex = 9999;
        clone.style.pointerEvents = 'none';
        document.body.appendChild(clone);
        requestAnimationFrame(() => {
          const translateX = cartRect.left + cartRect.width / 2 - (imgRect.left + imgRect.width / 2);
          const translateY = cartRect.top + cartRect.height / 2 - (imgRect.top + imgRect.height / 2);
          clone.style.transform = `translate(${translateX}px, ${translateY}px) scale(0.12)`;
          clone.style.opacity = '0.4';
        });
        setTimeout(() => clone.remove(), 780);
      }
    } catch (err) {
      // fail silently
    }
    dispatch(addToCart({ product, quantity: 1 }));
    setAddedFeedback(true);
    setTimeout(() => setAddedFeedback(false), 2000);
  };

  const handleWishlist = (e) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  // Render a list-style product (Amazon-like) when requested
  if (view === 'list') {
    return (
      <div className="product-card flex gap-6 bg-dark-card border border-white/20 rounded-md p-4 hover:shadow-white-lg transition-all">
        <div className="w-32 h-32 flex-shrink-0 bg-dark-lighter rounded-md overflow-hidden">
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        </div>
        <div className="flex-1">
          <Link to={`/product/${product.id}`} className="text-lg font-serif font-semibold text-white hover:text-gray-300">
            {product.name}
          </Link>
          <div className="mt-2 text-sm text-text-secondary line-clamp-2">{product.description}</div>
          <div className="mt-3 flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <div className="text-xl font-bold text-white font-serif">${product.price}</div>
                {product.originalPrice && (
                  <div className="text-sm text-text-muted line-through">${product.originalPrice}</div>
                )}
              </div>
              <div className="text-xs text-text-secondary mt-1">{product.stock > 0 ? 'In Stock' : 'Out of Stock'}</div>
            </div>
            <div className="flex flex-col items-end gap-2">
              <div className="text-sm text-yellow-300 font-semibold">4.5 ★</div>
              <button onClick={handleAddToCart} className="px-4 py-2 bg-white text-black rounded-md font-medium">Buy Now</button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <Link to={`/product/${product.id}`}>
      <div
        className="product-card group relative bg-dark-card rounded-xl border border-white/20 hover:border-white transition-all duration-500 overflow-hidden hover:shadow-white-lg"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden bg-dark-lighter aspect-square">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
          />

          {/* Overlay Actions */}
          <div
            className={`absolute inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center gap-3 transition-opacity duration-300 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <button
              onClick={handleAddToCart}
              className="bg-transparent border border-white text-white p-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:shadow-white-sm"
            >
              <ShoppingCart size={20} />
            </button>
            <button
              onClick={handleWishlist}
              className={`p-3 rounded-full transition-all duration-300 ${
                isWishlisted
                  ? 'bg-white border border-white text-black shadow-white-sm'
                  : 'bg-transparent border border-white text-white hover:bg-white hover:text-black hover:shadow-white-sm'
              }`}
            >
              <Heart size={20} fill={isWishlisted ? 'currentColor' : 'none'} />
            </button>
            <Link
              to={`/product/${product.id}`}
              className="bg-transparent border border-white text-white p-3 rounded-full hover:bg-white hover:text-black transition-all duration-300 hover:shadow-white-sm"
            >
              <Eye size={20} />
            </Link>
          </div>

          {/* Badges */}
          {product.isNew && (
            <span className="absolute top-3 left-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow-white-sm animate-pulse-soft">
              New
            </span>
          )}
          {product.discount && (
            <span className="absolute top-3 right-3 bg-white text-black text-xs font-semibold px-3 py-1 rounded-full shadow-white-sm animate-pulse-soft">
              -{product.discount}%
            </span>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          {/* Category Tag */}
          <p className="text-xs text-white font-semibold uppercase tracking-wide mb-2">
            {product.category}
          </p>

          {/* Product Name */}
          <h3 className="text-lg font-serif font-semibold text-white mb-2 line-clamp-1 group-hover:text-gray-300 transition-all duration-300">
            {product.name}
          </h3>

          {/* Product Description/Details */}
          <p className="text-sm text-text-secondary mb-3 line-clamp-2">
            {product.description}
          </p>

          {/* Perfume-specific: Fragrance Notes */}
          {product.category === 'perfume' && product.fragranceNotes && (
            <div className="flex flex-wrap gap-1 mb-3">
              {product.fragranceNotes.slice(0, 3).map((note, index) => (
                <span
                  key={index}
                  className="text-xs bg-dark-lighter border border-white/20 text-white px-2 py-1 rounded-full"
                >
                  {note}
                </span>
              ))}
            </div>
          )}

          {/* Clothing-specific: Available Sizes */}
          {product.category === 'clothing' && product.sizes && (
            <div className="flex gap-1 mb-3">
              {product.sizes.slice(0, 4).map((size, index) => (
                <span
                  key={index}
                  className="text-xs border border-white/20 text-white px-2 py-1 rounded hover:bg-white hover:text-black transition-all duration-300"
                >
                  {size}
                </span>
              ))}
            </div>
          )}

          {/* Price Section */}
          <div className="flex items-center justify-between mt-4 pt-4 border-t border-white/20">
            <div className="flex items-center gap-2">
              {product.originalPrice && (
                <span className="text-sm text-text-muted line-through">
                  ${product.originalPrice}
                </span>
              )}
              <span className="text-xl font-bold text-white font-serif">
                ${product.price}
              </span>
            </div>

          {/* Stock Status & Feedback */}
            <div className="flex items-center gap-2">
              {addedFeedback && (
                <span className="text-xs text-white font-medium animate-pulse shadow-white-sm">✓ Added</span>
              )}
              {product.stock > 0 ? (
                <span className="text-xs text-white font-medium">In Stock</span>
              ) : (
                <span className="text-xs text-gray-400 font-medium">Out of Stock</span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
