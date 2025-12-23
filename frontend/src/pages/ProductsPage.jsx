import React from 'react';
import ProductGrid from '../components/products/ProductGrid';

const ProductsPage = () => {
  return (
    <div className="min-h-screen bg-dark-main">
      <ProductGrid title="All Products" limit={null} showFilters={true} />
    </div>
  );
};

export default ProductsPage;
