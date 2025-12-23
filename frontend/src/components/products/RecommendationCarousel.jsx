import React from 'react';
import { Link } from 'react-router-dom';
import productStore from '../../store/productStore';

const RecommendationCarousel = ({ currentId }) => {
  const all = productStore.getPublishedProducts ? productStore.getPublishedProducts() : [];
  const items = all.filter(p => p.id !== currentId).slice(0, 8);

  return (
    <div className="overflow-x-auto py-2">
      <div className="flex gap-4 w-max">
        {items.map((p) => (
          <Link key={p.id} to={`/product/${p.id}`} className="w-48 bg-dark-card border border-white/20 rounded-md p-3 flex-shrink-0 hover:shadow-white-lg transition-all">
            <img src={p.image} alt={p.name} className="w-full h-28 object-cover rounded" />
            <div className="mt-2 text-sm text-white font-semibold line-clamp-2">{p.name}</div>
            <div className="text-sm text-text-secondary mt-1">${p.price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default RecommendationCarousel;
