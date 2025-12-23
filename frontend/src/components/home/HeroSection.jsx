import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';

const HeroSection = () => {
  return (
    <div className="relative bg-dark-main overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="grid lg:grid-cols-2 gap-8 items-center">
              {/* Left Content */}
              <div className="text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl font-serif">
                  <span className="block">Elegance Meets</span>
                  <span className="block text-white animate-pulse-soft">Sophistication</span>
                </h1>
                <p className="mt-3 text-base text-text-secondary sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Discover our curated collection of premium perfumes and timeless clothing.
                  Each piece is crafted to elevate your everyday moments into extraordinary experiences.
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start gap-4">
                  <div className="rounded-md">
                    <Link to="/products?category=perfume">
                      <Button size="lg" className="w-full sm:w-auto !bg-white !text-black !border-white hover:!bg-gray-100 transition-all duration-300 shadow-white-lg hover:shadow-white-xl">
                        Shop Perfumes
                      </Button>
                    </Link>
                  </div>
                  <div className="mt-3 sm:mt-0 rounded-md">
                    <Link to="/products?category=clothing">
                      <Button size="lg" className="w-full sm:w-auto !bg-transparent !border !border-white !text-white hover:!bg-white hover:!text-black transition-all duration-300 shadow-white-sm hover:shadow-white-lg">
                        Explore Clothing
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Stats */}
                <div className="mt-10 grid grid-cols-3 gap-4 text-center lg:text-left">
                  <div className="bg-dark-card border border-white/20 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-white font-serif">500+</p>
                    <p className="text-sm text-text-secondary">Products</p>
                  </div>
                  <div className="bg-dark-card border border-white/20 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-white font-serif">50K+</p>
                    <p className="text-sm text-text-secondary">Happy Customers</p>
                  </div>
                  <div className="bg-dark-card border border-white/20 p-4 rounded-lg">
                    <p className="text-3xl font-bold text-white font-serif">4.9</p>
                    <p className="text-sm text-text-secondary">Rating</p>
                  </div>
                </div>
              </div>

              {/* Right Image */}
              <div className="lg:inset-y-0 lg:right-0 mt-8 lg:mt-0">
                <div className="relative h-56 sm:h-72 md:h-96 lg:h-full lg:min-h-[500px]">
                  <img
                    className="absolute inset-0 w-full h-full object-cover rounded-2xl border border-white shadow-white-lg"
                    src="https://images.unsplash.com/photo-1594035910387-fea47794261f?w=800&q=80"
                    alt="Luxury perfume collection"
                  />
                  {/* Overlay Badge */}
                  <div className="absolute top-4 right-4 glassmorphism px-4 py-2 rounded-full shadow-white-sm border border-white">
                    <p className="text-sm font-semibold text-white">New Collection</p>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {/* Decorative Soft Background Elements */}
      <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-white rounded-full opacity-3 blur-3xl animate-pulse-soft"></div>
      <div className="absolute bottom-0 left-0 -mb-20 -ml-20 w-96 h-96 bg-white rounded-full opacity-3 blur-3xl animate-pulse-soft"></div>
    </div>
  );
};

export default HeroSection;
