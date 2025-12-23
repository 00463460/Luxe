import React from 'react';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative h-screen bg-gradient-to-br from-luxury-50 via-white to-luxury-100">
      {/* Background Pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-10 w-96 h-96 bg-luxury-100 rounded-full opacity-20 blur-3xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-luxury-200 rounded-full opacity-10 blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          
          {/* Left Content */}
          <div className="space-y-6">
            <div className="inline-block">
              <span className="text-sm font-semibold text-luxury-600 bg-luxury-50 px-4 py-2 rounded-full">
                ✨ Luxury Collection 2025
              </span>
            </div>

            <h1 className="text-5xl lg:text-6xl font-serif font-bold text-gray-900 leading-tight">
              Elegance Redefined
            </h1>

            <p className="text-lg text-gray-600 max-w-md leading-relaxed">
              Discover our curated collection of premium perfumes and luxury clothing. Each piece is carefully selected to embody timeless elegance and modern sophistication.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a
                href="/products"
                className="inline-flex items-center justify-center px-8 py-3 bg-luxury-600 text-white font-semibold rounded-lg hover:bg-luxury-700 transition shadow-lg hover:shadow-xl"
              >
                Shop Now
                <ArrowRight size={20} className="ml-2" />
              </a>

              <a
                href="/about"
                className="inline-flex items-center justify-center px-8 py-3 border-2 border-luxury-600 text-luxury-600 font-semibold rounded-lg hover:bg-luxury-50 transition"
              >
                Learn More
              </a>
            </div>

            {/* Stats */}
            <div className="flex gap-8 pt-8 border-t border-luxury-200">
              <div>
                <p className="text-2xl font-serif font-bold text-luxury-600">500+</p>
                <p className="text-sm text-gray-600">Premium Products</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-luxury-600">50k+</p>
                <p className="text-sm text-gray-600">Happy Customers</p>
              </div>
              <div>
                <p className="text-2xl font-serif font-bold text-luxury-600">25+</p>
                <p className="text-sm text-gray-600">Countries Served</p>
              </div>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative h-full min-h-96 lg:min-h-full">
            <div className="absolute inset-0 bg-gradient-to-br from-luxury-200 to-luxury-300 rounded-3xl overflow-hidden">
              <img
                src="https://images.unsplash.com/photo-1615634260174-dea6755fcb30?w=600&h=600&fit=crop"
                alt="Luxury Perfume"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Floating Cards */}
            <div className="absolute -bottom-4 -left-4 bg-white rounded-2xl shadow-xl p-4 max-w-xs">
              <p className="text-sm font-semibold text-gray-900">Best Seller</p>
              <p className="text-lg font-serif font-bold text-luxury-600">Midnight Essence</p>
              <p className="text-sm text-gray-600 mt-1">Premium Eau de Parfum</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
