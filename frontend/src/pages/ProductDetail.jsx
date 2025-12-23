import React from 'react';
import { useParams } from 'react-router-dom';
import productStore from '../store/productStore';
import RecommendationCarousel from '../components/products/RecommendationCarousel';
import Button from '../components/common/Button';

const ProductDetail = () => {
  const { id } = useParams();
  const product = productStore.getProductById ? productStore.getProductById(id) : null;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center p-6 bg-dark-main text-white">
        <div className="text-center">
          <h2 className="text-2xl font-bold">Product not found</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <div className="bg-dark-card rounded-lg overflow-hidden">
            <img src={product.image} alt={product.name} className="w-full h-96 object-cover" />
          </div>
          <div className="mt-6">
            <h1 className="text-3xl font-serif font-bold text-white">{product.name}</h1>
            <div className="flex items-center gap-3 mt-2">
              <div className="text-yellow-300 font-semibold">4.5 ★</div>
              <div className="text-text-secondary">(120 reviews)</div>
              <div className="ml-4 px-2 py-1 bg-yellow-400 text-black rounded text-sm font-medium">Prime</div>
            </div>
            <p className="mt-4 text-text-secondary">{product.description}</p>
          </div>
        </div>

        {/* Buy Box */}
        <aside className="bg-dark-card border border-white/20 rounded-lg p-6">
          <div className="text-3xl font-bold text-white font-serif">${product.price}</div>
          {product.originalPrice && (
            <div className="text-sm text-text-muted line-through">${product.originalPrice}</div>
          )}
          <div className="mt-4">
            <Button size="lg" className="w-full bg-white text-black">Buy Now</Button>
          </div>
          <div className="mt-3">
            <button className="w-full px-4 py-2 border border-white/20 text-white rounded-md">Add to Cart</button>
          </div>
          <div className="mt-4 text-sm text-text-secondary">
            In stock: <span className="text-white font-medium">{product.stock}</span>
          </div>
        </aside>
      </div>

      <div className="mt-12">
        <h3 className="text-2xl font-semibold text-white mb-4">You may also like</h3>
        <RecommendationCarousel currentId={id} />
      </div>
    </div>
  );
};

export default ProductDetail;
