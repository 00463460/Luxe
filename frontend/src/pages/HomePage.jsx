import React from 'react';
import HeroCarousel from '../components/home/HeroCarousel';
import ProductGrid from '../components/products/ProductGrid';

const HomePage = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Carousel (Amazon-like prominent banners) */}
      <section className="py-8 bg-dark-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <HeroCarousel />
        </div>
      </section>

      {/* Featured Products */}
      <ProductGrid
        title="Featured Collection"
        limit={8}
        showFilters={false}
      />

      {/* Categories Showcase */}
      <section className="py-16 bg-dark-main">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">
              Shop by Category
            </h2>
            <p className="text-text-secondary max-w-2xl mx-auto">
              Discover our carefully curated collections
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Perfumes Category */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/20 hover:border-white h-96 cursor-pointer transition-all duration-500 hover:shadow-white-lg">
              <img
                src="https://images.unsplash.com/photo-1587017539504-67cfbddac569?w=800&q=80"
                alt="Perfumes"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif font-bold text-white mb-2 group-hover:text-gray-300 transition-all duration-300">
                  Perfumes
                </h3>
                <p className="text-text-secondary mb-4">
                  Signature scents for every occasion
                </p>
                <a
                  href="/products?category=perfume"
                  className="inline-flex items-center text-white font-semibold hover:text-gray-300 transition-colors"
                >
                  Explore Collection
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>

            {/* Clothing Category */}
            <div className="group relative overflow-hidden rounded-2xl border border-white/20 hover:border-white h-96 cursor-pointer transition-all duration-500 hover:shadow-white-lg">
              <img
                src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&q=80"
                alt="Clothing"
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 to-transparent flex flex-col justify-end p-8">
                <h3 className="text-3xl font-serif font-bold text-white mb-2 group-hover:text-gray-300 transition-all duration-300">
                  Clothing
                </h3>
                <p className="text-text-secondary mb-4">
                  Timeless pieces for modern wardrobes
                </p>
                <a
                  href="/products?category=clothing"
                  className="inline-flex items-center text-white font-semibold hover:text-gray-300 transition-colors"
                >
                  Explore Collection
                  <svg
                    className="ml-2 w-5 h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className="py-16 bg-dark-card">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-serif font-bold text-white mb-4">
              Why Choose Luxe Collection
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="text-center p-6 bg-dark-card rounded-xl border border-white/20 hover:border-white transition-all duration-300 hover:shadow-white-sm">
              <div className="bg-dark-main border border-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Premium Quality
              </h3>
              <p className="text-text-secondary">
                Every product is carefully selected and quality-tested
              </p>
            </div>

            {/* Feature 2 */}
            <div className="text-center p-6 bg-dark-card rounded-xl border border-white/20 hover:border-white transition-all duration-300 hover:shadow-white-sm">
              <div className="bg-dark-main border border-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Fast Delivery
              </h3>
              <p className="text-text-secondary">
                Free shipping on orders over $100, delivered in 3-5 days
              </p>
            </div>

            {/* Feature 3 */}
            <div className="text-center p-6 bg-dark-card rounded-xl border border-white/20 hover:border-white transition-all duration-300 hover:shadow-white-sm">
              <div className="bg-dark-main border border-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"
                  />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">
                Easy Returns
              </h3>
              <p className="text-text-secondary">
                30-day return policy with hassle-free refunds
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
