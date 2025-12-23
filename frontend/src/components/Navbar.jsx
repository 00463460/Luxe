import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Heart, ShoppingCart, User, Menu, X, LogOut } from 'lucide-react';
import CartModal from './CartModal';

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { items } = useSelector(state => state.cart);
  const { isAuthenticated, user } = useSelector(state => state.auth);
  const cartCount = items.length;

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <>
      <nav className="sticky top-0 z-40 bg-white shadow-md border-b border-luxury-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            
            {/* Logo */}
            <div className="flex-shrink-0">
              <a href="/" className="text-2xl font-serif font-bold text-luxury-800">
                LUXE
              </a>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a href="/products?category=perfume" className="text-gray-700 hover:text-luxury-600 transition font-medium">
                Perfumes
              </a>
              <a href="/products?category=clothing" className="text-gray-700 hover:text-luxury-600 transition font-medium">
                Clothing
              </a>
              <a href="/about" className="text-gray-700 hover:text-luxury-600 transition font-medium">
                About
              </a>
              <a href="/contact" className="text-gray-700 hover:text-luxury-600 transition font-medium">
                Contact
              </a>
            </div>

            {/* Right Icons */}
            <div className="flex items-center space-x-4">
              {/* Wishlist */}
              <button className="p-2 hover:bg-luxury-50 rounded-full transition">
                <Heart size={20} className="text-gray-700 hover:text-luxury-600" />
              </button>

              {/* Cart */}
              <button 
                onClick={() => setIsCartOpen(true)}
                className="relative p-2 hover:bg-luxury-50 rounded-full transition"
              >
                <ShoppingCart size={20} className="text-gray-700 hover:text-luxury-600" />
                {cartCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-white transform translate-x-1/2 -translate-y-1/2 bg-luxury-600 rounded-full">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Account / Auth */}
              {isAuthenticated && user ? (
                <div className="flex items-center gap-2">
                  <a href="/account" className="p-2 hover:bg-luxury-50 rounded-full transition hidden sm:block">
                    <User size={20} className="text-gray-700 hover:text-luxury-600" />
                  </a>
                  <span className="text-sm font-medium text-gray-700 hidden sm:inline">{user.first_name || user.email}</span>
                </div>
              ) : (
                <a href="/login" className="p-2 hover:bg-luxury-50 rounded-full transition hidden sm:block">
                  <User size={20} className="text-gray-700 hover:text-luxury-600" />
                </a>
              )}

              {/* Dev: Admin Button */}
              <button
                onClick={() => {
                  const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.' + btoa(JSON.stringify({ role: 'admin', email: 'dev@local' })) + '.sig';
                  localStorage.setItem('authToken', token);
                  window.location.href = '/admin/dashboard';
                }}
                title="Dev: Set Admin Token"
                className="ml-2 px-3 py-1 bg-yellow-100 text-yellow-800 rounded text-sm hidden md:inline-block"
              >
                Dev: Admin
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={toggleMenu}
                className="md:hidden p-2 hover:bg-luxury-50 rounded-full transition"
              >
                {isMenuOpen ? (
                  <X size={20} className="text-gray-700" />
                ) : (
                  <Menu size={20} className="text-gray-700" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden pb-4 border-t border-luxury-100">
              <a href="/products?category=perfume" className="block px-4 py-2 text-gray-700 hover:bg-luxury-50">
                Perfumes
              </a>
              <a href="/products?category=clothing" className="block px-4 py-2 text-gray-700 hover:bg-luxury-50">
                Clothing
              </a>
              <a href="/about" className="block px-4 py-2 text-gray-700 hover:bg-luxury-50">
                About
              </a>
              <a href="/contact" className="block px-4 py-2 text-gray-700 hover:bg-luxury-50">
                Contact
              </a>
              {!isAuthenticated && (
                <a href="/login" className="block px-4 py-2 text-gray-700 hover:bg-luxury-50">
                  Login
                </a>
              )}
            </div>
          )}
        </div>
      </nav>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
